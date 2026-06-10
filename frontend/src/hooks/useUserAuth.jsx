import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export const useUserAuth = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserAuth must be used inside UserProvider");
  }

  const { user, loading, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return; // Wait for loading to finish
    if (user) return;

    if (!user) {
      clearUser(); // Clear any existing user data
      navigate("/login");
    }
  }, [user, loading, clearUser, navigate]);

  
};
