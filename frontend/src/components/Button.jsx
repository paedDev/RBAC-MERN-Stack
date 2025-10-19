import React from 'react';

const Button = ({ children }) => {
  return (
    <div className=''>
      <button
        type="submit"
        className="flex w-full justify-center rounded-md border px-3 py-1.5 relative overflow-hidden border-gray-200 outline-1 outline-black/30 group cursor-pointer hover:outline-none transition-all duration-300"
      >
        <span className='absolute h-full left-0 w-0 group-hover:w-full bg-blue-400 transition-all duration-300 top-0'></span>
        <span className='relative group-hover:text-gray-50 transition-colors duration-300 z-10'>{
          children}</span>
      </button>
    </div>
  );
};

export default Button;