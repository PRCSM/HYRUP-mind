import React, { useState, useEffect, useRef } from 'react';

function PageReveal({ onComplete }) {
    const [count, setCount] = useState(0);
    const [phase, setPhase] = useState('counting'); 
    const [showFullText, setShowFullText] = useState(true);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const fullText = 'HYRUP.IN';
    const typewriterRef = useRef(null);

    // Typewriter effect
    useEffect(() => {
        if (phase === 'complete') return;
        
        const typeSpeed = isDeleting ? 50 : 100;
        
        typewriterRef.current = setTimeout(() => {
            if (!isDeleting) {
                // Typing
                if (displayText.length < fullText.length) {
                    setDisplayText(fullText.slice(0, displayText.length + 1));
                } else {
                    // Pause at full text, then start deleting
                    setTimeout(() => setIsDeleting(true), 800);
                }
            } else {
                // Deleting
                if (displayText.length > 0) {
                    setDisplayText(fullText.slice(0, displayText.length - 1));
                } else {
                    // Pause at empty, then start typing again
                    setTimeout(() => setIsDeleting(false), 300);
                }
            }
        }, typeSpeed);

        return () => clearTimeout(typewriterRef.current);
    }, [displayText, isDeleting, phase]);

    useEffect(() => {
        if (phase === 'counting') {
            const interval = setInterval(() => {
                setCount(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    // Speed up as we get closer to 100
                    const increment = prev < 80 ? 2 : 1;
                    return Math.min(prev + increment, 100);
                });
            }, 30);

            return () => clearInterval(interval);
        }
    }, [phase]);

    useEffect(() => {
        // At 90, start hiding HYR and .IN
        if (count >= 70 && showFullText) {
            setShowFullText(false);
        }

        // At 100, start the reveal animation
        if (count >= 100 && phase === 'counting') {
            setTimeout(() => {
                setPhase('reveal');
            }, 1000);
        }
    }, [count, phase, showFullText]);

    useEffect(() => {
        if (phase === 'reveal') {
            // After curtain animation completes, mark as complete
            setTimeout(() => {
                setPhase('complete');
                onComplete?.();
            }, 5000);
        }
    }, [phase, onComplete]);

    if (phase === 'complete') {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[200] overflow-hidden pointer-events-none">
            {/* Top Curtain */}
            <div 
                className={`absolute top-0 left-0 w-full h-1/2 bg-[#D9F99D] flex flex-col justify-between transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                    phase === 'reveal' ? '-translate-y-[120%]' : 'translate-y-0'
                }`}
            >
                {/* Swipe Match Grow - Top Left */}
                <div className="p-6 md:p-10">
                    <h2 className="text-lg md:text-xl font-[Jost-Bold] text-black">
                        Swipe Match Grow
                    </h2>
                </div>

                {/* Main Logo - Typewriter Effect */}
                <div className="absolute inset-0 flex items-end justify-center pb-0">
                    <div className="flex items-center justify-center">
                        {/* Typewriter text */}
                        <span className="text-5xl md:text-7xl lg:text-8xl font-[inter-extra] text-black">
                            {displayText.split('').map((char, index) => (
                                <span 
                                    key={index}
                                    className={char === 'U' || char === 'P' ? 'text-[#C75B5B]' : 'text-black'}
                                >
                                    {char}
                                </span>
                            ))}
                            <span className="animate-pulse">|</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom Curtain */}
            <div 
                className={`absolute bottom-0 left-0 w-full h-1/2 bg-[#D9F99D] flex flex-col justify-between transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                    phase === 'reveal' ? 'translate-y-full' : 'translate-y-0'
                }`}
            >
                <div className="flex justify-end p-6 md:p-10">
                    <p className="text-sm md:text-base font-[Jost-Bold] text-black text-right max-w-[200px]">
                        Place where Dreams meats reality
                    </p>
                </div>

                {/* Counter and Stairs Icon - Bottom */}
                <div className="flex items-end justify-between p-6 md:p-10">
                    {/* Counter */}
                    <div className="flex items-center gap-4">
                        <span className="text-4xl md:text-6xl font-[inter-extra] text-black">
                            {count}
                        </span>
                        
                        {/* Stairs Icon - Animated Loading */}
                        <div className="flex items-end gap-[2px]">
                            <div className="w-3 md:w-6 bg-black animate-[stairsLoad_0.6s_ease-in-out_infinite] h-4 md:h-6" style={{ animationDelay: '0s' }}></div>
                            <div className="w-3 md:w-6 bg-black animate-[stairsLoad_0.6s_ease-in-out_infinite] h-8 md:h-12" style={{ animationDelay: '0.15s' }}></div>
                            <div className="w-3 md:w-6 bg-black animate-[stairsLoad_0.6s_ease-in-out_infinite] h-12 md:h-18" style={{ animationDelay: '0.3s' }}></div>
                        </div>
                    </div>

                    {/* Small square icon */}
                    <div className="w-6 h-8 border-3 border-black"></div>
                </div>
            </div>

            {/* Center line that appears during transition */}
            <div 
                className={`absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 h-3 bg-[#FFFAE9] transition-all duration-700 ease-out ${
                    count >= 90 && phase !== 'reveal' ? 'w-full opacity-100' : 'w-0 opacity-100'
                }`}
            />
        </div>
    );
}

export default PageReveal;
