export const dashboardText = {
  welcome: {
    en: "Welcome",
    kn: "ಸ್ವಾಗತ",
  },
  todayInsight: {
    en: "Here is today’s crop insight",
    kn: "ಇಂದಿನ ಬೆಳೆ ಮಾಹಿತಿ ಇಲ್ಲಿದೆ",
  },
  cropDashboard: { en: "Crop Dashboard", kn: "ಬೆಳೆ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್" },
  profitable: { en: "Most Profitable Crops", kn: "ಹೆಚ್ಚು ಲಾಭದಾಯಕ ಬೆಳೆಗಳು" },
  oversupply: { en: "Oversupply Crops", kn: "ಅಧಿಕ ಉತ್ಪಾದನೆಯ ಬೆಳೆಗಳು" },
  planning: { en: "Crop Planning", kn: "ಬೆಳೆ ಯೋಜನೆ" },
  seasons: { en: "Seasons", kn: "ಹಂಗಾಮಿಗಳು" },
  myPlans: { en: "My Crop Plans", kn: "ನನ್ನ ಬೆಳೆ ಯೋಜನೆಗಳು" },
  reports: { en: "Production Reports", kn: "ಉತ್ಪಾದನಾ ವರದಿಗಳು" },
  districtPlanning: { en: "District Crop Planning", kn: "ಜಿಲ್ಲೆಯ ಬೆಳೆ ಯೋಜನೆ" },
  updateProfile: { en: "Update Profile", kn: "ಪ್ರೊಫೈಲ್ ನವೀಕರಿಸಿ" },
  smartRecommendations: {
    en: "Smart Crop Recommendations",
    kn: "ಯಾವ ಬೆಳೆ ಬೆಳೆಸುವುದು ಉತ್ತಮ",
  },
  profile: {
    en: "Farmer Profile",
    kn: "ನನ್ನ ಫಾರ್ಮ್ ಮಾಹಿತಿ",
  },
};

export const settingsLabels = {
  settings: { en: "Settings", kn: "ಸೆಟ್ಟಿಂಗ್ಸ್" },
  language: { en: "Language", kn: "ಭಾಷೆ" },
  help: { en: "Help", kn: "ಸಹಾಯ" },
  support: { en: "Support", kn: "ಬೆಂಬಲ" },
};

export const statusOptions = [
  { value: "PLANNED", label: { en: "Planned", kn: "ಯೋಜಿಸಲಾಗಿದೆ" } },
  { value: "PLANTED", label: { en: "Planted", kn: "ನೆಡಲಾಗಿದೆ" } },
  { value: "HARVESTED", label: { en: "Harvested", kn: "ಕೊಯ್ಯಲಾಗಿದೆ" } },
];

export const CerealsOrodGrains = [
  {
    name_en: "Rice",
    name_kn: "ಅಕ್ಕಿ",
    category: "Cereal",
    seasons: ["Kharif", "Rabi"],
  },
  { name_en: "Wheat", name_kn: "ಗೋಧಿ", category: "Cereal", seasons: ["Rabi"] },
  {
    name_en: "Maize",
    name_kn: "ಮಕ್ಕಾ ಜೋಳ",
    category: "Cereal",
    seasons: ["Kharif", "Rabi"],
  },
  {
    name_en: "Sorghum (Jowar)",
    name_kn: "ಜೋಳ",
    category: "Cereal",
    seasons: ["Kharif", "Rabi"],
  },
  {
    name_en: "Pearl Millet (Bajra)",
    name_kn: "ಸಜ್ಜೆ",
    category: "Cereal",
    seasons: ["Kharif"],
  },
  {
    name_en: "Finger Millet (Ragi)",
    name_kn: "ರಾಗಿ",
    category: "Cereal",
    seasons: ["Kharif"],
  },
  { name_en: "Barley", name_kn: "ಜವ", category: "Cereal", seasons: ["Rabi"] },
];

export const PulsesOrDalCrops = [
  {
    name_en: "Red Gram (Tur Dal)",
    name_kn: "ತೊಗರಿ",
    category: "Pulse",
    seasons: ["Kharif"],
  },
  {
    name_en: "Green Gram (Moong)",
    name_kn: "ಹೆಸರು",
    category: "Pulse",
    seasons: ["Kharif", "Summer"],
  },
  {
    name_en: "Black Gram (Urad)",
    name_kn: "ಉದ್ದಿನ",
    category: "Pulse",
    seasons: ["Kharif"],
  },
  {
    name_en: "Bengal Gram (Chana)",
    name_kn: "ಕಡಲೆ",
    category: "Pulse",
    seasons: ["Rabi"],
  },
  {
    name_en: "Horse Gram",
    name_kn: "ಹುರಳಿ",
    category: "Pulse",
    seasons: ["Rabi"],
  },
  {
    name_en: "Cowpea",
    name_kn: "ಅಲಸುಂಡೆ",
    category: "Pulse",
    seasons: ["Kharif"],
  },
];

export const CommercialOrCashCrops = [
  {
    name_en: "Sugarcane",
    name_kn: "ಕಬ್ಬು",
    category: "Cash Crop",
    seasons: ["Annual"],
  },
  {
    name_en: "Cotton",
    name_kn: "ಹತ್ತಿ",
    category: "Cash Crop",
    seasons: ["Kharif"],
  },
  {
    name_en: "Tobacco",
    name_kn: "ತುಪಾಕಿ",
    category: "Cash Crop",
    seasons: ["Rabi"],
  },
  {
    name_en: "Jute",
    name_kn: "ಜ್ಯೂಟ್",
    category: "Cash Crop",
    seasons: ["Kharif"],
  },
];

export const Vegetables = [
  {
    name_en: "Tomato",
    name_kn: "ಟೊಮೇಟೊ",
    category: "Vegetable",
    seasons: ["All"],
  },
  {
    name_en: "Onion",
    name_kn: "ಈರುಳ್ಳಿ",
    category: "Vegetable",
    seasons: ["All"],
  },
  {
    name_en: "Potato",
    name_kn: "ಆಲೂಗಡ್ಡೆ",
    category: "Vegetable",
    seasons: ["Rabi"],
  },
  {
    name_en: "Brinjal",
    name_kn: "ಬದನೇಕಾಯಿ",
    category: "Vegetable",
    seasons: ["All"],
  },
  {
    name_en: "Chilli",
    name_kn: "ಮೆಣಸಿನಕಾಯಿ",
    category: "Vegetable",
    seasons: ["Kharif"],
  },
  {
    name_en: "Cabbage",
    name_kn: "ಕೋಸು",
    category: "Vegetable",
    seasons: ["Rabi"],
  },
  {
    name_en: "Cauliflower",
    name_kn: "ಹೂಕೋಸು",
    category: "Vegetable",
    seasons: ["Rabi"],
  },
];

export const Fruits = [
  { name_en: "Mango", name_kn: "ಮಾವು", category: "Fruit", seasons: ["Summer"] },
  {
    name_en: "Banana",
    name_kn: "ಬಾಳೆಹಣ್ಣು",
    category: "Fruit",
    seasons: ["Annual"],
  },
  {
    name_en: "Papaya",
    name_kn: "ಪಪ್ಪಾಯಿ",
    category: "Fruit",
    seasons: ["Annual"],
  },
  {
    name_en: "Pomegranate",
    name_kn: "ದಾಳಿಂಬೆ",
    category: "Fruit",
    seasons: ["Annual"],
  },
  {
    name_en: "Guava",
    name_kn: "ಸೀಬೆಹಣ್ಣು",
    category: "Fruit",
    seasons: ["Annual"],
  },
  {
    name_en: "Sapota (Chikoo)",
    name_kn: "ಸಪೋಟಾ",
    category: "Fruit",
    seasons: ["Annual"],
  },
];


