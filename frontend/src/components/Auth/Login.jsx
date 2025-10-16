import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-black">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md  border p-10 rounded-xl border-gray-200 shadow-xl space-y-8">


        <form action="#" method="POST" className="space-y-8">
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-800">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/30 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div className=''>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-800">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/30 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div className=''>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border px-3 py-1.5 relative overflow-hidden border-gray-200 outline-1 outline-black/30 group cursor-pointer hover:outline-none transition-all duration-300"
            >
              <span className='absolute h-full left-0 w-0 group-hover:w-full bg-blue-400 transition-all duration-300 top-0'></span>
              <span className='relative group-hover:text-gray-50 transition-colors duration-300 z-10'>Sign in</span>
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Not a member?{' '}
          <Link to={'/register'} className="font-semibold text-indigo-400 hover:text-indigo-300">
            Register an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;