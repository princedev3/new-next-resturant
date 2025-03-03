"use client";
import { useSessionStore } from "@/sessions/auth-session";
import { useEffect } from "react";
import { Session } from "next-auth";

const SessionProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  const setSession = useSessionStore((state) => state.setSession);

  useEffect(() => {
    setSession(session);
  }, [session, setSession]);

  return <>{children}</>;
};

export default SessionProvider;
