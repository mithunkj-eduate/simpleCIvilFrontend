// utils/translations.ts

export type Language = "en" | "kn" | "te" | "ta" | "hi";

export const CommonText = {
  add: {
    en: "Add",
    kn: "ಸೇರಿಸಿ",
    te: "జోడించండి",
    ta: "சேர்க்க",
    hi: "जोड़ें",
  },
  update: {
    en: "Update",
    kn: "ನವೀಕರಿಸಿ",
    te: "అప్డేట్ చేయండి",
    ta: "புதுப்பிக்கவும்",
    hi: "अपडेट करें",
  },
  save: {
    en: "Save",
    kn: "ಉಳಿಸಿ",
    te: "సేవ్ చేయండి",
    ta: "சேமிக்க",
    hi: "सहेजें",
  },
  cancel: {
    en: "Cancel",
    kn: "ರದ್ದುಮಾಡಿ",
    te: "రద్దు చేయండి",
    ta: "ரத்து செய்ய",
    hi: "रद्द करें",
  },
};  

// utils/getText.ts


export const getTextLang = (
  key: keyof typeof CommonText,
  lang: string
): string => {
  const language = lang as Language;
  return CommonText[key][language] ?? CommonText[key].en;
};