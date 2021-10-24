import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { axiosInstance, setToken, setUserId } from "../constants";

const LoginPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axiosInstance
      .post("/api-token-auth/", {
        username: data.get("username"),
        password: data.get("password"),
      })
      .then((response) => {
        if (response.data && response.data.token) {
          setToken(response.data.token);
        }
      })
      .catch((error) => {
        console.error(error.message);
      })
      .then(() => {
        axiosInstance
          .post("/api/retrieve_user_by_username/", {
            username: data.get("username"),
          })
          .then((response) => {
            if (response.data && response.data.id) {
              setUserId(response.data.id);
              window.location = "/";
            }
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => {
        console.error(error.message);
      });

    axiosInstance
      .post("/api/retrieve_user_by_username/", {
        username: data.get("username"),
      })
      .then((response) => {
        if (response.data && response.data.id) {
          localStorage.setItem("id", response.data.id);
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
