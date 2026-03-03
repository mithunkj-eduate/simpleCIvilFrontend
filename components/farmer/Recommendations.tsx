"use client";
import { useContext, useEffect, useState } from "react";
import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";

interface dataType {
  crop: string;
}

export default function Recommendations() {
  const [data, setData] = useState<dataType[]>([]);
  const { state } = useContext(AppContext);
  const { TOKEN } = Api();

  useEffect(() => {
    if (!TOKEN || !state.user) return;
    const getStore = async () => {
      try {
        const res = await api.get(`/farmer/recommendations`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        if (res.data) {
          setData(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getStore();
  }, [TOKEN, state.user]);

  if (!data) return null;

  return (
    <div className="bg-info/20 p-4 rounded-xl">
      <h3 className="font-semibold">Recommended Crops</h3>

      {data.map((item) => (
        <p key={item.crop}>{item.crop}</p>
      ))}
    </div>
  );
}
