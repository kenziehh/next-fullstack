import { signIn } from "next-auth/react";
import Image from "next/image";
import AuthNav from "./components/AuthNav";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session?.user);
  return (
    
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AuthNav />
      {JSON.stringify(session?.user)}
    </main>
  );
}
