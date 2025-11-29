import React from 'react';

const MasonryCard = ({ image, title, onClick }) => {
    return (
        <div 
            onClick={onClick}
            className="relative group cursor-pointer break-inside-avoid mb-4 lg:mb-6 overflow-hidden rounded-[10px]  border-2 lg:border-[3px] border-[#1f1f1f] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]  hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-1 hover:-translate-x-1 bg-white"
        >
            <img 
                src={image || 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=600'} 
                alt={title} 
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover"
                onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=600';
                }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                    <h3 className="text-white text-base lg:text-lg font-[jost-bold]">{title}</h3>
                </div>
            </div>
        </div>
    );
};

export default MasonryCard;
