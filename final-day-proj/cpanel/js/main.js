// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    initNavigation();

    // Initialize theme
    initTheme();

    // Initialize notifications
    initNotifications();
});

// Navigation initialization
function initNavigation() {
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (!auth.checkAuth()) return;

            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');

            // Hide all sections
            const sections = document.querySelectorAll('.content-section');
            sections.forEach(section => section.classList.add('d-none'));

            // Show selected section
            const sectionId = `${link.dataset.section}Section`;
            document.getElementById(sectionId).classList.remove('d-none');
        });
    });

    // Activate first section by default
    navLinks[0].click();
}

// Theme initialization
function initTheme() {
    const theme = settingsManager.getSetting('theme');
    document.body.setAttribute('data-theme', theme);
}

// Notifications initialization
function initNotifications() {
    // Create notification container if it doesn't exist
    if (!document.getElementById('notificationContainer')) {
        const container = document.createElement('div');
        container.id = 'notificationContainer';
        container.style.position = 'fixed';
        container.style.top = '20px';
        container.style.right = '20px';
        container.style.zIndex = '9999';
        document.body.appendChild(container);
    }
}

// Global error handler
window.onerror = function(message, source, lineno, colno, error) {
    console.error('Global error:', error);
    auth.showNotification('An error occurred', 'error');
    return false;
};

// Handle offline/online status
window.addEventListener('online', () => {
    auth.showNotification('You are back online', 'success');
    // Sync any pending changes
    syncPendingChanges();
});

window.addEventListener('offline', () => {
    auth.showNotification('You are offline', 'warning');
});

// Sync pending changes
async function syncPendingChanges() {
    try {
        // In production, this would sync any pending changes with the server
        console.log('Syncing pending changes...');
    } catch (error) {
        console.error('Error syncing changes:', error);
        auth.showNotification('Error syncing changes', 'error');
    }
}

// Export managers for global access
window.auth = auth;
window.studentsManager = studentsManager;
window.tasksManager = tasksManager;
window.attendanceManager = attendanceManager;
window.submissionsManager = submissionsManager;
window.settingsManager = settingsManager; 