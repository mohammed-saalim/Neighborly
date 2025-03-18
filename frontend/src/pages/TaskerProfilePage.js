import React, { useState } from "react";
import { Card, CardContent, Typography, Avatar, Chip, Box, Button, TextField, IconButton } from "@mui/material";
import { useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskerProfilePage = () => {
  const theme = useTheme();

  // Tasker Details (State)
  const [tasker, setTasker] = useState({
    name: "Alex T.",
    rating: 4.8,
    reviews: 120,
    skills: ["Plumbing", "Electrical Work", "Cleaning"],
    bio: "Experienced professional with over 5 years in home services. Dedicated to quality work.",
    image: "/assets/tasker-profile.jpg",
    location: "Chicago, IL",
    completedJobs: 150,
    hourlyRate: "$45/hr",
    availability: true,
    contact: "alex.t@example.com",
  });

  const [editing, setEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  // Toggle Edit Mode
  const toggleEdit = () => setEditing(!editing);

  // Update Profile Fields
  const handleChange = (e) => {
    setTasker({ ...tasker, [e.target.name]: e.target.value });
  };

  // Add New Skill
  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setTasker({ ...tasker, skills: [...tasker.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  // Remove Skill
  const removeSkill = (skillToRemove) => {
    setTasker({ ...tasker, skills: tasker.skills.filter(skill => skill !== skillToRemove) });
  };

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, padding: "20px", minHeight: "100vh" }}>
      <Card className="tasker-profile-card" sx={{ maxWidth: 700, margin: "auto", p: 3, boxShadow: 3 }}>
        <CardContent>
          {/* Header with Edit Button */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h5" sx={{ color: theme.palette.text.secondary }}>Tasker Profile</Typography>
            <IconButton onClick={toggleEdit} color="primary">
              <EditIcon />
            </IconButton>
          </Box>

          {/* Profile Image & Name */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar src={tasker.image} alt={tasker.name} sx={{ width: 100, height: 100, mr: 2, backgroundColor: theme.palette.primary.main }} />
            <Box>
              {editing ? (
                <TextField 
                  name="name"
                  value={tasker.name} 
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              ) : (
                <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>{tasker.name}</Typography>
              )}
              <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                ⭐ {tasker.rating} ({tasker.reviews} reviews)
              </Typography>
            </Box>
          </Box>

          {/* Bio Section */}
          <Typography variant="body2" fontWeight="bold">Bio:</Typography>
          {editing ? (
            <TextField
              name="bio"
              value={tasker.bio}
              onChange={handleChange}
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={2}
              sx={{ mb: 2 }}
            />
          ) : (
            <Typography variant="body1" sx={{ color: theme.palette.text.primary, mb: 2 }}>
              {tasker.bio}
            </Typography>
          )}

          {/* Skills Section */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" fontWeight="bold">Skills:</Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
              {tasker.skills.map((skill, index) => (
                <Chip 
                  key={index} 
                  label={skill} 
                  sx={{ backgroundColor: theme.palette.primary.main, color: "#fff" }} 
                  onDelete={editing ? () => removeSkill(skill) : undefined}
                />
              ))}
            </Box>
            {editing && (
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <TextField
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  variant="outlined"
                  size="small"
                  placeholder="Add skill"
                  sx={{ mr: 1 }}
                />
                <IconButton color="primary" onClick={addSkill}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </Box>
            )}
          </Box>

          {/* Additional Info */}
          <Typography variant="body2" sx={{ color: theme.palette.text.primary, mb: 1 }}>
            📍 Location: {editing ? <TextField name="location" value={tasker.location} onChange={handleChange} size="small" variant="outlined" /> : tasker.location}
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.primary, mb: 1 }}>
            ✅ Completed Jobs: {tasker.completedJobs}
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.primary, mb: 1 }}>
            💰 Hourly Rate: {editing ? <TextField name="hourlyRate" value={tasker.hourlyRate} onChange={handleChange} size="small" variant="outlined" /> : tasker.hourlyRate}
          </Typography>
          <Typography variant="body2" sx={{ color: theme.palette.text.primary, mb: 1 }}>
            🕒 Availability: {editing ? <TextField name="availability" value={tasker.availability} onChange={handleChange} size="small" variant="outlined" /> : tasker.availability ? "Available" : "Unavailable"}
          </Typography>

          {/* Contact Info */}
          <Typography variant="body2" sx={{ color: theme.palette.text.primary, mb: 1 }}>
            📧 Contact: {editing ? <TextField name="contact" value={tasker.contact} onChange={handleChange} size="small" variant="outlined" fullWidth /> : tasker.contact}
          </Typography>

          {/* Save Changes Button */}
          {editing && (
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Button variant="contained" color="primary" onClick={toggleEdit}>Save Changes</Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default TaskerProfilePage;
