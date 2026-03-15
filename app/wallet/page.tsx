"use client";

import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import { useContext, useEffect, useState } from "react";
import WalletCard from "./WalletCard";
import { LicenseTypes, UserType } from "@/utils/enum.types";
import RoleStats from "./RoleStats";
import TransactionTable from "./TransactionTable";
import WithdrawModal from "./WithdrawModal";
import Navbar from "@/components/commen/Navbar";

export enum WalletType {
  SHOPPING = "SHOPPING",
  SALES = "SALES",
  COMMISSION = "COMMISSION",
  PROJECT = "PROJECT",
  WORK_PAYMENT = "WORK_PAYMENT",
  DELIVERY = "DELIVERY",
  FARM_SALES = "FARM_SALES",
  PLATFORM = "PLATFORM",
  SYSTEM = "SYSTEM",
}

export interface walletDataType {
  _id: string;
  role: UserType;
  walletType: WalletType;
  balance: number;
}

export enum WalletTransactionType {
  CREDIT = "credit",
  DEBIT = "debit",
}

export interface WalletTransactionDataType {
  _id: string;
  amount: number;

  type: WalletTransactionType;

  reason: string;

  balanceAfter: number;
  createdAt: string;
}

export default function WalletPage() {
  const [wallet, setWallet] = useState<walletDataType | null>(null);
  const [transactions, setTransactions] = useState<WalletTransactionDataType[]>(
    [],
  );
  const [openWithdraw, setOpenWithdraw] = useState(false);

  const { TOKEN } = Api();
  const { state } = useContext(AppContext);

  useEffect(() => {
    if (state.user) {
      if (!TOKEN || !state.user) return;

      const getStore = async () => {
        try {
          const res = await api.get(`/wallet/${state.user?.id}`, {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              "Content-Type": "application/json",
            },
          });

          if (res.data) {
            setWallet(res.data);
          }

          const historyRes = await api.get(
            `/wallet/${state.user?.id}/history`,
            {
              headers: {
                Authorization: `Bearer ${TOKEN}`,
                "Content-Type": "application/json",
              },
            },
          );

          console.log(res, historyRes, "res");
          if (historyRes.data) {
            setTransactions(historyRes.data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getStore();
    }
  }, [TOKEN, state.user]);

  // if (!wallet) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <Navbar NavType={LicenseTypes.USER} />

      {wallet && <WalletCard wallet={wallet} />}

      {wallet && <RoleStats role={wallet.role} />}

      <div className="flex gap-3">
        <button
          onClick={() => setOpenWithdraw(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Withdraw
        </button>

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Add Money
        </button>
      </div>

      <TransactionTable transactions={transactions} />

      <WithdrawModal open={openWithdraw} setOpen={setOpenWithdraw} />
    </div>
  );
}
