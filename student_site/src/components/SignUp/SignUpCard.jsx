import React from 'react'

function SignUpCard({ 
    bgColor = '#F8A5B8', 
    date = '5', 
    month = "OCT '20", 
    title = 'What is a knowledge base and why?',
    author = 'LAURE ALBOUY',
    icon,
    rotation = 0,
    className = ''
}) {
    return (
        <div 
            className={`w-[200px] z-50 h-[280px] md:w-[280px] md:h-[380px] rounded-[12px] md:rounded-[15px] p-4 md:p-6 flex flex-col justify-between border-2 border-black shadow-xl ${className}`}
            style={{ 
                backgroundColor: bgColor,
                transform: `rotate(${rotation}deg)`
            }}
        >
            {/* Top section - Icon and Date */}
            <div className="flex justify-between items-start">
                {/* Icon */}
                <div className="w-16 h-16 md:w-24 md:h-24">
                    {icon}
                </div>
                
                {/* Date */}
                <div className="text-right">
                    <div className="text-3xl md:text-4xl font-[inter-extra] text-black">{date}</div>
                    <div className="text-[10px] md:text-sm font-[Jost-Bold] text-black tracking-wide">{month}</div>
                </div>
            </div>
            
            {/* Bottom section - Title and Author */}
            <div>
                <h3 className="text-lg md:text-2xl font-[inter-extra] text-black leading-tight mb-2 md:mb-4">
                    {title}
                </h3>
                <p className="text-[10px] md:text-xs font-[Jost-Bold] text-black tracking-wider">
                    BY {author}
                </p>
            </div>
        </div>
    )
}

export default SignUpCard
