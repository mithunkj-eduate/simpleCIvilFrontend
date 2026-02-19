"use client";

import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import MessageModal from "@/customComponents/MessageModal";
import { Button } from "@/stories/Button/Button";
import { Input } from "@/stories/Input/Input";
import { Label } from "@/stories/Label/Label";
import { TextArea } from "@/stories/TextArea/TextArea";
import { AutoCompleteOption, msgType } from "@/utils/commenTypes";
import { emptyMessage } from "@/utils/constants";
import { CropPlanStatusEnum, Operation } from "@/utils/enum.types";
import { DialogTitle } from "@headlessui/react";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Formik, Form, ErrorMessage } from "formik";
import { AddCropPlanValidation } from "@/validations/validationSchemas";
import AutocompleteSelect from "@/hooks/StoreAutocompleteSelect";

interface AddProfileProps {
  setModalFlag: (flag: boolean) => void;
  operations: {
    operation: Operation;
    setOperation: Dispatch<SetStateAction<Operation>>;
  };
}

export const CropPlanFormJson = [
  { labelName: "Crop Name", inputName: "cropName", dataType: "text" },
  {
    labelName: "Land Allocation (Acres)",
    inputName: "plannedLandAcres",
    dataType: "number",
  },
  {
    labelName: "Planting Date",
    inputName: "expectedPlantingDate",
    dataType: "date",
  },
  {
    labelName: "Harvest Date",
    inputName: "expectedHarvestDate",
    dataType: "date",
  },
  { labelName: "Status", inputName: "status", dataType: "status" },

  { labelName: "State", inputName: "state", dataType: "text" },
  { labelName: "District", inputName: "district", dataType: "text" },
];

const LevelOption: AutoCompleteOption[] = [
  {
    label: CropPlanStatusEnum.PLANNED,
    value: CropPlanStatusEnum.PLANNED,
  },
  {
    label: CropPlanStatusEnum.PLANTED,
    value: CropPlanStatusEnum.PLANTED,
  },
  {
    label: CropPlanStatusEnum.HARVESTED,
    value: CropPlanStatusEnum.HARVESTED,
  },
];

export const initialCropPlanValues = {
  cropName: "",
  plannedLandAcres: "",
  expectedPlantingDate: "",
  expectedHarvestDate: "",
  seasonId: "",
  status: "PLANNED",
  state: "",
  district: "",
};

const AddCropPlan = ({ setModalFlag, operations }: AddProfileProps) => {
  const { TOKEN } = Api();
  const { state } = useContext(AppContext);

  const [message, setMessage] = useState<msgType>(emptyMessage);
  const [formData, setFormData] = useState(initialCropPlanValues);
  const [selectedFarmingType, setFarmingType] =
    useState<AutoCompleteOption | null>(null);

  useEffect(() => {
    if (operations.operation === Operation.UPDATE) {
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
              cropName: res.data.cropName,
              plannedLandAcres: res.data.plannedLandAcres,
              expectedPlantingDate: res.data.expectedPlantingDate,
              expectedHarvestDate: res.data.expectedHarvestDate,
              seasonId: res.data.seasonId,
              status: res.data.status,
              state: res.data.state,
              district: res.data.district,
            });
          }
        } catch (error) {
          console.log(error);
        }
      };
      getStore();
    }
  }, [operations.operation, TOKEN, state.user]);

  const submitForm = async (values: typeof initialCropPlanValues) => {
    try {
      console.log("submited", formData);
      if (!TOKEN || !state.user) return;

      const body = {
        ...values,

      };

      const res = await api({
        method: "post",
        url: "/farmer/cropPlan",
        data: body,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      console.log(res, "res");
      if (res.status === 200 && res.data) {
        setMessage({
          flag: true,
          message:
            operations.operation === Operation.UPDATE
              ? "updated successfully!"
              : "added successfully!",
          operation: Operation.CREATE,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setMessage(emptyMessage);
    if (
      message.operation === Operation.CREATE ||
      message.operation === Operation.UPDATE
    ) {
      setModalFlag(false);
      setFormData(initialCropPlanValues);
      operations.setOperation(Operation.NONE);
    }
  };

  return (
    <>
      <Formik
        initialValues={formData}
        enableReinitialize={true}
        validationSchema={AddCropPlanValidation}
        onSubmit={submitForm}
      >
        {({ handleChange, values }) => (
          <Form>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:size-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                    />
                  </svg>
                </div>

                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900"
                  >
                    {operations.operation === Operation.UPDATE
                      ? "Update"
                      : "Add"}{" "}
                    Crop Plan
                  </DialogTitle>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols">
                    {CropPlanFormJson.map((item, index) => (
                      <div key={index} className="sm:col-span-3 w-80">
                        <Label>{item.labelName}</Label>
                        <div className="mt-2">
                          {item.dataType === "textarea" ? (
                            <TextArea
                              name={item.inputName}
                              onChange={handleChange}
                              value={
                                values[item.inputName as keyof typeof values]
                              }
                            />
                          ) : item.dataType === "status" ? (
                            <div key={index} className="sm:col-span-2">
                              <div className="mt-2">
                                <AutocompleteSelect
                                  label={""}
                                  options={LevelOption}
                                  value={selectedFarmingType}
                                  onChange={(e, newValue) => {
                                    if (newValue) {
                                      setFarmingType(
                                        newValue as AutoCompleteOption | null,
                                      );
                                      setFormData({
                                        ...formData,
                                        status: newValue?.value,
                                      });
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          ) : (
                            <Input
                              type={item.dataType}
                              name={item.inputName}
                              onChange={handleChange}
                              value={
                                values[item.inputName as keyof typeof values]
                              }
                            />
                          )}
                        </div>

                        <ErrorMessage
                          name={item.inputName}
                          component="p"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <Button type="submit" mode="primary">
                Save
              </Button>
              <Button
                type="button"
                onClick={() => setModalFlag(false)}
                mode="cancel"
                className="mx-2"
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>

      <MessageModal
        handleClose={handleClose}
        modalFlag={message.flag}
        operation={message.operation}
        value={message.message}
      />
    </>
  );
};

export default AddCropPlan;
