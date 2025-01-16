"use client";

import { getSession, SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

const AuthProvider = ({ children, session }) => {
  const [currentSession, setCurrentSession] = useState(session);

  useEffect(() => {
    let intervalId;
    // updating the session every 2 seconds
    const checkSession = async () => {
      if (!currentSession?.user?._id) {
        const updatedSession = await getSession();
        if (updatedSession?.user?._id) {
          setCurrentSession(updatedSession);
          clearInterval(intervalId); // stoping the interval once the session is updated
        }
      }
    };

    intervalId = setInterval(() => {
      checkSession();
    }, 2000);

    return () => clearInterval(intervalId);
    // if (!currentSession?.user?._id) checkSession();
  }, [currentSession, session]);
  return (
    <SessionProvider session={currentSession?.user?._id && currentSession}>
      {children}
    </SessionProvider>
  );
};

export default AuthProvider;
