import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
    const { data: session, status } = useSession();
    const loading = status === "loading";
    const router = useRouter();
    
    if (loading) {
      return <div>Loading...</div>;
    }

    if (!session || !session.user) {
      router.push("/buyer/login");
    }
  
    return (
      <>
        <Navbar />
        
      </>
    );
  }