import React from 'react';
import { ChevronFirst, EllipsisVertical, ChevronLast } from 'lucide-react';
import { NavLink } from 'react-router-dom';
const Navbar = ({ children }) => {
  return (
    <aside className='h-screen'>
      <nav className='flex flex-col justify-between w-64 border-r border-gray-200 shadow-xl h-full p-4 overflow-hidden '>
        {/* top part */}
        <div className='flex items-center justify-between'>
          <img src="/images/Logo.png" alt="" className='size-10' />
          <button>
            <ChevronLast className='size-5' />
          </button>
        </div>
        {/* middle part */}
        <ul className='flex-1 px-1 py-4'>
          {children}
        </ul>


        {/* bottom part */}
        <div className='flex space-x-4 items-center '>
          <img src="/images/Logo.png" alt="" className='size-8' />
          <div className='text-xs flex flex-col'>
            <h4>John Doe</h4>
            <span className='text-gray-600'>JohnDoe@gmail.com</span>
          </div>
          <EllipsisVertical />
        </div>

      </nav>
    </aside>
  );
};

export default Navbar;


export const SideBarItem = ({ icon, text, active, alert, to }) => {
  return (
    <NavLink to={to} className='flex items-center space-x-2  rounded-lg  justify-between  transition-colors duration-500 my-3'>
      <div className="relative flex items-center space-x-2 overflow-hidden group w-full px-3 py-2 rounded-md">
        <span
          className="absolute top-0 left-0 h-full w-0 bg-blue-200 transition-all duration-500 ease-in-out group-hover:w-full origin-left"
        ></span>
        <span className="relative z-10 group-hover:text-blue-800 duration-500 transition-colors">{icon}</span>
        <span className="relative z-10 text-sm font-semibold group-hover:text-blue-800 duration-500 transition-colors">{text}</span>
        {active && <div className=' absolute w-2 h-2 bg-blue-600 rounded-xl right-2'>

        </div>}
      </div>



    </NavLink>
  );
};