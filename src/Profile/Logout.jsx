import React from "react";
import { auth } from "./firebaseConfig";
import { signOut } from "firebase/auth";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); 
    } catch (error) {
      console.error("Logout Error: ", error.message);
    }
  };

  return (
    <div>
      <Typography variant="h4">Logout</Typography>
      <Button onClick={handleLogout} variant="contained" color="primary">
        Log Out
      </Button>
    </div>
  );
};

export default Logout;
