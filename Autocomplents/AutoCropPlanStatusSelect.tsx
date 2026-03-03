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

export enum CropPlanStatusEnum {
  PLANNED = "PLANNED",
  PLANTED = "PLANTED",
  HARVESTED = "HARVESTED",
}
export const CropPlanStatusLangMap: Record<
  CropPlanStatusEnum,
  { en: string; kn: string; te: string; ta: string; hi: string }
> = {
  PLANNED: {
    en: "Planned",
    kn: "ಯೋಜಿಸಲಾಗಿದೆ",
    te: "ప్లాన్ చేశారు",
    ta: "திட்டமிடப்பட்டது",
    hi: "योजना बनाई गई",
  },
  PLANTED: {
    en: "Planted",
    kn: "ನೆಡಲಾಗಿದೆ",
    te: "నాటారు",
    ta: "நட்டப்பட்டது",
    hi: "लगाया गया",
  },
  HARVESTED: {
    en: "Harvested",
    kn: "ಕೊಯ್ಲು ಮಾಡಲಾಗಿದೆ",
    te: "పంట కోయబడింది",
    ta: "அறுவடை செய்யப்பட்டது",
    hi: "कटाई की गई",
  },
};

export default function AutoCropPlanStatusSelect({
  selectedItem,
  setSelectedItem,
  label,
  disabled,
}: Props) {
  const { state } = useContext(AppContext);
  const lang = state.lang ?? "en";

  const CropOptions: AutoCompleteOption[] = Object.values(
    CropPlanStatusEnum,
  ).map((crop) => ({
    label:
      CropPlanStatusLangMap[crop][lang as Language] ??
      CropPlanStatusLangMap[crop].en,
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
