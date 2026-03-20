"use client"
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-48 h-48">
          <div className="route-dot bg-yellow-400"></div>
          <div className="route-dot bg-cyan-500 delay-200"></div>
          <div className="route-dot bg-green-400 delay-400"></div>
        </div>

        {/* <p className="text-gray-500 animate-pulse">Routing...</p> */}

        <style jsx>{`
          .route-dot {
            position: absolute;
            width: 24px;
            height: 24px;
            border-radius: 9999px;
            animation: zigzag 1s ease-in-out infinite;
          }

          .delay-200 {
            animation-delay: 0.2s;
          }
          
          .delay-400 {
            animation-delay: 0.4s;
          }

          @keyframes zigzag {
            0% {
              transform: translate(0, 100px);
            }
            25% {
              transform: translate(60px, 80px);
            }
            50% {
              transform: translate(100px, 40px);
            }
            75% {
              transform: translate(40px, 20px);
            }
            100% {
              transform: translate(0, 100px);
            }
          }
        `}</style>
      </div>

      {/* <div className="animate-spin rounded-full h-20 w-20 border-4 border-t-orange-300 border-gray-200"></div> */}
    </div>
  );
};

export default Loading;
