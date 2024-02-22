import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../store/AuthProvider";
import { Navigate, useParams } from "react-router-dom";

const Application = () => {
  const { isAuthorized, user } = useContext(AuthContext);
  const [file, setFile] = useState();
  const [applyJob, setApplyJob] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
    jobId: "",
  });
  const { id } = useParams();
  const handleInputs = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setApplyJob({
      ...applyJob,
      [name]: value,
      id,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", applyJob.name);
    formData.append("email", applyJob.email);
    formData.append("phone", applyJob.phone);
    formData.append("jobId", applyJob.jobId);
    formData.append("resume", file);
    try {
      const { data } = await axios.post(
        "http://localhost:8800/api/postapplication",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data.msg);
      setApplyJob({
        name: "",
        email: "",
        phone: "",
        resume: "",
        jobId: "",
      });
      <Navigate to="/job/getall" />;
    } catch (error) {
      toast.error(error.response.data.msg.message);
    }
  };
  if (!isAuthorized || (user && user.role === "Employer")) {
    <Navigate to="/" />;
  }

  return (
    <>
      <div className="z-20 p-10 text-center">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <h2 className="text-3xl pt-10 pb-3">Apply Here</h2>
          <div className="relative border-b-2 border-black my-3 text-black">
            <input
              className="w-full h-10 bg-transparent outline-none border-none text-xs focus:outline-none sm:text-sm md:text-base"
              type="text"
              placeholder="Enter Your Name"
              required
              autoComplete="off"
              name="name"
              value={applyJob.name}
              onChange={handleInputs}
            />
          </div>
          <div className="relative border-b-2 border-gray-300 my-3">
            <input
              className="w-full h-8 bg-transparent outline-none border-none text-xs  focus:outline-none sm:text-sm md:text-base"
              type="text"
              placeholder="Enter Your Email"
              required
              autoComplete="off"
              name="email"
              value={applyJob.email}
              onChange={handleInputs}
            />
          </div>
          <div className="relative border-b-2 border-gray-300 my-3">
            <input
              className="w-full h-10 bg-transparent outline-none border-none text-xs  focus:outline-none sm:text-sm md:text-base"
              type="number"
              placeholder="Enter Number"
              required
              autoComplete="off"
              name="phone"
              value={applyJob.phone}
              onChange={handleInputs}
            />
          </div>
          <div className="relative border-b-2 border-gray-300 my-3">
            <input
              className="w-full h-10 bg-transparent outline-none border-none text-xs  focus:outline-none sm:text-sm md:text-base"
              type="file"
              accept="application/pdf"
              required
              name="resume"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <button
            className="bg-black text-white border-none font-semibold text-xs px-3 py-2 md:px-5 md:py-3 rounded-md border-transparent cursor-pointer transition duration-300 ease-in-out hover:text-white hover:border-white hover:bg-opacity-50 hover:bg-black
            my-3 "
            type="submit"
          >
            Apply
          </button>
        </form>
      </div>
    </>
  );
};

export default Application;
