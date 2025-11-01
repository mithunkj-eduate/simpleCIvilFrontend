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
import { UserType } from "@/utils/enum.types";

interface Order {
  _id: string;
  buyerId: { _id: string; name: string; email: string; phoneNumber: string };
  venderId: { _id: string; name: string; email: string; phoneNumber: string };
  productId: { _id: string; name: string; saleTerms?: { salePrice: number } };
  storeId: { _id: string; name: string; address: string };
  quantity: number;
  totalPrice: number;
  orderStatus: OrderStatus;
  paymentMethod: PaymentMethod;
  deliveryAddress: string;
  deliveryStatus: DeliveryStatus;
  deliveryDate?: string;
  createdAt: string;
}

function OrderRow({
  order,
  onUpdateStatus,
}: {
  order: Order;
  onUpdateStatus: (id: string, updates: Partial<Order>) => void;
}) {
  const { state } = useContext(AppContext);
  const isVendorOrAdmin =
    state.user?.role === UserType.ADMIN ||
    state.user?.role === UserType.PICE_WORKER ||
    state.user?.role === UserType.PROJECT_MANAGER ||
    state.user?.role === UserType.RESELLER ||
    state.user?.role === UserType.SELLER ||
    state.user?.role === UserType.SYSTEM_ADMIN;

  return (
    <tr className="border-b">
      <td className="py-4 px-6">{order.productId.name}</td>
      <td className="py-4 px-6">{order.buyerId.name}</td>
      <td className="py-4 px-6">{order.venderId.name}</td>
      <td className="py-4 px-6">{order.storeId.name}</td>
      <td className="py-4 px-6">{order.quantity}</td>
      <td className="py-4 px-6">₹{order.totalPrice.toFixed(2)}</td>
      <td className="py-4 px-6">{order.orderStatus}</td>
      <td className="py-4 px-6">{order.paymentMethod}</td>
      <td className="py-4 px-6">{order.deliveryStatus}</td>
      <td className="py-4 px-6">{order.deliveryAddress}</td>
      <td className="py-4 px-6">
        {order.deliveryDate
          ? new Date(order.deliveryDate).toLocaleDateString()
          : "N/A"}
      </td>
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
                        onUpdateStatus(order._id, {
                          orderStatus: OrderStatus.CONFIRMED,
                        })
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
                        onUpdateStatus(order._id, {
                          orderStatus: OrderStatus.CANCELLED,
                        })
                      }
                      className={`${
                        active ? "bg-gray-100" : ""
                      } block w-full px-4 py-2 text-left text-sm text-gray-700`}
                    >
                      Cancel Order
                    </button>
                  )}
                </MenuItem>

                {/* <MenuItem>
                 {({ active }) => (
                   <button
                     onClick={() =>
                       onUpdateStatus(order._id, {
                         deliveryStatus: DeliveryStatus.DELIVERED,
                       })
                     }
                     className={`${
                       active ? "bg-gray-100" : ""
                     } block w-full px-4 py-2 text-left text-sm text-gray-700`}
                   >
                     Mark as Delivered
                   </button>
                 )}
               </MenuItem> */}  
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
                        onUpdateStatus(order._id, {
                          deliveryStatus: DeliveryStatus.SHIPPED,
                        })
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
  orders: Order[];
  onUpdateStatus: (id: string, updates: Partial<Order>) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
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
              Total Price
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
              Delivery Date
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
                key={order._id}
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
  const [ordersData, setOrdersData] = useState<{
    data: Order[];
    totalCount: number;
  }>({
    data: [],
    totalCount: 0,
  });
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
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
    queryParams.append("sort", selectedSort.value);

    try {
      const response = await api.get(`/orders/all?${queryParams.toString()}`, {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      if (!response.data.data) {
        throw new Error("Failed to fetch orders");
      }
      setOrdersData({
        data: response.data.data,
        totalCount: response.data.data.length,
      });
      setFilteredOrders(response.data.data);
    } catch (err) {
      setError("Error fetching orders. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [selectedSort, memoizedFilters, state.user, TOKEN]);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchOrders();
    }, 300);
    return () => clearTimeout(handler);
  }, [fetchOrders]);

  const updateFilter = (
    filterType: "orderStatus" | "paymentMethod" | "deliveryStatus",
    value: string,
    checked: boolean
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].map((option) =>
        option.value === value ? { ...option, checked } : option
      ),
    }));
    setFilterVersion((prev) => prev + 1);
  };

  const clearAllFilters = () => {
    setFilters({
      orderStatus: filters.orderStatus.map((opt) => ({
        ...opt,
        checked: false,
      })),
      paymentMethod: filters.paymentMethod.map((opt) => ({
        ...opt,
        checked: false,
      })),
      deliveryStatus: filters.deliveryStatus.map((opt) => ({
        ...opt,
        checked: false,
      })),
    });
    setSelectedSort(sortOptions[0]);
    setFilterVersion((prev) => prev + 1);
  };

  const handleUpdateStatus = async (
    orderId: string,
    updates: Partial<Order>
  ) => {
    try {
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
            order._id === orderId ? { ...order, ...response.data.data } : order
          ),
        }));
        setFilteredOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, ...response.data.data } : order
          )
        );
        alert("Order updated successfully");
      }
    } catch (err) {
      setError("Failed to update order. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-51 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />
          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                  >
                    Clear All
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon aria-hidden="true" className="size-6" />
                  </button>
                </div>
              </div>

              <form className="mt-4 border-t border-gray-200">
                {filtersConfig.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name} (
                          {
                            filters[section.id].filter((opt) => opt.checked)
                              .length
                          }
                          )
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="size-5 group-data-open:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="size-5 group-not-data-open:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {filters[section.id].map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <input
                              id={`filter-mobile-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              checked={option.checked}
                              onChange={() =>
                                updateFilter(
                                  section.id,
                                  option.value,
                                  !option.checked
                                )
                              }
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6 sticky top-0 bg-white z-10">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Orders ({filteredOrders.length})
              </h1>
              {filteredOrders.length !== ordersData.totalCount && (
                <p className="text-sm text-gray-500 mt-1">
                  Showing {filteredOrders.length} of {ordersData.totalCount}{" "}
                  orders
                </p>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort: {selectedSort.name}
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                  />
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <button
                          onClick={() => {
                            setSelectedSort(option);
                            setFilterVersion((prev) => prev + 1);
                          }}
                          className={classNames(
                            selectedSort.value === option.value
                              ? "font-medium text-gray-900 bg-gray-100"
                              : "text-gray-500 hover:bg-gray-50",
                            "block w-full px-4 py-2 text-left text-sm"
                          )}
                        >
                          {option.name}
                        </button>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 p-2 text-gray-400 hover:text-gray-500 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="orders-heading" className="pt-6 pb-24">
            <h2 id="orders-heading" className="sr-only">
              Orders
            </h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <form className="hidden lg:block">
                <button
                  onClick={clearAllFilters}
                  className="mt-4 w-full rounded-md border border-indigo-600 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Clear All Filters
                </button>
                {filtersConfig.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name} (
                          {
                            filters[section.id].filter((opt) => opt.checked)
                              .length
                          }
                          )
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="size-5 group-data-open:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="size-5 group-not-data-open:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {filters[section.id].map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <input
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              checked={option.checked}
                              onChange={() =>
                                updateFilter(
                                  section.id,
                                  option.value,
                                  !option.checked
                                )
                              }
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="text-sm text-gray-600"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>

              <div className="lg:col-span-3">
                {loading ? (
                  <p className="text-gray-500 text-center py-10">
                    Loading orders...
                  </p>
                ) : error ? (
                  <p className="text-red-500 text-center py-10">{error}</p>
                ) : (
                  <OrdersTable
                    orders={filteredOrders}
                    onUpdateStatus={handleUpdateStatus}
                  />
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
