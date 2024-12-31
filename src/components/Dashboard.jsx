import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { id, name } = location.state || {}; 

  const handleLogout = () => {
    navigate("/", { replace: true });
  };

  return (
    <Box 
      sx={{
        width: "100%", 
        padding: 3, 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center",
        backgroundColor: "#F4F4F9", 
        minHeight: "100vh"
      }}
    >
      <Box
        sx={{
          maxWidth: 600,
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
          marginBottom: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          Welcome to your Dashboard
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          <strong>ID:</strong> {id}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          <strong>Name:</strong> {name}
        </Typography>
      </Box>

      <Button 
        variant="contained" 
        onClick={handleLogout}
        sx={{
          backgroundColor: "#9414FF", 
          color: "white", 
          padding: "10px 20px", 
          textTransform: "none", 
          '&:hover': { backgroundColor: "#7a0db1" }
        }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Dashboard;
