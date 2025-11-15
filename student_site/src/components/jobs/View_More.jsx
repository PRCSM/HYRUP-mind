import React from 'react'
import { X } from 'lucide-react'
import { motion } from 'framer-motion'
import Job_card from './Job_card'

function View_More({ jobs, onClose, title, onJobClick }) {
    return (
        <motion.div 
            className="w-full px-4 md:px-8 py-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
        >
            {/* Header with Close Button */}
            <motion.div 
                className="flex items-center justify-between mb-4 md:mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            >
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900" style={{ fontFamily: 'jost-bold' }}>
                    {title}
                </h1>
                <button 
                    onClick={onClose}
                    className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center"
                >
                    <X className="w-5 md:w-6 h-5 md:h-6 text-gray-900" strokeWidth={2.5} />
                </button>
            </motion.div>

            {/* Grid of Jobs */}
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-8"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.08,
                            delayChildren: 0.2
                        }
                    }
                }}
            >
                {jobs.map((job, idx) => (
                    <motion.div 
                        key={idx} 
                        className="flex justify-center"
                        variants={{
                            hidden: { opacity: 0, y: 30, scale: 0.95 },
                            visible: { 
                                opacity: 1, 
                                y: 0, 
                                scale: 1,
                                transition: {
                                    duration: 0.4,
                                    ease: 'easeOut'
                                }
                            }
                        }}
                    >
                        <Job_card job={job} onClick={onJobClick} />
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    )
}

export default View_More
