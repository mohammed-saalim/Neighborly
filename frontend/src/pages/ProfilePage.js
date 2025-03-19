import React, { useEffect, useState } from "react";
import { 
  Button, Typography, Box, Paper, TextField, Tabs, Tab, CircularProgress, Alert, Divider, List, ListItem, ListItemText, Stack 
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_USER_PROFILE = "http://localhost:5083/api/user/profile";
const API_USER_TASKS = "http://localhost:5083/api/jobrequest/user";
const API_MARK_COMPLETED = "http://localhost:5083/api/jobrequests/user/completed";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [tasks, setTasks] = useState({ pending: [], current: [], completed: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", address: "", phone: "" });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userToken = localStorage.getItem("userToken");
        if (!userToken) {
          navigate("/login");
          return;
        }

        const response = await axios.get(API_USER_PROFILE, {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        setUser(response.data);
        setFormData({
          fullName: response.data.fullName || "",
          address: response.data.address || "",
          phone: response.data.phone || "",
        });
      } catch (err) {
        setError("Failed to fetch user details.");
      }
    };

    const fetchUserTasks = async () => {
      try {
        const userToken = localStorage.getItem("userToken");
        if (!userToken) return;

        const response = await axios.get(API_USER_TASKS, {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        const pendingTasks = response.data.filter(task => task.jobPostStatus === "unfilled" || task.jobPostStatus === "rejected");
        const currentTasks = response.data.filter(task => task.jobPostStatus === "in progress");
        const completedTasks = response.data.filter(task => task.jobPostStatus === "completed");

        setTasks({ pending: pendingTasks, current: currentTasks, completed: completedTasks });

      } catch (err) {
        console.error("Error fetching user tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
    fetchUserTasks();
  }, [navigate]);


  const handleMarkCompleted = async (taskId) => {
    try {
      const userToken = localStorage.getItem("userToken");
  
      await axios.put(`http://localhost:5083/api/jobrequests/${taskId}/complete`, {}, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
  
      alert("✅ Task marked as completed!");
      
      setTasks((prev) => ({
        ...prev,
        current: prev.current.filter(task => task.id !== taskId),
        completed: [...prev.completed, ...prev.current.filter(task => task.id === taskId)],
      }));
    } catch (error) {
      console.error("Error marking task as completed:", error);
      alert("❌ Failed to mark task as completed.");
    }
  };
  

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      await axios.put(
        API_USER_PROFILE,
        { fullName: formData.fullName, address: formData.address, phone: formData.phone },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setUser(formData);
      setIsEditing(false);
    } catch (err) {
      setError("Failed to save changes.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Paper sx={{ width: "600px", padding: "30px", borderRadius: "12px", boxShadow: 3, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          My Account
        </Typography>

        <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)} sx={{ marginBottom: "20px" }}>
          <Tab label="Profile" />
          <Tab label="Pending Tasks" />
          <Tab label="Current Tasks" />
          <Tab label="Completed Tasks" />
        </Tabs>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            {tabIndex === 0 && user && (
              <Box sx={{ textAlign: "left" }}>
                <TextField fullWidth label="Full Name" name="fullName" value={formData.fullName} onChange={handleInputChange} margin="normal" InputProps={{ readOnly: !isEditing }} />
                <TextField fullWidth label="Email" value={user.email} margin="normal" InputProps={{ readOnly: true }} />
                <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleInputChange} margin="normal" InputProps={{ readOnly: !isEditing }} />
                <TextField fullWidth label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} margin="normal" InputProps={{ readOnly: !isEditing }} />

                {isEditing ? (
                  <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSave}>
                    Save Changes
                  </Button>
                ) : (
                  <Button variant="outlined" color="primary" fullWidth sx={{ mt: 2 }} onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                )}

                <Button variant="contained" color="error" fullWidth sx={{ mt: 2 }} onClick={handleLogout}>
                  Logout
                </Button>
              </Box>
            )}

            {tabIndex === 1 && (
              <List>
                {tasks.pending.length === 0 ? (
                  <Typography>No pending tasks.</Typography>
                ) : (
                  tasks.pending.map((task) => (
                    <ListItem key={task.id} sx={{ mb: 1 }}>
                      <ListItemText primary={task.jobDescription} secondary={`Status: ${task.jobPostStatus}`} />
                    </ListItem>
                  ))
                )}
              </List>
            )}

            {tabIndex === 2 && (
              <List>
                {tasks.current.length === 0 ? (
                  <Typography>No current tasks.</Typography>
                ) : (
                  tasks.current.map((task) => (
                    <ListItem key={task.id} sx={{ mb: 1 }}>
                      <ListItemText primary={task.jobDescription} secondary={`Status: ${task.jobPostStatus}`} />
                      <Button variant="contained" color="success" onClick={() => handleMarkCompleted(task.id)}>Mark as Completed</Button>
                    </ListItem>
                  ))
                )}
              </List>
            )}

            {tabIndex === 3 && (
              <List>
                {tasks.completed.length === 0 ? (
                  <Typography>No completed tasks.</Typography>
                ) : (
                  tasks.completed.map((task) => (
                    <ListItem key={task.id} sx={{ mb: 1 }}>
                      <ListItemText primary={task.jobDescription} secondary={`Completed on: ${new Date(task.jobDateTime).toLocaleString()}`} />
                    </ListItem>
                  ))
                )}
              </List>
            )}
          </>
        )}
      </Paper>
    </Box>
  );
};

export default ProfilePage;
