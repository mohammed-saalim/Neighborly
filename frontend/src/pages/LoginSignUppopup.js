import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

const LoginSignupPopup = ({ handleClose }) => {
  const [isSignup, setIsSignup] = useState(false);

  const toggleAuthMode = () => {
    setIsSignup(!isSignup);
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "white", borderRadius: 2, width: 400 }}>
      <Typography variant="h5" gutterBottom>
        {isSignup ? "Sign Up" : "Login"}
      </Typography>
      <form>
        {isSignup && (
          <TextField fullWidth label="Full Name" margin="normal" required />
        )}
        <TextField fullWidth label="Email" type="email" margin="normal" required />
        <TextField fullWidth label="Password" type="password" margin="normal" required />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          {isSignup ? "Sign Up" : "Login"}
        </Button>
      </form>
      <Typography
        variant="body2"
        color="primary"
        sx={{ cursor: "pointer", mt: 2, textAlign: "center" }}
        onClick={toggleAuthMode}
      >
        {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
      </Typography>
      <Button onClick={handleClose} sx={{ mt: 2 }} color="secondary" fullWidth>
        Close
      </Button>
    </Box>
  );
};

export default LoginSignupPopup;
