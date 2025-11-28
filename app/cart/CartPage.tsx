/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Api, { api } from "@/components/helpers/apiheader";
import { Button } from "@/stories/Button/Button";
import AddOrder from "./AddOrder";
import { AppContext } from "@/context/context";
import { payloadTypes } from "@/context/reducer";
import { ICartItemsArray } from "@/types/cart";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<ICartItemsArray[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { dispatch } = useContext(AppContext);
  const [isAddOrderModalOpen, setIsAddOrderModalOpen] = useState(false);
  const { TOKEN } = Api();
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!TOKEN) throw new Error("Authentication token is missing");
        const response = await api.get("/carts", {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });
        if (!response.data.data) throw new Error("Failed to fetch cart");
        console.log(response.data, "data");
        setCartItems(response.data.data.items);
      } catch (err) {
        setError("Error fetching cart. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (TOKEN) fetchCart();
  }, [TOKEN]);

  const handleRemoveItem = async (productId: string) => {
    try {
      if (!TOKEN) throw new Error("Authentication token is missing");
      const response = await api.delete(`/carts/${productId}`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      console.log(response.data);
      if (response.data) {
        setCartItems((prev) => prev.filter((item) => item._id !== productId));
      } else {
        throw new Error("Failed to remove item from cart");
      }
    } catch (err) {
      console.error(err);
      alert("Error removing item from cart. Please try again.");
    }

    // Add API call to remove from backend cart
  };

  // const handleOrderAdded = () => {
  //   setCartItems([]); // Clear cart after order (mock)
  //   router.push("/orders");
  // };

  // const totalPrice = cartItems.reduce((sum, item) => {
  //   const price = item.saleTerms
  //     ? item.saleTerms.salePrice * item.quantity
  //     : item.rentalTerms?.[0]?.pricePerUnit || 0;
  //   return sum + price;
  // }, 0);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error || !cartItems)
    return (
      <p className="text-red-500 text-center py-10">
        {error || "Cart not available"}
      </p>
    );

  const yourDeleteFunction = () => {
    console.log("delete");
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Shopping Cart
        </h1>

        {/* Cart Items */}
        {/* {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 py-10">Your cart is empty.</p>
        ) : (
          <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-x-12">
            <div className="lg:col-span-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item._id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={
                            "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-08.jpg"
                          }
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{item.name}</h3>
                            <p className="ml-4">
                              {item.saleTerms
                                ? `₹${(
                                    item.saleTerms.salePrice * item.quantity
                                  ).toFixed(2)}`
                                : item.rentalTerms?.[0]
                                ? `₹${item.rentalTerms[0].pricePerUnit} / ${item.rentalTerms[0].minduration}`
                                : "N/A"}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.storeId?.name} | Sold by: {item.ownerId?.name}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">Qty: {item.quantity}</p>
                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(item._id)}
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              <XMarkIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 lg:col-span-4 lg:mt-0">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-medium text-gray-900">
                  Order Summary
                </h2>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Subtotal</p>
                    <p className="text-sm font-medium text-gray-900">
                      ₹{totalPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Shipping</p>
                    <p className="text-sm font-medium text-gray-900">Free</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <p className="text-base font-medium text-gray-900">Total</p>
                    <p className="text-base font-medium text-gray-900">
                      ₹{totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              
                <Button
                  type="button"
                  onClick={() => {
                    dispatch({
                      type: payloadTypes.SET_CART,
                      payload: { cart: cartItems },
                    });

                    router.push("/checkout");
                  }}
                  mode="primary"
                  className="mt-6 w-full"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        )} */}

        <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems.map((item) => {
                  // Extract relevant data for clarity
                  const variant = item.customVariant || {};
                  const displayPrice =
                    item.salePrice || item.saleTerms?.salePrice || 0;
                  const itemTotal = (displayPrice * item.quantity).toFixed(2);

                  return (
                    <li key={item._id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={
                            "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-08.jpg"
                          }
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{item.name}</h3>
                            {/* Display total item price */}
                            <p className="ml-4">
                              {item.salePrice ? `₹${itemTotal}` : "N/A"}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.storeId?.name} | Sold by: {item.ownerId?.name}
                          </p>

                          {/* --- NEW VARIANT DISPLAY SECTION --- */}
                          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                            {/* Display Color */}
                            {variant.color && (
                              <p>
                                <span className="font-semibold">Color:</span>{" "}
                                {variant.color}
                              </p>
                            )}
                            {/* Display Size */}
                            {variant.size && (
                              <p>
                                <span className="font-semibold">Size:</span>{" "}
                                {variant.size}
                              </p>
                            )}
                            {/* Display Weight */}
                            {variant.weight && (
                              <p>
                                <span className="font-semibold">Weight:</span>{" "}
                                {variant.weight}
                              </p>
                            )}
                            {/* Display Material */}
                            {variant.material && (
                              <p>
                                <span className="font-semibold">Material:</span>{" "}
                                {variant.material}
                              </p>
                            )}
                          </div>
                          {/* --- END NEW VARIANT DISPLAY SECTION --- */}
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">Qty: {item.quantity}</p>
                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(item._id)}
                              className="font-medium text-red-600 hover:text-red-500"
                            >
                              {/* Changed button text/icon to be clearer for delete */}
                              <span className="sr-only">Remove</span>
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="mt-8 lg:col-span-4 lg:mt-0">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-900">
                Order Summary
              </h2>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <p className="text-sm font-medium text-gray-900">
                    {/* ₹{totalPrice.toFixed(2)} */}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Shipping</p>
                  <p className="text-sm font-medium text-gray-900">Free</p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <p className="text-base font-medium text-gray-900">Total</p>
                  <p className="text-base font-medium text-gray-900">
                    {/* ₹{totalPrice.toFixed(2)} */}
                  </p>
                </div>
              </div>

              <Button
                type="button"
                onClick={() => {
                  dispatch({
                    type: payloadTypes.SET_CART,
                    payload: { cart: cartItems },
                  });

                  router.push("/checkout");
                }}
                mode="primary"
                className="mt-6 w-full"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>

          {/* ... (Order Summary section remains unchanged) ... */}
        </div>
      </div>

      {/* {isAddOrderModalOpen && (
        <AddOrder
          product={{
            _id: cartItems[0]?._id || "",
            name: cartItems[0]?.name || "",
            venderId: {
              _id: cartItems[0]?.ownerId._id || "",
              name: cartItems[0]?.ownerId.name || "",
            },
            storeId: {
              _id: cartItems[0]?.storeId._id || "",
              name: cartItems[0]?.storeId.name || "",
            },
            saleTerms: cartItems[0]?.saleTerms,
          }}
          setModalFlag={setIsAddOrderModalOpen}
          onOrderAdded={handleOrderAdded}
        />
      )} */}
    </div>
  );
}

// Assuming 'item' is one object from the data.items array (e.g., the first one)
const CartItem = ({ item, onDelete }) => {
  const productName = item.productId?.name || "Unknown Product";
  const itemPrice = item.salePrice || item.productId?.saleTerms?.salePrice || 0;
  const quantity = item.quantity;
  const totalItemPrice = (itemPrice * quantity).toFixed(2);
  const cartItemId = item._id; // Unique ID to pass to the delete handler

  return (
    <div className="flex items-center p-4 border-b border-gray-200 last:border-b-0 bg-white hover:bg-gray-50 transition-colors duration-150">
      {/* 1. Product Image Placeholder (Recommended for a real cart) */}
      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg mr-4">
        {/*  */}
      </div>

      {/* 2. Product Details */}
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {productName}
        </h3>

        {/* Variant Details (if they exist) */}
        {(item.selectedColor || item.selectedSize) && (
          <p className="text-sm text-gray-500 mt-0.5">
            {item.selectedColor && `Color: ${item.selectedColor.toUpperCase()}`}
            {item.selectedColor && item.selectedSize && " | "}
            {item.selectedSize && `Size: ${item.selectedSize}`}
          </p>
        )}

        {/* Price and Quantity */}
        <div className="flex items-center space-x-4 mt-2">
          <p className="text-base font-medium text-gray-900">
            ${itemPrice.toFixed(2)}
          </p>
          <span className="text-gray-500">x {quantity}</span>
        </div>
      </div>

      {/* 3. Total Price and Delete Button (Right Side) */}
      <div className="flex flex-col items-end ml-4">
        {/* Subtotal for the item */}
        <p className="text-xl font-bold text-gray-900 mb-3">
          ${totalItemPrice}
        </p>

        {/* DELETE BUTTON (User-Friendly Design) */}
        <button
          // Pass the unique item ID to your delete handler function
          // onClick={() => onDelete(cartItemId)}
          className="
            flex items-center px-3 py-1.5 text-sm font-medium 
            text-red-600 bg-red-100 rounded-full 
            hover:bg-red-200 hover:text-red-700 
            transition-colors duration-150 focus:outline-none focus:ring-2 
            focus:ring-red-500 focus:ring-opacity-50
          "
          aria-label={`Remove ${productName} from cart`}
        >
          {/* Trash Icon (Using a common icon library like Heroicons) */}
          <svg
            className="w-4 h-4 mr-1.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            ></path>
          </svg>
          <span className="hidden sm:inline">Remove</span>{" "}
          {/* Text visible on larger screens */}
        </button>
      </div>
    </div>
  );
};
