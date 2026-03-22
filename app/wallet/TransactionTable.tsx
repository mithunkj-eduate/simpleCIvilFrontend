// TransactionTable.tsx

import { WalletTransactionDataType } from "./page";

interface Props {
  transactions: WalletTransactionDataType[];
}

export default function TransactionTable({ transactions }: Props) {
  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h3 className="font-semibold mb-4">Transactions</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400 text-left">
            <th>Type</th>
            <th>Amount</th>
            <th>Reason</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t: WalletTransactionDataType) => (
            <tr key={t._id} className="border-t">
              <td>{t.type === "credit" ? "🟢 Credit" : "🔴 Debit"}</td>

              <td>₹{t.amount ? t.amount.toFixed(2) : 0}</td>

              <td>{t.reason}</td>

              <td>{new Date(t.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
