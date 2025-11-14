import React, { useState, useEffect, useRef, useCallback } from 'react';
import MasonryCard from './MasonryCard';
import Explore_expand from './Explore_expand';

// Guardian API configuration
const GUARDIAN_API_KEY = 'fdb5ddc6-f7b2-4272-ab5f-485bca5f440e'; // Get your API key from https://open-platform.theguardian.com/access/
const GUARDIAN_API_BASE = 'https://content.guardianapis.com';
const ARTICLES_PER_PAGE = 60;
const CACHE_KEY = 'guardian_articles_cache';
const CACHE_EXPIRY = 1000 * 60 * 30; // 30 minutes

// Categories for tech updates
const techCategories = [
    { name: 'AI', query: 'artificial intelligence OR AI OR machine learning' },
    { name: 'Health', query: 'health technology OR medical tech OR healthcare innovation' },
    { name: 'Cars', query: 'electric vehicles OR autonomous cars OR automotive technology' },
    { name: 'Crypto', query: 'cryptocurrency OR blockchain OR bitcoin' },
    { name: 'Space', query: 'space technology OR SpaceX OR NASA' },
    { name: 'Climate', query: 'climate tech OR renewable energy OR sustainability' },
];

// Cache management functions
const getCachedArticles = (category) => {
    try {
        const cached = localStorage.getItem(`${CACHE_KEY}_${category}`);
        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_EXPIRY) {
                return data;
            }
        }
    } catch (error) {
        console.error('Error reading from cache:', error);
    }
    return null;
};

const setCachedArticles = (category, data) => {
    try {
        localStorage.setItem(`${CACHE_KEY}_${category}`, JSON.stringify({
            data,
            timestamp: Date.now()
        }));
    } catch (error) {
        console.error('Error writing to cache:', error);
    }
};

function Explore_Pintrest() {
    const [activeTab, setActiveTab] = useState('All');
    const [articles, setArticles] = useState([]);
    const [displayedArticles, setDisplayedArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [nextPageToFetch, setNextPageToFetch] = useState(7);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const scrollContainerRef = useRef(null);
    const isInitialMount = useRef(true);
    
    const tabs = ['All', 'AI', 'Health', 'Cars', 'Crypto', 'Space', 'Climate'  ];

    const handleCardClick = (article) => {
        setSelectedArticle(article);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedArticle(null), 300); // Clear after animation
    };

    // Prefetch all categories on mount
    useEffect(() => {
        prefetchAllCategories();
    }, []);

    // Load articles when tab changes
    useEffect(() => {
        if (!isInitialMount.current) {
            loadArticlesForTab();
        } else {
            isInitialMount.current = false;
            loadArticlesForTab();
        }
    }, [activeTab]);

    // Display articles in batches
    useEffect(() => {
        if (articles.length > 0) {
            const start = 0;
            const end = Math.min(ARTICLES_PER_PAGE, articles.length);
            setDisplayedArticles(articles.slice(start, end));
            setCurrentPage(1);
            setHasMore(true); // Always set to true initially as we can fetch more from API
            setNextPageToFetch(7); // Reset to page 7 (since we already fetched pages 1-6)
        }
    }, [articles]);

    const prefetchAllCategories = async () => {
        const prefetchPromises = tabs.map(async (tab) => {
            const cached = getCachedArticles(tab);
            if (!cached) {
                await fetchArticlesForCategory(tab, true);
            }
        });
        
        await Promise.all(prefetchPromises);
    };

    const loadArticlesForTab = () => {
        const cached = getCachedArticles(activeTab);
        if (cached) {
            setArticles(cached);
            setLoading(false);
        } else {
            fetchArticlesForCategory(activeTab, false);
        }
    };

    const fetchArticlesForCategory = async (category, isBackground = false) => {
        if (!isBackground) setLoading(true);
        
        try {
            let query = 'technology';
            
            if (category !== 'All') {
                const cat = techCategories.find(c => c.name === category);
                if (cat) query = cat.query;
            }

            // Fetch multiple pages to get ~60 articles
            const pages = 6; // 10 articles per page by default, so 6 pages = 60 articles
            const fetchPromises = [];
            
            for (let i = 1; i <= pages; i++) {
                const url = `${GUARDIAN_API_BASE}/search?q=${encodeURIComponent(query)}&section=technology&show-fields=thumbnail,trailText,byline&page=${i}&page-size=10&api-key=${GUARDIAN_API_KEY}`;
                fetchPromises.push(fetch(url).then(res => res.json()));
            }

            const responses = await Promise.all(fetchPromises);
            const allArticles = [];
            const seenIds = new Set();

            responses.forEach((data, index) => {
                if (data.response && data.response.results) {
                    const formattedArticles = data.response.results
                        .filter(article => {
                            // Remove duplicates based on article ID
                            if (seenIds.has(article.id)) {
                                return false;
                            }
                            seenIds.add(article.id);
                            return true;
                        })
                        .map((article, idx) => ({
                            id: article.id,
                            image: article.fields?.thumbnail || `https://images.unsplash.com/photo-${1519389950473 + (index * 10 + idx)}?w=500&h=600`,
                            title: article.webTitle,
                            subtitle: category !== 'All' ? category : 'Technology',
                            company: article.fields?.byline || 'The Guardian',
                            description: article.fields?.trailText?.replace(/<[^>]*>/g, '') || 'Latest technology news and updates from The Guardian.',
                            link: article.webUrl
                        }));
                    allArticles.push(...formattedArticles);
                }
            });

            if (allArticles.length > 0) {
                setCachedArticles(category, allArticles);
                if (!isBackground) {
                    setArticles(allArticles);
                }
            }
        } catch (error) {
            console.error('Error fetching articles:', error);
            if (!isBackground) {
                // Fallback to sample data if API fails
                const fallbackArticles = [
                    {
                        id: '1',
                        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=600',
                        title: 'AI Revolution in Healthcare',
                        subtitle: 'AI',
                        company: 'The Guardian',
                        description: 'Artificial intelligence is transforming healthcare with breakthrough innovations.',
                        link: 'https://www.theguardian.com/technology'
                    },
                    {
                        id: '2',
                        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&h=700',
                        title: 'Latest Tech Innovations',
                        subtitle: 'Technology',
                        company: 'The Guardian',
                        description: 'Explore the cutting-edge technologies shaping our future.',
                        link: 'https://www.theguardian.com/technology'
                    }
                ];
                setArticles(fallbackArticles);
            }
        } finally {
            if (!isBackground) setLoading(false);
        }
    };

    const loadMoreArticles = useCallback(async () => {
        if (loadingMore) return;

        setLoadingMore(true);
        
        try {
            const nextPage = currentPage + 1;
            const start = currentPage * ARTICLES_PER_PAGE;
            const end = Math.min(start + ARTICLES_PER_PAGE, articles.length);
            
            // If we have cached articles available, use them first
            if (start < articles.length) {
                setDisplayedArticles(prev => [...prev, ...articles.slice(start, end)]);
                setCurrentPage(nextPage);
                setLoadingMore(false);
                
                // Check if we need to fetch more from API
                if (end >= articles.length) {
                    // Fetch more articles from API
                    await fetchMoreFromAPI();
                }
            } else {
                // No more cached articles, fetch from API
                await fetchMoreFromAPI();
            }
        } catch (error) {
            console.error('Error loading more articles:', error);
            setLoadingMore(false);
            setHasMore(false);
        }
    }, [articles, currentPage, loadingMore, activeTab]);

    const fetchMoreFromAPI = async () => {
        try {
            let query = 'technology';
            
            if (activeTab !== 'All') {
                const cat = techCategories.find(c => c.name === activeTab);
                if (cat) query = cat.query;
            }

            // Fetch next 6 pages (60 more articles)
            const pages = 6;
            const fetchPromises = [];
            
            for (let i = 0; i < pages; i++) {
                const pageNum = nextPageToFetch + i;
                const url = `${GUARDIAN_API_BASE}/search?q=${encodeURIComponent(query)}&section=technology&show-fields=thumbnail,trailText,byline&page=${pageNum}&page-size=10&api-key=${GUARDIAN_API_KEY}`;
                fetchPromises.push(fetch(url).then(res => res.json()));
            }

            const responses = await Promise.all(fetchPromises);
            const newArticles = [];
            const existingIds = new Set(articles.map(a => a.id));

            responses.forEach((data, index) => {
                if (data.response && data.response.results) {
                    const formattedArticles = data.response.results
                        .filter(article => {
                            // Remove duplicates - check if ID already exists in current articles
                            if (existingIds.has(article.id)) {
                                return false;
                            }
                            existingIds.add(article.id);
                            return true;
                        })
                        .map((article, idx) => ({
                            id: article.id,
                            image: article.fields?.thumbnail || `https://images.unsplash.com/photo-${1519389950473 + ((nextPageToFetch + index) * 10 + idx)}?w=500&h=600`,
                            title: article.webTitle,
                            subtitle: activeTab !== 'All' ? activeTab : 'Technology',
                            company: article.fields?.byline || 'The Guardian',
                            description: article.fields?.trailText?.replace(/<[^>]*>/g, '') || 'Latest technology news and updates from The Guardian.',
                            link: article.webUrl
                        }));
                    newArticles.push(...formattedArticles);
                }
            });

            if (newArticles.length > 0) {
                // Add new articles to state
                const updatedArticles = [...articles, ...newArticles];
                setArticles(updatedArticles);
                
                // Update cache with new articles
                setCachedArticles(activeTab, updatedArticles);
                
                // Display the newly fetched articles
                setDisplayedArticles(prev => [...prev, ...newArticles.slice(0, ARTICLES_PER_PAGE)]);
                setCurrentPage(prev => prev + 1);
                setNextPageToFetch(prev => prev + pages);
                setHasMore(true);
            } else {
                // No more articles available from API
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching more from API:', error);
            setHasMore(false);
        } finally {
            setLoadingMore(false);
        }
    };

    // Infinite scroll handler
    const handleScroll = useCallback(() => {
        if (!scrollContainerRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

        if (scrollPercentage > 0.8 && !loadingMore && hasMore) {
            loadMoreArticles();
        }
    }, [loadMoreArticles, loadingMore, hasMore]);

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll);
            return () => scrollContainer.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll]);

    return (
        <div className='w-full h-full flex flex-col overflow-hidden px-4 lg:px-8'>
            {/* Title Section */}
            <div className='w-full text-center py-3'>
                <h1 
                    className='text-2xl md:text-5xl font-[jost-bold] text-[#1f1f1f] tracking-tight leading-tight'
                    style={{ 
                        textShadow: '3px 3px 0px rgba(255, 255, 255, 0.7), 5px 5px 0px rgba(0, 0, 0, 0.08)',
                        WebkitTextStroke: '1.5px rgba(0, 0, 0, 0.08)',
                        letterSpacing: '0.02em'
                    }}
                >
                    EXPLORE YOUR DREAMS
                </h1>
            </div>

            {/* Tabs Navigation */}
            <div className='flex items-center justify-center gap-2 lg:gap-3 flex-wrap mb-6'>
                {tabs.map((tab) => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 lg:px-7 py-2 lg:py-2.5 rounded-[10px] border-2 lg:border-[3px] border-[#1f1f1f] text-sm lg:text-base font-[jost-semibold] transition-all duration-200 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] lg:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 ${
                            activeTab === tab 
                                ? 'bg-[#D9F99D] text-[#1f1f1f]' 
                                : 'bg-white text-[#1f1f1f] hover:bg-gray-50'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-[#D9F99D] border-t-[#1f1f1f] rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-[#1f1f1f] font-[jost-semibold] text-lg">Loading articles...</p>
                    </div>
                </div>
            ) : (
                /* Masonry Grid */
                <div 
                    ref={scrollContainerRef}
                    className='flex-1 overflow-y-auto custom-scroll pb-8 p-3'
                >
                    <div className='columns-2 md:columns-3 lg:columns-4 gap-4 lg:gap-6'>
                        {displayedArticles.map((article) => (
                            <MasonryCard 
                                key={article.id}
                                image={article.image}
                                title={article.title}
                                onClick={() => handleCardClick(article)}
                            />
                        ))}
                    </div>
                    
                    {/* Loading More Indicator */}
                    {loadingMore && (
                        <div className="flex justify-center py-8">
                            <div className="w-12 h-12 border-4 border-[#D9F99D] border-t-[#1f1f1f] rounded-full animate-spin"></div>
                        </div>
                    )}
                    
                    {/* End of Content */}
                    {!hasMore && displayedArticles.length > 0 && (
                        <div className="text-center py-8">
                            <p className="text-[#1f1f1f] font-[jost-medium] text-base">
                                You've reached the end! 🎉
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Expanded Modal */}
            <Explore_expand 
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                article={selectedArticle}
            />
        </div>
    )
}

export default Explore_Pintrest
