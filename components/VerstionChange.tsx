"use client";

import { AppContext } from "@/context/context";
import { payloadTypes } from "@/context/reducer";
import AutocompleteSelect from "@/hooks/StoreAutocompleteSelect";

import { useContext } from "react";

export default function VerstionChange() {
  const { state, dispatch } = useContext(AppContext);

  const paymentMethodOptions = [1, 2, 3, 4].map((method) => ({
    value: method.toString(),
    label: method.toString(),
  }));
  return (
    <AutocompleteSelect
      options={paymentMethodOptions}
      label="Version"
      value={
        state.version
          ? {
              value: state.version.toString(),
              label: state.version.toString(),
            }
          : null
      }
      onChange={(e, newValue) => {
        if (newValue) {
          dispatch({
            type: payloadTypes.SET_VERSION,
            payload: { version: Number(newValue?.value) },
          });
        }
      }}
    />
  );
}
