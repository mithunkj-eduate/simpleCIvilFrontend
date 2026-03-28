"use client";

import React from "react";
import { useFormik } from "formik";
import { Input } from "@/stories/Input/Input";
import { Label } from "@/stories/Label/Label";
import { SafeImage } from "@/app/utils/SafeImage";
import { convertDriveToImageUrl } from "@/lib/utils";
import { PortfolioProps } from "./MetaForm";
import { GalleryImage } from "@/lib/types";

export default function GalleryForm({
  initialValues,
  handleSave,
}: PortfolioProps) {
  const { gallery } = initialValues;

  const formik = useFormik({
    initialValues: {
      gallery: gallery ??[
        {
          url: "",
          alt: "",
          category: "",
        },
      ],
    },
    onSubmit: (values) => {
      console.log(values);

      const portfolioData = {
        gallery: values,
      };
      if (portfolioData)
        handleSave({
          ...initialValues,
          gallery: portfolioData.gallery as unknown as GalleryImage[],
        });
      // alert("Gallery Saved ✅");
    },
  });

  // ---------- GALLERY ----------
  const addItem = () => {
    formik.setFieldValue("gallery", [
      ...formik.values.gallery,
      { url: "", alt: "", category: "" },
    ]);
  };

  const removeItem = (i) => {
    const arr = [...formik.values.gallery];
    arr.splice(i, 1);
    formik.setFieldValue("gallery", arr);
  };

  const handleChange = (i, field, value) => {
    const arr = [...formik.values.gallery];
    arr[i][field] = value;
    formik.setFieldValue("gallery", arr);
  };

  return (
    <div className="mx-auto max-w-5xl bg-white rounded-2xl shadow p-6 md:p-8 mt-6">
      <h2 className="text-2xl font-bold text-center mb-6">Gallery Section</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {formik.values.gallery.map((item, i) => (
          <div key={i} className="border rounded-2xl p-5 bg-gray-50 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Image {i + 1}</h3>
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>

            {/* IMAGE URL */}
            <div>
              <Label>Image URL</Label>
              <Input
                value={item.url}
                onChange={(e) => handleChange(i, "url", e.target.value)}
              />
            </div>

            {/* ALT + CATEGORY */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Alt Text</Label>
                <Input
                  value={item.alt}
                  onChange={(e) => handleChange(i, "alt", e.target.value)}
                />
              </div>

              <div>
                <Label>Category</Label>
                <Input
                  value={item.category}
                  onChange={(e) => handleChange(i, "category", e.target.value)}
                />
              </div>
            </div>

            {/* PREVIEW */}
            {item.url && convertDriveToImageUrl(item.url) ? (
              <div className="mt-2">
                <SafeImage
                  height={200}
                  width={200}
                  src={convertDriveToImageUrl(item.url) ?? ""}
                  alt={item.alt}
                  className="w-full h-48 object-cover rounded-xl border"
                />
              </div>
            ) : null}
          </div>
        ))}

        {/* ADD IMAGE */}
        <button
          type="button"
          onClick={addItem}
          className="w-full bg-gray-100 py-2 rounded-lg"
        >
          + Add Image
        </button>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500"
        >
          Save Gallery
        </button>
      </form>
    </div>
  );
}
