import React from 'react';
import { X } from 'lucide-react';

function Explore_expand({ isOpen, onClose, article }) {
    if (!isOpen || !article) return null;

    return (
        <>
            {/* Backdrop */}
            <div 
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
                <div 
                    className={`relative bg-white rounded-[10px] border-4 border-[#D9F99D] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full max-w-md h-[600px] flex flex-col pointer-events-auto transform transition-all duration-500 ${
                        isOpen 
                            ? 'scale-100 rotate-0 opacity-100' 
                            : 'scale-75 rotate-12 opacity-0'
                    }`}
                    style={{
                        animation: isOpen ? 'slideInBounce 0.5s ease-out' : 'none'
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute -top-3 -right-3 z-10 w-10 h-10 bg-[#ff5d5d] text-white rounded-full flex items-center justify-center hover:bg-[#363636] transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] hover:-translate-y-0.5"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Image - Fixed Height */}
                    <div className="relative w-full h-64 flex-shrink-0 rounded-t-[10px] overflow-hidden border-b-4 border-[#1f1f1f]">
                        <img 
                            src={article.image} 
                            alt={article.title}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Content - Scrollable */}
                    <div className="flex-1 overflow-y-auto custom-scroll p-6">
                        {/* Title */}
                        <h2 className="text-xl lg:text-2xl font-[jost-bold] text-[#1f1f1f] mb-2 leading-tight line-clamp-2">
                            {article.title}
                        </h2>

                        {/* Company with verified badge */}
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-sm font-[jost-medium] text-[#1f1f1f] truncate">
                                by {article.company}
                            </span>
                            <svg className="w-4 h-4 text-blue-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                        </div>

                        {/* Description */}
                        <p className="text-[#1f1f1f] font-[jost-regular] text-md leading-relaxed mb-6 line-clamp-6">
                            {article.description}
                        </p>
                    </div>

                    {/* Know More Button - Fixed at Bottom */}
                    <div className="flex-shrink-0 p-6 pt-0">
                        <a
                            href={article.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full py-3 text-center bg-[#D9F99D] text-[#1f1f1f] font-[jost-semibold] text-base rounded-2xl border-4 border-[#1f1f1f] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-0.5 transition-all duration-200"
                        >
                            Know More
                        </a>
                    </div>
                </div>
            </div>

            {/* Custom Animation Keyframes */}
            <style>{`
                @keyframes slideInBounce {
                    0% {
                        transform: scale(0.3) translateY(-100px) rotate(15deg);
                        opacity: 0;
                    }
                    50% {
                        transform: scale(1.05) translateY(0) rotate(-2deg);
                    }
                    70% {
                        transform: scale(0.95) rotate(1deg);
                    }
                    100% {
                        transform: scale(1) translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                }
            `}</style>
        </>
    );
}

export default Explore_expand;
