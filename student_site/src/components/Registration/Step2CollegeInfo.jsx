import React, { useState, useRef, useEffect } from "react";
import FormInput from "./FormInput";
import AnimatedDoodle from "./AnimatedDoodle";

// Sample college data - in production, this would come from an API
const COLLEGES = [
  "Indian Institute of Technology (IIT) Bombay",
  "Indian Institute of Technology (IIT) Delhi",
  "Indian Institute of Technology (IIT) Madras",
  "Indian Institute of Technology (IIT) Kanpur",
  "Indian Institute of Technology (IIT) Kharagpur",
  "National Institute of Technology (NIT) Trichy",
  "National Institute of Technology (NIT) Warangal",
  "Birla Institute of Technology and Science (BITS) Pilani",
  "Delhi Technological University (DTU)",
  "Netaji Subhas University of Technology (NSUT)",
  "Vellore Institute of Technology (VIT)",
  "Manipal Institute of Technology",
  "SRM Institute of Science and Technology",
  "Amity University",
  "Lovely Professional University",
  "Other",
];

const COLLEGE_TYPES = [
  "Engineering",
  "Arts & Science",
  "Commerce",
  "Medical",
  "Law",
  "Management",
  "Other",
];

const DEGREES = [
  "B.Tech",
  "B.E.",
  "B.Sc",
  "B.A.",
  "B.Com",
  "BBA",
  "BCA",
  "MBBS",
  "B.Arch",
  "Other",
];

function Step2CollegeInfo({ formData, setFormData, errors, setErrors }) {
  const [collegeSearch, setCollegeSearch] = useState(formData.college || "");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredColleges = COLLEGES.filter((college) =>
    college.toLowerCase().includes(collegeSearch.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleCollegeSearch = (e) => {
    const value = e.target.value;
    setCollegeSearch(value);
    setFormData({ ...formData, college: value });
    setShowSuggestions(true);

    if (errors.college) {
      setErrors({ ...errors, college: "" });
    }
  };

  const handleCollegeSelect = (college) => {
    setCollegeSearch(college);
    setFormData({ ...formData, college });
    setShowSuggestions(false);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.college || formData.college.trim().length === 0) {
      newErrors.college = "Please select your college";
    }

    if (!formData.collegeType) {
      newErrors.collegeType = "Please select college type";
    }

    if (!formData.degree) {
      newErrors.degree = "Please select your degree";
    }

    if (!formData.passingYear) {
      newErrors.passingYear = "Please enter your passing year";
    } else if (!/^\d{4}$/.test(formData.passingYear)) {
      newErrors.passingYear = "Please enter a valid 4-digit year";
    } else {
      const year = parseInt(formData.passingYear);
      const currentYear = new Date().getFullYear();
      if (year < currentYear || year > currentYear + 10) {
        newErrors.passingYear = `Year must be between ${currentYear} and ${
          currentYear + 10
        }`;
      }
    }

    // College email is now optional
    if (formData.collegeEmail) {
      if (!validateEmail(formData.collegeEmail)) {
        newErrors.collegeEmail = "Please enter a valid email address";
      } else if (formData.collegeEmail === formData.email) {
        newErrors.collegeEmail =
          "College email must be different from personal email";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Form Section */}
        <div className="flex-1 w-full">
          <h2 className="text-3xl md:text-4xl font-[inter-extra] text-black mb-2">
            where you're studying 📚
          </h2>
          <p className="text-base md:text-lg font-[jost-regular] text-gray-600 mb-8">
            tell us about your college life
          </p>

          <div className="space-y-6">
            {/* College Search */}
            <div className="flex flex-col gap-2" ref={searchRef}>
              <label className="text-sm font-[Jost-Bold] text-black">
                College Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={collegeSearch}
                  onChange={handleCollegeSearch}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="search for your college"
                  className={`w-full px-4 py-3 rounded-lg border-2 ${
                    errors.college ? "border-red-500" : "border-black"
                  } bg-white font-[jost-regular] text-black placeholder-gray-400 
                  focus:outline-none focus:ring-2 focus:ring-[#D9F99D] focus:border-[#D9F99D]
                  transition-all duration-200`}
                />

                {showSuggestions && filteredColleges.length > 0 && (
                  <div className="absolute z-50 w-full mt-2 bg-white border-2 border-black rounded-lg shadow-lg max-h-60 overflow-y-auto custom-scroll">
                    {filteredColleges.map((college) => (
                      <button
                        key={college}
                        type="button"
                        onClick={() => handleCollegeSelect(college)}
                        className="w-full px-4 py-3 text-left hover:bg-[#E3FEAA] transition-colors font-[jost-regular]"
                      >
                        {college}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {errors.college && (
                <span className="text-sm text-red-500 font-[jost-regular]">
                  {errors.college}
                </span>
              )}
            </div>

            {/* College Type */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-[Jost-Bold] text-black">
                College Type <span className="text-red-500">*</span>
              </label>
              <select
                name="collegeType"
                value={formData.collegeType || ""}
                onChange={handleChange}
                className={`px-4 py-3 rounded-lg border-2 ${
                  errors.collegeType ? "border-red-500" : "border-black"
                } bg-white font-[jost-regular] text-black
                focus:outline-none focus:ring-2 focus:ring-[#D9F99D] focus:border-[#D9F99D]
                transition-all duration-200`}
              >
                <option value="">select type</option>
                {COLLEGE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.collegeType && (
                <span className="text-sm text-red-500 font-[jost-regular]">
                  {errors.collegeType}
                </span>
              )}
            </div>

            {/* Degree and Passing Year - Side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-[Jost-Bold] text-black">
                  Degree <span className="text-red-500">*</span>
                </label>
                <select
                  name="degree"
                  value={formData.degree || ""}
                  onChange={handleChange}
                  className={`px-4 py-3 rounded-lg border-2 ${
                    errors.degree ? "border-red-500" : "border-black"
                  } bg-white font-[jost-regular] text-black
                  focus:outline-none focus:ring-2 focus:ring-[#D9F99D] focus:border-[#D9F99D]
                  transition-all duration-200`}
                >
                  <option value="">select degree</option>
                  {DEGREES.map((degree) => (
                    <option key={degree} value={degree}>
                      {degree}
                    </option>
                  ))}
                </select>
                {errors.degree && (
                  <span className="text-sm text-red-500 font-[jost-regular]">
                    {errors.degree}
                  </span>
                )}
              </div>

              <FormInput
                label="Passing Year"
                name="passingYear"
                type="text"
                value={formData.passingYear || ""}
                onChange={handleChange}
                error={errors.passingYear}
                placeholder="e.g., 2025"
                required
              />
            </div>

            {/* College Email - Optional */}
            <FormInput
              label="College Email (optional)"
              name="collegeEmail"
              type="email"
              value={formData.collegeEmail || ""}
              onChange={handleChange}
              error={errors.collegeEmail}
              placeholder="your .edu email (if you have one)"
              required={false}
            />
          </div>
        </div>

        {/* Doodle Section */}
        <div className="hidden md:block w-64 h-64">
          <AnimatedDoodle
            src="/images/doodles/ReadingDoodle.png"
            alt="Reading character"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Step2CollegeInfo;
