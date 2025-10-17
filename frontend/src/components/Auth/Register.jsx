import React, { useState } from 'react';
import { Eye, EyeOff, ChevronDown, Mail, LockKeyhole, UserRound } from 'lucide-react';
import axios from "axios";
import { BASE_URL } from '../../config/config';
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: 'customer'
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleSetShowPasword = () => {
    setShowPassword(!showPassword);
  };
  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { name, email, password, role } = user;
      const data = await axios.post(`${BASE_URL}/api/auth/register`, {
        name,
        email,
        password,
        role,
      });
      console.log(data);
      setTimeout(() => {
        toast.success("Successfully created an account");
        navigate('/login');
      }, 3000);

    } catch (error) {
      console.error(`Error registering`);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      }
      else {
        toast.error("Failed to create an account");
        console.log(`Failed to create an account`, error);


      }
    } finally {
      setLoading(false);
    }
  };
  console.log(user);

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          className="mx-auto h-10 w-auto"
        />

      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md border p-10 rounded-xl border-gray-200 shadow-xl space-y-8">

        <h2 className=" text-center text-2xl font-bold tracking-tight text-black">Register an Account</h2>
        <form action="#" onSubmit={handleSubmit} className="space-y-8">
          <div className='flex items-center justify-between gap-3'>
            <div className='relative group'>
              <label htmlFor="name" className=" text-sm/6 font-medium text-gray-800 flex items-center space-x-1 absolute -top-4 bg-white left-2 group-focus-within:-top-1 transition-all duration-500">
                <div className='flex items-center justify-center group-focus-within:text-blue-800'>
                  <UserRound size={15} />
                  <span className='px-1 ' >Name</span>
                </div>
              </label>
              <div className="mt-2 ">
                <input
                  value={user.name}
                  onChange={handleValueChange}
                  id="name"
                  name="name"
                  type="name"
                  required
                  autoComplete="name"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/30 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  placeholder='Enter your name'
                />

              </div>
            </div>
            <div className='relative group'>
              <label htmlFor="email" className=" text-sm/6 font-medium text-gray-800 flex items-center space-x-1 absolute -top-4 bg-white left-2 group-focus-within:-top-1 transition-all duration-500">
                <div className='flex items-center group-focus-within:text-blue-800'>
                  <UserRound size={15} />
                  <span className='px-1 ' >Email</span>
                </div>
              </label>
              <div className="mt-2 ">
                <input
                  value={user.email}
                  onChange={handleValueChange}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/30 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  placeholder='Enter your email'
                />
              </div>
            </div>
          </div>

          <div className='group relative'>
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="email" className=" text-sm/6 font-medium text-gray-800 flex items-center space-x-1 absolute -top-4 bg-white left-2 group-focus-within:-top-1 transition-all duration-500 z-20">
                  <div className='flex items-center group-focus-within:text-blue-800'>
                    <UserRound size={15} />
                    <span className='px-1 ' >Password</span>
                  </div>
                </label>


              </div>
            </div>
            <div className="mt-2 relative ">
              <input
                value={user.password}
                onChange={handleValueChange}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/30 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 "
                placeholder='Enter your password'
              />
              <button type='button' className='absolute top-2 right-2  ' onClick={handleSetShowPasword}>
                {showPassword ? <EyeOff className='text-blue-400 transition-all duration-500' size={20} /> : <Eye size={20} className='' />}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="role" className="block text-sm/6 font-medium text-gray-800">
              Role
            </label>
            <div className="mt-2 relative">
              <select
                value={user.role}
                onChange={handleValueChange}
                id="role"
                name="role"
                required
                className="block w-full rounded-lg bg-white px-3 py-1 pr-10 text-base text-gray-900 border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all appearance-none cursor-pointer hover:border-indigo-400"
              >
                <option value="" disabled>Select a role</option>
                <option value="customer">👤 Customer - View & Purchase</option>
                <option value="admin">🛡️ Admin - Full Access</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                size={20}
              />
            </div>
          </div>

          <div className=''>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border px-3 py-1.5 relative overflow-hidden border-gray-200 outline-1 outline-black/30 group cursor-pointer hover:outline-none transition-all duration-300"
            >
              <span className='absolute h-full left-0 w-0 group-hover:w-full bg-blue-400 transition-all duration-300 top-0'></span>
              <span className='relative group-hover:text-gray-50 transition-colors duration-300 z-10'>{
                loading ? "Loading" : "Register"}</span>
            </button>
          </div>

        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Already a member?{' '}
          <Link to={'/login'} className="font-semibold text-indigo-400 hover:text-indigo-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;