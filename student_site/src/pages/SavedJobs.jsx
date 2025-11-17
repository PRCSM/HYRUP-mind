import React, { useState, useEffect } from 'react';
import Carosal from '../components/jobs/Carosal';
import Job_Details from '../components/jobs/Job_Details';
import View_More from '../components/jobs/View_More';
import { ChevronRight } from 'lucide-react';
import jobStore from '../utils/jobStore';

function SavedJobs() {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [savedJobs, setSavedJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [showAppliedViewMore, setShowAppliedViewMore] = useState(false);
    const [showSavedViewMore, setShowSavedViewMore] = useState(false);

    // Load jobs from jobStore on component mount
    useEffect(() => {
        const loadJobs = () => {
            setAppliedJobs(jobStore.getAppliedJobs());
            setSavedJobs(jobStore.getSavedJobs());
        };

        loadJobs();

        // Subscribe to jobStore changes
        const unsubscribe = jobStore.subscribe(() => {
            loadJobs();
        });

        // Listen for storage changes
        const handleStorageChange = () => {
            loadJobs();
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('jobsUpdated', handleStorageChange);

        return () => {
            unsubscribe();
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('jobsUpdated', handleStorageChange);
        };
    }, []);

    const handleJobClick = (job) => {
        setSelectedJob(job);
        setIsDetailsOpen(true);
    };

    const handleCloseDetails = () => {
        setIsDetailsOpen(false);
        setTimeout(() => setSelectedJob(null), 300);
    };

    return (
        <div className='w-full pt-20 pb-20 md:pb-0 h-full overflow-y-auto custom-scroll'>
            {/* Applied Jobs Section */}
            {!showAppliedViewMore && !showSavedViewMore && appliedJobs.length > 0 && (
                <div className="mb-12">
                    <div className="px-4 md:px-8 mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: 'jost-bold' }}>
                                Applied Jobs
                            </h2>
                            <p className="text-gray-600 text-sm md:text-base" style={{ fontFamily: 'jost-regular' }}>
                                Jobs you have applied to (In House positions)
                            </p>
                        </div>
                        {appliedJobs.length > 3 && (
                            <button
                                onClick={() => setShowAppliedViewMore(true)}
                                className="flex items-center gap-2  font-bold text-sm md:text-base"
                                style={{ fontFamily: 'jost-bold' }}
                            >
                                View More
                                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" strokeWidth={3} />
                            </button>
                        )}
                    </div>
                    <div className="flex justify-center">
                        <Carosal jobsData={appliedJobs} onJobClick={handleJobClick} />
                    </div>
                </div>
            )}

            {/* Saved Jobs Section */}
            {!showAppliedViewMore && !showSavedViewMore && savedJobs.length > 0 && (
                <div className="mb-12">
                    <div className="px-4 md:px-8 mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: 'jost-bold' }}>
                                Saved Jobs
                            </h2>
                            <p className="text-gray-600 text-sm md:text-base" style={{ fontFamily: 'jost-regular' }}>
                                Jobs you're interested in (On Campus & Outreach positions)
                            </p>
                        </div>
                        {savedJobs.length > 3 && (
                            <button
                                onClick={() => setShowSavedViewMore(true)}
                                className="flex items-center gap-2  font-bold text-sm md:text-base"
                                style={{ fontFamily: 'jost-bold' }}
                            >
                                View More
                                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" strokeWidth={3} />
                            </button>
                        )}
                    </div>
                    <div className="flex justify-center">
                        <Carosal jobsData={savedJobs} onJobClick={handleJobClick} />
                    </div>
                </div>
            )}

            {/* View More Layout for Applied Jobs */}
            {showAppliedViewMore && (
                <View_More
                    jobs={appliedJobs}
                    onClose={() => setShowAppliedViewMore(false)}
                    title="Applied Jobs"
                    onJobClick={handleJobClick}
                />
            )}

            {/* View More Layout for Saved Jobs */}
            {showSavedViewMore && (
                <View_More
                    jobs={savedJobs}
                    onClose={() => setShowSavedViewMore(false)}
                    title="Saved Jobs"
                    onJobClick={handleJobClick}
                />
            )}

            {/* Empty State */}
            {!showAppliedViewMore && !showSavedViewMore && appliedJobs.length === 0 && savedJobs.length === 0 && (
                <div className="flex flex-col items-center justify-center h-[60vh] px-4">
                    <svg className="w-24 h-24 mb-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <h3 className="text-xl font-bold text-gray-700 mb-2" style={{ fontFamily: 'jost-bold' }}>
                        No jobs yet
                    </h3>
                    <p className="text-gray-500 text-center" style={{ fontFamily: 'jost-regular' }}>
                        Start swiping right on jobs to save them here
                    </p>
                </div>
            )}

            {/* Job Details Drawer */}
            <Job_Details 
                job={selectedJob} 
                isOpen={isDetailsOpen} 
                onClose={handleCloseDetails}
            />
        </div>
    );
}

export default SavedJobs;
