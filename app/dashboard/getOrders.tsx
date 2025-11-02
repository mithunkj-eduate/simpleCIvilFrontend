"use client";
import Navbar from "@/components/commen/Navbar";
import Loading from "@/components/helpers/Loading";
import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import { Button } from "@/stories/Button/Button";
import { OrderAcceptStatus } from "@/types/order";
import { LicenseTypes } from "@/utils/enum.types";
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
}

const GetOrderPage = () => {
  const { TOKEN } = Api();
  const [loading, setLoading] = useState(false);
  const [Orders, setOrders] = useState<Orders[]>([]);
  const { state } = useContext(AppContext);
  const router = useRouter();

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
            res.data.data.map((product: any) => ({
              id: product._id,
              productName: product?.productId.name || "N/A",
              quantity: product.quantity || "N/A",
              totalPrice: product.totalPrice || "N/A",
              orderStatus: product.orderStatus || "N/A",
              paymentMethod: product.paymentMethod || "N/A",
              deliveryAddress: product.deliveryAddress || "N/A",
              storeName: product?.storeId?.name || "N/A",
              storeAddress: product?.storeId?.address || "N/A",
              createdAt: product.createdAt
                ? new Date(product.createdAt).toLocaleDateString()
                : "N/A",
            }))
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
          alert("Update successfully");
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
                        <p className="text-sm/6 font-semibold text-gray-900">
                          {person.productName}
                        </p>
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
    </div>
  );
};

export default GetOrderPage;
