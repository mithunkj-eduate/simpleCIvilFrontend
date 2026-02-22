// src/pages/StoreSelect.tsx
"use client";
import React, { useContext } from "react";
import AutocompleteSelect from "@/hooks/StoreAutocompleteSelect";
import { AutoCompleteOption } from "@/utils/commenTypes";
import { AppContext } from "@/context/context";

interface Props {
  selectedItem: AutoCompleteOption | null;
  setSelectedItem: React.Dispatch<
    React.SetStateAction<AutoCompleteOption | null>
  >;
  label?: string;
  disabled?: boolean;
}
export enum SoilTypeEnum {
  RED = "RED",
  BLACK = "BLACK",
  CLAY = "CLAY",
  SANDY = "SANDY",
}

export const SoilLangMap: Record<
  SoilTypeEnum,
  { en: string; kn: string; te: string; ta: string; hi: string }
> = {
  RED: {
    en: "Red Soil",
    kn: "ಕೆಂಪು ಮಣ್ಣು",
    te: "ఎర్ర మట్టి",
    ta: "சிவப்பு மண்",
    hi: "लाल मिट्टी",
  },
  BLACK: {
    en: "Black Soil",
    kn: "ಕರಿ ಮಣ್ಣು",
    te: "నల్ల మట్టి",
    ta: "கருப்பு மண்",
    hi: "काली मिट्टी",
  },
  CLAY: {
    en: "Clay Soil",
    kn: "ಮಣ್ಣಿನ ಮಣ್ಣು",
    te: "బురద మట్టి",
    ta: "சளி மண்",
    hi: "चिकनी मिट्टी",
  },
  SANDY: {
    en: "Sandy Soil",
    kn: "ಮರಳು ಮಣ್ಣು",
    te: "ఇసుక మట్టి",
    ta: "மணல் மண்",
    hi: "रेतीली मिट्टी",
  },
};
export type Language = "en" | "kn" | "te" | "ta" | "hi";

export default function AutoSoilSelect({
  selectedItem,
  setSelectedItem,
  label,
  disabled,
}: Props) {
  const { state } = useContext(AppContext);
  const lang = state.lang ?? "en";

  const CropOptions: AutoCompleteOption[] = Object.values(SoilTypeEnum).map(
    (crop) => ({
      label: SoilLangMap[crop][lang as Language] ?? SoilLangMap[crop].en,
      value: crop,
    }),
  );
  return (
    <div style={{ padding: "2px" }} className="max-md:m-2">
      <AutocompleteSelect
        label={label}
        options={CropOptions}
        value={selectedItem}
        onChange={(e, newValue) => {
          setSelectedItem(newValue as AutoCompleteOption | null);
        }}
        disabled={disabled}
      />
    </div>
  );
}
