"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import { PaymentMethod } from "@/types/order";
import { Input } from "@/stories/Input/Input";
import { Label } from "@/stories/Label/Label";
import { Button } from "@/stories/Button/Button";
import { msgType } from "@/utils/commenTypes";
import { Operation } from "@/utils/enum.types";
import { emptyMessage } from "@/utils/constants";
import MessageModal from "@/customComponents/MessageModal";

import { Formik, Form, ErrorMessage } from "formik";
import { checkoutValidation } from "@/validations/validationSchemas";
import AutocompleteSelect from "@/hooks/StoreAutocompleteSelect";

export default function CheckoutPage() {
  const { state } = useContext(AppContext);
  const router = useRouter();
  const { TOKEN } = Api();

  const cartItems = state.cart || [];
  const [message, setMessage] = useState<msgType>(emptyMessage);

  const [source, setSource] = useState<{ lat: number; lng: number } | null>(
    null
  );

  // GET USER LOCATION
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setSource({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      });
    }
  }, []);

  // CALCULATE TOTALS
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.saleTerms
      ? item.saleTerms.salePrice * item.quantity
      : item.rentalTerms?.[0]?.pricePerUnit || 0;
    return sum + price;
  }, 0);

  const initialValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    deliveryAddress: "",
    paymentMethod: "",
  };

  /**
   * ---------------------------------------------------------
   * HANDLE ORDER CREATE - FOR NEW SCHEMA
   * ---------------------------------------------------------
   */
  const handleSubmit = async (values: any) => {
    try {
      if (!TOKEN) throw new Error("Authentication token missing");

      const body =
        state.cart &&
        state.cart.map((item) => ({
          venderId: item.vendorId,
          productId: item.productId,
          storeId: item.storeId,
          quantity: item.quantity,
          totalPrice: item.isRental
            ? item.rentalPricePerUnit * item.quantity
            : item.salePrice * item.quantity,
          paymentMethod: values.paymentMethod,
          deliveryAddress: values.deliveryAddress,
          location: source ? [source.lat, source.lng] : [],
          selectedColor: item.selectedColor,
          selectedSize: item.selectedSize,
          selectedWeight: item.selectedWeight,
          rentalStartDate: item.rentalStartDate,
          rentalEndDate: item.rentalEndDate,
        }));

      await api.post("/orders", body, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      setMessage({
        flag: true,
        message: "Order placed successfully",
        operation: Operation.CREATE,
      });
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleClose = () => {
    setMessage(emptyMessage);
    state.cart = [];
    router.push("/orders");
  };

  const paymentMethodOptions = Object.values(PaymentMethod).map((method) => ({
    value: method,
    label: method.charAt(0).toUpperCase() + method.slice(1),
  }));

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 py-10">Your cart is empty.</p>
        ) : (
          <div className="mt-8 grid lg:grid-cols-12 gap-x-12">
            {/* ---------------------------------------------
             SHIPPING FORM
            ---------------------------------------------- */}
            <div className="lg:col-span-8">
              <Formik
                initialValues={initialValues}
                validationSchema={checkoutValidation}
                onSubmit={handleSubmit}
              >
                {({ values, setFieldValue, isSubmitting }) => (
                  <Form className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-lg font-medium">
                      Shipping Information
                    </h2>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          name="fullName"
                          value={values.fullName}
                          onChange={(e) =>
                            setFieldValue("fullName", e.target.value)
                          }
                          className="mt-1"
                        />
                        <ErrorMessage
                          name="fullName"
                          component="p"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={(e) =>
                            setFieldValue("email", e.target.value)
                          }
                          className="mt-1"
                        />
                        <ErrorMessage
                          name="email"
                          component="p"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                          name="phoneNumber"
                          value={values.phoneNumber}
                          onChange={(e) =>
                            setFieldValue("phoneNumber", e.target.value)
                          }
                          className="mt-1"
                        />
                        <ErrorMessage
                          name="phoneNumber"
                          component="p"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <Label htmlFor="deliveryAddress">
                          Delivery Address
                        </Label>
                        <Input
                          name="deliveryAddress"
                          value={values.deliveryAddress}
                          onChange={(e) =>
                            setFieldValue("deliveryAddress", e.target.value)
                          }
                          className="mt-1"
                        />
                        <ErrorMessage
                          name="deliveryAddress"
                          component="p"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <Label>Payment Method</Label>
                        <AutocompleteSelect
                          options={paymentMethodOptions}
                          value={
                            values.paymentMethod
                              ? {
                                  value: values.paymentMethod,
                                  label: values.paymentMethod,
                                }
                              : null
                          }
                          onChange={(e, newValue) =>
                            setFieldValue(
                              "paymentMethod",
                              newValue?.value || ""
                            )
                          }
                        />
                        <ErrorMessage
                          name="paymentMethod"
                          component="p"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      mode="primary"
                      disabled={isSubmitting}
                      className="mt-6 w-full"
                    >
                      {isSubmitting ? "Processing..." : "Place Order"}
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>

            {/* ---------------------------------------------
             SUMMARY
            ---------------------------------------------- */}
            <div className="lg:col-span-4">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-medium text-gray-900">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600">Subtotal</p>
                    <p className="text-sm font-medium text-gray-900">
                      ₹{subtotal.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600">Shipping</p>
                    <p className="text-sm font-medium text-gray-900">Free</p>
                  </div>

                  <div className="flex justify-between border-t pt-4">
                    <p className="text-base font-medium text-gray-900">Total</p>
                    <p className="text-base font-medium text-gray-900">
                      ₹{subtotal.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <MessageModal
        handleClose={handleClose}
        modalFlag={message.flag}
        operation={message.operation}
        value={message.message}
      />
    </div>
  );
}
