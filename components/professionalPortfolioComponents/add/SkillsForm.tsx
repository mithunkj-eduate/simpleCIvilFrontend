"use client";

import React from "react";
import { useFormik } from "formik";
import { Input } from "@/stories/Input/Input";
import { Label } from "@/stories/Label/Label";

export default function SkillsForm() {
  const formik = useFormik({
    initialValues: {
      skills: [
        {
          name: "",
          level: 50,
          category: "",
        },
      ],
    },
    onSubmit: (values) => {
      console.log(values);
      alert("Skills Saved ✅");
    },
  });

  // ---------- SKILLS ----------
  const addSkill = () => {
    formik.setFieldValue("skills", [
      ...formik.values.skills,
      { name: "", level: 50, category: "" },
    ]);
  };

  const removeSkill = (i) => {
    const arr = [...formik.values.skills];
    arr.splice(i, 1);
    formik.setFieldValue("skills", arr);
  };

  const handleChange = (i, field, value) => {
    const arr = [...formik.values.skills];
    arr[i][field] = value;
    formik.setFieldValue("skills", arr);
  };

  return (
    <div className="mx-auto max-w-4xl bg-white rounded-2xl shadow p-6 md:p-8 mt-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Skills Section
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">

        {formik.values.skills.map((skill, i) => (
          <div
            key={i}
            className="border rounded-2xl p-5 bg-gray-50 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">
                Skill {i + 1}
              </h3>
              <button
                type="button"
                onClick={() => removeSkill(i)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>

            {/* NAME + CATEGORY */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Skill Name</Label>
                <Input
                  value={skill.name}
                  onChange={(e) =>
                    handleChange(i, "name", e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Category</Label>
                <Input
                  value={skill.category}
                  onChange={(e) =>
                    handleChange(i, "category", e.target.value)
                  }
                />
              </div>
            </div>

            {/* LEVEL */}
            <div>
              <Label>Skill Level ({skill.level}%)</Label>
              <input
                type="range"
                min="0"
                max="100"
                value={skill.level}
                onChange={(e) =>
                  handleChange(i, "level", Number(e.target.value))
                }
                className="w-full"
              />

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                <div
                  className="bg-indigo-600 h-3 rounded-full transition-all"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          </div>
        ))}

        {/* ADD SKILL */}
        <button
          type="button"
          onClick={addSkill}
          className="w-full bg-gray-100 py-2 rounded-lg"
        >
          + Add Skill
        </button>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500"
        >
          Save Skills
        </button>
      </form>
    </div>
  );
}