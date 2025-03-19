import React from "react";
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import PanToolIcon from "@mui/icons-material/PanTool";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Profile Icon
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken"); // Check if user is logged in

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.background.secondary, padding: "8px 15px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo Section */}
        <Box
          sx={{ display: "flex", alignItems: "center", color: theme.palette.text.primary, cursor: "pointer" }}
          onClick={() => navigate("/")} // Redirect to homepage
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: theme.typography.fontFamily,
              fontWeight: 700,
              fontSize: "38px",
              letterSpacing: 0.5,
              fontStyle: "italic",
              color: theme.palette.text.primary,
            }}
          >
            N
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mx: 0.1 }}>
            <PanToolIcon sx={{ fontSize: 26, color: theme.palette.text.primary, verticalAlign: "middle" }} />
          </Box>

          <Typography
            variant="h5"
            sx={{
              fontFamily: theme.typography.fontFamily,
              fontSize: "21px",
              fontWeight: 500,
              position: "relative",
              top: "5px",
              color: theme.palette.text.primary,
            }}
          >
            ly
          </Typography>
        </Box>

        {/* Profile Icon (Visible Only If Logged In) */}
        {userToken && (
          <IconButton onClick={() => navigate("/profile")} color="inherit">
            <AccountCircleIcon sx={{ fontSize: 32, color: theme.palette.text.primary }} />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
