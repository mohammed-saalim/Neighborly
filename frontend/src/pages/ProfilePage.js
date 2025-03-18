import React, { useEffect, useState } from "react";
import { Button, Typography, Box, Paper, TextField, Tabs, Tab, CircularProgress, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5083/api/user/profile";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userToken = localStorage.getItem("userToken");
        if (!userToken) {
          navigate("/login");
          return;
        }

        const response = await axios.get(API_BASE_URL, {
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
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      await axios.put(
        API_BASE_URL,
        { fullName: formData.fullName, address: formData.address, phone: formData.phone },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      setUser(formData);
      setIsEditing(false);
    } catch (err) {
      setError("Failed to save changes.");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f8f9fa" }}>
      <Paper sx={{ width: "500px", padding: "30px", borderRadius: "12px", boxShadow: 3, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          My Account
        </Typography>

        <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)} sx={{ marginBottom: "20px" }}>
          <Tab label="Profile" />
          <Tab label="Current Tasks" disabled />
          <Tab label="Completed Tasks" disabled />
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
          </>
        )}
      </Paper>
    </Box>
  );
};

export default ProfilePage;
