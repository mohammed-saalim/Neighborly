import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // Import theme hook

const Footer = () => {
  const theme = useTheme(); // Access global theme

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.background.secondary, 
        color: theme.palette.text.primary,
        padding: "20px",
        textAlign: "center",
      }}
    >
      {/* Logo & Tagline */}
      <Typography variant="h5" fontWeight="bold">
        Neighborly
      </Typography>
  

      {/* Quick Links */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "10px" }}>
        <Link to="/about" style={{ color: theme.palette.text.primary, textDecoration: "none" }}>About</Link>
        <Link to="/contact" style={{ color: theme.palette.text.primary, textDecoration: "none" }}>Contact</Link>
        <Link to="/terms" style={{ color: theme.palette.text.primary, textDecoration: "none" }}>Terms of Service</Link>
        <Link to="/privacy" style={{ color: theme.palette.text.primary, textDecoration: "none" }}>Privacy Policy</Link>
      </Box>

      {/* Copyright */}
      <Typography variant="body2" sx={{ marginTop: "10px" }}>
        © {new Date().getFullYear()} Neighborly. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
