import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../store/todoSlice";
import { fetchWeather } from "../store/weatherSlice";
import { Card, CardContent, Typography, Button, Grid, Box } from "@mui/material";
import { styled } from "@mui/system";

const PriorityStyles = {
  High: { borderColor: "#d32f2f", backgroundColor: "#ffebee" },
  Medium: { borderColor: "#ffa000", backgroundColor: "#fff3e0" },
  Low: { borderColor: "#388e3c", backgroundColor: "#e8f5e9" },
};

const StyledCard = styled(Card)(({ priority }) => ({
  borderLeft: `6px solid ${PriorityStyles[priority]?.borderColor || "#ccc"}`,
  backgroundColor: PriorityStyles[priority]?.backgroundColor || "#ffffff",
  marginBottom: "16px",
  padding: "16px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  transition: "all 0.3s ease-in-out",
  '&:hover': {
    backgroundColor: "#f4f4f4",
    transform: "scale(1.02)",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
  },
}));

export default function TaskList() {
  const tasks = useSelector((state) => state.todo);
  const weatherData = useSelector((state) => state.weather.data);
  const dispatch = useDispatch();

  const uniqueLocations = useMemo(() => {
    return [...new Set(tasks.filter(task => task.activityType === "Outdoor").map(task => task.location.toLowerCase()))];
  }, [tasks]);

  useEffect(() => {
    uniqueLocations.forEach((location) => {
      dispatch(fetchWeather(location));
    });
  }, [uniqueLocations, dispatch]);

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <Grid container spacing={3} style={{ padding: "20px", background: "#f9f9f9", minHeight: "100vh" }}>
      {sortedTasks.map((task) => {
        let matchingWeather = Array.isArray(weatherData) && weatherData.find(weather => weather.location.toLowerCase() === task.location.toLowerCase());

        return (
          <Grid item xs={12} md={6} lg={4} key={task.id}>
            <StyledCard priority={task.priority}>
              <CardContent>
                <Typography variant="h6" style={{ fontWeight: "bold", color: "#333" }}>
                  {task.text}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Priority:</strong> {task.priority}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <strong>Type:</strong> {task.activityType}
                </Typography>
                {task.activityType === "Outdoor" && matchingWeather && (
                  <>
                  <Typography variant="body2" color="textSecondary">
                  <strong>Location:</strong> {task.location}
                </Typography>
                  <Box display="flex" alignItems="center" mt={2}>
                    <img src={matchingWeather.conditionIcon} alt="Weather icon" width="32" height="32" style={{ marginRight: "10px" }} />
                    <Typography variant="body2" style={{ fontWeight: "bold", color: "#0077b6" }}>
                      {matchingWeather.conditionText}  {matchingWeather.temp_c}°C
                    </Typography>
                    
                  </Box>
                  </>
                )}
                <Button
                  variant="contained"
                  onClick={() => dispatch(deleteTask(task.id))}
                  style={{ marginTop: "12px", backgroundColor: "#d32f2f", color: "white" }}
                >
                  Delete
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>
        );
      })}
    </Grid>
  );
}
