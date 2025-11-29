"use client";
import Navbar from "@/components/commen/Navbar";
import Loading from "@/components/helpers/Loading";
import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import MessageModal from "@/customComponents/MessageModal";
import { Button } from "@/stories/Button/Button";
import { OrderAcceptStatus } from "@/types/order";
import { msgType } from "@/utils/commenTypes";
import { emptyMessage } from "@/utils/constants";
import { LicenseTypes, Operation } from "@/utils/enum.types";
import { getDistance } from "@/utils/utilFunctions";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

interface Orders {
  id: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  orderStatus: string;
  paymentMethod: string;
  deliveryAddress: string;
  storeName: string;
  storeAddress: string;
  createdAt: string;
  storeLocation: number[];
  deliveryLocation: number[];
  items: { productName: string; quantity: number }[];
}

const GetOrderPage = () => {
  const { TOKEN } = Api();
  const [loading, setLoading] = useState(false);
  const [Orders, setOrders] = useState<Orders[]>([]);
  const { state } = useContext(AppContext);
  const router = useRouter();
  const [message, setMessage] = useState<msgType>(emptyMessage);

  const location = {
    lat: 13.028473178767564,
    lng: 77.63284503525036,
  };

  const GetUsers = async () => {
    setLoading(true);
    try {
      if (state.user && state.user.id) {
        const res = await api.get(
          `/raider/orders?lat=${location.lat}&&lng=${location.lng}`,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (res) {
          setOrders(
            res.data.data.map((order: any) => {
              const firstItem = order.items?.[0]; // first product in the order

              return {
                id: order._id,
                productName: firstItem?.productId?.name || "N/A",
                items: order.items.map((it: any) => ({
                  productName: it.productId?.name,
                  quantity: it.quantity,
                  priceSnapshot: it.priceSnapshot,
                })),

                quantity: firstItem?.quantity || "N/A",
                totalPrice: order.receipt?.total || "N/A",
                orderStatus: order.orderStatus || "N/A",
                paymentMethod: order.paymentMethod || "N/A",
                deliveryAddress: order.deliveryAddress || "N/A",

                storeName: order.storeId?.name || "N/A",
                storeAddress: order.storeId?.address || "N/A",

                createdAt: order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString()
                  : "N/A",

                storeLocation: order.storeId?.location?.coordinates || [],
                deliveryLocation: order.location?.coordinates || [],

                // extra item details (optional)
                variant: firstItem?.variantId || null,
                attributes: firstItem?.attributesSnapshot || {},
                priceSnapshot: firstItem?.priceSnapshot || 0,
              };
            })
          );
        } else {
          console.error("Failed to fetch users:", res);
        }
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(false);

    if (TOKEN) {
      GetUsers();
    }
  }, [TOKEN, state.user?.id]);

  const handleSubmit = async (
    orderId: string,
    orderAcceptStatus: OrderAcceptStatus
  ) => {
    setLoading(true);
    try {
      if (state.user && state.user.id) {
        const res = await api.post(
          `/raider/orders`,
          {
            orderId,
            orderAcceptStatus,
          },
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res.status) {
          setMessage({
            flag: true,
            message: "Update successfully",
            operation: Operation.CREATE,
          });
        } else {
          console.error("Failed to fetch users:", res);
        }
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(Orders);
  return (
    <div className="bg-white ">
      <Navbar NavType={LicenseTypes.RAIDER} />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="mx-auto max-w-7xl mt-16 px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Near By Orders
            </h1>
            <div className="mt-8 overflow-x-auto rounded-md bg-white m-2">
              <ul role="list" className="divide-y divide-gray-100">
                {Orders.map((person, index) => (
                  <li key={index} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <div>
                          {person.items.map((item, i) => (
                            <p key={i} className="text-xs text-gray-700">
                              {item.productName} (x{item.quantity})
                            </p>
                          ))}
                        </div>

                        <p className="mt-1 truncate text-xs/5 text-gray-500">
                          Qty: {person.quantity} Price: {person.totalPrice}
                        </p>
                        <p className="mt-1 truncate text-xs/5 text-gray-500">
                          store: {person.storeName}
                        </p>
                        <p className="mt-1 truncate text-xs/5 text-gray-500">
                          store Address: {person.storeAddress}
                        </p>
                        <p className="mt-1 truncate text-xs/5 text-gray-500">
                          Delivery Address: {person.deliveryAddress}
                        </p>
                        <div className="mt-1 truncate text-xs/5 text-gray-500">
                          Total distance{" "}
                          <span className="text-xl text-gray-900">
                            {getDistance(
                              person.storeLocation[0],
                              person.storeLocation[1],
                              person.deliveryLocation[0],
                              person.deliveryLocation[1]
                            )?.toFixed(2)}{" "}
                            KM
                          </span>
                        </div>
                        <div>
                          <Button
                            mode="accept"
                            className="m-2"
                            onClick={() =>
                              handleSubmit(
                                person.id,
                                OrderAcceptStatus.ACCEPTED
                              )
                            }
                          >
                            Accept{" "}
                          </Button>
                          <Button
                            mode="cancel"
                            className="m-2"
                            onClick={() =>
                              handleSubmit(
                                person.id,
                                OrderAcceptStatus.CANCELLED
                              )
                            }
                          >
                            {" "}
                            cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm/6 text-gray-900">
                        Payment Method : {person.paymentMethod}
                      </p>
                      <p className="mt-1 text-xs/5 text-gray-500">
                        Created :
                        <time dateTime={person.createdAt}>
                          {person.createdAt}
                        </time>
                      </p>
                      <Button
                        className=""
                        onClick={() => {
                          console.log(person.storeLocation, "location");
                          if (person.storeLocation.length)
                            router.push(
                              `/dashboard/orders/map?lat=${person.storeLocation[0]}&lng=${person.storeLocation[1]}`
                            );
                        }}
                      >
                        Map
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <Button
                mode="secondary"
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md"
                onClick={() => router.back()}
              >
                Back
              </Button>
            </div>
          </div>
        </>
      )}
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
};

export default GetOrderPage;
