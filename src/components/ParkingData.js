import { useState } from "react";

import { UserAuth } from "../context/AuthContext";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Alert,
  AlertTitle,
} from "@mui/material";

import SyncIcon from "@mui/icons-material/Sync";

import axios from "axios";

export function ParkingData() {
  const [parkingData, setParkingData] = useState([]);
  const [error, setError] = useState("");

  const { isAuthenticated } = UserAuth();

  const handleGetData = async () => {
    setError("");

    try {
      const { idToken } = await isAuthenticated();

      const result = await axios.get(process.env.REACT_APP_API_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: idToken,
        },
      });

      if (result.data.length === 0) {
        throw new Error("An error occurred, please try again!");
      }

      setParkingData(result.data);
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
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
      <IconButton onClick={handleGetData} aria-label="refresh" size="large">
        <SyncIcon fontSize="inherit" />
      </IconButton>

      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "600px",
          margin: "auto",
          marginTop: "20px",
          marginBottom: "20px",
          backgroundColor: "#f5f5f5",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Table size="medium" aria-label="parking data">
          <TableHead>
            <TableRow>
              <TableCell align="center">Parking Spot</TableCell>
              <TableCell>Registration Number </TableCell>
              <TableCell>Start Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parkingData.map((row) => (
              <TableRow
                key={row.parkingSpot}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {row.parkingSpot}
                </TableCell>
                <TableCell>{row.vrn}</TableCell>
                <TableCell>{row.startTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
