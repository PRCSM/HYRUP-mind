import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

const HeartAnimation = ({ show, onComplete }) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onAnimationComplete={() => {
                        if (onComplete) {
                            setTimeout(onComplete, 800);
                        }
                    }}
                >
                    {/* Main Heart Icon */}
                    <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ 
                            scale: [0, 1.3, 1],
                            rotate: [0, 10, 0]
                        }}
                        exit={{ 
                            scale: 0,
                            opacity: 0
                        }}
                        transition={{ 
                            duration: 0.6,
                            ease: [0.34, 1.56, 0.64, 1]
                        }}
                    >
                        <Heart 
                            className="w-32 h-32 md:w-40 md:h-40" 
                            fill="#E91E63" 
                            color="#E91E63"
                            strokeWidth={1.5}
                        />
                    </motion.div>

                    {/* Floating Hearts Around */}
                    {[...Array(8)].map((_, i) => {
                        const angle = (i * 360) / 8;
                        const distance = 120;
                        const x = Math.cos((angle * Math.PI) / 180) * distance;
                        const y = Math.sin((angle * Math.PI) / 180) * distance;

                        return (
                            <motion.div
                                key={i}
                                className="absolute"
                                initial={{ 
                                    x: 0, 
                                    y: 0, 
                                    scale: 0,
                                    opacity: 0 
                                }}
                                animate={{ 
                                    x: x,
                                    y: y,
                                    scale: [0, 1, 0],
                                    opacity: [0, 1, 0],
                                    rotate: [0, 360]
                                }}
                                transition={{ 
                                    duration: 0.8,
                                    delay: 0.1 + i * 0.05,
                                    ease: 'easeOut'
                                }}
                            >
                                <Heart 
                                    className="w-6 h-6 md:w-8 md:h-8" 
                                    fill="#F8BBD0" 
                                    color="#E91E63"
                                    strokeWidth={2}
                                />
                            </motion.div>
                        );
                    })}

                    {/* Sparkles/Stars */}
                    {[...Array(12)].map((_, i) => {
                        const angle = (i * 360) / 12;
                        const distance = 80 + (i % 2) * 40;
                        const x = Math.cos((angle * Math.PI) / 180) * distance;
                        const y = Math.sin((angle * Math.PI) / 180) * distance;

                        return (
                            <motion.div
                                key={`star-${i}`}
                                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                                initial={{ 
                                    x: 0, 
                                    y: 0, 
                                    scale: 0,
                                    opacity: 0 
                                }}
                                animate={{ 
                                    x: x,
                                    y: y,
                                    scale: [0, 1.5, 0],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{ 
                                    duration: 0.6,
                                    delay: 0.15 + i * 0.03,
                                    ease: 'easeOut'
                                }}
                            />
                        );
                    })}

                    {/* Pulse Ring */}
                    <motion.div
                        className="absolute w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-pink-400"
                        initial={{ scale: 0.8, opacity: 0.8 }}
                        animate={{ 
                            scale: [0.8, 2, 2.5],
                            opacity: [0.8, 0.3, 0]
                        }}
                        transition={{ 
                            duration: 0.8,
                            ease: 'easeOut'
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default HeartAnimation;
