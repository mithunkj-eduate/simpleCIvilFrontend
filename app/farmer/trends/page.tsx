export default function Trends() {
  const crops = [
    { name: "Tomato", farmers: 120, profit: 4800 },
    { name: "Onion", farmers: 75, profit: 7200 },
    { name: "Chilli", farmers: 30, profit: 3000 },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">District Trends</h2>

      <div className="space-y-2">
        {crops.map((crop) => (
          <div
            key={crop.name}
            className="bg-white p-3 rounded-xl shadow flex justify-between"
          >
            <div>
              <p className="font-semibold">{crop.name}</p>
              <p className="text-sm text-gray-500">
                {crop.farmers} farmers
              </p>
            </div>
            <div className="text-green-600 font-bold">
              ₹{crop.profit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
