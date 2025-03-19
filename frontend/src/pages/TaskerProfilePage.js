import React, { useState, useEffect } from "react";
import { 
  Card, CardContent, Typography, Avatar, Box, Button, 
  TextField, IconButton, CircularProgress, Divider, Switch 
} from "@mui/material";
import { useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

const TaskerProfilePage = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [completedJobs, setCompletedJobs] = useState([]);
  const [worker, setWorker] = useState(null);

  const API_PROFILE_URL = "http://localhost:5083/api/worker/profile";
  const API_COMPLETED_JOBS = "http://localhost:5083/api/jobrequests/worker/completed";

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

    fetchWorkerProfile();
    fetchCompletedJobs();
  }, []);

  // ✅ Fix controlled input warning by ensuring default values
  const handleChange = (e) => {
    setWorker({ ...worker, [e.target.name]: e.target.value || "" });
  };

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

  const toggleAvailability = () => {
    setWorker({ ...worker, availability: !worker.availability });
  };

  if (loading) {
    return <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />;
  }

  if (!worker) {
    return <Typography variant="h6" color="error" sx={{ textAlign: "center", mt: 5 }}>
      Failed to load profile.
    </Typography>;
  }

  return (
    <Box sx={{ backgroundColor: "#f4f6f8", padding: "40px", minHeight: "100vh" }}>
      <Card sx={{ maxWidth: 750, margin: "auto", p: 4, boxShadow: 5, borderRadius: "16px", background: "white" }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" color="primary" align="center" sx={{ mb: 3 }}>
            Tasker Profile
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h5" fontWeight="bold" color="primary">Profile Information</Typography>
            <IconButton onClick={() => setEditing(!editing)} color="primary">
              <EditIcon />
            </IconButton>
          </Box>

          {/* Profile Details */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
            <Avatar src={worker.image || "/assets/default-avatar.png"} alt={worker.fullName} 
                    sx={{ width: 100, height: 100, border: "3px solid #1976d2", mb: 1 }} />
            <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>{worker.fullName}</Typography>
            <Typography variant="body2" color="gray">⭐ {worker.rating} ({completedJobs.length} jobs completed)</Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Editable Fields */}
          <Typography variant="body2" fontWeight="bold" color="primary">Bio:</Typography>
          {editing ? (
            <TextField name="summary" value={worker.summary || ""} onChange={handleChange} fullWidth multiline rows={2} sx={{ mb: 2 }} />
          ) : (
            <Typography variant="body1" sx={{ color: "gray", mb: 2 }}>{worker.summary || "No bio available."}</Typography>
          )}

          <Typography variant="body2" fontWeight="bold" color="primary">📍 Address:</Typography>
          {editing ? (
            <TextField name="address" value={worker.address || ""} onChange={handleChange} fullWidth size="small" sx={{ mb: 2 }} />
          ) : (
            <Typography variant="body1" sx={{ color: "gray", mb: 2 }}>{worker.address || "No address provided."}</Typography>
          )}

          <Typography variant="body2" fontWeight="bold" color="primary">💰 Hourly Rate:</Typography>
          {editing ? (
            <TextField name="hourlyRate" value={worker.hourlyRate || ""} onChange={handleChange} fullWidth size="small" sx={{ mb: 2 }} />
          ) : (
            <Typography variant="body1" sx={{ color: "gray", mb: 2 }}>${worker.hourlyRate || "Not set"}/hr</Typography>
          )}

          <Typography variant="body2" fontWeight="bold" color="primary">📧 Contact:</Typography>
          {editing ? (
            <TextField name="contact" value={worker.contact || ""} onChange={handleChange} fullWidth size="small" sx={{ mb: 2 }} />
          ) : (
            <Typography variant="body1" sx={{ color: "gray", mb: 2 }}>{worker.contact || "No contact info."}</Typography>
          )}

          <Typography variant="body2" fontWeight="bold" color="primary">🟢 Availability:</Typography>
          {editing ? (
            <Switch checked={worker.availability} onChange={toggleAvailability} />
          ) : (
            <Typography variant="body1" sx={{ color: worker.availability ? "green" : "red", fontWeight: "bold" }}>
              {worker.availability ? "Available" : "Unavailable"}
            </Typography>
          )}

          {editing && (
            <Button variant="contained" color="success" onClick={handleUpdateProfile} sx={{ mt: 2 }}>
              Save Changes
            </Button>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default TaskerProfilePage;
