"use client";
import AddModal from "@/components/helpers/AddModal";
import { Button } from "@/stories/Button/Button";
import { Operation } from "@/utils/enum.types";
import AddCropPlan from "./AddCropPlan";
import { useState } from "react";
import AddSession from "./AddSession";

const CropPlan = () => {
  const [modalFlag, setModalFlag] = useState(false);
  const [operation, setOperation] = useState(Operation.NONE);
  const [sessionModal, setSeesionModal] = useState(false);

  return (
    <div>
      <Button
        mode="primary"
        className="ms-auto m-2"
        onClick={() => {
          setOperation(Operation.CREATE);
          setModalFlag(true);
        }}
      >
        Create Crop Plan
      </Button>
      <Button
        mode="primary"
        className="ms-auto m-2"
        onClick={() => {
          setOperation(Operation.CREATE);
          setSeesionModal(true);
        }}
      >
        Create Session
      </Button>

      <AddModal
        modalFlag={modalFlag}
        setModalFlag={setModalFlag}
        // eslint-disable-next-line react/no-children-prop
        children={
          <AddCropPlan
            setModalFlag={setModalFlag}
            operations={{
              operation,
              setOperation,
            }}
          />
        }
      />

      <AddModal
        modalFlag={sessionModal}
        setModalFlag={setSeesionModal}
        // eslint-disable-next-line react/no-children-prop
        children={
          <AddSession
            setModalFlag={setSeesionModal}
            operations={{
              operation,
              setOperation,
            }}
          />
        }
      />
    </div>
  );
};

export default CropPlan;
