"use client";
import Api, { api } from "@/components/helpers/apiheader";
import { useEffect, useState } from "react";

interface Props {
  apiPath: string;
}

const GetApi = ({ apiPath }: Props) => {
  const { TOKEN } = Api();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [response, setResponse] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<any>(null);

  const GetApiFun = async () => {
    if (!apiPath) return;
    try {
      const res = await api.get(apiPath, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      setResponse(res.data); // Usually .data, not full response
    } catch (err) {
      setError(err);
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    if (TOKEN) GetApiFun();
  }, [TOKEN, apiPath]);

  return { response, error };
};

export default GetApi;
