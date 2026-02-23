// src/pages/StoreSelect.tsx
"use client";
import React, { useContext } from "react";
import AutocompleteSelect from "@/hooks/StoreAutocompleteSelect";
import { AutoCompleteOption } from "@/utils/commenTypes";
import { AppContext } from "@/context/context";
import { Language } from "@/utils/enum.types";

interface Props {
  selectedItem: AutoCompleteOption | null;
  setSelectedItem: React.Dispatch<
    React.SetStateAction<AutoCompleteOption | null>
  >;
  label?: string;
  disabled?: boolean;
}
export enum IrrigationTypeEnum {
  DRIP = "DRIP",
  CANAL = "CANAL",
  RAINFED = "RAINFED",
  SPRINKLER = "SPRINKLER",
}

export const IrrigationLangMap: Record<
  IrrigationTypeEnum,
  { en: string; kn: string; te: string; ta: string; hi: string }
> = {
  DRIP: {
    en: "Drip Irrigation",
    kn: "ಡ್ರಿಪ್ ನೀರಾವರಿ",
    te: "డ్రిప్ సాగు",
    ta: "ட்ரிப் நீர்ப்பாசனம்",
    hi: "ड्रिप सिंचाई",
  },
  CANAL: {
    en: "Canal Irrigation",
    kn: "ಕಾಲುವೆ ನೀರಾವರಿ",
    te: "కాలువ నీటిపారుదల",
    ta: "கால்வாய் பாசனம்",
    hi: "नहर सिंचाई",
  },
  RAINFED: {
    en: "Rain-fed",
    kn: "ಮಳೆ ಆಧಾರಿತ",
    te: "వర్షాధార",
    ta: "மழை சார்ந்த",
    hi: "वर्षा आधारित",
  },
  SPRINKLER: {
    en: "Sprinkler Irrigation",
    kn: "ಸ್ಪ್ರಿಂಕ್ಲರ್ ನೀರಾವರಿ",
    te: "స్ప్రింక్లర్ సాగు",
    ta: "ஸ்பிரிங்கிளர் பாசனம்",
    hi: "स्प्रिंकलर सिंचाई",
  },
};

export default function AutoIrrigationSelect({
  selectedItem,
  setSelectedItem,
  label,
  disabled,
}: Props) {
  const { state } = useContext(AppContext);
  const lang = state.lang ?? "en";

  const CropOptions: AutoCompleteOption[] = Object.values(
    IrrigationTypeEnum,
  ).map((crop) => ({
    label:
      IrrigationLangMap[crop][lang as Language] ?? IrrigationLangMap[crop].en,
    value: crop,
  }));
  return (
    
    <div style={{ padding: "2px" }} className="w-full min-w-0" >
      
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
