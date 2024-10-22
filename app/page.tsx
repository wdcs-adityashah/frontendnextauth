"use client";

import { useSession,signIn } from "next-auth/react";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session, status: sessionStatus }: { data: Session | null, status: string } = useSession();
  if(session === null){
    redirect("/api/auth/signin?callbackUrl=https%3A%2F%2F1433-27-109-9-122.ngrok-free.app%2Flogin")
  }
  if (sessionStatus === "authenticated") {
    console.log(sessionStatus)
    redirect("/dashboard");
  }
  // Check if the session is loading
  if (sessionStatus === "loading") {
    return <div>Loading...</div>; // Optionally show a loading state
  }
  if(session){
    redirect("/dashboard")
  }
  return !session && (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
           <button onClick={() => signIn()}>        
            Please Login To See The Content
           </button>

     
    </div>
  )
}