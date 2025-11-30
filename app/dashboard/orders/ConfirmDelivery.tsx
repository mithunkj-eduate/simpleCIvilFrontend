"use client";

import { Dispatch, SetStateAction, useContext, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import { Button } from "@/stories/Button/Button";
import { Input } from "@/stories/Input/Input";
import { DeliveryStatus, OrderAcceptStatus } from "@/types/order";
import MessageModal from "@/customComponents/MessageModal";
import { msgType } from "@/utils/commenTypes";
import { emptyMessage } from "@/utils/constants";
import { Operation } from "@/utils/enum.types";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  orderId: string;
  buyerId: string;
  deliveryStatus: DeliveryStatus;
  refetchQuery: () => void;
  UpdateRaiderStatus: (
    orderId: string,
    acceptStatus: OrderAcceptStatus
  ) => void;
}

export default function ConfirmDelivery({
  open,
  setOpen,
  orderId,
  buyerId,
  deliveryStatus,
  refetchQuery,
  UpdateRaiderStatus,
}: Props) {
  const { state } = useContext(AppContext);
  const { TOKEN } = Api();
  const [code, setCode] = useState(0);
  const [message, setMessage] = useState<msgType>(emptyMessage);

  const handleSubmit = async () => {
    try {
      if (!TOKEN || !state.user?.id) return;
      // throw new Error("Authentication required");

      if (!code) {
        setMessage({
          flag: true,
          message: "Required Genarated Code",
          operation: Operation.NONE,
        });
        return;
      }
      const res = await api.put(
        `/raider/orders/delivery`,
        {
          orderId,
          buyerId,
          code,
        },
        {
          headers: { Authorization: `Bearer ${TOKEN}` },
        }
      );
      console.log("res", res);
      if (res) {
        setMessage({
          flag: true,
          message: "Delivery Successfuly",
          operation: Operation.CREATE,
        });
      }
    } catch (err) {
      console.error(err);
      setMessage({
        flag: true,
        message: "Please enter correct generated code",
        operation: Operation.NONE,
      });
    }
  };

  // const handleUpdateStatus = async () => {
  //   try {
  //     if (!TOKEN || !state.user?.id || !orderId) return;

  //     const endpoint = `/orders/${orderId}/deliveryStatus`;
  //     const response = await api.put(
  //       endpoint,
  //       { deliveryStatus: DeliveryStatus.SHIPPED },
  //       {
  //         headers: { Authorization: `Bearer ${TOKEN}` },
  //       }
  //     );
  //     if (response.data.data) {
  //       refetchQuery();
  //       setMessage({
  //         flag: true,
  //         message: "Order Picked Successfully",
  //         operation: Operation.CREATE,
  //       });
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const handleClose = () => {
    if (message.operation === Operation.CREATE) {
      setOpen(false);
      refetchQuery();
    }
    setMessage(emptyMessage);
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-gray-950/5 px-2.5 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-950/10"
      >
        Generated Code
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  {/* <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                    <ExclamationTriangleIcon
                      aria-hidden="true"
                      className="size-6 text-red-600"
                    />
                  </div> */}
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      {deliveryStatus === DeliveryStatus.PENDING
                        ? "PICKED UP"
                        : "Enter Genarated Code"}
                    </DialogTitle>
                    <div className="mt-2">
                      {deliveryStatus === DeliveryStatus.PENDING ? (
                        "Are you sure you want to picked up order?"
                      ) : (
                        <Input
                          type="number"
                          max={6}
                          placeholder="Ask to customer to genrated code"
                          onChange={(e) => setCode(Number(e.target.value))}
                          required
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                {deliveryStatus === DeliveryStatus.PENDING ? (
                  <Button
                    type="button"
                    data-autofocus
                    onClick={() =>
                      UpdateRaiderStatus(orderId, OrderAcceptStatus.PICKED)
                    }
                    mode="dark"
                  >
                    OK
                  </Button>
                ) : (
                  <Button
                    type="button"
                    data-autofocus
                    onClick={() => handleSubmit()}
                    mode="save"
                  >
                    Submit
                  </Button>
                )}

                <Button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  mode="cancel"
                  className="mx-2"
                >
                  Cancel
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <MessageModal
        handleClose={handleClose}
        modalFlag={message.flag}
        operation={message.operation}
        value={message.message}
      />
    </div>
  );
}
