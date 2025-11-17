// Centralized job state management
class JobStore {
    constructor() {
        this.appliedJobs = [];
        this.savedJobs = [];
        this.listeners = [];
        this.loadFromStorage();
    }

    loadFromStorage() {
        try {
            const applied = localStorage.getItem('appliedJobs');
            const saved = localStorage.getItem('savedJobs');
            
            if (applied) this.appliedJobs = JSON.parse(applied);
            if (saved) this.savedJobs = JSON.parse(saved);
        } catch (error) {
            console.error('Error loading job store:', error);
            this.appliedJobs = [];
            this.savedJobs = [];
        }
    }

    saveToStorage() {
        try {
            localStorage.setItem('appliedJobs', JSON.stringify(this.appliedJobs));
            localStorage.setItem('savedJobs', JSON.stringify(this.savedJobs));
            this.notifyListeners();
        } catch (error) {
            console.error('Error saving job store:', error);
        }
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notifyListeners() {
        this.listeners.forEach(listener => listener());
    }

    // Applied Jobs Methods
    isJobApplied(jobId, jobTitle) {
        return this.appliedJobs.some(job => 
            (job.id && job.id === jobId) || job.title === jobTitle
        );
    }

    applyToJob(job) {
        const jobId = job.id || job.title;
        
        if (this.isJobApplied(jobId, job.title)) {
            return { success: false, message: 'Already applied to this job' };
        }

        const appliedJob = {
            ...job,
            applicationStatus: 'Pending',
            appliedDate: new Date().toISOString()
        };

        this.appliedJobs.push(appliedJob);
        this.saveToStorage();
        
        return { success: true, message: 'Application submitted successfully' };
    }

    getAppliedJobs() {
        return [...this.appliedJobs];
    }

    getAppliedJobIds() {
        // Return both IDs and titles for flexible matching
        const ids = [];
        this.appliedJobs.forEach(job => {
            if (job.id) ids.push(job.id);
            if (job.title) ids.push(job.title);
        });
        return ids;
    }

    // Saved Jobs Methods
    isJobSaved(jobId, jobTitle) {
        return this.savedJobs.some(job => 
            (job.id && job.id === jobId) || job.title === jobTitle
        );
    }

    saveJob(job) {
        const jobId = job.id || job.title;
        
        if (this.isJobSaved(jobId, job.title)) {
            // Remove from saved (toggle off)
            this.savedJobs = this.savedJobs.filter(savedJob => {
                const savedId = savedJob.id || savedJob.title;
                return savedId !== jobId && savedJob.title !== job.title;
            });
        } else {
            // Add to saved (toggle on)
            const savedJob = {
                ...job,
                savedDate: new Date().toISOString()
            };
            this.savedJobs.push(savedJob);
        }

        this.saveToStorage();
        return this.isJobSaved(jobId, job.title);
    }

    getSavedJobs() {
        return [...this.savedJobs];
    }

    // Clear methods (useful for testing/reset)
    clearAppliedJobs() {
        this.appliedJobs = [];
        this.saveToStorage();
    }

    clearSavedJobs() {
        this.savedJobs = [];
        this.saveToStorage();
    }

    clearAll() {
        this.appliedJobs = [];
        this.savedJobs = [];
        this.saveToStorage();
    }
}

// Create singleton instance
const jobStore = new JobStore();

export default jobStore;
