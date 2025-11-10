"use client";
import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import Navbar from "@/components/commen/Navbar";
import { LicenseTypes } from "@/utils/enum.types";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const source = { lat: 13.027987665332265, lng: 77.63213867833655 }; // Bengaluru
const destination = { lat: 13.10044809921541, lng: 77.56643661112027 }; // Tumakuru

export default function RouteMap() {

  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyADsDeet4Re2Yt-lGU83dyLeMmXeaXrPfg", // process.env.REACT_APP_GOOGLE_MAPS_API_KEY,,
  });

  // const [directions, setDirections] = useState<google.maps.DirectionsResult>();
  const [directions, setDirections] = useState();

  useEffect(() => {
    if (isLoaded && !directions) {
      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: source,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK" && result) {
            setDirections(result);
          } else {
            console.error("Directions request failed:", status);
          }
        }
      );
    }
  }, [isLoaded, directions]);

  if (!isLoaded) return <p>Loading Map...</p>;

  return (
    <div className="bg-white ">
      <Navbar NavType={LicenseTypes.RAIDER} />
      <div className="mx-auto max-w-7xl mt-16 px-4 py-12 sm:px-6 lg:px-8">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={source}
          zoom={9}
          options={{
            disableDefaultUI: true,
            gestureHandling: "greedy",
          }}
        >
          {/* Markers */}
          <Marker
            position={source}
            title="Your Location"
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
          />
          <Marker
            position={destination}
            title="Destination"
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            }}
          />

          {/* Route Line */}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>
    </div>
  );
}
