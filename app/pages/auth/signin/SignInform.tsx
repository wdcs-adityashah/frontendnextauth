// app/auth/signin/SignInForm.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import './signin-form.css'; // Import the CSS file for styles
interface SignInFormProps {
    children: React.ReactNode; // Accept children as props
  }
  
  const SignInForm: React.FC<SignInFormProps> = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      // Redirect to the dashboard or any other page on success
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="form-input"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">Sign In with credentials</button>
        {children}
      </form>
    </div>
  );
};

export default SignInForm;