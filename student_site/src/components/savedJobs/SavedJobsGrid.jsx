import React from 'react';
import SavedJobCard from './SavedJobCard';

function SavedJobsGrid({ jobs, onJobClick, showStatus = false, emptyMessage = "No jobs found" }) {
    if (!jobs || jobs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 md:py-16">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-full flex items-center justify-center mb-4 border-4 border-gray-900">
                    <svg className="w-12 h-12 md:w-16 md:h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                    {emptyMessage}
                </h3>
                <p className="text-gray-600 text-center max-w-md">
                    Start swiping on jobs to build your collection!
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {jobs.map((job, index) => (
                <SavedJobCard
                    key={job.id || index}
                    job={job}
                    onClick={onJobClick}
                    showStatus={showStatus}
                />
            ))}
        </div>
    );
}

export default SavedJobsGrid;
