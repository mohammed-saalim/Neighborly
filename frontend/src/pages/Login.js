import React from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";

const Login = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5">
      <Paper elevation={3} sx={{ padding: 4, width: 350, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" mb={2}>
          taskrabbit
        </Typography>
        <TextField label="Email" fullWidth margin="normal" />
        <TextField label="Password" type="password" fullWidth margin="normal" />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </Paper>
    </Box>
  );
};

export default Login;

