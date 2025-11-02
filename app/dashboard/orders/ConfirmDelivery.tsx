"use client";

import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import { Button } from "@/stories/Button/Button";
import { Input } from "@/stories/Input/Input";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  orderId: string;
  buyerId: string;
}

export default function ConfirmDelivery({
  open,
  setOpen,
  orderId,
  buyerId,
}: Props) {
  const { state } = useContext(AppContext);
  const { TOKEN } = Api();
  const [code, setCode] = useState(0);

  const handleSubmit = async () => {
    try {
      if (!TOKEN || !state.user?.id) return;
      // throw new Error("Authentication required");

      if (!code) {
        alert("required code");
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
        alert("Delivery Successfuly");
      }
    } catch (err) {
      console.error(err);
    }
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
                     Submit Genarated Code
                    </DialogTitle>
                    <div className="mt-2">
                      <Input onChange={(e) => setCode(e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <Button
                  type="button"
                  data-autofocus
                  onClick={() => handleSubmit()}
                  mode="submit"
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  mode="cancel"
                >
                  Cancel
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
