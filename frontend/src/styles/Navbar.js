import React, { useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import LoginSignupPopup from "../LoginSignupPopup"; // Import LoginSignupPopup
import "./Navbar.css"; // Keep your existing styles

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <nav className="navbar">
      <div className="logo">My App</div>
      {/* Positioning the Login Button at the top right */}
      <div className="nav-links" style={{ position: "absolute", right: "20px", top: "20px" }}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Login / Signup
        </Button>
      </div>

      {/* Popup Modal for Login & Signup */}
      <Modal open={open} onClose={handleClose}>
        <Box className="popup-box">
          <LoginSignupPopup handleClose={handleClose} />
        </Box>
      </Modal>
    </nav>
  );
};

export default Navbar;