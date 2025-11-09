import React from 'react';

function SkillTag({ text }) {
    return (
        <span className="px-3 lg:px-4 py-1 lg:py-1.5 bg-[#E8F4FF] border-2 border-gray-900 rounded-full text-xs lg:text-sm font-bold text-[#0B84CE] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.25)]">
            {text}
        </span>
    );
}

export default SkillTag;