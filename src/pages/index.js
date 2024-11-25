import Navbar from "@/components/Navbar";
import Link from "next/link";


export default function Home() {

  return (
    <>
      <Navbar />
      <Link href="/buyer/login" className="p-3 bg-sky-500 rounded m-3 text-white font-medium">Continue as Buyer</Link>
      <Link href="/admin/login" className="p-3 bg-sky-500 rounded m-3 text-white font-medium">Continue as seller</Link>
    </>
  );
}