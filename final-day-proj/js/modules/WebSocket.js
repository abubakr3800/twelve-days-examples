// WebSocket class for real-time updates
export class WebSocket {
    constructor(taskManager) {
        this.taskManager = taskManager;
        this.socket = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectDelay = 1000;
        this.offlineChanges = [];
    }

    // Connect to WebSocket server
    async connect() {
        try {
            this.socket = new window.WebSocket('ws://localhost:8080');

            this.socket.onopen = () => {
                console.log('WebSocket connected');
                this.reconnectAttempts = 0;
                this.syncOfflineChanges();
            };

            this.socket.onmessage = (event) => {
                this.handleMessage(event.data);
            };

            this.socket.onclose = () => {
                console.log('WebSocket disconnected');
                this.handleDisconnect();
            };

            this.socket.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
        } catch (error) {
            console.error('Error connecting to WebSocket:', error);
            this.handleDisconnect();
        }
    }

    // Handle incoming messages
    handleMessage(data) {
        try {
            const message = JSON.parse(data);
            switch (message.type) {
                case 'taskCreated':
                    this.taskManager.addTask(message.task);
                    break;
                case 'taskUpdated':
                    this.taskManager.updateTask(message.task.id, message.task);
                    break;
                case 'taskDeleted':
                    this.taskManager.deleteTask(message.taskId);
                    break;
                case 'syncRequest':
                    this.sendSyncResponse();
                    break;
                default:
                    console.warn('Unknown message type:', message.type);
            }
        } catch (error) {
            console.error('Error handling message:', error);
        }
    }

    // Handle disconnection
    handleDisconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
            console.log(`Reconnecting in ${delay}ms...`);
            setTimeout(() => this.connect(), delay);
        } else {
            console.error('Max reconnection attempts reached');
        }
    }

    // Send message to server
    sendMessage(message) {
        if (this.socket && this.socket.readyState === window.WebSocket.OPEN) {
            this.socket.send(JSON.stringify(message));
        } else {
            this.storeOfflineChange(message);
        }
    }

    // Store offline change
    storeOfflineChange(change) {
        this.offlineChanges.push({
            ...change,
            timestamp: Date.now()
        });
        localStorage.setItem('offlineChanges', JSON.stringify(this.offlineChanges));
    }

    // Sync offline changes
    async syncOfflineChanges() {
        const changes = JSON.parse(localStorage.getItem('offlineChanges') || '[]');
        for (const change of changes) {
            try {
                this.sendMessage(change);
            } catch (error) {
                console.error('Error syncing offline change:', error);
                continue;
            }
        }
        localStorage.removeItem('offlineChanges');
        this.offlineChanges = [];
    }

    // Send sync response
    sendSyncResponse() {
        const tasks = this.taskManager.getTasks();
        this.sendMessage({
            type: 'syncResponse',
            tasks: tasks
        });
    }

    // Notify task creation
    notifyTaskCreated(task) {
        this.sendMessage({
            type: 'taskCreated',
            task: task
        });
    }

    // Notify task update
    notifyTaskUpdated(task) {
        this.sendMessage({
            type: 'taskUpdated',
            task: task
        });
    }

    // Notify task deletion
    notifyTaskDeleted(taskId) {
        this.sendMessage({
            type: 'taskDeleted',
            taskId: taskId
        });
    }

    // Close connection
    close() {
        if (this.socket) {
            this.socket.close();
        }
    }
} 