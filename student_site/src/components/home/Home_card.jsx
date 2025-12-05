import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Check, 
  Heart, 
  MessageSquare, 
  ArrowDown,
  Minus
} from 'lucide-react';
import InfoPill from './InfoPill';
import SkillTag from './SkillTag';
import PerkPill from './PerkPill';
import HeartAnimation from '../common/HeartAnimation';
import jobStore from '../../utils/jobStore';
import { useChat } from "../../contexts/ChatContext";
import { useNavigate } from "react-router-dom";

const SECTIONS = 4;


export default function Home_card({ jobData, onReject, onApply, cardColor }) {
  const [activeSection, setActiveSection] = useState(0);
  const [cursorState, setCursorState] = useState({ visible: false, type: null, x: 0, y: 0 });
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const cardRef = useRef(null);
  const containerRef = useRef(null);
    const { addChat } = useChat();
const navigate = useNavigate();
    // console.log("JOB DATA:", jobData);

  // Check if job is already saved
  React.useEffect(() => {
    if (jobData) {
      const jobId = jobData.id || jobData.title;
      setIsSaved(jobStore.isJobSaved(jobId, jobData.title));
      
      // Subscribe to changes
      const unsubscribe = jobStore.subscribe(() => {
        setIsSaved(jobStore.isJobSaved(jobId, jobData.title));
      });
      
      return () => unsubscribe();
    }
  }, [jobData]);

    const {
        title,
        company,
        college,
        jobType,
        employmentType,
        mode,
        workMode,
        postedTime,
        applicants,
        description,
        salaryRange,
        preferences = {},
        openings,
        noOfOpenings,
        duration,
        stipend,
        rolesAndResponsibilities,
        perks,
        aboutJob,
        aboutCompany,
        applicationLink
    } = jobData ?? {};

    const {
        location,
        skills = [],
        minExperience,
        education
    } = preferences;

    const titleText = title ?? 'Untitled role';
    const descriptionText = description ?? aboutJob ?? 'No description provided.';

    const companyDisplay = (() => {
        if (company) return company;
        if (college) return college;
        if (aboutCompany) {
            const beforeIs = aboutCompany.split(' is ')[0];
            if (beforeIs && beforeIs.length <= 80) {
                return beforeIs.trim();
            }
        }
        return 'Company name';
    })();

    const toTitleCase = (value) => {
        if (typeof value !== 'string' || value.length === 0) return value;
        return value.charAt(0).toUpperCase() + value.slice(1);
    };

    const inferredJobType = employmentType ?? (jobType && !['company', 'on-campus'].includes(jobType) ? jobType : null);
    const employmentTypeDisplay = inferredJobType ? toTitleCase(inferredJobType) : null;
    const modeValue = mode ?? workMode ?? null;
    const modeDisplay = modeValue ? toTitleCase(modeValue) : null;
    const openingsRaw = typeof noOfOpenings !== 'undefined' ? noOfOpenings : openings;
    const openingsDisplay = typeof openingsRaw === 'number' ? openingsRaw : openingsRaw ?? null;
    const durationDisplay = duration ?? null;
    const stipendDisplay = stipend != null ? (typeof stipend === 'number' ? `$${stipend.toLocaleString()}` : stipend) : null;

    const categoryLabel = jobType
        ? jobType === 'company'
            ? 'Company Hiring'
            : jobType === 'on-campus'
                ? 'On-campus'
                : toTitleCase(jobType)
        : null;
    const roleTagText = employmentTypeDisplay ?? categoryLabel;
    const modeTagText = modeDisplay;

    const requirementItems = [
        typeof minExperience === 'number' ? `${minExperience}+ years experience` : null,
        education ? `Education: ${education}` : null,
        location ? `Location - ${location}` : null
    ].filter(Boolean);

    let salaryText = null;
    if (salaryRange && (salaryRange.min || salaryRange.max)) {
        const minText = salaryRange.min ? `$${salaryRange.min.toLocaleString()}` : null;
        const maxText = salaryRange.max ? `$${salaryRange.max.toLocaleString()}` : null;
        salaryText = `Salary: ${[minText, maxText].filter(Boolean).join(' - ')}`;
    }

    const metaDetails = [
        postedTime,
        applicants ? `${applicants} applicants` : null,
        employmentTypeDisplay,
        modeDisplay
    ].filter(Boolean);

    const cardSubtitle = metaDetails.join(' · ');

    const toList = (text) => {
        if (!text) return [];
        return text
            .replace(/\r/g, '\n')
            .split(/\n|•/)
            .flatMap((fragment) =>
                fragment
                    .split(/\. (?=[A-Z0-9])/)
                    .map((item) => item.replace(/^[\-\*]\s*/, '').trim())
            )
            .map((item) => item.replace(/\.$/, '').trim())
            .filter(Boolean);
    };

    const rolesList = Array.isArray(rolesAndResponsibilities)
        ? rolesAndResponsibilities.filter(Boolean)
        : toList(rolesAndResponsibilities);

    const perksList = Array.isArray(perks)
        ? perks.filter(Boolean)
        : toList(perks);

    const shouldScrollRoles = rolesList.length > 6;

    const ribbonConfig = (() => {
        const defaultConfig = { color: '#FAB648', text: 'In House' };
        const normalizedType = typeof jobType === 'string' ? jobType.toLowerCase() : '';

        if (normalizedType === 'on-campus' || normalizedType === 'on campus') {
            return { color: '#40FFB9', text: 'Campus' };
        }

        if (normalizedType === 'company') {
            return { color: '#FAB648', text: 'In House' };
        }

        if (normalizedType === 'outreach' || normalizedType === 'out reach') {
            return { color: '#F74C32', text: 'In Out Reach' };
        }

        return defaultConfig;
    })();

  const handleNextSection = () => {
    if (activeSection < SECTIONS - 1) {
      setActiveSection((prev) => prev + 1);
    }
  };

  const handlePrevSection = () => {
    if (activeSection > 0) {
      setActiveSection((prev) => prev - 1);
    }
  };

  const handleMouseMove = (e) => {
    // We don't need containerRef for mouse coordinates if we use fixed positioning for the cursor
    // and e.clientX/Y which are viewport relative.
    if (!cardRef.current) return;
    const cardRect = cardRef.current.getBoundingClientRect();
    
    // Check if mouse is within the card bounds
    if (
        e.clientX < cardRect.left ||
        e.clientX > cardRect.right ||
        e.clientY < cardRect.top ||
        e.clientY > cardRect.bottom
    ) {
        setCursorState(prev => ({ ...prev, visible: false }));
        return;
    }

    const isTopHalf = (e.clientY - cardRect.top) < (cardRect.height / 2);
    let type = 'blocked';

    if (isTopHalf) {
        type = activeSection > 0 ? 'up' : 'blocked';
    } else {
        type = activeSection < SECTIONS - 1 ? 'down' : 'blocked';
    }

    setCursorState({ 
      visible: true, 
      type, 
      // Use viewport coordinates directly for fixed positioning
      x: e.clientX, 
      y: e.clientY 
    });
  };

  const handleMouseLeave = () => {
    setCursorState(prev => ({ ...prev, visible: false }));
  };

  const handleCardClick = () => {
    if (!cursorState.visible || cursorState.type === 'blocked') return;

    if (cursorState.type === 'up') {
        handlePrevSection();
    } else if (cursorState.type === 'down') {
        handleNextSection();
    }
  };

    const handleRejectClick = (e) => {
        e.stopPropagation();
        if (typeof onReject === 'function') {
            onReject(jobData);
        }
    };

    const handleApplyClick = (e) => {
        e.stopPropagation();
        
        // Save to Applied Jobs if it's an In House (company) job
        try {
            const normalizedType = typeof jobType === 'string' 
                ? jobType.toLowerCase().replace(/\s+/g, '-') 
                : '';
            
            if (normalizedType === 'company') {
                const applied = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
                
                // Check if already applied
                const jobKey = jobData.id || jobData.title;
                const alreadyApplied = applied.some(appliedJob => 
                    (appliedJob.id && appliedJob.id === jobKey) || appliedJob.title === jobData.title
                );
                
                if (!alreadyApplied) {
                    const jobToSave = {
                        ...jobData,
                        applicationStatus: 'Pending',
                        appliedDate: new Date().toISOString()
                    };
                    applied.push(jobToSave);
                    localStorage.setItem('appliedJobs', JSON.stringify(applied));
                    window.dispatchEvent(new Event('jobsUpdated'));
                }
            } else {
                // For non-company jobs, save to Saved Jobs
                const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
                
                const jobKey = jobData.id || jobData.title;
                const alreadySaved = saved.some(savedJob => 
                    (savedJob.id && savedJob.id === jobKey) || savedJob.title === jobData.title
                );
                
                if (!alreadySaved) {
                    const jobToSave = {
                        ...jobData,
                        savedDate: new Date().toISOString()
                    };
                    saved.push(jobToSave);
                    localStorage.setItem('savedJobs', JSON.stringify(saved));
                    window.dispatchEvent(new Event('jobsUpdated'));
                }
            }
        } catch (error) {
            console.error('Error applying to job:', error);
        }
        
        if (typeof onApply === 'function') {
            onApply(jobData);
        }
    };

    const handleSaveJob = (e) => {
        e.stopPropagation();
        
        const newSavedState = jobStore.saveJob(jobData);
        setIsSaved(newSavedState);
        
        if (newSavedState) {
            setShowHeartAnimation(true);
        }
        
        window.dispatchEvent(new Event('jobsUpdated'));
    };

  return (
    <div 
        ref={containerRef}
        className="relative isolate w-full mt-3 h-full flex items-start justify-center overflow-hidden"
        onMouseMove={handleMouseMove}
    >
      <HeartAnimation 
        show={showHeartAnimation} 
        onComplete={() => setShowHeartAnimation(false)}
      />
      <AnimatePresence>
        {cursorState.visible && (
            <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    x: cursorState.x - 24, 
                    y: cursorState.y - 24 
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ 
                    type: "spring", 
                    damping: 30, 
                    stiffness: 400, 
                    mass: 0.8,
                    
                }}
               
                className="fixed top-0 left-0 z-50 pointer-events-none"
            >
                <div className={`w-12 h-12 bg-[#FBBF24] rounded-full flex items-center justify-center border-2 border-gray-900 shadow-md transition-transform duration-200 ${cursorState.type === 'up' ? 'rotate-180' : ''}`}>
                    {cursorState.type === 'blocked' ? (
                        <Minus size={24} className="text-gray-900" strokeWidth={2.5} />
                    ) : (
                        <ArrowDown size={24} className="text-gray-900" strokeWidth={2.5} />
                    )}
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Main Card Container */}
      <div 
        ref={cardRef}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
        style={{ cursor: cursorState.visible ? 'none' : 'default', backgroundColor: cardColor || '#EADCF8' }} 
        className="relative w-[75%] h-[90%] rounded-[10px] border-4 border-gray-900 overflow-hidden shadow-2xl z-10"
      >
        {/* Ribbon */}
        <div className="absolute top-4 lg:top-8 right-0 z-20 pointer-events-none">
             <div
                className="border-y-4 border-l-4 border-gray-900 pl-4 pr-8 lg:pl-6 lg:pr-10 py-1 lg:py-2 font-extrabold text-gray-900 text-sm lg:text-lg relative flex items-center"
                style={{
                    backgroundColor: ribbonConfig.color,
                    boxShadow: '-4px 4px 0px 0px rgba(0,0,0,1)'
                }}
            >
                {ribbonConfig.text}
                <div className="absolute top-0 right-0 h-full w-10 overflow-hidden translate-x-full">
                    <div
                        className="h-full w-[200%] border-4 border-gray-900 origin-bottom-left -rotate-45 transform translate-y-1/2"
                        style={{ backgroundColor: ribbonConfig.color }}
                    ></div>
                </div>
             </div>
        </div>

        {/* Scrollable Content Track */}
        <motion.div
          className="w-full h-full"
          animate={{ y: `-${activeSection * 100}%` }}
          transition={{ type: "spring", stiffness: 250, damping: 30 }}
        >
          {/* SECTION 1 */}
          <section className="w-full h-full p-4 lg:p-8 relative flex gap-8">
                <div className="w-7/12 bg-[#311B92] rounded-[10px] p-4 lg:p-6 flex flex-col justify-center relative overflow-hidden border-4 border-[#311B92] h-full">
                    <div className="absolute top-6 right-4 w-16 h-5 border-2 border-orange-600/50 rounded-full"></div>
                    <div className="absolute top-16 left-12 w-10 h-10 border-2 border-orange-600/50 rounded-full"></div>
                    <div className="absolute top-24 right-10 w-24 h-6 border-2 border-orange-600/50 rounded-full"></div>
                    <div className="absolute bottom-20 left-8 w-32 h-8 border-2 border-orange-600/50 rounded-full"></div>

                    <div className="bg-gray-200 text-orange-700 text-[0.6rem] lg:text-xs font-extrabold px-3 py-1 lg:px-4 lg:py-1.5 rounded-full w-fit mb-2 lg:mb-6 z-10">
                        WE ARE HIRING!
                    </div>
                    <h2 className="text-[#D97706] text-2xl lg:text-5xl font-[inter-extra] uppercase leading-tight tracking-tight z-10 wrap-break-word">{titleText.split(' ').slice(0, 1).join(' ')}</h2>
                    <h2 className="text-[#C2410C] text-xl lg:text-4xl font-[inter-extra] uppercase leading-tight mb-4 lg:mb-8 tracking-tight z-10 wrap-break-word">
                        {titleText.split(' ').slice(1).join(' ') || 'Role'}
                    </h2>
                    
                    <ul className="text-white/90 text-[0.65rem] lg:text-sm space-y-1 lg:space-y-2 font-medium mb-4 lg:mb-8 z-10">
                        {requirementItems.length > 0 ? (
                          requirementItems.map((item) => (
                            <li key={item} className="flex items-center before:content-['•'] before:mr-2 before:text-white/60">{item}</li>
                          ))
                        ) : (
                          <li className="flex items-center before:content-['•'] before:mr-2 before:text-white/60">Details coming soon</li>
                        )}
                    </ul>
                    
                    <div className="mt-auto bg-white/30 text-center text-white/90 text-[0.65rem] lg:text-sm font-bold py-1 lg:py-2 rounded-full z-10 mx-1 lg:mx-4">
                        {companyDisplay}
                    </div>
                </div>

                <div className="w-5/12 flex flex-col pt-4 lg:pt-12 pr-2 lg:pr-8 relative h-full">
                    <h1 className="text-xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-1 lg:mb-2 wrap-break-word">{titleText}</h1>
                    <p className="text-gray-800 text-base lg:text-xl font-medium mb-4 whitespace-nowrap">{companyDisplay}</p>

                    <div className="text-gray-600 text-xs lg:text-sm space-y-1 lg:space-y-3 mb-4 font-medium">
                        {location && <p>{location}</p>}
                        {cardSubtitle && <p>{cardSubtitle}</p>}
                        {salaryText && <p>{salaryText}</p>}
                    </div>

                    <div className="flex flex-wrap gap-2 lg:gap-4 mb-auto">
                        {roleTagText && (
                            <span className="px-2 py-1 lg:px-4 lg:py-2 bg-[#FEF9C3] border-2 border-gray-900 border-dashed rounded-full text-[0.65rem] lg:text-sm font-bold flex items-center gap-1 lg:gap-2">
                                <Check className="w-3 h-3 lg:w-4 lg:h-4 text-gray-900" /> {roleTagText}
                            </span>
                        )}
                        {modeTagText && (
                            <span className="px-2 py-1 lg:px-4 lg:py-2 bg-[#FEF9C3] border-2 border-gray-900 border-dashed rounded-full text-[0.65rem] lg:text-sm font-bold flex items-center gap-1 lg:gap-2">
                                <Check className="w-3 h-3 lg:w-4 lg:h-4 text-gray-900" /> {modeTagText}
                            </span>
                        )}
                    </div>

                    <div className="flex gap-2 lg:gap-8 items-center mb-2 lg:mb-4 self-end w-full justify-end pointer-events-auto z-30">
                        <button 
                            // Temporarily hide custom cursor when hovering interactive elements
                            onMouseEnter={() => setCursorState(prev => ({ ...prev, visible: false }))}
                            // Re-trigger mouse move logic when leaving button to show cursor again immediately
                            onMouseLeave={(e) => handleMouseMove(e)}
                            // onClick={(e) => e.stopPropagation()}
                            onClick={async (e) => {
    e.stopPropagation();

    if (!jobData?.recruiterFirebaseId && !jobData?.firebaseRecruiterId && !jobData?.recruiterId) {
        console.error("❌ Missing recruiter Firebase UID in jobData");
        return;
    }

    // Pick whatever field exists (fallback support)
    const recruiterUID =
        jobData.recruiterFirebaseId ||
        jobData.firebaseRecruiterId ||
        jobData.recruiterId;

    const chatUser = {
        id: recruiterUID, // Firebase UID ONLY
        firebaseId: recruiterUID,
        name: jobData.company || "Recruiter",
        img: jobData.companyLogo || "/api/placeholder/100/100",
    };

    const chatId = await addChat(chatUser);

    if (chatId) navigate("/chat");
}}

                            className="bg-white border-2 lg:border-4 border-gray-900 rounded-xl lg:rounded-2xl px-4 py-2 lg:px-8 lg:py-3 font-extrabold text-sm lg:text-lg flex items-center gap-2 lg:gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] lg:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-gray-50 cursor-pointer"
                        >
                            <MessageSquare className="w-4 h-4 lg:w-6 lg:h-6" strokeWidth={2.5} />
                            Chat
                        </button>
                        <button 
                            onMouseEnter={() => setCursorState(prev => ({ ...prev, visible: false }))}
                            onMouseLeave={(e) => handleMouseMove(e)}
                            onClick={handleSaveJob}
                            className="w-10 h-10 lg:w-16 lg:h-16 bg-pink-300 border-2 lg:border-4 border-gray-900 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] lg:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:brightness-110 cursor-pointer"
                            aria-label={isSaved ? 'Remove from saved jobs' : 'Save this job'}
                        >
                           <Heart 
                             fill={isSaved ? 'deeppink' : 'none'} 
                             stroke={isSaved ? 'none' : 'deeppink'} 
                             strokeWidth={2.5}
                             className="w-5 h-5 lg:w-8 lg:h-8 transition-all duration-200" 
                           />
                        </button>
                    </div>
                </div>
          </section>

          {/* SECTION 2 - About the job */}
          <section className="w-full h-full p-8 lg:p-12 flex flex-col justify-center relative">
            <h3 className="text-lg lg:text-2xl font-extrabold mb-4 lg:mb-6 text-gray-900">About the job :</h3>
            <div className="bg-white border-4 h-[73%] overflow-y-auto custom-scroll border-gray-900 rounded-[10px] p-4 lg:p-6 text-xs lg:text-base font-medium leading-relaxed shadow-[8px_8px_0px_0px_rgba(0,0,0,0.25)]">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-wrap gap-4 lg:gap-6">
                        {openingsDisplay != null && <InfoPill label="No. of Openings" value={openingsDisplay} />}
                        {employmentTypeDisplay && <InfoPill label="Employment Type" value={employmentTypeDisplay} />}
                        {durationDisplay && <InfoPill label="Duration" value={durationDisplay} />}
                        {modeDisplay && <InfoPill label="Mode" value={modeDisplay} />}
                    </div>

                    {(stipendDisplay || salaryText || (skills && skills.length > 0)) && (
                        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start">
                            {stipendDisplay && <InfoPill label="Stipend" value={stipendDisplay} />}
                            {salaryText && <InfoPill label="Salary Range" value={salaryText.replace('Salary: ', '').trim()} />}
                            {skills && skills.length > 0 && (
                                <div className="flex flex-col gap-2 bg-white border-2 border-gray-900 rounded-[10px] px-4 lg:px-6 py-3 lg:py-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.45)] min-w-[220px]">
                                    <span className="text-sm lg:text-base font-extrabold text-gray-900">Skills:</span>
                                    <div className="flex flex-wrap gap-2 lg:gap-3">
                                        {skills.map((skill) => (
                                            <SkillTag key={skill} text={skill} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
          </section>

          {/* SECTION 3 */}
          <section className="w-full h-full p-8 lg:p-12 flex flex-col justify-center relative">
            <div className="mb-3">
                <h3 className="text-lg lg:text-2xl font-extrabold mb-2 lg:mb-4 text-gray-900">Roles and Responsibilities:</h3>
                <div className={`bg-white border-4 border-gray-900 rounded-[10px] h-[250px] p-4 lg:p-8 text-xs lg:text-base font-medium leading-relaxed shadow-[8px_8px_0px_0px_rgba(0,0,0,0.25)] overflow-y-auto custom-scroll`}>
                    {rolesList.length > 0 ? (
                        <ul className="list-disc pl-4 lg:pl-6 space-y-2 text-gray-700">
                            {rolesList.map((item, index) => (
                                <li key={`${item}-${index}`}>{item}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">Role expectations will be shared soon.</p>
                    )}
                </div>
            </div>

            <div>
                <h3 className="text-lg lg:text-2xl font-extrabold mb-4  text-gray-900">Perks &amp; Benefits:</h3>
                {perksList.length > 0 ? (
                    <div className="flex text-[10px] flex-wrap gap-3">
                        {perksList.slice(0, 4).map((perk, index) => (
                            <PerkPill key={`${perk}-${index}`} text={perk} />
                        ))}
                    </div>
                ) : (
                    <p className="text-sm lg:text-base text-gray-600">Perks will be shared soon.</p>
                )}
            </div>
          </section>

          {/* SECTION 4 */}
          <section className="w-full h-full p-8 lg:p-12 flex flex-col justify-center relative">
            <div className="mb-6 lg:mb-12">
                <h3 className="text-lg lg:text-2xl font-extrabold mb-2 lg:mb-4 text-gray-900">Job Overview:</h3>
                <div className="bg-white border-4 border-gray-900 rounded-[10px] p-4 text-xs lg:text-base font-medium leading-relaxed shadow-[8px_8px_0px_0px_rgba(0,0,0,0.25)] h-32 overflow-y-auto custom-scroll">
                    <p className="text-gray-700">{aboutJob ?? descriptionText}</p>
                </div>
            </div>

            <div className="mb-6 lg:mb-8">
                <h3 className="text-lg lg:text-2xl font-extrabold mb-2 lg:mb-4 text-gray-900">About the Organization:</h3>
                <div className="bg-white border-4 border-gray-900 rounded-[10px] p-4  text-xs lg:text-base font-medium leading-relaxed shadow-[8px_8px_0px_0px_rgba(0,0,0,0.25)] h-32 overflow-y-auto custom-scroll">
                   <p className="text-gray-700">{aboutCompany ?? 'More information about the organization will be available soon.'}</p>
                </div>
            </div>

            {applicationLink && (
                <a
                    href={applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="inline-flex w-fit items-center justify-center gap-2 px-6 py-3 bg-[#FBBF24] border-4 border-gray-900 rounded-full font-extrabold text-sm lg:text-lg text-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                    Apply Now
                </a>
            )}
          </section>
        </motion.div>
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute bottom-[5%] left-0 right-0 flex justify-center gap-8 lg:gap-16 z-40 pointer-events-none">
        <motion.button 
            whileHover={{ scale: 1.1, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRejectClick}
            className="w-16 h-16 lg:w-24 lg:h-24 bg-white rounded-full border-4 border-gray-900 flex items-center justify-center shadow-[0px_8px_0px_0px_rgba(0,0,0,0.1)] pointer-events-auto cursor-pointer"
        >
            <X className="w-8 h-8 lg:w-12 lg:h-12 text-gray-900 stroke-[2.5]" />
        </motion.button>
        <motion.button 
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleApplyClick}
            className="w-16 h-16 lg:w-24 lg:h-24 bg-white rounded-full border-4 border-gray-900 flex items-center justify-center shadow-[0px_8px_0px_0px_rgba(0,0,0,0.1)] pointer-events-auto cursor-pointer"
        >
            <Check className="w-8 h-8 lg:w-12 lg:h-12 text-gray-900 stroke-[2.5]" />
        </motion.button>
      </div>
    </div>
  );
}