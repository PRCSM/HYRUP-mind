import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Carosal from '../components/jobs/Carosal'
import Job_section from '../components/jobs/Job_section'
import View_More from '../components/jobs/View_More'
import Job_Details from '../components/jobs/Job_Details'
import Hackathon_details from '../components/jobs/Hackathon_details'
// import demoData from '../demodata/demodata.json'
// import hackathonData from '../demodata/hackathon.json'
import jobStore from '../utils/jobStore'
import apiService from '../../services/apiService'


function Jobs() {
    const [viewMode, setViewMode] = useState(null); // null, 'jobs', or 'hackathons'
    const [selectedJob, setSelectedJob] = useState(null);
    const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false);
    const [selectedHackathon, setSelectedHackathon] = useState(null);
    const [isHackathonDetailsOpen, setIsHackathonDetailsOpen] = useState(false);
    const [appliedJobIds, setAppliedJobIds] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [hackathons, setHackathons] = useState([]);
    const [loading, setLoading] = useState(true);
    // Load applied jobs to filter them out
    React.useEffect(() => {
        const updateAppliedJobs = () => {
            const ids = jobStore.getAppliedJobIds();
            setAppliedJobIds(ids);
        };

        updateAppliedJobs();

        // Subscribe to jobStore changes
        const unsubscribe = jobStore.subscribe(() => {
            updateAppliedJobs();
        });

        // Listen for job applied event
        const handleJobApplied = () => {
            updateAppliedJobs();
        };

        window.addEventListener('jobApplied', handleJobApplied);

        return () => {
            unsubscribe();
            window.removeEventListener('jobApplied', handleJobApplied);
        };
    }, []);

    React.useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);

      const jobResponse = await apiService.getStudentJobs();  
      const hackathonResponse = await apiService.getHackathons();

      // Normalize job IDs (_id → id)
      const normalizedJobs = (jobResponse?.data || jobResponse || []).map((job, i) => ({
        ...job,
        id: job.id ?? job._id ?? `job-${i}`
      }));

      setJobs(normalizedJobs);
      setHackathons(hackathonResponse?.data || hackathonResponse || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setJobs([]);
      setHackathons([]);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

    // Get all jobs and filter out applied ones
    // const allJobs = [
    //     ...(demoData.companyJobs || []),
    //     ...(demoData.onCampusJobs || [])
    // ].filter(job => {
    //     // Check if either the id or title is in appliedJobIds
    //     const isAppliedById = job.id && appliedJobIds.includes(job.id);
    //     const isAppliedByTitle = job.title && appliedJobIds.includes(job.title);
    //     return !isAppliedById && !isAppliedByTitle;
    // });
    const filteredJobs = jobs.filter(job => {
  const isAppliedById = appliedJobIds.includes(job.id);
  const isAppliedByTitle = appliedJobIds.includes(job.title);
  return !isAppliedById && !isAppliedByTitle;
});


    // Get all hackathons - hackathon.json is an array directly
    // const allHackathons = Array.isArray(hackathonData) ? hackathonData : [];

    const handleViewMoreJobs = () => {
        setViewMode('jobs');
    };

    const handleViewMoreHackathons = () => {
        setViewMode('hackathons');
    };

    const handleClose = () => {
        setViewMode(null);
    };

    const handleJobClick = (item) => {
        // Check if it's a hackathon by checking for organizer field
        const isHackathon = item?.organizer !== undefined;
        
        if (isHackathon) {
            setSelectedHackathon(item);
            setIsHackathonDetailsOpen(true);
        } else {
            setSelectedJob(item);
            setIsJobDetailsOpen(true);
        }
    };

    const handleJobDetailsClose = () => {
        setIsJobDetailsOpen(false);
        setTimeout(() => setSelectedJob(null), 300); // Clear after animation
    };

    const handleHackathonDetailsClose = () => {
        setIsHackathonDetailsOpen(false);
        setTimeout(() => setSelectedHackathon(null), 300); // Clear after animation
    };

    return (
        <div className='relative w-full h-full pt-20 pb-24 md:pb-0 flex flex-col overflow-y-auto overflow-x-hidden'>
            <AnimatePresence mode="wait">
                {viewMode === 'jobs' ? (
                    <View_More 
                        key="jobs-view"
                        // jobs={allJobs} 
                        jobs={filteredJobs} 
                        onClose={handleClose}
                        title="All Jobs"
                        onJobClick={handleJobClick}
                    />
                ) : viewMode === 'hackathons' ? (
                    <View_More 
                        key="hackathons-view"
                        // jobs={allHackathons} 
                        jobs={hackathons} 
                        onClose={handleClose}
                        title="All Hackathons"
                        onJobClick={handleJobClick}
                    />
                ) : (
                    <motion.div
                        key="sections-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Job_section 
                            title="Top job picks for you" 
                            description="Based on your profile, preference and activity like applies, searches and saves"
                            onViewMore={handleViewMoreJobs}
                            // jobsData={allJobs}
                            jobsData={filteredJobs}
                            onJobClick={handleJobClick}
                        />
                        <Job_section 
                            title="Hackathon" 
                            description="Based on your profile, preference and activity like applies, searches and saves"
                            onViewMore={handleViewMoreHackathons}
                            // jobsData={allHackathons}
                            jobsData={hackathons}
                            onJobClick={handleJobClick}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Job Details Modal */}
            <Job_Details 
                job={selectedJob}
                isOpen={isJobDetailsOpen}
                onClose={handleJobDetailsClose}
            />

            {/* Hackathon Details Modal */}
            <Hackathon_details 
                hackathon={selectedHackathon}
                isOpen={isHackathonDetailsOpen}
                onClose={handleHackathonDetailsClose}
            />
        </div>
    )
}

export default Jobs
