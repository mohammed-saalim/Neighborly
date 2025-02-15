import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { Button, Box } from "@mui/material";

const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      {isLogin ? <Login /> : <Signup />}
      <Button onClick={toggleForm} sx={{ position: "absolute", bottom: 20 }}>
        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
      </Button>
    </Box>
  );
};

export default App;
