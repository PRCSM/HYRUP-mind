import React, { useCallback, useMemo, useState } from "react";
import Home_cards from "../components/home/Home_cards";
import HomeCardMobile from "../components/home/Home_card_mobile";
import HomeJobMobile from "../components/home/HomeJob_mobile";
import jobDataList from "../demodata/demodata.json";

const COLOR_PALETTE = [
  { primary: "#3B1FFF", secondary: "#25138E", detail: "#FF8A65" },
  { primary: "#FF4C7E", secondary: "#9C1A58", detail: "#FFE066" },
  { primary: "#2F80ED", secondary: "#0C3A7A", detail: "#F2C94C" },
  { primary: "#16A34A", secondary: "#065F46", detail: "#FACC15" },
  { primary: "#EA580C", secondary: "#7C2D12", detail: "#FDBA74" },
  { primary: "#0EA5E9", secondary: "#0369A1", detail: "#FCD34D" },
];

const toTitleCase = (value) => {
  if (!value || typeof value !== "string") return null;
  return value
    .split(/[\s_/|-]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const extractCompanyNameFromAbout = (about) => {
  if (!about || typeof about !== "string") return null;
  const firstSentence = about.split(".")[0];
  return firstSentence ? firstSentence.trim() : null;
};

const formatCurrencyRange = (range) => {
  if (!range || (range.min == null && range.max == null)) return null;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
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

const buildSearchUrl = (title, company) => {
  const query = [title, company].filter(Boolean).join(" ");
  return `https://www.google.com/search?q=${encodeURIComponent(
    query || "job opportunity"
  )}`;
};

const buildHighlights = (job, meta) => {
  const highlights = [];
  if (meta.experienceLabel) highlights.push(meta.experienceLabel);
  if (meta.modeLabel && meta.employmentTypeLabel) {
    highlights.push(`${meta.modeLabel} · ${meta.employmentTypeLabel}`);
  } else {
    if (meta.modeLabel) highlights.push(`${meta.modeLabel} role`);
    if (meta.employmentTypeLabel) highlights.push(meta.employmentTypeLabel);
  }
  if (meta.locationLabel) highlights.push(`Location - ${meta.locationLabel}`);
  if (Array.isArray(job.preferences?.skills) && job.preferences.skills.length) {
    highlights.push(`Skills: ${job.preferences.skills.slice(0, 3).join(", ")}`);
  }
  if (meta.salaryText) highlights.push(`Compensation: ${meta.salaryText}`);
  if (!highlights.length && job.description) {
    highlights.push(...job.description.split(". ").slice(0, 2));
  }
  return highlights.filter(Boolean).slice(0, 4);
};

const decorateJob = (job, index) => {
  const colors = COLOR_PALETTE[index % COLOR_PALETTE.length];
  const employmentTypeLabel = toTitleCase(job.employmentType ?? job.jobNature);
  const modeLabel = toTitleCase(job.mode ?? job.workMode);
  const locationLabel = job.location ?? job.preferences?.location ?? null;
  const companyName =
    job.companyName ??
    job.company ??
    extractCompanyNameFromAbout(job.aboutCompany) ??
    "Hiring Company";
  const experienceLabel =
    job.experience ??
    (typeof job.preferences?.minExperience === "number"
      ? `${job.preferences.minExperience}+ yrs experience`
      : job.jobType === "on-campus"
      ? "Campus opportunity"
      : null);

  const salaryText = formatCurrencyRange(job.salaryRange);
  const highlights =
    (Array.isArray(job.cardHighlights) && job.cardHighlights.length
      ? job.cardHighlights
      : buildHighlights(job, {
          experienceLabel,
          modeLabel,
          employmentTypeLabel,
          locationLabel,
          salaryText,
        })) ?? [];

  const cardTagline =
    job.cardTagline ??
    (job.jobType === "on-campus" ? "Campus Hiring" : "We are hiring!");
  const cardRoleHighlight =
    job.cardRoleHighlight ??
    (job.title ? job.title.toUpperCase() : "Open role");
  const cardWebsite =
    job.cardWebsite ??
    job.website ??
    job.applicationLink ??
    buildSearchUrl(job.title, companyName);
  const cardLocation = job.cardLocation ?? locationLabel ?? "Remote friendly";
  const experienceDisplay =
    job.experienceLabel ?? experienceLabel ?? "Experience flexible";

  return {
    ...job,
    id:
      job.id ??
      `${(job.title || "job")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")}-${index}`,
    accentPrimary: job.accentPrimary ?? colors.primary,
    accentSecondary: job.accentSecondary ?? colors.secondary,
    accentDetail: job.accentDetail ?? colors.detail,
    companyName,
    employmentTypeLabel,
    modeLabel,
    experienceLabel: experienceDisplay,
    cardTagline,
    cardRoleHighlight,
    cardHighlights: Array.from(new Set(highlights)).slice(0, 4),
    cardWebsite,
    cardLocation,
    salaryText,
    companyVerified: job.companyVerified ?? true,
    isSaved: job.isSaved ?? false,
  };
};

const flattenJobs = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  const aggregated = [];
  if (Array.isArray(data.companyJobs)) aggregated.push(...data.companyJobs);
  if (Array.isArray(data.onCampusJobs)) aggregated.push(...data.onCampusJobs);
  return aggregated;
};

function Home() {
  const [selectedJob, setSelectedJob] = useState(null);

  const jobs = useMemo(() => {
    const rawJobs = flattenJobs(jobDataList);
    return rawJobs.map((job, index) => decorateJob(job, index));
  }, []);

  const handleCardSelect = useCallback((job) => {
    setSelectedJob(job);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedJob(null);
  }, []);

  return (
    <div className="relative w-full flex flex-col justify-center items-center h-screen overflow-hidden">
      <div className="hidden w-full h-full md:flex md:flex-col md:items-center">
        <h1 className="text-3xl pl-7 font-[jost-bold] mt-24 mb-3 text-[#1f1f1f] text-left tracking-tight self-start ">
          SWIPE AND PICK YOUR JOB
        </h1>
        <div className="w-full h-full">
          <Home_cards />
        </div>
      </div>
      <div className="block md:hidden p-3 pb-24">
        <h1 className="text-2xl font-[jost-bold] mt-3 mb-3 text-[#1f1f1f] text-left tracking-tight self-start ">
          SWIPE AND PICK YOUR JOB
        </h1>
        <HomeCardMobile
          jobs={jobs.length ? jobs : undefined}
          onCardSelect={handleCardSelect}
        />
      </div>
      <HomeJobMobile
        job={selectedJob}
        isOpen={Boolean(selectedJob)}
        onClose={handleCloseDetail}
      />
    </div>
  );
}

export default Home;
