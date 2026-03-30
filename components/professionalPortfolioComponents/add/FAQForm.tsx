"use client";

import React from "react";
import { useFormik } from "formik";
import { Input } from "@/stories/Input/Input";
import { Label } from "@/stories/Label/Label";
import { PortfolioProps } from "./MetaForm";
import { FAQ } from "@/lib/types";
import { formStepsPortfolio } from "./StepProgress";

export default function FAQForm({
  initialValues,
  handleSave,
  step,
  prevStep,
}: PortfolioProps) {
  const { faq } = initialValues;

  const formik = useFormik({
    initialValues: {
      faq: faq ?? [
        {
          question: "",
          answer: "",
        },
      ],
    },
    onSubmit: (values) => {
      console.log(values);

      const portfolioData = {
        faq: values,
      };
      if (portfolioData)
        handleSave({
          ...initialValues,
          faq: portfolioData.faq as unknown as FAQ[],
        });
      // alert("FAQ Saved ✅");
    },
  });

  // ---------- FAQ ----------
  const addItem = () => {
    formik.setFieldValue("faq", [
      ...formik.values.faq,
      { question: "", answer: "" },
    ]);
  };

  const removeItem = (i) => {
    const arr = [...formik.values.faq];
    arr.splice(i, 1);
    formik.setFieldValue("faq", arr);
  };

  const handleChange = (i, field, value) => {
    const arr = [...formik.values.faq];
    arr[i][field] = value;
    formik.setFieldValue("faq", arr);
  };

  return (
    <div className="mx-auto max-w-4xl bg-white rounded-2xl shadow p-6 md:p-8 mt-6">
      <h2 className="text-2xl font-bold text-center mb-6">FAQ Section</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {formik.values.faq.map((item, i) => (
          <div key={i} className="border rounded-2xl p-5 bg-gray-50 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">FAQ {i + 1}</h3>
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>

            {/* QUESTION */}
            <div>
              <Label>Question</Label>
              <Input
                value={item.question}
                onChange={(e) => handleChange(i, "question", e.target.value)}
              />
            </div>

            {/* ANSWER */}
            <div>
              <Label>Answer</Label>
              <textarea
                value={item.answer}
                onChange={(e) => handleChange(i, "answer", e.target.value)}
                className="w-full border rounded-lg p-3 h-28"
              />
            </div>
          </div>
        ))}

        {/* ADD FAQ */}
        <button
          type="button"
          onClick={addItem}
          className="w-full bg-gray-100 py-2 rounded-lg"
        >
          + Add FAQ
        </button>

        {/* SUBMIT */}
        {/* <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500"
        >
          Save FAQ
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
