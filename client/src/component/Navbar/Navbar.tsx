import React, { useState } from "react";
import { Link } from "react-router-dom";
// import "../../global.css";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <>
      <div className="flex justify-between items-center h-24 mx-auto px-4 bg-slate-100">
        <h1 className="w-full text-3xl font-bold text-gray-300">PODCAST.</h1>
        <ul className="hidden md:flex">
          <li className="p-4 w-max">HOME</li>
          <li className="p-4 w-max">ADD PODCAST</li>
          <li className="p-4 w-max">LOGIN</li>
        </ul>

        <div onClick={handleNav} className="cursor-pointer block md:hidden">
          {!nav ? <AiOutlineClose /> : <AiOutlineMenu size={20} />}
        </div>

        <div
          className={
            !nav
              ? "fixed left-0 top-0 w-[60%] h-full bg-slate-500 md:hidden"
              : "hidden"
          }
        >
          <h1 className="w-full text-3xl font-bold text-gray-300 m-4">
            PODCAST.
          </h1>
          <ul className="">
            <li className="p-4 w-max">HOME</li>
            <li className="p-4 w-max">ADD PODCAST</li>
            <li className="p-4 w-max">LOGIN</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
