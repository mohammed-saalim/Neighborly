import React from "react";
import { Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";

const Notifications = () => {
  const notifications = [
    { id: 1, message: "You received a new job request from John Doe." },
    { id: 2, message: "Your earnings have been updated." },
  ];

  return (
    <Card className="card">
      <CardContent>
        <Typography variant="h6">Notifications</Typography>
        <List>
          {notifications.map(notification => (
            <ListItem key={notification.id}>
              <ListItemText primary={notification.message} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Notifications;
