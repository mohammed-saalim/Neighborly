import React from "react";
import { Grid, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import TimerIcon from "@mui/icons-material/Timer";
import PetsIcon from "@mui/icons-material/Pets";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import BuildIcon from "@mui/icons-material/Build"; // Custom Service Icon
import "../../styles/PostJob.css";

const allServices = [
  { name: "Cleaning", icon: <CleaningServicesIcon fontSize="large" /> },
  { name: "Plumbing", icon: <PlumbingIcon fontSize="large" /> },
  { name: "Moving", icon: <LocalShippingIcon fontSize="large" /> },
  { name: "Waiting in Line", icon: <TimerIcon fontSize="large" /> },
  { name: "Pet Services", icon: <PetsIcon fontSize="large" /> },
  { name: "Errands", icon: <ShoppingCartIcon fontSize="large" /> },
  { name: "Electrical Work", icon: <ElectricalServicesIcon fontSize="large" /> },
  { name: "Custom Service", icon: <BuildIcon fontSize="large" /> }, // New Service
];

function ServicesGrid({ showAll }) {
  const navigate = useNavigate();
  const displayedServices = showAll ? allServices : allServices.slice(0, 6); // Show only 6 by default

  return (
    <Grid container spacing={3} className="services-grid">
      {displayedServices.map((service, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card className="service-card" onClick={() => navigate(`/post-job/${service.name.toLowerCase()}`)}>
            <CardActionArea>
              <CardContent className="service-card-content">
                {service.icon}
                <Typography variant="h6">{service.name}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default ServicesGrid;
