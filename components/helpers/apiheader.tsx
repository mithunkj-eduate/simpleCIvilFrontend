"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const Api = () => {
  const [token, setToken] = useState<string | null>(null);

  const BASE_URL = "http://localhost:9000/api";

  useEffect(() => {
    // This code runs only on the client-side
    if (typeof window !== "undefined") {
      // const storedData = localStorage.getItem("token");
      const storedData =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODg0YzU5Mjg2YjQ2NWE3ZWUwYTBmZTAiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTQwNjM3MzQsImV4cCI6MTc1OTI0NzczNH0.0QIgoY6EiK4CkktDaALRRs7kJ8zkcfYpMLZWMdhLcUE";
      if (storedData) {
        setToken(storedData);
      }
    }
  }, []);

  let API_HEADER;
  if (token)
    API_HEADER = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    return {
    TOKEN: token,
    API_HEADER,
    BASE_URL,
  };
};

export default Api;

export const api = axios.create({ baseURL: "http://localhost:9000/api" });
