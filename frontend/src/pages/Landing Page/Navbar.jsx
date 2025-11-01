import React, { useState } from "react";
import { User, Search, ShoppingCart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Navbar = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(!isOpen);
  };

  const handleIsMenuOpen = () => {
    setIsOpen((prev) => !prev);
  };
  console.log(isOpen);

  return (
    <nav className="h-25  w-full relative ">
      <div className="flex items-center justify-between h-full p-6 max-w-7xl mx-auto">
        {/* Company Nmae or logo  */}

        {isMobile && (
          <div className=" flex items-center flex-1">
            <button onClick={handleIsMenuOpen} className="mr-2">
              {isOpen ? <Menu /> : <X />}
            </button>
          </div>
        )}

        <div className="flex flex-col items-center justify-center font-modern flex-none ">
          <h2 className="lg:text-2xl text-blue-900 tracking-wide font-black">
            E COMMERCE COMPANY
          </h2>
          <span className="text-sm text-blue-950 tracking-widest">
            Philippines
          </span>
        </div>

        {/* Navigation  */}
        <div className="flex items-center space-x-6 flex-1 justify-end">
          {isDesktop && (
            <div className="flex space-x-6 items-center font-medium">
              <a href="" className="text-yellow-700">
                NEW ARRIVALS
              </a>
              <a href="">ELECTRONICS</a>
              <a href="">FOODS</a>
              <a href="">CLOTHING</a>
              <a href="">BOOKS</a>
              <a href="">TOYS</a>
              <a href="">SPORTS</a>
              <a href="" className="text-red-900">
                SALE
              </a>
            </div>
          )}

          <div className="flex space-x-4 ml-10">
            <Link to={"/login"}>
              <User />
            </Link>
            <Search />
            <ShoppingCart />
          </div>
        </div>
      </div>

      {isMobile && (
        <div
          className={`w-full absolute top-20 left-0 overflow-hidden transition-all duration-900 p-6 ease-in-out
      ${isOpen ? "-translate-x-full" : "translate-x-0"}`}
        >
          <div className="flex flex-col space-y-4 items-center font-medium justify-center">
            <a href="" className="text-yellow-700">
              NEW ARRIVALS
            </a>
            <a href="">ELECTRONICS</a>
            <a href="">FOODS</a>
            <a href="">CLOTHING</a>
            <a href="">BOOKS</a>
            <a href="">TOYS</a>
            <a href="">SPORTS</a>
            <a href="" className="text-red-900">
              SALE
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
