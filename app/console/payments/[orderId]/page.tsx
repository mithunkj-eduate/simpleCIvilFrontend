"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Api, { api } from "@/components/helpers/apiheader";
import { PaymentMethod } from "@/types/order";
import { Button } from "@/stories/Button/Button";
import Loading from "@/components/helpers/Loading";
import { PaymentStatus } from "@/types/payment";

interface Payment {
  _id: string;
  userId: { name: string; email: string };
  orderId: { totalPrice: number; deliveryAddress: string };
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId: string;
  createdAt: string;
}

export default function PaymentPage() {
  const { TOKEN } = Api()
  const { orderId } = useParams();
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPayment = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!TOKEN || !orderId) throw new Error("Authentication or order ID is missing");
        const response = await api.get(`/payments/${orderId}`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });
        if (!response.data.data) throw new Error("Payment not found");
        setPayment(response.data.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch payment details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [TOKEN, orderId]);

  const handleAction = async (action: string) => {
    setLoading(true);
    try {
      if (!payment?._id) throw new Error("Payment ID is missing");
      const response = await api.post(`/payments/${payment._id}/action`, { action }, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      setPayment(response.data.data);
      alert(`Payment ${action} ${action === "refund" ? "requested" : "successfully"}`);
    } catch (err: any) {
      setError(err.response?.data?.message || `Failed to ${action} payment.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getAvailableActions = (method: PaymentMethod, status: PaymentStatus) => {
    if (method === PaymentMethod.CASH) {
      return status === PaymentStatus.CAPTURED ? (
        <Button
          mode="secondary"
          className="mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md"
          onClick={() => handleAction("refund")}
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
              className="mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md"
              onClick={() => handleAction("capture")}
            >
              Capture Payment
            </Button>
          );
        case PaymentStatus.CAPTURED:
          return (
            <Button
              mode="secondary"
              className="mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md"
              onClick={() => handleAction("refund")}
            >
              Refund Payment
            </Button>
          );
        default:
          return null;
      }
    }
    return null;
  };

  if (loading) return <Loading />;
  if (error || !payment) return <p className="text-red-500 text-center py-10">{error || "Payment not found"}</p>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Payment Details</h1>

        <div className="mt-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Payment Information</h2>
            <div className="mt-4 space-y-4">
              <p className="text-sm text-gray-600">User: {payment.userId.name} ({payment.userId.email})</p>
              <p className="text-sm text-gray-600">Order Amount: ₹{payment.orderId.totalPrice.toFixed(2)}</p>
              <p className="text-sm text-gray-600">Delivery Address: {payment.orderId.deliveryAddress}</p>
              <p className="text-sm text-gray-600">Paid Amount: ₹{payment.amount.toFixed(2)}</p>
              <p className="text-sm text-gray-600">Method: {payment.method.charAt(0).toUpperCase() + payment.method.slice(1)}</p>
              <p className="text-sm text-gray-600">Status: {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}</p>
              <p className="text-sm text-gray-600">Transaction ID: {payment.transactionId}</p>
              <p className="text-sm text-gray-600">Created At: {new Date(payment.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
            </div>
            {getAvailableActions(payment.method, payment.status)}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
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