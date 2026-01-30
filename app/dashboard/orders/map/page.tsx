import RouteMap from "@/components/RouteMap";
import React, { Suspense } from "react";

const page = () => {
  return (
    <section>
      <h1>Orders Map</h1>
      <Suspense fallback={<div>Loading Map...</div>}>
        <RouteMap />
      </Suspense>
    </section>
  );
};

export default page;
