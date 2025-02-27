import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"; // Keep your existing Navbar styles

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" className="navbar">
      <Toolbar>
        {/* Left Side: Logo */}
        <Typography variant="h6" className="logo" onClick={() => navigate("/")}>
          Neighborly
        </Typography>

        {/* Right Side: Login / Signup */}
        <Box sx={{ marginLeft: "auto" }}>
          <Button variant="contained" color="primary" onClick={() => navigate("/dual-login")}>
            Login / Signup
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
