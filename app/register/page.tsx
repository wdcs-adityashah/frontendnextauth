'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FormEvent } from 'react';

import {toast} from 'react-toastify'


const Register = () =>{
    const router = useRouter();
    const {data:session,status:sessionStatus} = useSession();
     console.log(session);
    useEffect(()=>{
      if(sessionStatus === 'authenticated'){
        router.push('/dashboard')
      }
    },[sessionStatus,router]);  

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        const form = e.target as HTMLFormElement;
        const username = (form[0] as HTMLInputElement).value;
        const email = (form[1] as HTMLInputElement).value;
        const password = (form[2] as HTMLInputElement).value;
        const confirmPassword = (form[3] as HTMLInputElement).value;
    
        if (!username || !email || !password || !confirmPassword) {
            toast.error("Please fill all the input fields");
            return;
        } else if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
    
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    confirmpassword: confirmPassword,  // Include confirmPassword
                }),
            });
    
            if (res.status === 400) {
                const data = await res.json(); // Parse response body to get the error
                toast.error(data.error);       // Display the error message
            } else if (res.status === 201) {
                router.push("/login");
            }
        } catch (error: any) {
            toast.error("Something went wrong. Please try again.");
        }
    };
    
    if (sessionStatus === "loading") {
        return <h1>Loading ...</h1>;
      }

    return (
        sessionStatus !== 'authenticated' && (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-4">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
           <label htmlFor="username" className="block text-gray-500 text-sm font-bold mb-2">
            Username
           </label>
           <input
           type="text"
           id="username"
           name="username"
           className="w-full p-2 border border-gray-300 rounded"
           />
            </div>
            <div className="mb-4">
           <label htmlFor="email" className="block text-gray-500 text-sm font-bold mb-2">
            Email
           </label>
           <input
           type="email"
           id="email"
           name="email"
           className="w-full p-2 border border-gray-300 rounded"
           />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password-confirm"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="password-confirm"
                name="password-confirm"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <button
                type="submit"
                className="mb-5 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                Register
              </button>
            </div>
            <span>
              {" "}
              Already have an account?{" "}
              <Link
                className="text-center text-blue-500 hover:underline mt-2"
                href="/api/auth/signin?callbackUrl=https%3A%2F%2F1433-27-109-9-122.ngrok-free.app%2Flogin"
              >
                Login In
              </Link>
            </span>
          </form>
          </div>
          </div>
        )
    )
};

export default Register;