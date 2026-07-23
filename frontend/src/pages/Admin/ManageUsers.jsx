import { useEffect, useState } from "react";
import { LuFileSpreadsheet } from "react-icons/lu";
import { toast } from "react-toastify";
import UserCard from "../../components/Cards/UserCard";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      if (response.data?.length > 0) {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // download task report
  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_USERS, {
        responseType: "blob",
      });

      // Create Excel blob
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Create temporary URL
      const url = window.URL.createObjectURL(blob);

      // Create temporary download link
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "Users_Report.xlsx");

      // Add link to DOM
      document.body.appendChild(link);

      // Trigger download
      link.click();

      // Remove temporary link
      link.remove();

      // Release temporary URL
      window.URL.revokeObjectURL(url);

      toast.success("User report downloaded successfully.");
    } catch (error) {
      console.error("Error downloading user report:", error);

      toast.error("Failed to download user report. Please try again.");
    }
  };

  
  useEffect(() => {
    getAllUsers();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Team Members">
      <div className="mt-5 mb-10">
        <div className="flex md:flex-row md:items-center justify-between">
          <h2 className="text-xl md:text-xl font-medium">Team Members</h2>
          <button
            className="flex md:flex download-btn"
            onClick={handleDownloadReport}
          >
            <LuFileSpreadsheet className="text-lg" />
            Download Report
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {allUsers?.map((user) => (
            <UserCard key={user._id} userInfo={user} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageUsers;
