"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/stories/Input/Input";
import { Label } from "@/stories/Label/Label";
import { formStepsPortfolio } from "./StepProgress";
import { PortfolioProps } from "./MetaForm";

const servicesSchema = Yup.object({
  services: Yup.array().of(
    Yup.object({
      title: Yup.string().required("Title required"),
      description: Yup.string().required("Description required"),
      image: Yup.string().url().required("Image required"),
    }),
  ),
});

export default function ServicesForm({
  initialValues,
  handleSave,
  step,
  prevStep,
}: PortfolioProps) {
  const formik = useFormik({
    initialValues: {
      services: [
        {
          id: "s1",
          title: "",
          description: "",
          image: "",
          price: "",
          priceUnit: "",
          duration: "",
          badge: "",
          features: [""],
        },
      ],
    },
    validationSchema: servicesSchema,
    onSubmit: (values) => {
      console.log(values);
      alert("Services Saved ✅");
    },
  });

  // helpers
  const addService = () => {
    formik.setFieldValue("services", [
      ...formik.values.services,
      {
        id: Date.now().toString(),
        title: "",
        description: "",
        image: "",
        price: "",
        priceUnit: "",
        duration: "",
        badge: "",
        features: [""],
      },
    ]);
  };

  const removeService = (index) => {
    const arr = [...formik.values.services];
    arr.splice(index, 1);
    formik.setFieldValue("services", arr);
  };

  const handleServiceChange = (i, field, value) => {
    const arr = [...formik.values.services];
    arr[i][field] = value;
    formik.setFieldValue("services", arr);
  };

  const addFeature = (i) => {
    const arr = [...formik.values.services];
    arr[i].features.push("");
    formik.setFieldValue("services", arr);
  };

  const removeFeature = (i, fi) => {
    const arr = [...formik.values.services];
    arr[i].features.splice(fi, 1);
    formik.setFieldValue("services", arr);
  };

  const handleFeatureChange = (i, fi, value) => {
    const arr = [...formik.values.services];
    arr[i].features[fi] = value;
    formik.setFieldValue("services", arr);
  };

  return (
    <div className="mx-auto max-w-5xl bg-white rounded-2xl shadow p-6 md:p-8 mt-6">
      <h2 className="text-2xl font-bold text-center mb-6">Services Section</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {formik.values.services.map((service, i) => (
          <div
            key={service.id}
            className="border rounded-2xl p-5 space-y-4 bg-gray-50"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Service {i + 1}</h3>
              <button
                type="button"
                onClick={() => removeService(i)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>

            {/* BASIC */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={service.title}
                  onChange={(e) =>
                    handleServiceChange(i, "title", e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Image URL</Label>
                <Input
                  value={service.image}
                  onChange={(e) =>
                    handleServiceChange(i, "image", e.target.value)
                  }
                />
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <textarea
                value={service.description}
                onChange={(e) =>
                  handleServiceChange(i, "description", e.target.value)
                }
                className="w-full border rounded-lg p-3 h-24"
              />
            </div>

            {/* EXTRA INFO */}
            <div className="grid md:grid-cols-4 gap-4">
              <Input
                placeholder="Price"
                value={service.price}
                onChange={(e) =>
                  handleServiceChange(i, "price", e.target.value)
                }
              />
              <Input
                placeholder="Price Unit"
                value={service.priceUnit}
                onChange={(e) =>
                  handleServiceChange(i, "priceUnit", e.target.value)
                }
              />
              <Input
                placeholder="Duration"
                value={service.duration}
                onChange={(e) =>
                  handleServiceChange(i, "duration", e.target.value)
                }
              />
              <Input
                placeholder="Badge"
                value={service.badge}
                onChange={(e) =>
                  handleServiceChange(i, "badge", e.target.value)
                }
              />
            </div>

            {/* FEATURES */}
            <div>
              <h4 className="font-medium mb-2">Features</h4>

              {service.features.map((feature, fi) => (
                <div key={fi} className="flex gap-2 mb-2">
                  <Input
                    value={feature}
                    onChange={(e) => handleFeatureChange(i, fi, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(i, fi)}
                    className="text-red-500"
                  >
                    ❌
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addFeature(i)}
                className="text-sm bg-gray-100 px-3 py-1 rounded"
              >
                + Add Feature
              </button>
            </div>
          </div>
        ))}

        {/* ADD SERVICE */}
        <button
          type="button"
          onClick={addService}
          className="w-full bg-gray-100 py-2 rounded-lg"
        >
          + Add Service
        </button>

        {/* SUBMIT */}
        {/* <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500"
        >
          Save Services
        </button> */}

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 0}
            className="px-6 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>

          {step === formStepsPortfolio.length - 1 ? (
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg"
            >
              ✅ Finish
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
            >
              Save & Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
