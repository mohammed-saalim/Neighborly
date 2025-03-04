import React, { useState } from "react";
import { Button, TextField, Typography, Box, Paper } from "@mui/material";
import "./LoginJobs.css"; // Import CSS file

const LoginJobs = () => {
  const [isSignup, setIsSignup] = useState(false); // Toggle between login & signup

  return (
    <Box className="login-jobs-container">
      <Paper className="worker-auth-box">
        <Typography variant="h4">Neighborly Jobs</Typography>
        <Typography variant="h6">
          {isSignup ? "Worker Sign Up" : "Worker Login"}
        </Typography>

        <form>
          {isSignup && (
            <>
              <TextField fullWidth label="Full Name" margin="normal" required variant="outlined" />
              <TextField fullWidth label="Job Role" margin="normal" required variant="outlined" select SelectProps={{ native: true }}>
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
          <TextField fullWidth label="Email" type="email" margin="normal" required variant="outlined" />
          <TextField fullWidth label="Password" type="password" margin="normal" required variant="outlined" />

          <Button variant="contained" color="warning" fullWidth sx={{ mt: 2 }}>
            {isSignup ? "Sign Up" : "Login"}
          </Button>
        </form>

        <Typography
          variant="body2"
          color="primary"
          sx={{ cursor: "pointer", mt: 2, textAlign: "center" }}
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Already have an account? Login" : "New worker? Sign Up"}
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginJobs;
