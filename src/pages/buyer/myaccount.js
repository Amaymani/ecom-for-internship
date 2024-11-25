import React from 'react'
import { useSession, signOut, getSession } from "next-auth/react";
import Navbar from '@/components/Navbar';

const myaccount = () => {
    const handleLogout = () => {
        signOut({ callbackUrl: "/" });
      };
  return (
    <div>
        <Navbar/>
        <button className='p-3 rounded bg-sky-500 text-white' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default myaccount