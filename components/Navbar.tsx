"use client";

import Link from "next/link";
import { signOut, useSession,signIn } from "next-auth/react";
const Navbar = () => {
  const { data: session } = useSession();
  const handleLogout = () => {
    signOut({
      callbackUrl: '/api/auth/signin?callbackUrl=https%3A%2F%2F1433-27-109-9-122.ngrok-free.app%2Flogin', // Redirects to the login page after signing out
    });
  };
  return (
    <nav className="bg-black fixed  p-4">
      <div className="container mx-auto">
        <ul className="flex justify-between h-screen flex-col">
          <div className="one">
   
      
              <li className="mx-4 mt-5">
              <Link href="/" className="text-white font-bold">
                Home
              </Link>
            </li>
        
            {session && <li>
          
          <Link href="/dashboard" className="text-white font-bold">
                Dashboard
              </Link>
          </li>}  
             
          
          
          </div>

          <div className="auth">
            {!session ? (
              <>
                <li className="mx-4 mb-5">
                <button onClick={() => signIn()} className="text-white font-bold">Log in</button>
                </li>
                <li className="mx-4 mb-[2rem]">
                  <Link href="/register" className="text-white font-bold">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <p className="mb-4">{session.user?.email}</p>

                <li>
                  <button
                    onClick={handleLogout}
                    className="p-2 px-5 mb-[2rem] bg-red-600 rounded"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;