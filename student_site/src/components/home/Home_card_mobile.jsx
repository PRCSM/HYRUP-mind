import React, { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { BadgeCheck, Briefcase, Heart, MapPin } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-cards';

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

const formatHostname = (link) => {
	if (!link) return 'View details';
	try {
		return new URL(link).hostname.replace(/^www\./, '');
	} catch (error) {
		return link.replace(/^https?:\/\//, '');
	}
};

const HomeCardMobile = ({ jobs, onSaveToggle, onCardSelect, onSwipeLeft, onSwipeRight }) => {
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
				isSaved: job.isSaved ?? false,
				ribbonConfig
			};
		});
	}, [jobs]);

	const handleCardClick = (job) => {
		onCardSelect?.(job);
	};

	const handleSaveClick = (event, job) => {
		event.stopPropagation();
		onSaveToggle?.(job);
	};

	const handleSlideChange = (swiper) => {
		const currentJob = preparedJobs[swiper.previousIndex];
		if (!currentJob) return;

		// Detect swipe direction based on active index change
		if (swiper.activeIndex > swiper.previousIndex) {
			// Swiped to next card (right swipe) = Apply
			console.log('Applied to job:', currentJob.title);
			onSwipeRight?.(currentJob);
		} else if (swiper.activeIndex < swiper.previousIndex) {
			// Swiped to previous card (left swipe) = Reject
			console.log('Rejected job:', currentJob.title);
			onSwipeLeft?.(currentJob);
		}
	};

	return (
		<div className="flex w-full justify-center py-6">
			<Swiper
				effect="cards"
				grabCursor
				centeredSlides
				modules={[EffectCards]}
				cardsEffect={{
					perSlideOffset: 12,
					perSlideRotate: 2,
					rotate: true,
					slideShadows: false
				}}
				onSlideChange={handleSlideChange}
				className="h-[520px] max-w-[360px]"
			>
				{preparedJobs.map((job, index) => {
					const highlightItems =
						Array.isArray(job.cardHighlights) && job.cardHighlights.length
							? job.cardHighlights
							: [];
					const cardColor = CARD_COLORS[index % CARD_COLORS.length];
					return (
						<SwiperSlide key={job.id ?? job.title} className="rounded-[20px] bg-transparent">
							<article
								className="flex h-full cursor-pointer flex-col gap-0 rounded-[20px] border-4 border-[#212121] shadow-[12px_14px_0px_0px_rgba(0,0,0,0.35)] relative p-4"
								style={{ backgroundColor: cardColor }}
								onClick={() => handleCardClick(job)}
								role="button"
								tabIndex={0}
								onKeyDown={(event) => {
									if (event.key === 'Enter' || event.key === ' ') {
										event.preventDefault();
										handleCardClick(job);
									}
								}}
							>
								{/* Ribbon Tag */}
								<div className="absolute top-4 right-0 z-20 pointer-events-none">
									<div
										className="border-y-4 border-l-4 border-[#212121] pl-4 pr-6 py-1 font-extrabold text-[#212121] text-xs relative flex items-center"
										style={{
											backgroundColor: job.ribbonConfig.color,
											boxShadow: '-4px 4px 0px 0px rgba(0,0,0,1)'
										}}
									>
										{job.ribbonConfig.text}
										
									</div>
								</div>

								<div
									className="relative flex-1 rounded-3xl overflow-hidden border-4 border-[#212121] p-6"
									style={{
										backgroundColor: '#311B92'
									}}
								>
									{/* Decorative circles pattern */}
									<div className="absolute inset-0 overflow-hidden pointer-events-none">
										{/* Top right circles */}
										<div className="absolute top-4 right-4 flex gap-2">
											<div className="w-7 h-7 rounded-full border-[3px] opacity-40" style={{ borderColor: job.accentDetail }} />
											<div className="w-5 h-5 rounded-full border-[3px] opacity-30" style={{ borderColor: job.accentDetail }} />
											<div className="w-7 h-7 rounded-full border-[3px] opacity-40" style={{ borderColor: job.accentDetail }} />
										</div>
										{/* Middle left elongated shapes */}
										<div className="absolute top-16 left-4 flex flex-col gap-2">
											<div className="w-20 h-5 rounded-full border-[3px] opacity-30" style={{ borderColor: job.accentDetail }} />
											<div className="w-12 h-4 rounded-full border-[3px] opacity-25" style={{ borderColor: job.accentDetail }} />
										</div>
										{/* Middle right circles */}
										<div className="absolute top-24 right-8 flex gap-2">
											<div className="w-6 h-6 rounded-full border-[3px] opacity-35" style={{ borderColor: job.accentDetail }} />
											<div className="w-16 h-5 rounded-full border-[3px] opacity-30" style={{ borderColor: job.accentDetail }} />
										</div>
										{/* Bottom left patterns */}
										<div className="absolute bottom-28 left-8 flex gap-2">
											<div className="w-8 h-8 rounded-full border-[3px] opacity-30" style={{ borderColor: job.accentDetail }} />
											<div className="w-20 h-6 rounded-full border-[3px] opacity-25" style={{ borderColor: job.accentDetail }} />
										</div>
										{/* Bottom right circle */}
										<div className="absolute bottom-20 right-6">
											<div className="w-9 h-9 rounded-full border-[3px] opacity-35" style={{ borderColor: job.accentDetail }} />
										</div>
									</div>

									<div className="absolute inset-x-0 bottom-4 flex flex-col gap-3 px-5 text-white">
										<span 
											className="inline-flex w-max rounded-full px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide border-2 border-[#212121] shadow-[2px_3px_0px_0px_rgba(0,0,0,0.4)]"
											style={{ backgroundColor: '#F5E6D3', color: '#212121' }}
										>
											{job.cardTagline}
										</span>
										<h2 
											className="text-[40px] font-black leading-[1.1] drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
											style={{ color: job.textColor }}
										>
											{(() => {
												if (!job.cardRoleHighlight) return 'OPEN ROLE';
												const words = job.cardRoleHighlight.split(' ');
												if (words.length > 2) {
													const truncatedWords = words.slice(0, 2);
													return truncatedWords.map((word, idx) => (
														<React.Fragment key={idx}>
															{word}
															{idx < truncatedWords.length - 1 && <br />}
														</React.Fragment>
													));
												}
												return words.map((word, idx) => (
													<React.Fragment key={idx}>
														{word}
														{idx < words.length - 1 && <br />}
													</React.Fragment>
												));
											})()}
										</h2>
										<ul className="space-y-1.5 text-sm font-medium text-white">
											{highlightItems.map((item) => (
												<li key={item} className="flex items-start gap-2">
													<span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-white shrink-0" aria-hidden="true"></span>
													<span>{item}</span>
												</li>
											))}
										</ul>
										{job.cardWebsite && (
											<div className="pt-2">
												<a
													className="inline-flex items-center rounded-full border-2 px-6 py-1.5 text-xs font-bold tracking-wide transition-all hover:scale-105"
													style={{ 
														backgroundColor: '#E5E5E5',
														color: '#D97706',
														borderColor: '#212121',
														boxShadow: '2px 3px 0px 0px rgba(0,0,0,0.3)'
													}}
													href={job.cardWebsite}
													target="_blank"
													rel="noreferrer"
													onClick={(e) => e.stopPropagation()}
												>
													{formatHostname(job.cardWebsite)}
												</a>
											</div>
										)}
									</div>
								</div>

								<div className="flex flex-col gap-4 pt-4 text-[#1B1B1B]">
									<div className="flex items-start justify-between gap-4">
										<div className="flex-1 min-w-0">
											<h3 className="font-extrabold leading-6 text-[#212121] line-clamp-2" style={{ fontSize: job.title && job.title.length > 25 ? '16px' : '20px' }}>
												{job.title}
											</h3>
											<div className="mt-2 flex items-center gap-2 text-sm font-semibold text-[#212121]">
												<span className="line-clamp-1 min-w-0">{job.companyName}</span>
												{job.companyVerified && (
													<BadgeCheck className="h-4 w-4 text-[#60A5FA] shrink-0" aria-hidden="true" />
												)}
											</div>
										</div>
										<button
											type="button"
											onClick={(event) => handleSaveClick(event, job)}
											className="rounded-2xl border-[3px] border-[#212121] bg-[#F8BBD0] p-3 shadow-[4px_5px_0px_0px_rgba(0,0,0,0.25)] transition-transform active:translate-y-0.5 shrink-0"
											aria-label={job.isSaved ? 'Remove from saved jobs' : 'Save this job'}
										>
											<Heart
												className="h-5 w-5"
												strokeWidth={2.5}
												fill={job.isSaved ? '#E91E63' : 'none'}
												color={job.isSaved ? '#E91E63' : '#212121'}
											/>
										</button>
									</div>

									<div className="w-full h-px bg-[#E5E5E5]"></div>

									<div className="flex items-center justify-between text-sm font-semibold text-[#212121]">
										<div className="flex items-center gap-2">
											<MapPin className="h-5 w-5 text-[#7C3AED]" aria-hidden="true" />
											<span>{job.cardLocation}</span>
										</div>
										<div className="flex items-center gap-2">
											<Briefcase className="h-5 w-5 text-[#7C3AED]" aria-hidden="true" />
											<span>{job.experienceLabel}</span>
										</div>
									</div>
								</div>
							</article>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

export default HomeCardMobile;
