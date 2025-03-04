import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import "./Login.css"; // Ensure the CSS file is included

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);

  const toggleAuthMode = () => {
    setIsSignup(!isSignup);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#f5f5f5", // Light background to ensure form stands out
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* Center "Neighborly" above the form */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Horizontally center the text
          width: "100%",
          position: "relative", // To allow positioning of the title
          top: "-50px",  // Adjust this value to move it closer to the form
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#333", // Dark color for the text
            textAlign: "center",
          }}
        >
          Neighborly
        </Typography>
      </Box>

      {/* Login form */}
      <Box
        sx={{
          padding: "30px",
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Slight transparency for readability
          borderRadius: "8px",
          textAlign: "center",
          width: "100%",
          maxWidth: "350px", // Restrict form width
        }}
      >
        <Typography variant="h5" gutterBottom>
          {isSignup ? "Sign Up" : "Login"}
        </Typography>
        <form>
          {isSignup && (
            <div>
              <TextField
                fullWidth
                label="Full Name"
                margin="normal"
                required
                variant="outlined"
              />
            </div>
          )}
          <div>
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="normal"
              required
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              required
              variant="outlined"
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#007bff",
              color: "white",
            }}
          >
            {isSignup ? "Sign Up" : "Login"}
          </Button>
        </form>
        <Typography
          variant="body2"
          color="primary"
          sx={{ cursor: "pointer", mt: 2 }}
          onClick={toggleAuthMode}
        >
          {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;

