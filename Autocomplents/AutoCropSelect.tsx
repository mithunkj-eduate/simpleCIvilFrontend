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

export enum CropPlanNameEnum {
  Rice = "Rice",
  Ragi = "Ragi",
  Maize = "Maize",
  Wheat = "Wheat",
  Jowar = "Jowar",
  Bajra = "Bajra",

  TurDal = "TurDal",
  GreenGram = "GreenGram",
  BlackGram = "BlackGram",
  BengalGram = "BengalGram",

  Groundnut = "Groundnut",
  Sunflower = "Sunflower",
  Sesame = "Sesame",
  Soybean = "Soybean",

  Cotton = "Cotton",
  Sugarcane = "Sugarcane",

  Tomato = "Tomato",
  Onion = "Onion",
  Potato = "Potato",
  Brinjal = "Brinjal",
  Chili = "Chili",

  Banana = "Banana",
  Mango = "Mango",
  Pomegranate = "Pomegranate",
}

export const CropKannadaMap: Record<CropPlanNameEnum, string> = {
  Rice: "ಅಕ್ಕಿ",
  Ragi: "ರಾಗಿ",
  Maize: "ಮಕ್ಕಾ ಜೋಳ",
  Wheat: "ಗೋಧಿ",
  Jowar: "ಜೋಳ",
  Bajra: "ಸಜ್ಜೆ",

  TurDal: "ತೊಗರಿ",
  GreenGram: "ಹೆಸರು",
  BlackGram: "ಉದ್ದಿನ",
  BengalGram: "ಕಡಲೆ",

  Groundnut: "ಕಡಲೆಕಾಯಿ",
  Sunflower: "ಸೂರ್ಯಕಾಂತಿ",
  Sesame: "ಎಳ್ಳು",
  Soybean: "ಸೊಯಾಬೀನ್",

  Cotton: "ಹತ್ತಿ",
  Sugarcane: "ಕಬ್ಬು",

  Tomato: "ಟೊಮೇಟೊ",
  Onion: "ಈರುಳ್ಳಿ",
  Potato: "ಆಲೂಗಡ್ಡೆ",
  Brinjal: "ಬದನೇಕಾಯಿ",
  Chili: "ಮೆಣಸಿನಕಾಯಿ",

  Banana: "ಬಾಳೆಹಣ್ಣು",
  Mango: "ಮಾವು",
  Pomegranate: "ದಾಳಿಂಬೆ",
};

export const CropLangMap: Record<CropPlanNameEnum, Record<Language, string>> = {
  Rice: { en: "Rice", kn: "ಅಕ್ಕಿ", te: "బియ్యం", ta: "அரிசி", hi: "चावल" },
  Ragi: { en: "Ragi", kn: "ರಾಗಿ", te: "రాగి", ta: "ராகி", hi: "रागी" },
  Maize: {
    en: "Maize",
    kn: "ಮಕ್ಕಾ ಜೋಳ",
    te: "మొక్కజొన్న",
    ta: "மக்காச்சோளம்",
    hi: "मक्का",
  },
  Wheat: { en: "Wheat", kn: "ಗೋಧಿ", te: "గోధుమ", ta: "கோதுமை", hi: "गेहूं" },
  Jowar: { en: "Jowar", kn: "ಜೋಳ", te: "జొన్న", ta: "சோளம்", hi: "ज्वार" },
  Bajra: { en: "Bajra", kn: "ಸಜ್ಜೆ", te: "సజ్జలు", ta: "கம்பு", hi: "बाजरा" },

  TurDal: {
    en: "Tur Dal",
    kn: "ತೊಗರಿ",
    te: "కందిపప్పు",
    ta: "துவரம் பருப்பு",
    hi: "अरहर दाल",
  },
  GreenGram: {
    en: "Green Gram",
    kn: "ಹೆಸರು",
    te: "పెసలు",
    ta: "பச்சை பயறு",
    hi: "मूंग",
  },
  BlackGram: {
    en: "Black Gram",
    kn: "ಉದ್ದಿನ",
    te: "మినుములు",
    ta: "உளுந்து",
    hi: "उड़द",
  },
  BengalGram: {
    en: "Bengal Gram",
    kn: "ಕಡಲೆ",
    te: "సెనగలు",
    ta: "கடலை",
    hi: "चना",
  },

  Groundnut: {
    en: "Groundnut",
    kn: "ಕಡಲೆಕಾಯಿ",
    te: "వేరుశెనగ",
    ta: "நிலக்கடலை",
    hi: "मूंगफली",
  },
  Sunflower: {
    en: "Sunflower",
    kn: "ಸೂರ್ಯಕಾಂತಿ",
    te: "సూర్యకాంతి",
    ta: "சூரியகாந்தி",
    hi: "सूरजमुखी",
  },
  Sesame: { en: "Sesame", kn: "ಎಳ್ಳು", te: "నువ్వులు", ta: "எள்ளு", hi: "तिल" },
  Soybean: {
    en: "Soybean",
    kn: "ಸೊಯಾಬೀನ್",
    te: "సోయాబీన్",
    ta: "சோயாபீன்",
    hi: "सोयाबीन",
  },

  Cotton: { en: "Cotton", kn: "ಹತ್ತಿ", te: "పత్తి", ta: "பருத்தி", hi: "कपास" },
  Sugarcane: {
    en: "Sugarcane",
    kn: "ಕಬ್ಬು",
    te: "చెరకు",
    ta: "கரும்பு",
    hi: "गन्ना",
  },

  Tomato: {
    en: "Tomato",
    kn: "ಟೊಮೇಟೊ",
    te: "టమోటా",
    ta: "தக்காளி",
    hi: "टमाटर",
  },
  Onion: {
    en: "Onion",
    kn: "ಈರುಳ್ಳಿ",
    te: "ఉల్లిపాయ",
    ta: "வெங்காயம்",
    hi: "प्याज",
  },
  Potato: {
    en: "Potato",
    kn: "ಆಲೂಗಡ್ಡೆ",
    te: "ఆలుగడ్డ",
    ta: "உருளைக்கிழங்கு",
    hi: "आलू",
  },
  Brinjal: {
    en: "Brinjal",
    kn: "ಬದನೇಕಾಯಿ",
    te: "వంకాయ",
    ta: "கத்திரிக்காய்",
    hi: "बैंगन",
  },
  Chili: {
    en: "Chili",
    kn: "ಮೆಣಸಿನಕಾಯಿ",
    te: "మిరపకాయ",
    ta: "மிளகாய்",
    hi: "मिर्च",
  },

  Banana: { en: "Banana", kn: "ಬಾಳೆಹಣ್ಣು", te: "అరటి", ta: "வாழை", hi: "केला" },
  Mango: { en: "Mango", kn: "ಮಾವು", te: "మామిడి", ta: "மாம்பழம்", hi: "आम" },
  Pomegranate: {
    en: "Pomegranate",
    kn: "ದಾಳಿಂಬೆ",
    te: "దానిమ్మ",
    ta: "மாதுளை",
    hi: "अनार",
  },
};

export default function AutoCropSelect({
  selectedItem,
  setSelectedItem,
  label,
  disabled,
}: Props) {
  const { state } = useContext(AppContext);
  const lang = state.lang ?? "en";

  const CropOptions: AutoCompleteOption[] = Object.values(CropPlanNameEnum).map(
    (crop) => ({
      label: CropLangMap[crop][lang as Language] ?? CropLangMap[crop].en,
      value: crop,
    }),
  );
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
