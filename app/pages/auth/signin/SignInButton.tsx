// app/auth/signin/SignInButton.tsx
"use client"; // This line makes it a Client Component

import { signIn } from "next-auth/react";

interface SignInButtonProps {
  providerId: string;
  providerName: string;
  logoUrl: string; // New prop for logo URL
}

const SignInButton: React.FC<SignInButtonProps> = ({ providerId, providerName, logoUrl }) => {
  return (
    <button onClick={() => signIn(providerId)} className="provider-button">
      <img src={logoUrl} alt={`${providerName} logo`} className="provider-logo" />
      Sign in with {providerName}
    </button>
  );
};

export default SignInButton;