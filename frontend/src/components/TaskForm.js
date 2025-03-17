import React, { useState } from "react";
import "../styles/TaskForm.css";
import { useParams } from "react-router-dom";


const TaskForm = () => {
  const { service } = useParams();  
  const [taskData, setTaskData] = useState({
    location: "",
    taskSize: "",
    details: "",
  });

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskDataWithService = { 
        ...taskData, 
        serviceType: service, // Pass service type
        title: taskData.title, // Modify as needed
        zipcode: taskData.zipcode, // Replace with actual zip code field
        unit: taskData.unit, // Ensure Unit/Apt is included
    };

    try {
        const response = await fetch("http://localhost:5083/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskDataWithService),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${response.statusText}`);
        }

        // Handle empty response correctly
        const text = await response.text();
        const result = text ? JSON.parse(text) : {};

        console.log("Task submitted successfully:", result);
        alert("Task submitted successfully!");
    } catch (error) {
        console.error("Error submitting task:", error);
        alert(`Submission failed: ${error.message}`);
    }
};


  return (
    <div className="task-form-container">
      <h2>Describe Your Task</h2>
      <form onSubmit={handleSubmit}>
        {/* Location Input */}
        <label>
          Your Task Location:
          <input
            type="text"
            name="location"
            value={taskData.address}
            onChange={handleChange}
            placeholder="Street Address"
            required
          />
          <input
            type="text"
            name="location"
            value={taskData.unit}
            onChange={handleChange}
            placeholder="Unit or apt #"
            required
          />
        </label>

        {/* Task Size Selection */}
        <label>
          How big is your task?
          <select name="taskSize" value={taskData.taskSize} onChange={handleChange} required>
            <option value="">Select size</option>
            <option value="small">Small - Est. 1 hr</option>
            <option value="medium">Medium - Est. 2-3 hrs</option>
            <option value="large">Large - Est. 4+ hrs</option>
          </select>
        </label>

        {/* Task Details */}
        <label>
          Task Details:
          <textarea
            name="details"
            value={taskData.details}
            onChange={handleChange}
            placeholder="Provide a summery of what you need done for your tasker."
            required
          />
        </label>

        {/* Submit Button */}
        <button type="submit">Browse Taskers & Prices</button>
      </form>
    </div>
  );
};

export default TaskForm;
