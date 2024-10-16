"use client";

import Link from "next/link";
import { useSession,signIn } from "next-auth/react";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session, status }: { data: Session | null, status: string } = useSession();

  // Check if the session is loading
  if (status === "loading") {
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