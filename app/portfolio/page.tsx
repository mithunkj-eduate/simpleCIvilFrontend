"use client";

import { useContext, useEffect, useState } from "react";

export const defaultPortfolio = {
  hero: {
    name: "Mithun",
    highlight: "K J",
    subtitle: "Full Stack Developer · MERN · Golang · GraphQL",
    desc: `Building scalable, production-ready web applications with 3.5 years of experience.`,
    image: "/heroimage2.png",
    stats: [
      { value: "3.5+", label: "Years Experience" },
      { value: "10+", label: "Projects Shipped" },
      { value: "2", label: "Companies" },
    ],
  },

  projects: [
    {
      title: "Multi-Vendor Marketplace",
      desc: "Scalable platform...",
      link: "https://apisr.shareurinterest.com/",
      tech: ["React", "Node", "MongoDB"],
      image: "https://drive.google.com/file/d/",
    },
    {
      title: "ShareMyInterest",
      desc: "Instagram clone...",
      link: "https://snap.shareurinterest.com/",
      tech: ["React", "Node"],
      image: "https://drive.google.com/file/d/",
    },
  ],
  about: {
    desc: [
      "I'm a Full Stack Developer with 3.5+ years of experience building scalable web applications.",
      "I specialize in MERN stack, Golang, and GraphQL, focusing on performance and clean architecture.",
    ],
    info: [
      { label: "Location", value: "Bengaluru, India" },
      { label: "Phone", value: "+91 6361849001" },
      { label: "Email", value: "mithunkj1996@gmail.com" },
    ],
    experience: [
      {
        company: "Eduate Pvt Ltd",
        role: "Full Stack Developer",
        period: "Nov 2024 - Present",
        tech: ["React.js", "Golang", "GraphQL"],
      },
      {
        company: "Vanilla Networks",
        role: "MERN Stack Developer",
        period: "2022 - 2024",
        tech: ["React", "Node", "MongoDB"],
      },
    ],
  },

  skills: [
    {
      title: "Frontend",
      items: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      title: "Backend",
      items: ["Node.js", "Express.js", "Golang", "GraphQL"],
    },
    {
      title: "Database",
      items: ["MongoDB", "PostgreSQL", "Firebase"],
    },
    {
      title: "Tools",
      items: ["Git", "Docker", "AWS", "Vercel"],
    },
  ],

  contact: {
    title: "Let's Work Together",
    desc: "Have a project or opportunity? Let's connect and build something amazing.",
    email: "mithunkj1996@gmail.com",
    phone: "+91 6361849001",
    social: [
      { name: "GitHub", link: "https://github.com/" },
      { name: "LinkedIn", link: "https://linkedin.com/" },
    ],
  },

  footer: {
    text: "© 2026 Mithun K J. All rights reserved.",
    links: [
      { name: "GitHub", link: "https://github.com/" },
      { name: "LinkedIn", link: "https://linkedin.com/" },
    ],
  },
};

import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import MessageModal from "@/customComponents/MessageModal";
import { ApiErrorResponse, msgType } from "@/utils/commenTypes";
import { emptyMessage } from "@/utils/constants";
import { LicenseTypes, Operation } from "@/utils/enum.types";
import Loading from "@/components/helpers/Loading";
import { AxiosError } from "axios";
import { Button } from "@/stories/Button/Button";
import Navbar from "@/components/commen/Navbar";
import { goggleDriveImageError } from "@/commenType/commenTypes";

const PortfolioForm = () => {
  const [portfolio, setPortfolio] = useState(defaultPortfolio);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<msgType>(emptyMessage);
  const [open, setOpen] = useState(false);

  const { TOKEN } = Api();
  const { state } = useContext(AppContext);

  useEffect(() => {
    if (state.user) {
      if (!TOKEN || !state.user) return;

      const getStore = async () => {
        try {
          const res = await api.get(`/portfolio`, {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              "Content-Type": "application/json",
            },
          });

          if (res.data) {
            setPortfolio(res.data.data);
          }
        } catch (error) {
          console.log(error);

          const axiosError = error as AxiosError<ApiErrorResponse>;

          if (axiosError.response) {
            setMessage({
              flag: true,
              message: axiosError.response.data.message,
              operation: Operation.NONE,
            });
          } else {
            setMessage({
              flag: true,
              message: "An unexpected error occurred",
              operation: Operation.NONE,
            });
          }
        } finally {
          setLoading(false);
        }
      };
      getStore();
    }
  }, [TOKEN, state.user]);

  // Handle change for simple fields
  const handleChange = (section: string, field: string, value: any) => {
    setPortfolio((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // // Handle array of objects
  // const handleArrayChange = (
  //   section: string,
  //   index: number,
  //   field: string,
  //   value: any,
  // ) => {
  //   const newArr = [...portfolio[section]];
  //   newArr[index][field] = value;
  //   setPortfolio((prev) => ({ ...prev, [section]: newArr }));
  // };

  // Add a new hero stat
  // addArrayItem("hero.stats", { value: "", label: "" });

  // Add a new project
  // addArrayItem("projects", { title: "", desc: "", link: "", tech: [], bg: "" });

  // Add a new experience
  // addArrayItem("about.experience", { company: "", role: "", period: "", tech: [] });

  // Helper: get nested object value
  const getNested = (obj: any, path: string) => {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  };

  // Helper: set nested object value
  const setNested = (obj: any, path: string, value: any) => {
    const keys = path.split(".");
    const lastKey = keys.pop()!;
    let temp = obj;
    keys.forEach((key) => {
      if (!temp[key]) temp[key] = {};
      temp = temp[key];
    });
    temp[lastKey] = value;
  };

  // Add new array item
  const addArrayItem = (sectionPath: string, item: any) => {
    console.log(sectionPath, item, "sectionPath");
    setPortfolio((prev) => {
      const updated = { ...prev };
      const arr = getNested(updated, sectionPath) || [];
      setNested(updated, sectionPath, [...arr, item]);
      return updated;
    });
  };

  // // Add new array item
  // const addArrayItem = (section: string, item: any) => {
  //   console.log(section, "prev", portfolio);

  //   setPortfolio((prev) => ({
  //     ...prev,
  //     [section]: [...prev[section], item],
  //   }));
  // };

  // // Get nested value from string path
  // const getNested = (obj: any, path: string) => {
  //   return path.split(".").reduce((acc, key) => acc?.[key], obj);
  // };

  // // Set nested value
  // const setNested = (obj: any, path: string, value: any) => {
  //   const keys = path.split(".");
  //   const lastKey = keys.pop()!;
  //   let temp = obj;
  //   keys.forEach((key) => {
  //     if (!temp[key]) temp[key] = {};
  //     temp = temp[key];
  //   });
  //   temp[lastKey] = value;
  // };

  const removeArrayItem = (sectionPath: string, index: number) => {
    const arr = getNested(portfolio, sectionPath);
    if (!Array.isArray(arr)) return; // safety
    const newArr = [...arr];
    newArr.splice(index, 1);

    setPortfolio((prev) => {
      const updated = { ...prev };
      setNested(updated, sectionPath, newArr);
      return updated;
    });
  };

  const handleArrayChange = (
    sectionPath: string,
    index: number,
    field: string,
    value: any,
  ) => {
    const arr = getNested(portfolio, sectionPath);
    if (!Array.isArray(arr)) return;

    const newArr = [...arr];
    if (field)
      newArr[index][field] = value; // for objects
    else newArr[index] = value; // for string arrays like about.desc

    setPortfolio((prev) => {
      const updated = { ...prev };
      setNested(updated, sectionPath, newArr);
      return updated;
    });
  };

  // // Remove array item
  // const removeArrayItem = (section: string, index: number) => {
  //   console.log(section, "section", portfolio, portfolio[section]);
  //   const newArr = [...portfolio[section]];
  //   newArr.splice(index, 1);
  //   setPortfolio((prev) => ({ ...prev, [section]: newArr }));
  // };

  function convertDriveToImageUrl(driveUrl: string) {
    // Extract file ID using regex
    const match = driveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);

    if (!match) {
      console.error("Invalid Google Drive URL");
      return goggleDriveImageError.InvalidImage;
    }

    // const fileId = match[1];

    // Return thumbnail URL (best for <img>)
    return driveUrl;
  }

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!TOKEN || !state.user) return;
      const image = portfolio.hero.image
        ? convertDriveToImageUrl(portfolio.hero.image)
        : "";

      if (image === goggleDriveImageError.InvalidImage) {
        setMessage({
          flag: true,
          message: "Invalid Google Drive URL",
          operation: Operation.NONE,
        });
        return;
      }

      portfolio.hero.image = image;

      try {
        const res = await api.put(`/portfolio`, portfolio, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        if (res.data) {
          setPortfolio(res.data.data);

          setMessage({
            flag: true,
            message: "Portfolio updated successfully!",
            operation: Operation.UPDATE,
          });
        }
      } catch (error) {
        console.log(error);

        const axiosError = error as AxiosError<ApiErrorResponse>;

        if (axiosError.response) {
          setMessage({
            flag: true,
            message: axiosError.response.data.message,
            operation: Operation.NONE,
          });
        } else {
          setMessage({
            flag: true,
            message: "An unexpected error occurred",
            operation: Operation.NONE,
          });
        }
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.log("Update error:", error);
    }
  };

  if (loading) return <Loading />;

  const handleOpen = () => {
    setOpen(true);

    // auto close after 2 seconds
    setTimeout(() => {
      setOpen(false);
    }, 10000);
  };

  return (
    <>
      <Navbar NavType={LicenseTypes.USER} />
      {state.user && open && <PortfolioLink id={state.user?.id} />}
      <div className="max-w-5xl mx-auto p-4 space-y-8">
        <div className="flex gap-3">
          <h1 className="text-3xl font-bold text-center flex-start">
            Update Portfolio{" "}
          </h1>
          <button
            onClick={handleOpen}
            className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 flex-end"
          >
            Preview
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* HERO SECTION */}
          <section className="border p-4 rounded-lg space-y-4">
            <h2 className="text-2xl font-semibold">Hero Section</h2>
            {["name", "highlight", "subtitle", "desc", "image"].map((field) => (
              <div key={field}>
                <label className="block font-medium mb-1">{field} {field === "image" ? "(google drive image link only)" : ""}</label>
                <input
                  type="text"
                  value={portfolio.hero[field] || ""}
                  onChange={(e) => handleChange("hero", field, e.target.value)}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            ))}

            {/* Hero Stats */}
            <div>
              <label className="block font-medium mb-2">Stats</label>
              {portfolio.hero.stats.map((stat, i) => (
                <div key={i} className="flex gap-2 mb-2 flex-col sm:flex-row">
                  <input
                    type="text"
                    placeholder="Value"
                    value={stat.value}
                    onChange={(e) =>
                      handleArrayChange(
                        "hero.stats",
                        i,
                        "value",
                        e.target.value,
                      )
                    }
                    className="flex-1 border rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Label"
                    value={stat.label}
                    onChange={(e) =>
                      handleArrayChange(
                        "hero.stats",
                        i,
                        "label",
                        e.target.value,
                      )
                    }
                    className="flex-1 border rounded px-3 py-2"
                  />
                  <Button
                    mode="delete"
                    type="button"
                    onClick={() => removeArrayItem("hero.stats", i)}
                    // className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </Button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addArrayItem("hero.stats", { value: "", label: "" })
                }
                className="bg-cyan-500 text-white px-3 py-1 rounded hover:bg-cyan-600"
              >
                Add Stat
              </button>
            </div>
          </section>

          {/* PROJECTS */}
          <section className="border p-4 rounded-lg space-y-4">
            <h2 className="text-2xl font-semibold">Projects</h2>
            {portfolio.projects.map((proj, i) => (
              <div
                key={i}
                className="border p-3 rounded-lg flex flex-col gap-2"
              >:
                {["title", "desc", "link", "image"].map((field) => (
                  <input
                    key={field}
                    type="text"
                    placeholder={field}
                    value={proj[field] || ""}
                    onChange={(e) =>
                      handleArrayChange("projects", i, field, e.target.value)
                    }
                    className="w-full border rounded px-3 py-2"
                  />
                ))}
                <input
                  type="text"
                  placeholder="Tech (comma separated)"
                  value={proj.tech.join(", ")}
                  onChange={(e) =>
                    handleArrayChange(
                      "projects",
                      i,
                      "tech",
                      e.target.value.split(","),
                    )
                  }
                  className="w-full border rounded px-3 py-2"
                />
                <Button
                  mode="delete"
                  type="button"
                  onClick={() => removeArrayItem("projects", i)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete Project
                </Button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                addArrayItem("projects", {
                  title: "",
                  desc: "",
                  link: "",
                  tech: [],
                  image: "",
                })
              }
              className="bg-cyan-500 text-white px-3 py-1 rounded hover:bg-cyan-600"
            >
              Add Project
            </button>
          </section>

          {/* ABOUT */}
          <section className="border p-4 rounded-lg space-y-4">
            <h2 className="text-2xl font-semibold">About</h2>

            {/* About Desc */}
            <div>
              <label className="block font-medium mb-2">Description</label>
              {portfolio.about.desc.map((d, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={d}
                    onChange={(e) =>
                      handleArrayChange("about.desc", i, "", e.target.value)
                    }
                    className="flex-1 border rounded px-3 py-2"
                  />
                  <Button
                    mode="delete"
                    type="button"
                    onClick={() => removeArrayItem("about.desc", i)}
                    className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </Button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem("about.desc", "")}
                className="bg-cyan-500 text-white px-3 py-1 rounded hover:bg-cyan-600"
              >
                Add Description
              </button>
            </div>

            {/* Info */}
            <div>
              <label className="block font-medium mb-2">Info</label>
              {portfolio.about.info.map((info, i) => (
                <div key={i} className="flex gap-2 mb-2 flex-col sm:flex-row">
                  <input
                    type="text"
                    placeholder="Label"
                    value={info.label}
                    onChange={(e) =>
                      handleArrayChange(
                        "about.info",
                        i,
                        "label",
                        e.target.value,
                      )
                    }
                    className="flex-1 border rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    value={info.value}
                    onChange={(e) =>
                      handleArrayChange(
                        "about.info",
                        i,
                        "value",
                        e.target.value,
                      )
                    }
                    className="flex-1 border rounded px-3 py-2"
                  />
                  <Button
                    mode="delete"
                    type="button"
                    onClick={() => removeArrayItem("about.info", i)}
                    className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </Button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addArrayItem("about.info", { label: "", value: "" })
                }
                className="bg-cyan-500 text-white px-3 py-1 rounded hover:bg-cyan-600"
              >
                Add Info
              </button>
            </div>

            {/* Experience */}
            <div>
              <label className="block font-medium mb-2">Experience</label>
              {portfolio.about.experience.map((exp, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-2 mb-2 border p-2 rounded"
                >
                  {["company", "role", "period"].map((field) => (
                    <input
                      key={field}
                      type="text"
                      placeholder={field}
                      value={exp[field]}
                      onChange={(e) =>
                        handleArrayChange(
                          "about.experience",
                          i,
                          field,
                          e.target.value,
                        )
                      }
                      className="w-full border rounded px-3 py-2"
                    />
                  ))}
                  <input
                    type="text"
                    placeholder="Tech (comma separated)"
                    value={exp.tech.join(", ")}
                    onChange={(e) =>
                      handleArrayChange(
                        "about.experience",
                        i,
                        "tech",
                        e.target.value.split(","),
                      )
                    }
                    className="w-full border rounded px-3 py-2"
                  />
                  <Button
                    mode="delete"
                    type="button"
                    onClick={() => removeArrayItem("about.experience", i)}
                    className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
                  >
                    Delete Experience
                  </Button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addArrayItem("about.experience", {
                    company: "",
                    role: "",
                    period: "",
                    tech: [],
                  })
                }
                className="bg-cyan-500 text-white px-3 py-1 rounded hover:bg-cyan-600"
              >
                Add Experience
              </button>
            </div>
          </section>

          {/* SKILLS */}
          <section className="border p-4 rounded-lg space-y-4">
            <h2 className="text-2xl font-semibold">Skills</h2>
            {portfolio.skills.map((skill, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 mb-2 border p-2 rounded"
              >
                <input
                  type="text"
                  placeholder="Title"
                  value={skill.title}
                  onChange={(e) =>
                    handleArrayChange("skills", i, "title", e.target.value)
                  }
                  className="w-full border rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Items (comma separated)"
                  value={skill.items.join(",")}
                  onChange={(e) =>
                    handleArrayChange(
                      "skills",
                      i,
                      "items",
                      e.target.value.split(","),
                    )
                  }
                  className="w-full border rounded px-3 py-2"
                />
                <Button
                  mode="delete"
                  type="button"
                  onClick={() => removeArrayItem("skills", i)}
                  className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
                >
                  Delete Skill
                </Button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("skills", { title: "", items: [] })}
              className="bg-cyan-500 text-white px-3 py-1 rounded hover:bg-cyan-600"
            >
              Add Skill
            </button>
          </section>

          {/* CONTACT */}
          <section className="border p-4 rounded-lg space-y-4">
            <h2 className="text-2xl font-semibold">Contact</h2>
            {["title", "desc", "email", "phone"].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field}
                value={portfolio.contact[field]}
                onChange={(e) => handleChange("contact", field, e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            ))}

            {/* Social Links */}
            <div>
              <label className="block font-medium mb-2">Social Links</label>
              {portfolio.contact.social.map((s, i) => (
                <div key={i} className="flex gap-2 mb-2 flex-col sm:flex-row">
                  <input
                    type="text"
                    placeholder="Name"
                    value={s.name}
                    onChange={(e) =>
                      handleArrayChange(
                        "contact.social",
                        i,
                        "name",
                        e.target.value,
                      )
                    }
                    className="flex-1 border rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Link"
                    value={s.link}
                    onChange={(e) =>
                      handleArrayChange(
                        "contact.social",
                        i,
                        "link",
                        e.target.value,
                      )
                    }
                    className="flex-1 border rounded px-3 py-2"
                  />
                  <Button
                    mode="delete"
                    type="button"
                    onClick={() => removeArrayItem("contact.social", i)}
                    className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </Button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addArrayItem("contact.social", { name: "", link: "" })
                }
                className="bg-cyan-500 text-white px-3 py-1 rounded hover:bg-cyan-600"
              >
                Add Social Link
              </button>
            </div>
          </section>

          {/* FOOTER */}
          <section className="border p-4 rounded-lg space-y-4">
            <h2 className="text-2xl font-semibold">Footer</h2>
            <input
              type="text"
              placeholder="Footer Text"
              value={portfolio.footer.text}
              onChange={(e) => handleChange("footer", "text", e.target.value)}
              className="w-full border rounded px-3 py-2"
            />

            {/* Footer Links */}
            <div>
              <label className="block font-medium mb-2">Links</label>
              {portfolio.footer.links.map((link, i) => (
                <div key={i} className="flex gap-2 mb-2 flex-col sm:flex-row">
                  <input
                    type="text"
                    placeholder="Name"
                    value={link.name}
                    onChange={(e) =>
                      handleArrayChange(
                        "footer.links",
                        i,
                        "name",
                        e.target.value,
                      )
                    }
                    className="flex-1 border rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="Link"
                    value={link.link}
                    onChange={(e) =>
                      handleArrayChange(
                        "footer.links",
                        i,
                        "link",
                        e.target.value,
                      )
                    }
                    className="flex-1 border rounded px-3 py-2"
                  />
                  <Button
                    mode="delete"
                    type="button"
                    onClick={() => removeArrayItem("footer.links", i)}
                    // className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </Button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  addArrayItem("footer.links", { name: "", link: "" })
                }
                className="bg-cyan-500 text-white px-3 py-1 rounded hover:bg-cyan-600"
              >
                Add Footer Link
              </button>
            </div>
          </section>

          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Save Portfolio
          </button>
        </form>

        <MessageModal
          handleClose={() => {
            setMessage(emptyMessage);
          }}
          modalFlag={message.flag}
          operation={message.operation}
          value={message.message}
        />
      </div>
    </>
  );
};

export default PortfolioForm;

const PortfolioLink = ({ id }: { id: string }) => {
  const url = `https://portfolio.shareurinterest.com/${id}`;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3 m-3">
      <p className="text-sm break-all">{url}</p>

      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          type="button"
          className="bg-gray-700 px-3 py-2 rounded hover:bg-gray-600"
        >
          {copied ? "Copied!" : "Copy"}
        </button>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-cyan-500 px-4 py-2 rounded hover:bg-cyan-600"
        >
          View
        </a>
      </div>
    </div>
  );
};

export { PortfolioLink };
