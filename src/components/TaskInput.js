import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/todoSlice";
import { TextField, Button, MenuItem, Select, Box, Typography, Card } from "@mui/material";

export default function TaskInput() {
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [activityType, setActivityType] = useState("Indoor");
  const [location, setLocation] = useState("");
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (taskText.trim() === "" || (activityType === "Outdoor" && location.trim() === "")) return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      priority,
      activityType,
      location: activityType === "Outdoor" ? location : "",
    };

    dispatch(addTask(newTask));
    setTaskText("");
    setLocation("");
    setPriority("Medium");
    setActivityType("Indoor");
  };

  return (
    <Card sx={{ p: 3, borderRadius: 3, boxShadow: 5, bgcolor: "#f5f5f5" }}>
      <Typography variant="h5" mb={2} fontWeight="bold" color="#333">
        Add New Task
      </Typography>
      
      <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
        <TextField
          label="Task"
          variant="outlined"
          fullWidth
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          sx={{ bgcolor: "white", borderRadius: 2 }}
        />
        
        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          sx={{ minWidth: 120, bgcolor: "white", borderRadius: 2 }}
        >
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </Select>
        
        <Select
          value={activityType}
          onChange={(e) => setActivityType(e.target.value)}
          sx={{ minWidth: 120, bgcolor: "white", borderRadius: 2 }}
        >
          <MenuItem value="Indoor">Indoor</MenuItem>
          <MenuItem value="Outdoor">Outdoor</MenuItem>
        </Select>
        
        {activityType === "Outdoor" && (
          <TextField
            label="Location"
            variant="outlined"
            sx={{ minWidth: 150, bgcolor: "white", borderRadius: 2 }}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        )}
        
        <Button 
          variant="contained" 
          sx={{ 
            bgcolor: "#1976d2", 
            color: "white", 
            borderRadius: 2,
            padding: 1.7, 
            fontWeight: "bold", 
            '&:hover': { bgcolor: "#125a9e" }
          }}
          onClick={handleAddTask}
        >
          Add Task
        </Button>
      </Box>
    </Card>
  );
}
