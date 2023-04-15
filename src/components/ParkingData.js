import axios from "axios";

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import SyncIcon from "@mui/icons-material/Sync";

function createData(parkingSpot, vrn, startTime) {
  return { parkingSpot, vrn, startTime };
}

const rows = [
  createData(1, "11-222-33", "12:00"),
  createData(2, "44-555-11", "05:00"),
  createData(3, "", ""),
  createData(4, "", ""),
  createData(5, "88-999-00", "12:00"),
];

export function ParkingData() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <SyncIcon fontSize="large" />
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
            {rows.map((row) => (
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
