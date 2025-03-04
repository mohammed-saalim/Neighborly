import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./styles/theme"; // Ensure this is correctly imported

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PostJob from "./pages/PostJob";
import LoginJobs from "./pages/LoginJobs";
import TaskerDashboardPage from "./pages/TaskerDashboardPage";
import Recommendations from "./pages/Recommendations"; // Import Recommendations page

function App() {
  return (
      <ThemeProvider theme={theme}> {/* Ensure ThemeProvider wraps everything */}
        <CssBaseline />
        <Router>
          <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/post-job" element={<PostJob />} />
                <Route path="/login-jobs" element={<LoginJobs />} />
                <Route path="/tasker-dashboard" element={<TaskerDashboardPage />} />
                <Route path="/recommendations" element={<Recommendations />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
  );
}

export default App;
