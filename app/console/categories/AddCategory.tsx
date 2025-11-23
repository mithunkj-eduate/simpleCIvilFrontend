import { Button } from "@/stories/Button/Button";
import { Input } from "@/stories/Input/Input";
import { Label } from "@/stories/Label/Label";
import { TextArea } from "@/stories/TextArea/TextArea";
import React, { useState } from "react";

import {
  AutoCompleteOption,
  CategoryTypes,
  msgType,
} from "@/utils/commenTypes";
import {
  ApiPathType,
  CategoryLevelType,
  CatrgroryStatus,
  Operation,
} from "@/utils/enum.types";
import Api, { api } from "@/components/helpers/apiheader";
import AutoSelect from "../products/AutoSelect";
import AutocompleteSelect from "@/hooks/StoreAutocompleteSelect";
import MessageModal from "@/customComponents/MessageModal";
import { emptyMessage } from "@/utils/constants";

export const CategoryFormJson = [
  {
    labelName: "Name",
    inputName: "name",
    dataType: "name",
    autoFocus: true,
    required: true,
  },
  {
    labelName: "Description",
    inputName: "description",
    dataType: "textarea",
    required: true,
  },
];

interface AddCategoryProps {
  setModalFlag: (flag: boolean) => void;
}

const AddCategory = ({ setModalFlag }: AddCategoryProps) => {
  const { TOKEN } = Api();
  const [selectedGroup, setSelectedGroup] = useState<AutoCompleteOption | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] =
    useState<AutoCompleteOption | null>(null);

  const [selectedLevel, setSelectedLevel] = useState<AutoCompleteOption | null>(
    null
  );
  const [selectedStatus, setSelectedStatus] =
    useState<AutoCompleteOption | null>({
      label: CatrgroryStatus.ACTIVE,
      value: CatrgroryStatus.ACTIVE,
    });
  const [message, setMessage] = useState<msgType>(emptyMessage);

  const LevelOption: AutoCompleteOption[] = [
    {
      label: CategoryLevelType.GROUP,
      value: CategoryLevelType.GROUP,
    },
    {
      label: CategoryLevelType.CATEGORY,
      value: CategoryLevelType.CATEGORY,
    },
    {
      label: CategoryLevelType.SUBSIDIARY,
      value: CategoryLevelType.SUBSIDIARY,
    },
  ];

  const statusOption: AutoCompleteOption[] = [
    {
      label: CatrgroryStatus.ACTIVE,
      value: CatrgroryStatus.ACTIVE,
    },
    {
      label: CatrgroryStatus.INACTIVE,
      value: CatrgroryStatus.INACTIVE,
    },
  ];

  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
  });

  const AddCategory = async () => {
    try {
      if (TOKEN) {
        const body: CategoryTypes = {
          name: formData.name,
          description: formData.description,
          parentCatId:
            selectedLevel?.value === CategoryLevelType.SUBSIDIARY
              ? selectedCategory && selectedCategory.value
              : selectedLevel?.value === CategoryLevelType.CATEGORY
              ? selectedGroup && selectedGroup?.value
              : null,
          level: selectedLevel?.value as CategoryLevelType,
          status: selectedStatus?.value as CatrgroryStatus,
        };
        const res = await api.post("/categories", body, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });
        if (res.data.data) {
          setMessage({
            flag: true,
            message: `add ${selectedLevel?.value} sucssfull`,
            operation: Operation.CREATE,
          });

        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () =>{
    setModalFlag(false);
    setMessage(emptyMessage)
  }
  return (
    <>
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
                d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
              />
            </svg>
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <div className="text-base font-semibold text-gray-900">
              Add Categories
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to deactivate your account? All of your
                data will be permanently removed. This action cannot be undone.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols">
              {CategoryFormJson.map((item, index) => {
                if (item.inputName === "description") {
                  return (
                    <div key={index} className="sm:col-span-3">
                      <Label htmlFor="email">{item.labelName}</Label>
                      <div className="mt-2">
                        <TextArea
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              [item.inputName]: e.target.value,
                            });
                          }}
                        ></TextArea>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={index} className="sm:col-span-3">
                      <Label htmlFor={item.inputName}>{item.labelName}</Label>
                      <div className="mt-2">
                        <Input
                          type={item.dataType}
                          name={item.inputName}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              [item.inputName]: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                  );
                }
              })}

              <div className="sm:col-span-3">
                <div className="mt-2">
                  <AutocompleteSelect
                    label={"Level"}
                    options={LevelOption}
                    value={selectedLevel}
                    onChange={(e, newValue) => {
                      setSelectedLevel(newValue as AutoCompleteOption | null);
                    }}
                  />
                </div>
              </div>
              {selectedLevel?.value === CategoryLevelType.CATEGORY ||
              selectedLevel?.value === CategoryLevelType.SUBSIDIARY ? (
                <div className="sm:col-span-3">
                  <div className="mt-2">
                    <AutoSelect
                      selectedItem={selectedGroup}
                      setSelectedItem={setSelectedGroup}
                      path={ApiPathType.CATEGORIES_GROUP}
                      label="Search Group"
                    />
                  </div>
                </div>
              ) : null}
              {selectedGroup &&
              selectedLevel?.value === CategoryLevelType.SUBSIDIARY ? (
                <div className="sm:col-span-3">
                  <div className="mt-2">
                    <AutoSelect
                      selectedItem={selectedCategory}
                      setSelectedItem={setSelectedCategory}
                      path={`${ApiPathType.CATEGORIES_CATEGORIES}&&parentCatId=${selectedGroup?.value}`}
                      label="Search Category"
                    />
                  </div>
                </div>
              ) : null}

              <div className="sm:col-span-3">
                <div className="mt-2">
                  <AutocompleteSelect
                    label={"Status"}
                    options={statusOption}
                    value={selectedStatus}
                    onChange={(e, newValue) => {
                      setSelectedStatus(newValue as AutoCompleteOption | null);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <Button
          type="button"
          onClick={() => {
            AddCategory();
          }}
          mode="primary"
          data-autofocus
          className=""
        >
          Save
        </Button>
        <Button
          type="button"
          data-autofocus
          onClick={() => setModalFlag(false)}
          mode="cancel"
          className="mx-2"
        >
          Cancel
        </Button>
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

export default AddCategory;
