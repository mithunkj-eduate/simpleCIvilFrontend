"use client";

import React from "react";
import { useFormik } from "formik";
import { Input } from "@/stories/Input/Input";
import { Label } from "@/stories/Label/Label";
import { PortfolioProps } from "./MetaForm";
import { Certification } from "@/lib/types";

export default function CertificationsForm({
  initialValues,
  handleSave,
}: PortfolioProps) {
  const { certifications } = initialValues;

  const formik = useFormik({
    initialValues:  {
      certifications: certifications ??[
        {
          title: "",
          issuer: "",
          year: "",
        },
      ],
    },
    onSubmit: (values) => {
      console.log(values);

      const portfolioData = {
        certifications: values,
      };
      if (portfolioData)
        handleSave({
          ...initialValues,
          certifications:
            portfolioData.certifications as unknown as Certification[],
        });
      // alert("Certifications Saved ✅");
    },
  });

  // ---------- CERTIFICATIONS ----------
  const addCertification = () => {
    formik.setFieldValue("certifications", [
      ...formik.values.certifications,
      { title: "", issuer: "", year: "" },
    ]);
  };

  const removeCertification = (i) => {
    const arr = [...formik.values.certifications];
    arr.splice(i, 1);
    formik.setFieldValue("certifications", arr);
  };

  const handleChange = (i, field, value) => {
    const arr = [...formik.values.certifications];
    arr[i][field] = value;
    formik.setFieldValue("certifications", arr);
  };

  return (
    <div className="mx-auto max-w-4xl bg-white rounded-2xl shadow p-6 md:p-8 mt-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Certifications Section
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {formik.values.certifications.map((cert, i) => (
          <div key={i} className="border rounded-2xl p-5 bg-gray-50 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Certification {i + 1}</h3>
              <button
                type="button"
                onClick={() => removeCertification(i)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={cert.title}
                  onChange={(e) => handleChange(i, "title", e.target.value)}
                />
              </div>

              <div>
                <Label>Issuer</Label>
                <Input
                  value={cert.issuer}
                  onChange={(e) => handleChange(i, "issuer", e.target.value)}
                />
              </div>

              <div>
                <Label>Year</Label>
                <Input
                  value={cert.year}
                  onChange={(e) => handleChange(i, "year", e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}

        {/* ADD CERTIFICATION */}
        <button
          type="button"
          onClick={addCertification}
          className="w-full bg-gray-100 py-2 rounded-lg"
        >
          + Add Certification
        </button>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500"
        >
          Save Certifications
        </button>
      </form>
    </div>
  );
}
