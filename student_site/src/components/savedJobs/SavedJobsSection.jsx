import React, { useState } from 'react';
import SavedJobsGrid from './SavedJobsGrid';

function SavedJobsSection({ title, description, jobs, onJobClick, showStatus = false, emptyMessage }) {
    const [activeFilter, setActiveFilter] = useState('All');
    const filters = ['All', 'Recent', 'This Week', 'This Month'];

    return (
        <div className="w-full px-4 md:px-8 py-4 md:py-6">
            {/* Section Header */}
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'jost-bold' }}>
                    {title}
                </h1>
                <p className="text-gray-600 text-sm md:text-lg mb-4" style={{ fontFamily: 'jost-regular' }}>
                    {description}
                </p>

                {/* Filter Buttons */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-3 md:px-4 py-1.5 md:py-2 cursor-pointer rounded-lg font-medium transition-all duration-200 text-sm md:text-base whitespace-nowrap ${
                                activeFilter === filter
                                    ? 'bg-[#d4f4c4] text-gray-900 border-2 border-gray-900'
                                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'
                            }`}
                            style={{ fontFamily: 'jost-medium' }}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Jobs Grid */}
            <SavedJobsGrid 
                jobs={jobs} 
                onJobClick={onJobClick} 
                showStatus={showStatus}
                emptyMessage={emptyMessage}
            />
        </div>
    );
}

export default SavedJobsSection;
