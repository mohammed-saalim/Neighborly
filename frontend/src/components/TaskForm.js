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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task submitted:", {...taskData, service});
    // Here, you can add a function to send data to your backend
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
