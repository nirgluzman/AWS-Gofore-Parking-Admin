import { Route, Routes } from "react-router-dom";

import { CssBaseline } from "@mui/material"; // to kickstart an elegant, consistent, and simple baseline

import {
  Navbar,
  SignIn,
  SignUp,
  SignUpConfirm,
  ParkingData,
  ProtectedRoute,
} from "./components";

function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup-confirm/:username" element={<SignUpConfirm />} />
        <Route
          path="/parking-data"
          element={
            <ProtectedRoute>
              <ParkingData />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
