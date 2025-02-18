import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007bff",  // Blue (Find Help button, hover effects)
    },
    secondary: {
      main: "#ff5733",  // Orange (Help Someone button)
    },
    background: {
      default: "#f5f5f5", // ✅ Light grayish-white background (not too white)
      secondary: "#333333", // ✅ Dark gray for Navbar & Footer
    },
    text: {
      primary: "#B0B0B0", // ✅ Lighter gray text (for secondary elements)
      secondary: "#000000", // ✅ Black text for readability on light backgrounds
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: {
      fontFamily: "'Playfair Display', serif", // ✅ Using Playfair Display for Headers
      fontWeight: 700,
      letterSpacing: "1px",
      textAlign: "center",
      color: "black",
    },
  },
});

export default theme;
