import React, { useState } from "react";
import { Card, CardContent, Typography, Switch, Avatar, Button, Box } from "@mui/material";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TaskerProfile = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [available, setAvailable] = useState(true);

  // Dummy Data (Replace with API Data later)
  const tasker = {
    id: 1, // Placeholder tasker ID
    name: "Alex T.",
    rating: 4.8,
    reviews: 120,
    bio: "Experienced professional with over 5 years in home services.",
    image: "/assets/tasker-profile.jpg",
  };

  return (
    <Card className="tasker-profile-card" sx={{ mb: 2, p: 2 }}>
      <CardContent>
        {/* Profile Image & Name */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar src={tasker.image} alt={tasker.name} sx={{ width: 80, height: 80, mr: 2, backgroundColor: theme.palette.primary.main }} />
          <Box>
            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>{tasker.name}</Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>⭐ {tasker.rating} ({tasker.reviews} reviews)</Typography>
          </Box>
        </Box>

        {/* Availability Toggle */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="body2">Availability:</Typography>
          <Switch checked={available} onChange={() => setAvailable(!available)} />
        </Box>

        {/* View Full Profile Button */}
        <Box sx={{ textAlign: "center" }}>
          <Button variant="outlined" color="primary" onClick={() => navigate(`/tasker-profile/${tasker.id}`)}>
            View Full Profile
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskerProfile;
