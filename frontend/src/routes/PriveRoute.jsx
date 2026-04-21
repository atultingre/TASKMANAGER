import React from "react";
import { Outlet } from "react-router-dom";

const PriveRoute = ({ allowedRoles }) => {
  return <Outlet />;
};

export default PriveRoute;
