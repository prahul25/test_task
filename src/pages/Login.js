import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Card, CardContent, Box } from "@mui/material";
import "../App.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = () => {
    if (username.trim() !== "") {
      dispatch(login({ name: username }));
      navigate("/");
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}
    >
      <Card style={{ width: "100%", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}>
        <CardContent>
          <Box textAlign="center" marginBottom={2}>
            <Typography variant="h4" gutterBottom style={{ fontWeight: "bold", color: "#333" }}>
              Welcome Back
            </Typography>
            <Typography variant="body1" style={{ color: "#555" }}>
              Please login to continue
            </Typography>
          </Box>
          <TextField
            label="Enter Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            fullWidth
            style={{ marginTop: "20px", padding: "10px 0", fontSize: "16px", borderRadius: "8px" }}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}