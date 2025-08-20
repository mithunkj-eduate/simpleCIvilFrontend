import { Button } from "@/stories/Button/Button";
import { Input } from "@/stories/Input/Input";
import { Label } from "@/stories/Label/Label";
import { TextArea } from "@/stories/TextArea/TextArea";
import React, { useContext, useState } from "react";
import AutoSelect from "./AutoSelect";
import {
  AutoCompleteOption,
  ProductInputType,
  productType,
} from "@/utils/commenTypes";
import { ApiPathType } from "@/utils/enum.types";
import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import AutocompleteSelect from "@/hooks/StoreAutocompleteSelect";

export const StoreFormJson = [
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
  {
    labelName: "Latitude",
    inputName: "latitude",
    dataType: "number",
    required: true,
  },
  {
    labelName: "Longitude",
    inputName: "longitude",
    dataType: "number",
    required: true,
  },
  {
    labelName: "Pincode",
    inputName: "pincode",
    dataType: "pincode",
    required: true,
  },
  {
    labelName: "Store",
    inputName: "storeId",
    dataType: "storeId",
    required: true,
  },
  {
    labelName: "MRP Price",
    inputName: "mrpPrice",
    dataType: "mrpPrice",
    required: true,
  },
  {
    labelName: "Sale Price",
    inputName: "salePrice",
    dataType: "salePrice",
    required: true,
  },
  {
    labelName: "Stock",
    inputName: "stock",
    dataType: "stock",
    required: true,
  },
  {
    labelName: "Product Type",
    inputName: "type",
    dataType: "type",
    required: true,
  },
];

interface AddProductProps {
  setModalFlag: (flag: boolean) => void;
}

const AddProduct = ({ setModalFlag }: AddProductProps) => {
  const [selectedStore, setSelectedStore] = useState<AutoCompleteOption | null>(
    null
  );
  const [selectedGroup, setSelectedGroup] = useState<AutoCompleteOption | null>(
    null
  );
  const [selectedType, setSelectedType] = useState<AutoCompleteOption | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] =
    useState<AutoCompleteOption | null>(null);
  const [selectedSubsidiary, setSelectedSubsidiary] =
    useState<AutoCompleteOption | null>(null);

  const { TOKEN } = Api();
  const { state } = useContext(AppContext);

  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    latitude: 13.100450747898778,
    longitude: 77.56980901384942,
    pincode: "",
    storeId: 0,
    avilablity: true,
    mrpPrice: 0,
    salePrice: 0,
    stock: 0,
  });

  const SaleTypeOption: AutoCompleteOption[] = [
    {
      label: productType.SALE,
      value: productType.SALE,
    },
    {
      label: productType.RESALE,
      value: productType.RESALE,
    },
    {
      label: productType.RENTAL,
      value: productType.RENTAL,
    },
  ];

  const AddProduct = async () => {
    try {
      if (TOKEN) {
        const body: ProductInputType = {
          name: formData.name,
          description: formData.description,
          storeId: selectedStore?.value as string,
          ownerId: state.user?.id as string,
          categoryId: selectedSubsidiary
            ? (selectedSubsidiary.value as string)
            : selectedCategory
            ? (selectedCategory.value as string)
            : (selectedGroup?.value as string),
          latitude: formData.latitude,
          longitude: formData.longitude,
          avilablity: formData.avilablity,
          type: selectedType?.value as productType,
          saleTerms: {
            mrpPrice: formData.mrpPrice,
            salePrice: formData.salePrice,
            stock: formData.stock,
          },
        };

        const res = await api.post("/products", body, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        if (res.data.data) {
          alert(`Add Product Sucssfull`);
        }
      }
    } catch (error) {
      console.log(error);
    }
    //  finally {
    //   setModalFlag(false);
    // }
  };

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
              Add Product
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to deactivate your account? All of your
                data will be permanently removed. This action cannot be undone.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols">
              {StoreFormJson.map((item, index) => {
                if (item.inputName === "address") {
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
                } else if (item.inputName === "storeId") {
                  return (
                    <div key={index} className="sm:col-span-3">
                      <div className="mt-2">
                        <AutoSelect
                          selectedItem={selectedStore}
                          setSelectedItem={setSelectedStore}
                          path={ApiPathType.STROES}
                          label="Search Store"
                        />
                      </div>
                    </div>
                  );
                } else if (item.inputName === "type") {
                  return (
                    <div key={index} className="sm:col-span-3">
                      <div className="mt-2">
                        <AutocompleteSelect
                          label={"Sale Type"}
                          options={SaleTypeOption}
                          value={selectedType}
                          onChange={(e, newValue) => {
                            setSelectedType(
                              newValue as AutoCompleteOption | null
                            );
                          }}
                        />
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
                          required={item.required}
                        />
                      </div>
                    </div>
                  );
                }
              })}

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

              {selectedGroup ? (
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
              {selectedCategory ? (
                <div className="sm:col-span-3">
                  <div className="mt-2">
                    <AutoSelect
                      selectedItem={selectedSubsidiary}
                      setSelectedItem={setSelectedSubsidiary}
                      path={`${ApiPathType.CATEGORIES_SUBSIDIARY}&&parentCatId=${selectedCategory?.value}`}
                      label="Search Subsidary"
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <Button
          type="button"
          onClick={() => {
            AddProduct();
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
    </>
  );
};

export default AddProduct;
