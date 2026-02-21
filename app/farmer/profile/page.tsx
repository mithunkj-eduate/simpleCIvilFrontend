"use client";
import AddModal from "@/components/helpers/AddModal";
import { Button } from "@/stories/Button/Button";
import React, { useContext, useEffect, useState } from "react";

import Api, { api } from "@/components/helpers/apiheader";
import { Operation } from "@/utils/enum.types";
import AddProfile from "./AddProfile";
import { AppContext } from "@/context/context";
import FarmerProfileCard, { FarmerProfile } from "./FarmerProfileCard";
import { dashboardText } from "@/app/utils/DashbordText";

export const initialFarmerProfile = {
  name: "",
  landSizeAcres: 0,
  soilType: "",
  irrigationType: "",
  farmingType: "",
  state: "",
  district: "",
  village: "",
  latitude: 0,
  longitude: 0,
  pincode: "",
};

const StorePage = () => {
  const [modalFlag, setModalFlag] = useState(false);
  const [operation, setOperation] = useState(Operation.NONE);

  const { TOKEN } = Api();
  const { state } = useContext(AppContext);
  const lang = state.lang ?? "en";
  const [formData, setFormData] = useState<FarmerProfile>(initialFarmerProfile);

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

  return (
    <>
      <div className="bg-white rounded-2xl p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            {
              dashboardText.profile[
                lang as keyof typeof dashboardText.cropDashboard
              ]
            }
          </h2>
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

          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
            Active
          </span>
        </div>
        <FarmerProfileCard profile={formData} />
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
