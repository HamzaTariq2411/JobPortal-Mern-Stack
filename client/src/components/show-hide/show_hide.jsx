import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ShowHide = ({ children }) => {
  const [showModel, setShowModel] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup") {
      setShowModel(false);
    } else {
      setShowModel(true);
    }
  }, [location]);
  return <div>{showModel && children}</div>;
};

export default ShowHide;
