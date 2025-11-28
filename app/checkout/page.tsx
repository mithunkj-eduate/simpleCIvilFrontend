"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import { DeliveryStatus, OrderStatus, PaymentMethod } from "@/types/order";
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

const calculateSubtotal = (cart: any) =>
  cart.reduce((sum, item) => {
    const price = item.isRental ? item.rentalPricePerUnit : item.salePrice;

    return sum + price * item.quantity;
  }, 0);

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
  console.log(state.cart, "cart");
  /**
   * ---------------------------------------------------------
   * HANDLE ORDER CREATE - FOR NEW SCHEMA
   * ---------------------------------------------------------
   */
  const handleSubmit = async (values: any) => {
    alert("ssfg");
    try {
      if (!TOKEN) throw new Error("Authentication token missing");
      if (state.cart) {
        const body = createOrdersFromCart(
          state.cart, // Using 'any' for the provided JSON structure
          state.user ? state.user.id : "",
          values.deliveryAddress,
          source ? [source.lat, source.lng] : [0, 0]
        );
        console.log(body, "body1");
        // const body = {
        //   venderId: state.cart?.[0]?.vendorId,
        //   storeId: state.cart?.[0]?.storeId,

        //   items: state.cart.map((item) => ({
        //     productId: item.productId,

        //     selectedColor: item.selectedColor || null,
        //     selectedSize: item.selectedSize || null,
        //     selectedWeight: item.selectedWeight || null,

        //     quantity: item.quantity,

        //     // REQUIRED BY BACKEND
        //     priceSnapshot: item.isRental
        //       ? item.rentalPricePerUnit
        //       : item.salePrice
        //       ? item.salePrice
        //       : 0,

        //     // Automatically include only available attributes
        //     attributesSnapshot: Object.fromEntries(
        //       Object.entries({
        //         color: item.selectedColor,
        //         size: item.selectedSize,
        //         weight: item.selectedWeight,
        //       }).filter(([_, v]) => v)
        //     ),
        //   })),

        //   deliveryAddress: values.deliveryAddress,
        //   location: source ? [source.lat, source.lng] : [],
        //   paymentMethod: values.paymentMethod,

        //   receipt: {
        //     subtotal: calculateSubtotal(state.cart),
        //     shipping: 0,
        //     discount: 0,
        //     tax: 0,
        //     total: calculateSubtotal(state.cart),
        //   },
        // };

        for (let i = 0; i < body.length; i++) {
          await api.post("/orders", body[i], {
            headers: { Authorization: `Bearer ${TOKEN}` },
          });
        }

        setMessage({
          flag: true,
          message: "Order placed successfully",
          operation: Operation.CREATE,
        });
      }
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

/**
 * Transforms an array of cart items into an array of separate orders,
 * grouped by storeId.
 * @param cartItems The array of items from the cart data.
 * @param buyerId The ID of the user placing the order (required for the schema).
 * @param deliveryAddress The common address for all orders.
 * @param coordinates The common coordinates for all orders.
 * @returns An array of IOrder objects, one for each unique store.
 */
function createOrdersFromCart(
  cartItems: any[], // Using 'any' for the provided JSON structure
  buyerId: string,
  deliveryAddress: string,
  coordinates: [number, number]
): IOrder[] {
  // Use a Map to group items by storeId
  const ordersByStore = new Map<
    string,
    { items: ICartItem[]; vendorId: string; storeDetails: any }
  >();

  let tempSubtotal = 0; // Temp variable to calculate subtotal during grouping

  // 1. Group items by store and calculate subtotals
  for (const item of cartItems) {
    const storeId = item.storeId._id;
    const vendorId = item.vendorId._id;
    const storeDetails = item.storeId;

    // Calculate the total price for this item
    const itemTotal = (item.salePrice || 0) * item.quantity;
    tempSubtotal += itemTotal;

    if (!ordersByStore.has(storeId)) {
      ordersByStore.set(storeId, {
        items: [],
        vendorId: vendorId,
        storeDetails: storeDetails,
      });
    }

    // Add the cart item to the correct store group, mapping to the OrderItem structure
    const storeOrder = ordersByStore.get(storeId)!;

    storeOrder.items.push({
      productId: item.productId._id,

      // Variants
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize,
      selectedWeight: item.selectedWeight,
      customVariant: item.customVariant,

      quantity: item.quantity,

      // priceSnapshot must be the price of the item at the time of purchase
      priceSnapshot: item.salePrice || 0,

      // Attributes snapshot mapping
      attributesSnapshot: {
        color: item.selectedColor || item.customVariant?.color,
        size: item.selectedSize || item.customVariant?.size,
        weight: item.selectedWeight || item.customVariant?.weight,
        material: item.customVariant?.material,
      },
    } as IOrderItem);
  }

  // 2. Map the grouped items into the final IOrder array
  const finalOrders: IOrder[] = [];

  for (const [storeId, data] of ordersByStore.entries()) {
    // Calculate the subtotal for this specific store's order
    const storeSubtotal = data.items.reduce(
      (sum, orderItem) => sum + orderItem.priceSnapshot * orderItem.quantity,
      0
    );
    const shippingCost = 0; // Assuming free shipping for simplicity

    finalOrders.push({
      buyerId: buyerId,
      venderId: data.vendorId,
      storeId: storeId,

      items: data.items,

      deliveryAddress: deliveryAddress,
      location:coordinates ? coordinates :[],

      receipt: {
        subtotal: storeSubtotal,
        shipping: shippingCost,
        discount: 0,
        tax: 0,
        total: storeSubtotal + shippingCost,
      },

      paymentMethod: PaymentMethod.CASH, // Default to CASH
      orderStatus: OrderStatus.PENDING,
      deliveryStatus: DeliveryStatus.PENDING,

      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  return finalOrders;
}
