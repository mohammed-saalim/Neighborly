import React from "react";
import { Box, Typography, Button } from "@mui/material";
import "../styles/HeroSection.css"; 
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <Box className="hero-section">
      <Typography variant="h2" className="hero-title">
        Welcome to Neighborly
      </Typography>

      <Typography variant="h5" className="hero-subtitle">
        Find trusted local professionals for everyday tasks, home services, and jobs—all in one place.
      </Typography>

      {/* Buttons */}
      <Box className="hero-buttons">
        <Button variant="contained" color="primary" onClick={() => navigate("/post-job")}>
          Find Help
        </Button>
        <Button variant="outlined" color="secondary">
          Help Someone
        </Button>
      </Box>
    </Box>
  );
}

export default HeroSection;
