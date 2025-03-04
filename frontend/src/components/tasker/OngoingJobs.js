import React from "react";
import { Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";

const OngoingJobs = () => {
  const ongoingJobs = [
    { id: 1, user: "Alice M.", service: "Electrical Work", status: "In Progress" },
  ];

  return (
    <Card className="card">
      <CardContent>
        <Typography variant="h6">Ongoing Jobs</Typography>
        <List>
          {ongoingJobs.map(job => (
            <ListItem key={job.id}>
              <ListItemText primary={`${job.user} - ${job.service}`} secondary={`Status: ${job.status}`} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default OngoingJobs;
