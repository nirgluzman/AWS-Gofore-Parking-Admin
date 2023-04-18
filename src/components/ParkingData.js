import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  AlertTitle,
} from "@mui/material";

import { Park } from "../context/ParkContext";

export function ParkingData() {
  const { error, setError, parkingData } = Park();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
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
