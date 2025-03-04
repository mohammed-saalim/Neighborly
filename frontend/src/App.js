import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./styles/theme"; // Ensure you have a theme file for Material UI
import Navbar from "./components/common/Navbar"; // Navbar component with the login button
import Footer from "./components/common/Footer"; // Footer component
import Home from "./pages/Home"; // Home page
import Login from "./pages/Login"; // Customer Login page
import Signup from "./pages/Signup"; // Signup page
import PostJob from "./pages/PostJob"; // Post job page
import LoginJobs from "./pages/LoginJobs"; // Worker Login Page
import TaskerDashboardPage from "./pages/TaskerDashboardPage"; // Tasker Dashboard Page

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures consistent baseline styles across browsers */}
      <Router>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Navbar /> {/* Navbar with Login / Signup button */}
          <main style={{ flex: 1 }}>
            {/* Define all the routes */}
            <Routes>
              <Route path="/" element={<Home />} /> {/* Default route for the homepage */}
              <Route path="/login" element={<Login />} /> {/* Customer Login route */}
              <Route path="/signup" element={<Signup />} /> {/* Signup route */}
              <Route path="/post-job" element={<PostJob />} /> {/* Post job route */}
              <Route path="/login-jobs" element={<LoginJobs />} /> {/* Worker Login route */}
              <Route path="/tasker-dashboard" element={<TaskerDashboardPage />} /> {/* Tasker Dashboard route */}
            </Routes>
          </main>
          <Footer /> {/* Footer component, remains at the bottom */}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
