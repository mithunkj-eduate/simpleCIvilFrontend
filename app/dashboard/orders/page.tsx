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
  createdAt: string;
  store: string;
  storeAddress: string;
  orderAcceptStatus: string;
  deliveryAddress: string;
  deliveryStatus: string;
  orderId: string;
  buyerId: string;
}

const DeliveryOrderPage = () => {
  const { TOKEN } = Api();
  const [loading, setLoading] = useState(false);
  const [Orders, setOrders] = useState<Orders[]>([]);
  const { state } = useContext(AppContext);
  const router = useRouter();

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
              productName: product?.orderId?.productId.name || "N/A",
              orderAcceptStatus: product.orderAcceptStatus,
              store: product?.orderId?.storeId.name || "N/A",
              storeAddress: product?.orderId?.storeId.address || "N/A",
              deliveryAddress: product.deliveryAddress || "N/A",
              deliveryStatus: product?.orderId.deliveryStatus || "N/A",
              orderId: product?.orderId._id || "N/A",
              buyerId: product?.orderId?.buyerId._id || "N/A",
              createdAt: product.createdAt
                ? new Date(product.createdAt).toLocaleDateString()
                : "N/A",
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

  const handleGenerateCode = async (orderId: string,buyerId:string) => {
    try {
      if(!orderId || !buyerId){
        alert("orderID && buyerId requied")
        return
      }
      if (state.user && state.user.id) {
        const res = await api.post(
          `/raider/order/code`,
          {
            orderId,
            buyerId
          },
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (res) {
          alert("Generate Otp Successfully");
        } else {
          console.error("Failed to fetch users:", res);
        }
      }
    } catch (error) {
      console.error("Error fetching users:", error);
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
                        <p className="text-sm/6 font-semibold text-gray-900">
                          {person.productName}
                        </p>
                        <p className="mt-1 truncate text-xs/5 text-gray-500">
                          store: {person.store}
                        </p>
                        <p className="mt-1 truncate text-xs/5 text-gray-500">
                          store Address: {person.storeAddress}
                        </p>
                        <p className="mt-1 truncate text-xs/5 text-gray-500">
                          Selivery Address: {person.deliveryAddress}
                        </p>
                        {person.orderAcceptStatus ===
                        OrderAcceptStatus.ACCEPTED ? (
                          <div>
                            <Button
                              mode="accept"
                              className="m-2"
                              onClick={() => handleGenerateCode(person.orderId,person.buyerId)}
                            >
                              Pick Up
                            </Button>
                            <Button mode="cancel" className="m-2">
                              {" "}
                              cancel
                            </Button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm/6 text-gray-900">
                        Delivery Status : {person.deliveryStatus}
                      </p>
                      <p className="mt-1 text-xs/5 text-gray-500">
                        Accepted :
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

export default DeliveryOrderPage;
