import React from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import Education from '../components/profile/Education';
import Skills from '../components/profile/Skills';
import JobPreference from '../components/profile/JobPreference';
import Experience from '../components/profile/Experience';
import Projects from '../components/profile/Projects';

function Profile() {
    return (
        <div className='w-full h-full flex gap-10 items-center justify-center pt-16'>
            <div className='w-[95%] md:w-[90%] h-[95%] md:h-[89%] bg-[#efebe0] rounded-[10px] border-2 sm:border-4 border-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.5)] overflow-auto custom-scroll p-4 md:p-6'>
                <div className="space-y-4 md:space-y-6">
                    {/* Header Section */}
                    <ProfileHeader />

                    {/* Mobile: Stack all sections vertically */}
                    {/* Desktop: Two Column Layout */}
                    <div className="flex flex-col md:grid md:grid-cols-1 lg:grid-cols-[250px_1fr] gap-4 md:gap-6">
                        {/* Education */}
                        <div className="md:hidden">
                            <Education />
                        </div>

                        {/* Skills */}
                        <div className="md:hidden">
                            <Skills />
                        </div>

                        {/* Job Preference */}
                        <div className="md:hidden">
                            <JobPreference />
                        </div>

                        {/* Experience */}
                        <div className="md:hidden">
                            <Experience />
                        </div>

                        {/* Projects */}
                        <div className="md:hidden">
                            <Projects />
                        </div>

                        {/* Desktop Layout */}
                        <div className="hidden md:block space-y-6">
                            <Education />
                            <JobPreference />
                        </div>

                        <div className="hidden md:block space-y-6">
                            <Skills />
                            <Experience />
                        </div>
                    </div>

                    {/* Projects Section - Full Width on Desktop */}
                    <div className="hidden md:block">
                        <Projects />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
