"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Api, { api } from "@/components/helpers/apiheader";
import { PaymentMethod } from "@/types/order";
import { Button } from "@/stories/Button/Button";
import Loading from "@/components/helpers/Loading";
import { PaymentStatus } from "@/types/payment";
import Navbar from "@/components/commen/Navbar";
import { LicenseTypes } from "@/utils/enum.types";

interface Payment {
  _id: string;
  userId: { name: string; email: string };
  orderId: { _id: string; totalPrice: number; deliveryAddress: string };
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId: string;
  createdAt: string;
}

export default function AllPaymentsPage() {
  const { TOKEN } = Api();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        if (!TOKEN) throw new Error("Authentication token is missing");

        const response = await api.get(`/payments`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });
        if (!response.data.data) throw new Error("No payments found");
        setPayments(response.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [TOKEN]);

  //const handleAction = async () => {
  // setLoading(true);
  // try {
  //   const response = await api.post(`/payments/${paymentId}/action`, { action }, {
  //     headers: { Authorization: `Bearer ${TOKEN}` },
  //   });
  //   setPayments((prev) =>
  //     prev.map((p) => (p._id === paymentId ? response.data.data : p))
  //   );
  //   alert(`Payment ${action} ${action === "refund" ? "requested" : "successfully"}`);
  // } catch (err) {
  //   setError(err.response?.data?.message || `Failed to ${action} payment.`);
  //   console.error(err);
  // } finally {
  //   setLoading(false);
  // }
  //};

  const getAvailableActions = (
    method: PaymentMethod,
    status: PaymentStatus
    // paymentId: string
  ) => {
    if (method === PaymentMethod.CASH) {
      return status === PaymentStatus.CAPTURED ? (
        <Button
          mode="secondary"
          className="px-2 py-1 text-xs md:text-sm bg-orange-600 hover:bg-orange-700 text-white rounded-md"
          // onClick={() =>
          //   handleAction(paymentId, "refund")
          // }
        >
          Request Refund
        </Button>
      ) : null;
    } else if (method === PaymentMethod.ONLINE) {
      switch (status) {
        case PaymentStatus.AUTHORIZED:
          return (
            <Button
              mode="primary"
              className="px-2 py-1 text-xs md:text-sm bg-orange-600 hover:bg-orange-700 text-white rounded-md"
              // onClick={() => handleAction(paymentId, "capture")}
            >
              Capture
            </Button>
          );
        case PaymentStatus.CAPTURED:
          return (
            <Button
              mode="secondary"
              className="px-2 py-1 text-xs md:text-sm bg-orange-600 hover:bg-orange-700 text-white rounded-md"
              // onClick={() => handleAction(paymentId, "refund")}
            >
              Refund
            </Button>
          );
        default:
          return null;
      }
    }
    return null;
  };

  if (loading) return <Loading />;
  //   if (error || payments.length === 0) return <p className="text-red-500 text-center py-10">{error || "No payments found"}</p>;

  return (
    <div className="bg-white ">
      <Navbar NavType={LicenseTypes.ADMIN} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          All Payments
        </h1>

        <div className="mt-8 overflow-x-auto rounded-md bg-white border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  { name: "Order ID", className: "px-6 py-3" },
                  { name: "Amount", className: "px-6 py-3" },
                  { name: "Method", className: "px-6 py-3" },
                  { name: "Status", className: "px-6 py-3" },
                  {
                    name: "Transaction ID",
                    className: "px-6 py-3 hidden sm:table-cell",
                  },
                  {
                    name: "Created At",
                    className: "px-6 py-3 hidden sm:table-cell",
                  },
                  { name: "Action", className: "px-6 py-3" },
                ].map((header, index) => (
                  <th
                    key={index}
                    className={`${header.className} text-left text-xs font-medium text-gray-500 uppercase tracking-wider`}
                  >
                    {header.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr
                  key={payment._id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() =>
                    router.push(`/console/payments/${payment.orderId?._id}`)
                  }
                >
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {payment.orderId?._id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    ₹{payment?.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {payment.method.charAt(0).toUpperCase() +
                      payment?.method.slice(1)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {payment.status.charAt(0).toUpperCase() +
                      payment.status.slice(1)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">
                    {payment.transactionId}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">
                    {new Date(payment.createdAt).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                    })}
                  </td>
                  <td
                    className="px-6 py-4 text-sm text-gray-500"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {getAvailableActions(
                      payment.method,
                      payment.status,
                      payment._id
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <Button
            mode="secondary"
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md"
            onClick={() => router.push("/orders")}
          >
            Back to Orders
          </Button>
        </div>
      </div>
    </div>
  );
}
