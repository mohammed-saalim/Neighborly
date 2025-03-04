import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Avatar,
    Grid,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Slider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineDot } from "@mui/lab";
import { Star, LocalShipping } from "@mui/icons-material";
import "../styles/Recommendations.css";

const taskersData = [
    {
        id: 1,
        name: "Cesar A.",
        price: 66.07,
        rating: 5.0,
        reviews: 758,
        description:
            "Over 1,000 moves and 700 5-star reviews. I provide efficient moving services with all necessary tools.",
        profilePic: "https://randomuser.me/api/portraits/men/10.jpg",
        type: "Elite",
        vehicles: "Moving Truck, Van, SUV",
    },
    {
        id: 2,
        name: "Won K.",
        price: 72.99,
        rating: 4.9,
        reviews: 882,
        description:
            "10+ years of experience in moving and delivery services. Fully equipped with a large van.",
        profilePic: "https://randomuser.me/api/portraits/men/20.jpg",
        type: "Elite",
        vehicles: "Full-size Van, Car",
    },
    {
        id: 3,
        name: "Samantha R.",
        price: 59.50,
        rating: 4.8,
        reviews: 645,
        description:
            "Experienced mover and furniture assembler. Quick and reliable with all necessary tools.",
        profilePic: "https://randomuser.me/api/portraits/women/15.jpg",
        type: "Pro",
        vehicles: "Pickup Truck, Van",
    },
    {
        id: 4,
        name: "David L.",
        price: 80.00,
        rating: 5.0,
        reviews: 950,
        description:
            "Specialized in long-distance moving and packing services. Over 5 years of experience.",
        profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
        type: "Elite",
        vehicles: "Moving Truck, Van",
    },
    {
        id: 5,
        name: "Angela M.",
        price: 45.00,
        rating: 4.7,
        reviews: 520,
        description:
            "Reliable and professional home cleaning services. Great attention to detail.",
        profilePic: "https://randomuser.me/api/portraits/women/30.jpg",
        type: "Standard",
        vehicles: "Car",
    },
    {
        id: 6,
        name: "Kevin B.",
        price: 70.25,
        rating: 4.9,
        reviews: 830,
        description:
            "Expert handyman and electrical repair services. Quick and efficient.",
        profilePic: "https://randomuser.me/api/portraits/men/41.jpg",
        type: "Pro",
        vehicles: "Van, Car",
    },
    {
        id: 7,
        name: "Jessica T.",
        price: 55.75,
        rating: 4.8,
        reviews: 680,
        description:
            "Helping customers with packing, moving, and furniture assembly. Organized and efficient.",
        profilePic: "https://randomuser.me/api/portraits/women/45.jpg",
        type: "Standard",
        vehicles: "SUV",
    },
    {
        id: 8,
        name: "Michael H.",
        price: 95.00,
        rating: 5.0,
        reviews: 1200,
        description:
            "Elite mover specializing in heavy lifting and long-distance moving.",
        profilePic: "https://randomuser.me/api/portraits/men/50.jpg",
        type: "Elite",
        vehicles: "Moving Truck",
    },
    {
        id: 9,
        name: "Emily W.",
        price: 60.00,
        rating: 4.7,
        reviews: 450,
        description:
            "Pet-friendly moving and delivery services. Great for handling fragile items.",
        profilePic: "https://randomuser.me/api/portraits/women/55.jpg",
        type: "Pro",
        vehicles: "Van, Car",
    },
    {
        id: 10,
        name: "Chris D.",
        price: 52.50,
        rating: 4.6,
        reviews: 400,
        description:
            "Affordable and fast delivery services for furniture and small packages.",
        profilePic: "https://randomuser.me/api/portraits/men/60.jpg",
        type: "Standard",
        vehicles: "Car, Pickup Truck",
    },

];

function Recommendations() {
    const theme = useTheme();
    const [taskers, setTaskers] = useState(taskersData);
    const [sortBy, setSortBy] = useState("recommended");
    const [priceRange, setPriceRange] = useState([10, 150]);

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
        let sortedTaskers = [...taskers];

        if (event.target.value === "priceLow") {
            sortedTaskers.sort((a, b) => a.price - b.price);
        } else if (event.target.value === "priceHigh") {
            sortedTaskers.sort((a, b) => b.price - a.price);
        } else if (event.target.value === "rating") {
            sortedTaskers.sort((a, b) => b.rating - a.rating);
        }

        setTaskers(sortedTaskers);
    };

    return (
        <Box className="recommendations-container" sx={{ backgroundColor: theme.palette.background.default }}>
            {/* Title - Now Styled Properly */}
            <Typography variant="h4" className="recommendations-title" sx={theme.typography.h4}>
                Browse Taskers & Prices
            </Typography>



            <Grid container spacing={4}>
                {/* Filters Sidebar */}
                <Grid item xs={12} md={3} className="filters-container">
                    <Typography variant="h6" className="filters-title">Filters</Typography>

                    {/* Sort Dropdown with Spacing */}
                    <FormControl fullWidth className="sort-dropdown">
                        <InputLabel>Sort by:</InputLabel>
                        <Select value={sortBy} onChange={handleSortChange}>
                            <MenuItem value="recommended">Recommended</MenuItem>
                            <MenuItem value="priceLow">Price: Low to High</MenuItem>
                            <MenuItem value="priceHigh">Price: High to Low</MenuItem>
                            <MenuItem value="rating">Highest Rated</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Price Range with More Spacing */}
                    <Box className="filter-section">
                        <Typography className="filter-label">Price Range</Typography>
                        <Slider
                            value={priceRange}
                            onChange={(event, newValue) => setPriceRange(newValue)}
                            valueLabelDisplay="auto"
                            min={10}
                            max={150}
                        />
                    </Box>
                </Grid>

                {/* Taskers List */}
                <Grid item xs={12} md={9}>
                    {taskers.map((tasker) => (
                        <Card key={tasker.id} className="recommendation-card">
                            <Avatar src={tasker.profilePic} className="recommendation-avatar" />
                            <CardContent className="tasker-info">
                                <Typography variant="h6" className="recommendation-name" sx={theme.typography.h6}>
                                    {tasker.name}
                                </Typography>
                                <Typography variant="body2" className="recommendation-rating">
                                    <Star fontSize="small" color="warning" /> {tasker.rating} ({tasker.reviews} reviews)
                                </Typography>
                                <Typography variant="body1" className="recommendation-price">
                                    ${tasker.price}/hr
                                </Typography>
                                <Typography variant="body2" className="recommendation-description">
                                    {tasker.description}
                                </Typography>
                                <Typography variant="body2" className="recommendation-vehicles">
                                    <LocalShipping fontSize="small" /> {tasker.vehicles}
                                </Typography>
                                <Button variant="contained" className="recommendation-button">
                                    Select & Continue
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
}

export default Recommendations;
