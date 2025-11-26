import React from "react";

function FormInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  className = "",
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={name} className="text-sm font-[Jost-Bold] text-black">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-4 py-3 rounded-lg border-2 ${
          error ? "border-red-500" : "border-black"
        } bg-white font-[jost-regular] text-black placeholder-gray-400 
        focus:outline-none focus:ring-2 focus:ring-[#D9F99D] focus:border-[#D9F99D]
        transition-all duration-200`}
      />
      {error && (
        <span className="text-sm text-red-500 font-[jost-regular]">
          {error}
        </span>
      )}
    </div>
  );
}

export default FormInput;
