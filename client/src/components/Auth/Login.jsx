import React, { useContext, useState } from "react";
import { loginbg } from "../../images";
import { NavLink, Navigate } from "react-router-dom";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { AuthContext } from "../../store/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { isAuthorized, setIsAuthorized } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };
  const [loginUser, setLoginUser] = useState({
    role: "",
    email: "",
    password: "",
  });

  const handleInputs = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setLoginUser({
      ...loginUser,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8800/api/login",
        JSON.stringify(loginUser),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.msg);
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center h-screen w-full px-10 text-white absolute bg-gray-900 bg-opacity-80">
      <img
        src={loginbg}
        alt=""
        className="w-full h-full object-cover absolute mix-blend-overlay"
      />
      <div className="z-20 p-10 text-center w-96">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <h2 className="text-3xl mb-5">Log In</h2>
          <div className="relative border-b-2 border-gray-300 my-3">
            <select
              className="w-full h-10 bg-transparent outline-none border-none text-xs text-white focus:outline-none sm:text-sm md:text-base"
              required
              autoComplete="off"
              name="role"
              value={loginUser.role}
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
              type="email"
              placeholder="Enter Your Email"
              required
              autoComplete="off"
              name="email"
              value={loginUser.email}
              onChange={handleInputs}
            />
          </div>
          <div className="relative border-b-2 border-gray-300 my-3">
            <input
              className="w-full h-10 bg-transparent outline-none border-none text-xs text-white focus:outline-none sm:text-sm md:text-base"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              required
              autoComplete="off"
              name="password"
              value={loginUser.password}
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
            className="mt-4 bg-white text-black border-none font-semibold text-xs px-3 py-2 md:px-5 md:py-3 rounded-md border-transparent cursor-pointer transition duration-300 ease-in-out hover:text-white hover:border-white hover:bg-opacity-50 hover:bg-black"
            type="submit"
          >
            Log In
          </button>
          <div className="text-center mt-4 text-xs sm:text-sm md:text-base">
            <p>
              Don't Have an account?{"  "}
              <NavLink to="/signup" className="hover:underline">
                Register
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
