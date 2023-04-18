import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";

import { UserAuth } from "../context/AuthContext";

const ParkContext = createContext();

export const ParkContextProvider = ({ children }) => {
  const [parkingData, setParkingData] = useState([]);
  const [error, setError] = useState("");

  const { isAuthenticated } = UserAuth();

  const fetchParkData = async () => {
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
      console.log(err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => fetchParkData(), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ParkContext.Provider value={{ error, setError, parkingData }}>
      {children}
    </ParkContext.Provider>
  );
};

export const Park = () => {
  return useContext(ParkContext);
};
