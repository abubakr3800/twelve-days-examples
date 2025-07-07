// Import modules
import { Task } from './modules/Task.js';
import { TaskManager } from './modules/TaskManager.js';
import { Storage } from './modules/Storage.js';
import { UI } from './modules/UI.js';
import { WebSocket } from './modules/WebSocket.js';
import { validateTask } from './utils/validation.js';
import { showNotification } from './utils/helpers.js';
import { PRIORITIES, CATEGORIES } from './utils/constants.js';

// Initialize application
class App {
    constructor() {
        // Initialize managers
        this.storage = new Storage();
        this.taskManager = new TaskManager(this.storage);
        this.ui = new UI(this.taskManager);
        this.ws = new WebSocket(this.taskManager);

        // Initialize state
        this.currentFilter = 'all';
        this.currentCategory = null;
        this.searchQuery = '';
        this.sortBy = 'dueDate';

        // Bind event handlers
        this.handleThemeToggle = this.handleThemeToggle.bind(this);
        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleTaskSubmit = this.handleTaskSubmit.bind(this);

        // Initialize event listeners
        this.initializeEventListeners();
    }

    async initialize() {
        try {
            // Show loading state
            this.ui.showLoading();

            // Load tasks from storage
            await this.taskManager.loadTasks();

            // Initialize WebSocket connection
            await this.ws.connect();

            // Render initial task list
            this.ui.renderTasks(this.getFilteredTasks());

            // Hide loading state
            this.ui.hideLoading();
        } catch (error) {
            console.error('Initialization error:', error);
            showNotification('Failed to initialize application', 'error');
        }
    }

    initializeEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', this.handleThemeToggle);

        // Add task button
        document.getElementById('addTaskBtn').addEventListener('click', this.handleAddTask);

        // Filter buttons
        document.querySelectorAll('.nav-item').forEach(button => {
            button.addEventListener('click', () => this.handleFilterChange(button.dataset.filter));
        });

        // Category buttons
        document.querySelectorAll('.category-item').forEach(button => {
            button.addEventListener('click', () => this.handleCategoryChange(button.dataset.category));
        });

        // Search input
        document.getElementById('searchInput').addEventListener('input', this.handleSearch);

        // Sort select
        document.getElementById('sortBy').addEventListener('change', this.handleSort);

        // Task form
        document.getElementById('taskForm').addEventListener('submit', this.handleTaskSubmit);

        // Modal close buttons
        document.querySelectorAll('.close-modal').forEach(button => {
            button.addEventListener('click', () => this.ui.closeModal());
        });
    }

    handleThemeToggle() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const themes = ['light', 'dark', 'high-contrast'];
        const currentIndex = themes.indexOf(currentTheme);
        const nextTheme = themes[(currentIndex + 1) % themes.length];
        document.documentElement.setAttribute('data-theme', nextTheme);
        this.storage.saveTheme(nextTheme);
    }

    handleAddTask() {
        this.ui.openModal();
    }

    handleFilterChange(filter) {
        this.currentFilter = filter;
        document.querySelectorAll('.nav-item').forEach(button => {
            button.classList.toggle('active', button.dataset.filter === filter);
        });
        this.ui.renderTasks(this.getFilteredTasks());
    }

    handleCategoryChange(category) {
        this.currentCategory = this.currentCategory === category ? null : category;
        document.querySelectorAll('.category-item').forEach(button => {
            button.classList.toggle('active', button.dataset.category === this.currentCategory);
        });
        this.ui.renderTasks(this.getFilteredTasks());
    }

    handleSearch(event) {
        this.searchQuery = event.target.value.toLowerCase();
        this.ui.renderTasks(this.getFilteredTasks());
    }

    handleSort(event) {
        this.sortBy = event.target.value;
        this.ui.renderTasks(this.getFilteredTasks());
    }

    async handleTaskSubmit(event) {
        event.preventDefault();

        try {
            // Show loading state
            this.ui.showLoading();

            // Get form data
            const formData = new FormData(event.target);
            const taskData = {
                title: formData.get('taskTitle'),
                description: formData.get('taskDescription'),
                dueDate: formData.get('taskDueDate'),
                priority: formData.get('taskPriority'),
                category: formData.get('taskCategory'),
                dependencies: Array.from(formData.getAll('taskDependencies'))
            };

            // Validate task data
            const validationError = validateTask(taskData);
            if (validationError) {
                throw new Error(validationError);
            }

            // Create and save task
            const task = new Task(taskData);
            await this.taskManager.addTask(task);

            // Close modal and show success message
            this.ui.closeModal();
            showNotification('Task added successfully', 'success');

            // Render updated task list
            this.ui.renderTasks(this.getFilteredTasks());
        } catch (error) {
            console.error('Task submission error:', error);
            showNotification(error.message, 'error');
        } finally {
            this.ui.hideLoading();
        }
    }

    getFilteredTasks() {
        let tasks = this.taskManager.getTasks();

        // Apply search filter
        if (this.searchQuery) {
            tasks = tasks.filter(task => 
                task.title.toLowerCase().includes(this.searchQuery) ||
                task.description.toLowerCase().includes(this.searchQuery)
            );
        }

        // Apply category filter
        if (this.currentCategory) {
            tasks = tasks.filter(task => task.category === this.currentCategory);
        }

        // Apply status filter
        switch (this.currentFilter) {
            case 'today':
                tasks = tasks.filter(task => task.isDueToday());
                break;
            case 'upcoming':
                tasks = tasks.filter(task => task.isUpcoming());
                break;
            case 'completed':
                tasks = tasks.filter(task => task.completed);
                break;
        }

        // Apply sorting
        tasks.sort((a, b) => {
            switch (this.sortBy) {
                case 'dueDate':
                    return a.dueDate - b.dueDate;
                case 'priority':
                    return PRIORITIES.indexOf(b.priority) - PRIORITIES.indexOf(a.priority);
                case 'title':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });

        return tasks;
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.initialize();
}); 