import React, { useState } from "react";
import { Box, Container, Typography, Grid, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import FiltersSidebar from "../components/FiltersSidebar";
import RecommendationsList from "../components/TaskerList";

// Dummy Tasker Data (Dynamic)
const taskers = [
    { id: 1, name: "Ashland T.", field: "Moving", price: "$46.45/hr", rating: "5.0 (22 reviews)", tasksCompleted: 28, description: "2 years of experience, own supplies and a truck.", image: "https://via.placeholder.com/100" },
    { id: 2, name: "John L.", field: "Moving", price: "$66.07/hr", rating: "5.0 (857 reviews)", tasksCompleted: 1085, description: "10 years of experience, moving blankets, shrink wrap included.", image: "https://via.placeholder.com/100" },
    { id: 3, name: "Erin K.", field: "Cleaning", price: "$30.00/hr", rating: "4.9 (120 reviews)", tasksCompleted: 215, description: "Deep cleaning expert, eco-friendly products.", image: "https://via.placeholder.com/100" },
    { id: 4, name: "Mariam M.", field: "Electrical Work", price: "$72.26/hr", rating: "5.0 (1307 reviews)", tasksCompleted: 1667, description: "Certified electrician, 1,500+ tasks completed.", image: "https://via.placeholder.com/100" },
    { id: 5, name: "Oscar D.", field: "Handyman", price: "$60.00/hr", rating: "4.8 (600 reviews)", tasksCompleted: 860, description: "General repairs, mounting, and furniture assembly.", image: "https://via.placeholder.com/100" },
    { id: 6, name: "Emily W.", field: "Pet Services", price: "$25.00/hr", rating: "5.0 (80 reviews)", tasksCompleted: 120, description: "Dog walking and pet sitting.", image: "https://via.placeholder.com/100" },
    { id: 7, name: "David R.", field: "Grocery Shopping", price: "$20.00/hr", rating: "4.9 (140 reviews)", tasksCompleted: 170, description: "Fast and efficient grocery delivery.", image: "https://via.placeholder.com/100" }
];

const FindTaskers = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const theme = useTheme();

    // Filter taskers based on search input
    const filteredTaskers = taskers.filter(tasker =>
        tasker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tasker.field.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box className="available-taskers-container" sx={{ padding: { xs: "20px", md: "40px" }, backgroundColor: theme.palette.background.default, minHeight: "100vh" }}>
            <Container maxWidth="lg">
                {/* Page Title */}
                <Typography variant="h3" sx={{ fontWeight: "bold", textAlign: "center", mb: 4, color: theme.palette.text.secondary }}>
                    Available Taskers
                </Typography>
                <Typography variant="body1" sx={{ color: theme.palette.text.primary, textAlign: "center", mb: 2 }}>
                    Filter and sort to find the right Tasker for your needs. View availability and request a date and time.
                </Typography>

                {/* Search Bar */}
                <Box className="search-bar-container" sx={{ maxWidth: "600px", margin: "0 auto 25px" }}>
                    <TextField
                        variant="outlined"
                        placeholder="Search for a tasker..."
                        fullWidth
                        className="search-bar"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                {/* Sidebar + Taskers List */}
                <Grid container spacing={4} mt={4}>
                    <Grid item xs={12} md={3}>
                        <FiltersSidebar />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <RecommendationsList taskers={filteredTaskers} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default FindTaskers;
