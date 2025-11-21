"use client";

import { useState } from "react";
import { Button } from "@/stories/Button/Button";
import { Input } from "@/stories/Input/Input";
import { Label } from "@/stories/Label/Label";
import { TextArea } from "@/stories/TextArea/TextArea";
import Api, { api } from "@/components/helpers/apiheader";
import { PaymentMethod } from "@/types/order";
import { AutoCompleteOption } from "@/utils/commenTypes";
import AutocompleteSelect from "@/hooks/StoreAutocompleteSelect";

interface AddOrderProps {
  product: {
    _id: string;
    name: string;
    venderId: { _id: string; name: string };
    storeId: { _id: string; name: string };
    saleTerms?: { salePrice: number; stock: number };
  };
  setModalFlag: (flag: boolean) => void;
  onOrderAdded?: () => void;
}

const orderFormJson = [
  {
    labelName: "Quantity",
    inputName: "quantity",
    dataType: "number",
    required: true,
  },
  {
    labelName: "Delivery Address",
    inputName: "deliveryAddress",
    dataType: "textarea",
    required: true,
  },
];

const paymentMethodOptions: AutoCompleteOption[] = Object.values(
  PaymentMethod
).map((method) => ({
  value: method,
  label: method.charAt(0).toUpperCase() + method.slice(1),
}));

export default function AddOrder({
  product,
  setModalFlag,
  onOrderAdded,
}: AddOrderProps) {
  const [formData, setFormData] = useState({
    quantity: 1,
    deliveryAddress: "",
    location: [],
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<AutoCompleteOption | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { TOKEN } = Api();

  const handleAddOrder = async () => {
    setLoading(true);
    setError(null);  

    try {
      if (!TOKEN) throw new Error("Authentication token is missing");
      if (!selectedPaymentMethod)
        throw new Error("Please select a payment method");
      if (formData.quantity <= 0)
        throw new Error("Quantity must be greater than 0");
      if (!formData.deliveryAddress)
        throw new Error("Delivery address is required");
      if (product.saleTerms && formData.quantity > product.saleTerms.stock) {
        throw new Error("Quantity exceeds available stock");
      }

      const totalPrice = product.saleTerms
        ? product.saleTerms.salePrice * formData.quantity
        : 0;

      const body = {
        venderId: product.venderId._id,
        productId: product._id,
        storeId: product.storeId._id,
        quantity: formData.quantity,
        totalPrice,
        paymentMethod: selectedPaymentMethod.value,
        deliveryAddress: formData.deliveryAddress,
      };

      const response = await api.post("/orders", body, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });

      if (response.data.data) {
        alert("Order placed successfully");
        onOrderAdded?.();
        setModalFlag(false);
      }
    } catch (err: any) {
      setError(err.message || "Failed to place order. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:size-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h18M3 3v18M3 3H0m21 0h3m-3 6h-3m-6 0h-3m-6 0H3m18 6h-3m-6 0h-3m-6 0H3m18 6h-3m-6 0h-3m-6 0H3"
            />
          </svg>
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <div className="text-base font-semibold text-gray-900">
            Place Order
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-500">Ordering: {product.name}</p>
            <p className="text-sm text-gray-500">
              Vendor: {product.venderId.name}
            </p>
            <p className="text-sm text-gray-500">
              Store: {product.storeId.name}
            </p>
            <p className="text-sm text-gray-500">
              Price per unit: ₹
              {product.saleTerms?.salePrice.toFixed(2) || "N/A"}
            </p>
          </div>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
            {orderFormJson.map((item, index) => (
              <div key={index} className="sm:col-span-2">
                <Label htmlFor={item.inputName}>{item.labelName}</Label>
                <div className="mt-2">
                  {item.dataType === "textarea" ? (
                    <TextArea
                      name={item.inputName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [item.inputName]: e.target.value,
                        })
                      }
                      required={item.required}
                    />
                  ) : (
                    <Input
                      type={item.dataType}
                      name={item.inputName}
                      value={formData[item.inputName as keyof typeof formData]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [item.inputName]:
                            item.dataType === "number"
                              ? Number(e.target.value) || 0
                              : e.target.value,
                        })
                      }
                      required={item.required}
                    />
                  )}
                </div>
              </div>
            ))}
            <div className="sm:col-span-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <div className="mt-2">
                <AutocompleteSelect
                  label="Product Type"
                  options={paymentMethodOptions}
                  value={selectedPaymentMethod}
                  onChange={(e, newValue) =>
                    setSelectedPaymentMethod(
                      newValue as AutoCompleteOption | null
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <Button
          type="button"
          onClick={handleAddOrder}
          mode="primary"
          disabled={loading}
          className=""
        >
          {loading ? "Placing Order..." : "Place Order"}
        </Button>
        <Button
          type="button"
          onClick={() => setModalFlag(false)}
          mode="cancel"
          className="mx-2"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
