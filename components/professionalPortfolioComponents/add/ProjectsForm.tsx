"use client";

import React from "react";
import { useFormik } from "formik";
import { Input } from "@/stories/Input/Input";
import { Label } from "@/stories/Label/Label";
import { PortfolioProps } from "./MetaForm";
import { Project } from "@/lib/types";
import { formStepsPortfolio } from "./StepProgress";

export default function ProjectsForm({
  initialValues,
  handleSave,
  step,
  prevStep,
}: PortfolioProps) {
  const { projects } = initialValues;

  const formik = useFormik({
    initialValues: {
      projects: projects ?? [
        {
          id: "p1",
          title: "",
          description: "",
          category: "",
          year: "",
          link: "",
          images: [{ url: "", alt: "" }],
          tags: [""],
        },
      ],
    },
    onSubmit: (values) => {
      console.log(values);

      const portfolioData = {
        projects: values,
      };
      if (portfolioData)
        handleSave({
          ...initialValues,
          projects: portfolioData.projects as unknown as Project[],
        });
      // alert("Projects Saved ✅");
    },
  });

  // ---------- PROJECT ----------
  const addProject = () => {
    formik.setFieldValue("projects", [
      ...formik.values.projects,
      {
        id: Date.now().toString(),
        title: "",
        description: "",
        category: "",
        year: "",
        link: "",
        images: [{ url: "", alt: "" }],
        tags: [""],
      },
    ]);
  };

  const removeProject = (i) => {
    const arr = [...formik.values.projects];
    arr.splice(i, 1);
    formik.setFieldValue("projects", arr);
  };

  const handleProjectChange = (i, field, value) => {
    const arr = [...formik.values.projects];
    arr[i][field] = value;
    formik.setFieldValue("projects", arr);
  };

  // ---------- IMAGES ----------
  const addImage = (i) => {
    const arr = [...formik.values.projects];
    arr[i].images.push({ url: "", alt: "" });
    formik.setFieldValue("projects", arr);
  };

  const removeImage = (i, imgIndex) => {
    const arr = [...formik.values.projects];
    arr[i].images.splice(imgIndex, 1);
    formik.setFieldValue("projects", arr);
  };

  const handleImageChange = (i, imgIndex, field, value) => {
    const arr = [...formik.values.projects];
    arr[i].images[imgIndex][field] = value;
    formik.setFieldValue("projects", arr);
  };

  // ---------- TAGS ----------
  const addTag = (i) => {
    const arr = [...formik.values.projects];
    arr[i].tags.push("");
    formik.setFieldValue("projects", arr);
  };

  const removeTag = (i, ti) => {
    const arr = [...formik.values.projects];
    arr[i].tags.splice(ti, 1);
    formik.setFieldValue("projects", arr);
  };

  const handleTagChange = (i, ti, value) => {
    const arr = [...formik.values.projects];
    arr[i].tags[ti] = value;
    formik.setFieldValue("projects", arr);
  };

  return (
    <div className="mx-auto max-w-5xl bg-white rounded-2xl shadow p-6 md:p-8 mt-6">
      <h2 className="text-2xl font-bold text-center mb-6">Projects Section</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {formik.values.projects.map((project, i) => (
          <div
            key={project.id}
            className="border rounded-2xl p-5 space-y-4 bg-gray-50"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Project {i + 1}</h3>
              <button
                type="button"
                onClick={() => removeProject(i)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>

            {/* BASIC */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={project.title}
                  onChange={(e) =>
                    handleProjectChange(i, "title", e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Category</Label>
                <Input
                  value={project.category}
                  onChange={(e) =>
                    handleProjectChange(i, "category", e.target.value)
                  }
                />
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <textarea
                value={project.description}
                onChange={(e) =>
                  handleProjectChange(i, "description", e.target.value)
                }
                className="w-full border rounded-lg p-3 h-24"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Input
                placeholder="Year"
                value={project.year}
                onChange={(e) => handleProjectChange(i, "year", e.target.value)}
              />
              <Input
                placeholder="Project Link"
                value={project.link}
                onChange={(e) => handleProjectChange(i, "link", e.target.value)}
              />
            </div>

            {/* IMAGES */}
            <div>
              <h4 className="font-medium mb-2">Images</h4>

              {project.images.map((img, imgIndex) => (
                <div key={imgIndex} className="grid md:grid-cols-2 gap-2 mb-2">
                  <Input
                    placeholder="Image URL"
                    value={img.url}
                    onChange={(e) =>
                      handleImageChange(i, imgIndex, "url", e.target.value)
                    }
                  />
                  <div className="flex gap-2">
                    <Input
                      placeholder="Alt Text"
                      value={img.alt}
                      onChange={(e) =>
                        handleImageChange(i, imgIndex, "alt", e.target.value)
                      }
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i, imgIndex)}
                      className="text-red-500"
                    >
                      ❌
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addImage(i)}
                className="text-sm bg-gray-100 px-3 py-1 rounded"
              >
                + Add Image
              </button>
            </div>

            {/* TAGS */}
            <div>
              <h4 className="font-medium mb-2">Tags</h4>

              {project.tags.map((tag, ti) => (
                <div key={ti} className="flex gap-2 mb-2">
                  <Input
                    value={tag}
                    onChange={(e) => handleTagChange(i, ti, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removeTag(i, ti)}
                    className="text-red-500"
                  >
                    ❌
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addTag(i)}
                className="text-sm bg-gray-100 px-3 py-1 rounded"
              >
                + Add Tag
              </button>
            </div>
          </div>
        ))}

        {/* ADD PROJECT */}
        <button
          type="button"
          onClick={addProject}
          className="w-full bg-gray-100 py-2 rounded-lg"
        >
          + Add Project
        </button>

        {/* SUBMIT */}
        {/* <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500"
        >
          Save Projects
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
