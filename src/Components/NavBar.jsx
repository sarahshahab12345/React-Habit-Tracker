import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const NavBar = () => {
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#2C3E50",
        boxShadow: "0 3px 5px 2px rgba(44, 62, 80, .3)",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            color: "#ffffff",
            "&:hover": { color: "#BDC3C7" },
            transition: "color 0.3s ease",
          }}
        >
          Habit Tracker
        </Typography>

        <Box sx={{ display: "flex" }}>
          <Button
            component={Link}
            to="/add-habit"
            sx={{
              color: location.pathname === "/add-habit" ? "#BDC3C7" : "#ffffff",
              fontWeight: "bold",
              mx: 1,
              "&:hover": { color: "#BDC3C7" },
              borderBottom:
                location.pathname === "/add-habit"
                  ? "2px solid #BDC3C7"
                  : "2px solid transparent",
              transition: "color 0.3s ease, border-bottom 0.3s ease",
            }}
          >
            Add New Habit
          </Button>
          <Button
            component={Link}
            to="/view-weekly"
            sx={{
              color:
                location.pathname === "/view-weekly" ? "#BDC3C7" : "#ffffff",
              fontWeight: "bold",
              mx: 1,
              "&:hover": { color: "#BDC3C7" },
              borderBottom:
                location.pathname === "/view-weekly"
                  ? "2px solid #BDC3C7"
                  : "2px solid transparent",
              transition: "color 0.3s ease, border-bottom 0.3s ease",
            }}
          >
            View Weekly
          </Button>
        </Box>

        <Button
          onClick={handleLogout}
          sx={{
            color: "#ffffff",
            fontWeight: "bold",
            mx: 1,
            "&:hover": { color: "#BDC3C7" },
            borderBottom: "2px solid transparent",
            transition: "color 0.3s ease, border-bottom 0.3s ease",
          }}
          aria-label="Logout"
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
