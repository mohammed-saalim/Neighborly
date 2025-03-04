import React, { useState } from "react";
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText, Box } from "@mui/material";

const TaskRequests = () => {
  const [requests, setRequests] = useState([
    { id: 1, user: "John Doe", service: "Plumbing", date: "Feb 22", price: "$50" },
    { id: 2, user: "Emma W.", service: "Cleaning", date: "Feb 23", price: "$35" },
  ]);

  const handleAction = (id, action) => {
    setRequests(requests.filter(request => request.id !== id));
  };

  return (
    <Card className="card">
      <CardContent>
        <Typography variant="h6">Task Requests</Typography>
        <List>
          {requests.map(request => (
            <ListItem key={request.id} className="task-request-item">
              <ListItemText primary={`${request.user} - ${request.service}`} secondary={`Date: ${request.date} | Price: ${request.price}`} />
              <Box>
                <Button variant="contained" color="success" size="small" onClick={() => handleAction(request.id, "accept")}>Accept</Button>
                <Button variant="contained" color="error" size="small" onClick={() => handleAction(request.id, "reject")} sx={{ ml: 1 }}>Reject</Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TaskRequests;
