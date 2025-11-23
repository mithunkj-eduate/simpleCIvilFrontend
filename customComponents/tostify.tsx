"use client";

import { Operation } from "@/utils/commenTypes";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

interface TostifyProps {
  modalFlag: boolean;
  setModalFlag: (open: boolean) => void;
  operation: Operation;
  value?: string;
}

export default function Tostify({
  modalFlag,
  setModalFlag,
  operation,
  value,
}: TostifyProps) {
  const colorClass =
    operation === Operation.CREATE ||
    operation === Operation.UPDATE ||
    operation === Operation.DELETE
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
      
  return (
    <div>
      <Dialog open={modalFlag} onClose={setModalFlag} className="relative z-10">
        <DialogBackdrop
          transition
          className={`${colorClass} fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in`}
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className={`${colorClass} data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in`}
            >
              {value}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
