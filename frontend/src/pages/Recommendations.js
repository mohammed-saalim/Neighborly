import RecommendationsList from "../components/RecommendationsList";
import FiltersSidebar from "../components/FiltersSidebar";
import { Box, Typography, Grid } from "@mui/material";

const Recommendations = () => {
    const taskers = [
        {
            id: 1, name: "Ashland T.", price: "$46.45/hr", rating: "5.0 (22 reviews)", tasksCompleted: 28,
            vehicle: "Moving Truck, Minivan/SUV", description: "I have 2 years of experience and come with my own supplies and a truck.",
            review: "Fast & effective. Great communication, careful with items. Would definitely hire again.",
            image: "https://via.placeholder.com/100"
        },
        {
            id: 2, name: "John L.", price: "$66.07/hr", rating: "5.0 (857 reviews)", tasksCompleted: 1085,
            vehicle: "Full-size Van, Car", description: "⭐️⭐️⭐️⭐️⭐️ 10 years of experience, moving blankets, shrink wrap included.",
            review: "Excellent! Loved his help! Very efficient",
            image: "https://via.placeholder.com/100"
        },
        {
            id: 3, name: "Erin K.", price: "$98.07/hr", rating: "5.0 (85 reviews)", tasksCompleted: 116,
            vehicle: "Moving Truck, Full-size Van", description: "Two Guys!!! Mercedes Sprinter 15ft long, Best Price, Full service move.",
            review: "Excellent service. Would hire again.",
            image: "https://via.placeholder.com/100"
        },
        {
            id: 4, name: "Mariam M.", price: "$72.26/hr", rating: "5.0 (1307 reviews)", tasksCompleted: 1667,
            vehicle: "Moving Truck, Full-size Van", description: "Reliable, safe and fast. 1,500+ tasks completed, excellent reviews.",
            review: "Claudio was quick and responsive and did a great job with my move. 10/10!",
            image: "https://via.placeholder.com/100"
        },
        {
            id: 5, name: "Oscar D.", price: "$84.65/hr", rating: "5.0 (612 reviews)", tasksCompleted: 898,
            vehicle: "Moving Truck, Full-size Van, Pickup Truck", description: "10 years experience, full-service moving expert.",
            review: "Oscar made my move easy, thoughtful about small details. Would hire again!",
            image: "https://via.placeholder.com/100"
        }
    ];

    return (
        <Box sx={{ p: 6, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <Typography variant="h3" fontWeight="bold" textAlign="center" mb={4}>
                Browse Taskers & Prices
            </Typography>
            <Typography variant="body1" color="text.secondary" textAlign="center" mb={2}>
                Filter and sort to find your Tasker. Then view their availability to request your date and time.
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={3}>
                    <FiltersSidebar />
                </Grid>
                <Grid item xs={12} md={9}>
                    <RecommendationsList taskers={taskers} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Recommendations;
