import React, { useState } from 'react';
import { ChevronFirst, EllipsisVertical, ChevronLast, UserRoundPen, DeleteIcon, LogOutIcon, Settings2, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
const Navbar = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { expanded, setExpanded, handleExpanded, logout, user } = useAuth();
  return (
    <aside className='min-h-screen'>
      <nav className={`flex flex-col justify-between  border-r border-gray-200 shadow-xl h-full p-4  ${expanded ? "w-20" : "w-64"} transition-all duration-500 ease-in-out`}>
        {/* top part */}
        <div className='flex items-center justify-between'>
          <img src="/images/Logo.png" alt="" className={`${expanded ? 'size-8' : "size-10"} `} />
          <button onClick={handleExpanded}>
            {
              !expanded ? <ChevronFirst className='size-5' /> : <ChevronLast className='size-5' />
            }
          </button>
        </div>
        {/* middle part */}
        <ul className='flex-1 px-1 py-4'>
          {children}
        </ul>


        {/* bottom part */}
        <div className='flex gap-2 items-center relative w-full'>
          <img src="/images/Logo.png" alt="" className='size-8' />
          <div className='flex items-center gap-2 w-full justify-between'>
            <div className={`${expanded ? 'hidden' : "text-xs"}`}>
              <h4>{user.name}</h4>
              <span className='text-gray-600'>{user.email}</span>
            </div>

            <button onClick={() => setOpen((prev) => !prev)} className='relative inline-block'>
              <EllipsisVertical className='size-5' />
            </button>
            {open && (
              <div className={`bottom-10 mt-2  bg-white border-rounded  z-10 text-xs ${expanded ? "absolute -left-1 bottom-15" : " absolute left-[30%]"}`}>
                <button
                  onClick=''
                  className="w-full px-4 py-2  hover:bg-gray-100  "
                >
                  {
                    expanded ? (
                      <UserRoundPen size={20} />
                    ) : (
                      <div className='flex items-center space-x-2'>
                        <UserRoundPen size={20} />
                        <span>Edit Profile</span>
                      </div>
                    )
                  }
                </button>
                <button
                  onClick={logout}
                  className="w-full px-4 py-2 hover:bg-gray-100 "
                >
                  {
                    expanded ? (
                      <LogOutIcon size={20} />
                    ) : (
                      <div className='flex items-center space-x-2'>
                        <LogOutIcon size={20} />
                        <span>Logout</span>
                      </div>

                    )
                  }

                </button>
              </div>
            )}

          </div>

        </div>
      </nav>
    </aside >
  );
};

export default Navbar;


export const SideBarItem = ({ icon, text, active, alert, to }) => {
  const { expanded, setExpanded, handleExpanded } = useAuth();
  return (
    <NavLink to={to} className='flex items-center lg:space-x-2 rounded-lg justify-between transition-colors duration-500 my-3 relative'>
      <div className={`relative flex items-center group w-full px-3 py-2 rounded-md ${expanded ? "justify-center" : "justify-start space-x-2"}`}>
        {/* Background hover effect */}
        <span className="absolute top-0 left-0 h-full w-0 bg-blue-200 transition-all duration-500 ease-in-out group-hover:w-full origin-left rounded-lg"></span>

        {/* Icon */}
        <span className="relative z-10 group-hover:text-blue-800 duration-500 transition-colors">{icon}</span>

        {/* Text (when sidebar is not expanded) */}
        {!expanded && <span className="relative z-10 text-sm font-semibold group-hover:text-blue-800 duration-500 transition-colors">{text}</span>}

        {/* Active indicator dot (only show when not expanded) */}
        {active && !expanded && (
          <div className='absolute w-2 h-2 bg-blue-600 rounded-xl right-2'></div>
        )}

        {/* Tooltip - MOVED OUTSIDE of active condition */}
        {expanded && (
          <div className='absolute left-full rounded-md px-2 py-1 ml-6 bg-blue-500 text-white text-sm invisible opacity-0 -translate-x-3 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-50 whitespace-nowrap shadow-lg'>
            {text}
          </div>
        )}
      </div>
    </NavLink>
  );
};