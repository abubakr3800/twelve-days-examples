// Authentication module
class Auth {
    constructor() {
        this.isAuthenticated = false;
        this.adminCredentials = {
            username: 'admin',
            password: 'admin123' // In production, use proper password hashing
        };
        this.init();
    }

    init() {
        // Check if user is already logged in
        const token = localStorage.getItem('adminToken');
        if (token) {
            this.isAuthenticated = true;
            this.showDashboard();
        } else {
            this.showLoginModal();
        }

        // Add event listeners
        document.getElementById('loginForm').addEventListener('submit', (e) => this.handleLogin(e));
        document.getElementById('logoutBtn').addEventListener('click', (e) => this.handleLogout(e));
    }

    showLoginModal() {
        const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
    }

    showDashboard() {
        document.getElementById('loginModal').classList.remove('show');
        document.getElementById('dashboard').classList.remove('d-none');
    }

    async handleLogin(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            // In production, this would be an API call
            if (username === this.adminCredentials.username && 
                password === this.adminCredentials.password) {
                
                // Generate token (in production, use proper JWT)
                const token = btoa(`${username}:${Date.now()}`);
                localStorage.setItem('adminToken', token);
                
                this.isAuthenticated = true;
                this.showDashboard();
                
                // Show success notification
                this.showNotification('Login successful', 'success');
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            this.showNotification(error.message, 'error');
        }
    }

    handleLogout(event) {
        event.preventDefault();
        
        // Clear authentication
        localStorage.removeItem('adminToken');
        this.isAuthenticated = false;
        
        // Show login modal
        this.showLoginModal();
        
        // Show notification
        this.showNotification('Logged out successfully', 'info');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification alert alert-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Check if user is authenticated
    checkAuth() {
        if (!this.isAuthenticated) {
            this.showLoginModal();
            return false;
        }
        return true;
    }

    // Get current user
    getCurrentUser() {
        return this.isAuthenticated ? this.adminCredentials.username : null;
    }
}

// Initialize authentication
const auth = new Auth(); 