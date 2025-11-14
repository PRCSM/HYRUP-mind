import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
	ArrowLeft,
	BadgeCheck,
	Heart,
	MessageSquare,
	MapPin,
	Users
} from 'lucide-react';

const toTitleCase = (value) => {
	if (!value || typeof value !== 'string') return null;
	return value
		.split(/[\s_/|-]+/)
		.filter(Boolean)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ');
};

const toList = (value) => {
	if (!value) return [];
	if (Array.isArray(value)) {
		return value
			.filter(Boolean)
			.map((item) => (typeof item === 'string' ? item.trim() : item))
			.filter(Boolean);
	}
	return value
		.split(/\r?\n|•|\u2022/)
		.flatMap((segment) => segment.split(/\.(?!\d)/))
		.map((item) => item.replace(/^[•\-\s]+/, '').trim())
		.filter(Boolean);
};

const formatCurrencyRange = (range) => {
	if (!range || (range.min == null && range.max == null)) return null;
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 0
	});
	if (range.min != null && range.max != null) {
		return `${formatter.format(range.min)} - ${formatter.format(range.max)}`;
	}
	if (range.min != null) {
		return `From ${formatter.format(range.min)}`;
	}
	if (range.max != null) {
		return `Up to ${formatter.format(range.max)}`;
	}
	return null;
};

const formatCompensation = (job) => {
	if (!job) return 'Not specified';
	if (job.salaryText) return job.salaryText;
	if (job.stipend) return job.stipend;
	const range = formatCurrencyRange(job.salaryRange);
	return range ?? 'Not specified';
};

const extractCompanyName = (job) => {
	if (!job) return 'Hiring Company';
	if (job.companyName) return job.companyName;
	if (job.company) return job.company;
	if (typeof job.aboutCompany === 'string') {
		const firstSentence = job.aboutCompany.split('.')[0];
		if (firstSentence) return firstSentence.trim();
	}
	return 'Hiring Company';
};

const RIBBON_CONFIGS = {
	'on-campus': { color: '#34D399', text: 'On Campus' },
	'company': { color: '#FAB648', text: 'In House' },
	'outreach': { color: '#60A5FA', text: 'Outreach' },
	'default': { color: '#FAB648', text: 'In House' }
};

const HomeJobMobile = ({ job, isOpen, onClose }) => {
	const companyName = extractCompanyName(job);
	const locationLabel =
		job?.cardLocation ?? job?.location ?? job?.preferences?.location ?? 'Flexible';
	const modeLabel = job?.modeLabel ?? toTitleCase(job?.mode ?? job?.workMode);
	const employmentLabel =
		job?.employmentTypeLabel ?? toTitleCase(job?.employmentType ?? job?.jobType);
	const experienceLabel =
		job?.experienceLabel ??
		(typeof job?.preferences?.minExperience === 'number'
			? `${job.preferences.minExperience}+ yrs experience`
			: null);
	const openings = job?.noOfOpenings ?? job?.openings ?? null;
	const applyLink = job?.applicationLink ?? job?.cardWebsite ?? job?.website ?? null;
	
	// Determine ribbon config based on job type
	const normalizedType = typeof job?.jobType === 'string' 
		? job.jobType.toLowerCase().replace(/\s+/g, '-') 
		: '';
	const ribbonConfig = RIBBON_CONFIGS[normalizedType] || RIBBON_CONFIGS.default;
	const infoCards = [
		{ label: 'Job Type', value: employmentLabel ?? 'Full Time' },
		{ label: 'Duration', value: job?.duration ?? '2month' },
		{ label: 'Mode', value: modeLabel ?? 'Online' },
		{ label: 'Stipend', value: formatCompensation(job) }
	];
	const skills = Array.isArray(job?.preferences?.skills) ? job.preferences.skills : [];
	const rolesList = toList(job?.rolesAndResponsibilities).slice(0, 8);
	const perksList = toList(job?.perks).slice(0, 6);
	const jobDetails =
		job?.aboutJob ?? job?.description ?? 'Details will be shared during the interview process.';
	const companyDetails =
		job?.aboutCompany ?? 'Company information will be shared with shortlisted candidates.';
	const accentPrimary = job?.accentPrimary ?? '#4F46E5';
	const accentDetail = job?.accentDetail ?? '#F97316';

	return (
		<AnimatePresence>
			{isOpen && job && (
				<>
					<motion.div
						key="overlay"
						className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
					/>
					<motion.div
						key="drawer"
						className="fixed inset-0 z-50 flex flex-col"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<motion.div
							initial={{ y: '100%' }}
							animate={{ y: 0 }}
							exit={{ y: '100%' }}
							transition={{ type: 'spring', stiffness: 260, damping: 28 }}
							className="mt-auto h-[92vh] overflow-hidden rounded-t-[20px] border-[3px] border-[#1f1f1f] bg-[#F5F5F5] shadow-[0_-10px_0px_rgba(0,0,0,0.35)]"
						>
							<div className="flex h-full flex-col">
								<div className="flex-1 overflow-y-auto pb-12">
									{/* Top Section with White Background */}
									<div className="relative bg-white px-6 pt-5 pb-6 border-b-[3px] border-[#1f1f1f]">
										{/* Header Buttons */}
										<div className="flex items-center justify-between mb-4">
											<button
												type="button"
												onClick={onClose}
												className="flex h-11 w-11 items-center justify-center rounded-[10px] border-[3px] border-[#1f1f1f] bg-white shadow-[4px_4px_0px_rgba(0,0,0,0.25)]"
												aria-label="Go back"
											>
												<ArrowLeft className="h-5 w-5 text-[#1f1f1f]" strokeWidth={2.5} />
											</button>

										</div>

										{/* Ribbon Tag */}
										<div className="absolute top-10 right-0 z-20">
											<div
												className="border-y-[3px] border-l-[3px] border-[#1f1f1f] pl-4 pr-6 py-1.5 font-extrabold text-[#1f1f1f] text-xs relative flex items-center"
												style={{
													backgroundColor: ribbonConfig.color,
													boxShadow: '-4px 4px 0px 0px rgba(0,0,0,1)'
												}}
											>
												{ribbonConfig.text}
												<div className="absolute top-0 right-0 h-full w-8 overflow-hidden translate-x-full">
													<div
														className="h-full w-[200%] border-[3px] border-[#1f1f1f] origin-bottom-left -rotate-45 transform translate-y-1/2"
														style={{ backgroundColor: ribbonConfig.color }}
													></div>
												</div>
											</div>
										</div>

										{/* Company Name and Title */}
										<div className="mb-3">
											<div className="flex items-center gap-2 mb-1">
												<p className="text-base font-bold text-[#1f1f1f]">
													{companyName}
												</p>
												{job.companyVerified && (
													<BadgeCheck className="h-5 w-5 text-[#60A5FA]" strokeWidth={2.5} />
												)}
											</div>
											<h1 className="text-2xl font-black text-[#1f1f1f] leading-tight">{job.title}</h1>
										</div>

										{/* Location and Experience Info */}
										<p className="text-sm text-[#757575] mb-3">
											{locationLabel} · {job?.postedTime ?? '3 weeks ago'} · {job?.applicantCount ?? 'Over 100 people'} clicked apply
										</p>

										{/* Tags */}
										<div className="flex flex-wrap gap-2 mb-4">
											<span className="flex items-center gap-1.5 rounded-full border-2 border-dashed border-[#1f1f1f] bg-[#FFFDE7] px-4 py-1.5 text-xs font-bold text-[#1f1f1f]">
												<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
													<path d="M5 12h14M12 5l7 7-7 7" />
												</svg>
												{modeLabel ?? 'On-site'}
											</span>
											<span className="flex items-center gap-1.5 rounded-full border-2 border-dashed border-[#1f1f1f] bg-[#FFFDE7] px-4 py-1.5 text-xs font-bold text-[#1f1f1f]">
												<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
													<path d="M5 12h14M12 5l7 7-7 7" />
												</svg>
												{employmentLabel ?? 'Full Time'}
											</span>
										</div>

										{/* Action Buttons Row */}
										<div className="flex items-center justify-between gap-3 mb-3">
											<button
												className="flex items-center justify-center rounded-[10px] border-[3px] border-[#1f1f1f] bg-[#E3FEAA] px-8 py-3 text-base font-extrabold text-[#1f1f1f] shadow-[6px_6px_0px_rgba(0,0,0,0.35)] transition-transform active:translate-y-0.5"
											>
												Apply Now
											</button>
                                            <div className='flex justify-between items-center gap-4'>
                                                <button
												className="flex items-center justify-center rounded-[10px] border-[3px] border-[#1f1f1f] bg-[#F8BBD0] p-3.5 shadow-[6px_6px_0px_rgba(0,0,0,0.35)] transition-transform active:translate-y-0.5"
												aria-label="Save job"
											>
												<Heart
													className="h-6 w-6"
													strokeWidth={2.5}
													fill={job.isSaved ? '#E91E63' : 'none'}
													color={job.isSaved ? '#E91E63' : '#1f1f1f'}
												/>
											</button>
											<button
												className="flex items-center justify-center rounded-[10px] border-[3px] border-[#1f1f1f] bg-white p-3.5 shadow-[6px_6px_0px_rgba(0,0,0,0.35)] transition-transform active:translate-y-0.5"
												aria-label="More options"
											>
												<MessageSquare className="h-6 w-6 text-[#1f1f1f]" strokeWidth={2.5} />
											</button>
                                            </div>
											
										</div>

										{/* No. of Openings */}
										<div className="inline-block rounded-[10px] border-[3px] border-[#1f1f1f] bg-white px-5 py-2.5 text-sm font-extrabold text-[#1f1f1f] shadow-[6px_6px_0px_rgba(0,0,0,0.35)]">
											No. of Openings <span className="ml-2">{openings != null ? openings : '20'}</span>
										</div>
									</div>

									{/* Rest of Content */}
									<div className="px-6">

									<section className="mt-6">
										<h2 className="text-lg font-black text-[#1f1f1f] mb-3">About the job</h2>
										<div className="grid grid-cols-2 gap-3">
											{infoCards.map((item) => (
												<div
													key={item.label}
													className="rounded-[10px] border-[3px] border-[#1f1f1f] bg-white p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]"
												>
													<p className="text-base font-extrabold text-[#1f1f1f] mb-1">
														{item.label}
													</p>
													<p className="text-sm font-medium text-[#6B6B6B]">{item.value}</p>
												</div>
											))}
										</div>
									</section>

									{skills.length > 0 && (
										<section className="mt-6">
											<h2 className="text-lg font-black text-[#1f1f1f] mb-3">Skills:</h2>
											<div className="rounded-[10px] border-[3px] border-[#1f1f1f] bg-white p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
												<div className="flex flex-wrap gap-2">
													{skills.map((skill) => (
														<span
															key={skill}
															className="rounded-full border-[3px] border-[#1f1f1f] bg-[#E0F2FE] px-4 py-1.5 text-xs font-bold text-[#0C4A6E] shadow-[2px_2px_0px_rgba(0,0,0,0.15)] uppercase"
														>
															{skill}
														</span>
													))}
												</div>
											</div>
										</section>
									)}

										{rolesList.length > 0 && (
											<section className="mt-6">
												<h2 className="text-lg font-black text-[#1f1f1f] mb-3">Roles and Responsibility:</h2>
												<div className="rounded-[10px] border-[3px] border-[#1f1f1f] bg-white p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
													<p className="text-sm leading-relaxed text-[#1f1f1f] whitespace-pre-line">
														{rolesList.join('\n\n')}
													</p>
												</div>
											</section>
										)}									{perksList.length > 0 && (
										<section className="mt-6">
											<h2 className="text-lg font-black text-[#1f1f1f] mb-3">Perks:</h2>
											<div className="flex flex-wrap gap-3">
												{perksList.map((perk, index) => (
													<span
														key={`${perk}-${index}`}
														className="rounded-full border-[3px] border-[#1f1f1f] bg-[#DBF4FF] px-5 py-2 text-sm font-bold text-[#0369A1] shadow-[3px_3px_0px_rgba(0,0,0,0.2)]"
													>
														{perk}
													</span>
												))}
											</div>
										</section>
									)}

									<section className="mt-6">
										<h2 className="text-lg font-black text-[#1f1f1f] mb-3">Details :</h2>
										<div className="rounded-[10px] border-[3px] border-[#1f1f1f] bg-white p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
											<p className="whitespace-pre-line text-sm leading-relaxed text-[#1f1f1f]">{jobDetails}</p>
										</div>
									</section>

									<section className="mt-6">
										<h2 className="text-lg font-black text-[#1f1f1f] mb-3">About {companyName} :</h2>
										<div className="rounded-[10px] border-[3px] border-[#1f1f1f] bg-white p-4 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
											<p className="whitespace-pre-line text-sm leading-relaxed text-[#1f1f1f]">{companyDetails}</p>
										</div>
									</section>
									</div>
								</div>
							</div>
						</motion.div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default HomeJobMobile;
