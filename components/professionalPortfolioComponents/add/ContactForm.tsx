"use client";

import React from "react";
import { useFormik } from "formik";
import { Input } from "@/stories/Input/Input";
import { Label } from "@/stories/Label/Label";
import { PortfolioProps } from "./MetaForm";
import { ContactSection } from "@/lib/types";

export default function ContactForm({
  initialValues,
  handleSave,
}: PortfolioProps) {
  const { contact } = initialValues;

  const formik = useFormik({
    initialValues:  {
      contact: contact ??{
        email: "",
        phone: "",
        whatsapp: "",
        address: "",
        map: {
          lat: "",
          lng: "",
          zoom: 15,
        },
        workingHours: [{ day: "", hours: "", closed: false }],
      },
    },
    onSubmit: (values) => {
      console.log(values);

      const portfolioData = {
        contact: values,
      };
      if (portfolioData)
        handleSave({
          ...initialValues,
          contact: portfolioData.contact as unknown as ContactSection,
        });
      // alert("Contact Saved ✅");
    },
  });

  // ---------- WORKING HOURS ----------
  const addWorkingHour = () => {
    const arr = [...formik.values.contact.workingHours];
    arr.push({ day: "", hours: "", closed: false });
    formik.setFieldValue("contact.workingHours", arr);
  };

  const removeWorkingHour = (i) => {
    const arr = [...formik.values.contact.workingHours];
    arr.splice(i, 1);
    formik.setFieldValue("contact.workingHours", arr);
  };

  const handleWorkingChange = (i, field, value) => {
    const arr = [...formik.values.contact.workingHours];
    arr[i][field] = value;
    formik.setFieldValue("contact.workingHours", arr);
  };

  return (
    <div className="mx-auto max-w-5xl bg-white rounded-2xl shadow p-6 md:p-8 mt-6">
      <h2 className="text-2xl font-bold text-center mb-6">Contact Section</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* BASIC INFO */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Email</Label>
            <Input
              value={formik.values.contact.email}
              onChange={(e) =>
                formik.setFieldValue("contact.email", e.target.value)
              }
            />
          </div>

          <div>
            <Label>Phone</Label>
            <Input
              value={formik.values.contact.phone}
              onChange={(e) =>
                formik.setFieldValue("contact.phone", e.target.value)
              }
            />
          </div>

          <div>
            <Label>WhatsApp</Label>
            <Input
              value={formik.values.contact.whatsapp}
              onChange={(e) =>
                formik.setFieldValue("contact.whatsapp", e.target.value)
              }
            />
          </div>

          <div>
            <Label>Address</Label>
            <Input
              value={formik.values.contact.address}
              onChange={(e) =>
                formik.setFieldValue("contact.address", e.target.value)
              }
            />
          </div>
        </div>

        {/* MAP */}
        <div>
          <h3 className="font-semibold mb-2">Map Location</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Input
              placeholder="Latitude"
              value={formik.values.contact.map.lat}
              onChange={(e) =>
                formik.setFieldValue("contact.map.lat", e.target.value)
              }
            />
            <Input
              placeholder="Longitude"
              value={formik.values.contact.map.lng}
              onChange={(e) =>
                formik.setFieldValue("contact.map.lng", e.target.value)
              }
            />
            <Input
              placeholder="Zoom"
              value={formik.values.contact.map.zoom}
              onChange={(e) =>
                formik.setFieldValue("contact.map.zoom", e.target.value)
              }
            />
          </div>
        </div>

        {/* WORKING HOURS */}
        <div>
          <h3 className="font-semibold mb-2">Working Hours</h3>

          {formik.values.contact.workingHours.map((item, i) => (
            <div
              key={i}
              className="grid md:grid-cols-3 gap-3 mb-3 items-center"
            >
              <Input
                placeholder="Day"
                value={item.day}
                onChange={(e) => handleWorkingChange(i, "day", e.target.value)}
              />
              <Input
                placeholder="Hours"
                value={item.hours}
                onChange={(e) =>
                  handleWorkingChange(i, "hours", e.target.value)
                }
              />

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={item.closed}
                    onChange={(e) =>
                      handleWorkingChange(i, "closed", e.target.checked)
                    }
                  />
                  Closed
                </label>

                <button
                  type="button"
                  onClick={() => removeWorkingHour(i)}
                  className="text-red-500"
                >
                  ❌
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addWorkingHour}
            className="bg-gray-100 px-3 py-1 rounded text-sm"
          >
            + Add Day
          </button>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500"
        >
          Save Contact
        </button>
      </form>
    </div>
  );
}
