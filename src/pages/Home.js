import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import { Button, Container, Typography, Box } from "@mui/material";
import "../App.css";

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  return (
    <Container  style={{ minHeight: "100vh", paddingTop: "20px" }}>
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold" color="#333">
          Welcome, {user?.name}!
        </Typography>
        <Button 
          variant="contained" 
          color="error" 
          onClick={() => dispatch(logout())}
        >
          Logout
        </Button>
      </Box>
      
      <Box>
        <TaskInput />
      </Box>
      
      <TaskList />
    </Container>
  );
}
