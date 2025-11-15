import React, { useState } from 'react'
import Carosal from './Carosal'

function Job_section({ title = "Top job picks for you", description = "Based on your profile, preference and activity like applies, searches and saves", onViewMore, jobsData = [], onJobClick }) {
    const [activeFilter, setActiveFilter] = useState('Featured');
    const filters = ['Featured', 'Live', 'Upcoming', 'New'];

    return (
        <div className="w-full px-4 md:px-8 py-4">
            {/* Section Header */}
            <div className="mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'jost-bold' }}>
                    {title}
                </h1>
                <p className="text-gray-600 text-sm md:text-lg mb-3" style={{ fontFamily: 'jost-regular' }}>
                    {description}
                </p>

                {/* Filter Buttons and View More */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
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
                    <button 
                        onClick={onViewMore}
                        className="text-gray-900 font-semibold hover:underline text-base md:text-lg cursor-pointer whitespace-nowrap md:ml-auto" 
                        style={{ fontFamily: 'jost-semibold' }}
                    >
                        View more
                    </button>
                </div>
            </div>
            
            {/* Carousel Section */}
            <div className='w-full'>
                <Carosal jobsData={jobsData} onJobClick={onJobClick} />
            </div>
            
        </div>
    )
}

export default Job_section
