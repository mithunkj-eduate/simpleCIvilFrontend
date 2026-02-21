import CropRecommendations from "./CropRecommendations";

export default function Suggestions() {
  return (
    <div className="p-4 space-y-3">
      <h2 className="text-xl font-bold">Next Season Suggestions</h2>

      <div className="bg-green-100 p-3 rounded-xl">
        ✅ Onion demand expected to rise next season
      </div>

      <div className="bg-blue-100 p-3 rounded-xl">
        🌧 Rain forecast favorable for Chilli cultivation
      </div>

      <div className="bg-yellow-100 p-3 rounded-xl">
        ⚠ Tomato oversupply expected
      </div>

    <CropRecommendations />

    </div>
  );
}
