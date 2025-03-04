import React from "react";
import { Grid, Box } from "@mui/material";
import TaskRequests from "./TaskRequests";
import OngoingJobs from "./OngoingJobs";
import EarningsSummary from "./EarningsSummary";
import TaskerProfile from "./TaskerProfile";
import Notifications from "./Notifications";
import "../../styles/TaskerDashboard.css";
import { useTheme } from "@mui/material";

const TaskerDashboard = () => {
  const theme = useTheme();


  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, padding: "20px", minHeight: "100vh" }}>
      <Grid container spacing={3}>
        {/* Left Section: Task Requests & Ongoing Jobs */}
        <Grid item xs={12} md={8}>
          <TaskRequests />
          <OngoingJobs />
        </Grid>

        {/* Right Section: Profile, Earnings & Notifications */}
        <Grid item xs={12} md={4}>
          <TaskerProfile />
          <EarningsSummary />
          <Notifications />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskerDashboard;
