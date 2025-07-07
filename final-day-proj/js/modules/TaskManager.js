// TaskManager class for managing tasks
export class TaskManager {
    constructor(storage) {
        this.storage = storage;
        this.tasks = new Map();
        this.observers = new Set();
    }

    // Load tasks from storage
    async loadTasks() {
        try {
            const tasks = await this.storage.getTasks();
            this.tasks.clear();
            tasks.forEach(task => {
                this.tasks.set(task.id, task);
            });
            this.notifyObservers();
        } catch (error) {
            console.error('Error loading tasks:', error);
            throw new Error('Failed to load tasks');
        }
    }

    // Get all tasks
    getTasks() {
        return Array.from(this.tasks.values());
    }

    // Get task by ID
    getTask(id) {
        return this.tasks.get(id);
    }

    // Add new task
    async addTask(task) {
        try {
            // Validate task
            const errors = Task.validate(task);
            if (errors.length > 0) {
                throw new Error(errors.join(', '));
            }

            // Check dependencies
            for (const dependencyId of task.dependencies) {
                if (!this.tasks.has(dependencyId)) {
                    throw new Error(`Dependency task ${dependencyId} not found`);
                }
            }

            // Save task to storage
            await this.storage.saveTask(task);

            // Add task to memory
            this.tasks.set(task.id, task);

            // Notify observers
            this.notifyObservers();

            return task;
        } catch (error) {
            console.error('Error adding task:', error);
            throw error;
        }
    }

    // Update task
    async updateTask(id, updates) {
        try {
            const task = this.tasks.get(id);
            if (!task) {
                throw new Error('Task not found');
            }

            // Create updated task
            const updatedTask = new Task({
                ...task,
                ...updates,
                id: task.id // Preserve original ID
            });

            // Validate updated task
            const errors = Task.validate(updatedTask);
            if (errors.length > 0) {
                throw new Error(errors.join(', '));
            }

            // Check dependencies
            for (const dependencyId of updatedTask.dependencies) {
                if (!this.tasks.has(dependencyId)) {
                    throw new Error(`Dependency task ${dependencyId} not found`);
                }
            }

            // Save updated task to storage
            await this.storage.updateTask(updatedTask);

            // Update task in memory
            this.tasks.set(id, updatedTask);

            // Notify observers
            this.notifyObservers();

            return updatedTask;
        } catch (error) {
            console.error('Error updating task:', error);
            throw error;
        }
    }

    // Delete task
    async deleteTask(id) {
        try {
            const task = this.tasks.get(id);
            if (!task) {
                throw new Error('Task not found');
            }

            // Check if task is a dependency
            for (const [taskId, existingTask] of this.tasks) {
                if (existingTask.dependencies.includes(id)) {
                    throw new Error(`Cannot delete task: it is a dependency of task ${taskId}`);
                }
            }

            // Delete task from storage
            await this.storage.deleteTask(id);

            // Remove task from memory
            this.tasks.delete(id);

            // Notify observers
            this.notifyObservers();
        } catch (error) {
            console.error('Error deleting task:', error);
            throw error;
        }
    }

    // Toggle task completion
    async toggleTaskCompletion(id) {
        const task = this.tasks.get(id);
        if (!task) {
            throw new Error('Task not found');
        }

        return this.updateTask(id, { completed: !task.completed });
    }

    // Add task dependency
    async addTaskDependency(taskId, dependencyId) {
        const task = this.tasks.get(taskId);
        if (!task) {
            throw new Error('Task not found');
        }

        if (!this.tasks.has(dependencyId)) {
            throw new Error('Dependency task not found');
        }

        if (taskId === dependencyId) {
            throw new Error('Task cannot depend on itself');
        }

        // Check for circular dependencies
        if (this.hasCircularDependency(taskId, dependencyId)) {
            throw new Error('Circular dependency detected');
        }

        return this.updateTask(taskId, {
            dependencies: [...task.dependencies, dependencyId]
        });
    }

    // Remove task dependency
    async removeTaskDependency(taskId, dependencyId) {
        const task = this.tasks.get(taskId);
        if (!task) {
            throw new Error('Task not found');
        }

        return this.updateTask(taskId, {
            dependencies: task.dependencies.filter(id => id !== dependencyId)
        });
    }

    // Check for circular dependencies
    hasCircularDependency(taskId, dependencyId, visited = new Set()) {
        if (taskId === dependencyId) {
            return true;
        }

        if (visited.has(dependencyId)) {
            return false;
        }

        visited.add(dependencyId);

        const dependency = this.tasks.get(dependencyId);
        if (!dependency) {
            return false;
        }

        return dependency.dependencies.some(id =>
            this.hasCircularDependency(taskId, id, visited)
        );
    }

    // Subscribe to task updates
    subscribe(observer) {
        this.observers.add(observer);
    }

    // Unsubscribe from task updates
    unsubscribe(observer) {
        this.observers.delete(observer);
    }

    // Notify observers of changes
    notifyObservers() {
        this.observers.forEach(observer => observer(this.getTasks()));
    }
} 