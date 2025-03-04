import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const EarningsSummary = () => {
  return (
    <Card className="card">
      <CardContent>
        <Typography variant="h6">Earnings Summary</Typography>
        <Typography variant="body1">Total Earnings: <strong>$1200</strong></Typography>
        <Typography variant="body1">Completed Jobs: <strong>15</strong></Typography>
        <Typography variant="body1">Next Payout: <strong>Feb 25</strong></Typography>
      </CardContent>
    </Card>
  );
};

export default EarningsSummary;
