import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";

import { UserAuth } from "../context/AuthContext";

import {
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Container,
  Alert,
  AlertTitle,
} from "@mui/material";

export function SignUp() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { createUser } = UserAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const data = new FormData(event.currentTarget);

    try {
      const result = await createUser(
        data.get("username"),
        data.get("email"),
        data.get("password")
      );
      console.log("signup user:", result);
      navigate(`/signup-confirm/${data.get("username")}`);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {error && (
        <Alert
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
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            fullWidth
            required
            label="Username"
            name="username"
            type="text"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            required
            label="Email Address"
            name="email"
            type="email"
          />
          <TextField
            margin="normal"
            fullWidth
            required
            name="password"
            label="Password"
            type="password"
            helperText="Password must be at least 8 characters long, contains at least one number, one lowercase and one uppercase."
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
