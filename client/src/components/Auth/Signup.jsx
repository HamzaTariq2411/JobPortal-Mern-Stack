import React, { useContext, useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { AuthContext } from "../../store/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const { isAuthorized, setIsAuthorized } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };
  const [signupUser, setSignupUser] = useState({
    userName: "",
    email: "",
    phone: "",
    role: "",
    password: "",
  });

  const handleInputs = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setSignupUser({
      ...signupUser,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8800/api/signup",
        JSON.stringify(signupUser),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.msg);
      setSignupUser({
        userName: "",
        email: "",
        phone: "",
        role: "",
        password: "",
      });
      setIsAuthorized(true);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg || error.response.data.error.message);
    }
  };
  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <div className="text-white bg-cover bg-fixed bg-Signup h-screen">
      <div className="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-70 mix-blend-normal">
        <div className="z-20 p-10 text-center w-64 sm:w-96">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <h2 className="text-3xl pt-10 pb-3">Sign Up</h2>
            <div className="relative border-b-2 border-gray-300 my-3">
              <input
                className="w-full h-10 bg-transparent outline-none border-none text-xs text-white focus:outline-none sm:text-sm md:text-base"
                type="text"
                placeholder="Enter Username"
                required
                autoComplete="off"
                name="userName"
                value={signupUser.userName}
                onChange={handleInputs}
              />
            </div>
            <div className="relative border-b-2 border-gray-300 my-3">
              <input
                className="w-full h-10 bg-transparent outline-none border-none text-xs text-white focus:outline-none sm:text-sm md:text-base"
                type="email"
                placeholder="Enter Your Email"
                required
                autoComplete="off"
                name="email"
                value={signupUser.email}
                onChange={handleInputs}
              />
            </div>
            <div className="relative border-b-2 border-gray-300 my-3">
              <input
                className="w-full h-10 bg-transparent outline-none border-none text-xs text-white focus:outline-none sm:text-sm md:text-base"
                type="number"
                placeholder="Enter Your Number"
                required
                autoComplete="off"
                name="phone"
                value={signupUser.phone}
                onChange={handleInputs}
              />
            </div>
            <div className="relative border-b-2 border-gray-300 my-3">
              <select
                className="w-full h-10 bg-transparent outline-none border-none text-xs text-white focus:outline-none sm:text-sm md:text-base"
                required
                autoComplete="off"
                name="role"
                value={signupUser.role}
                onChange={handleInputs}
              >
                <option className="text-black" value="">
                  Select Role
                </option>
                <option className="text-black" value="Employer">
                  Employer
                </option>
                <option className="text-black" value="Job Seeker">
                  Job Seeker
                </option>
              </select>
            </div>
            <div className="relative border-b-2 border-gray-300 my-3">
              <input
                className="w-full h-10 bg-transparent outline-none border-none text-xs text-white focus:outline-none sm:text-sm md:text-base"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                required
                autoComplete="off"
                name="password"
                value={signupUser.password}
                onChange={handleInputs}
              />
              <div
                onClick={handleToggle}
                className="absolute top-4 right-2 cursor-pointer"
              >
                {showPassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
              </div>
            </div>
            <button
              className="bg-white text-black border-none font-semibold text-xs px-3 py-2 md:px-5 md:py-3 rounded-md border-transparent cursor-pointer transition duration-300 ease-in-out hover:text-white hover:border-white hover:bg-opacity-50 hover:bg-black
            my-3 "
              type="submit"
            >
              Sign Up
            </button>
            <div className="text-center mt-2 text-xs sm:text-sm md:text-base">
              <p>
                Do you have an account?{"  "}
                <NavLink to="/login" className="hover:underline">
                  Log In
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
