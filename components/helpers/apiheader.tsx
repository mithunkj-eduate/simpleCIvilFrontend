"use client";
import axios from "axios";
import Cookies from "js-cookie";

const Api = () => {
  const token1 = Cookies.get("token") ?? "";
  const token2 =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODg0YzU5Mjg2YjQ2NWE3ZWUwYTBmZTAiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTQwNjM3MzQsImV4cCI6MTc1OTI0NzczNH0.0QIgoY6EiK4CkktDaALRRs7kJ8zkcfYpMLZWMdhLcUE";

  // const [token, setToken] = useState<string | null>(null);

  // useEffect(() => {
  //   // This code runs only on the client-side
  //   if (typeof window !== "undefined") {
  //     // const storedData = localStorage.getItem("token");
  //     const storedData =
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODg0YzU5Mjg2YjQ2NWE3ZWUwYTBmZTAiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTQwNjM3MzQsImV4cCI6MTc1OTI0NzczNH0.0QIgoY6EiK4CkktDaALRRs7kJ8zkcfYpMLZWMdhLcUE";
  //     if (storedData) {
  //       setToken(storedData);
  //     }
  //   }
  // }, []);

  // let API_HEADER;
  // if (token)
  //   API_HEADER = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //   };

  return {
    TOKEN: token1 ? token1 : token2,
  };
};

export default Api;

// In a utility file or where needed
export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL
    : process.env.NODE_LOCATION === "office"
    ? process.env.NEXT_PUBLIC_DEVELOPMENT_BASE_URL_OFFICE
    : process.env.NODE_LOCATION === "home"
    ? process.env.NEXT_PUBLIC_DEVELOPMENT_BASE_URL_HOME
    : process.env.NEXT_PUBLIC_DEVELOPMENT_BASE_URL;

export const api = axios.create({
  baseURL: `${BASE_URL ? BASE_URL : "http://localhost:9000"}` + "/api",
});
