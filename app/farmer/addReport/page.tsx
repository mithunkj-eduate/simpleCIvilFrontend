"use client";
import { useState } from "react";

export default function AddReport() {
  const [form, setForm] = useState({
    cropName: "",
    landSize: "",
    investment: "",
    sales: "",
    otherCharges: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const profit =
    Number(form.sales) - (Number(form.investment) + Number(form.otherCharges));

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-xl font-bold">Add Crop Report</h2>

      {["cropName", "landSize", "investment", "sales", "otherCharges"].map(
        (field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
        ),
      )}

      <div className="bg-green-100 p-3 rounded-xl">
        Estimated Profit: ₹{profit || 0}
      </div>

      <button className="w-full bg-green-600 text-white py-3 rounded-xl">
        Submit
      </button>
    </div>
  );
}
