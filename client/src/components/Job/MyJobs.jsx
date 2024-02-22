import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../store/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const { isAuthorized, user } = useContext(AuthContext);

  const navigateTo = useNavigate();

  // Get Employer jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8800/api/getmyjobs",
          {
            withCredentials: true,
          }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.msg);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }
  //Edit Job

  const handleJobEdit = async (jobId) => {
    const editJob = await myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:8800/api/updatejobs/${jobId}`, editJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.msg);
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
      });
  };

  // Delete Job

  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`http://localhost:8800/api/deletejobs/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.msg);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    // Update the job object in the jobs state with the new value
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <>
      <div className="flex flex-col gap-2 bg-gray-200">
        <h1 className="text-4xl text-center font-semibold pt-20">
          Your Posted Jobs
        </h1>
        {myJobs.length > 0 ? (
          <>
            <div className="flex overflow-hidden flex-col p-4">
              {myJobs.map((element) => (
                <div
                  className="bg-white p-5 rounded flex flex-col gap-2 shadow-xl m-4"
                  key={element._id}
                >
                  <div className=" flex gap-1 items-center">
                    <span className="font-semibold">Title:</span>
                    <input
                      className="border-b-2 pl-1 border-gray-800 w-full"
                      type="text"
                      value={element.title}
                      onChange={(e) =>
                        handleInputChange(element._id, "title", e.target.value)
                      }
                    />
                  </div>
                  <div className=" flex gap-1 items-center">
                    <span className="font-semibold">Country:</span>
                    <input
                      className="border-b-2 pl-1 border-gray-800 w-full"
                      type="text"
                      value={element.country}
                      onChange={(e) =>
                        handleInputChange(
                          element._id,
                          "country",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className=" flex gap-1 items-center">
                    <span className="font-semibold">City:</span>
                    <input
                      type="text"
                      className="border-b-2 pl-1 border-gray-800 w-full"
                      value={element.city}
                      onChange={(e) =>
                        handleInputChange(element._id, "city", e.target.value)
                      }
                    />
                  </div>
                  <div className=" flex gap-1 items-center">
                    <span className="font-semibold">Category:</span>
                    <input
                      className="border-b-2 pl-1 border-gray-800 w-full"
                      value={element.category}
                      onChange={(e) =>
                        handleInputChange(
                          element._id,
                          "category",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className=" flex gap-1 items-center">
                    <span className="font-semibold">Expected Salary:</span>
                    <input
                      type="number"
                      className="border-b-2 pl-1 border-gray-800 w-full"
                      value={element.expectedSalary}
                      onChange={(e) =>
                        handleInputChange(
                          element._id,
                          "expectedSalary",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className=" flex gap-1 items-center">
                    <span className="font-semibold">Expired:</span>
                    <select
                      className="border-2 pl-1 border-gray-800 rounded"
                      value={element.expired}
                      onChange={(e) =>
                        handleInputChange(
                          element._id,
                          "expired",
                          e.target.value
                        )
                      }
                    >
                      <option value={true}>TRUE</option>
                      <option value={false}>FALSE</option>
                    </select>
                  </div>
                  <div className=" flex gap-1 items-center">
                    <span className="font-semibold">Description:</span>
                    <input
                      className="border-b-2 pl-1 border-gray-800 w-full"
                      value={element.description}
                      onChange={(e) =>
                        handleInputChange(
                          element._id,
                          "description",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className=" flex gap-1 items-center">
                    <span className="font-semibold">Location: </span>
                    <input
                      className="border-b-2 pl-1 border-gray-800 w-full"
                      value={element.location}
                      onChange={(e) =>
                        handleInputChange(
                          element._id,
                          "location",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <button
                      className="bg-green-700 text-white rounded p-1"
                      onClick={() => handleJobEdit(element._id)}
                    >
                      Save Changes
                    </button>
                    <button
                      className="bg-red-700 text-white rounded p-1"
                      onClick={() => handleDeleteJob(element._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center py-20">
            You've not posted any job or may be you deleted all of your jobs!
          </p>
        )}
      </div>
    </>
  );
};

export default MyJobs;
