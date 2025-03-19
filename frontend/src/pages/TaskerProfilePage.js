import React, { useState } from "react";
import { Card, CardContent, Typography, Avatar, Chip, Box, Button, TextField, IconButton } from "@mui/material";
import { useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskerProfilePage = () => {
  const theme = useTheme();

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

  const toggleEdit = () => setEditing(!editing);
  const handleChange = (e) => setTasker({ ...tasker, [e.target.name]: e.target.value });

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setTasker({ ...tasker, skills: [...tasker.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setTasker({ ...tasker, skills: tasker.skills.filter(skill => skill !== skillToRemove) });
  };

  return (
    <Box sx={{ backgroundColor: "#f4f6f8", padding: "40px", minHeight: "100vh" }}>
      <Card sx={{ 
          maxWidth: 600, 
          margin: "auto", 
          p: 4, 
          boxShadow: 5, 
          borderRadius: "16px", 
          background: "linear-gradient(to bottom, #ffffff, #f9fafb)" 
        }}>
        <CardContent>
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h5" fontWeight="bold" color="primary">Tasker Profile</Typography>
            <IconButton onClick={toggleEdit} color="primary">
              <EditIcon />
            </IconButton>
          </Box>

          {/* Profile Image & Name */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
            <Avatar src={tasker.image} alt={tasker.name} sx={{ width: 100, height: 100, border: "3px solid #1976d2" }} />
            <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>
              {editing ? (
                <TextField name="name" value={tasker.name} onChange={handleChange} variant="outlined" size="small" />
              ) : (
                tasker.name
              )}
            </Typography>
            <Typography variant="body2" color="gray">
              ⭐ {tasker.rating} ({tasker.reviews} reviews)
            </Typography>
          </Box>

          {/* Bio */}
          <Typography variant="body2" fontWeight="bold" color="primary">Bio:</Typography>
          {editing ? (
            <TextField name="bio" value={tasker.bio} onChange={handleChange} variant="outlined" size="small" fullWidth multiline rows={2} sx={{ mb: 2 }} />
          ) : (
            <Typography variant="body1" sx={{ color: "gray", mb: 2 }}>{tasker.bio}</Typography>
          )}

          {/* Skills */}
          <Typography variant="body2" fontWeight="bold" color="primary">Skills:</Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1, mb: 2 }}>
            {tasker.skills.map((skill, index) => (
              <Chip 
                key={index} 
                label={skill} 
                sx={{ backgroundColor: "#1976d2", color: "#fff", borderRadius: "16px", px: 1.5, py: 0.5 }} 
                onDelete={editing ? () => removeSkill(skill) : undefined}
              />
            ))}
          </Box>
          {editing && (
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <TextField value={newSkill} onChange={(e) => setNewSkill(e.target.value)} variant="outlined" size="small" placeholder="Add skill" sx={{ mr: 1 }} />
              <IconButton color="primary" onClick={addSkill}><AddCircleOutlineIcon /></IconButton>
            </Box>
          )}

          {/* Additional Info */}
          <Typography variant="body2" color="gray">📍 Location: {editing ? <TextField name="location" value={tasker.location} onChange={handleChange} size="small" variant="outlined" /> : tasker.location}</Typography>
          <Typography variant="body2" color="gray">✅ Completed Jobs: {tasker.completedJobs}</Typography>
          <Typography variant="body2" color="gray">💰 Hourly Rate: {editing ? <TextField name="hourlyRate" value={tasker.hourlyRate} onChange={handleChange} size="small" variant="outlined" /> : tasker.hourlyRate}</Typography>
          <Typography variant="body2" color="gray">🕒 Availability: {tasker.availability ? "Available" : "Unavailable"}</Typography>
          <Typography variant="body2" color="gray">📧 Contact: {editing ? <TextField name="contact" value={tasker.contact} onChange={handleChange} size="small" variant="outlined" fullWidth /> : tasker.contact}</Typography>


          {/* Save Changes Button */}
          {editing && (
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Button variant="contained" color="success" onClick={toggleEdit}>Save Changes</Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default TaskerProfilePage;

