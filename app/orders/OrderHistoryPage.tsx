/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import { Button } from "@/stories/Button/Button";
import GenerateCode from "./GenerateCode";
import { DeliveryProgress } from "./DeliveryProgress";
import { OrderStatus, DeliveryStatus } from "@/types/order";

/* ---------------------------
   FIXED TYPES (Matches backend)
---------------------------- */

// Product inside order.items
interface OrderProduct {
  _id: string;
  name: string;
  images?: string[];
  saleTerms?: { salePrice: number };
  categoryId?: { _id: string };
  tags?: string[];
}

// Order Item (Mongo populated)
interface OrderItem {
  _id: string;
  productId: OrderProduct;
  quantity: number;
  totalPrice: number;
  variantId?: string;
  selectedColor?: string;
  selectedSize?: string;
  selectedWeight?: string;
}

// Order level schema
interface Order {
  _id: string;
  storeId?: { _id: string; name: string; address: string };
  buyerId?: { _id: string; name: string; email: string; phoneNumber: string };
  items: OrderItem[];
  orderStatus: OrderStatus;
  deliveryStatus: DeliveryStatus;
  deliveryDate?: string;
  createdAt: string;
}

/* Similar Products */
interface SimilarProduct {
  _id: string;
  name: string;
  image: { url: string }[];
  saleTerms?: { salePrice: number };
}

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [similarProducts, setSimilarProducts] = useState<SimilarProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { state } = useContext(AppContext);
  const router = useRouter();
  const { TOKEN } = Api();
  const [open, setOpen] = useState(false);

  /* ---------------------------
     FETCH ORDER HISTORY
  ---------------------------- */
  useEffect(() => {
    const fetchOrderHistory = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!TOKEN || !state.user?.id) return;

        const response = await api.get(`/orders/history?days=30`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });

        setOrders(response.data.data || []);
      } catch (err) {
        console.error(err);
        setError("Error fetching order history. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, [TOKEN, state.user?.id]);

  /* ---------------------------
     FETCH SIMILAR PRODUCTS
  ---------------------------- */
  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        if (orders.length === 0) return;

        // Always pick first order → first item → product
        const firstItem = orders[0]?.items?.[0];
        if (!firstItem?.productId?._id) return;

        const response = await api.get(
          `/products/similar/${firstItem.productId._id}`,
          { headers: { Authorization: `Bearer ${TOKEN}` } }
        );

        setSimilarProducts(response.data.data || []);
      } catch (err) {
        console.error("Similar product fetch failed", err);
      }
    };

    fetchSimilarProducts();
  }, [orders, TOKEN]);

  /* ---------------------------
     ACTION HANDLERS
  ---------------------------- */

  const handleReturnRequest = (orderId: string) => {
    alert(`Return requested for order ${orderId}.`);
  };

  const handleViewSimilar = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  /* ---------------------------
     UI RENDER
  ---------------------------- */

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="flex items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 border-b border-gray-200 pt-2 pb-6 sticky top-0 bg-white z-10">
            Order History
          </h1>

          <div className="ms-auto">
            <GenerateCode open={open} setOpen={setOpen} />
          </div>
        </div>

        {/* Recent Orders */}
        <h2 className="text-xl font-medium text-gray-900 mt-8">Recent Orders</h2>

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
                {/* Each order contains items */}
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between border-b pb-4 mb-4"
                  >
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {item.productId?.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Store: {order.storeId?.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>

                      <p className="text-sm text-gray-500">
                        Total: ₹{item?.receipt?.total.toFixed(2)}
                      </p>

                      <p className="text-sm text-gray-500">
                        Status: {order.orderStatus} / {order.deliveryStatus}
                      </p>

                      <p className="text-sm text-gray-500">
                        Ordered:{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>

                      {order.deliveryDate && (
                        <p className="text-sm text-gray-500">
                          Delivered:{" "}
                          {new Date(order.deliveryDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>

                    <img
                      src={
                        item.productId?.images?.[0] ||
                        "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-04-image-card-05.jpg"
                      }
                      alt={item.productId?.name}
                      className="h-20 w-20 rounded-md object-cover"
                    />
                  </div>
                ))}

                <DeliveryProgress status={order.deliveryStatus} />

                <div className="mt-4 space-x-4">
                  {order.deliveryStatus === DeliveryStatus.DELIVERED && (
                    <Button
                      onClick={() => handleReturnRequest(order._id)}
                      mode="secondary"
                      className="text-sm m-2"
                    >
                      Request Return
                    </Button>
                  )}

                  {/* Similar product navigate */}
                  <Button
                    onClick={() =>
                      handleViewSimilar(order.items[0].productId._id)
                    }
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

        {/* SIMILAR PRODUCTS */}
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
                    src={product.image?.[0]?.url || "https://via.placeholder.com/96"}
                    alt={product.name}
                    className="h-32 w-full object-cover rounded-md"
                  />

                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    ₹{product.saleTerms?.salePrice?.toFixed(2) || "N/A"}
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
