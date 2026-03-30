"use client";

import Navbar from "@/components/commen/Navbar";
import Api, { api, BASE_URL_FRONTEND } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import MessageModal from "@/customComponents/MessageModal";
import { ApiErrorResponse, msgType } from "@/utils/commenTypes";
import { emptyMessage } from "@/utils/constants";
import { LicenseTypes, Operation } from "@/utils/enum.types";
import { AxiosError } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { PortfolioLink } from "../page";

const PublishPortfolio = () => {
  const [isPublished, setIsPublished] = useState(false);

  const { TOKEN } = Api();
  const { state } = useContext(AppContext);
  const [message, setMessage] = useState<msgType>(emptyMessage);

  useEffect(() => {
    if (!TOKEN || !state.user) return;

    const getStore = async () => {
      try {
        const res = await api.get(`/portfolio`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        console.log(res, "res");
        if (res.data) {
          setIsPublished(res.data.isPublished);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getStore();
  }, [TOKEN, state.user]);

  const togglePublish = async () => {
    try {
      if (!TOKEN || !state.user) return;

      const addUpdatePortfolio = async () => {
        try {
          const res = await api.put(
            `/portfolio/publish`,
            { isPublished: !isPublished },
            {
              headers: {
                Authorization: `Bearer ${TOKEN}`,
                "Content-Type": "application/json",
              },
            },
          );

          if (res.data) {
            setMessage({
              flag: true,
              message: "Update successfully!",
              operation: Operation.CREATE,
            });
            console.log(res.data, "data");
            setIsPublished(res.data.isPublished);
          }
        } catch (error) {
          console.log(error);
        }
      };
      addUpdatePortfolio();
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;

      if (axiosError.response) {
        setMessage({
          flag: true,
          message: axiosError.response.data.message,
          operation: Operation.NONE,
        });
      } else {
        setMessage({
          flag: true,
          message: "An unexpected error occurred",
          operation: Operation.NONE,
        });
      }
    }
  };

  const handleClose = () => {
    setMessage(emptyMessage);
  };

  return (
    <>
      <Navbar NavType={LicenseTypes.PORTFOLIO} />
      {state.user && (
        <PortfolioLink
          id={state.user?.id}
          togglePublish={togglePublish}
          isPublished={isPublished}
        />
      )}

      <MessageModal
        handleClose={handleClose}
        modalFlag={message.flag}
        operation={message.operation}
        value={message.message}
      />
    </>
  );
};

export default PublishPortfolio;
