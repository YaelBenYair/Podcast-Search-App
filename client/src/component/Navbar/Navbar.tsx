import { useState } from "react";
// import "../../global.css";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useUser } from "../../context/ContextUser";
import UlElement from "./UlElement";

const Navbar = () => {
  const token = localStorage.getItem("token");

  const [nav, setNav] = useState(true);

  const { userState } = useUser();
  const { isAdmin } = userState;

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <>
      <div className="flex justify-between items-center h-24 mx-auto px-4 bg-slate-100 dark:bg-gray-700">
        <h1 className="w-full text-3xl font-bold text-gray-300">
          PODCAST. {isAdmin && <span className="text-xs">ADMIN</span>}
        </h1>
        <h1 className=" invisible md:visible p-4 w-[100%] max-w-[300px] uppercase font-bold text-gray-600 text-right">
          {!isAdmin && token && `hello ${userState.name}`}
        </h1>
        <UlElement tailwindClass={"hidden md:flex"} />

        <div onClick={handleNav} className="cursor-pointer block md:hidden">
          {!nav ? <AiOutlineClose /> : <AiOutlineMenu size={20} />}
        </div>

        <div
          onClick={handleNav}
          className={
            !nav
              ? "fixed left-0 top-0 w-[60%] h-full bg-slate-500 z-40 md:hidden"
              : "hidden"
          }
        >
          <h1 className="w-full text-3xl font-bold text-gray-300 m-4">
            PODCAST. {isAdmin && <span className="text-xs">ADMIN</span>}
          </h1>
          <h1 className="p-4 w-full uppercase font-bold text-gray-600">
            {!isAdmin && `hello ${userState.name}`}
          </h1>
          <UlElement tailwindClass={"p-4 text-white"} />
        </div>
      </div>
    </>
  );
};

export default Navbar;
