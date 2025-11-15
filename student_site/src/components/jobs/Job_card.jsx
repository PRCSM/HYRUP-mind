import React from 'react';
import { BadgeCheck } from 'lucide-react';

function Job_card({ job, onClick }) {
    // Check if it's a hackathon or a job
    const isHackathon = job?.organizer !== undefined;

    const handleClick = () => {
        // Trigger onClick for both jobs and hackathons
        if (onClick) {
            onClick(job);
        }
    };

    const {
        title = "UI/UX Designer",
        company,
        companyName,
        organizer,
        location,
        openings,
        noOfOpenings,
        prizePool,
        mode,
        tags = [],
        jobType,
        employmentType,
        startDate,
        endDate,
        aboutCompany,
        preferences = {}
    } = job || {};

    // Extract company name from aboutCompany if company/companyName not available
    const extractCompanyName = () => {
        if (company) return company;
        if (companyName) return companyName;
        if (aboutCompany) {
            // Extract company name from the first sentence (usually format: "CompanyName is...")
            const match = aboutCompany.match(/^([^.]+?)\s+(?:is|was|are)/);
            if (match) return match[1].trim();
        }
        return "Lumel Technologies";
    };

    // Format dates for hackathons
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // Use appropriate values based on whether it's a hackathon or job
    const displayCompany = isHackathon ? organizer : extractCompanyName();
    const displayLocation = location || preferences?.location || "Coimbatore, Tamil Nadu, India";
    const displayJobType = isHackathon ? formatDate(startDate) : jobType || "In House";
    const displayEmploymentType = isHackathon ? formatDate(endDate) : employmentType || "FULL TIME";
    const displayOpenings = isHackathon ? mode : (noOfOpenings ? `${noOfOpenings} opening${noOfOpenings !== 1 ? 's' : ''}` : openings || "200 openings");

    // Determine pill color based on jobType
    const getPillColor = () => {
        if (isHackathon) {
            return 'bg-[#FAB648] hover:bg-[#f5a825]'; // Default yellow for hackathons
        }
        const type = (jobType || '').toLowerCase();
        if (type.includes('campus')) {
            return 'bg-[#40FFB9] hover:bg-[#2ee6a6]';
        } else if (type.includes('outreach') || type.includes('out reach')) {
            return 'bg-[#F74C32] hover:bg-[#e03d23]';
        }
        return 'bg-[#FAB648] hover:bg-[#f5a825]';
    };

    return (
        <div 
            onClick={handleClick}
            className={`w-[280px] md:w-[350px] h-[230px] md:h-[270px] shrink-0 bg-white rounded-[10px] overflow-hidden border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer`}
        >
            {/* Banner Section with Purple Gradient */}
            <div className="relative h-[40%] bg-[#35199d] flex items-center justify-start px-4 md:px-8 overflow-hidden">
                {/* Background Pattern/Texture */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-linear-to-br from-transparent to-black/20"></div>
                </div>
                
                {/* Main Title Text - Dynamic based on job title */}
                <div className="relative z-10 text-left">
                    {title.split(' ').slice(0, 2).map((word, index) => (
                        <h3 key={index} className="text-[24px] md:text-[40px] font-black text-[#B74329] leading-[1.05] tracking-tight uppercase" style={{ fontFamily: 'inter-extra' }}>
                            {word}
                        </h3>
                    ))}
                </div>

                {/* Bottom Right Button on Banner */}
                <div className="absolute bottom-2 md:bottom-4 right-3 md:right-6">
                    <button className="w-[50px] md:w-[70px] h-[20px] md:h-[25px] bg-transparent border-[2px] md:border-[2.5px] border-[#B74329] rounded-full text-[#B74329] font-semibold text-xs md:text-sm hover:text-white transition-all duration-200 ease-out">
                        
                    </button>
                </div>
            </div>

            {/* Card Content */}
            <div className="px-3 md:px-6 pt-2 md:pt-3 pb-2 md:pb-4 flex items-start justify-between gap-2 md:gap-4">
                {/* Left Section - Text Content */}
                <div className="flex-1 min-w-0">
                    {/* Job Title */}
                    <h4 className="text-[18px] md:text-[26px] font-bold text-gray-900 leading-tight mb-1 md:mb-2 truncate" style={{ fontFamily: 'jost-bold' }}>
                        {title}
                    </h4>

                    {/* Company Name with Verified Badge */}
                    <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2 min-w-0">
                        <span className="text-[14px] md:text-[18px] text-gray-900 font-medium truncate" style={{ fontFamily: 'jost-medium' }}>
                            {displayCompany}
                        </span>
                        <BadgeCheck className="w-[14px] md:w-[18px] h-[14px] md:h-[18px] text-blue-500 fill-blue-500 shrink-0" strokeWidth={1.5} />
                    </div>

                    {/* Location and Openings */}
                    <div className="flex items-center gap-1.5 md:gap-2 text-[11px] md:text-[14px] text-gray-600 mb-1.5 md:mb-3 min-w-0" style={{ fontFamily: 'jost-regular' }}>
                        <span className="truncate">{displayLocation}</span>
                        <span className="text-gray-400 shrink-0">•</span>
                    </div>
                    
                    <div className="text-[12px] md:text-[16px] text-[#00a8e8] font-semibold whitespace-nowrap" style={{ fontFamily: 'jost-semibold' }}>
                        {displayOpenings}
                    </div>
                </div>

                {/* Right Section - Pills */}
                <div className="flex flex-col text-center gap-1 md:gap-1.5 shrink-0">
                    <span className={`px-3 md:px-6 py-1 md:py-2 rounded-full text-black font-semibold text-[10px] md:text-[13px] whitespace-nowrap transition-colors duration-200 ${getPillColor()}`}>
                        {displayJobType}
                    </span>
                    <span className="px-3 md:px-6 py-1 md:py-2 bg-white border-[2px] md:border-[2.5px] border-black rounded-full text-black font-semibold text-[10px] md:text-[13px] whitespace-nowrap hover:bg-gray-50 transition-colors duration-200">
                        {displayEmploymentType}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Job_card;
