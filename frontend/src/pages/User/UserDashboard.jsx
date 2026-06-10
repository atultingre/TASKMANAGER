import React from "react";
import { useUserAuth } from "../../hooks/useUserAuth";

const UserDashboard = () => {
  useUserAuth(); // This will handle authentication and redirection if not authenticated
  return <div>UserDashboard</div>;
};

export default UserDashboard;
