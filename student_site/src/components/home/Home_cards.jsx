import React, { useState, useEffect } from 'react';
import Home_card from './Home_card';
// import jobDataList from '../../demodata/demodata.json';
import { AnimatePresence, motion } from 'framer-motion';
import jobStore from '../../utils/jobStore';

export default function Home_cards( { jobs = [] }) {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [appliedJobIds, setAppliedJobIds] = useState([]);

  // To track exit direction for animation (up or down)
  const [exitY, setExitY] = useState(0); 
    const CARD_COLORS = ['#E3FEAA', '#B8D1E6', '#E6D3FC'];

  // Load applied jobs to filter them out
  useEffect(() => {
    const updateAppliedJobs = () => {
      const ids = jobStore.getAppliedJobIds();
      setAppliedJobIds(ids);
    };

    updateAppliedJobs();

    // Subscribe to jobStore changes
    const unsubscribe = jobStore.subscribe(() => {
      updateAppliedJobs();
    });

    // Listen for job applied event
    const handleJobApplied = () => {
      updateAppliedJobs();
    };

    window.addEventListener('jobApplied', handleJobApplied);

    return () => {
      unsubscribe();
      window.removeEventListener('jobApplied', handleJobApplied);
    };
  }, []);

  useEffect(()=>{
    if (!jobs || !Array.isArray(jobs)) return ;
     const filtered = jobs.filter(job => {
    const isAppliedById = appliedJobIds.includes(job.id);
    const isAppliedByTitle = appliedJobIds.includes(job.title);
    return !isAppliedById && !isAppliedByTitle;
  });
    setCards(filtered);
  setCurrentIndex(0);
  },[jobs,appliedJobIds])

  // useEffect(() => {
  //   if (!jobDataList) return;

  //   const sourceArray = Array.isArray(jobDataList)
  //     ? jobDataList
  //     : [
  //         ...(Array.isArray(jobDataList.companyJobs) ? jobDataList.companyJobs : []),
  //         ...(Array.isArray(jobDataList.onCampusJobs) ? jobDataList.onCampusJobs : []),
  //       ];

  //   // Filter out applied jobs
  //   const filteredJobs = sourceArray.filter(job => {
  //     const isAppliedById = job.id && appliedJobIds.includes(job.id);
  //     const isAppliedByTitle = job.title && appliedJobIds.includes(job.title);
  //     return !isAppliedById && !isAppliedByTitle;
  //   });

  //   const normalizedCards = filteredJobs.map((job, index) => ({
  //     id: job?.id ?? job?._id ?? `job-${index}`,
  //     ...job,
  //   }));

  //   setCards(normalizedCards);
  // }, [appliedJobIds]);

  // Updated to handle 'up' (apply) or 'down' (reject) directions
  const removeCard = (direction) => {
    setExitY(direction === 'up' ? -500 : 500); // Fly up or fly down
    // Wait a tiny bit for the state to update before removing from DOM via AnimatePresence
    setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 10);
  };

  const handleReject = () => {
    console.log('Rejected job:', cards[currentIndex]?.title);
    removeCard('down'); // 'down' for reject
  };

  const handleApply = () => {
    console.log('Applied to job:', cards[currentIndex]?.title);
    removeCard('up'); // 'up' for apply
  };

  // if (cards.length === 0) {
  //     return <div className="w-full h-full flex items-center justify-center font-['Inter'] text-xl font-bold text-gray-500">Loading Jobs...</div>;
  // }
    if (!cards.length ) {
      return <div className="w-full h-full flex items-center justify-center font-['Inter'] text-xl font-bold text-gray-500">Loading Jobs...</div>;
  }
  if (currentIndex >= cards.length) {
      return (
          <div className="w-full h-full flex flex-col items-center justify-center font-['Inter'] text-gray-700 space-y-4">
              <h2 className="text-3xl font-black">All caught up!</h2>
              <p className="text-lg">Check back later for more jobs.</p>
              <button 
                  onClick={() => setCurrentIndex(0)} 
                  className="px-6 py-3 bg-[#FBBF24] border-4 border-gray-900 rounded-full font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
              >
                  Start Over
              </button>
          </div>
      );
  }

  return (
    <div className="w-full h-full relative">
        {/* Render the next card in the stack below the current one for depth effect */}
        {currentIndex + 1 < cards.length && (
            <div className="absolute inset-0 pointer-events-none" style={{ transform: 'scale(0.95) translateY(20px)', opacity: 0.6 }}>
                <Home_card 
                    jobData={cards[currentIndex + 1]}
                    cardColor={CARD_COLORS[(currentIndex + 1) % CARD_COLORS.length]}
                    // Disable interactions for the card below
                    onReject={() => {}}
                    onApply={() => {}}
                />
            </div>
        )}

        <AnimatePresence>
            <motion.div
                key={currentIndex}
                // New "enter" animation: slides in from bottom
                initial={{ y: "50%", opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                // New "exit" animation: flies up or down
                exit={{ 
                    y: exitY, 
                    opacity: 0, 
                    scale: 0.8, 
                    transition: { duration: 0.3, ease: "easeInOut" } 
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="absolute inset-0 z-10"
            >
                 <Home_card 
                    jobData={cards[currentIndex]}
                          cardColor={CARD_COLORS[currentIndex % CARD_COLORS.length]}
                    onReject={handleReject}
                    onApply={handleApply}
                 />
            </motion.div>
        </AnimatePresence>
    </div>
  );
}