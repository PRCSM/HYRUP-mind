import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Carosal from '../components/jobs/Carosal'
import Job_section from '../components/jobs/Job_section'
import View_More from '../components/jobs/View_More'
import Job_Details from '../components/jobs/Job_Details'
import Hackathon_details from '../components/jobs/Hackathon_details'
import demoData from '../demodata/demodata.json'
import hackathonData from '../demodata/hackathon.json'


function Jobs() {
    const [viewMode, setViewMode] = useState(null); // null, 'jobs', or 'hackathons'
    const [selectedJob, setSelectedJob] = useState(null);
    const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false);
    const [selectedHackathon, setSelectedHackathon] = useState(null);
    const [isHackathonDetailsOpen, setIsHackathonDetailsOpen] = useState(false);

    // Get all jobs
    const allJobs = [
        ...(demoData.companyJobs || []),
        ...(demoData.onCampusJobs || [])
    ];

    // Get all hackathons - hackathon.json is an array directly
    const allHackathons = Array.isArray(hackathonData) ? hackathonData : [];

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
                        jobs={allJobs} 
                        onClose={handleClose}
                        title="All Jobs"
                        onJobClick={handleJobClick}
                    />
                ) : viewMode === 'hackathons' ? (
                    <View_More 
                        key="hackathons-view"
                        jobs={allHackathons} 
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
                            jobsData={allJobs}
                            onJobClick={handleJobClick}
                        />
                        <Job_section 
                            title="Hackathon" 
                            description="Based on your profile, preference and activity like applies, searches and saves"
                            onViewMore={handleViewMoreHackathons}
                            jobsData={allHackathons}
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
