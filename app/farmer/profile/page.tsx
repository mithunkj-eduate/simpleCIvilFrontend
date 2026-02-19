"use client";
import AddModal from "@/components/helpers/AddModal";
import { Button } from "@/stories/Button/Button";
import React, { useContext, useEffect, useState } from "react";

import Api, { api } from "@/components/helpers/apiheader";
import { Operation } from "@/utils/enum.types";
import AddProfile, { initialFarmerProfileValues } from "./AddProfile";
import { AppContext } from "@/context/context";

const StorePage = () => {
  const [modalFlag, setModalFlag] = useState(false);
  const [operation, setOperation] = useState(Operation.NONE);

  const { TOKEN } = Api();
  const { state } = useContext(AppContext);

  const [formData, setFormData] = useState(initialFarmerProfileValues);

  useEffect(() => {
    if (state.user) {
      if (!TOKEN || !state.user) return;

      const getStore = async () => {
        try {
          const res = await api.get(`/farmer/profile`, {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              "Content-Type": "application/json",
            },
          });

          if (res.data) {
            setFormData({
              name: res.data.farmName,
              landSizeAcres: res.data.landSizeAcres,
              soilType: res.data.soilType,
              irrigationType: res.data.irrigationType,
              farmingType: res.data.farmingType,
              state: res.data.state,
              district: res.data.district,
              village: res.data.village,
              latitude: res.data.location.coordinates[0],
              longitude: res.data.location.coordinates[1],
              pincode: res.data.pincode,
            });
          }
        } catch (error) {
          console.log(error);
        }
      };
      getStore();
    }
  }, [TOKEN, state.user]);

  function Info({ label, value }: { label: string; value: string }) {
    return (
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-800">{value || "-"}</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex">
        {formData.name === "" ? (
          <Button
            mode="primary"
            className="ms-auto m-2"
            onClick={() => {
              setOperation(Operation.CREATE);
              setModalFlag(true);
            }}
          >
            Create Profile
          </Button>
        ) : (
          <Button
            mode="primary"
            className="ms-auto m-2"
            onClick={() => {
              setOperation(Operation.UPDATE);
              setModalFlag(true);
            }}
          >
            Update Profile
          </Button>
        )}
      </div>

      <div className="bg-white rounded-2xl p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            Farmer Profile
          </h2>

          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
            Active
          </span>
        </div>

        {/* Name */}
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="font-medium text-gray-800">{formData.name}</p>
        </div>

        {/* Land Info */}
        <div className="grid grid-cols-2 gap-4">
          <Info label="Land Size" value={`${formData.landSizeAcres} Acres`} />
          <Info label="Farming Type" value={formData.farmingType} />
        </div>

        {/* Soil & Irrigation */}
        <div className="grid grid-cols-2 gap-4">
          <Info label="Soil Type" value={formData.soilType} />
          <Info label="Irrigation" value={formData.irrigationType} />
        </div>

        {/* Location */}
        <div>
          <p className="text-sm text-gray-500">Location</p>
          <p className="font-medium text-gray-800">
            {formData.village}, {formData.district}
          </p>
          <p className="text-sm text-gray-500">
            {formData.state} - {formData.pincode}
          </p>
        </div>

        {/* Coordinates */}
        <div className="text-xs text-gray-400">
          Lat: {formData.latitude} | Lng: {formData.longitude}
        </div>
      </div>

      <AddModal
        modalFlag={modalFlag}
        setModalFlag={setModalFlag}
        // eslint-disable-next-line react/no-children-prop
        children={
          <AddProfile
            setModalFlag={setModalFlag}
            operations={{
              operation,
              setOperation,
            }}
          />
        }
      />
    </>
  );
};

export default StorePage;
