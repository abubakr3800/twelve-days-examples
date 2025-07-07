const WebSocket = require('ws');
const http = require('http');
const { v4: uuidv4 } = require('uuid');

// Create HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket server is running');
});

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Store connected clients
const clients = new Map();

// Store task updates
const taskUpdates = new Map();

// Handle WebSocket connections
wss.on('connection', (ws) => {
    const clientId = uuidv4();
    clients.set(clientId, ws);

    console.log(`Client connected: ${clientId}`);

    // Send initial sync request
    ws.send(JSON.stringify({
        type: 'sync_request',
        data: {
            clientId,
            timestamp: Date.now()
        }
    }));

    // Handle messages from clients
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            console.log(`Received message from ${clientId}:`, data);

            // Handle different message types
            switch (data.type) {
                case 'task_created':
                case 'task_updated':
                case 'task_deleted':
                    // Store the update
                    taskUpdates.set(data.data.id, {
                        type: data.type,
                        data: data.data,
                        timestamp: Date.now()
                    });

                    // Broadcast to all other clients
                    broadcastUpdate(clientId, data);
                    break;

                case 'sync_response':
                    // Send all updates since last sync
                    sendUpdatesSinceSync(ws, data.data.lastSync);
                    break;

                default:
                    console.warn(`Unknown message type: ${data.type}`);
            }
        } catch (error) {
            console.error('Error processing message:', error);
            ws.send(JSON.stringify({
                type: 'error',
                data: {
                    message: 'Error processing message',
                    error: error.message
                }
            }));
        }
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log(`Client disconnected: ${clientId}`);
        clients.delete(clientId);
    });

    // Handle errors
    ws.on('error', (error) => {
        console.error(`WebSocket error for client ${clientId}:`, error);
        clients.delete(clientId);
    });
});

// Broadcast update to all clients except sender
function broadcastUpdate(senderId, message) {
    clients.forEach((client, id) => {
        if (id !== senderId && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
        }
    });
}

// Send updates since last sync
function sendUpdatesSinceSync(ws, lastSync) {
    const updates = Array.from(taskUpdates.entries())
        .filter(([_, update]) => update.timestamp > lastSync)
        .map(([_, update]) => update);

    if (updates.length > 0) {
        ws.send(JSON.stringify({
            type: 'sync_updates',
            data: {
                updates,
                timestamp: Date.now()
            }
        }));
    }
}

// Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`WebSocket server is running on port ${PORT}`);
}); 