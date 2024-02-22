import React, { useContext } from "react";
import { AuthContext } from "../../store/AuthProvider";
import JobSeeker from "./JobSeeker";
import Employer from "./Employer";

const MyApplications = () => {
  const { user } = useContext(AuthContext);
  return (
    <>{user && user.role === "Job Seeker" ? <JobSeeker /> : <Employer />}</>
  );
};

export default MyApplications;
