import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../store/AuthProvider";
import { useNavigate } from "react-router-dom";

const PostJobs = () => {
  const { isAuthorized, user } = useContext(AuthContext);
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    category: "",
    country: "",
    city: "",
    location: "",
    expectedSalary: "",
  });

  const handleInputs = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setJobData({
      ...jobData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8800/api/postjob",
        JSON.stringify(jobData),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.msg);
      setJobData({
        title: "",
        description: "",
        category: "",
        country: "",
        city: "",
        location: "",
        expectedSalary: "",
      });
    } catch (error) {
      toast.error(error.response.data.error.message);
    }
  };
  const navigateTo = useNavigate();
  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  return (
    <>
      <div className="z-20 p-10 text-center">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <h2 className="text-3xl pt-10 pb-3">Post Job Here</h2>
          <div className="relative border-b-2 border-black my-3 text-black">
            <input
              className="w-full h-10 bg-transparent outline-none border-none text-xs focus:outline-none sm:text-sm md:text-base"
              type="text"
              placeholder="Enter Job Title"
              required
              autoComplete="off"
              name="title"
              value={jobData.title}
              onChange={handleInputs}
            />
          </div>
          <div className="relative border-b-2 border-gray-300 my-3">
            <textarea
              className="w-full h-10 bg-transparent outline-none border-none text-xs  focus:outline-none sm:text-sm md:text-base"
              type="text"
              placeholder="Enter Job Description "
              required
              autoComplete="off"
              name="description"
              value={jobData.description}
              onChange={handleInputs}
            />
          </div>
          <div className="relative border-b-2 border-gray-300 my-3">
            <input
              className="w-full h-10 bg-transparent outline-none border-none text-xs  focus:outline-none sm:text-sm md:text-base"
              type="text"
              placeholder="Enter Job Category"
              required
              autoComplete="off"
              name="category"
              value={jobData.category}
              onChange={handleInputs}
            />
          </div>
          <div className="relative border-b-2 border-gray-300 my-3">
            <input
              className="w-full h-10 bg-transparent outline-none border-none text-xs  focus:outline-none sm:text-sm md:text-base"
              type="text"
              placeholder="Enter Country"
              required
              autoComplete="off"
              name="country"
              value={jobData.country}
              onChange={handleInputs}
            />
          </div>
          <div className="relative border-b-2 border-gray-300 my-3">
            <input
              className="w-full h-10 bg-transparent outline-none border-none text-xs  focus:outline-none sm:text-sm md:text-base"
              type="text"
              placeholder="Enter City"
              required
              autoComplete="off"
              name="city"
              value={jobData.city}
              onChange={handleInputs}
            />
          </div>
          <div className="relative border-b-2 border-gray-300 my-3">
            <input
              className="w-full h-10 bg-transparent outline-none border-none text-xs  focus:outline-none sm:text-sm md:text-base"
              type="text"
              placeholder="Enter Country"
              required
              autoComplete="off"
              name="location"
              value={jobData.location}
              onChange={handleInputs}
            />
          </div>
          <div className="relative border-b-2 border-gray-300 my-3">
            <input
              className="w-full h-10 bg-transparent outline-none border-none text-xs  focus:outline-none sm:text-sm md:text-base"
              type="number"
              placeholder="Enter Expected Salary"
              required
              autoComplete="off"
              name="expectedSalary"
              value={jobData.expectedSalary}
              onChange={handleInputs}
            />
          </div>
          <button
            className="bg-black text-white border-none font-semibold text-xs px-3 py-2 md:px-5 md:py-3 rounded-md border-transparent cursor-pointer transition duration-300 ease-in-out hover:text-white hover:border-white hover:bg-opacity-50 hover:bg-black
            my-3 "
            type="submit"
          >
            Post Job
          </button>
        </form>
      </div>
    </>
  );
};

export default PostJobs;
