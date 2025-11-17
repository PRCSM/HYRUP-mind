import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, BadgeCheck, Heart, MessageSquare, Calendar, Users, Award, Globe } from 'lucide-react';

function Hackathon_details({ hackathon, isOpen, onClose }) {
    if (!hackathon) return null;

    const {
        title = "Hackathon Title",
        organizer = "Organizer Name",
        description = "",
        location = "Online",
        startDate,
        endDate,
        registrationDeadline,
        prizePool = "",
        eligibility = "",
        organizedBy = "",
        mode = "Team",
        website = ""
    } = hackathon;

    // Format date function
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Calculate duration in days
    const calculateDuration = () => {
        if (!startDate || !endDate) return 'TBD';
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
    };

    // Get location color
    const getLocationColor = () => {
        const loc = location.toLowerCase();
        if (loc === 'online') return '#60A5FA';
        if (loc === 'offline') return '#F97316';
        if (loc === 'hybrid') return '#A78BFA';
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
                            className="mt-auto w-full md:w-[90vw] lg:w-[70vw] md:mx-auto h-[90vh] md:h-[85vh] overflow-hidden rounded-t-[20px] border-[3px] border-[#1f1f1f] bg-[#F5F5F5] shadow-[0_-5px_0px_rgba(0,0,0,0.35)]"
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
                                                    backgroundColor: getLocationColor(),
                                                    boxShadow: '-4px 4px 0px 0px rgba(0,0,0,1)',
                                                    fontFamily: 'jost-bold'
                                                }}
                                            >
                                                {location}
                                            </div>
                                        </div>

                                        {/* Title Section */}
                                        <div className="mb-3">
                                            <h1 className="text-2xl md:text-[38px] font-black text-[#1f1f1f] leading-tight mb-2" style={{ fontFamily: 'jost-bold' }}>
                                                {title}
                                            </h1>
                                            <div className="flex items-center gap-2">
                                                <p className="text-base md:text-[25px] font-bold text-[#1f1f1f]" style={{ fontFamily: 'jost-semibold' }}>
                                                    {organizer}
                                                </p>
                                                <BadgeCheck className="h-5 w-5 text-blue-500 fill-blue-500" strokeWidth={2.5} />
                                            </div>
                                        </div>

                                        {/* Event Dates */}
                                        <div className="flex items-center gap-2 text-sm md:text-[19px] text-[#757575] md:text-[#666666] mb-3 md:mb-4" style={{ fontFamily: 'jost-regular' }}>
                                            <Calendar className="h-4 md:h-5 w-4 md:w-5" />
                                            <span>{formatDate(startDate)}</span>
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="rounded-full border-2 border-dashed border-[#1f1f1f] bg-[#FFFDE7] md:bg-[#FFF9E6] px-4 py-1.5 text-xs md:text-[15px] font-bold text-[#1f1f1f]" style={{ fontFamily: 'jost-bold' }}>
                                                {mode}
                                            </span>
                                            <span className="rounded-full border-2 border-dashed border-[#1f1f1f] bg-[#E0F2FE] px-4 py-1.5 text-xs md:text-[15px] font-bold text-[#1f1f1f]" style={{ fontFamily: 'jost-bold' }}>
                                                {prizePool}
                                            </span>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center justify-between gap-3 mb-3 md:mb-4">
                                            <button
                                                className="flex items-center justify-center rounded-[10px] border-[3px] border-[#1f1f1f] bg-[#E3FEAA] px-6 md:px-8 py-3 text-base font-extrabold text-[#1f1f1f] shadow-[6px_6px_0px_rgba(0,0,0,0.35)] transition-transform active:translate-y-0.5 cursor-pointer"
                                                style={{ fontFamily: 'jost-bold' }}
                                                onClick={() => website && window.open(website, '_blank')}
                                            >
                                                Register Now
                                            </button>
                                            <div className="flex justify-between items-center gap-3 md:gap-4">
                                                <button
                                                    className="flex items-center justify-center rounded-[10px] border-[3px] border-[#1f1f1f] bg-[#F8BBD0] p-3.5 shadow-[6px_6px_0px_rgba(0,0,0,0.35)] transition-transform active:translate-y-0.5 cursor-pointer"
                                                    aria-label="Save hackathon"
                                                >
                                                    <Heart className="h-6 w-6 text-[#1f1f1f]" strokeWidth={2.5} />
                                                </button>
                                                <button
                                                    className="flex items-center justify-center rounded-[10px] border-[3px] border-[#1f1f1f] bg-white p-3.5 shadow-[6px_6px_0px_rgba(0,0,0,0.35)] transition-transform active:translate-y-0.5 cursor-pointer"
                                                    aria-label="Share"
                                                >
                                                    <MessageSquare className="h-6 w-6 text-[#1f1f1f]" strokeWidth={2.5} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Registration Deadline */}
                                        {registrationDeadline && (
                                            <div className="inline-block rounded-[10px] border-[3px] border-[#1f1f1f] bg-white px-5 md:px-6 py-2.5 text-sm md:text-[15px] font-extrabold text-[#1f1f1f] shadow-[6px_6px_0px_rgba(0,0,0,0.35)]" style={{ fontFamily: 'jost-bold' }}>
                                                Registration Deadline: <span className="ml-2">{formatDate(registrationDeadline)}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content Section */}
                                    <div className="px-6">
                                        {/* Hackathon Details */}
                                        <section className="mt-6">
                                            <h2 className="text-lg md:text-[27px] font-black text-[#1f1f1f] mb-3" style={{ fontFamily: 'jost-bold' }}>
                                                Hackathon Details :
                                            </h2>
                                            <div className="rounded-[10px] md:rounded-[15px] border-[3px] border-[#1f1f1f] bg-white p-4 md:p-5 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] md:shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                                                <div className="grid grid-cols-2 md:flex gap-3 md:justify-center">
                                                    <div className="md:w-[calc(23%-9px)] text-center rounded-[10px] md:rounded-[12px] border-[3px] border-[#1f1f1f] bg-white px-3 md:px-4 py-3 shadow-none">
                                                        <p className="text-base md:text-[25px] font-extrabold text-[#1f1f1f] mb-1" style={{ fontFamily: 'jost-bold' }}>
                                                            Duration
                                                        </p>
                                                        <p className="text-sm md:text-[18px] font-medium text-[#6B6B6B] md:text-[#666666]" style={{ fontFamily: 'jost-medium' }}>
                                                            {calculateDuration()}
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
                                                            Location
                                                        </p>
                                                        <p className="text-sm md:text-[18px] font-medium text-[#6B6B6B] md:text-[#666666]" style={{ fontFamily: 'jost-medium' }}>
                                                            {location}
                                                        </p>
                                                    </div>
                                                    <div className="md:w-[calc(23%-9px)] text-center rounded-[10px] md:rounded-[12px] border-[3px] border-[#1f1f1f] bg-white px-3 md:px-4 py-3 shadow-none">
                                                        <p className="text-base md:text-[25px] font-extrabold text-[#1f1f1f] mb-1" style={{ fontFamily: 'jost-bold' }}>
                                                            Prize Pool
                                                        </p>
                                                        <p className="text-sm md:text-[18px] font-medium text-[#6B6B6B] md:text-[#666666]" style={{ fontFamily: 'jost-medium' }}>
                                                            {prizePool}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        {/* Event Timeline */}
                                        <section className="mt-6">
                                            <h2 className="text-lg md:text-[27px] font-black text-[#1f1f1f] mb-3" style={{ fontFamily: 'jost-bold' }}>
                                                Event Timeline :
                                            </h2>
                                            <div className="rounded-[10px] md:rounded-[15px] border-[3px] border-[#1f1f1f] bg-white p-4 md:p-5 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] md:shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                                                <div className="space-y-3">
                                                    <div className="flex items-start gap-3">
                                                        <Calendar className="h-5 w-5 text-[#1f1f1f] shrink-0 mt-1" />
                                                        <div>
                                                            <p className="text-sm md:text-[16px] font-bold text-[#1f1f1f]" style={{ fontFamily: 'jost-bold' }}>
                                                                Start Date
                                                            </p>
                                                            <p className="text-sm md:text-[15px] text-[#666666]" style={{ fontFamily: 'jost-regular' }}>
                                                                {formatDate(startDate)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-3">
                                                        <Calendar className="h-5 w-5 text-[#1f1f1f] shrink-0 mt-1" />
                                                        <div>
                                                            <p className="text-sm md:text-[16px] font-bold text-[#1f1f1f]" style={{ fontFamily: 'jost-bold' }}>
                                                                End Date
                                                            </p>
                                                            <p className="text-sm md:text-[15px] text-[#666666]" style={{ fontFamily: 'jost-regular' }}>
                                                                {formatDate(endDate)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        {/* Description */}
                                        <section className="mt-6">
                                            <h2 className="text-lg md:text-[27px] font-black text-[#1f1f1f] mb-3" style={{ fontFamily: 'jost-bold' }}>
                                                About the Hackathon :
                                            </h2>
                                            <div className="rounded-[10px] md:rounded-[15px] border-[3px] border-[#1f1f1f] bg-white p-4 md:p-5 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] md:shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                                                <p className="whitespace-pre-line text-sm md:text-[17px] leading-relaxed text-[#1f1f1f]" style={{ fontFamily: 'jost-regular' }}>
                                                    {description || 'Hackathon details will be announced soon.'}
                                                </p>
                                            </div>
                                        </section>

                                        {/* Eligibility */}
                                        {eligibility && (
                                            <section className="mt-6">
                                                <h2 className="text-lg md:text-[27px] font-black text-[#1f1f1f] mb-3" style={{ fontFamily: 'jost-bold' }}>
                                                    Eligibility :
                                                </h2>
                                                <div className="rounded-[10px] md:rounded-[15px] border-[3px] border-[#1f1f1f] bg-white p-4 md:p-5 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] md:shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                                                    <p className="text-sm md:text-[17px] leading-relaxed text-[#1f1f1f]" style={{ fontFamily: 'jost-regular' }}>
                                                        {eligibility}
                                                    </p>
                                                </div>
                                            </section>
                                        )}

                                        {/* Organized By */}
                                        <section className="mt-6 mb-6">
                                            <h2 className="text-lg md:text-[27px] font-black text-[#1f1f1f] mb-3" style={{ fontFamily: 'jost-bold' }}>
                                                Organized By :
                                            </h2>
                                            <div className="rounded-[10px] md:rounded-[15px] border-[3px] border-[#1f1f1f] bg-white p-4 md:p-5 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] md:shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                                                <p className="text-sm md:text-[17px] leading-relaxed text-[#1f1f1f]" style={{ fontFamily: 'jost-regular' }}>
                                                    {organizedBy || organizer}
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

export default Hackathon_details;
