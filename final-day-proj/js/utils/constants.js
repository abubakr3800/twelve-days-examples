// Application constants

// Task priorities
export const PRIORITIES = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high'
};

// Task categories
export const CATEGORIES = {
    WORK: 'work',
    PERSONAL: 'personal',
    SHOPPING: 'shopping'
};

// Task status
export const STATUS = {
    PENDING: 'pending',
    COMPLETED: 'completed',
    OVERDUE: 'overdue'
};

// Filter types
export const FILTERS = {
    ALL: 'all',
    TODAY: 'today',
    UPCOMING: 'upcoming',
    COMPLETED: 'completed'
};

// Sort types
export const SORT_TYPES = {
    DUE_DATE: 'dueDate',
    PRIORITY: 'priority',
    TITLE: 'title'
};

// Sort orders
export const SORT_ORDERS = {
    ASC: 'asc',
    DESC: 'desc'
};

// Notification types
export const NOTIFICATION_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
};

// WebSocket message types
export const WS_MESSAGE_TYPES = {
    TASK_CREATED: 'task_created',
    TASK_UPDATED: 'task_updated',
    TASK_DELETED: 'task_deleted',
    SYNC_REQUEST: 'sync_request',
    SYNC_RESPONSE: 'sync_response'
};

// Storage keys
export const STORAGE_KEYS = {
    TASKS: 'tasks',
    THEME: 'theme',
    OFFLINE_CHANGES: 'offline_changes'
};

// API endpoints
export const API_ENDPOINTS = {
    TASKS: '/api/tasks',
    TASK: (id) => `/api/tasks/${id}`,
    SYNC: '/api/sync'
};

// WebSocket configuration
export const WS_CONFIG = {
    URL: 'ws://localhost:8080',
    MAX_RECONNECT_ATTEMPTS: 5,
    RECONNECT_DELAY: 1000
};

// Validation constants
export const VALIDATION = {
    TITLE_MIN_LENGTH: 3,
    TITLE_MAX_LENGTH: 100,
    DESCRIPTION_MAX_LENGTH: 500,
    SEARCH_MIN_LENGTH: 2,
    SEARCH_MAX_LENGTH: 50
};

// Theme colors
export const THEME_COLORS = {
    PRIMARY: '#4a90e2',
    SECONDARY: '#f5f5f5',
    SUCCESS: '#28a745',
    ERROR: '#dc3545',
    WARNING: '#ffc107',
    INFO: '#17a2b8'
};

// Category colors
export const CATEGORY_COLORS = {
    [CATEGORIES.WORK]: '#4a90e2',
    [CATEGORIES.PERSONAL]: '#28a745',
    [CATEGORIES.SHOPPING]: '#ffc107'
};

// Priority colors
export const PRIORITY_COLORS = {
    [PRIORITIES.LOW]: '#28a745',
    [PRIORITIES.MEDIUM]: '#ffc107',
    [PRIORITIES.HIGH]: '#dc3545'
};

// Status colors
export const STATUS_COLORS = {
    [STATUS.PENDING]: '#ffc107',
    [STATUS.COMPLETED]: '#28a745',
    [STATUS.OVERDUE]: '#dc3545'
};

// Date formats
export const DATE_FORMATS = {
    DISPLAY: 'MMM DD, YYYY',
    INPUT: 'YYYY-MM-DD',
    TIME: 'HH:mm'
};

// Animation durations
export const ANIMATION_DURATIONS = {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500
};

// Error messages
export const ERROR_MESSAGES = {
    TASK_NOT_FOUND: 'Task not found',
    INVALID_TASK_DATA: 'Invalid task data',
    CIRCULAR_DEPENDENCY: 'Circular dependency detected',
    NETWORK_ERROR: 'Network error occurred',
    STORAGE_ERROR: 'Storage error occurred',
    VALIDATION_ERROR: 'Validation error occurred'
};

// Success messages
export const SUCCESS_MESSAGES = {
    TASK_CREATED: 'Task created successfully',
    TASK_UPDATED: 'Task updated successfully',
    TASK_DELETED: 'Task deleted successfully',
    TASK_COMPLETED: 'Task marked as completed',
    TASK_REOPENED: 'Task reopened',
    CHANGES_SYNCED: 'Changes synced successfully'
}; 