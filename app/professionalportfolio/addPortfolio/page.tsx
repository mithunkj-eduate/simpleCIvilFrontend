// // app/dashboard/page.tsx
// "use client";

// import { useState } from "react";
// import MetaForm from "@/components/professionalPortfolioComponents/add/MetaForm";
// import HeroForm from "@/components/professionalPortfolioComponents/add/HeroForm";
// import { samplePortfolioData } from "@/data/portfolios";
// import { PortfolioData } from "@/lib/types";

// export default function Dashboard() {
// //   const [step, setStep] = useState(0);
// //   const [data, setData] = useState({
// //     services: [],
// //   });

//    const [step, setStep] = useState(0);
//   const [data, setData] = useState<PortfolioData>(samplePortfolioData);

//   const next = (values: PortfolioData) => {
//     setData((prev) => ({ ...prev, ...values }));
//     setStep(step + 1);
//   };

//   return (
//     <div className="max-w-3xl mx-auto space-y-6">

//       {/* Progress Bar */}
//       <div className="w-full bg-gray-200 rounded-full h-2">
//         <div
//           className="bg-blue-600 h-2 rounded-full transition-all"
//           style={{ width: `${(step + 1) * 20}%` }}
//         />
//       </div>

//       {step === 0 && <MetaForm initialValues={data} onNext={next} />}
//       {step === 1 && <HeroForm initialValues={data} onNext={next} />}

//       {/* {step === 1 && <ServicesForm initialValues={data} onNext={next} />} */}

//     </div>
//   );
// }

"use client";

import HeroForm from "@/components/professionalPortfolioComponents/add/HeroForm";
import AboutForm from "@/components/professionalPortfolioComponents/add/AboutForm";
import BusinessInfoForm from "@/components/professionalPortfolioComponents/add/BusinessInfoForm";
import ServicesForm from "@/components/professionalPortfolioComponents/add/ServicesForm";

import { Input } from "@/stories/Input/Input";
import { TextArea } from "@/stories/TextArea/TextArea";
import { useState } from "react";
import ProjectsForm from "@/components/professionalPortfolioComponents/add/ProjectsForm";
import SkillsForm from "@/components/professionalPortfolioComponents/add/SkillsForm";
import CertificationsForm from "@/components/professionalPortfolioComponents/add/CertificationsForm";
import GalleryForm from "@/components/professionalPortfolioComponents/add/GalleryForm";
import TestimonialsForm from "@/components/professionalPortfolioComponents/add/TestimonialsForm";
import FAQForm from "@/components/professionalPortfolioComponents/add/FAQForm";
import ContactForm from "@/components/professionalPortfolioComponents/add/ContactForm";
import SocialLinksForm from "@/components/professionalPortfolioComponents/add/SocialLinksForm";
import MetaForm from "@/components/professionalPortfolioComponents/add/MetaForm";

export default function Dashboard() {
  const [form, setForm] = useState({
    name: "",
    profession: "",
    tagline: "",
    description: "",
    seoTitle: "",
    seoDescription: "",
    keywords: "",
    accentColor: "#0ea5e9",

    phone: "",
    email: "",
    service: "",
    about: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const generateSlug = (name) => name.toLowerCase().replace(/\s+/g, "-");

  const save = async () => {
    try {
      setLoading(true);

      const portfolioData = {
        meta: {
          slug: generateSlug(form.name),
          profession: form.profession,
          name: form.name,
          tagline: form.tagline,
          description: form.description,
          accentColor: form.accentColor,
          seo: {
            title: form.seoTitle,
            description: form.seoDescription,
            keywords: form.keywords.split(",").map((k) => k.trim()),
          },
        },

        about: {
          description: form.about,
        },

        contact: {
          phone: form.phone,
          email: form.email,
        },

        services: [
          {
            id: "s1",
            title: form.service,
            description: form.service,
          },
        ],
      };

      // await fetch("/api/portfolio", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(portfolioData),
      // });

      alert("✅ Website Created Successfully!");
    } catch (err) {
      alert("❌ Error creating website");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6 md:p-8 space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          Create Your Website
        </h1>

        <p className="text-center text-gray-500 text-sm">
          Your website will be created like: <br />
          <span className="font-semibold text-blue-600">
            yourdomain.com/{form.name ? generateSlug(form.name) : "your-name"}
          </span>
        </p>

   
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Basic Details</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              placeholder="Full Name"
              className="input"
              onChange={(e) => handleChange("name", e.target.value)}
            />

            <select
              className="input"
              onChange={(e) => handleChange("profession", e.target.value)}
            >
              <option value="">Select Profession</option>
              <option value="doctor">Doctor</option>
              <option value="lawyer">Lawyer</option>
              <option value="store">Store</option>
              <option value="teacher">Teacher</option>
              <option value="worker">Worker</option>
              <option value="engineer">Engineer</option>
            </select>

            <Input
              placeholder="Tagline"
              className="input"
              onChange={(e) => handleChange("tagline", e.target.value)}
            />

            <Input
              type="color"
              className="h-12 w-full rounded-lg"
              onChange={(e) => handleChange("accentColor", e.target.value)}
            />
          </div>

          <TextArea
            placeholder="Short Description"
            className="input h-24"
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">SEO Settings</h2>

          <Input
            placeholder="SEO Title (Google title)"
            className="input"
            onChange={(e) => handleChange("seoTitle", e.target.value)}
          />

          <TextArea
            placeholder="SEO Description"
            className="input h-20"
            onChange={(e) => handleChange("seoDescription", e.target.value)}
          />

          <Input
            placeholder="Keywords (comma separated)"
            className="input"
            onChange={(e) => handleChange("keywords", e.target.value)}
          />
        </div>

        <textarea
          placeholder="About You / Business"
          className="border p-3 rounded-lg w-full h-24"
          onChange={(e) => handleChange("about", e.target.value)}
        />

        <Input
          placeholder="Main Service (e.g. Heart Specialist, Plumbing, Teaching)"
          className="border p-3 rounded-lg w-full"
          onChange={(e) => handleChange("service", e.target.value)}
        />

        <button
          onClick={save}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {loading ? "Creating..." : "Save"}
        </button>
      </div> */}

      <MetaForm />
      <HeroForm />
      <AboutForm />
      <BusinessInfoForm />
      {/* <ServicesForm /> */}
      <ProjectsForm />
      <SkillsForm />
      <CertificationsForm />
      <GalleryForm />
      <TestimonialsForm />
      <FAQForm />
      <ContactForm />
      <SocialLinksForm />
    </div>
  );
}
