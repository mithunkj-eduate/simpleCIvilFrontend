"use client";

import { DeliveryStatus } from "@/types/order";

const deliverySteps = [
  { id: DeliveryStatus.PENDING, label: "Pending" },
  { id: DeliveryStatus.SHIPPED, label: "Shipped" },
  { id: DeliveryStatus.DELIVERED, label: "Delivered" },
  //   { id: DeliveryStatus.RETURNED, label: "Returned" },
];

export function DeliveryProgress({ status }: { status: DeliveryStatus }) {
  const current = deliverySteps.findIndex((s) => s.id === status);

  return (
    <div className="w-full px-4 py-4">
      <div className="relative flex items-center justify-between">
        {/* Connector Line */}
        <div className="absolute top-3 left-0 right-0 h-1 bg-gray-300" />

        {deliverySteps.map((step, i) => {
          const isCompleted = i < current;
          const isCurrent = i === current;

          return (
            <div key={i} className="flex flex-col items-center flex-1">
              {/* Dot */}
              <div
                className={`z-10 w-6 h-6 rounded-full border 
                  ${isCompleted ? "bg-green-600 border-green-600" : ""}
                  ${
                    isCurrent ? "bg-blue-600 border-blue-600 animate-pulse" : ""
                  }
                  ${i > current ? "bg-gray-300 border-gray-300" : ""}`}
              />

              {/* Text */}
              <p
                className={`mt-2 text-xs 
                  ${isCompleted ? "text-green-700" : ""}
                  ${isCurrent ? "text-blue-600" : ""}
                  ${i > current ? "text-gray-400" : ""}`}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
