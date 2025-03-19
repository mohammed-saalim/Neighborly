import React, { useEffect, useState } from "react";
import { 
  Box, Card, CardContent, Typography, TextField, Button, CircularProgress 
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const JobRequestForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const worker = location.state?.worker; // ✅ Retrieve selected worker from state
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [jobDetails, setJobDetails] = useState({
    address: "",  // ✅ Editable user address
    jobDateTime: "",
    jobDescription: "",
  });

  // ✅ Fetch Logged-in User Profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      const userToken = localStorage.getItem("userToken");
      if (!userToken) {
        alert("Please login to continue.");
        navigate("/login");
        return;
      }
      
      try {
        const response = await axios.get("http://localhost:5083/api/user/profile", {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        setUser(response.data); // ✅ Store user details
        setJobDetails((prev) => ({ 
          ...prev, 
          address: response.data.address || "" // ✅ Set user address
        }));
      } catch (error) {
        console.error("Error fetching user profile:", error);
        alert("Failed to load user profile.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userToken = localStorage.getItem("userToken");
    if (!user || !worker) {
      alert("Error loading data. Please try again.");
      return;
    }

    // ✅ Explicitly set `contact` field (Fix: Map `phone` to `contact`)
    const jobRequestData = {
      workerId: worker.id,  // ✅ Worker ID (Job is for this worker)
      fullName: user.fullName, // ✅ User's full name
      email: user.email, // ✅ User's email
      contact: user.phone || "N/A", // ✅ FIX: Use `phone` as `contact`
      address: jobDetails.address, // ✅ Editable user address
      jobDateTime: jobDetails.jobDateTime, // ✅ Editable date & time
      jobDescription: jobDetails.jobDescription, // ✅ Editable job description
      jobPostStatus: "unfilled",
    };

    console.log("📤 Sending Job Request Data:", JSON.stringify(jobRequestData, null, 2)); // ✅ Debugging

    try {
      const response = await axios.post("http://localhost:5083/api/jobrequests", jobRequestData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json"
        },
      });

      if (response.status === 201) {
        alert("✅ Job request submitted successfully!");
        navigate("/profile"); // ✅ Redirect to confirmation page
      } else {
        alert("⚠️ Unexpected response. Please try again.");
      }

    } catch (error) {
      console.error("❌ Error posting job request:", error);
      if (error.response) {
        console.error("📥 API Response:", error.response.data);
      }
      alert("Failed to post job request.");
    }
  };

  if (loading) {
    return <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />;
  }

  if (!worker || !user) {
    return <Typography variant="h6" color="error" textAlign="center" mt={5}>Error loading form data.</Typography>;
  }

  return (
    <Box sx={{ padding: "40px", maxWidth: 600, margin: "auto" }}>
      <Card sx={{ boxShadow: 5, borderRadius: "16px", p: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" color="primary" textAlign="center">
            Post a Job for {worker.fullName}
          </Typography>

          {/* Address Field (Editable) */}
          <TextField 
            fullWidth 
            margin="normal" 
            label="Address" 
            name="address" 
            value={jobDetails.address} 
            onChange={handleChange} 
            required 
          />

          {/* Job Description */}
          <TextField 
            fullWidth 
            margin="normal" 
            label="Job Description" 
            name="jobDescription" 
            value={jobDetails.jobDescription} 
            onChange={handleChange} 
            required 
          />

          {/* Date & Time */}
          <TextField 
            fullWidth 
            margin="normal" 
            label="Date & Time" 
            name="jobDateTime" 
            type="datetime-local" 
            value={jobDetails.jobDateTime} 
            onChange={handleChange} 
            required 
          />

          {/* Submit Button */}
          <Button 
            variant="contained" 
            color="success" 
            fullWidth 
            sx={{ mt: 2 }} 
            onClick={handleSubmit}
          >
            Submit Job Request
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default JobRequestForm;
