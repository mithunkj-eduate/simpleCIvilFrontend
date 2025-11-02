"use client";
import Navbar from "@/components/commen/Navbar";
import Loading from "@/components/helpers/Loading";
import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import { Button } from "@/stories/Button/Button";
import { OrderAcceptStatus } from "@/types/order";
import { LicenseTypes } from "@/utils/enum.types";
import React, { useContext, useEffect, useState } from "react";

interface Orders {
  id: string;
  name: string;
}

const GetOrderPage = () => {
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
    <>
      <Navbar NavType={LicenseTypes.RAIDER} />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="mt-16">Get near confomerd Orders</div>
          <div>
            {Orders.map((item, index) => {
              return (
                <div key={index}>
                  {item.name}
                  <Button
                    mode="accept"
                    className="m-2"
                    onClick={() =>
                      handleSubmit(item.id, OrderAcceptStatus.ACCEPTED)
                    }
                  >
                    Accept{" "}
                  </Button>
                  <Button
                    mode="cancel"
                    className="m-2"
                    onClick={() =>
                      handleSubmit(item.id, OrderAcceptStatus.CANCELLED)
                    }
                  >
                    {" "}
                    cancel
                  </Button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default GetOrderPage;
