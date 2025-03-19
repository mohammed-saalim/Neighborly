import React, { useEffect, useState } from "react";
import { 
  Grid, Card, CardContent, Typography, Button, CircularProgress, 
  List, ListItem, ListItemText, Box, Avatar, Switch, Divider, Paper, Stack 
} from "@mui/material";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TaskerDashboardPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [jobRequests, setJobRequests] = useState([]);
  const [ongoingJobs, setOngoingJobs] = useState([]);
  const [completedJobs, setCompletedJobs] = useState([]);
  const [available, setAvailable] = useState(true);
  const workerToken = localStorage.getItem("workerToken");

  const API_JOB_REQUESTS = "http://localhost:5083/api/jobrequest/worker";
  const API_ONGOING_JOBS = "http://localhost:5083/api/jobrequests/worker/inprogress";
  const API_COMPLETED_JOBS = "http://localhost:5083/api/jobrequests/worker/completed";

  useEffect(() => {
    if (!workerToken) {
      alert("Please log in as a worker.");
      navigate("/login-jobs");
      return;
    }

    const fetchJobRequests = async () => {
      try {
        const response = await axios.get(API_JOB_REQUESTS, {
          headers: { Authorization: `Bearer ${workerToken}` },
        });
        const filteredJobs = response.data.filter(job => job.jobPostStatus === "unfilled");
        setJobRequests(filteredJobs);
      } catch (error) {
        console.error("Error fetching job requests:", error);
      }
    };

    const fetchOngoingJobs = async () => {
      try {
        const response = await axios.get(API_ONGOING_JOBS, {
          headers: { Authorization: `Bearer ${workerToken}` },
        });
        setOngoingJobs(response.data);
      } catch (error) {
        console.error("Error fetching ongoing jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCompletedJobs = async () => {
      try {
        const response = await axios.get(API_COMPLETED_JOBS, {
          headers: { Authorization: `Bearer ${workerToken}` },
        });
        setCompletedJobs(response.data);
      } catch (error) {
        console.error("Error fetching completed jobs:", error);
      }
    };

    fetchJobRequests();
    fetchOngoingJobs();
    fetchCompletedJobs();
  }, [workerToken, navigate]);

  const handleAccept = async (taskId) => {
    try {
      await axios.put(`http://localhost:5083/api/jobrequests/${taskId}/accept`, {}, {
        headers: { Authorization: `Bearer ${workerToken}` },
      });
      alert("✅ Job Accepted!");
      setJobRequests((prevJobs) => prevJobs.filter(job => job.id !== taskId));
    } catch (error) {
      console.error("Error accepting job:", error);
      alert("❌ Failed to accept job.");
    }
  };

  const handleReject = async (taskId) => {
    try {
      await axios.put(`http://localhost:5083/api/jobrequests/${taskId}/reject`, {}, {
        headers: { Authorization: `Bearer ${workerToken}` },
      });
      alert("❌ Job Rejected!");
      setJobRequests((prevJobs) => prevJobs.filter(job => job.id !== taskId));
    } catch (error) {
      console.error("Error rejecting job:", error);
      alert("❌ Failed to reject job.");
    }
  };

  if (loading) {
    return <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />;
  }

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, padding: "20px", minHeight: "100vh" }}>
      <Grid container spacing={3}>
        
        {/* Left Section: Task Requests & Ongoing Jobs */}
        <Grid item xs={12} md={8}>
          
          {/* Task Requests */}
          <Card sx={{ mb: 3, p: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="primary">
                Task Requests
              </Typography>
              <Divider sx={{ my: 1 }} />
              {jobRequests.length === 0 ? (
                <Typography>No new job requests.</Typography>
              ) : (
                jobRequests.map((job) => (
                  <Paper key={job.id} sx={{ p: 3, mb: 2 }}>
                    <Typography variant="h6" fontWeight="bold">📌 Job Request</Typography>
                    <Typography><b>Client:</b> {job.fullName}</Typography>
                    <Typography><b>Contact:</b> {job.contact}</Typography>
                    <Typography><b>Address:</b> {job.address}</Typography>
                    <Typography><b>Job Description:</b> {job.jobDescription}</Typography>
                    <Typography><b>Date & Time:</b> {new Date(job.jobDateTime).toLocaleString()}</Typography>
                    
                    {/* ✅ Buttons Now Aligned Side by Side */}
                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                      <Button variant="contained" color="success" onClick={() => handleAccept(job.id)}>
                        Accept
                      </Button>
                      <Button variant="contained" color="error" onClick={() => handleReject(job.id)}>
                        Reject
                      </Button>
                    </Stack>
                  </Paper>
                ))
              )}
            </CardContent>
          </Card>

          {/* Ongoing Jobs */}
          <Card sx={{ p: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="primary">
                Ongoing Jobs
              </Typography>
              <Divider sx={{ my: 1 }} />
              {ongoingJobs.length === 0 ? (
                <Typography>No ongoing jobs.</Typography>
              ) : (
                <List>
                  {ongoingJobs.map((job) => (
                    <ListItem key={job.id}>
                      <ListItemText 
                        primary={`${job.fullName} - ${job.jobDescription}`} 
                        secondary={`Status: In Progress | ${new Date(job.jobDateTime).toLocaleString()}`} 
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>

          {/* ✅ NEW SECTION: Completed Jobs */}
        <Card sx={{ mb: 3, p: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" color="primary">
              Completed Jobs
            </Typography>
            <Divider sx={{ my: 1 }} />
            {completedJobs.length === 0 ? (
              <Typography>No completed jobs.</Typography>
            ) : (
              <List>
                {completedJobs.map((job) => (
                  <ListItem key={job.id}>
                    <ListItemText 
                      primary={`${job.fullName} - ${job.jobDescription}`} 
                      secondary={`Completed on: ${new Date(job.jobDateTime).toLocaleString()}`} 
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </CardContent>
        </Card>


        </Grid>

        {/* Right Section: Profile, Earnings & Notifications */}
        <Grid item xs={12} md={4}>
          
          {/* Tasker Profile */}
          <Card sx={{ mb: 3, p: 2 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar sx={{ width: 80, height: 80, mr: 2, backgroundColor: theme.palette.primary.main }}>
                  T
                </Avatar>
                <Box>
                  <Typography variant="h6">Tasker Name</Typography>
                  <Typography variant="body2">⭐ 4.8 (120 reviews)</Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="body2">Availability:</Typography>
                <Switch checked={available} onChange={() => setAvailable(!available)} />
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <Button variant="outlined" color="primary" onClick={() => navigate(`/tasker-profile/1`)}>
                  View Full Profile
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Earnings Summary */}
          <Card sx={{ mb: 3, p: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="primary">
                Earnings Summary
              </Typography>
              <Typography variant="body1">Total Earnings: <strong>$1200</strong></Typography>
              <Typography variant="body1">Completed Jobs: <strong>15</strong></Typography>
              <Typography variant="body1">Next Payout: <strong>March 25</strong></Typography>
            </CardContent>
          </Card>

        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskerDashboardPage;
