import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegistrationForm.css";

export default function RegistrationForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData) => {
    console.log("Form data being sent:", formData);
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData);
      alert(response.data.message || "Registration successful!");
      reset();
      navigate(`/success/${formData.username}`);
    } catch (error) {
      alert(error.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="left-panel">
        <img src="/images/beach.jpg" alt="Beach" className="panel-image" />
        <h1>Hello everyone</h1>
        <p>Start unknown finish unforgettable</p>
      </div>

      <div className="right-panel">
        <h2>Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("username", { required: "Username is required" })}
            placeholder="Username"
            disabled={loading}
          />
          {errors.username && <p className="error">{errors.username.message}</p>}

          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address"
              }
            })}
            placeholder="Email ID"
            disabled={loading}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum length is 6" }
            })}
            placeholder="Password"
            disabled={loading}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}

          <input
            {...register("branch", { required: "Branch is required" })}
            placeholder="Branch"
            disabled={loading}
          />
          {errors.branch && <p className="error">{errors.branch.message}</p>}

          <input
            type="number"
            {...register("year", { 
              required: "Year is required", 
              min: { value: 1, message: "Year must be at least 1" }
            })}
            placeholder="Year"
            disabled={loading}
          />
          {errors.year && <p className="error">{errors.year.message}</p>}

          <input
            {...register("fatherName")}
            placeholder="Father's Name"
            disabled={loading}
          />

          <input
            {...register("motherName")}
            placeholder="Mother's Name"
            disabled={loading}
          />

          <input
            {...register("hobby")}
            placeholder="Hobby"
            disabled={loading}
          />

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}


//https://regi-1-5z5r.onrender.com