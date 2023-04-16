import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";

import LocalParkingIcon from "@mui/icons-material/LocalParking";

import { UserAuth } from "../context/AuthContext";

export function Navbar() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { getAuthenticatedUser, logoutUser } = UserAuth();

  const handleLogout = async () => {
    setError("");
    try {
      await logoutUser();
      navigate("/");
      console.log("You are logged out");
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="xxlarge"
            edge="start"
            color="inherit"
            aria-label="logo"
          >
            <LocalParkingIcon sx={{ border: 2 }} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GOFORE Parking Garage
          </Typography>
          {!!getAuthenticatedUser() && (
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {error && (
        <Alert
          variant="filled"
          severity="error"
          onClose={() => {
            setError("");
          }}
        >
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      <Box
        sx={{
          typography: "h2",
          textAlign: "center",
          fontWeight: "regular",
          m: 5,
        }}
      >
        PARK MANAGER
      </Box>
    </>
  );
}
