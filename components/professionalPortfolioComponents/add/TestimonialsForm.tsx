"use client";

import React from "react";
import { useFormik } from "formik";
import { Input } from "@/stories/Input/Input";
import { Label } from "@/stories/Label/Label";
import { PortfolioProps } from "./MetaForm";
import { Testimonial } from "@/lib/types";

export default function TestimonialsForm({
  initialValues,
  handleSave,
}: PortfolioProps) {
  const { testimonials } = initialValues;

  const formik = useFormik({
    initialValues: testimonials ?? {
      testimonials: [
        {
          id: "t1",
          name: "",
          role: "",
          rating: 5,
          text: "",
          date: "",
        },
      ],
    },
    onSubmit: (values) => {
      console.log(values);

      const portfolioData = {
        testimonials: values,
      };
      if (portfolioData)
        handleSave({
          ...initialValues,
          testimonials: portfolioData.testimonials as unknown as Testimonial[],
        });
      // alert("Testimonials Saved ✅");
    },
  });

  // ---------- TESTIMONIAL ----------
  const addItem = () => {
    formik.setFieldValue("testimonials", [
      ...formik.values.testimonials,
      {
        id: Date.now().toString(),
        name: "",
        role: "",
        rating: 5,
        text: "",
        date: "",
      },
    ]);
  };

  const removeItem = (i) => {
    const arr = [...formik.values.testimonials];
    arr.splice(i, 1);
    formik.setFieldValue("testimonials", arr);
  };

  const handleChange = (i, field, value) => {
    const arr = [...formik.values.testimonials];
    arr[i][field] = value;
    formik.setFieldValue("testimonials", arr);
  };

  // ---------- STAR UI ----------
  const StarRating = ({ value, onChange }) => {
    return (
      <div className="flex gap-1 text-xl">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => onChange(star)}
            className={`cursor-pointer ${
              star <= value ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-5xl bg-white rounded-2xl shadow p-6 md:p-8 mt-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Testimonials Section
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {formik.values.testimonials.map((item, i) => (
          <div
            key={item.id}
            className="border rounded-2xl p-5 bg-gray-50 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Testimonial {i + 1}</h3>
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>

            {/* NAME + ROLE */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={item.name}
                  onChange={(e) => handleChange(i, "name", e.target.value)}
                />
              </div>

              <div>
                <Label>Role</Label>
                <Input
                  value={item.role}
                  onChange={(e) => handleChange(i, "role", e.target.value)}
                />
              </div>
            </div>

            {/* TEXT */}
            <div>
              <Label>Review</Label>
              <textarea
                value={item.text}
                onChange={(e) => handleChange(i, "text", e.target.value)}
                className="w-full border rounded-lg p-3 h-24"
              />
            </div>

            {/* RATING + DATE */}
            <div className="grid md:grid-cols-2 gap-4 items-center">
              <div>
                <Label>Rating</Label>
                <StarRating
                  value={item.rating}
                  onChange={(val) => handleChange(i, "rating", val)}
                />
              </div>

              <div>
                <Label>Date</Label>
                <Input
                  value={item.date}
                  onChange={(e) => handleChange(i, "date", e.target.value)}
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
          + Add Testimonial
        </button>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500"
        >
          Save Testimonials
        </button>
      </form>
    </div>
  );
}
