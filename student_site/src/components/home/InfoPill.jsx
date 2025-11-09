import React from 'react';

function InfoPill({ label, value }) {
    return (
        <div className="flex flex-col items-center text-center bg-white border-2 border-gray-900 rounded-[10px] px-5 py-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.45)] min-w-[100px]">
            <p className="text-sm lg:text-base font-extrabold text-gray-900">{label}</p>
            <p className="mt-1 text-base font-semibold text-gray-700">{String(value)}</p>
        </div>
    );
}

export default InfoPill;