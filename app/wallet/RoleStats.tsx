// RoleStats.tsx

import { UserType } from "@/utils/enum.types";

interface Props {
  role: UserType;
}

export default function RoleStats({ role }: Props) {
  const stats: any = {
    SELLER: [
      { label: "Total Sales", value: "₹25,000" },
      { label: "Pending Payout", value: "₹3,200" },
    ],

    RAIDER: [
      { label: "Deliveries", value: "120" },
      { label: "Delivery Earnings", value: "₹6,400" },
    ],

    FARMER: [{ label: "Crop Sales", value: "₹18,200" }],

    RESELLER: [{ label: "Commission Earned", value: "₹4,200" }],

    PICE_WORKER: [{ label: "Completed Tasks", value: "35" }],
  };

  const roleStats = stats[role] || [];

  return (
    <div className="grid grid-cols-2 gap-4">
      {roleStats.map((s: any, i: number) => (
        <div key={i} className="bg-white p-4 rounded shadow">
          <p className="text-gray-400 text-sm">{s.label}</p>

          <p className="text-xl font-bold">{s.value}</p>
        </div>
      ))}
    </div>
  );
}
