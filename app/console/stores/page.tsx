"use client";
import AddModal from "@/components/helpers/AddModal";
import Loading from "@/components/helpers/Loading";
import { Button } from "@/stories/Button/Button";
import React, { useEffect, useState } from "react";
import AddStore from "./AddStore";
import { GetStores, Stores } from "@/commenType/commenTypes";
import Api, { api } from "@/components/helpers/apiheader";
import Navbar from "@/components/commen/Navbar";
import { LicenseTypes, Operation } from "@/utils/enum.types";
import StoresList from "./StoresList";

const StorePage = () => {
  const { TOKEN } = Api();
  const [loading, setLoading] = useState(false);
  const [modalFlag, setModalFlag] = useState(false);
  const [stores, setStores] = React.useState<Stores[]>([]);
  const [operation, setOperation] = useState(Operation.NONE);

  const GetStores = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/stores`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        setStores(
          res.data.data.map((store: GetStores) => ({
            id: store._id,
            name: store.name || "N/A",
            ownerId: store.ownerId || "N/A",
            address: store.address || "N/A",
            location: store.location || "N/A",
            pincode: store.pincode || "N/A",
            createdAt: store.createdAt || "N/A",
            updatedAt: store.updatedAt || "N/A",
          }))
        );
      } else {
        console.error("Failed to fetch users:", res.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (TOKEN) {
      GetStores();
    }
  }, [TOKEN]);

  return (
    <>
      <Navbar NavType={LicenseTypes.ADMIN} />

      <div className="flex-1 min-h-screen flex flex-col justify-between">
        {loading ? (
          <Loading />
        ) : (
          <div className="mx-auto max-w-7xl px-4  sm:px-6 lg:px-8">
            <div className="flex">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                All Stores
              </h1>
              <Button
                mode="primary"
                className="ms-auto m-2"
                onClick={() => {
                  setOperation(Operation.CREATE);
                  setModalFlag(true);
                }}
              >
                Add{" "}
              </Button>
            </div>
            <div>
              <StoresList stores={stores} />
            </div>
          </div>
        )}
      </div>
      <AddModal
        modalFlag={modalFlag}
        setModalFlag={setModalFlag}
        // eslint-disable-next-line react/no-children-prop
        children={
          <AddStore
            setModalFlag={setModalFlag}
            selectedId={""}
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
