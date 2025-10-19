import { Eye, EyeOff } from 'lucide-react';
import React from 'react';

const PasswordField = ({ id, label, icon, onChange, required = true, showPassword, handleSetShowPasword, placeholder, value }) => {
  return (
    <div className='group relative'>
      <div className="flex items-center justify-between">
        <div>
          <label htmlFor="email" className=" text-sm/6 font-medium text-gray-800 flex items-center space-x-1 absolute -top-4 bg-white left-2 group-focus-within:-top-1 transition-all duration-500 z-20">
            <div className='flex items-center group-focus-within:text-blue-800'>
              {icon}
              <span className='px-1 ' >{label}</span>
            </div>
          </label>
        </div>
      </div>
      <div className="mt-2 relative ">
        <input
          value={value}
          onChange={onChange}
          id={id}
          name={id}
          type={showPassword ? "text" : "password"}
          required={required}
          placeholder={placeholder}
          autoComplete='current-password'
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-black/30 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 "

        />
        <button type='button' className='absolute top-2 right-2  ' onClick={handleSetShowPasword}>
          {showPassword ? <EyeOff className='text-blue-400 transition-all duration-500' size={20} /> : <Eye size={20} className='' />}
        </button>
      </div>
    </div>
  );
};
export default PasswordField;