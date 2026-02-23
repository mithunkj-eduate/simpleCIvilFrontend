"use client";
import { AppContext } from "@/context/context";
import { useContext } from "react";
import AnalyticsPage from "../analytics/page";
import { Button } from "@/stories/Button/Button";
// import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { dashboardText } from "@/app/utils/DashbordText";

function LanguageSwitcher() {
  // const { i18n } = useTranslation();

  const changeLang = (lang: string) => {
    // i18n.changeLanguage(lang);
    Cookies.set("lang", lang);
  };

  return (
    <div className="space-y-2 mx-4 flex gap-3">
      <Button mode="secondary" className="" onClick={() => changeLang("en")}>English </Button>
      <Button mode="secondary" className="" onClick={() => changeLang("kn")}>ಕನ್ನಡ</Button>
      {/* <Button onClick={() => changeLang("hi")}>हिन्दी</Button>
      <Button onClick={() => changeLang("ta")}>தமிழ்</Button> */}
    </div>
  );
}

export default function FarmerDashboard() {
  const { state } = useContext(AppContext);
  console.log(state.lang);
  const lang = state.lang ?? "en";
  return (
    <div>
      {/* Welcome */}
      <div className="bg-green-100 p-4 rounded-2xl shadow m-2">
        <h2 className="text-xl font-bold">
          {
            dashboardText.welcome[
              lang as keyof typeof dashboardText.cropDashboard
            ]
          }{" "}
          {state.user && state.user.name} 👨‍🌾
        </h2>
        <p className="text-sm text-gray-600">
          {
            dashboardText.todayInsight[
              lang as keyof typeof dashboardText.cropDashboard
            ]
          }
        </p>
      <LanguageSwitcher />

      </div>

      <AnalyticsPage />

      {/* <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-3 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Top Crop</p>
          <h3 className="font-bold text-lg">Tomato</h3>
        </div>

        <div className="bg-white p-3 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Avg Profit</p>
          <h3 className="font-bold text-lg text-green-600">₹5200</h3>
        </div>
      </div>

      <div className="bg-yellow-100 p-3 rounded-xl">
        ⚠ Too many farmers planting Tomato in your district
      </div>

      <Link href="/farmer/addReport">
        <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold">
          ➕ Add Crop Report
        </button>
      </Link>

      <ProfitSummary />
      <OversupplyAlert />
      <CropTrends />
      <Recommendations /> */}
    </div>
  );
}
