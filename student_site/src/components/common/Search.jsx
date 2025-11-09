import React, { useState } from 'react';
import { Search as SearchIcon, X, Bell, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

function Search() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [searchQuery, setSearchQuery] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const [searchSuggestions] = useState([
        'Frontend Developer',
        'React Developer',
        'Full Stack Engineer',
        'UI/UX Designer',
        'Product Manager',
        'Data Scientist',
        'Backend Developer',
        'Mobile App Developer'
    ]);

    const [recentSearches] = useState([
        'Software Engineer',
        'Marketing Intern',
        'Data Analyst'
    ]);

    const handleSearch = () => {
        console.log('Searching for:', searchQuery);
        // Implement search logic here
    };

    const filteredSuggestions = searchSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleExpandClick = () => {
        setIsExpanded(true);
    };

    const handleCollapseClick = () => {
        setIsExpanded(false);
        setSearchQuery('');
    };

    return (
        <div className="z-50 p-4 overflow-y-auto w-[80%] mx-auto custom-scroll right-10 top-0 fixed flex flex-col items-center max-h-screen">
            {/* Fixed Search Bar */}
            <div className="flex items-center cursor-pointer gap-6 mb-4">
                {/* Search Bar */}
                <div 
                    onClick={!isExpanded ? handleExpandClick : undefined}
                    className="flex items-center bg-white rounded-[10px] border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.25)] px-20 py-3 transition-all hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,0.25)] cursor-pointer"
                >
                    <SearchIcon className="w-6 h-6 text-gray-500 mr-4" />
                    {isExpanded ? (
                        <input
                            type="text"
                            placeholder="Search for jobs, companies, or skills..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="text-lg font-medium outline-none placeholder-gray-400 min-w-[250px] lg:min-w-[350px] cursor-text"
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            autoFocus
                        />
                    ) : (
                        <span 
                            className="text-lg font-medium text-gray-400 min-w-[250px] lg:min-w-[350px] text-left cursor-pointer"
                        >
                            Search for jobs, companies, or skills...
                        </span>
                    )}
                </div>

                {/* Save Button */}
                <button
                    onClick={() => navigate('/saved-jobs')}
                    className="w-14 h-14 border-4 border-gray-900 rounded-full flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer bg-[#FBBF24] text-gray-900"
                >
                    <Bookmark className="w-6 h-6 text-gray-900" strokeWidth={2.5} />
                </button>

                {/* Notification/Close Button */}
                {isExpanded ? (
                    <button
                        onClick={handleCollapseClick}
                        className="w-14 h-14 bg-white border-4 border-gray-900 rounded-full flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                    >
                        <X className="w-6 h-6 text-gray-900" strokeWidth={2.5} />
                    </button>
                ) : (
                    <button className="w-14 h-14 bg-white border-4 border-gray-900 rounded-full flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer relative">
                        <Bell className="w-6 h-6 text-gray-900" strokeWidth={2.5} />
                        {/* Notification Dot */}
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></div>
                    </button>
                )}
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        key="expanded"
                        initial={{ 
                            opacity: 0,
                            height: 0,
                            clipPath: "inset(0 0 100% 0)"
                        }}
                        animate={{ 
                            opacity: 1,
                            height: "600px",
                            clipPath: "inset(0 0 0% 0)"
                        }}
                        exit={{ 
                            opacity: 0,
                            height: 0,
                            clipPath: "inset(0 0 100% 0)"
                        }}
                        transition={{ 
                            duration: 0.5, 
                            ease: "easeInOut"
                        }}
                        className="w-full h-[600px] overflow-y-auto custom-scroll p-4 bg-[#fff9e3] rounded-[10px] border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.25)]"
                    >
                        {/* Search Suggestions */}
                        {searchQuery && filteredSuggestions.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                                className="bg-white rounded-[15px] border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.25)] mb-6 p-4"
                            >
                                <h3 className="text-sm font-bold text-gray-600 mb-2">Suggestions</h3>
                                <div className="flex flex-wrap gap-2">
                                    {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSearchQuery(suggestion)}
                                            className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                            className="mb-6 text-center"
                        >
                            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">
                                Find Your Dream Job
                            </h1>
                            <p className="text-lg text-gray-600">
                                Search through thousands of opportunities
                            </p>
                        </motion.div>

                        {/* Search Button */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                            className="flex justify-center mb-6"
                        >
                            <button
                                onClick={handleSearch}
                                className="px-8 py-3 bg-[#FBBF24] border-4 border-gray-900 rounded-lg font-extrabold text-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all hover:bg-[#F59E0B] cursor-pointer"
                            >
                                Search Jobs
                            </button>
                        </motion.div>

                        {/* Recent Searches */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
                            className="bg-white rounded-[15px] border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.25)] mb-6 p-6"
                        >
                                <h2 className="text-xl font-extrabold text-gray-900 mb-4">Recent Searches</h2>
                                <div className="flex flex-wrap gap-2">
                                    {recentSearches.map((search, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSearchQuery(search)}
                                            className="px-4 py-2 bg-[#E8F4FF] border-2 border-gray-900 rounded-full font-bold text-[#0B84CE] hover:bg-[#DBEAFE] transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,0.25)] cursor-pointer"
                                        >
                                            {search}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>

                        {/* Popular Categories */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
                            className="bg-white rounded-[15px] border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.25)] p-6"
                        >
                            <h2 className="text-xl font-extrabold text-gray-900 mb-4">Popular Categories</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {['Technology', 'Marketing', 'Design', 'Sales', 'Finance', 'Healthcare', 'Education', 'Engineering'].map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSearchQuery(category)}
                                        className="p-4 bg-gradient-to-br from-[#FEF9C3] to-[#FDE68A] border-2 border-gray-900 rounded-lg font-bold text-gray-900 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] transition-all text-center cursor-pointer"
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Search;
