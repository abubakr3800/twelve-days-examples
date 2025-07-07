// Submissions management module
class SubmissionsManager {
    constructor() {
        this.submissions = [];
        this.init();
    }

    init() {
        // Load submissions from storage
        this.loadSubmissions();

        // Add event listeners
        const filterButtons = document.querySelectorAll('#submissionsSection .btn-group .btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => this.handleFilter(e.target.dataset.filter));
        });

        // Initialize search functionality
        const searchInput = document.querySelector('#submissionsSection input[type="text"]');
        searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
    }

    loadSubmissions() {
        // In production, this would be an API call
        const storedSubmissions = localStorage.getItem('submissions');
        this.submissions = storedSubmissions ? JSON.parse(storedSubmissions) : [];
        this.renderSubmissions();
    }

    saveSubmissions() {
        // In production, this would be an API call
        localStorage.setItem('submissions', JSON.stringify(this.submissions));
    }

    renderSubmissions(submissions = this.submissions) {
        const tbody = document.getElementById('submissionsTableBody');
        tbody.innerHTML = '';

        submissions.forEach(submission => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${submission.studentName}</td>
                <td>${submission.taskTitle}</td>
                <td>${this.formatDateTime(submission.submittedAt)}</td>
                <td>
                    <span class="badge bg-${this.getStatusColor(submission.status)}">
                        ${submission.status}
                    </span>
                </td>
                <td>${submission.grade || '-'}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="submissionsManager.viewSubmission('${submission.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-success" onclick="submissionsManager.gradeSubmission('${submission.id}')">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="submissionsManager.deleteSubmission('${submission.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    handleFilter(filter) {
        if (!auth.checkAuth()) return;

        // Update active button
        const buttons = document.querySelectorAll('#submissionsSection .btn-group .btn');
        buttons.forEach(button => {
            button.classList.remove('active');
            if (button.dataset.filter === filter) {
                button.classList.add('active');
            }
        });

        // Filter submissions
        let filteredSubmissions;
        switch (filter) {
            case 'pending':
                filteredSubmissions = this.submissions.filter(s => s.status === 'Pending');
                break;
            case 'graded':
                filteredSubmissions = this.submissions.filter(s => s.status === 'Graded');
                break;
            default:
                filteredSubmissions = this.submissions;
        }

        this.renderSubmissions(filteredSubmissions);
    }

    handleSearch(query) {
        const filteredSubmissions = this.submissions.filter(submission => 
            submission.studentName.toLowerCase().includes(query.toLowerCase()) ||
            submission.taskTitle.toLowerCase().includes(query.toLowerCase()) ||
            submission.id.toLowerCase().includes(query.toLowerCase())
        );
        this.renderSubmissions(filteredSubmissions);
    }

    viewSubmission(id) {
        if (!auth.checkAuth()) return;

        const submission = this.submissions.find(s => s.id === id);
        if (!submission) {
            auth.showNotification('Submission not found', 'error');
            return;
        }

        // In production, this would open a modal to view submission details
        console.log('View submission:', submission);
    }

    gradeSubmission(id) {
        if (!auth.checkAuth()) return;

        const submission = this.submissions.find(s => s.id === id);
        if (!submission) {
            auth.showNotification('Submission not found', 'error');
            return;
        }

        // In production, this would open a modal to grade the submission
        const grade = prompt('Enter grade (0-100):');
        if (grade === null) return;

        const gradeNum = parseInt(grade);
        if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 100) {
            auth.showNotification('Invalid grade', 'error');
            return;
        }

        try {
            // In production, this would be an API call
            submission.grade = gradeNum;
            submission.status = 'Graded';
            submission.gradedAt = new Date().toISOString();
            submission.gradedBy = auth.getCurrentUser();

            this.saveSubmissions();
            this.renderSubmissions();

            auth.showNotification('Submission graded successfully', 'success');
        } catch (error) {
            auth.showNotification(error.message, 'error');
        }
    }

    async deleteSubmission(id) {
        if (!auth.checkAuth()) return;

        if (!confirm('Are you sure you want to delete this submission?')) {
            return;
        }

        try {
            // In production, this would be an API call
            this.submissions = this.submissions.filter(s => s.id !== id);
            this.saveSubmissions();
            this.renderSubmissions();

            auth.showNotification('Submission deleted successfully', 'success');
        } catch (error) {
            auth.showNotification(error.message, 'error');
        }
    }

    formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);
        return date.toLocaleString();
    }

    getStatusColor(status) {
        const colors = {
            'Pending': 'warning',
            'Graded': 'success',
            'Late': 'danger'
        };
        return colors[status] || 'secondary';
    }

    // Get submission by ID
    getSubmission(id) {
        return this.submissions.find(s => s.id === id);
    }

    // Get submissions by student
    getSubmissionsByStudent(studentId) {
        return this.submissions.filter(s => s.studentId === studentId);
    }

    // Get submissions by task
    getSubmissionsByTask(taskId) {
        return this.submissions.filter(s => s.taskId === taskId);
    }

    // Get submission statistics
    getSubmissionStats() {
        const stats = {
            total: this.submissions.length,
            pending: 0,
            graded: 0,
            late: 0,
            averageGrade: 0
        };

        let totalGrade = 0;
        let gradedCount = 0;

        this.submissions.forEach(submission => {
            stats[submission.status.toLowerCase()]++;
            if (submission.grade) {
                totalGrade += submission.grade;
                gradedCount++;
            }
        });

        stats.averageGrade = gradedCount > 0 ? totalGrade / gradedCount : 0;

        return stats;
    }
}

// Initialize submissions manager
const submissionsManager = new SubmissionsManager(); 