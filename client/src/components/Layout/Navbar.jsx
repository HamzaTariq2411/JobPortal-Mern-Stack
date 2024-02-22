import React, { useContext, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../store/AuthProvider";

const Navbar = () => {
  const {  user } = useContext(AuthContext);
 
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className="bg-black  flex justify-between items-center px-2 py-3 text-white fixed w-full z-50">
      <h1 className="text-3xl font-bold text-gray-300">JobPulse.</h1>
      <ul className="hidden md:flex gap-3 items-center">
        <NavLink to="/">
          <li
            className="p-1 hover:bg-gray-300 rounded-xl  cursor-pointer duration-300 hover:text-black"
          >
            Home
          </li>
        </NavLink>
        <NavLink to="/job/getall">
          <li
            className="p-1 hover:bg-gray-300 rounded-xl  cursor-pointer duration-300 hover:text-black"
          >
            All Jobs
          </li>
        </NavLink>
        <NavLink to="/application/myapplications">
          <li
            className="p-1 hover:bg-gray-300 rounded-xl  cursor-pointer duration-300 hover:text-black"
          >
            {user && user.role === "Employer"
              ? "Applicant's Applications"
              : "My Applications"}
          </li>
        </NavLink>
        {user && user.role === "Employer" ? (
          <>
            <NavLink to="/job/postjob">
              <li
                className="p-1 hover:bg-gray-300 rounded-xl  cursor-pointer duration-300 hover:text-black"
              >
                Post Job
              </li>
            </NavLink>
            <NavLink to="/job/myjobs">
              <li
                className="p-1 hover:bg-gray-300 rounded-xl  cursor-pointer duration-300 hover:text-black"
              >
                View Jobs
              </li>
            </NavLink>
          </>
        ) : (
          <></>
        )}

        {user ? (
          <NavLink
            to="/logout"
            className="bg-white text-black border-none sm:font-semibold text-sm px-6 py-2 md:px-7 rounded-md border-transparent cursor-pointer hover:text-white hover:border-white hover:bg-opacity-50 "
          >
            Log Out
          </NavLink>
        ) : (
          <>
            <NavLink
              to="/login"
              className="bg-white text-black border-none sm:font-semibold text-sm px-6 py-2 md:px-7 rounded-md border-transparent cursor-pointer hover:text-white hover:border-white hover:bg-opacity-50 "
            >
              Log In
            </NavLink>
            <NavLink
              to="/signup"
              className="bg-white text-black border-none sm:font-semibold text-sm px-6 py-2 md:px-7 rounded-md border-transparent cursor-pointer hover:text-white hover:border-white hover:bg-opacity-50 "
            >
              Register
            </NavLink>
          </>
        )}
      </ul>

      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <ul
        className={
          nav
            ? "fixed pl-3 md:hidden left-0 top-0 w-[40%] flex flex-col gap-4 h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 overflow-y-scroll"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        <h1 className="w-full text-3xl font-bold text-gray-300 m-4">
          Job Portal.
        </h1>

        <NavLink to="/">
          <li
            className="p-1 hover:bg-gray-300 rounded-xl  cursor-pointer duration-300 hover:text-black"
          >
            Home
          </li>
        </NavLink>
        <NavLink to="/job/getall">
          <li
            className="p-1 hover:bg-gray-300 rounded-xl  cursor-pointer duration-300 hover:text-black"
          >
            All Jobs
          </li>
        </NavLink>
        <NavLink to="/application/myapplications">
          <li
            className="p-1 hover:bg-gray-300 rounded-xl  cursor-pointer duration-300 hover:text-black"
          >
            {user && user.role === "Employer"
              ? "Applicant's Applications"
              : "My Applications"}
          </li>
        </NavLink>
        {user && user.role === "Employer" ? (
          <>
            <NavLink to="/job/post">
              <li
                className="p-1 hover:bg-gray-300 rounded-xl  cursor-pointer duration-300 hover:text-black"
              >
                JobPulse
              </li>
            </NavLink>
            <NavLink to="/job/myjobs">
              <li
                className="p-1 hover:bg-gray-300 rounded-xl  cursor-pointer duration-300 hover:text-black"
              >
                View Jobs
              </li>
            </NavLink>
          </>
        ) : (
          <></>
        )}

        {user ? (
          <NavLink
            to="/logout"
            className="bg-white text-black border-none sm:font-semibold text-sm px-6 py-2 md:px-7 rounded-md border-transparent cursor-pointer hover:text-white hover:border-white hover:bg-opacity-50 "
          >
            Log Out
          </NavLink>
        ) : (
          <div className="flex flex-col gap-2">
            <NavLink
              to="/login"
              className="bg-white text-black border-none sm:font-semibold text-sm px-6 py-2 md:px-7 rounded-md border-transparent cursor-pointer hover:text-white hover:border-white hover:bg-opacity-50 "
            >
              Log In
            </NavLink>
            <NavLink
              to="/signup"
              className="bg-white text-black border-none sm:font-semibold text-sm px-6 py-2 md:px-7 rounded-md border-transparent cursor-pointer hover:text-white hover:border-white hover:bg-opacity-50 "
            >
              Register
            </NavLink>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
