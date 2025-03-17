import React, { useState } from "react";
import "../styles/TaskForm.css";
import { useParams } from "react-router-dom";

const MovingTaskForm = () => {
  const { service } = useParams();  
  const [taskData, setTaskData] = useState({
    pickupLocation: "",
    dropoffLocation: "",
    numItems: "",
    details: "",
  });

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const movingTaskData = { 
      ...taskData, 
      serviceType: "Moving",
      title: "Moving Task",
      zipcode: taskData.zipcode, // Replace with actual zip code field
      pickupLocation: taskData.pickupLocation,
      dropoffLocation: taskData.dropoffLocation,
      numItems: taskData.numItems
  };

  try {
      const response = await fetch("http://localhost:5000/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(movingTaskData),
      });

      const result = await response.json();
      if (response.ok) {
          alert("Moving task submitted successfully!");
      } else {
          alert("Failed to submit moving task.");
      }
  } catch (error) {
      console.error("Error submitting moving task:", error);
  }

  };

  return (
    <div className="task-form-container">
      <h2>Describe Your Moving Task</h2>
      <form onSubmit={handleSubmit}>
        {/* Pickup Location */}
        <label>
          Pickup Location:
          <input
            type="text"
            name="pickupLocation"
            value={taskData.pickupLocation}
            onChange={handleChange}
            placeholder="Street Address"
            required
          />
        </label>

        {/* Dropoff Location */}
        <label>
          Dropoff Location:
          <input
            type="text"
            name="dropoffLocation"
            value={taskData.dropoffLocation}
            onChange={handleChange}
            placeholder="Street Address"
            required
          />
        </label>

        {/* Number of Items */}
        <label>
          Number of Items:
          <input
            type="number"
            name="numItems"
            value={taskData.numItems}
            onChange={handleChange}
            placeholder="Estimated number of items"
            required
          />
        </label>

        {/* Task Details */}
        <label>
          Additional Details:
          <textarea
            name="details"
            value={taskData.details}
            onChange={handleChange}
            placeholder="Provide details about the move (e.g., stairs, large furniture, etc.)"
            required
          />
        </label>

        {/* Submit Button */}
        <button type="submit">Browse Movers & Prices</button>
      </form>
    </div>
  );
};

export default MovingTaskForm;
