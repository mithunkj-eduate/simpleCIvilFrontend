// src/pages/StoreSelect.tsx
import React, { useEffect, useState } from "react";
import Api, { api } from "@/components/helpers/apiheader";
import AutocompleteSelect from "@/hooks/StoreAutocompleteSelect";
import { GetStores } from "@/commenType/commenTypes";
import { AutoCompleteOption } from "@/utils/commenTypes";

interface Props {
  selectedItem: AutoCompleteOption | null;
  setSelectedItem: React.Dispatch<
    React.SetStateAction<AutoCompleteOption | null>
  >;
  path: string;
  label?: string;
  disabled?: boolean
}

export default function AutoSelect({
  selectedItem,
  setSelectedItem,
  path,
  label,
  disabled
}: Props) {
  const [options, setOptions] = useState<AutoCompleteOption[]>([]);
  const { TOKEN } = Api();

  const fetchUser = async () => {
    try {
      if (TOKEN && path) {
        const res = await api.get(`/${path}`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        if (res.data.data)
          setOptions(
            res.data.data.map((item: GetStores) => ({
              label: item.name,
              value: item._id,
            }))
          );
      }
    } catch (err) {
      console.error("API error:", err);
    }
  };

  // useEffect(() => {
  //   // if (!selectedItem) {
  //   //   setUser(null);
  //   //   return;
  //   // }

  //   fetchUser();
  // }, [selectedItem]);

  useEffect(() => {
    fetchUser();
  }, [TOKEN, selectedItem, path]);

  return (
    <div style={{ padding: "2px" }}>
      <AutocompleteSelect
        label={label}
        options={options}
        value={selectedItem}
        onChange={(e, newValue) => {
          setSelectedItem(newValue as AutoCompleteOption | null);
        }}
        disabled={disabled}
      />
    </div>
  );
}
