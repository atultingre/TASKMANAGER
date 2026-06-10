import React from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";

const Dashboard = ({ children, activeMenu }) => {
  useUserAuth(); // This will handle authentication and redirection if not authenticated

  const { user } = useContext(UserContext);

  return <DashboardLayout>Dashboard</DashboardLayout>;
};

export default Dashboard;
