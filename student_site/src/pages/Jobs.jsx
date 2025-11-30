import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Carosal from '../components/jobs/Carosal'
import Job_section from '../components/jobs/Job_section'
import View_More from '../components/jobs/View_More'
import Job_Details from '../components/jobs/Job_Details'
import Hackathon_details from '../components/jobs/Hackathon_details'

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

                const getArray = (res) => {
                    if (Array.isArray(res)) return res;
                    if (res?.data && Array.isArray(res.data)) return res.data;
                    if (res?.jobs && Array.isArray(res.jobs)) return res.jobs;
                    if (res?.hackathons && Array.isArray(res.hackathons)) return res.hackathons;
                    return [];
                };

                const rawJobs = getArray(jobResponse);
                const rawHackathons = getArray(hackathonResponse);

                const normalizedJobs = rawJobs.map((job, i) => {
                    const companyName = job.recruiter?.company?.name || job.college || job.company || job.companyName;
                    const companyDescription = job.recruiter?.company?.description || job.aboutCompany;
                    const companyLogo = job.recruiter?.company?.logo;

                    return {
                        ...job,
                        id: job.id ?? job._id ?? `job-${i}`,
                        company: companyName,
                        companyName: companyName,
                        aboutCompany: companyDescription,
                        companyLogo: companyLogo,
                        aboutJob: job.details || job.description,
                        location: job.preferences?.location || job.location,
                        skills: job.preferences?.skills || [],
                    };
                });

                setJobs(normalizedJobs);
                setHackathons(rawHackathons);
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


    const filteredJobs = jobs.filter(job => {
        const isAppliedById = appliedJobIds.includes(job.id);
        const isAppliedByTitle = appliedJobIds.includes(job.title);
        return !isAppliedById && !isAppliedByTitle;
    });




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

                        jobs={filteredJobs}
                        onClose={handleClose}
                        title="All Jobs"
                        onJobClick={handleJobClick}
                    />
                ) : viewMode === 'hackathons' ? (
                    <View_More
                        key="hackathons-view"

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

                            jobsData={filteredJobs}
                            onJobClick={handleJobClick}
                        />
                        <Job_section
                            title="Hackathon"
                            description="Based on your profile, preference and activity like applies, searches and saves"
                            onViewMore={handleViewMoreHackathons}

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
