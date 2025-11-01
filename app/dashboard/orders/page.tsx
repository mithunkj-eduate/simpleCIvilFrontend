"use client";
import Navbar from "@/components/commen/Navbar";
import Loading from "@/components/helpers/Loading";
import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import { LicenseTypes } from "@/utils/enum.types";
import React, { useContext, useEffect, useState } from "react";

interface Orders {
  id: string;
  name: string;
}

const DeliveryOrderPage = () => {
  const { TOKEN } = Api();
  const [loading, setLoading] = useState(false);
  const [Orders, setOrders] = useState<Orders[]>([]);
  const { state } = useContext(AppContext);

  const location = {
    lat: 13.028473178767564,
    lng: 77.63284503525036,
  };

  const GetUsers = async () => {
    setLoading(true);
    try {
      if (state.user && state.user.id) {
        const res = await api.get(
          `/orders/all?deliveryBoyId=${state.user.id}`,
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
              name: product.productId.name || "N/A",
              // createdAt: product.createdAt
              //   ? new Date(product.createdAt).toLocaleDateString()
              // : "N/A",
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
  return (
    <>
      <Navbar NavType={LicenseTypes.DELIVERY_BOY} />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="mt-16">Get near confomerd Orders</div>
          <div>
            {Orders.map((item, index) => {
              return <div key={index}>{item.name}</div>;
            })}
          </div>
        </>
      )}
    </>
  );
};

export default DeliveryOrderPage;
