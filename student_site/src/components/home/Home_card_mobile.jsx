import React, { useMemo, useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import JobCardMobile from './JobCardMobile';
import jobStore from '../../utils/jobStore';

const CARD_COLORS = ['#E3FEAA', '#B8D1E6', '#E6D3FC'];

const COLOR_CONFIG = {
	primary: '#311B92',
	secondary: '#311B92',
	detail: '#FB923C',
	textColor: '#FB923C'
};

const RIBBON_CONFIGS = {
	'on-campus': { color: '#34D399', text: 'On Campus' },
	'company': { color: '#FAB648', text: 'In House' },
	'outreach': { color: '#60A5FA', text: 'Outreach' },
	'default': { color: '#FAB648', text: 'In House' }
};

const HomeCardMobile = ({ jobs, onSaveToggle, onCardSelect, onSwipeLeft, onSwipeRight }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [jobStates, setJobStates] = useState({});

	// Load saved jobs state from jobStore
	React.useEffect(() => {
		const updateSavedState = () => {
			const savedMap = {};
			jobs.forEach(job => {
				const jobId = job.id || job.title;
				savedMap[jobId] = jobStore.isJobSaved(jobId, job.title);
			});
			setJobStates(savedMap);
		};
		
		updateSavedState();
		
		// Subscribe to changes
		const unsubscribe = jobStore.subscribe(() => {
			updateSavedState();
		});
		
		return () => unsubscribe();
	}, [jobs]);

	const preparedJobs = useMemo(() => {
		return jobs.map((job, index) => {
			const highlights =
				(Array.isArray(job.cardHighlights) && job.cardHighlights.length
					? job.cardHighlights
					: job.bullets) ?? [];

			// Determine ribbon config based on job type
			const normalizedType = typeof job.jobType === 'string' 
				? job.jobType.toLowerCase().replace(/\s+/g, '-') 
				: '';
			const ribbonConfig = RIBBON_CONFIGS[normalizedType] || RIBBON_CONFIGS.default;


			// Determine company name with fallback logic
			const companyDisplay = (() => {
				if (job.company) return job.company;
				if (job.college) return job.college;
				if (job.aboutCompany) {
					const beforeIs = job.aboutCompany.split(' is ')[0];
					if (beforeIs && beforeIs.length <= 80) {
						return beforeIs.trim();
					}
				}
				return 'Company name';
			})();

			const jobKey = job.id || job.title;

			return {
				...job,
				accentPrimary: job.accentPrimary ?? COLOR_CONFIG.primary,
				accentSecondary: job.accentSecondary ?? COLOR_CONFIG.secondary,
				accentDetail: job.accentDetail ?? COLOR_CONFIG.detail,
				textColor: job.textColor ?? COLOR_CONFIG.textColor,
				employmentTypeLabel: job.employmentTypeLabel ?? job.employmentType ?? 'Hiring',
				cardTagline: job.cardTagline ?? job.tagline ?? 'WE ARE HIRING!',
				cardRoleHighlight:
					job.cardRoleHighlight ??
					job.roleHighlight ??
					(job.title ? job.title.toUpperCase() : 'Open role'),
				cardHighlights: highlights,
				companyName: job.companyName ?? companyDisplay,
				companyVerified: job.companyVerified ?? false,
				cardLocation: job.cardLocation ?? job.location ?? 'Remote',
				experienceLabel: job.experienceLabel ?? job.experience ?? 'Experience flexible',
				cardWebsite: job.cardWebsite ?? job.website ?? job.applicationLink ?? null,
				isSaved: jobStates[jobKey] ?? false,
				ribbonConfig
			};
		});
	}, [jobs, jobStates]);

	const handleCardClick = (job) => {
		onCardSelect?.(job);
	};

	const handleSaveClick = (event, job) => {
		event.stopPropagation();
		
		const jobKey = job.id || job.title;
		const isSaved = jobStates[jobKey] || false;
		
		// Toggle saved state
		setJobStates(prev => ({
			...prev,
			[jobKey]: !isSaved
		}));
		
		// Call parent handler if exists
		onSaveToggle?.(job);
	};

	const handleSwipe = (direction, job) => {
		if (direction === 'right') {
			console.log('Applied to job:', job.title);
			onSwipeRight?.(job);
			
			// Save job to appropriate section based on jobType
			const normalizedType = typeof job.jobType === 'string' 
				? job.jobType.toLowerCase().replace(/\s+/g, '-') 
				: '';
			
			if (normalizedType === 'company') {
				// In House job → Applied Jobs with status
				jobStore.applyToJob(job);
			} else if (normalizedType === 'on-campus' || normalizedType === 'outreach') {
				// On Campus/Outreach → Saved Jobs
				jobStore.saveJob(job);
			}
			
			// Dispatch event to notify SavedJobs page
			window.dispatchEvent(new Event('jobsUpdated'));
			window.dispatchEvent(new Event('jobApplied'));
		} else if (direction === 'left') {
			console.log('Rejected job:', job.title);
			onSwipeLeft?.(job);
		}
		
		// Move to next card immediately
		setCurrentIndex((prev) => prev + 1);
	};

	// Get visible cards (current + next 2 for stack effect)
	const visibleCards = preparedJobs.slice(currentIndex, currentIndex + 3);

	if (currentIndex >= preparedJobs.length) {
		return (
			<div className="flex w-full justify-center items-center py-4 sm:py-6 h-[53vh] xs:h-[55vh] sm:h-[58vh]">
				<p className="text-lg font-semibold text-gray-600">No more jobs to show!</p>
			</div>
		);
	}

	return (
		<div className="flex w-full justify-center py-4 sm:py-6">
			<div className="relative w-[90vw] h-[53vh] xs:h-[55vh] sm:h-[58vh]">
				<AnimatePresence>
					{visibleCards.map((job, index) => {
						const cardColor = CARD_COLORS[(currentIndex + index) % CARD_COLORS.length];
						const isTopCard = index === 0;
						
						return (
							<CardWrapper
								key={job.id ?? job.title}
								job={job}
								cardColor={cardColor}
								isTopCard={isTopCard}
								index={index}
								onSwipe={handleSwipe}
								onCardClick={handleCardClick}
								onSaveClick={handleSaveClick}
							/>
						);
					})}
				</AnimatePresence>
			</div>
		</div>
	);
};

// Separate component for individual card with swipe logic
const CardWrapper = ({ job, cardColor, isTopCard, index, onSwipe, onCardClick, onSaveClick }) => {
	const [exitX, setExitX] = useState(0);
	const x = useMotionValue(0);
	const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);

	const handleDragEnd = (event, info) => {
		const threshold = 75;
		const velocity = Math.abs(info.velocity.x);
		const offset = info.offset.x;
		
		// Check direction and trigger swipe
		if (offset > threshold || (velocity > 500 && offset > 0)) {
			// Swiped right - Apply
			setExitX(400);
			onSwipe('right', job);
		} else if (offset < -threshold || (velocity > 500 && offset < 0)) {
			// Swiped left - Reject
			setExitX(-400);
			onSwipe('left', job);
		}
	};

	// Calculate scale and y position for stacked cards
	const scale = 1 - index * 0.03;
	const yOffset = index * 20;
	const dimOpacity = 1 - index * 0.25;

	return (
		<motion.div
			className="absolute inset-0 touch-none select-none"
			style={{
				x: isTopCard ? x : 0,
				rotate: isTopCard ? rotate : 0,
				zIndex: 10 - index,
			}}
			initial={{
				scale: scale,
				y: yOffset,
				opacity: dimOpacity,
			}}
			animate={{
				scale: scale,
				y: yOffset,
				opacity: dimOpacity,
			}}
			exit={{
				x: exitX,
				opacity: 0,
				rotate: exitX > 0 ? 20 : -20,
				transition: { 
					duration: 0.3,
					ease: [0.4, 0, 0.2, 1]
				}
			}}
			drag={isTopCard ? 'x' : false}
			dragElastic={0.7}
			dragTransition={{ 
				bounceStiffness: 300,
				bounceDamping: 20,
				power: 0.2,
				timeConstant: 200
			}}
			onDragEnd={isTopCard ? handleDragEnd : undefined}
			whileDrag={isTopCard ? { 
				scale: 1.03,
				transition: { duration: 0.15 }
			} : {}}
			transition={{
				type: 'spring',
				stiffness: 350,
				damping: 30,
			}}
		>
			<JobCardMobile
				job={job}
				cardColor={cardColor}
				onCardClick={onCardClick}
				onSaveClick={onSaveClick}
			/>
		</motion.div>
	);
};

export default HomeCardMobile;
