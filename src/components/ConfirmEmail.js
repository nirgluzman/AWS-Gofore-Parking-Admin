import {
  CssBaseline,
  Button,
  TextField,
  Typography,
  Box,
  Container,
} from "@mui/material";

export function ConfirmEmail() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      code: data.get("code"),
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
