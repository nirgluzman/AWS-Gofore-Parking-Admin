import { Route, Routes } from "react-router-dom";

import { CssBaseline } from "@mui/material"; // to kickstart an elegant, consistent, and simple baseline

import {
  Navbar,
  Signin,
  Signup,
  SignupConfirm,
  ParkingData,
  ProtectedRoute,
} from "./components";

function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup-confirm/:username" element={<SignupConfirm />} />
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
