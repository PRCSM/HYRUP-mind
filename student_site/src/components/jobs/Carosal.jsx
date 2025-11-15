import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, animate, useDragControls } from 'framer-motion';
import Job_card from './Job_card';

function Carosal({ jobsData = [], onJobClick }) {
    const [index, setIndex] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(1);
    const containerRef = useRef(null);
    const x = useMotionValue(0);
    const [isDragging, setIsDragging] = useState(false);

    // Use passed jobsData or slice to top 10
    const allJobs = jobsData.slice(0, 10);

    const breakpoints = {
        0: { slidesToShow: 1 },
        768: { slidesToShow: 2 },
        1024: { slidesToShow: 2.5 },
        1280: { slidesToShow: 3 },
    };

    useEffect(() => {
        const updateSlidesToShow = () => {
            const width = window.innerWidth;
            const sortedBreakpoints = Object.keys(breakpoints)
                .map(Number)
                .sort((a, b) => b - a);
            for (const bp of sortedBreakpoints) {
                if (width >= bp) {
                    setSlidesToShow(breakpoints[bp].slidesToShow);
                    break;
                }
            }
        };
        updateSlidesToShow();
        window.addEventListener('resize', updateSlidesToShow);
        return () => window.removeEventListener('resize', updateSlidesToShow);
    }, []); 

    const getSlideWidth = () => {
        const isMobile = window.innerWidth < 768;
        const cardWidth = isMobile ? 280 : 340;
        const gap = isMobile ? 16 : 24;
        return cardWidth + gap;
    };

    useEffect(() => {
        if (containerRef.current && !isDragging) {
            const slideWidth = getSlideWidth();
            const targetX = -index * slideWidth;
            animate(x, targetX, {
                type: 'spring',
                stiffness: 300,
                damping: 30,
            });
        }
    }, [index, x, isDragging]);

  
    useEffect(() => {
        const maxIndex = Math.max(0, allJobs.length - slidesToShow);
        if (index > maxIndex) {
            setIndex(maxIndex);
        }
    }, [slidesToShow, index, allJobs.length]); 
    const maxIndex = Math.max(0, allJobs.length - slidesToShow);

    const handleDragEnd = (event, info) => {
        setIsDragging(false);
        const slideWidth = getSlideWidth();
        const threshold = slideWidth / 4; // 25% of slide width to trigger change
        
        if (info.offset.x > threshold && index > 0) {
            // Swiped right - go to previous
            setIndex(index - 1);
        } else if (info.offset.x < -threshold && index < maxIndex) {
            // Swiped left - go to next
            setIndex(index + 1);
        } else {
            // Snap back to current position
            const targetX = -index * slideWidth;
            animate(x, targetX, {
                type: 'spring',
                stiffness: 300,
                damping: 30,
            });
        }
    };

    return (
        <div className="w-[95vw] md:w-[85vw] relative px-0 md:px-3">
            <motion.button
                disabled={index === 0}
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                className={`absolute left-1 md:-left-6 top-1/2 -translate-y-1/2 w-10 md:w-12 h-10 md:h-12 rounded-full flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all z-30 border-2 border-black
                    ${
                        index === 0
                            ? 'opacity-40 cursor-not-allowed bg-gray-300'
                            : 'bg-white hover:scale-110 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                    }`}>
                <svg
                    className="w-5 md:w-6 h-5 md:h-6 text-gray-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </motion.button>

            <motion.button
                disabled={index === maxIndex}
                onClick={() => setIndex((i) => Math.min(maxIndex, i + 1))}
                className={`absolute right-1 md:right-6 top-1/2 -translate-y-1/2 w-10 md:w-12 h-10 md:h-12 rounded-full flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all z-30 border-2 border-black
                    ${
                        index === maxIndex
                            ? 'opacity-40 cursor-not-allowed bg-gray-300'
                            : 'bg-white hover:scale-110 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                    }`}>
                <svg
                    className="w-5 md:w-6 h-5 md:h-6 text-gray-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </motion.button>

            {/* Carousel content */}
            <div className="relative py-2 overflow-hidden" ref={containerRef}>
                <motion.div 
                    className="flex gap-4 md:gap-6" 
                    style={{ x }}
                    drag="x"
                    dragConstraints={{ left: -maxIndex * getSlideWidth(), right: 0 }}
                    dragElastic={0.1}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={handleDragEnd}
                    dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
                >
                    {allJobs.map((job, idx) => (
                        <div
                            key={idx}
                            className="shrink-0">
                            <Job_card job={job} onClick={isDragging ? null : onJobClick} />
                        </div>
                    ))}
                </motion.div>
                
                {/* Left gradient fade */}
                {/* <div className="absolute left-0 top-0 bottom-0 w-16 bg-linear-to-r from-[#fff9e3] to-transparent pointer-events-none z-10"></div> */}
                
                {/* Right gradient fade */}
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-linear-to-l from-[#fff9e3] to-transparent pointer-events-none z-10"></div>
            </div>
        </div>
    );
}

export default Carosal;