// WithdrawModal.tsx

import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import { Dispatch, SetStateAction, useContext, useState } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function WithdrawModal({ open, setOpen }: Props) {
  const [amount, setAmount] = useState("");

  const { TOKEN } = Api();
  const { state } = useContext(AppContext);

  const submit = async () => {
    if (state.user) if (!TOKEN || !state.user) return;

    try {
      const res = await api.post(
        `/withdrawals`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        },
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    }

    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-lg font-semibold">Withdraw Money</h2>

        <input
          type="number"
          placeholder="Amount"
          className="border p-2 w-full mt-4"
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="flex gap-2 mt-4">
          <button
            onClick={submit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>

          <button
            onClick={() => setOpen(false)}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
