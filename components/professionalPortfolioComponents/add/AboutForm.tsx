"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/stories/Input/Input";
import { Label } from "@/stories/Label/Label";
import { PortfolioProps } from "./MetaForm";
import { AboutSection } from "@/lib/types";
import { formStepsPortfolio } from "./StepProgress";

const aboutSchema = Yup.object({
  title: Yup.string().required("Title required"),
  description: Yup.string().required("Description required"),
  image: Yup.string().url().required("Image required"),
});

export default function AboutForm({
  initialValues,
  handleSave,
  step,
  prevStep,
}: PortfolioProps) {
  const { about } = initialValues;

  const formik = useFormik({
    initialValues: about ?? {
      title: "",
      description: "",
      image: "",
      highlights: [{ icon: "", title: "", value: "" }],
    },
    validationSchema: aboutSchema,
    onSubmit: (values) => {
      console.log(values);

      const portfolioData = {
        about: values,
      };
      if (portfolioData)
        handleSave({
          ...initialValues,
          about: portfolioData.about as unknown as AboutSection,
        });
      // alert("About Section Saved ✅");
    },
  });

  // helpers
  const addHighlight = () => {
    formik.setFieldValue("highlights", [
      ...formik.values.highlights,
      { icon: "", title: "", value: "" },
    ]);
  };

  const removeHighlight = (index) => {
    const arr = [...formik.values.highlights];
    arr.splice(index, 1);
    formik.setFieldValue("highlights", arr);
  };

  const handleHighlightChange = (index, field, value) => {
    const arr = [...formik.values.highlights];
    arr[index][field] = value;
    formik.setFieldValue("highlights", arr);
  };

  return (
    <div className="mx-auto max-w-4xl bg-white rounded-2xl shadow p-6 md:p-8 mt-6">
      <h2 className="text-2xl font-bold text-center mb-6">About Section</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* BASIC */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label>Title</Label>
            <Input
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title && (
              <p className="text-red-500 text-sm">{formik.errors.title}</p>
            )}
          </div>

          <div>
            <Label>Image URL</Label>
            <Input
              name="image"
              value={formik.values.image}
              onChange={formik.handleChange}
            />
            {formik.touched.image && formik.errors.image && (
              <p className="text-red-500 text-sm">{formik.errors.image}</p>
            )}
          </div>
        </div>

        <div>
          <Label>Description</Label>
          <textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            className="w-full border rounded-lg p-3 h-28"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-sm">{formik.errors.description}</p>
          )}
        </div>

        {/* HIGHLIGHTS */}
        <div>
          <h3 className="font-semibold mb-3">Highlights</h3>

          {formik.values.highlights.map((item, i) => (
            <div
              key={i}
              className="border p-4 rounded-xl mb-3 space-y-3 bg-gray-50"
            >
              <div className="grid md:grid-cols-3 gap-3">
                <Input
                  placeholder="Icon (e.g. Award)"
                  value={item.icon}
                  onChange={(e) =>
                    handleHighlightChange(i, "icon", e.target.value)
                  }
                />

                <Input
                  placeholder="Title"
                  value={item.title}
                  onChange={(e) =>
                    handleHighlightChange(i, "title", e.target.value)
                  }
                />

                <Input
                  placeholder="Value"
                  value={item.value}
                  onChange={(e) =>
                    handleHighlightChange(i, "value", e.target.value)
                  }
                />
              </div>

              <button
                type="button"
                onClick={() => removeHighlight(i)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addHighlight}
            className="text-sm bg-gray-100 px-3 py-2 rounded hover:bg-gray-200"
          >
            + Add Highlight
          </button>
        </div>

        {/* SUBMIT */}
        {/* <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500"
        >
          Save About Section
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
