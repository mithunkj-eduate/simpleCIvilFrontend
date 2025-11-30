"use client";
import Navbar from "@/components/commen/Navbar";
import Loading from "@/components/helpers/Loading";
import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import { Button } from "@/stories/Button/Button";
import { DeliveryStatus, OrderAcceptStatus } from "@/types/order";
import { LicenseTypes, Operation } from "@/utils/enum.types";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import ConfirmDelivery from "./ConfirmDelivery";
import MessageModal from "@/customComponents/MessageModal";
import { msgType } from "@/utils/commenTypes";
import { emptyMessage } from "@/utils/constants";
import { getDistance } from "@/utils/utilFunctions";

interface Orders {
  id: string;
  productName: string;
  paymentMethod: string;
  createdAt: string;
  store: string;
  storeAddress: string;
  storeNumber: string;
  orderAcceptStatus: string;
  deliveryAddress: string;
  deliveryStatus: string;
  storeLocation: number[];
  orderId: string;
  buyerId: string;
  buyerNumber: string;
  deliveryLocation: number[];
}

interface itemType {
  orderId: string;
  buyerId: string;
  deliveryStatus: DeliveryStatus;
}

const initialItem: itemType = {
  buyerId: "",
  orderId: "",
  deliveryStatus: DeliveryStatus.PENDING,
};

const DeliveryOrderPage = () => {
  const { TOKEN } = Api();
  const [loading, setLoading] = useState(false);
  const [Orders, setOrders] = useState<Orders[]>([]);
  const { state } = useContext(AppContext);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState<itemType>(initialItem);
  const [message, setMessage] = useState<msgType>(emptyMessage);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const location = {
    lat: 13.028473178767564,
    lng: 77.63284503525036,
  };

  const GetUsers = async () => {
    setLoading(true);
    try {
      if (state.user && state.user.id) {
        const res = await api.get(`/raider/orders/all`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        if (res) {
          setOrders(
            res.data.data.map((product: any) => ({
              id: product._id,
              productName:
                product?.orderId?.items.map(
                  (item: any) => `${item?.productId?.name}, `
                ) || "N/A",
              paymentMethod: product?.orderId?.paymentMethod || "N/A",
              orderAcceptStatus: product.orderAcceptStatus,
              store: product?.orderId?.storeId?.name || "N/A",
              storeAddress: product?.orderId?.storeId?.address || "N/A",
              storeNumber: product?.orderId?.storeId?.phoneNumber || "N/A",
              deliveryAddress: product?.orderId?.deliveryAddress || "N/A",
              deliveryStatus: product?.orderId?.deliveryStatus || "N/A",
              orderId: product?.orderId?._id || "N/A",
              buyerId: product?.orderId?.buyerId._id || "N/A",
              buyerNumber: product?.orderId?.buyerId?.phoneNumber || "N/A",
              storeLocation:
                product?.orderId?.storeId?.location?.coordinates || [],
              createdAt: product.createdAt
                ? new Date(product.createdAt).toLocaleDateString()
                : "N/A",
              deliveryLocation: product?.orderId?.location?.coordinates || [],
            }))
          );
        } else {
          console.error("Failed to fetch users:", res);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (TOKEN) {
      GetUsers();
    }
  }, [TOKEN, state.user?.id]);

  const handleGenerateCode = async (orderId: string, buyerId: string) => {
    try {
      console.log(orderId, buyerId, "item");
      if (!orderId || !buyerId) {
        setMessage({
          flag: true,
          message: "orderID && buyerId requied",
          operation: Operation.NONE,
        });
        return;
      }
      if (state.user && state.user.id) {
        const res = await api.post(
          `/raider/order/code`,
          {
            orderId,
            buyerId,
          },
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res) {
          setOpen(true);
          // alert("Generate Otp Successfully");
        } else {
          console.error("Failed to fetch users:", res);
        }
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleUpdateStatus = async (
    orderId: string,
    acceptStatus: OrderAcceptStatus
  ) => {
    try {
      if (!TOKEN || !state.user?.id || !orderId || !acceptStatus) return;

      const endpoint = `/raider/orders/acceptStatus`;
      const response = await api.put(
        endpoint,
        {
          orderId,
          acceptStatus,
        },
        {
          headers: { Authorization: `Bearer ${TOKEN}` },
        }
      );
      if (response.data.status) {
        GetUsers();
        setMessage({
          flag: true,
          message: "Order Status Successfully",
          operation: Operation.CREATE,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // GET USER'S CURRENT LOCATION
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrentLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          console.error("Error getting location:", err);
          alert("Unable to get your location");
        }
      );
    }
  }, []);

  const handleClose = () => {
    if (message.operation === Operation.CREATE) {
      setOpen(false);
    }
    setMessage(emptyMessage);
  };

  return (
    <div className="bg-white ">
      <Navbar NavType={LicenseTypes.RAIDER} />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="mx-auto max-w-7xl mt-16 px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              All Orders
            </h1>
            <div className="mt-8 overflow-x-auto rounded-md bg-white m-2">
              <ul role="list" className="divide-y divide-gray-100">
                {Orders.map((person, index) => (
                  <li key={index} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                      <div className="size-12 flex-none rounded-full bg-gray-50">
                        <div>
                          {person.orderAcceptStatus ===
                          OrderAcceptStatus.ACCEPTED
                            ? "A"
                            : person.orderAcceptStatus ===
                              OrderAcceptStatus.CANCELLED
                            ? "C"
                            : "P"}
                        </div>
                      </div>

                      <div className="min-w-0 flex-auto">
                        {person.orderAcceptStatus ===
                          OrderAcceptStatus.ACCEPTED ||
                        person.orderAcceptStatus ===
                          OrderAcceptStatus.REACHED_STORE ? (
                          <>
                            {person.orderAcceptStatus ===
                            OrderAcceptStatus.REACHED_STORE ? (
                              <p className="text-sm/6 font-semibold text-gray-900">
                                {person.orderId}
                              </p>
                            ) : null}
                            <p className="mt-1 truncate text-xs/5 text-gray-500">
                              Store: {person.store}
                            </p>
                            <p className="mt-1 truncate text-xs/5 text-gray-500">
                              Store Address: {person.storeAddress}
                            </p>
                            <div className="mt-1 truncate text-xs/5 text-gray-500">
                              Total distance{" "}
                              <span className="text-xl text-gray-900">
                                {getDistance(
                                  currentLocation
                                    ? currentLocation.lat
                                    : location.lat,
                                  currentLocation
                                    ? currentLocation.lng
                                    : location.lng,
                                  person.storeLocation[0],
                                  person.storeLocation[1]
                                )?.toFixed(2)}{" "}
                                km
                              </span>
                            </div>
                          </>
                        ) : person.orderAcceptStatus ===
                            OrderAcceptStatus.PICKED ||
                          person.orderAcceptStatus ===
                            OrderAcceptStatus.REACHED_DROP ? (
                          <>
                            <p className="text-sm/6 font-semibold text-gray-900">
                              {person.orderId}
                            </p>
                            <p className="text-sm/6 font-semibold text-gray-900">
                              {person.productName}
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
                                km
                              </span>
                            </div>
                          </>
                        ) : null}
                        {person.deliveryStatus === DeliveryStatus.DELIVERED ? (
                          <>
                            <p className="text-sm/6 font-semibold text-gray-900">
                              {person.orderId}
                            </p>
                            <p className="mt-1 truncate text-xs/5 text-gray-500">
                              Store: {person.store}
                            </p>
                            <p className="mt-1 truncate text-xs/5 text-gray-500">
                              Store Address: {person.storeAddress}
                            </p>

                            <p className="text-sm/6 font-semibold text-gray-900">
                              {person.productName}
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
                                )?.toFixed(2)}
                                km
                              </span>
                            </div>
                          </>
                        ) : null}
                        {person.deliveryStatus !== DeliveryStatus.DELIVERED ? (
                          person.orderAcceptStatus ===
                          OrderAcceptStatus.ACCEPTED ? (
                            <Button
                              mode="accept"
                              className="m-2"
                              onClick={() => {
                                handleUpdateStatus(
                                  person.orderId,
                                  OrderAcceptStatus.REACHED_STORE
                                );
                              }}
                            >
                              REACHED PICKUP
                            </Button>
                          ) : person.orderAcceptStatus ===
                            OrderAcceptStatus.REACHED_STORE ? (
                            <Button
                              mode="accept"
                              className="m-2"
                              onClick={() => {
                                setItem({
                                  buyerId: person.buyerId,
                                  orderId: person.orderId,
                                  deliveryStatus:
                                    person.deliveryStatus as DeliveryStatus,
                                });
                                setOpen(true);
                              }}
                            >
                              PICKED UP
                            </Button>
                          ) : person.orderAcceptStatus ===
                            OrderAcceptStatus.PICKED ? (
                            <Button
                              mode="accept"
                              className="m-2"
                              onClick={() => {
                                handleUpdateStatus(
                                  person.orderId,
                                  OrderAcceptStatus.REACHED_DROP
                                );
                              }}
                            >
                              REACHED DRAP
                            </Button>
                          ) : person.orderAcceptStatus ===
                            OrderAcceptStatus.REACHED_DROP ? (
                            <Button
                              mode="accept"
                              className="m-2"
                              onClick={() => {
                                setItem({
                                  buyerId: person.buyerId,
                                  orderId: person.orderId,
                                  deliveryStatus:
                                    person.deliveryStatus as DeliveryStatus,
                                });

                                handleGenerateCode(
                                  person.orderId,
                                  person.buyerId
                                );
                              }}
                            >
                              DELIVERY
                            </Button>
                          ) : null
                        ) : null}
                        {person.deliveryStatus !== DeliveryStatus.DELIVERED ? (
                          <Button mode="cancel" className="m-2">
                            CANCLE
                          </Button>
                        ) : null}
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm/6 text-gray-900">
                        Delivery Status : {person.deliveryStatus}
                      </p>
                      <p className="text-sm/6 text-gray-900">
                        Payment Method : {person.paymentMethod}
                      </p>
                      <p className="mt-1 text-xs/5 text-gray-500">
                        Accepted :
                        <time dateTime={person.createdAt}>
                          {person.createdAt}
                        </time>
                      </p>
                      {(person.deliveryStatus === DeliveryStatus.PENDING ||
                        person.deliveryStatus === DeliveryStatus.SHIPPED) && (
                        <div className="text-sm/6 mt-2 text-gray-900">
                          {/* <Button
                            onClick={() => {
                              if (
                                person.storeLocation.length &&
                                person.deliveryStatus === DeliveryStatus.PENDING
                              )
                                router.push(
                                  `/dashboard/orders/map?lat=${person.storeLocation[0]}&lng=${person.storeLocation[1]}`
                                );
                              else if (person.deliveryLocation.length) {
                                router.push(
                                  `/dashboard/orders/map?lat=${person.deliveryLocation[0]}&lng=${person.deliveryLocation[1]}`
                                );
                              }
                            }}
                          >
                            Map
                          </Button> */}

                          <a
                            href={`tel:${
                              person.storeLocation.length &&
                              person.deliveryStatus === DeliveryStatus.PENDING
                                ? person.storeNumber
                                : person.buyerNumber
                            }`}
                            className="rounded-md px-4 py-2.5 ms-2 bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:outline-gray-300"
                          >
                            Call
                          </a>

                          <a
                            className="rounded-md px-4 py-2.5 ms-2 text-sm font-semibold shadow-xs bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600"
                            href={`${
                              person.storeLocation.length &&
                              person.deliveryStatus === DeliveryStatus.PENDING
                                ? `https://www.google.com/maps/search/?api=1&query=${person.storeLocation[0]}, ${person.storeLocation[1]}`
                                : `https://www.google.com/maps/search/?api=1&query=${person.deliveryLocation[0]}, ${person.deliveryLocation[1]}`
                            }`}
                          >
                            Map
                          </a>
                        </div>
                      )}
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
          {open ? (
            <ConfirmDelivery
              open={open}
              setOpen={setOpen}
              buyerId={item.buyerId}
              orderId={item.orderId}
              deliveryStatus={item.deliveryStatus}
              refetchQuery={GetUsers}
              UpdateRaiderStatus={handleUpdateStatus}
            />
          ) : null}
        </>
      )}

      <MessageModal
        handleClose={handleClose}
        modalFlag={message.flag}
        operation={message.operation}
        value={message.message}
      />
    </div>
  );
};

export default DeliveryOrderPage;
