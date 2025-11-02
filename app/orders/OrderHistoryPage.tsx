/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import { OrderStatus, DeliveryStatus } from "@/types/order";
import { Button } from "@/stories/Button/Button";
import GenerateCode from "./GenerateCode";

interface Order {
  _id: string;
  productId: {
    _id: string;
    name: string;
    image: { url: string }[];
    saleTerms?: { salePrice: number };
    categoryId: { _id: string };
    color?: string;
    tags: string[];
  };
  storeId: { _id: string; name: string; address: string };
  quantity: number;
  totalPrice: number;
  orderStatus: OrderStatus;
  deliveryStatus: DeliveryStatus;
  deliveryDate?: string;
  createdAt: string;
}

interface SimilarProduct {
  _id: string;
  name: string;
  image: { url: string }[];
  saleTerms?: { salePrice: number };
}

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [similarProducts, setSimilarProducts] = useState<SimilarProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { state } = useContext(AppContext);
  const router = useRouter();
  const { TOKEN } = Api();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!TOKEN || !state.user?.id) return;
        // throw new Error("Authentication required");

        const response = await api.get(`/orders/history?days=30`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });
        if (!response.data.data)
          throw new Error("Failed to fetch order history");
        setOrders(response.data.data);
      } catch (err) {
        setError("Error fetching order history. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, [TOKEN, state.user?.id]);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      if (orders.length > 0) {
        const productId = orders[0].productId._id; // Use first order's product as an example
        const response = await api.get(`/products/similar/${productId}`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });
        setSimilarProducts(response.data.data || []);
      }
    };
    fetchSimilarProducts();
  }, [orders]);

  const handleReturnRequest = (orderId: string) => {
    // Mock return request - integrate with backend API
    alert(`Return requested for order ${orderId}. Please contact support.`);
  };

  const handleViewSimilar = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex align-items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 border-b border-gray-200 pt-2 pb-6 sticky top-0 bg-white z-10">
            Order History
          </h1>
          <div className="ms-auto">
            <GenerateCode open={open} setOpen={setOpen} />
            
          </div>
        </div>

        {/* Recent Orders */}
        <h2 className="text-xl font-medium text-gray-900 mt-8">
          Recent Orders
        </h2>
        {orders.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            No recent orders found.
          </p>
        ) : (
          <div className="mt-6 space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {order.productId.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Store: {order.storeId.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Quantity: {order.quantity}
                    </p>
                    <p className="text-sm text-gray-500">
                      Total: ₹{order.totalPrice.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Ordered: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Status: {order.orderStatus} / {order.deliveryStatus}
                    </p>
                    {order.deliveryDate && (
                      <p className="text-sm text-gray-500">
                        Delivered:{" "}
                        {new Date(order.deliveryDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <img
                      src={
                        "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-05.jpg"
                      }
                      alt={order.productId.name}
                      className="h-20 w-20 rounded-md object-cover"
                    />
                  </div>
                </div>
                <div className="mt-4 space-x-4">
                  {(order.deliveryStatus === DeliveryStatus.DELIVERED ||
                    order.deliveryStatus === DeliveryStatus.SHIPPED) && (
                    <Button
                      onClick={() => handleReturnRequest(order._id)}
                      mode="secondary"
                      className="text-sm m-2"
                    >
                      Request Return
                    </Button>
                  )}
                  <Button
                    onClick={() => handleViewSimilar(order.productId._id)}
                    mode="primary"
                    className="text-sm"
                  >
                    View Similar Products
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-medium text-gray-900">
              Similar Products
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {similarProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                >
                  <img
                    src={
                      product.image[0]?.url || "https://via.placeholder.com/96"
                    }
                    alt={product.name}
                    className="h-32 w-full object-cover rounded-md"
                  />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    ₹{product.saleTerms?.salePrice.toFixed(2) || "N/A"}
                  </p>
                  <Button
                    onClick={() => handleViewSimilar(product._id)}
                    mode="primary"
                    className="mt-2 w-full text-sm"
                  >
                    View
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
