// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   GoogleMap,
//   Marker,
//   DirectionsRenderer,
//   useJsApiLoader,
// } from "@react-google-maps/api";
// import Navbar from "@/components/commen/Navbar";
// import { LicenseTypes } from "@/utils/enum.types";
// import { useSearchParams } from "next/navigation";

// const containerStyle = {
//   width: "100%",
//   height: "500px",
// };

// export default function RouteMap() {
//   const searchParams = useSearchParams();

//   const lat = Number(searchParams.get("lat"));
//   const lng = Number(searchParams.get("lng"));

//   const destination = { lat, lng };

//   // USER'S LIVE SOURCE LOCATION
//   const [source, setSource] = useState<{ lat: number; lng: number } | null>(
//     null
//   );

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey:
//       process.env.GOOGLE_API_KEY ?? "AIzaSyADsDeet4Re2Yt-lGU83dyLeMmXeaXrPfg",
//   });

//   const [directions, setDirections] =
//     useState<google.maps.DirectionsResult | null>(null);

//   // GET USER'S CURRENT LOCATION
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           setSource({
//             lat: pos.coords.latitude,
//             lng: pos.coords.longitude,
//           });
//         },
//         (err) => {
//           console.error("Error getting location:", err);
//           alert("Unable to get your location");
//         }
//       );
//     }
//   }, []);

//   //  Build route once map is loaded & source/destination available
//   useEffect(() => {
//     if (isLoaded && source && lat && lng) {
//       const directionsService = new google.maps.DirectionsService();

//       directionsService.route(
//         {
//           origin: source,
//           destination: destination,
//           travelMode: google.maps.TravelMode.DRIVING,
//         },
//         (result, status) => {
//           if (status === "OK" && result) {
//             setDirections(result);
//           } else {
//             console.error("Directions request failed:", status);
//           }
//         }
//       );
//     }
//   }, [isLoaded, source, lat, lng]);

//   if (!isLoaded) return <p>Loading Map...</p>;
//   if (!source) return <p>Fetching your current location...</p>;

//   return (
//     <div className="bg-white">
//       <Navbar NavType={LicenseTypes.RAIDER} />

//       <div className="mx-auto max-w-7xl mt-16 px-4 py-12">
//         <GoogleMap
//           mapContainerStyle={containerStyle}
//           center={source}
//           zoom={9}
//           options={{
//             disableDefaultUI: true,
//             gestureHandling: "greedy",
//           }}
//         >
//           {/* User Current Location */}
//           <Marker
//             position={source}
//             title="Your Location"
//             icon={{
//               url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
//             }}
//           />

//           {/* Destination Location */}
//           <Marker
//             position={destination}
//             title="Destination"
//             icon={{
//               url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
//             }}
//           />

//           {/* Route */}
//           {directions && <DirectionsRenderer directions={directions} />}
//         </GoogleMap>
//       </div>
//     </div>
//   );
// }

import RouteMap from '@/components/RouteMap'
import React from 'react'

const page = () => {
  return (
    <div>
      <RouteMap />
    </div>
  )
}

export default page

