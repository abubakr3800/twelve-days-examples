// Storage class for handling data persistence
export class Storage {
    constructor() {
        this.dbName = 'taskManagerDB';
        this.dbVersion = 1;
        this.storeName = 'tasks';
        this.db = null;
    }

    // Initialize IndexedDB
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = () => {
                reject(new Error('Failed to open database'));
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, { keyPath: 'id' });
                }
            };
        });
    }

    // Get database connection
    async getDB() {
        if (!this.db) {
            await this.init();
        }
        return this.db;
    }

    // Get all tasks
    async getTasks() {
        try {
            const db = await this.getDB();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([this.storeName], 'readonly');
                const store = transaction.objectStore(this.storeName);
                const request = store.getAll();

                request.onsuccess = () => {
                    resolve(request.result);
                };

                request.onerror = () => {
                    reject(new Error('Failed to get tasks'));
                };
            });
        } catch (error) {
            console.error('Error getting tasks:', error);
            throw error;
        }
    }

    // Get task by ID
    async getTask(id) {
        try {
            const db = await this.getDB();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([this.storeName], 'readonly');
                const store = transaction.objectStore(this.storeName);
                const request = store.get(id);

                request.onsuccess = () => {
                    resolve(request.result);
                };

                request.onerror = () => {
                    reject(new Error('Failed to get task'));
                };
            });
        } catch (error) {
            console.error('Error getting task:', error);
            throw error;
        }
    }

    // Save task
    async saveTask(task) {
        try {
            const db = await this.getDB();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([this.storeName], 'readwrite');
                const store = transaction.objectStore(this.storeName);
                const request = store.put(task);

                request.onsuccess = () => {
                    resolve(request.result);
                };

                request.onerror = () => {
                    reject(new Error('Failed to save task'));
                };
            });
        } catch (error) {
            console.error('Error saving task:', error);
            throw error;
        }
    }

    // Update task
    async updateTask(task) {
        try {
            const db = await this.getDB();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([this.storeName], 'readwrite');
                const store = transaction.objectStore(this.storeName);
                const request = store.put(task);

                request.onsuccess = () => {
                    resolve(request.result);
                };

                request.onerror = () => {
                    reject(new Error('Failed to update task'));
                };
            });
        } catch (error) {
            console.error('Error updating task:', error);
            throw error;
        }
    }

    // Delete task
    async deleteTask(id) {
        try {
            const db = await this.getDB();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([this.storeName], 'readwrite');
                const store = transaction.objectStore(this.storeName);
                const request = store.delete(id);

                request.onsuccess = () => {
                    resolve(request.result);
                };

                request.onerror = () => {
                    reject(new Error('Failed to delete task'));
                };
            });
        } catch (error) {
            console.error('Error deleting task:', error);
            throw error;
        }
    }

    // Clear all tasks
    async clearTasks() {
        try {
            const db = await this.getDB();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction([this.storeName], 'readwrite');
                const store = transaction.objectStore(this.storeName);
                const request = store.clear();

                request.onsuccess = () => {
                    resolve();
                };

                request.onerror = () => {
                    reject(new Error('Failed to clear tasks'));
                };
            });
        } catch (error) {
            console.error('Error clearing tasks:', error);
            throw error;
        }
    }

    // Save theme preference
    saveTheme(theme) {
        localStorage.setItem('theme', theme);
    }

    // Get theme preference
    getTheme() {
        return localStorage.getItem('theme') || 'light';
    }

    // Save offline changes
    saveOfflineChanges(changes) {
        localStorage.setItem('offlineChanges', JSON.stringify(changes));
    }

    // Get offline changes
    getOfflineChanges() {
        const changes = localStorage.getItem('offlineChanges');
        return changes ? JSON.parse(changes) : [];
    }

    // Clear offline changes
    clearOfflineChanges() {
        localStorage.removeItem('offlineChanges');
    }
} 