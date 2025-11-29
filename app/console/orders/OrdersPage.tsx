"use client";

import { useState, useEffect, useCallback, useMemo, useContext } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { OrderStatus, PaymentMethod, DeliveryStatus } from "@/types/order";
import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import { Operation, UserType } from "@/utils/enum.types";
import { msgType } from "@/utils/commenTypes";
import { emptyMessage } from "@/utils/constants";
import MessageModal from "@/customComponents/MessageModal";
import { Button } from "@/stories/Button/Button";
import Image from "next/image";

// --- UPDATED INTERFACES TO MATCH JSON STRUCTURE ---

interface ProductDetails {
  _id: string;
  name: string;
  saleTerms?: { salePrice: number };
  rentalTerms: any[]; // Assuming any[] based on your JSON
}

interface OrderItem {
  productId: ProductDetails;
  quantity: number;
  priceSnapshot: number; // Price per unit at time of order
  attributesSnapshot: any;
  selectedColor?: string;
  selectedSize?: string;
  selectedWeight?: string;
  _id: string;
}

interface RawOrder {
  _id: string;
  buyerId: { _id: string; name: string; email: string; phoneNumber: string };
  venderId: { _id: string; name: string; email: string; phoneNumber: string };
  storeId: { _id: string; name: string; address: string };
  receipt: {
    subtotal: number;
    shipping: number;
    discount: number;
    tax: number;
    total: number;
  };
  items: OrderItem[];
  orderStatus: OrderStatus;
  paymentMethod: PaymentMethod;
  deliveryAddress: string;
  deliveryStatus: DeliveryStatus;
  createdAt: string;
  // Add other fields from the JSON as needed
}

// Flattened Order structure for the table row (one row per item)
interface FlattenedOrderRow {
  _id: string; // Raw order ID
  itemId: string; // Item ID for unique keying
  buyerId: { _id: string; name: string; email: string; phoneNumber: string };
  venderId: { _id: string; name: string; email: string; phoneNumber: string };
  storeId: { _id: string; name: string; address: string };

  // Item-specific details
  productId: ProductDetails;
  quantity: number;
  itemPrice: number; // Calculated price for this item (quantity * priceSnapshot)
  unitPrice: number; // priceSnapshot
  attributes: string; // Combined attributes for display

  // Order-level details
  orderStatus: OrderStatus;
  paymentMethod: PaymentMethod;
  deliveryAddress: string;
  deliveryStatus: DeliveryStatus;
  createdAt: string;

  // Total order price for display/sorting (optional, but good to have)
  orderTotal: number;
}

// --- TRANSFORMATION LOGIC ---

// Function to transform the raw, nested orders into a flattened array for the table
const transformOrdersForTable = (
  rawOrders: RawOrder[]
): FlattenedOrderRow[] => {
  const flattened: FlattenedOrderRow[] = [];

  rawOrders.forEach((order) => {
    const orderTotal = order.receipt.total;

    order.items.forEach((item) => {
      const attributes = Object.entries(item.attributesSnapshot)
        .filter(([key, value]) => key && value) // Filter out empty keys/values
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ");

      const itemPrice = item.priceSnapshot * item.quantity;

      flattened.push({
        _id: order._id, // Original Order ID
        itemId: item._id, // Unique Item ID
        buyerId: order.buyerId,
        venderId: order.venderId,
        storeId: order.storeId,

        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.priceSnapshot,
        itemPrice: itemPrice,
        attributes: attributes,

        orderStatus: order.orderStatus,
        paymentMethod: order.paymentMethod,
        deliveryAddress: order.deliveryAddress,
        deliveryStatus: order.deliveryStatus,
        createdAt: order.createdAt,
        orderTotal: orderTotal,
      });
    });
  });

  return flattened;
};

// --- COMPONENT UPDATES ---

function OrderRow({
  order,
  onUpdateStatus,
}: {
  order: FlattenedOrderRow; // Use FlattenedOrderRow
  onUpdateStatus: (id: string, updates: Partial<RawOrder>) => void; // Update takes Partial<RawOrder> but uses RawOrder ID
}) {
  const { state } = useContext(AppContext);
  const isVendorOrAdmin =
    state.user?.role === UserType.ADMIN ||
    state.user?.role === UserType.PICE_WORKER ||
    state.user?.role === UserType.PROJECT_MANAGER ||
    state.user?.role === UserType.RESELLER ||
    state.user?.role === UserType.SELLER ||
    state.user?.role === UserType.SYSTEM_ADMIN;

  // Use the main order ID for status updates
  const orderIdForUpdate = order._id;

  return (
    <tr className="border-b">
      <td className="py-4 px-6">
        {order.productId?.name}
        {order.attributes && (
          <div className="text-xs text-gray-500">{order.attributes}</div>
        )}
      </td>
      <td className="py-4 px-6">{order.buyerId?.name}</td>
      <td className="py-4 px-6">{order.venderId?.name}</td>
      <td className="py-4 px-6">{order.storeId?.name}</td>
      <td className="py-4 px-6">{order.quantity}</td>
      <td className="py-4 px-6">
        ₹{order.itemPrice?.toFixed(2)}{" "}
        <span className="text-xs text-gray-500 block">
          (Unit: ₹{order.unitPrice?.toFixed(2)})
        </span>
      </td>
      <td className="py-4 px-6">{order.orderStatus}</td>
      <td className="py-4 px-6">{order.paymentMethod}</td>
      <td className="py-4 px-6">{order.deliveryStatus}</td>
      <td className="py-4 px-6">{order.deliveryAddress}</td>

      {isVendorOrAdmin && (
        <td className="py-4 px-6">
          {order.orderStatus === OrderStatus.PENDING ? (
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton className="inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                Actions
                <ChevronDownIcon
                  className="-mr-1 ml-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </MenuButton>

              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5">
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={() =>
                        onUpdateStatus(orderIdForUpdate, {
                          // Use orderIdForUpdate
                          orderStatus: OrderStatus.CONFIRMED,
                        } as Partial<RawOrder>)
                      }
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block w-full px-4 py-2 text-left text-sm text-gray-700`}
                    >
                      Confirm Order
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={() =>
                        onUpdateStatus(orderIdForUpdate, {
                          // Use orderIdForUpdate
                          orderStatus: OrderStatus.CANCELLED,
                        } as Partial<RawOrder>)
                      }
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block w-full px-4 py-2 text-left text-sm text-gray-700`}
                    >
                      Cancel Order
                    </button>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
          ) : order.deliveryStatus === DeliveryStatus.PENDING ||
            order.deliveryStatus === DeliveryStatus.RETURNED ? (
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton className="inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                Actions
                <ChevronDownIcon
                  className="-mr-1 ml-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </MenuButton>

              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5">
                <MenuItem>
                  {({ active }) => (
                    <button
                      onClick={() =>
                        onUpdateStatus(orderIdForUpdate, {
                          // Use orderIdForUpdate
                          deliveryStatus: DeliveryStatus.SHIPPED,
                        } as Partial<RawOrder>)
                      }
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block w-full px-4 py-2 text-left text-sm text-gray-700`}
                    >
                      Mark as Shipped
                    </button>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>
          ) : null}
        </td>
      )}
    </tr>
  );
}

function OrdersTable({
  orders,
  onUpdateStatus,
}: {
  orders: FlattenedOrderRow[]; // Use FlattenedOrderRow
  onUpdateStatus: (id: string, updates: Partial<RawOrder>) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product (Attributes)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Buyer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vendor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Store
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Item Price (Unit Price)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Payment Method
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Delivery Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Delivery Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.length > 0 ? (
            orders.map((order) => (
              <OrderRow
                key={order.itemId} // Use itemId for a unique key
                order={order}
                onUpdateStatus={onUpdateStatus}
              />
            ))
          ) : (
            <tr>
              <td colSpan={12} className="py-4 px-6 text-center text-gray-500">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const sortOptions = [
  { name: "Newest", value: "newest", current: true },
  { name: "Oldest", value: "oldest", current: false },
  { name: "Price: Low to High", value: "priceLowToHigh", current: false },
  { name: "Price: High to Low", value: "priceHighToLow", current: false },
];

const filtersConfig = [
  {
    id: "orderStatus",
    name: "Order Status",
    options: Object.values(OrderStatus).map((status) => ({
      value: status,
      label: status.charAt(0).toUpperCase() + status.slice(1),
      checked: false,
    })),
  },
  {
    id: "paymentMethod",
    name: "Payment Method",
    options: Object.values(PaymentMethod).map((method) => ({
      value: method,
      label: method.charAt(0).toUpperCase() + method.slice(1),
      checked: false,
    })),
  },
  {
    id: "deliveryStatus",
    name: "Delivery Status",
    options: Object.values(DeliveryStatus).map((status) => ({
      value: status,
      label: status.charAt(0).toUpperCase() + status.slice(1),
      checked: false,
    })),
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function OrdersPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Use RawOrder[] for the data fetched from the API
  const [ordersData, setOrdersData] = useState<{
    data: RawOrder[];
    totalCount: number;
  }>({
    data: [],
    totalCount: 0,
  });

  // Use FlattenedOrderRow[] for the table display
  const [filteredOrders, setFilteredOrders] = useState<FlattenedOrderRow[]>([]);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [filters, setFilters] = useState({
    orderStatus: filtersConfig[0].options,
    paymentMethod: filtersConfig[1].options,
    deliveryStatus: filtersConfig[2].options,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterVersion, setFilterVersion] = useState(0);
  const { state } = useContext(AppContext);
  const { TOKEN } = Api();
  const [message, setMessage] = useState<msgType>(emptyMessage);
  const [tableScreen, setTableScreen] = useState(true);

  const memoizedFilters = useMemo(
    () => ({
      orderStatus: filters.orderStatus
        .filter((opt) => opt.checked)
        .map((opt) => opt.value),
      paymentMethod: filters.paymentMethod
        .filter((opt) => opt.checked)
        .map((opt) => opt.value),
      deliveryStatus: filters.deliveryStatus
        .filter((opt) => opt.checked)
        .map((opt) => opt.value),
    }),
    [filters, filterVersion]
  );

  // Apply sorting and filtering logic to the fetched/transformed data
  const applyFiltersAndSorting = useCallback(
    (data: RawOrder[]) => {
      // 1. Transform raw data
      const processedOrders = transformOrdersForTable(data);

      // 2. Apply front-end filtering (only if not handled by API query, but here we rely on API query params)
      // Since the API uses query params for filtering, we skip the front-end filter step,
      // but keep it for logic consistency if needed later.

      // 3. Apply front-end sorting logic if API doesn't fully support all sorts
      processedOrders.sort((a, b) => {
        if (selectedSort.value === "newest") {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
        if (selectedSort.value === "oldest") {
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        }
        // Note: Price sorting should probably be on the orderTotal or itemPrice
        if (selectedSort.value === "priceLowToHigh") {
          return a.itemPrice - b.itemPrice;
        }
        if (selectedSort.value === "priceHighToLow") {
          return b.itemPrice - a.itemPrice;
        }
        return 0;
      });

      setFilteredOrders(processedOrders);
    },
    [selectedSort]
  );

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);

    const queryParams = new URLSearchParams();

    if (memoizedFilters.orderStatus.length > 0) {
      queryParams.append("orderStatus", memoizedFilters.orderStatus.join(","));
    }
    if (memoizedFilters.paymentMethod.length > 0) {
      queryParams.append(
        "paymentMethod",
        memoizedFilters.paymentMethod.join(",")
      );
    }
    if (memoizedFilters.deliveryStatus.length > 0) {
      queryParams.append(
        "deliveryStatus",
        memoizedFilters.deliveryStatus.join(",")
      );
    }

    if (state.user?.role === UserType.USER) {
      queryParams.append("buyerId", state.user.id);
    } else if (
      state.user &&
      (state.user.role === UserType.PICE_WORKER ||
        state.user.role === UserType.PROJECT_MANAGER ||
        state.user.role === UserType.RESELLER ||
        state.user.role === UserType.SELLER)
    ) {
      queryParams.append("venderId", state.user.id);
    }

    // Pass sorting preference to the API, but also handle it locally for consistency
    // queryParams.append("sort", selectedSort.value);

    try {
      const response = await api.get(`/orders/all?${queryParams.toString()}`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      if (!response.data.data) {
        throw new Error("Failed to fetch orders");
      }

      const rawData = response.data.data as RawOrder[];

      setOrdersData({
        data: rawData,
        totalCount: rawData.length,
      });

      // Apply transformation and sorting
      applyFiltersAndSorting(rawData);
    } catch (err) {
      setError("Error fetching orders. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [memoizedFilters, state.user, TOKEN, applyFiltersAndSorting]);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchOrders();
    }, 300);
    return () => clearTimeout(handler);
  }, [fetchOrders]);

  // Re-run sorting/filtering whenever the raw data changes (e.g., after an update)
  useEffect(() => {
    applyFiltersAndSorting(ordersData.data);
  }, [ordersData.data, applyFiltersAndSorting]);

  // Helper function to update status
  const handleUpdateStatus = useCallback(
    async (orderId: string, updates: Partial<RawOrder>) => {
      try {
        setLoading(true);

        const endpoint = updates.orderStatus
          ? `/orders/${orderId}/status`
          : `/orders/${orderId}/deliveryStatus`;
        const response = await api.put(endpoint, updates, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });
        if (response.data.data) {
          setOrdersData((prev) => ({
            ...prev,
            data: prev.data.map((order) =>
              order._id === orderId
                ? { ...order, ...response.data.data }
                : order
            ),
          }));
          setFilteredOrders((prev) =>
            prev.map((order) =>
              order._id === orderId
                ? { ...order, ...response.data.data }
                : order
            )
          );

          setMessage({
            flag: true,
            message: "Order updated successfully",
            operation: Operation.CREATE,
          });
          await fetchOrders();
        }
      } catch (err: any) {
        setMessage({
          message:
            err.response?.data?.message || "An unexpected error occurred.",
          flag: true,
          operation: Operation.NONE,
        });
      } finally {
        setLoading(false);
      }
    },
    [TOKEN, fetchOrders]
  );

  // ... rest of the component (Modal, UI structure for filters/sorts)
  // I will only include the return part for completeness.

  const updateFilter = (sectionId: string, optionValue: string) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      const sectionKey = sectionId as keyof typeof newFilters;

      // @ts-ignore
      newFilters[sectionKey] = newFilters[sectionKey].map((option) =>
        option.value === optionValue
          ? { ...option, checked: !option.checked }
          : option
      );
      return newFilters;
    });
    setFilterVersion((v) => v + 1); // Trigger memoizedFilters update
  };

  return (
    <div className="bg-white">
      {/* Mobile filter dialog */}
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        open={mobileFiltersOpen}
        onClose={setMobileFiltersOpen}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
          >
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Filters (Mobile) */}
            <form className="mt-4 border-t border-gray-200">
              {filtersConfig.map((section) => (
                <Disclosure
                  as="div"
                  key={section.id}
                  className="border-t border-gray-200 px-4 py-6"
                >
                  {({ open }) => (
                    <>
                      <h3 className="-mx-2 -my-3 flow-root">
                        <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-6">
                          {filters[section.id as keyof typeof filters].map(
                            (option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  checked={option.checked}
                                  onChange={() =>
                                    updateFilter(section.id, option.value)
                                  }
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            )
                          )}
                        </div>
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              ))}
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-1xl font-bold tracking-tight text-gray-900">
            Orders Dashboard
          </h1>

          <div className="flex items-center gap-1">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition duration-75 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:scale-100 data-[enter]:transform data-[enter]:opacity-100"
              >
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <MenuItem key={option.name}>
                      {({ focus }) => (
                        <a
                          href="#"
                          onClick={() => {
                            setSelectedSort(option);
                            // Also update the current state in all sort options for UI
                            const updatedOptions = sortOptions.map((o) => ({
                              ...o,
                              current: o.value === option.value,
                            }));
                            // We don't actually need to store the updated list, but just select the new one.
                            // The rest of the list remains the same structure here.
                            setSelectedSort(option);
                          }}
                          className={classNames(
                            option.value === selectedSort.value
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            focus ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          {option.name}
                        </a>
                      )}
                    </MenuItem>
                  ))}
                </div>
              </MenuItems>
            </Menu>
            <Image
              src={"/card.svg"}
              alt="/card"
              width={20}
              height={20}
              onClick={() => setTableScreen(false)}
            />
            <Image
              src={"/tableImg.svg"}
              alt="/card"
              width={20}
              height={20}
              onClick={() => setTableScreen(true)}
            />
            <button
              type="button"
              className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
            >
              <span className="sr-only">View grid</span>
              {/* GridIcon */}
            </button>
            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <h2 id="products-heading" className="sr-only">
            Orders
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters (Desktop) */}
            <form className="hidden lg:block">
              <h3 className="sr-only">Categories</h3>
              {/* Category-like filter removed for simplicity, focusing on status filters */}

              {filtersConfig.map((section) => (
                <Disclosure
                  as="div"
                  key={section.id}
                  className="border-b border-gray-200 py-6"
                  defaultOpen={true}
                >
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {filters[section.id as keyof typeof filters].map(
                            (option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  checked={option.checked}
                                  onChange={() =>
                                    updateFilter(section.id, option.value)
                                  }
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            )
                          )}
                        </div>
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              ))}
            </form>

            {/* Order Table */}
            <div className="lg:col-span-3">
              {loading ? (
                <p className="text-center py-10 text-lg text-gray-500">
                  Loading orders...
                </p>
              ) : error ? (
                <p className="text-center py-10 text-lg text-red-500">
                  {error}
                </p>
              ) : (
                <>
                  {tableScreen ? (
                    <div className="space-y-4">
                      <OrdersTable
                        orders={filteredOrders}
                        onUpdateStatus={handleUpdateStatus}
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredOrders.length > 0 ? (
                        filteredOrders.map((order, index) => (
                          <OrderCard
                            key={index}
                            order={order}
                            onUpdateStatus={handleUpdateStatus}
                          />
                        ))
                      ) : (
                        <p className="text-center py-10 text-lg text-gray-500">
                          No orders found.
                        </p>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Message Modal */}
      <MessageModal
        handleClose={() => setMessage(emptyMessage)}
        modalFlag={message.flag}
        operation={message.operation}
        value={message.message}
      />
    </div>
  );
}

// Add this new component within the same file, or in a separate file like OrderCard.tsx

function OrderCard({
  order,
  onUpdateStatus,
}: {
  order: FlattenedOrderRow;
  onUpdateStatus: (id: string, updates: Partial<RawOrder>) => void;
}) {
  const { state } = useContext(AppContext);
  const isVendorOrAdmin =
    state.user?.role === UserType.ADMIN ||
    state.user?.role === UserType.PICE_WORKER ||
    state.user?.role === UserType.PROJECT_MANAGER ||
    state.user?.role === UserType.RESELLER ||
    state.user?.role === UserType.SELLER ||
    state.user?.role === UserType.SYSTEM_ADMIN;

  const orderIdForUpdate = order._id;

  // Function to get status color
  const getStatusColor = (status: OrderStatus | DeliveryStatus): string => {
    switch (status) {
      case OrderStatus.CONFIRMED:
      case DeliveryStatus.SHIPPED:
        return "text-indigo-700 bg-indigo-100";
      case OrderStatus.CANCELLED:
      case DeliveryStatus.RETURNED:
        return "text-red-700 bg-red-100";
      case OrderStatus.PENDING:
      case DeliveryStatus.PENDING:
      default:
        return "text-yellow-700 bg-yellow-100";
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 mb-6">
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-start mb-4 border-b pb-4">
          <h3 className="text-xl font-semibold text-gray-900 leading-tight">
            Order ID:{" "}
            <span className="text-sm font-normal text-gray-500">
              {orderIdForUpdate}
            </span>
          </h3>
          <span
            className={classNames(
              getStatusColor(order.orderStatus),
              "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium"
            )}
          >
            {order.orderStatus}
          </span>
        </div>
        {isVendorOrAdmin && (
          <div className="ms-48">
            {order.orderStatus === OrderStatus.PENDING ? (
              <Menu as="div" className="relative inline-block  text-left">
                <MenuButton className="inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Actions
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </MenuButton>

                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5">
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={() =>
                          onUpdateStatus(orderIdForUpdate, {
                            // Use orderIdForUpdate
                            orderStatus: OrderStatus.CONFIRMED,
                          } as Partial<RawOrder>)
                        }
                        className={`${
                          active ? "bg-gray-100" : ""
                        } block w-full px-4 py-2 text-left text-sm text-gray-700`}
                      >
                        Confirm Order
                      </button>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={() =>
                          onUpdateStatus(orderIdForUpdate, {
                            // Use orderIdForUpdate
                            orderStatus: OrderStatus.CANCELLED,
                          } as Partial<RawOrder>)
                        }
                        className={`${
                          active ? "bg-gray-100" : ""
                        } block w-full px-4 py-2 text-left text-sm text-gray-700`}
                      >
                        Cancel Order
                      </button>
                    )}
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : order.deliveryStatus === DeliveryStatus.PENDING ||
              order.deliveryStatus === DeliveryStatus.RETURNED ? (
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Actions
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </MenuButton>

                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5">
                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={() =>
                          onUpdateStatus(orderIdForUpdate, {
                            // Use orderIdForUpdate
                            deliveryStatus: DeliveryStatus.SHIPPED,
                          } as Partial<RawOrder>)
                        }
                        className={`${
                          active ? "bg-gray-100" : ""
                        } block w-full px-4 py-2 text-left text-sm text-gray-700`}
                      >
                        Mark as Shipped
                      </button>
                    )}
                  </MenuItem>
                </MenuItems>
              </Menu>
            ) : null}
          </div>
        )}
        {/* Product and Price Details */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="col-span-2">
            <p className="font-medium text-lg text-indigo-600">
              {order.productId.name}
            </p>
            {order.attributes && (
              <p className="text-xs text-gray-500 mt-1">
                Attributes: {order.attributes}
              </p>
            )}
          </div>
          <div className="border-t pt-2">
            <p className="font-medium">Quantity</p>
            <p>{order.quantity}</p>
          </div>
          <div className="border-t pt-2">
            <p className="font-medium">Item Price</p>
            <p className="font-bold">₹{order.itemPrice?.toFixed(2)}</p>
            <p className="text-xs text-gray-500">
              (Unit: ₹{order.unitPrice?.toFixed(2)})
            </p>
          </div>
        </div>

        <dl className="mt-4 space-y-3 border-t pt-4 text-sm">
          {/* Buyer, Vendor, Store */}
          <div className="grid grid-cols-2 gap-y-3">
            <div>
              <dt className="font-medium text-gray-900">Buyer</dt>
              <dd className="text-gray-700">{order.buyerId?.name}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">Vendor</dt>
              <dd className="text-gray-700">{order.venderId?.name}</dd>
            </div>
          </div>
          <div>
            <dt className="font-medium text-gray-900">Store</dt>
            <dd className="text-gray-700">
              {order.storeId?.name} ({order.storeId?.address})
            </dd>
          </div>

          {/* Status and Payment */}
          <div className="flex justify-between">
            <div>
              <dt className="font-medium text-gray-900">Payment</dt>
              <dd className="text-gray-700">{order.paymentMethod}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">Delivery Status</dt>
              <dd
                className={classNames(
                  getStatusColor(order.deliveryStatus),
                  "font-medium rounded-md px-2 py-0.5 text-center"
                )}
              >
                {order.deliveryStatus}
              </dd>
            </div>
          </div>

          {/* Address */}
          <div>
            <dt className="font-medium text-gray-900">Delivery Address</dt>
            <dd className="text-gray-700">{order.deliveryAddress}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
