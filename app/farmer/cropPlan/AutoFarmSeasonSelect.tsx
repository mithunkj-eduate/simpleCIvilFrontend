// src/pages/StoreSelect.tsx
import React, { useContext, useEffect, useState } from "react";
import Api, { api } from "@/components/helpers/apiheader";
import AutocompleteSelect from "@/hooks/StoreAutocompleteSelect";
import { AutoCompleteOption } from "@/utils/commenTypes";
import { AppContext } from "@/context/context";

interface Props {
  selectedItem: AutoCompleteOption | null;
  setSelectedItem: React.Dispatch<
    React.SetStateAction<AutoCompleteOption | null>
  >;
  path: string;
  label?: string;
  disabled?: boolean;
}

interface GetStores {
  seasonName: string;
  _id: string;
}


type SeasonKey = "Kharif" | "Rabi" | "Summer";
type LangKey = "en" | "kn";

export const seasonNames: Record<SeasonKey, Record<LangKey, string>> = {
  Kharif: {
    en: "Rainy Season",
    kn: "ಮಳೆಗಾಲ",
  },
  Rabi: {
    en: "Winter Season",
    kn: "ಚಳಿಗಾಲ",
  },
  Summer: {
    en: "Summer Season",
    kn: "ಬೇಸಿಗೆ",
  },
};

export const getSeasonLabel = (seasonName: string, lang: LangKey = "en") => {
  if (!seasonName) return "";

  const seasonKey = seasonName.split(" ")[0] as SeasonKey;

  const translated = seasonNames[seasonKey]?.[lang] ?? seasonName;

  return `${translated} (${seasonName})`;
};

export const seasonIcons = {
  Kharif: "🌧️",
  Rabi: "❄️",
  Summer: "☀️",
};

export default function AutoFarmSeasonSelect({
  selectedItem,
  setSelectedItem,
  path,
  label,
  disabled,
}: Props) {
  const [options, setOptions] = useState<AutoCompleteOption[]>([]);
  const { TOKEN } = Api();
  const { state } = useContext(AppContext);
  const lang = state.lang ?? "en";
  // useEffect(() => {
  //   // if (!selectedItem) {
  //   //   setUser(null);
  //   //   return;
  //   // }

  //   fetchUser();
  // }, [selectedItem]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (TOKEN && path) {
          const res = await api.get(`/${path}`, {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              "Content-Type": "application/json",
            },
          });

          if (res.data.data && lang) {
            setOptions(
              res.data.data.map((item: GetStores) => ({
                label: `${seasonIcons[item.seasonName.split(" ")[0] as SeasonKey]} ${getSeasonLabel(item.seasonName, lang as LangKey)}`,
                value: item._id,
              })),
            );
          }
        }
      } catch (err) {
        console.error("API error:", err);
      }
    };
    fetchUser();
  }, [TOKEN, selectedItem, path, lang]);

  return (
  
    <div style={{ padding: "2px" }} className="w-full min-w-0" >

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
