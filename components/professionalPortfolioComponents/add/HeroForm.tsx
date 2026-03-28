"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/stories/Input/Input";
import { Label } from "@/stories/Label/Label";
import { PortfolioProps } from "./MetaForm";
import { HeroSection } from "@/lib/types";

const heroSchema = Yup.object({
  heading: Yup.string().required("Heading required"),
  subheading: Yup.string().required("Subheading required"),
  image: Yup.string().url().required("Image required"),
});

export default function HeroForm({
  initialValues,
  handleSave,
}: PortfolioProps) {
  const { hero } = initialValues;

  const formik = useFormik({
    initialValues: hero,
    //  {
    //   heading: "",
    //   subheading: "",
    //   image: "",
    //   carousel: [""],
    //   cta: [{ label: "", href: "", variant: "primary", icon: "" }],
    //   stats: [{ label: "", value: "" }],
    // },
    validationSchema: heroSchema,
    onSubmit: (values) => {
      console.log(values);
      const portfolioData = {
        hero: values,
      };
      if (portfolioData)
        handleSave({
          ...initialValues,
          hero: portfolioData.hero as unknown as HeroSection,
        });
      // alert("Hero Saved ✅");
    },
  });

  // helpers
  const addItem = (key, item) => {
    formik.setFieldValue(key, [...formik.values[key], item]);
  };

  const removeItem = (key, index) => {
    const arr = [...formik.values[key]];
    arr.splice(index, 1);
    formik.setFieldValue(key, arr);
  };

  const handleArrayChange = (key, index, field, value) => {
    const arr = [...formik.values[key]];
    if (typeof arr[index] === "string") {
      arr[index] = value;
    } else {
      arr[index][field] = value;
    }
    formik.setFieldValue(key, arr);
  };

  return (
    <div className="mx-auto max-w-4xl bg-white rounded-2xl shadow p-6 md:p-8 mt-6">
      <h2 className="text-2xl font-bold text-center mb-6">Hero Section</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* BASIC */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label>Heading</Label>
            <Input
              name="heading"
              value={formik.values.heading}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.heading && formik.errors.heading && (
              <p className="text-red-500 text-sm">{formik.errors.heading}</p>
            )}
          </div>

          <div>
            <Label>Hero Image</Label>
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
          <Label>Subheading</Label>
          <textarea
            name="subheading"
            value={formik.values.subheading}
            onChange={formik.handleChange}
            className="w-full border rounded-lg p-3 h-24"
          />
        </div>

        {/* CAROUSEL */}
        <div>
          <h3 className="font-semibold mb-3">Carousel Images</h3>

          {formik.values.carousel.map((item, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <Input
                value={item}
                placeholder="https://"
                onChange={(e) =>
                  handleArrayChange("carousel", i, null, e.target.value)
                }
              />
              <button
                type="button"
                onClick={() => removeItem("carousel", i)}
                className="text-red-500"
              >
                ❌
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => addItem("carousel", "")}
            className="text-sm bg-gray-100 px-3 py-1 rounded"
          >
            + Add Image
          </button>
        </div>

        {/* CTA */}
        <div>
          <h3 className="font-semibold mb-3">CTA Buttons</h3>

          {formik.values.cta.map((item, i) => (
            <div key={i} className="border p-4 rounded-xl mb-3 space-y-2">
              <Input
                placeholder="Label"
                value={item.label}
                onChange={(e) =>
                  handleArrayChange("cta", i, "label", e.target.value)
                }
              />
              <Input
                placeholder="Link"
                value={item.href}
                onChange={(e) =>
                  handleArrayChange("cta", i, "href", e.target.value)
                }
              />

              <select
                value={item.variant}
                onChange={(e) =>
                  handleArrayChange("cta", i, "variant", e.target.value)
                }
                className="w-full border p-2 rounded"
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
              </select>

              <button
                type="button"
                onClick={() => removeItem("cta", i)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              addItem("cta", {
                label: "",
                href: "",
                variant: "primary",
                icon: "",
              })
            }
            className="text-sm bg-gray-100 px-3 py-1 rounded"
          >
            + Add CTA
          </button>
        </div>

        {/* STATS */}
        <div>
          <h3 className="font-semibold mb-3">Stats</h3>

          {formik.values.stats.map((item, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <Input
                placeholder="Label"
                value={item.label}
                onChange={(e) =>
                  handleArrayChange("stats", i, "label", e.target.value)
                }
              />
              <Input
                placeholder="Value"
                value={item.value}
                onChange={(e) =>
                  handleArrayChange("stats", i, "value", e.target.value)
                }
              />

              <button
                type="button"
                onClick={() => removeItem("stats", i)}
                className="text-red-500"
              >
                ❌
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => addItem("stats", { label: "", value: "" })}
            className="text-sm bg-gray-100 px-3 py-1 rounded"
          >
            + Add Stat
          </button>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500"
        >
          Save Hero
        </button>
      </form>
    </div>
  );
}
