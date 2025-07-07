# Task Manager WebSocket Server

This is the WebSocket server for the Task Manager application. It handles real-time updates and synchronization between multiple clients.

## Features

- Real-time task updates
- Client synchronization
- Error handling
- Automatic reconnection
- Offline change tracking

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Server

### Development Mode

To run the server in development mode with auto-reload:

```bash
npm run dev
```

### Production Mode

To run the server in production mode:

```bash
npm start
```

The server will start on port 8080 by default. You can change the port by setting the `PORT` environment variable.

## WebSocket Events

The server handles the following message types:

- `task_created`: When a new task is created
- `task_updated`: When a task is updated
- `task_deleted`: When a task is deleted
- `sync_request`: When a client requests synchronization
- `sync_response`: When a client responds to a sync request
- `sync_updates`: When sending updates to a client

## Error Handling

The server includes comprehensive error handling for:
- Connection errors
- Message parsing errors
- Unknown message types
- Client disconnections

## Client Integration

To connect to the WebSocket server from the client:

```javascript
const ws = new WebSocket('ws://localhost:8080');
```

Make sure to handle:
- Connection events
- Message events
- Error events
- Close events

## Security Considerations

- The server is designed for development and testing
- For production use, implement:
  - Authentication
  - SSL/TLS
  - Rate limiting
  - Input validation
  - Error logging 