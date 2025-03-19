import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Avatar, Button, Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RecommendationsPage = () => {
  const [workers, setWorkers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5083/api/workers/recommendations") // ✅ Backend API for workers
      .then((response) => response.json())
      .then((data) => setWorkers(data))
      .catch((error) => console.error("Error fetching workers:", error));
  }, []);

  const handleViewProfile = (workerId) => {
    navigate(`/worker-profile/${workerId}`); // ✅ Redirect to worker profile
  };

  const handleSelectWorker = (workerId) => {
    navigate(`/job-request/${workerId}`); // ✅ Redirect to job request form
  };

  return (
    <Box sx={{ p: 5, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
        Available Workers
      </Typography>

      <Grid container spacing={3}>
        {workers.map((worker) => (
          <Grid item xs={12} sm={6} md={4} key={worker.id}>
            <Card sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar sx={{ width: 60, height: 60, mr: 2 }} />
                  <Box>
                    <Typography variant="h6" fontWeight="bold">{worker.fullName}</Typography>
                    <Typography variant="body2" color="gray">⭐ {worker.rating} / 5.0</Typography>
                  </Box>
                </Box>

                <Typography variant="body2" color="gray" sx={{ mb: 2 }}>
                  {worker.summary}
                </Typography>

                <Typography variant="body2"><b>💰 Hourly Rate:</b> ${worker.hourlyRate}/hr</Typography>
                <Typography variant="body2"><b>📍 Location:</b> {worker.address}</Typography>
                <Typography variant="body2"><b>✅ Completed Jobs:</b> {worker.completedJobs}</Typography>

                <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
                  <Button variant="outlined" color="primary" onClick={() => handleViewProfile(worker.id)}>
                    View Profile
                  </Button>
                  <Button variant="contained" color="success" onClick={() => handleSelectWorker(worker.id)}>
                    Select & Continue
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecommendationsPage;
