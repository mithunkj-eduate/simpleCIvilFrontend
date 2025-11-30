/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Api, { api } from "@/components/helpers/apiheader";
import { Button } from "@/stories/Button/Button";
import { AppContext } from "@/context/context";
import { payloadTypes } from "@/context/reducer";
import { ICartItem } from "@/types/cart";
import { Operation } from "@/utils/enum.types";
import { msgType } from "@/utils/commenTypes";
import { emptyMessage } from "@/utils/constants";
import MessageModal from "@/customComponents/MessageModal";
import { createOrdersFromCart } from "../checkout/page";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { dispatch } = useContext(AppContext);
  const [message, setMessage] = useState<msgType>(emptyMessage);
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

  const handleRemoveItem = async (cartId: string) => {
    try {
      if (!TOKEN) throw new Error("Authentication token is missing");
      const response = await api.delete(`/carts/${cartId}`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      console.log(response.data);
      if (response.data) {
        setCartItems((prev) => prev.filter((item) => item._id !== cartId));
        setMessage({
          flag: true,
          message: "Item removed successfully",
          operation: Operation.DELETE,
        });
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

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.salePrice ? item.salePrice * item.quantity : 0;
    return sum + price;
  }, 0);

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.salePrice ? item.salePrice * item.quantity : 0;
    return sum + price;
  }, 0);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Shopping Cart
        </h1>

        <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems.map((item) => {
                  // Extract relevant data for clarity
                  const variant = item.customVariant || {};
                  const displayPrice = item.salePrice || 0;
                  const itemTotal = (displayPrice * item.quantity).toFixed(2);

                  return (
                    <li key={item._id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={
                            "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-08.jpg"
                          }
                          alt={item.productId?.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{item.productId?.name}</h3>
                            {/* Display total item price */}
                            <p className="ml-4">
                              {item.salePrice ? `₹${itemTotal}` : "N/A"}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.storeId?.name} | Sold by:{" "}
                            {item.vendorId?.name}
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
                    ₹{subtotal.toFixed(2)}
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
      </div>

      <MessageModal
        handleClose={() => {
          setMessage(emptyMessage);
        }}
        modalFlag={message.flag}
        operation={message.operation}
        value={message.message}
      />
    </div>
  );
}
