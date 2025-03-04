import React, { useState } from "react";
import { Button, TextField, Typography, MenuItem, Box } from "@mui/material";
import "./WorkerLogin.css"; // New CSS file for styling

const WorkerLogin = () => {
  const [isSignup, setIsSignup] = useState(false);

  const toggleAuthMode = () => {
    setIsSignup(!isSignup);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {/* Center "Worker Login" above the form */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          position: "relative",
          top: "-50px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Worker Portal
        </Typography>
      </Box>

      {/* Login/Signup Form */}
      <Box
        sx={{
          padding: "30px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "8px",
          textAlign: "center",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          {isSignup ? "Worker Sign Up" : "Worker Login"}
        </Typography>
        <form>
          {isSignup && (
            <>
              <TextField
                fullWidth
                label="Full Name"
                margin="normal"
                required
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Job Role"
                margin="normal"
                required
                variant="outlined"
                select
              >
                <MenuItem value="Plumber">Plumber</MenuItem>
                <MenuItem value="Electrician">Electrician</MenuItem>
                <MenuItem value="Carpenter">Carpenter</MenuItem>
                <MenuItem value="Painter">Painter</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              <TextField
                fullWidth
                label="Experience (Years)"
                type="number"
                margin="normal"
                required
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Skills"
                margin="normal"
                required
                variant="outlined"
                helperText="E.g., Plumbing, Wiring, Woodwork"
              />
            </>
          )}
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            required
            variant="outlined"
          />
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#ff7f00",
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

export default WorkerLogin;
