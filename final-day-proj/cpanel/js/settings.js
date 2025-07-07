// Settings management module
class SettingsManager {
    constructor() {
        this.settings = {
            attendanceWindow: 15,
            submissionDeadline: 24,
            enableNotifications: true,
            theme: 'light'
        };
        this.init();
    }

    init() {
        // Load settings from storage
        this.loadSettings();

        // Add event listeners
        document.getElementById('adminSettingsForm').addEventListener('submit', (e) => this.handleAdminSettings(e));
        document.getElementById('systemSettingsForm').addEventListener('submit', (e) => this.handleSystemSettings(e));
    }

    loadSettings() {
        // In production, this would be an API call
        const storedSettings = localStorage.getItem('settings');
        if (storedSettings) {
            this.settings = JSON.parse(storedSettings);
            this.updateSettingsUI();
        }
    }

    saveSettings() {
        // In production, this would be an API call
        localStorage.setItem('settings', JSON.stringify(this.settings));
    }

    updateSettingsUI() {
        // Update admin settings
        document.getElementById('adminUsername').value = auth.getCurrentUser() || '';

        // Update system settings
        document.getElementById('attendanceWindow').value = this.settings.attendanceWindow;
        document.getElementById('submissionDeadline').value = this.settings.submissionDeadline;
        document.getElementById('enableNotifications').checked = this.settings.enableNotifications;

        // Update theme
        document.body.setAttribute('data-theme', this.settings.theme);
    }

    async handleAdminSettings(event) {
        event.preventDefault();
        
        if (!auth.checkAuth()) return;

        const form = event.target;
        const newPassword = form.querySelector('#newPassword').value;
        const confirmPassword = form.querySelector('#confirmPassword').value;

        if (newPassword !== confirmPassword) {
            auth.showNotification('Passwords do not match', 'error');
            return;
        }

        try {
            // In production, this would be an API call
            // Update admin password logic here

            form.reset();
            auth.showNotification('Password updated successfully', 'success');
        } catch (error) {
            auth.showNotification(error.message, 'error');
        }
    }

    async handleSystemSettings(event) {
        event.preventDefault();
        
        if (!auth.checkAuth()) return;

        const form = event.target;
        const newSettings = {
            attendanceWindow: parseInt(form.querySelector('#attendanceWindow').value),
            submissionDeadline: parseInt(form.querySelector('#submissionDeadline').value),
            enableNotifications: form.querySelector('#enableNotifications').checked,
            theme: this.settings.theme // Preserve current theme
        };

        try {
            // Validate settings
            if (newSettings.attendanceWindow < 1 || newSettings.attendanceWindow > 60) {
                throw new Error('Attendance window must be between 1 and 60 minutes');
            }

            if (newSettings.submissionDeadline < 1 || newSettings.submissionDeadline > 24) {
                throw new Error('Submission deadline must be between 1 and 24 hours');
            }

            // In production, this would be an API call
            this.settings = newSettings;
            this.saveSettings();
            this.updateSettingsUI();

            auth.showNotification('Settings updated successfully', 'success');
        } catch (error) {
            auth.showNotification(error.message, 'error');
        }
    }

    toggleTheme() {
        if (!auth.checkAuth()) return;

        this.settings.theme = this.settings.theme === 'light' ? 'dark' : 'light';
        this.saveSettings();
        this.updateSettingsUI();

        auth.showNotification(`Theme changed to ${this.settings.theme}`, 'success');
    }

    // Get current settings
    getSettings() {
        return this.settings;
    }

    // Get specific setting
    getSetting(key) {
        return this.settings[key];
    }

    // Update specific setting
    updateSetting(key, value) {
        if (!auth.checkAuth()) return;

        try {
            this.settings[key] = value;
            this.saveSettings();
            this.updateSettingsUI();

            auth.showNotification('Setting updated successfully', 'success');
        } catch (error) {
            auth.showNotification(error.message, 'error');
        }
    }
}

// Initialize settings manager
const settingsManager = new SettingsManager(); 