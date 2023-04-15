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

export function SignIn() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginUser } = UserAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const data = new FormData(event.currentTarget);

    try {
      const result = await loginUser(
        data.get("username"),
        data.get("password")
      );
      console.log("signin user:", result);
      navigate("/parking-data");
    } catch (err) {
      setError(err.message);
      console.log(err.message);
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
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            fullWidth
            required
            name="username"
            label="Username"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            required
            name="password"
            label="Password"
            type="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
