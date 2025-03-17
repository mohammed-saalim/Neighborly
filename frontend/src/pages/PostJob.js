import React, { useState } from "react";
import { Box, Container, Typography, Button, Modal, Grid, Paper, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; // Search Icon
import AdCarousel from "../components/common/AdCarousel";
import "../styles/PostJob.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";

// Icons
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import TimerIcon from "@mui/icons-material/Timer";
import PetsIcon from "@mui/icons-material/Pets";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import HandymanIcon from "@mui/icons-material/Handyman";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import MovingIcon from "@mui/icons-material/DirectionsBus";
import BuildIcon from "@mui/icons-material/Build"; // Custom Service
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"; // All Services
import CloseIcon from "@mui/icons-material/Close";

const coreServices = [
  { name: "Cleaning", icon: <CleaningServicesIcon fontSize="large" /> },
  { name: "Plumbing", icon: <PlumbingIcon fontSize="large" /> },
  { name: "Moving", icon: <LocalShippingIcon fontSize="large" /> },
  { name: "Waiting in Line", icon: <TimerIcon fontSize="large" /> },
  { name: "Pet Services", icon: <PetsIcon fontSize="large" /> },
  { name: "Errands", icon: <ShoppingCartIcon fontSize="large" /> },
  { name: "Electrical Work", icon: <ElectricalServicesIcon fontSize="large" /> },
  { name: "Handyman", icon: <HandymanIcon fontSize="large" /> },
  { name: "Grocery Shopping", icon: <ShoppingBagIcon fontSize="large" /> },
  { name: "Heavy Lifting", icon: <MovingIcon fontSize="large" /> },
  { name: "Custom Service", icon: <BuildIcon fontSize="large" /> },
  { name: "All Services", icon: <MoreHorizIcon fontSize="large" /> },
];

const allServices = [
  "Cleaning", "Plumbing", "Moving", "Waiting in Line", "Pet Services",
  "Errands", "Electrical Work", "Handyman", "Grocery Shopping",
  "Heavy Lifting", "Furniture Assembly", "Wall Mounting", "Packing Help",
  "Appliance Repair", "Computer Help", "Yard Work", "Event Assistance",
  "Cooking & Meal Prep", "Delivery Assistance", "Custom Service"
];

function PostJob() {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box className="post-job-page">
      <Container maxWidth="lg">
        {/* Page Title */}
        <Typography variant="h4" className="page-title" sx={theme.typography.h4}>
          What are you looking for?
        </Typography>

        {/* Search Bar  */}
        <Box className="search-bar-container">
          <TextField
            variant="outlined"
            placeholder="Search for a service..."
            fullWidth
            className="search-bar"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Services Grid - 4 Columns, 3 Rows */}
        <Grid container spacing={3} className="services-grid">
          {coreServices.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                className="service-card"
                onClick={() =>
                  service.name === "All Services" ? setOpenModal(true) : navigate(service.name === "Moving" ? "/task-form/moving" : `/task-form/${service.name.toLowerCase()}`)
                }
              >
                <Box className="service-card-content">
                  {service.icon}
                  <Typography variant="h6">{service.name}</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Ad Section */}
        <AdCarousel />

        {/* All Services Modal */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box className="modal-container">
          <Typography
            variant="h5"
            className="modal-title"
            sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: "bold",
                textAlign: "center",
            }}
         >
          All Services

        <CloseIcon className="close-icon" onClick={() => setOpenModal(false)} />  
        </Typography>


            {/* Full List of Services */}
            <Box className="services-list">
              {allServices.map((service, index) => (
                <Button
                  key={index}
                  variant="contained"
                  className="service-btn"
                  onClick={() => {
                    navigate(`/task-form/${service.toLowerCase()}`);
                    setOpenModal(false);
                  }}
                >
                  {service}
                </Button>
              ))}
            </Box>

          </Box>
        </Modal>
      </Container>
    </Box>
  );
}

export default PostJob;
