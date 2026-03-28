"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/stories/Input/Input";
import { Label } from "@/stories/Label/Label";

const businessSchema = Yup.object({
  ownerName: Yup.string().required("Owner name required"),
  registrationNumber: Yup.string().required("Registration required"),
  gst: Yup.string(),
  established: Yup.string(),
  licenseNumber: Yup.string(),
});

export default function BusinessInfoForm() {
  const formik = useFormik({
    initialValues: {
      ownerName: "",
      registrationNumber: "",
      gst: "",
      established: "",
      licenseNumber: "",
      additionalInfo: [{ label: "", value: "" }],
    },
    validationSchema: businessSchema,
    onSubmit: (values) => {
      console.log(values);
      alert("Business Info Saved ✅");
    },
  });

  // helpers
  const addItem = () => {
    formik.setFieldValue("additionalInfo", [
      ...formik.values.additionalInfo,
      { label: "", value: "" },
    ]);
  };

  const removeItem = (index) => {
    const arr = [...formik.values.additionalInfo];
    arr.splice(index, 1);
    formik.setFieldValue("additionalInfo", arr);
  };

  const handleChangeArray = (index, field, value) => {
    const arr = [...formik.values.additionalInfo];
    arr[index][field] = value;
    formik.setFieldValue("additionalInfo", arr);
  };

  return (
    <div className="mx-auto max-w-4xl bg-white rounded-2xl shadow p-6 md:p-8 mt-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Business Information
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* BASIC INFO */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label>Owner Name</Label>
            <Input
              name="ownerName"
              value={formik.values.ownerName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.ownerName && formik.errors.ownerName && (
              <p className="text-red-500 text-sm">{formik.errors.ownerName}</p>
            )}
          </div>

          <div>
            <Label>Registration Number</Label>
            <Input
              name="registrationNumber"
              value={formik.values.registrationNumber}
              onChange={formik.handleChange}
            />
            {formik.touched.registrationNumber &&
              formik.errors.registrationNumber && (
                <p className="text-red-500 text-sm">
                  {formik.errors.registrationNumber}
                </p>
              )}
          </div>

          <div>
            <Label>GST Number</Label>
            <Input
              name="gst"
              value={formik.values.gst}
              onChange={formik.handleChange}
            />
            {formik.touched.gst && formik.errors.gst && (
              <p className="text-red-500 text-sm">{formik.errors.gst}</p>
            )}
          </div>

          <div>
            <Label>Established Year</Label>
            <Input
              name="established"
              value={formik.values.established}
              onChange={formik.handleChange}
            />
            {formik.touched.established && formik.errors.established && (
              <p className="text-red-500 text-sm">
                {formik.errors.established}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <Label>License Number</Label>
            <Input
              name="licenseNumber"
              value={formik.values.licenseNumber}
              onChange={formik.handleChange}
            />
            {formik.touched.licenseNumber && formik.errors.licenseNumber && (
              <p className="text-red-500 text-sm">
                {formik.errors.licenseNumber}
              </p>
            )}
          </div>
        </div>

        {/* ADDITIONAL INFO */}
        <div>
          <h3 className="font-semibold mb-3">Additional Information</h3>

          {formik.values.additionalInfo.map((item, i) => (
            <div key={i} className="flex gap-2 mb-3">
              <Input
                placeholder="Label"
                value={item.label}
                onChange={(e) => handleChangeArray(i, "label", e.target.value)}
              />

              <Input
                placeholder="Value"
                value={item.value}
                onChange={(e) => handleChangeArray(i, "value", e.target.value)}
              />

              <button
                type="button"
                onClick={() => removeItem(i)}
                className="text-red-500"
              >
                ❌
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className="text-sm bg-gray-100 px-3 py-2 rounded hover:bg-gray-200"
          >
            + Add Info
          </button>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500"
        >
          Save Business Info
        </button>
      </form>
    </div>
  );
}
