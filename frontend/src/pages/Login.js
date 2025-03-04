import React, { useState } from "react";
import { Button, TextField, Typography, Box, Paper } from "@mui/material";
import "./Login.css"; // Ensure the CSS file is included

const Login = () => {
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#f0f0f0", // Full light gray background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%", // Full width coverage
      }}
    >
      {/* Login/Signup Form */}
      <Paper
        sx={{
          width: "400px",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Neighborly
        </Typography>
        <Typography variant="h6" gutterBottom>
          {isSignup ? "Sign Up" : "Login"}
        </Typography>

        {/* Form Fields */}
        <form>
          {isSignup && (
            <TextField fullWidth label="Full Name" margin="normal" required variant="outlined" />
          )}
          <TextField fullWidth label="Email" type="email" margin="normal" required variant="outlined" />
          <TextField fullWidth label="Password" type="password" margin="normal" required variant="outlined" />

          {/* Signup Only Fields */}
          {isSignup && (
            <>
              <TextField fullWidth label="Job Role" margin="normal" required variant="outlined" select SelectProps={{ native: true }}>
                <option value="Customer">Customer</option>
                <option value="Plumber">Plumber</option>
                <option value="Electrician">Electrician</option>
                <option value="Carpenter">Carpenter</option>
                <option value="Painter">Painter</option>
                <option value="Other">Other</option>
              </TextField>
              <TextField fullWidth label="Experience (Years)" type="number" margin="normal" required variant="outlined" />
              <TextField fullWidth label="Skills" margin="normal" required variant="outlined" />
            </>
          )}

          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            {isSignup ? "Sign Up" : "Login"}
          </Button>
        </form>

        {/* Toggle between Login and Signup */}
        <Typography
          variant="body2"
          color="primary"
          sx={{ cursor: "pointer", mt: 2 }}
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
