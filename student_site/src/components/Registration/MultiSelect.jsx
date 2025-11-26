import React, { useState, useRef, useEffect } from "react";

function MultiSelect({
  label,
  options,
  selected,
  onChange,
  maxItems = null,
  placeholder = "Select...",
  required = false,
  error,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (option) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      if (maxItems && selected.length >= maxItems) {
        return; // Don't add if max reached
      }
      onChange([...selected, option]);
    }
  };

  const handleRemove = (option) => {
    onChange(selected.filter((item) => item !== option));
  };

  return (
    <div className="flex flex-col gap-2" ref={dropdownRef}>
      <label className="text-sm font-[Jost-Bold] text-black">
        {label} {required && <span className="text-red-500">*</span>}
        {maxItems && (
          <span className="text-xs text-gray-500 ml-2">
            ({selected.length}/{maxItems})
          </span>
        )}
      </label>

      {/* Selected Tags */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selected.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#D9F99D] border-2 border-black rounded-full text-sm font-[Jost-Bold]"
            >
              {item}
              <button
                type="button"
                onClick={() => handleRemove(item)}
                className="hover:scale-110 transition-transform"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-4 py-3 rounded-lg border-2 ${
            error ? "border-red-500" : "border-black"
          } bg-white font-[jost-regular] text-left
          focus:outline-none focus:ring-2 focus:ring-[#D9F99D] focus:border-[#D9F99D]
          transition-all duration-200 flex items-center justify-between`}
        >
          <span className={selected.length === 0 ? "text-gray-400" : ""}>
            {selected.length === 0
              ? placeholder
              : `${selected.length} selected`}
          </span>
          <svg
            className={`w-5 h-5 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white border-2 border-black rounded-lg shadow-lg max-h-60 overflow-hidden">
            {/* Search */}
            <div className="p-2 border-b-2 border-black">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#D9F99D]"
              />
            </div>

            {/* Options */}
            <div className="max-h-48 overflow-y-auto custom-scroll">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-gray-500 text-sm">
                  No options found
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleToggle(option)}
                    className={`w-full px-4 py-3 text-left font-[jost-regular] transition-colors ${
                      selected.includes(option)
                        ? "bg-[#D9F99D] hover:bg-[#c5e885]"
                        : "hover:bg-[#E3FEAA]"
                    }`}
                  >
                    {option}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <span className="text-sm text-red-500 font-[jost-regular]">
          {error}
        </span>
      )}
    </div>
  );
}

export default MultiSelect;
