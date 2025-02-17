import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./styles/theme";  // Import MUI theme
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Recommendations from "./pages/Recommendations"; // ✅ Import Recommendations Page

function App() {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Ensures consistent baseline styles */}
        <Router>
          <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Navbar />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/recommendations" element={<Recommendations />} /> {/* ✅ Added Route */}
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
  );
}

export default App;