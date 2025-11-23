import { Button } from "@/stories/Button/Button";
import { Input } from "@/stories/Input/Input";
import { Label } from "@/stories/Label/Label";
import { TextArea } from "@/stories/TextArea/TextArea";
import React, { useContext, useEffect, useState } from "react";
import AutoSelect from "./AutoSelect";
import {
  AutoCompleteOption,
  ProductInputType,
  msgType,
  productType,
} from "@/utils/commenTypes";
import { ApiPathType, Operation } from "@/utils/enum.types";
import { AppContext } from "@/context/context";
import AutocompleteSelect from "@/hooks/StoreAutocompleteSelect";
import Api, { api } from "@/components/helpers/apiheader";
import MessageModal from "@/customComponents/MessageModal";
import { emptyMessage } from "@/utils/constants";

export const StoreFormJson = [
  {
    labelName: "Name",
    inputName: "name",
    dataType: "text",
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
    labelName: "Store",
    inputName: "storeId",
    dataType: "storeId",
    required: true,
  },
  {
    labelName: "MRP Price",
    inputName: "mrpPrice",
    dataType: "number",
    required: false,
    minNum: 1,
  },
  {
    labelName: "Sale Price",
    inputName: "salePrice",
    dataType: "number",
    required: false,
    minNum: 1,
  },
  {
    labelName: "Stock",
    inputName: "stock",
    dataType: "number",
    required: false,
    minNum: 1,
  },
  {
    labelName: "Color",
    inputName: "text",
    required: false,
  },
  {
    labelName: "Size",
    inputName: "size",
    dataType: "text",
    required: false,
  },
  {
    labelName: "Tags (comma-separated)",
    inputName: "tags",
    dataType: "text",
    required: false,
  },
  {
    labelName: "Rental Price Per Unit",
    inputName: "rentalPricePerUnit",
    dataType: "number",
    required: false,
  },
  {
    labelName: "Rental Unit (e.g., days)",
    inputName: "rentalUnit",
    dataType: "number",
    required: false,
  },
  {
    labelName: "Minimum Rental Duration",
    inputName: "rentalMinDuration",
    dataType: "number",
    required: false,
  },
  {
    labelName: "Product Type",
    inputName: "type",
    dataType: "type",
    required: true,
  },
];

// Type-safe form data — only string | number | undefined allowed for inputs
interface ProductFormData {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  storeId: string;
  mrpPrice: number;
  salePrice: number;
  stock: number;
  color: string;
  size: string;
  tags: string;
  rentalPricePerUnit: number;
  rentalUnit: number;
  rentalMinDuration: number;

  [key: string]: string | number | undefined;
}

const initialFormData = {
  name: "",
  description: "",
  latitude: 13.100450747898778,
  longitude: 77.56980901384942,
  storeId: "",
  mrpPrice: 0,
  salePrice: 0,
  stock: 0,
  color: "",
  size: "",
  tags: "",
  rentalPricePerUnit: 0,
  rentalUnit: 0,
  rentalMinDuration: 0,
};

interface AddProductProps {
  setModalFlag: (flag: boolean) => void;
  onProductAdded?: () => void;
  operations: {
    operation: Operation;
    setOperation: React.Dispatch<React.SetStateAction<Operation>>;
  };
  selectedId: string;
}

const AddProduct = ({
  setModalFlag,
  onProductAdded,
  operations,
  selectedId,
}: AddProductProps) => {
  const [selectedStore, setSelectedStore] = useState<AutoCompleteOption | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] =
    useState<AutoCompleteOption | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<AutoCompleteOption | null>(
    null
  );
  const [selectedSubsidiary, setSelectedSubsidiary] =
    useState<AutoCompleteOption | null>(null);
  const [selectedType, setSelectedType] = useState<AutoCompleteOption | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [availability] = useState(true); // Fixed typo + moved out of formData

  const { TOKEN } = Api();
  const { state } = useContext(AppContext);
  const [message, setMessage] = useState<msgType>(emptyMessage);

  const [formData, setFormData] = useState<ProductFormData>(initialFormData);

  const SaleTypeOption: AutoCompleteOption[] = [
    { label: productType.SALE, value: productType.SALE },
    { label: productType.RESALE, value: productType.RESALE },
    { label: productType.RENTAL, value: productType.RENTAL },
  ];

  const getStore = async () => {
    try {
      const res = await api.get(`/products/${selectedId}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (res.data.data) {
        const data = res.data.data;
        console.log(data, "data");
        setFormData({
          name: data.name || "",
          description: data.description || "",
          latitude: data.location.coordinates[0],
          longitude: data.location.coordinates[1],
          storeId: data.storeId?._id || "",
          mrpPrice: data.saleTerms?.mrpPrice || 0,
          salePrice: data.saleTerms?.salePrice || 0,
          stock: data.stock || 0,
          color: data.color || "",
          size: data.size || "",
          tags: data.tags?.length ? data.tags.join(", ") : "",
          rentalPricePerUnit: data.rentalPricePerUnit || 0,
          rentalUnit: data.rentalUnit || 0,
          rentalMinDuration: data.rentalMinDuration || 0,
        });

        if (data.storeId?._id) {
          setSelectedStore({
            label: data.storeId.name,
            value: data.storeId._id,
          });
        }

        setSelectedType({
          label: data.type,
          value: data.type,
        });

        setSelectedCategory({
          label: data.categoryId.name,
          value: data.categoryId._id,
        });
        setSelectedGroup({
          label: data.categoryId.name,
          value: data.categoryId._id,
        });
        setSelectedSubsidiary({
          label: data.categoryId.name,
          value: data.categoryId._id,
        });
      }
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  useEffect(() => {
    if (
      operations.operation === Operation.UPDATE &&
      selectedId &&
      TOKEN &&
      state.user
    ) {
      getStore();
    }
  }, [operations.operation, selectedId, TOKEN, state.user]);

  const handleAddProduct = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!TOKEN) {
        setMessage({
          flag: true,
          message: "Authentication token missing",
          operation: Operation.NONE,
        });
        return;
      }
      if (!selectedStore) {
        setMessage({
          flag: true,
          message: "Please select a store",
          operation: Operation.NONE,
        });
        return;
      }
      if (
        !selectedGroup &&
        !selectedCategory &&
        !selectedSubsidiary &&
        operations.operation === Operation.CREATE
      ) {
        setMessage({
          flag: true,
          message: "Please select a category/group",
          operation: Operation.NONE,
        });
        return;
      }
      if (!selectedType) {
        setMessage({
          flag: true,
          message: "Please select product type",
          operation: Operation.NONE,
        });
        return;
      }

      const body: ProductInputType = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        storeId: selectedStore.value as string,
        ownerId: state.user?.id as string,
        categoryId:
          selectedSubsidiary?.value ||
          selectedCategory?.value ||
          selectedGroup?.value ||
          "",
        latitude: formData.latitude,
        longitude: formData.longitude,
        avilablity: true, // now safe and correct
        type: selectedType.value as productType,
        color: formData.color || undefined,
        size: formData.size || undefined,
        tags: formData.tags
          ? formData.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [],
        saleTerms:
          selectedType.value !== productType.RENTAL
            ? {
                mrpPrice: formData.mrpPrice || 0,
                salePrice: formData.salePrice || 0,
                stock: formData.stock || 0,
              }
            : undefined,
        rentalTerms:
          selectedType.value === productType.RENTAL &&
          formData.rentalPricePerUnit > 0 &&
          formData.rentalUnit > 0
            ? [
                {
                  unit: formData.rentalUnit,
                  pricePerUnit: formData.rentalPricePerUnit,
                  minduration: formData.rentalMinDuration.toString(),
                },
              ]
            : undefined,
      };

      const path =
        operations.operation === Operation.UPDATE
          ? `/products/${selectedId}`
          : "/products";

      const res = await api({
        method: operations.operation === Operation.UPDATE ? "put" : "post",
        url: path,
        data: body,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
      console.log(res, "res");
      setMessage({
        flag: true,
        message:
          operations.operation === Operation.UPDATE
            ? "Product updated successfully!"
            : "Product added successfully!",
        operation: Operation.NONE,
      });

      onProductAdded?.();
      setModalFlag(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Operation failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setMessage(emptyMessage);
    if (
      message.operation === Operation.CREATE ||
      message.operation === Operation.UPDATE
    ) {
      setFormData(initialFormData);
      setModalFlag(false);
    }
  };

  return (
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

        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
          <h3 className="text-base font-semibold text-gray-900">
            {operations.operation === Operation.UPDATE
              ? "Edit Product"
              : "Add Product"}
          </h3>

          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
            {StoreFormJson.map((item, index) => {
              const key = item.inputName as keyof ProductFormData;

              if (item.dataType === "textarea") {
                return (
                  <div key={index} className="sm:col-span-2">
                    <Label htmlFor={item.inputName}>{item.labelName}</Label>
                    <div className="mt-2">
                      <TextArea
                        name={item.inputName}
                        value={formData[key] ?? ""}
                        onChange={(e) =>
                          setFormData({ ...formData, [key]: e.target.value })
                        }
                        required={item.required}
                      />
                    </div>
                  </div>
                );
              }

              if (item.inputName === "storeId") {
                return (
                  <div key={index} className="sm:col-span-2">
                    <Label>{item.labelName}</Label>
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
              }

              if (item.inputName === "type") {
                return (
                  <div key={index} className="sm:col-span-2">
                    <Label>{item.labelName}</Label>
                    <div className="mt-2">
                      <AutocompleteSelect
                        label="Product Type"
                        options={SaleTypeOption}
                        value={selectedType}
                        onChange={(_e, newValue) => setSelectedType(newValue)}
                      />
                    </div>
                  </div>
                );
              }

              return (
                <div key={index} className="sm:col-span-1">
                  <Label htmlFor={item.inputName}>{item.labelName}</Label>
                  <div className="mt-2">
                    <Input
                      type={item.dataType === "number" ? "number" : "text"}
                      name={item.inputName}
                      value={
                        formData[key] ?? (item.dataType === "number" ? 0 : "")
                      }
                      onChange={(e) => {
                        const val =
                          item.dataType === "number"
                            ? Number(e.target.value) || 0
                            : e.target.value;
                        setFormData({ ...formData, [key]: val });
                      }}
                      required={item.required}
                      min={item.minNum}
                    />
                  </div>
                </div>
              );
            })}

            {/* Category Hierarchy */}
            <div className="sm:col-span-2">
              <AutoSelect
                selectedItem={selectedGroup}
                setSelectedItem={setSelectedGroup}
                path={ApiPathType.CATEGORIES_GROUP}
                label="Search Group"
              />
            </div>

            {selectedGroup && (
              <div className="sm:col-span-2">
                <AutoSelect
                  selectedItem={selectedCategory}
                  setSelectedItem={setSelectedCategory}
                  path={`${ApiPathType.CATEGORIES_CATEGORIES}&&parentCatId=${selectedGroup.value}`}
                  label="Search Category"
                />
              </div>
            )}

            {selectedCategory && (
              <div className="sm:col-span-2">
                <AutoSelect
                  selectedItem={selectedSubsidiary}
                  setSelectedItem={setSelectedSubsidiary}
                  path={`${ApiPathType.CATEGORIES_SUBSIDIARY}&&parentCatId=${selectedCategory.value}`}
                  label="Search Subsidiary Category"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 mt-8">
        <Button
          type="button"
          onClick={handleAddProduct}
          mode="primary"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Product"}
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

      <MessageModal
        handleClose={handleClose}
        modalFlag={message.flag}
        operation={message.operation}
        value={message.message}
      />
    </div>
  );
};

export default AddProduct;
