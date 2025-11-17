import React from 'react';
import { BadgeCheck, MapPin, Briefcase } from 'lucide-react';

function SavedJobCard({ job, onClick, showStatus = false }) {
    const handleClick = () => {
        if (onClick) {
            onClick(job);
        }
    };

    const {
        title = "UI/UX Designer",
        company,
        companyName,
        location,
        jobType,
        employmentType,
        experience,
        aboutCompany,
        applicationStatus = 'Pending'
    } = job || {};

    // Extract company name
    const extractCompanyName = () => {
        if (company) return company;
        if (companyName) return companyName;
        if (aboutCompany) {
            const match = aboutCompany.match(/^([^.]+?)\s+(?:is|was|are)/);
            if (match) return match[1].trim();
        }
        return "Company";
    };

    const displayCompany = extractCompanyName();

    // Status color mapping
    const statusStyles = {
        'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-300',
        'Under Review': 'bg-blue-100 text-blue-800 border-blue-300',
        'Shortlisted': 'bg-green-100 text-green-800 border-green-300',
        'Rejected': 'bg-red-100 text-red-800 border-red-300',
        'Accepted': 'bg-emerald-100 text-emerald-800 border-emerald-300'
    };

    return (
        <div
            onClick={handleClick}
            className="bg-white rounded-[15px] border-4 border-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.25)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,0.25)] transition-all duration-200 p-4 md:p-6 cursor-pointer active:translate-y-1"
        >
            {/* Job Type Badge */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-[#A7F3D0] to-[#6EE7B7] border-2 border-gray-900">
                        {jobType || 'In House'}
                    </span>
                    {employmentType && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FEF3C7] border-2 border-gray-900">
                            {employmentType}
                        </span>
                    )}
                </div>
            </div>

            {/* Job Title */}
            <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-2 line-clamp-2">
                {title}
            </h3>

            {/* Company Name or Status */}
            {showStatus ? (
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-semibold text-gray-700">Status:</span>
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold border-2 ${statusStyles[applicationStatus] || statusStyles['Pending']}`}>
                        {applicationStatus}
                    </span>
                </div>
            ) : (
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-base md:text-lg font-semibold text-gray-700">
                        {displayCompany}
                    </span>
                    <BadgeCheck className="w-5 h-5 text-blue-500" />
                </div>
            )}

            {/* Job Details */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm text-gray-600">
                {location && (
                    <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-purple-600" />
                        <span className="font-medium">{location}</span>
                    </div>
                )}
                {experience && (
                    <div className="flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-purple-600" />
                        <span className="font-medium">{experience}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SavedJobCard;
