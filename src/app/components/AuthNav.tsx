"use client";
import { signIn, useSession } from "next-auth/react";
import React from "react";

const AuthNav = () => {
  const session = useSession();
  return (
    <nav className="">
      <button onClick={() => signIn()}>Login</button>
      <div>
        <p>{JSON.stringify(session)}</p>
      </div>
    </nav>
  );
};

export default AuthNav;
