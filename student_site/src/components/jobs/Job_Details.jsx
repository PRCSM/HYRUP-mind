import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, BadgeCheck, Heart, MessageSquare } from 'lucide-react';

const toList = (value) => {
	if (!value) return [];
	if (Array.isArray(value)) {
		return value
			.filter(Boolean)
			.map((item) => (typeof item === 'string' ? item.trim() : item))
			.filter(Boolean);
	}
	return value
		.split(/\r?\n|•|\u2022/)
		.flatMap((segment) => segment.split(/\.(?!\d)/))
		.map((item) => item.replace(/^[•\-\s]+/, '').trim())
		.filter(Boolean);
};

function Job_Details({ job, isOpen, onClose }) {
    if (!job) return null;

    const {
        title = "UI/UX Designer",
        company = "Lumel Technologies",
        location = "Coimbatore, Tamil Nadu, India",
        postedTime = "3 weeks ago",
        applicantCount = "Over 100 people",
        jobType = "In House",
        employmentType = "Full time",
        duration = "2month",
        mode = "Online",
        stipend = "20k/month",
        preferences = {},
        openings = "75",
        rolesAndResponsibilities,
        perks,
        aboutJob,
        aboutCompany
    } = job;

    const skills = Array.isArray(preferences?.skills) ? preferences.skills : [];
    const rolesList = toList(rolesAndResponsibilities);
    const perksList = toList(perks);

    // Determine pill color based on jobType
    const getPillColor = () => {
        const type = (jobType || '').toLowerCase();
        if (type.includes('campus')) {
            return '#40FFB9';
        } else if (type.includes('outreach') || type.includes('out reach')) {
            return '#F74C32';
        }
        return '#FAB648';
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        key="overlay"
                        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Drawer */}
                    <motion.div
                        key="drawer"
                        className="fixed inset-0 z-50 flex flex-col"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    >
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                            className="mt-auto w-full md:w-[90vw] lg:w-[70vw] md:mx-auto h-[92vh] overflow-hidden rounded-t-[20px] border-[3px] border-[#1f1f1f] bg-[#F5F5F5] shadow-[0_-10px_0px_rgba(0,0,0,0.35)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex h-full flex-col">
                                <div className="flex-1 overflow-y-auto custom-scroll pb-12">
                                    {/* Top Section with White Background */}
                                    <div className="relative bg-white px-6 pt-5 pb-6 border-b-[3px] border-[#1f1f1f]">
                                        {/* Header with Back Button */}
                                        <div className="flex items-center justify-between mb-4">
                                            <button
                                                type="button"
                                                onClick={onClose}
                                                className="flex h-11 w-11 items-center justify-center rounded-[10px] border-[3px] border-[#1f1f1f] bg-white shadow-[4px_4px_0px_rgba(0,0,0,0.25)] cursor-pointer hover:shadow-[6px_6px_0px_rgba(0,0,0,0.35)] transition-shadow"
                                                aria-label="Go back"
                                            >
                                                <ArrowLeft className="h-5 w-5 text-[#1f1f1f]" strokeWidth={2.5} />
                                            </button>
                                        </div>

                                        {/* Ribbon Tag */}
                                        <div className="absolute top-10 right-0 z-20">
                                            <div
                                                className="border-y-[3px] border-l-[3px] border-[#1f1f1f] pl-4 md:pl-10 pr-4 md:pr-6 py-1.5 font-extrabold text-[#1f1f1f] capitalize text-xs md:text-[17px] relative flex items-center"
                                                style={{
                                                    backgroundColor: getPillColor(),
                                                    boxShadow: '-4px 4px 0px 0px rgba(0,0,0,1)',
                                                    fontFamily: 'jost-bold'
                                                }}
                                            >
                                                {jobType}
                                            </div>
                                        </div>

                                        {/* Title Section */}
                                        <div className="mb-3">
                                            <h1 className="text-2xl md:text-[38px] font-black text-[#1f1f1f] leading-tight mb-2" style={{ fontFamily: 'jost-bold' }}>
                                                {title}
                                            </h1>
                                            <div className="flex items-center gap-2">
                                                <p className="text-base md:text-[25px] font-bold text-[#1f1f1f]" style={{ fontFamily: 'jost-semibold' }}>
                                                    {company}
                                                </p>
                                                <BadgeCheck className="h-5 w-5 text-blue-500 fill-blue-500" strokeWidth={2.5} />
                                            </div>
                                        </div>

                                        {/* Location and Stats */}
                                        <p className="text-sm md:text-[19px] text-[#757575] md:text-[#666666] mb-3 md:mb-4" style={{ fontFamily: 'jost-regular' }}>
                                            {location} · {postedTime} · {applicantCount} clicked apply
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="rounded-full border-2 border-dashed border-[#1f1f1f] bg-[#FFFDE7] md:bg-[#FFF9E6] px-4 py-1.5 text-xs md:text-[15px] font-bold text-[#1f1f1f]" style={{ fontFamily: 'jost-bold' }}>
                                                On-site
                                            </span>
                                            <span className="rounded-full border-2 border-dashed border-[#1f1f1f] bg-[#FFFDE7] md:bg-[#FFF9E6] px-4 py-1.5 text-xs md:text-[15px] font-bold text-[#1f1f1f]" style={{ fontFamily: 'jost-bold' }}>
                                                {employmentType}
                                            </span>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center justify-between gap-3 mb-3 md:mb-4">
                                            <button
                                                className="flex items-center justify-center rounded-[10px] border-[3px] border-[#1f1f1f] bg-[#E3FEAA] px-6 md:px-8 py-3 text-base font-extrabold text-[#1f1f1f] shadow-[6px_6px_0px_rgba(0,0,0,0.35)] transition-transform active:translate-y-0.5 cursor-pointer"
                                                style={{ fontFamily: 'jost-bold' }}
                                            >
                                                Apply Now
                                            </button>
                                            <div className="flex justify-between items-center gap-3 md:gap-4">
                                                <button
                                                    className="flex items-center justify-center rounded-[10px] border-[3px] border-[#1f1f1f] bg-[#F8BBD0] p-3.5 shadow-[6px_6px_0px_rgba(0,0,0,0.35)] transition-transform active:translate-y-0.5 cursor-pointer"
                                                    aria-label="Save job"
                                                >
                                                    <Heart className="h-6 w-6 text-[#1f1f1f]" strokeWidth={2.5} />
                                                </button>
                                                <button
                                                    className="flex items-center justify-center rounded-[10px] border-[3px] border-[#1f1f1f] bg-white p-3.5 shadow-[6px_6px_0px_rgba(0,0,0,0.35)] transition-transform active:translate-y-0.5 cursor-pointer"
                                                    aria-label="Chat"
                                                >
                                                    <MessageSquare className="h-6 w-6 text-[#1f1f1f]" strokeWidth={2.5} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* No. of Openings */}
                                        <div className="inline-block rounded-[10px] border-[3px] border-[#1f1f1f] bg-white px-5 md:px-6 py-2.5 text-sm md:text-[15px] font-extrabold text-[#1f1f1f] shadow-[6px_6px_0px_rgba(0,0,0,0.35)]" style={{ fontFamily: 'jost-bold' }}>
                                            No. of Openings <span className="ml-2">{openings}</span>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="px-6">
                                        {/* About the job */}
                                        <section className="mt-6">
                                            <h2 className="text-lg md:text-[27px] font-black text-[#1f1f1f] mb-3" style={{ fontFamily: 'jost-bold' }}>
                                                About the job :
                                            </h2>
                                            <div className="rounded-[10px] md:rounded-[15px] border-[3px] border-[#1f1f1f] bg-white p-4 md:p-5 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] md:shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                                                <div className="grid grid-cols-2 md:flex gap-3 md:justify-center">
                                                    <div className="md:w-[calc(23%-9px)] text-center rounded-[10px] md:rounded-[12px] border-[3px] border-[#1f1f1f] bg-white px-3 md:px-4 py-3 shadow-none">
                                                        <p className="text-base md:text-[25px] font-extrabold text-[#1f1f1f] mb-1" style={{ fontFamily: 'jost-bold' }}>
                                                            Job Type
                                                        </p>
                                                        <p className="text-sm md:text-[18px] capitalize font-medium text-[#6B6B6B] md:text-[#666666]" style={{ fontFamily: 'jost-medium' }}>
                                                            {employmentType}
                                                        </p>
                                                    </div>
                                                    <div className="md:w-[calc(23%-9px)] text-center rounded-[10px] md:rounded-[12px] border-[3px] border-[#1f1f1f] bg-white px-3 md:px-4 py-3 shadow-none">
                                                        <p className="text-base md:text-[25px] font-extrabold text-[#1f1f1f] mb-1" style={{ fontFamily: 'jost-bold' }}>
                                                            Duration
                                                        </p>
                                                        <p className="text-sm md:text-[18px] font-medium text-[#6B6B6B] md:text-[#666666]" style={{ fontFamily: 'jost-medium' }}>
                                                            {duration}
                                                        </p>
                                                    </div>
                                                    <div className="md:w-[calc(23%-9px)] text-center rounded-[10px] md:rounded-[12px] border-[3px] border-[#1f1f1f] bg-white px-3 md:px-4 py-3 shadow-none">
                                                        <p className="text-base md:text-[25px] font-extrabold text-[#1f1f1f] mb-1" style={{ fontFamily: 'jost-bold' }}>
                                                            Mode
                                                        </p>
                                                        <p className="text-sm md:text-[18px] font-medium text-[#6B6B6B] md:text-[#666666]" style={{ fontFamily: 'jost-medium' }}>
                                                            {mode}
                                                        </p>
                                                    </div>
                                                    <div className="md:w-[calc(23%-9px)] text-center rounded-[10px] md:rounded-[12px] border-[3px] border-[#1f1f1f] bg-white px-3 md:px-4 py-3 shadow-none">
                                                        <p className="text-base md:text-[25px] font-extrabold text-[#1f1f1f] mb-1" style={{ fontFamily: 'jost-bold' }}>
                                                            Stipend
                                                        </p>
                                                        <p className="text-sm md:text-[18px] font-medium text-[#6B6B6B] md:text-[#666666]" style={{ fontFamily: 'jost-medium' }}>
                                                            {stipend}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                {/* Skills inside About the job container */}
                                                {skills.length > 0 && (
                                                    <div className="mt-5 pt-4 border-t-[3px] border-[#1f1f1f]">
                                                        <p className="text-base md:text-[24px] font-extrabold text-[#1f1f1f] mb-3" style={{ fontFamily: 'jost-bold' }}>
                                                            Skills:
                                                        </p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {skills.map((skill, index) => (
                                                                <span
                                                                    key={index}
                                                                    className="rounded-full border-[3px] md:border-[2.5px] border-[#1f1f1f] bg-[#E0F2FE] md:bg-white px-4 py-1.5 text-xs md:text-[16px] font-bold text-[#0C4A6E] md:text-[#00BCD4] uppercase shadow-[2px_2px_0px_rgba(0,0,0,0.15)] md:shadow-none"
                                                                    style={{ fontFamily: 'jost-bold' }}
                                                                >
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </section>

                                        {/* Roles and Responsibility */}
                                        {rolesList.length > 0 && (
                                            <section className="mt-6">
                                                <h2 className="text-lg md:text-[17px] font-black text-[#1f1f1f] mb-3" style={{ fontFamily: 'jost-bold' }}>
                                                    Roles and Responsibility:
                                                </h2>
                                                <div className="rounded-[10px] md:rounded-[15px] border-[3px] border-[#1f1f1f] bg-white p-4 md:p-5 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] md:shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                                                    <p className="text-sm md:text-[17px] leading-relaxed text-[#1f1f1f] whitespace-pre-line" style={{ fontFamily: 'jost-regular' }}>
                                                        {rolesList.join('\n\n')}
                                                    </p>
                                                </div>
                                            </section>
                                        )}

                                        {/* Perks */}
                                        {perksList.length > 0 && (
                                            <section className="mt-6">
                                                <h2 className="text-lg md:text-[17px] font-black text-[#1f1f1f] mb-3" style={{ fontFamily: 'jost-bold' }}>
                                                    Perks:
                                                </h2>
                                                <div className="flex flex-wrap gap-3">
                                                    {perksList.map((perk, index) => (
                                                        <span
                                                            key={index}
                                                            className="rounded-full border-[3px] md:border-[2.5px] border-[#1f1f1f] md:border-[#1FA7E3] bg-[#DBF4FF] md:bg-transparent px-5 py-2 text-sm md:text-[16px] font-bold text-[#0369A1] shadow-[3px_3px_0px_rgba(0,0,0,0.2)] md:shadow-[2px_2px_0px_#1FA7E3]"
                                                            style={{ fontFamily: 'jost-bold' }}
                                                        >
                                                            {perk}
                                                        </span>
                                                    ))}
                                                </div>
                                            </section>
                                        )}

                                        {/* Details */}
                                        <section className="mt-6">
                                            <h2 className="text-lg md:text-[27px] font-black text-[#1f1f1f] mb-3" style={{ fontFamily: 'jost-bold' }}>
                                                Details :
                                            </h2>
                                            <div className="rounded-[10px] md:rounded-[15px] border-[3px] border-[#1f1f1f] bg-white p-4 md:p-5 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] md:shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                                                <p className="whitespace-pre-line text-sm md:text-[17px] leading-relaxed text-[#1f1f1f]" style={{ fontFamily: 'jost-regular' }}>
                                                    {aboutJob || 'Details will be shared during the interview process.'}
                                                </p>
                                            </div>
                                        </section>

                                        {/* About Company */}
                                        <section className="mt-6 mb-6">
                                            <h2 className="text-lg md:text-[27px] font-black text-[#1f1f1f] mb-3" style={{ fontFamily: 'jost-bold' }}>
                                                About {company} :
                                            </h2>
                                            <div className="rounded-[10px] md:rounded-[15px] border-[3px] border-[#1f1f1f] bg-white p-4 md:p-5 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] md:shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                                                <p className="whitespace-pre-line text-sm md:text-[17px] leading-relaxed text-[#1f1f1f]" style={{ fontFamily: 'jost-regular' }}>
                                                    {aboutCompany || 'Company information will be shared with shortlisted candidates.'}
                                                </p>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default Job_Details;
