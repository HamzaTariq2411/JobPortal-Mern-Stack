import React, { useContext, useState } from "react";
import { AuthContext } from "../../store/AuthProvider";
import { Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Jobs = () => {
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState();
  const { isAuthorized } = useContext(AuthContext);

  useEffect(() => {
    try {
      axios
        .get("http://localhost:8800/api/getjobs", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <section className="bg-gray-200">
        <h1 className="md:text-4xl sm:text-2xl text-xl font-bold text-center pt-20">
          ALL AVAILABLE JOBS
        </h1>
        <div className="flex justify-center m-2">
          <input
            className="h-10 border-2 text-xs p-1 w-full border-gray-950 rounded  sm:text-sm md:text-base"
            placeholder="Search Here...."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap justify-evenly p-4">
          {jobs &&
            jobs.jobs
              .filter((element) => {
                return (
                  search.trim().toLowerCase() === "" ||
                  element.title.toLowerCase().includes(search.toLowerCase())
                );
              })
              .map((element) => {
                return (
                  <div
                    className="bg-white p-5 m-4 rounded flex flex-col gap-2 shadow-xl"
                    key={element._id}
                  >
                    <p className="font-semibold text-lg">{element.title}</p>
                    <p className="text-gray-400 text-base">
                      {element.category}
                    </p>
                    <p>{element.country}</p>
                    <Link
                      className="bg-black text-white flex justify-center border-none sm:font-semibold text-sm px-6 py-2 md:px-7 rounded-md border-transparent cursor-pointer hover:text-white hover:border-white hover:bg-opacity-50"
                      to={`/job/${element._id}`}
                    >
                      Job Details
                    </Link>
                  </div>
                );
              })}
        </div>
      </section>
    </>
  );
};

export default Jobs;
