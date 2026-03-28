"use client";

import React from "react";
import { useFormik } from "formik";
import { Input } from "@/stories/Input/Input";
import { Label } from "@/stories/Label/Label";
import { PortfolioProps } from "./MetaForm";
import { SocialLink } from "@/lib/types";

export default function SocialLinksForm({
  initialValues,
  handleSave,
}: PortfolioProps) {
  const { socialLinks } = initialValues;

  const formik = useFormik({
    initialValues: socialLinks ?? {
      socialLinks: [
        {
          platform: "",
          url: "",
          icon: "",
        },
      ],
    },
    onSubmit: (values) => {
      console.log(values);

      const portfolioData = {
        socialLinks: values,
      };
      if (portfolioData)
        handleSave({
          ...initialValues,
          socialLinks: portfolioData.socialLinks as unknown as SocialLink[],
        });
      alert("Social Links Saved ✅");
    },
  });

  // ---------- SOCIAL ----------
  const addItem = () => {
    formik.setFieldValue("socialLinks", [
      ...formik.values.socialLinks,
      { platform: "", url: "", icon: "" },
    ]);
  };

  const removeItem = (i) => {
    const arr = [...formik.values.socialLinks];
    arr.splice(i, 1);
    formik.setFieldValue("socialLinks", arr);
  };

  const handleChange = (i, field, value) => {
    const arr = [...formik.values.socialLinks];
    arr[i][field] = value;
    formik.setFieldValue("socialLinks", arr);
  };

  return (
    <div className="mx-auto max-w-4xl bg-white rounded-2xl shadow p-6 md:p-8 mt-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Social Links Section
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {formik.values.socialLinks.map((item, i) => (
          <div key={i} className="border rounded-2xl p-5 bg-gray-50 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Social Link {i + 1}</h3>
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>Platform</Label>
                <Input
                  placeholder="LinkedIn"
                  value={item.platform}
                  onChange={(e) => handleChange(i, "platform", e.target.value)}
                />
              </div>

              <div>
                <Label>URL</Label>
                <Input
                  placeholder="https://..."
                  value={item.url}
                  onChange={(e) => handleChange(i, "url", e.target.value)}
                />
              </div>

              <div>
                <Label>Icon Name</Label>
                <Input
                  placeholder="Linkedin / Twitter / Instagram"
                  value={item.icon}
                  onChange={(e) => handleChange(i, "icon", e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}

        {/* ADD */}
        <button
          type="button"
          onClick={addItem}
          className="w-full bg-gray-100 py-2 rounded-lg"
        >
          + Add Social Link
        </button>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500"
        >
          Save Social Links
        </button>
      </form>
    </div>
  );
}
