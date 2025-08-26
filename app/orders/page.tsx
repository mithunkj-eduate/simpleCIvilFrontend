/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";

interface OrderItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  deliveredDate: string;
}

interface Order {
  orderNumber: string;
  datePlaced: string;
  totalAmount: number;
  items: OrderItem[];
}

const orders: Order[] = [
  {
    orderNumber: "WU88191111",
    datePlaced: "Jul 6, 2021",
    totalAmount: 160,
    items: [
      {
        id: "1",
        name: "Micro Backpack",
        description:
          "Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use.",
        price: 70,
        image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-05.jpg",
        deliveredDate: "July 12, 2021",
      },
      {
        id: "2",
        name: "Nomad Shopping Tote",
        description:
          "This durable shopping tote is perfect for the world traveler. Its yellow canvas construction is water, fray, tear resistant. The matching handle, backpack straps, and shoulder loops provide multiple carry options for a day out on your next adventure.",
        price: 90,
        image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-05.jpg",
        deliveredDate: "July 12, 2021",
      },
    ],
  },
];

const OrderHistory = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Order history</h1>
      <p className="text-gray-500 mb-6">
        Check the status of recent orders, manage returns, and discover similar
        products.
      </p>

      {orders.map((order) => (
        <div
          key={order.orderNumber}
          className="border border-gray-300 rounded-lg shadow-sm mb-6 bg-white"
        >
          {/* Order header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-300 text-sm text-gray-700">
            <div>
              <p>
                <span className="font-medium">Order number:</span>{" "}
                {order.orderNumber}
              </p>
              <p>
                <span className="font-medium">Date placed:</span>{" "}
                {order.datePlaced}
              </p>
              <p>
                <span className="font-medium">Total amount:</span> $
                {order.totalAmount.toFixed(2)}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
                View Order
              </button>
              <button className="px-4 py-2 border rounded-md hover:bg-gray-50">
                View Invoice
              </button>
            </div>
          </div>

          {/* Order items */}
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row gap-4 p-4 border-t border-gray-300"
            >
              {/* Product image */}
              <div className="w-24 h-24 relative flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  
                  className="object-contain rounded-md fill"
                />
              </div>

              {/* Product details */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-medium">{item.name}</h2>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                  <p className="font-medium">${item.price.toFixed(2)}</p>
                </div>

                {/* Delivery info */}
                <div className="flex items-center mt-2 text-green-500 text-sm text-xs/5">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Delivered on {item.deliveredDate}
                </div>

                {/* Action buttons */}
                <div className="flex gap-4 mt-2 text-sm">
                  <button className="text-purple-600 hover:underline">
                    View product
                  </button>
                  <span className="text-gray-300">|</span>
                  <button className="text-purple-600 hover:underline">
                    Buy again
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      {/* <OrderHistory /> */}
    </div>
  );
};

export default OrderHistory;
