import React from 'react';
import { Home, Search, Briefcase, MessageSquare, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavItem = ({ icon: Icon, active = false, isProfile = false, onClick }) => {
    const baseClasses = "w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer";
    const activeClasses = "bg-[#D9F99D] border-2 border-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]";
    const inactiveClasses = "bg-[#E5E7EB] border-2 border-transparent hover:bg-gray-300";
    const profileClasses = "w-12 h-12 lg:w-14 lg:h-14 rounded-full border-4 border-[#D9F99D] shadow-lg cursor-pointer";

    if (isProfile) {
        return (
            <div className={profileClasses} onClick={onClick}>
                <img src="/images/mix.png" alt="User Profile" className="w-full h-full rounded-full object-cover" />
            </div>
        );
    }

    return (
        <div className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`} onClick={onClick}>
            <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-gray-900" strokeWidth={active ? 2.5 : 2} />
        </div>
    );
};

const Logo = ({ onClick }) => (
    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-[#161616] rounded-xl flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] cursor-pointer" onClick={onClick}>
        <img src="/images/hyrup.png" alt="Logo" className="w-10 h-10" />
    </div>
);

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className='w-[5%] lg:w-[6%] ml-4 rounded-[10px] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] border-2 lg:border-4 border-[#363636] h-[95%] bg-[#FAF9F6] p-2 lg:p-4 flex flex-col items-center'>
            <div className="flex flex-col items-center gap-4 lg:gap-6">
                <Logo onClick={() => handleNavigation('/')} />
                <NavItem 
                    isProfile={true} 
                    onClick={() => handleNavigation('/profile')}
                />
            </div>

            <nav className="flex flex-col items-center gap-4 lg:gap-6 my-8 lg:my-12">
                <NavItem 
                    icon={Home} 
                    active={isActive('/')} 
                    onClick={() => handleNavigation('/')}
                />
                <NavItem 
                    icon={Search} 
                    active={isActive('/explore')} 
                    onClick={() => handleNavigation('/explore')}
                />
                <NavItem 
                    icon={Briefcase} 
                    active={isActive('/jobs')} 
                    onClick={() => handleNavigation('/jobs')}
                />
                <NavItem 
                    icon={MessageSquare} 
                    active={isActive('/chat')} 
                    onClick={() => handleNavigation('/chat')}
                />
            </nav>

            <div className="mt-auto">
                <NavItem 
                    icon={Settings} 
                    active={isActive('/settings')} 
                    onClick={() => handleNavigation('/settings')}
                />
            </div>
        </div>
    )
}

export default Navbar;
