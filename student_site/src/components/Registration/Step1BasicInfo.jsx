import React from "react";
import FormInput from "./FormInput";
import AnimatedDoodle from "./AnimatedDoodle";

function Step1BasicInfo({ formData, setFormData, errors, setErrors }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^\d{10}$/;
    return re.test(phone.replace(/\D/g, ""));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Expose validate function
  React.useImperativeHandle(
    React.useRef(),
    () => ({
      validate,
    }),
    [formData]
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Form Section */}
        <div className="flex-1 w-full">
          <h2 className="text-3xl md:text-4xl font-[inter-extra] text-black mb-2">
            let's get you set up ✨
          </h2>
          <p className="text-base md:text-lg font-[jost-regular] text-gray-600 mb-8">
            just the basics to get started
          </p>

          <div className="space-y-6">
            <FormInput
              label="Full Name"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              error={errors.name}
              placeholder="what should we call you?"
              required
            />

            <FormInput
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone || ""}
              onChange={handleChange}
              error={errors.phone}
              placeholder="your digits"
              required
            />

            <FormInput
              label="Email Address"
              name="email"
              type="email"
              value={formData.email || ""}
              onChange={handleChange}
              error={errors.email}
              placeholder="where we'll reach you"
              required
            />
          </div>
        </div>

        {/* Doodle Section */}
        <div className="hidden md:block w-64 h-64">
          <AnimatedDoodle
            src="/images/doodles/GroovyDoodle.png"
            alt="Groovy character"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Step1BasicInfo;
