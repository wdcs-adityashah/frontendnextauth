// src/utils/SessionProvider.tsx
'use client'
import { SessionProvider as NextAuthProvider, SessionProviderProps } from "next-auth/react";
import { ReactNode } from "react";
import { Session } from "next-auth"; // Ensure you import Session type from next-auth

interface CustomSessionProviderProps extends SessionProviderProps {
  children: ReactNode;
  session: Session | null; // Specify the type for session
}

const SessionProvider = ({ children, session }: CustomSessionProviderProps) => {
  return (
    <NextAuthProvider session={session}>
      {children}
    </NextAuthProvider>
  );
};

export default SessionProvider;
