import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../store/AuthProvider";
import axios from "axios";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8800/api/job/${id}`,
          {
            withCredentials: true,
          }
        );
        setJob(data.job);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!isAuthorized) {
    navigateTo("/login");
  }

  return (
    <div className="bg-gray-200">
      <div className="container flex flex-col gap-2">
        <h3 className="text-center text-4xl font-semibold py-2  pt-20">
          Job Details
        </h3>
        <div className="flex flex-col gap-2 p-4">
          <p>
            <span className="font-semibold"> Title: </span>
            {job.title}
          </p>
          <p>
            <span className="font-semibold">Category:</span> {job.category}
          </p>
          <p>
            <span className="font-semibold">Country: </span>
            {job.country}
          </p>
          <p>
            <span className="font-semibold"> City:</span> {job.city}
          </p>
          <p>
            <span className="font-semibold">Location: </span>
            {job.location}
          </p>
          <p>
            <span className="font-semibold">Description: </span>
            {job.description}
          </p>
          <p>
            <span className="font-semibold">Job Posted On: </span>
            {job.jobPosted}
          </p>
          <p>
            <span className="font-semibold">Expected Salary: </span>
            {job.expectedSalary}
          </p>
          {user && user.role === "Employer" ? (
            <></>
          ) : (
            <Link
              to={`/application/${job._id}`}
              className="bg-green-700 text-white rounded p-1 text-center"
            >
              Apply Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
