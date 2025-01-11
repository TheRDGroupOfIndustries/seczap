"use client";
// getSession,
import { SessionProvider } from "next-auth/react";
// import { useEffect, useState } from "react";

const AuthProvider = ({ children, session }) => {
  // const [currentSession, setCurrentSession] = useState(session);

  // useEffect(() => {
  //   let intervalId;

  //   const checkSession = async () => {
  //     if (!currentSession?.user?._id) {
  //       const updatedSession = await getSession();
  //       if (updatedSession?.user?._id) {
  //         setCurrentSession(updatedSession);
  //         clearInterval(intervalId); // stoping the interval once the session is updated
  //       }
  //     }
  //   };

  //   intervalId = setInterval(() => {
  //     checkSession();
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  //   // if (!currentSession?.user?._id) checkSession();
  // }, [currentSession, session]);
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
