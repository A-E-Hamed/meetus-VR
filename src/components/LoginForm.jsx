import React, { useState } from "react";
import { TextField, Button, InputAdornment, Box, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isFormValid = emailRegex.test(email) && password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const body = {
      email,
      password,
      isEmployee: true,
    };

    try {
      const response = await axios.post(
        "https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login successful:", response.data);

      const { id, name } = response.data.userInfo;

      navigate("/dashboard", { state: { id, name } });
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 400, margin: "auto", padding: 3 }}>
      <p style={{ fontSize: "56px", margin: "1rem" }}>Welcome back</p>
      <p
        style={{
          width: "75%",
          margin: "0 auto",
          marginBottom: "2rem",
          color: "#62626B",
        }}
      >
        Step into our shopping metaverse for an unforgettable shopping
        experience
      </p>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            shrink: email.length > 0,
            style: { color: "#62626B", fontSize: "16px", marginLeft: "36px" },
          }}
          error={!emailRegex.test(email) && email !== ""}
          helperText={
            !emailRegex.test(email) && email !== ""
              ? "Invalid email format"
              : ""
          }
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            shrink: password.length > 0,
            style: { color: "#62626B", fontSize: "16px", marginLeft: "36px" },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, backgroundColor: "#9414FF" }}
          style={{ height: "43px" }}
          disabled={!isFormValid || loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
        {error && (
          <Typography
            sx={{
              mt: 2,
              color: "#d32f2f",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {error}
          </Typography>
        )}

        <p style={{ fontSize: "16px", color: "#62626B" }}>
          Don't have an account? Sign up
        </p>
      </form>
    </Box>
  );
};

export default LoginForm;
