import React, { useState } from "react";
import { Card, CardContent, Typography, Switch, Avatar } from "@mui/material";
import { useTheme } from "@mui/material";

const TaskerProfile = () => {
  const theme = useTheme();
  const [available, setAvailable] = useState(true);

  return (
    <Card className="card">
      <CardContent>
        <Avatar src="https://via.placeholder.com/80" alt="Profile Picture" sx={{ width: 80, height: 80, mb: 2, backgroundColor: theme.palette.primary.main }} />
        <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>Tasker Profile</Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>Name: <strong>Alex T.</strong></Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>Rating: <strong>4.8 ⭐</strong></Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>Availability:</Typography>
        <Switch checked={available} onChange={() => setAvailable(!available)} sx={{ color: theme.palette.primary.main }} />
      </CardContent>
    </Card>
  );
};

export default TaskerProfile;
