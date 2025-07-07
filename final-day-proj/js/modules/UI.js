// UI class for handling user interface
export class UI {
    constructor(taskManager) {
        this.taskManager = taskManager;
        this.modal = document.getElementById('taskModal');
        this.taskList = document.getElementById('taskList');
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.notificationContainer = document.getElementById('notificationContainer');
    }

    // Show loading state
    showLoading() {
        this.loadingOverlay.classList.add('active');
    }

    // Hide loading state
    hideLoading() {
        this.loadingOverlay.classList.remove('active');
    }

    // Open modal
    openModal() {
        this.modal.classList.add('active');
        document.getElementById('taskTitle').focus();
    }

    // Close modal
    closeModal() {
        this.modal.classList.remove('active');
        document.getElementById('taskForm').reset();
    }

    // Render task list
    renderTasks(tasks) {
        this.taskList.innerHTML = tasks.map(task => this.createTaskElement(task)).join('');
    }

    // Create task element
    createTaskElement(task) {
        const isOverdue = task.isOverdue();
        const isDueToday = task.isDueToday();
        const isUpcoming = task.isUpcoming();

        return `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <div class="task-content">
                    <div class="task-header">
                        <h3 class="task-title">${task.title}</h3>
                        <span class="task-priority ${task.priority}">${task.priority}</span>
                    </div>
                    <p class="task-description">${task.description}</p>
                    <div class="task-meta">
                        <span class="task-category">
                            <span class="category-color" style="background-color: ${this.getCategoryColor(task.category)}"></span>
                            ${task.category}
                        </span>
                        <span class="task-due-date ${isOverdue ? 'overdue' : ''} ${isDueToday ? 'today' : ''} ${isUpcoming ? 'upcoming' : ''}">
                            ${this.formatDueDate(task.dueDate)}
                        </span>
                    </div>
                    ${task.dependencies.length > 0 ? `
                        <div class="task-dependencies">
                            <h4>Dependencies:</h4>
                            <ul>
                                ${task.dependencies.map(depId => {
                                    const depTask = this.taskManager.getTask(depId);
                                    return depTask ? `
                                        <li class="${depTask.completed ? 'completed' : ''}">
                                            ${depTask.title}
                                        </li>
                                    ` : '';
                                }).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
                <div class="task-actions">
                    <button class="btn-icon" onclick="ui.toggleTaskCompletion(${task.id})" title="${task.completed ? 'Mark as incomplete' : 'Mark as complete'}">
                        <span class="icon">${task.completed ? '✓' : '○'}</span>
                    </button>
                    <button class="btn-icon" onclick="ui.editTask(${task.id})" title="Edit task">
                        <span class="icon">✎</span>
                    </button>
                    <button class="btn-icon" onclick="ui.deleteTask(${task.id})" title="Delete task">
                        <span class="icon">🗑</span>
                    </button>
                </div>
            </div>
        `;
    }

    // Format due date
    formatDueDate(date) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return 'Tomorrow';
        } else {
            return date.toLocaleDateString();
        }
    }

    // Get category color
    getCategoryColor(category) {
        const colors = {
            work: '#e74c3c',
            personal: '#3498db',
            shopping: '#2ecc71'
        };
        return colors[category] || '#95a5a6';
    }

    // Toggle task completion
    async toggleTaskCompletion(taskId) {
        try {
            this.showLoading();
            await this.taskManager.toggleTaskCompletion(taskId);
            this.showNotification('Task updated successfully', 'success');
        } catch (error) {
            console.error('Error toggling task completion:', error);
            this.showNotification(error.message, 'error');
        } finally {
            this.hideLoading();
        }
    }

    // Edit task
    editTask(taskId) {
        const task = this.taskManager.getTask(taskId);
        if (!task) {
            this.showNotification('Task not found', 'error');
            return;
        }

        // Populate form with task data
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDescription').value = task.description;
        document.getElementById('taskDueDate').value = task.dueDate.toISOString().split('T')[0];
        document.getElementById('taskPriority').value = task.priority;
        document.getElementById('taskCategory').value = task.category;
        document.getElementById('taskDependencies').value = task.dependencies;

        // Update form submit handler
        const form = document.getElementById('taskForm');
        const originalSubmitHandler = form.onsubmit;
        form.onsubmit = async (e) => {
            e.preventDefault();
            try {
                this.showLoading();
                const formData = new FormData(form);
                const updates = {
                    title: formData.get('taskTitle'),
                    description: formData.get('taskDescription'),
                    dueDate: formData.get('taskDueDate'),
                    priority: formData.get('taskPriority'),
                    category: formData.get('taskCategory'),
                    dependencies: Array.from(formData.getAll('taskDependencies'))
                };
                await this.taskManager.updateTask(taskId, updates);
                this.showNotification('Task updated successfully', 'success');
                this.closeModal();
            } catch (error) {
                console.error('Error updating task:', error);
                this.showNotification(error.message, 'error');
            } finally {
                this.hideLoading();
                form.onsubmit = originalSubmitHandler;
            }
        };

        this.openModal();
    }

    // Delete task
    async deleteTask(taskId) {
        if (!confirm('Are you sure you want to delete this task?')) {
            return;
        }

        try {
            this.showLoading();
            await this.taskManager.deleteTask(taskId);
            this.showNotification('Task deleted successfully', 'success');
        } catch (error) {
            console.error('Error deleting task:', error);
            this.showNotification(error.message, 'error');
        } finally {
            this.hideLoading();
        }
    }

    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span class="icon">${this.getNotificationIcon(type)}</span>
            <span class="message">${message}</span>
        `;

        this.notificationContainer.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Get notification icon
    getNotificationIcon(type) {
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        return icons[type] || icons.info;
    }
} 