import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import PanToolIcon from "@mui/icons-material/PanTool"; 
import { useTheme } from "@mui/material/styles"; // Import theme hook

function Navbar() {
  const theme = useTheme(); // Access global theme

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.background.secondary, padding: "8px 15px" }}>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", color: theme.palette.text.primary }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: theme.typography.fontFamily,
              fontWeight: 700,
              fontSize: "38px", 
              letterSpacing: 0.5,
              fontStyle: "italic", 
            }}
          >
            N
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mx: 0.1 }}> 
            <PanToolIcon sx={{ fontSize: 26, color: theme.palette.text.primary, verticalAlign: "middle" }} />
          </Box>

          <Typography
            variant="h5"
            sx={{
              fontFamily: theme.typography.fontFamily,
              fontSize: "21px", 
              fontWeight: 500,
              position: "relative", 
              top: "5px", 
            }}
          >
            ly
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
