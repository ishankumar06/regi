import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./RegistrationForm.css";  // Your CSS for styling the form as per design

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const response = axios.post("https://registrationbackend-ab68.onrender.com", formData);
      alert("Registration successful!");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="registration-container">
      {/* Left side image and text */}
      <div className="left-panel">
        <img src="/images/beach.jpg" alt="Beach" className="panel-image" />
        <h1>Hello everyone</h1>
        <p>Start unknown finish unforgettable</p>
      </div>

      {/* Right side registration form */}
      <div className="right-panel">
        <h2>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("username", { required: "Name is required" })}
            placeholder="Name"
          />
          {errors.name && <p className="error">{errors.name.message}</p>}

          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address"
              }
            })}
            placeholder="Email ID"
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          <input
            {...register("phone", {
              required: "Phone number is required",
              minLength: { value: 10, message: "Enter valid phone number" }
            })}
            placeholder="Phone No"
          />
          {errors.phone && <p className="error">{errors.phone.message}</p>}

          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum length is 6" }
            })}
            placeholder="Password"
          />
          {errors.password && <p className="error">{errors.password.message}</p>}

          <label className="terms">
            <input
              type="checkbox"
              {...register("terms", { required: "You must accept terms" })}
            />
            I accept terms and conditions & privacy policy
          </label>
          {errors.terms && <p className="error">{errors.terms.message}</p>}

          <button type="submit" className="login-btn">Register</button>
        </form>

        {/* Include social login buttons as per your design if needed */}
      </div>
    </div>
  );
}
