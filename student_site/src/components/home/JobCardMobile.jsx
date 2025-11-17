import React, { useState } from 'react';
import { BadgeCheck, Briefcase, Heart, MapPin } from 'lucide-react';
import HeartAnimation from '../common/HeartAnimation';

const formatHostname = (link) => {
	if (!link) return 'View details';
	try {
		return new URL(link).hostname.replace(/^www\./, '');
	} catch (error) {
		return link.replace(/^https?:\/\//, '');
	}
};

const JobCardMobile = ({ job, cardColor, onCardClick, onSaveClick }) => {
	const [showHeartAnimation, setShowHeartAnimation] = useState(false);
	
	const highlightItems =
		Array.isArray(job.cardHighlights) && job.cardHighlights.length
			? job.cardHighlights
			: [];

	const handleSaveClick = (event) => {
		event.stopPropagation();
		
		// Show animation when saving (not unsaving)
		if (!job.isSaved) {
			setShowHeartAnimation(true);
		}
		
		// Call parent handler which will handle localStorage
		if (onSaveClick) {
			onSaveClick(event, job);
		}
	};

	return (
		<>
			<HeartAnimation 
				show={showHeartAnimation} 
				onComplete={() => setShowHeartAnimation(false)}
			/>
			<article
			className="flex h-full cursor-pointer flex-col gap-0 rounded-2xl sm:rounded-[20px] border-[3px] sm:border-4 border-[#212121] shadow-[8px_10px_0px_0px_rgba(0,0,0,0.35)] sm:shadow-[12px_14px_0px_0px_rgba(0,0,0,0.35)] relative p-3 sm:p-4"
			style={{ backgroundColor: cardColor }}
			onClick={() => onCardClick(job)}
			role="button"
			tabIndex={0}
			onKeyDown={(event) => {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault();
					onCardClick(job);
				}
			}}
		>
			{/* Ribbon Tag */}
			<div className="absolute top-3 sm:top-4 right-0 z-20 pointer-events-none">
				<div
					className="border-y-[3px] sm:border-y-4 border-l-[3px] sm:border-l-4 border-[#212121] pl-3 sm:pl-4 pr-4 sm:pr-6 py-0.5 sm:py-1 font-extrabold text-[#212121] text-[10px] sm:text-xs relative flex items-center"
					style={{
						backgroundColor: job.ribbonConfig.color,
						boxShadow: '-3px 3px 0px 0px rgba(0,0,0,1)'
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
					<div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex gap-1 sm:gap-2">
						<div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full border-2 sm:border-[3px] opacity-40" style={{ borderColor: job.accentDetail }} />
						<div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 sm:border-[3px] opacity-30" style={{ borderColor: job.accentDetail }} />
						<div className="w-5 h-5 sm:w-7 sm:h-7 rounded-full border-2 sm:border-[3px] opacity-40" style={{ borderColor: job.accentDetail }} />
					</div>
					{/* Middle left elongated shapes */}
					<div className="absolute top-12 sm:top-16 left-2 sm:left-4 flex flex-col gap-1 sm:gap-2">
						<div className="w-16 h-4 sm:w-20 sm:h-5 rounded-full border-2 sm:border-[3px] opacity-30" style={{ borderColor: job.accentDetail }} />
						<div className="w-10 h-3 sm:w-12 sm:h-4 rounded-full border-2 sm:border-[3px] opacity-25" style={{ borderColor: job.accentDetail }} />
					</div>
					{/* Middle right circles */}
					<div className="absolute top-20 sm:top-24 right-4 sm:right-8 flex gap-1 sm:gap-2">
						<div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 sm:border-[3px] opacity-35" style={{ borderColor: job.accentDetail }} />
						<div className="w-12 h-4 sm:w-16 sm:h-5 rounded-full border-2 sm:border-[3px] opacity-30" style={{ borderColor: job.accentDetail }} />
					</div>
					{/* Bottom left patterns */}
					<div className="absolute bottom-24 sm:bottom-28 left-4 sm:left-8 flex gap-1 sm:gap-2">
						<div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 sm:border-[3px] opacity-30" style={{ borderColor: job.accentDetail }} />
						<div className="w-16 h-5 sm:w-20 sm:h-6 rounded-full border-2 sm:border-[3px] opacity-25" style={{ borderColor: job.accentDetail }} />
					</div>
					{/* Bottom right circle */}
					<div className="absolute bottom-16 sm:bottom-20 right-4 sm:right-6">
						<div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 sm:border-[3px] opacity-35" style={{ borderColor: job.accentDetail }} />
					</div>
				</div>

				<div className="absolute inset-x-0 bottom-3 sm:bottom-4 flex flex-col gap-2 sm:gap-3 px-3 sm:px-5 text-white">
					<span 
						className="inline-flex w-max rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-extrabold uppercase tracking-wide border-2 border-[#212121] shadow-[2px_3px_0px_0px_rgba(0,0,0,0.4)]"
						style={{ backgroundColor: '#F5E6D3', color: '#212121' }}
					>
						{job.cardTagline}
					</span>
					<h2 
						className="text-[35px]  font-black leading-[1.1] drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
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
					<ul className="space-y-1 sm:space-y-1.5 text-xs sm:text-sm font-medium text-white">
						{highlightItems.slice(0, 4).map((item) => (
							<li key={item} className="flex items-start gap-1.5 sm:gap-2">
								<span className="mt-1 sm:mt-1.5 h-1.5 w-1.5 rounded-full bg-white shrink-0" aria-hidden="true"></span>
								<span>{item}</span>
							</li>
						))}
						{highlightItems.length > 4 && (
							<li className="flex items-start gap-1.5 sm:gap-2">
								<span className="mt-1 sm:mt-1.5 h-1.5 w-1.5 rounded-full bg-white shrink-0" aria-hidden="true"></span>
								<span>...</span>
							</li>
						)}
					</ul>
					{job.cardWebsite && (
						<div className="pt-1.5 sm:pt-2">
							<a
								className="inline-flex items-center rounded-full border-2 px-4 sm:px-6 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold tracking-wide transition-all hover:scale-105"
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

			<div className="flex flex-col gap-3 sm:gap-4 pt-3 sm:pt-4 text-[#1B1B1B]">
				<div className="flex items-start justify-between gap-3 sm:gap-4">
					<div className="flex-1 min-w-0">
						<h3 className="font-extrabold leading-5 sm:leading-6 text-[#212121] line-clamp-2" style={{ fontSize: job.title && job.title.length > 25 ? '14px' : '18px' }}>
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
						onClick={handleSaveClick}
						className="rounded-2xl border-[3px] border-[#212121] bg-[#F8BBD0] p-3 shadow-[4px_5px_0px_0px_rgba(0,0,0,0.25)] transition-transform active:translate-y-0.5 shrink-0 hover:shadow-[6px_7px_0px_0px_rgba(0,0,0,0.35)] hover:-translate-y-0.5"
						aria-label={job.isSaved ? 'Remove from saved jobs' : 'Save this job'}
					>
						<Heart
							className="h-5 w-5 transition-all duration-200"
							strokeWidth={2.5}
							fill={job.isSaved ? '#E91E63' : 'none'}
							color={job.isSaved ? '#E91E63' : '#212121'}
						/>
					</button>
				</div>

				<div className="w-full h-px bg-[#E5E5E5]"></div>

				<div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-[#212121]">
					<div className="flex items-center gap-1.5 sm:gap-2">
						<MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-[#7C3AED]" aria-hidden="true" />
						<span className="line-clamp-1">{job.cardLocation}</span>
					</div>
					<div className="flex items-center gap-1.5 sm:gap-2">
						<Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-[#7C3AED]" aria-hidden="true" />
						<span className="line-clamp-1">{job.experienceLabel}</span>
					</div>
				</div>
			</div>
			</article>
		</>
	);
};

export default JobCardMobile;
