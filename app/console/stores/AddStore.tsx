import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import { Button } from "@/stories/Button/Button";
import { Input } from "@/stories/Input/Input";
import { Label } from "@/stories/Label/Label";
import { TextArea } from "@/stories/TextArea/TextArea";
import { DialogTitle } from "@headlessui/react";
import React, { useContext } from "react";

interface AddStoreProps {
  setModalFlag: (flag: boolean) => void;
}

export const StoreFormJson = [
  {
    labelName: "Name",
    inputName: "name",
    dataType: "name",
    autoFocus: true,
    required: true,
  },
  {
    labelName: "Address",
    inputName: "address",
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
];

const AddStore = ({ setModalFlag }: AddStoreProps) => {
  const { TOKEN } = Api();
  const { state } = useContext(AppContext);
  const [formData, setFormData] = React.useState({
    name: "",
    address: "",
    latitude:13.100450747898778,
    longitude:77.56980901384942,
    pincode: "",
  });

  const AddStore = async () => {
    try {
      if (TOKEN && state.user) {
        const body = {
          name: formData.name,
          ownerId: state.user?.id,
          address: formData.address,
          latitude:formData.latitude,
          longitude:formData.longitude,
          pincode: formData.pincode,
        };
        const res = await api.post("/stores", body, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200 && res.data.data) {
          alert("add store sucssfull");
          setModalFlag(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
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
                d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
              />
            </svg>
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <DialogTitle
              as="h3"
              className="text-base font-semibold text-gray-900"
            >
              Add Store
            </DialogTitle>

            <div className="mt-2">
              <p className="text-sm text-gray-500"></p>
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
                } else {
                  return (
                    <div key={index} className="sm:col-span-3">
                      <Label htmlFor="email">{item.labelName}</Label>
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
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <Button
          type="button"
          onClick={() => {
            AddStore();
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

export default AddStore;
