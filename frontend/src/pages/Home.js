import React from "react";
import HeroSection from "../components/HeroSection";
import { Button } from "@mui/material";  // Import Button from MUI
import { Link } from "react-router-dom";  // Import Link from react-router-dom

function Home() {
  return (
    <div>
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        {/* Link the button to the /login route */}
        <Link to="/login">
          <Button variant="contained" color="primary">
            Login / Signup
          </Button>
        </Link>
      </div>
      <HeroSection />
    </div>
  );
}

export default Home;