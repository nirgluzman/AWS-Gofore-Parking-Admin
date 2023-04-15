import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { UserAuth } from "../context/AuthContext";

import {
  Button,
  TextField,
  Typography,
  Box,
  Container,
  Alert,
  AlertTitle,
} from "@mui/material";

export function SignUpConfirm() {
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { username } = useParams(); // Get username from URL

  const { confirmUser } = UserAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const data = new FormData(event.currentTarget);

    try {
      const result = await confirmUser(username, data.get("code"));
      console.log("confirming the new created user:", result);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
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
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight="normal">
          Please enter the verification code sent to your email:
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 3, width: "100%" }}
        >
          <TextField
            margin="normal"
            fullWidth
            required
            name="code"
            label="Verification Code"
            type="text"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
