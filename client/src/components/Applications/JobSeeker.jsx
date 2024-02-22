import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const JobSeeker = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8800/api/jobSeeker/getAll",
          {
            withCredentials: true,
          }
        );
        setApplications(data.application);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const showResume = (resume) => {
    window.open(`http://localhost:8800/api/CV/${resume}`, "_blank");
  };

  return (
    <>
      <section className="bg-gray-200">
        <h1 className="md:text-4xl text-xl sm:text-2xl font-bold text-center pt-24">
          My Applications
        </h1>
        <div className="flex flex-wrap justify-evenly p-4">
          {applications.length === 0 ? (
            <h4 className="py-20">No Applications Found</h4>
          ) : (
            applications.map((element, index) => (
              <div
                className="bg-white  p-5 rounded flex flex-col gap-2 shadow-xl"
                key={index}
              >
                <p className="font-semibold text-lg">
                  <span className="font-semibold">Name: </span>
                  {element.name}
                </p>
                <p className="text-gray-400 text-base">
                  <span className="font-semibold">Email: </span>
                  {element.email}
                </p>
                <p>
                  <span className="font-semibold">Phone: </span>
                  {element.phone}
                </p>
                <button
                  className="bg-black text-white flex justify-center border-none sm:font-semibold text-sm px-6 py-2 md:px-7 rounded-md border-transparent cursor-pointer hover:text-white hover:border-white hover:bg-opacity-50 "
                  onClick={() => showResume(element.resume)}
                >
                  Show Resume
                </button>
                <Link
                  className="bg-black text-white flex justify-center border-none sm:font-semibold text-sm px-6 py-2 md:px-7 rounded-md border-transparent cursor-pointer hover:text-white hover:border-white hover:bg-opacity-50 "
                  to={`/job/${element.jobID}`}
                >
                  Job Details
                </Link>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default JobSeeker;
