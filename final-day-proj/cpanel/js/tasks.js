// Tasks management module
class TasksManager {
    constructor() {
        this.tasks = [];
        this.init();
    }

    init() {
        // Load tasks from storage
        this.loadTasks();

        // Add event listeners
        document.getElementById('addTaskForm').addEventListener('submit', (e) => this.handleAddTask(e));
        
        // Initialize search functionality
        const searchInput = document.querySelector('#tasksSection input[type="text"]');
        searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
    }

    loadTasks() {
        // In production, this would be an API call
        const storedTasks = localStorage.getItem('tasks');
        this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
        this.renderTasks();
    }

    saveTasks() {
        // In production, this would be an API call
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    renderTasks(tasks = this.tasks) {
        const tbody = document.getElementById('tasksTableBody');
        tbody.innerHTML = '';

        tasks.forEach(task => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${task.id}</td>
                <td>${task.title}</td>
                <td>${this.formatDate(task.dueDate)}</td>
                <td>
                    <span class="badge bg-${this.getStatusColor(task)}">
                        ${this.getStatusText(task)}
                    </span>
                </td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="tasksManager.editTask('${task.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="tasksManager.deleteTask('${task.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="btn btn-sm btn-info" onclick="tasksManager.viewSubmissions('${task.id}')">
                        <i class="fas fa-list"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    async handleAddTask(event) {
        event.preventDefault();
        
        if (!auth.checkAuth()) return;

        const form = event.target;
        const formData = new FormData(form);

        try {
            const task = {
                id: this.generateTaskId(),
                title: formData.get('title'),
                description: formData.get('description'),
                dueDate: formData.get('dueDate'),
                priority: formData.get('priority'),
                status: 'pending',
                createdAt: new Date().toISOString(),
                submissions: []
            };

            // In production, this would be an API call
            this.tasks.push(task);
            this.saveTasks();
            this.renderTasks();

            // Close modal and reset form
            const modal = bootstrap.Modal.getInstance(document.getElementById('addTaskModal'));
            modal.hide();
            form.reset();

            auth.showNotification('Task created successfully', 'success');
        } catch (error) {
            auth.showNotification(error.message, 'error');
        }
    }

    editTask(id) {
        if (!auth.checkAuth()) return;

        const task = this.tasks.find(t => t.id === id);
        if (!task) {
            auth.showNotification('Task not found', 'error');
            return;
        }

        // In production, this would open an edit modal
        console.log('Edit task:', task);
    }

    async deleteTask(id) {
        if (!auth.checkAuth()) return;

        if (!confirm('Are you sure you want to delete this task?')) {
            return;
        }

        try {
            // In production, this would be an API call
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveTasks();
            this.renderTasks();

            auth.showNotification('Task deleted successfully', 'success');
        } catch (error) {
            auth.showNotification(error.message, 'error');
        }
    }

    viewSubmissions(id) {
        if (!auth.checkAuth()) return;

        const task = this.tasks.find(t => t.id === id);
        if (!task) {
            auth.showNotification('Task not found', 'error');
            return;
        }

        // In production, this would show submissions in a modal or navigate to submissions section
        console.log('View submissions for task:', task);
    }

    handleSearch(query) {
        const filteredTasks = this.tasks.filter(task => 
            task.title.toLowerCase().includes(query.toLowerCase()) ||
            task.description.toLowerCase().includes(query.toLowerCase()) ||
            task.id.toLowerCase().includes(query.toLowerCase())
        );
        this.renderTasks(filteredTasks);
    }

    generateTaskId() {
        // Generate a unique task ID
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2, 5);
        return `TASK-${timestamp}-${random}`.toUpperCase();
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString();
    }

    getStatusColor(task) {
        const now = new Date();
        const dueDate = new Date(task.dueDate);

        if (task.status === 'completed') {
            return 'success';
        } else if (now > dueDate) {
            return 'danger';
        } else if (now > dueDate - 24 * 60 * 60 * 1000) { // Within 24 hours
            return 'warning';
        } else {
            return 'info';
        }
    }

    getStatusText(task) {
        const now = new Date();
        const dueDate = new Date(task.dueDate);

        if (task.status === 'completed') {
            return 'Completed';
        } else if (now > dueDate) {
            return 'Overdue';
        } else if (now > dueDate - 24 * 60 * 60 * 1000) { // Within 24 hours
            return 'Due Soon';
        } else {
            return 'Pending';
        }
    }

    // Get task by ID
    getTask(id) {
        return this.tasks.find(t => t.id === id);
    }

    // Get all tasks
    getAllTasks() {
        return this.tasks;
    }

    // Get tasks by status
    getTasksByStatus(status) {
        return this.tasks.filter(t => t.status === status);
    }

    // Get tasks by priority
    getTasksByPriority(priority) {
        return this.tasks.filter(t => t.priority === priority);
    }
}

// Initialize tasks manager
const tasksManager = new TasksManager(); 