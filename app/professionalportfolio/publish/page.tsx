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

const PublishPortfolio = () => {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState(false);

  const { TOKEN } = Api();
  const { state } = useContext(AppContext);
  const [message, setMessage] = useState<msgType>(emptyMessage);

  useEffect(() => {
    if (!TOKEN || !state.user) return;

    const getStore = async () => {
      try {
        const res = await api.get(`/professionalPortfolio`, {
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
            `/professionalPortfolio/publish`,
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

  const url = `${BASE_URL_FRONTEND}/professionalportfolio/${state.user?.id}`;

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleClose = () => {
    setMessage(emptyMessage);
  };

  return (
    <>
      <Navbar NavType={LicenseTypes.WEBSIT} />

      <div className="max-w-3xl mx-auto mt-6 space-y-4">
        {/* 🔥 CARD */}
        <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 space-y-4">
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Website Status</h2>

            {/* STATUS BADGE */}
            <span
              className={`text-xs px-3 py-1 rounded-full font-medium
              ${isPublished ? "bg-green-600/20 text-green-400" : "bg-gray-600/20 text-gray-400"}`}
            >
              {isPublished ? "Published" : "Draft"}
            </span>
          </div>

          {/* URL */}
          <div>
            <p className="text-xs text-zinc-500 mb-1">Your Public URL</p>
            <p className="text-sm text-zinc-300 font-mono break-all">{url}</p>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-wrap gap-3">
            {/* COPY */}
            <button
              onClick={() => handleCopy(url)}
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg"
            >
              {copiedUrl === url ? "Copied!" : "Copy"}
            </button>

            {/* PREVIEW */}
            <a
              href={isPublished ? url : "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 rounded-lg text-white
              ${
                isPublished
                  ? "bg-violet-600 hover:bg-violet-700"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              Preview
            </a>

            {/* PUBLISH / UNPUBLISH */}
            <button
              onClick={togglePublish}
              className={`px-4 py-2 rounded-lg text-white
              ${
                isPublished
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isPublished ? "Unpublish" : "Publish"}
            </button>
          </div>
        </div>
      </div>

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
