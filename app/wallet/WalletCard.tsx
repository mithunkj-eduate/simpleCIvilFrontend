// WalletCard.tsx

import { walletDataType } from "./page";

interface Props {
  wallet: walletDataType;
}

export default function WalletCard({ wallet }: Props) {
  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h2 className="text-gray-500 text-sm">Wallet Balance</h2>

      <div className="text-3xl font-bold mt-2">
        ₹{wallet.balance ? wallet.balance.toFixed(2) : 0}
      </div>

      <p className="text-sm text-gray-400 mt-1">Role: {wallet.role}</p>
    </div>
  );
}
