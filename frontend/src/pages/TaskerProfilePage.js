import React, { useState, useEffect } from "react";
import { 
  Card, CardContent, Typography, Avatar, Chip, Box, Button, 
  TextField, IconButton, CircularProgress, Tabs, Tab, Divider, Paper, Switch 
} from "@mui/material";
import { useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";

const TaskerProfilePage = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [worker, setWorker] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [ongoingTasks, setOngoingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const API_PROFILE_URL = "http://localhost:5083/api/worker/profile";
  const API_ONGOING_TASKS = "http://localhost:5083/api/jobrequests/worker/inprogress";
  const API_COMPLETED_TASKS = "http://localhost:5083/api/jobrequests/worker/completed";

  useEffect(() => {
    const fetchWorkerProfile = async () => {
      try {
        const token = localStorage.getItem("workerToken");
        const response = await axios.get(API_PROFILE_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWorker(response.data);
      } catch (error) {
        console.error("Error fetching worker profile:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchOngoingTasks = async () => {
      try {
        const token = localStorage.getItem("workerToken");
        const response = await axios.get(API_ONGOING_TASKS, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOngoingTasks(response.data);
      } catch (error) {
        console.error("Error fetching ongoing tasks:", error);
      }
    };

    const fetchCompletedTasks = async () => {
      try {
        const token = localStorage.getItem("workerToken");
        const response = await axios.get(API_COMPLETED_TASKS, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCompletedTasks(response.data);
      } catch (error) {
        console.error("Error fetching completed tasks:", error);
      }
    };

    fetchWorkerProfile();
    fetchOngoingTasks();
    fetchCompletedTasks();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("workerToken");
      await axios.put(API_PROFILE_URL, worker, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  const handleChange = (e) => {
    setWorker({ ...worker, [e.target.name]: e.target.value });
  };

  const toggleAvailability = () => {
    setWorker({ ...worker, availability: !worker.availability });
  };

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setWorker({ ...worker, skills: [...worker.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  if (loading) {
    return <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />;
  }

  if (!worker) {
    return <Typography variant="h6" color="error" sx={{ textAlign: "center", mt: 5 }}>Failed to load profile.</Typography>;
  }

  return (
    <Box sx={{ backgroundColor: "#f4f6f8", padding: "40px", minHeight: "100vh" }}>
      <Card sx={{ maxWidth: 750, margin: "auto", p: 4, boxShadow: 5, borderRadius: "16px", background: "white" }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" color="primary" align="center" sx={{ mb: 3 }}>
            Tasker Profile
          </Typography>

          {/* Tabs */}
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} centered>
            <Tab label="Profile" />
            <Tab label="Ongoing Tasks" />
            <Tab label="Completed Tasks" />
          </Tabs>

          {/* Profile Tab */}
          {activeTab === 0 && (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h5" fontWeight="bold" color="primary">Profile Information</Typography>
                <IconButton onClick={() => setEditing(!editing)} color="primary">
                  <EditIcon />
                </IconButton>
              </Box>

              {/* Profile Details - FIXED Alignment */}
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
                <Avatar src={worker.image || "/assets/default-avatar.png"} alt={worker.fullName} 
                        sx={{ width: 100, height: 100, border: "3px solid #1976d2", mb: 1 }} />
                {editing ? (
                  <TextField 
                    name="fullName" 
                    value={worker.fullName} 
                    onChange={handleChange} 
                    variant="outlined" 
                    size="small" 
                    sx={{ textAlign: "center", mt: 1 }} 
                  />
                ) : (
                  <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>{worker.fullName}</Typography>
                )}
                <Typography variant="body2" color="gray">⭐ {worker.rating} ({worker.completedJobs} jobs completed)</Typography>
              </Box>

              {/* Editable Fields */}
              <Typography variant="body2" fontWeight="bold" color="primary">Bio:</Typography>
              {editing ? (
                <TextField name="summary" value={worker.summary} onChange={handleChange} fullWidth multiline rows={2} sx={{ mb: 2 }} />
              ) : (
                <Typography variant="body1" sx={{ color: "gray", mb: 2 }}>{worker.summary}</Typography>
              )}

              {/* Additional Editable Fields */}
              <Typography variant="body2" color="gray">📍 Location: {editing ? <TextField name="address" value={worker.address} onChange={handleChange} fullWidth size="small"/> : worker.address}</Typography>
              <Typography variant="body2" color="gray">💰 Hourly Rate: {editing ? <TextField name="hourlyRate" value={worker.hourlyRate} onChange={handleChange} fullWidth size="small"/> : `$${worker.hourlyRate}/hr`}</Typography>
              <Typography variant="body2" color="gray">📧 Contact: {editing ? <TextField name="contact" value={worker.contact} onChange={handleChange} fullWidth size="small"/> : worker.contact}</Typography>

              {/* Availability Toggle */}
              <Typography variant="body2" color="gray">🟢 Availability: 
                {editing ? (
                  <Switch checked={worker.availability} onChange={toggleAvailability} />
                ) : (
                  worker.availability ? " Available" : " Unavailable"
                )}
              </Typography>

              {editing && <Button variant="contained" color="success" onClick={handleUpdateProfile} sx={{ mt: 2 }}>Save Changes</Button>}
            </>
          )}

          {/* Completed Tasks Tab */}
          {activeTab === 2 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" color="primary">Completed Jobs</Typography>
              <Divider sx={{ mb: 2 }} />
              {completedTasks.length === 0 ? (
                <Typography>No completed jobs.</Typography>
              ) : (
                completedTasks.map((task, index) => (
                  <Paper key={index} sx={{ p: 2, mb: 2 }}>
                    <Typography><strong>Job:</strong> {task.jobDescription}</Typography>
                    <Typography><strong>Client:</strong> {task.fullName}</Typography>
                    <Typography><strong>Price:</strong> ${task.price || "N/A"}</Typography>
                    <Typography><strong>Date:</strong> {new Date(task.jobDateTime).toDateString()}</Typography>
                  </Paper>
                ))
              )}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default TaskerProfilePage;
