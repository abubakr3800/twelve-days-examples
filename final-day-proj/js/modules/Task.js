// Task class representing a single task
export class Task {
    constructor({
        id = Date.now(),
        title,
        description = '',
        dueDate,
        priority = 'medium',
        category = 'personal',
        completed = false,
        dependencies = [],
        createdAt = new Date(),
        updatedAt = new Date()
    }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = new Date(dueDate);
        this.priority = priority;
        this.category = category;
        this.completed = completed;
        this.dependencies = dependencies;
        this.createdAt = new Date(createdAt);
        this.updatedAt = new Date(updatedAt);
    }

    // Check if task is due today
    isDueToday() {
        const today = new Date();
        return this.dueDate.toDateString() === today.toDateString();
    }

    // Check if task is upcoming (due within the next 7 days)
    isUpcoming() {
        const today = new Date();
        const nextWeek = new Date(today);
        nextWeek.setDate(today.getDate() + 7);
        return this.dueDate > today && this.dueDate <= nextWeek;
    }

    // Check if task is overdue
    isOverdue() {
        return !this.completed && this.dueDate < new Date();
    }

    // Toggle task completion status
    toggleCompletion() {
        this.completed = !this.completed;
        this.updatedAt = new Date();
    }

    // Update task properties
    update(updates) {
        Object.assign(this, updates);
        this.updatedAt = new Date();
    }

    // Add dependency
    addDependency(taskId) {
        if (!this.dependencies.includes(taskId)) {
            this.dependencies.push(taskId);
            this.updatedAt = new Date();
        }
    }

    // Remove dependency
    removeDependency(taskId) {
        this.dependencies = this.dependencies.filter(id => id !== taskId);
        this.updatedAt = new Date();
    }

    // Convert task to plain object
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            dueDate: this.dueDate.toISOString(),
            priority: this.priority,
            category: this.category,
            completed: this.completed,
            dependencies: this.dependencies,
            createdAt: this.createdAt.toISOString(),
            updatedAt: this.updatedAt.toISOString()
        };
    }

    // Create task from plain object
    static fromJSON(json) {
        return new Task({
            ...json,
            dueDate: new Date(json.dueDate),
            createdAt: new Date(json.createdAt),
            updatedAt: new Date(json.updatedAt)
        });
    }

    // Validate task data
    static validate(taskData) {
        const errors = [];

        if (!taskData.title) {
            errors.push('Title is required');
        }

        if (!taskData.dueDate) {
            errors.push('Due date is required');
        } else {
            const dueDate = new Date(taskData.dueDate);
            if (isNaN(dueDate.getTime())) {
                errors.push('Invalid due date');
            }
        }

        if (!['low', 'medium', 'high'].includes(taskData.priority)) {
            errors.push('Invalid priority');
        }

        if (!['work', 'personal', 'shopping'].includes(taskData.category)) {
            errors.push('Invalid category');
        }

        return errors;
    }
} 