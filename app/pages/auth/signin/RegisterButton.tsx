// app/auth/signin/RegisterButton.tsx
"use client"; // This line makes it a Client Component

import { useRouter } from "next/navigation";

const RegisterButton = () => {
    const router = useRouter();
    const handleRegister = () => {
        router.push('/register')
    }
  return (
    <button onClick={handleRegister} className="register-button">
      Register
    </button>
  );
};

export default RegisterButton;