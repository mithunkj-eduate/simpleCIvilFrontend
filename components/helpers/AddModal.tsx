"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";

export interface AddModalProps {
  modalFlag: boolean;
  setModalFlag: (modalFlag: boolean) => void;
  children: React.ReactNode;
}
export default function AddModal({
  modalFlag,
  setModalFlag,
  children,
}: AddModalProps) {
  return (
    <div>
      <Dialog open={modalFlag} onClose={setModalFlag} className="relative z-51">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto" >
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" >
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="absolute right-0 top-0 z-10 flex items-center justify-between bg-white px-4 py-3 sm:px-6">
                <button
                  type="button"
                  onClick={() => setModalFlag(false)}
                  className="inline-flex items-center rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="size-6" aria-hidden="true" />
                </button>
              </div>
              {children}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
