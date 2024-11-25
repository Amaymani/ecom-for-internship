import React from 'react';
import Link from 'next/link';
import {useState, useEffect} from 'react';
import { useSession, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  const loading = status === "loading";
  const Router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session || !session.user) {
    Router.push("/");
  }
  console.log(status)
  
  return (
    <div className='flex justify-between items-center py-3 z-10 bg-sky-600'>
      <div className='text-3xl text-white ml-3 font-extrabold'>E.<span className='text-sky-300'>com</span></div>
      <div className='flex justify-center items-center'>
        <Link href="/"><div className='p-3 text-white rounded hover:bg-sky-700 transition-colors duration-150 font-semibold text-lg'>Home</div></Link>
        <Link href="/categories"><div className='p-3 text-white rounded hover:bg-sky-700 transition-colors duration-150 font-semibold text-lg'>Categories</div></Link>
        <Link href="/books"><div className='p-3 text-white rounded hover:bg-sky-700 transition-colors duration-150 font-semibold text-lg'>Books</div></Link>
        <Link href="/contact"><div className='p-3 text-white rounded hover:bg-sky-700 transition-colors duration-150 font-semibold text-lg'>Contact</div></Link>
      </div>
      {status=="authenticated"?
      <div className='flex justify-center items-center pr-10 text-white text-xl font-semibold'>
        <Link className=' border-2 p-2 ml-3 rounded-lg hover:border-sky-800 transition-colors duration-200 hover:bg-sky-800' href="/buyer/myaccount">{session.user.name }</Link>
      </div>:""}
    </div>
  )
}

export default Navbar