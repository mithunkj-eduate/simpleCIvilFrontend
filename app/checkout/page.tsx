"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import { PaymentMethod } from "@/types/order";
import { Input } from "@/stories/Input/Input";
import { Label } from "@/stories/Label/Label";
import { Button } from "@/stories/Button/Button";

import { AutoCompleteOption } from "@/utils/commenTypes";
import AutocompleteSelect from "@/hooks/StoreAutocompleteSelect";
import { CartItem } from "@/types/cart";

const paymentMethodOptions = Object.values(PaymentMethod).map((method) => ({
  value: method,
  label: method.charAt(0).toUpperCase() + method.slice(1),
}));

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    deliveryAddress: "",
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<AutoCompleteOption | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { state } = useContext(AppContext);
  const router = useRouter();
  const { TOKEN } = Api();
  const cartItems: CartItem[] = state.cart || [];

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.saleTerms
      ? item.saleTerms.salePrice * item.quantity
      : item.rentalTerms?.[0]?.pricePerUnit || 0;
    return sum + price;
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!TOKEN) throw new Error("Authentication token is missing");
      if (!selectedPaymentMethod)
        throw new Error("Please select a payment method");
      if (
        !formData.fullName ||
        !formData.email ||
        !formData.phoneNumber ||
        !formData.deliveryAddress
      ) {
        throw new Error("All fields are required");
      }

      // Process each cart item as a separate order
      for (const item of cartItems) {
        const body = {
          venderId: item.ownerId._id,
          productId: item._id,
          storeId: item.storeId._id,
          quantity: item.quantity,
          totalPrice: item.saleTerms
            ? item.saleTerms.salePrice * item.quantity
            : item.rentalTerms?.[0].pricePerUnit || 0,
          paymentMethod: selectedPaymentMethod.value,
          deliveryAddress: formData.deliveryAddress,
        };

        const response = await api.post("/orders", body, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });

        if (!response.data.data) throw new Error("Failed to place order");
      }

      alert("Order placed successfully");
      // Clear cart and redirect
      state.cart = [];
      router.push("/orders");
    } catch (err: any) {
      setError(err.message || "Failed to place order. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Checkout
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 py-10">Your cart is empty.</p>
        ) : (
          <div className="mt-8 lg:grid lg:grid-cols-12 lg:gap-x-12">
            {/* Checkout Form */}
            <div className="lg:col-span-8">
              <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <h2 className="text-lg font-medium text-gray-900">
                  Shipping Information
                </h2>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="mt-1"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phoneNumber: e.target.value,
                        })
                      }
                      required
                      className="mt-1"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="deliveryAddress">Delivery Address</Label>
                    <Input
                      type="text"
                      name="deliveryAddress"
                      value={formData.deliveryAddress}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          deliveryAddress: e.target.value,
                        })
                      }
                      required
                      className="mt-1"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <AutocompleteSelect
                      label="Product Type"
                      options={paymentMethodOptions}
                      value={selectedPaymentMethod}
                      onChange={(e, newValue) =>
                        setSelectedPaymentMethod(
                          newValue as AutoCompleteOption | null
                        )
                      }
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  mode="primary"
                  className="mt-6 w-full"
                >
                  {loading ? "Processing..." : "Place Order"}
                </Button>
              </form>
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
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
