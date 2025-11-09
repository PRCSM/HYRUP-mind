import React from 'react';

function PerkPill({ text }) {
    return (
        <div className="px-4 py-2 bg-white border-4 border-cyan-400 rounded-full font-extrabold text-gray-900 text-xs flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(34,211,238,1)]">
            <span>{text}</span>
        </div>
    );
}

export default PerkPill;