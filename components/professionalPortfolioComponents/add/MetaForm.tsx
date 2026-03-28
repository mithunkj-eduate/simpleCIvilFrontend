"use client";

import React from "react";
import { useFormik } from "formik";
import { Input } from "@/stories/Input/Input";
import { Label } from "@/stories/Label/Label";

export default function MetaForm() {
  const formik = useFormik({
    initialValues: {
      meta: {
        slug: "",
        profession: "",
        name: "",
        tagline: "",
        description: "",
        accentColor: "#0ea5e9",
        seo: {
          title: "",
          description: "",
          keywords: [""],
        },
      },
    },
    onSubmit: (values) => {
      console.log(values);
      alert("Meta Saved ✅");
    },
  });

  // ---------- KEYWORDS ----------
  const addKeyword = () => {
    const arr = [...formik.values.meta.seo.keywords];
    arr.push("");
    formik.setFieldValue("meta.seo.keywords", arr);
  };

  const removeKeyword = (i) => {
    const arr = [...formik.values.meta.seo.keywords];
    arr.splice(i, 1);
    formik.setFieldValue("meta.seo.keywords", arr);
  };

  const handleKeywordChange = (i, value) => {
    const arr = [...formik.values.meta.seo.keywords];
    arr[i] = value;
    formik.setFieldValue("meta.seo.keywords", arr);
  };

  return (
    <div className="mx-auto max-w-5xl bg-white rounded-2xl shadow p-6 md:p-8 mt-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Meta / SEO Section
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">

        {/* BASIC INFO */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Slug (URL)</Label>
            <Input
              placeholder="dr-priya-sharma"
              value={formik.values.meta.slug}
              onChange={(e) =>
                formik.setFieldValue("meta.slug", e.target.value)
              }
            />
          </div>

          <div>
            <Label>Profession</Label>
            <Input
              placeholder="Doctor"
              value={formik.values.meta.profession}
              onChange={(e) =>
                formik.setFieldValue("meta.profession", e.target.value)
              }
            />
          </div>

          <div>
            <Label>Name</Label>
            <Input
              placeholder="Dr. Priya Sharma"
              value={formik.values.meta.name}
              onChange={(e) =>
                formik.setFieldValue("meta.name", e.target.value)
              }
            />
          </div>

          <div>
            <Label>Tagline</Label>
            <Input
              placeholder="Specialist in Cardiology"
              value={formik.values.meta.tagline}
              onChange={(e) =>
                formik.setFieldValue("meta.tagline", e.target.value)
              }
            />
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <Label>Description</Label>
          <textarea
            className="w-full border rounded-lg p-3"
            rows={4}
            value={formik.values.meta.description}
            onChange={(e) =>
              formik.setFieldValue("meta.description", e.target.value)
            }
          />
        </div>

        {/* ACCENT COLOR */}
        <div>
          <Label>Accent Color</Label>
          <input
            type="color"
            value={formik.values.meta.accentColor}
            onChange={(e) =>
              formik.setFieldValue("meta.accentColor", e.target.value)
            }
            className="w-20 h-10 border rounded"
          />
        </div>

        {/* SEO */}
        <div>
          <h3 className="font-semibold mb-2">SEO Settings</h3>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label>SEO Title</Label>
              <Input
                value={formik.values.meta.seo.title}
                onChange={(e) =>
                  formik.setFieldValue("meta.seo.title", e.target.value)
                }
              />
            </div>

            <div>
              <Label>SEO Description</Label>
              <Input
                value={formik.values.meta.seo.description}
                onChange={(e) =>
                  formik.setFieldValue(
                    "meta.seo.description",
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          {/* KEYWORDS */}
          <div>
            <Label>Keywords</Label>

            {formik.values.meta.seo.keywords.map((k, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <Input
                  value={k}
                  onChange={(e) =>
                    handleKeywordChange(i, e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => removeKeyword(i)}
                  className="text-red-500"
                >
                  ❌
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addKeyword}
              className="bg-gray-100 px-3 py-1 rounded text-sm"
            >
              + Add Keyword
            </button>
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500"
        >
          Save Meta
        </button>
      </form>
    </div>
  );
}