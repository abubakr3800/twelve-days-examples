// Attendance management module
class AttendanceManager {
    constructor() {
        this.attendanceRecords = [];
        this.isAttendanceActive = false;
        this.attendanceWindow = 15; // minutes
        this.init();
    }

    init() {
        // Load attendance records from storage
        this.loadAttendanceRecords();

        // Add event listeners
        document.getElementById('startAttendanceBtn').addEventListener('click', () => this.toggleAttendance());
        document.getElementById('filterAttendanceBtn').addEventListener('click', () => this.filterAttendance());
        document.getElementById('attendanceDate').addEventListener('change', () => this.filterAttendance());
    }

    loadAttendanceRecords() {
        // In production, this would be an API call
        const storedRecords = localStorage.getItem('attendanceRecords');
        this.attendanceRecords = storedRecords ? JSON.parse(storedRecords) : [];
        this.renderAttendanceRecords();
    }

    saveAttendanceRecords() {
        // In production, this would be an API call
        localStorage.setItem('attendanceRecords', JSON.stringify(this.attendanceRecords));
    }

    renderAttendanceRecords(records = this.attendanceRecords) {
        const tbody = document.getElementById('attendanceTableBody');
        tbody.innerHTML = '';

        records.forEach(record => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${record.studentId}</td>
                <td>${record.studentName}</td>
                <td>${this.formatDate(record.date)}</td>
                <td>${this.formatTime(record.time)}</td>
                <td>
                    <span class="badge bg-${this.getStatusColor(record.status)}">
                        ${record.status}
                    </span>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    toggleAttendance() {
        if (!auth.checkAuth()) return;

        this.isAttendanceActive = !this.isAttendanceActive;
        const button = document.getElementById('startAttendanceBtn');
        
        if (this.isAttendanceActive) {
            button.innerHTML = '<i class="fas fa-stop"></i> Stop Attendance';
            button.classList.remove('btn-primary');
            button.classList.add('btn-danger');
            this.startAttendance();
        } else {
            button.innerHTML = '<i class="fas fa-play"></i> Start Attendance';
            button.classList.remove('btn-danger');
            button.classList.add('btn-primary');
            this.stopAttendance();
        }
    }

    startAttendance() {
        // In production, this would start a WebSocket connection
        console.log('Attendance started');
        
        // Simulate student check-ins
        this.simulateCheckIns();
    }

    stopAttendance() {
        // In production, this would stop the WebSocket connection
        console.log('Attendance stopped');
    }

    simulateCheckIns() {
        // This is just for demonstration
        // In production, this would be handled by real student check-ins
        const students = studentsManager.getActiveStudents();
        
        students.forEach(student => {
            setTimeout(() => {
                this.recordAttendance(student);
            }, Math.random() * 5000); // Random delay between 0-5 seconds
        });
    }

    recordAttendance(student) {
        if (!this.isAttendanceActive) return;

        const now = new Date();
        const record = {
            id: this.generateAttendanceId(),
            studentId: student.id,
            studentName: student.fullName,
            date: now.toISOString().split('T')[0],
            time: now.toISOString().split('T')[1].split('.')[0],
            status: this.determineStatus(now),
            recordedBy: auth.getCurrentUser()
        };

        // In production, this would be an API call
        this.attendanceRecords.push(record);
        this.saveAttendanceRecords();
        this.renderAttendanceRecords();

        auth.showNotification(`${student.fullName} marked as ${record.status}`, 'success');
    }

    determineStatus(time) {
        // In production, this would be based on actual attendance window settings
        const hour = time.getHours();
        const minute = time.getMinutes();

        if (hour < 9 || (hour === 9 && minute <= this.attendanceWindow)) {
            return 'Present';
        } else if (hour < 10) {
            return 'Late';
        } else {
            return 'Absent';
        }
    }

    filterAttendance() {
        const date = document.getElementById('attendanceDate').value;
        if (!date) {
            this.renderAttendanceRecords();
            return;
        }

        const filteredRecords = this.attendanceRecords.filter(record => 
            record.date === date
        );
        this.renderAttendanceRecords(filteredRecords);
    }

    generateAttendanceId() {
        // Generate a unique attendance record ID
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2, 5);
        return `ATT-${timestamp}-${random}`.toUpperCase();
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }

    formatTime(timeString) {
        return timeString;
    }

    getStatusColor(status) {
        const colors = {
            'Present': 'success',
            'Late': 'warning',
            'Absent': 'danger'
        };
        return colors[status] || 'secondary';
    }

    // Get attendance records by date
    getAttendanceByDate(date) {
        return this.attendanceRecords.filter(record => record.date === date);
    }

    // Get attendance records by student
    getAttendanceByStudent(studentId) {
        return this.attendanceRecords.filter(record => record.studentId === studentId);
    }

    // Get attendance statistics
    getAttendanceStats() {
        const stats = {
            total: this.attendanceRecords.length,
            present: 0,
            late: 0,
            absent: 0
        };

        this.attendanceRecords.forEach(record => {
            stats[record.status.toLowerCase()]++;
        });

        return stats;
    }
}

// Initialize attendance manager
const attendanceManager = new AttendanceManager(); 