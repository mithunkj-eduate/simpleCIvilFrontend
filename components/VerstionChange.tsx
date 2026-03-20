"use client";

import { AppContext } from "@/context/context";
import { payloadTypes } from "@/context/reducer";
import AutocompleteSelect from "@/hooks/StoreAutocompleteSelect";

import { useContext, useState } from "react";
import Cookies from "js-cookie";
import { Button } from "@/stories/Button/Button";
import { msgType } from "@/utils/commenTypes";
import { emptyMessage } from "@/utils/constants";
import MessageModal from "@/customComponents/MessageModal";
import { Operation } from "@/utils/enum.types";

export default function VerstionChange() {
  const { state, dispatch } = useContext(AppContext);
  const [count, setCount] = useState<string>(state.version.toString());
  const [message, setMessage] = useState<msgType>(emptyMessage);

  const paymentMethodOptions = [1, 2, 3, 4].map((method) => ({
    value: method.toString(),
    label: method.toString(),
  }));

  return (
    <div>
      <AutocompleteSelect
        options={paymentMethodOptions}
        label="Version"
        value={
          state.version
            ? {
                value: count.toString(),
                label: count.toString(),
              }
            : null
        }
        onChange={(e, newValue) => {
          if (newValue && newValue.value) {
            setCount(newValue.value as string);
          }
        }}
        className="mb-2"
      />
      <Button
        onClick={() => {
          Cookies.set("version", count.toString());
          dispatch({
            type: payloadTypes.SET_VERSION,
            payload: { version: Number(count) },
          });
          setMessage({
            flag: true,
            message: "Version Updated successfully",
            operation: Operation.CREATE,
          });
        }}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
      >
        Save Version
      </Button>
      <MessageModal
        handleClose={() => {
          setMessage(emptyMessage);
        }}
        modalFlag={message.flag}
        operation={message.operation}
        value={message.message}
      />
    </div>
  );
}
