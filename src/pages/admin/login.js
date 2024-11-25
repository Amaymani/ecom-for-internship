import Navbar from '@/components/Navbar'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';




const Login = (props) => {
  const [formData, setFormData] = useState({
    email:"",
    password:"",
  });
  const [error, setError] = useState(null);
  const router = useRouter();
  const {data : sessionData,status}=useSession();
  const [InvalidCredentials, setInvalidCredentials] = useState(false);


  useEffect(() => {
    if (status === 'authenticated') router.push('/admin');
  }, [status]);

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]:e.target.value
    })

  }
  
    
  const handleSubmit= async (e)=>{
    e.preventDefault();
    setError(null);
    
        
    try {
        const res = await axios.post('/api/login', formData);
        
        if (res.status === 200) {
            setInvalidCredentials(false);
            await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false
              });
          router.push('/admin');
        }
        
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
        if (error.response.status === 401){
          setInvalidCredentials(true);
        }
      }

  }
  return (

    <div className=''>

    <div className='flex justify-center items-center h-[45rem]'>
        <div className='w-full'>
    
            <div className="bg-grey-lighter  min-h-screen flex flex-col justify-center">
            <div className="container  max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <form onSubmit={handleSubmit} method='POST' className="bg-gray-200 px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-sky-500 font-bold text-center">Log In</h1>

                    <input 
                        type="text"
                        className="block border bg-lightbg border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange} />

                    <input 
                        type="password"
                        className="block border bg-lightbg border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange} />

                      {InvalidCredentials?(<div className='text-sm pl-1 font-semibold text-red-400'>* Invalid credentials</div>):("")}

                    <button
                        type="submit"
                        className="w-full text-center py-3 text-white bg-sky-500 font-medium  hover:font-bold transition-all ease-in-out duration-100  hover:bg-sky-600 rounded focus:outline-none my-1"
                    >Log In</button>

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
                    Not having the account? {" "}
                    <Link className="no-underline border-b border-blue text-sky-500" href="/admin/register/">
                        Sign up
                    </Link>.
                </div>
            </div>
            </div>
        </div>

    </div>

    </div>
  )
}

export default Login;