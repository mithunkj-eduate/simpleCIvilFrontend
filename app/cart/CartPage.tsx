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



export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
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
        setCartItems(response.data.data);
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

  const handleOrderAdded = () => {
    setCartItems([]); // Clear cart after order (mock)
    router.push("/orders");
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.saleTerms
      ? item.saleTerms.salePrice * item.quantity
      : item.rentalTerms?.[0]?.pricePerUnit || 0;
    return sum + price;
  }, 0);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error || !cartItems)
    return (
      <p className="text-red-500 text-center py-10">
        {error || "Cart not available"}
      </p>
    );

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Shopping Cart
        </h1>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
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

            {/* Order Summary */}
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
                {/* <Button
                  type="button"
                  onClick={() => setIsAddOrderModalOpen(true)}
                  disabled={cartItems.length === 0}
                  mode="primary"
                  className="mt-6 w-full"
                >
                  Place Order
                </Button> */}

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
        )}
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
