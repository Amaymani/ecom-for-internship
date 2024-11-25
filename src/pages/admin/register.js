import Navbar from '@/components/Navbar'
import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    accountType:"admin",
  });

  const router=useRouter();

  const handleChange=(e)=>{
    setFormData({
        ...formData,
        [e.target.name] : e.target.value,
    })
  }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
            const res =await axios.post('/api/register', formData);
            if(res.status===201){
                router.push('/admin/login');
            }
        }
        catch(error){
            console.error("Registration error:", error.response?.data?.error || error.message)
        }
    };

  return (
    <div className=''>

    <div className='flex justify-center items-center h-[45rem]'>
        <div className='w-full'>
    
            <div className="bg-grey-lighter  min-h-screen flex flex-col justify-center">
            <div className="container  max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <form onSubmit={handleSubmit} method='POST' className="bg-gray-200 px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-sky-500 font-bold text-center">Sign up</h1>
                    <input 
                        type="text"
                        className="block border bg-lightbg border-grey-light w-full p-3 rounded mb-4"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required />


                    <input 
                        type="email"
                        className="block border bg-lightbg border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email"
                        value={formData.email} 
                        onChange={handleChange}
                        required/>

                    <input 
                        type="password"
                        className="block border bg-lightbg border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required />
                    <input 
                        type="password"
                        className="block border bg-lightbg border-grey-light w-full p-3 rounded mb-4"
                        name="confirm_password"
                        placeholder="Confirm Password" />

                    <button
                        type="submit"
                        className="w-full text-center py-3 text-white bg-sky-500 font-medium  hover:font-bold transition-all ease-in-out duration-100  hover:bg-sky-600 rounded focus:outline-none my-1"
                    >Create Account</button>

                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the {" "}
                        <a className="no-underline border-b border-grey-dark text-sky-500" href="#">
                            Terms of Service 
                        </a> and {" "}
                        <a className="no-underline border-b border-grey-dark text-sky-500" href="#">
                            Privacy Policy
                        </a>
                    </div>
                </form>

                <div className=" mt-6">
                    Already have an account? {" "}
                    <Link className="no-underline border-b border-blue text-sky-500" href="../login/">
                        Log in
                    </Link>.
                </div>
            </div>
            </div>
        </div>

    </div>

    </div>
  )
}

export default Register;