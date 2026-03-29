"use client";

import { useEffect, useState, useContext } from "react";
import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import { msgType } from "@/utils/commenTypes";
import { emptyMessage } from "@/utils/constants";
import { PortfolioData } from "@/lib/types";
import { samplePortfolioData } from "@/data/portfolios";

export interface portfolioProps {
  id: string;
}

export default function usePortfolio({ id }: portfolioProps) {
  const { TOKEN } = Api();
  const { state } = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<msgType>(emptyMessage);
  const [form, setForm] = useState<PortfolioData>(samplePortfolioData);

  useEffect(() => {
    if (id) {
      const getPortfolio = async () => {
        try {
          setLoading(true);

          const res = await api.get(`/professionalPortfolio/${id}`, {
            headers: {
              // Authorization: `Bearer ${TOKEN}`,
              "Content-Type": "application/json",
            },
          });

          if (res?.data) {
            setForm(res.data);
          }
        } catch (error: any) {
          console.error(error);

          setMessage({
            flag: true,
            message:
              error?.response?.data?.message || "Failed to load portfolio",
            operation: "ERROR" as any,
          });
        } finally {
          setLoading(false);
        }
      };

      getPortfolio();
    } else {
      if (!TOKEN || !state.user) return;

      const getPortfolio = async () => {
        try {
          setLoading(true);

          const res = await api.get(`/professionalPortfolio/website`, {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              "Content-Type": "application/json",
            },
          });

          if (res?.data) {
            setForm(res.data);
          }
        } catch (error: any) {
          console.error(error);

          setMessage({
            flag: true,
            message:
              error?.response?.data?.message || "Failed to load portfolio",
            operation: "ERROR" as any,
          });
        } finally {
          setLoading(false);
        }
      };

      getPortfolio();
    }
  }, [TOKEN, state.user]);

  return {
    data: form,
    loading,
    message,
    setMessage,
  };
}
