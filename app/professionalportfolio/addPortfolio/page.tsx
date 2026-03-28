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
import { useContext, useEffect, useState } from "react";
import ProjectsForm from "@/components/professionalPortfolioComponents/add/ProjectsForm";
import SkillsForm from "@/components/professionalPortfolioComponents/add/SkillsForm";
import CertificationsForm from "@/components/professionalPortfolioComponents/add/CertificationsForm";
import GalleryForm from "@/components/professionalPortfolioComponents/add/GalleryForm";
import TestimonialsForm from "@/components/professionalPortfolioComponents/add/TestimonialsForm";
import FAQForm from "@/components/professionalPortfolioComponents/add/FAQForm";
import ContactForm from "@/components/professionalPortfolioComponents/add/ContactForm";
import SocialLinksForm from "@/components/professionalPortfolioComponents/add/SocialLinksForm";
import MetaForm from "@/components/professionalPortfolioComponents/add/MetaForm";
import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import { msgType } from "@/utils/commenTypes";
import { emptyMessage } from "@/utils/constants";
import { samplePortfolioData } from "@/data/portfolios";
import { PortfolioData } from "@/lib/types";
import { Operation } from "@/utils/enum.types";
import MessageModal from "@/customComponents/MessageModal";

export default function Dashboard() {
  const [form, setForm] = useState<PortfolioData>(samplePortfolioData);

  // const [loading, setLoading] = useState(false);

  const { TOKEN } = Api();
  const { state } = useContext(AppContext);
  const [message, setMessage] = useState<msgType>(emptyMessage);
  const [operation, setOperation] = useState(Operation.CREATE);

  useEffect(() => {
    if (!TOKEN || !state.user) return;

    const getStore = async () => {
      try {
        const res = await api.get(`/professionalPortfolio`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        console.log(res, "res");
        if (res.data) {
          setForm(res.data);
          setOperation(Operation.UPDATE);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getStore();
  }, [TOKEN, state.user]);

  const handleSave = async (value: PortfolioData) => {
    try {
      // setLoading(true);

      if (!TOKEN || !state.user) return;

      if (operation === Operation.CREATE) {
        const addUpdatePortfolio = async () => {
          try {
            const res = await api.post(`/professionalPortfolio`, value, {
              headers: {
                Authorization: `Bearer ${TOKEN}`,
                "Content-Type": "application/json",
              },
            });

            if (res.data) {
              setForm({
                ...res.data,
                meta: {
                  slug: res.data.meta.slug,
                },
              });
              setMessage({
                flag: true,
                message: "added successfully!",
                operation: Operation.CREATE,
              });
            }
          } catch (error) {
            console.log(error);
          }
        };
        addUpdatePortfolio();
      } else {
        const addUpdatePortfolio = async () => {
          try {
            const res = await api.put(`/professionalPortfolio`, value, {
              headers: {
                Authorization: `Bearer ${TOKEN}`,
                "Content-Type": "application/json",
              },
            });

            if (res.data) {
              setForm({
                ...res.data,
                meta: {
                  slug: res.data.meta.slug,
                },
              });
              setMessage({
                flag: true,
                message: "updated successfully!",
                operation: Operation.CREATE,
              });
            }
          } catch (error) {
            console.log(error);
          }
        };
        addUpdatePortfolio();
      }

      // alert("✅ Website Created Successfully!");
    } catch (err) {
      alert("❌ Error creating website");
    } finally {
      // setLoading(false);
    }
  };

  const handleClose = () => {
    setMessage(emptyMessage);
    if (
      message.operation === Operation.CREATE ||
      message.operation === Operation.UPDATE
    ) {
      setForm(samplePortfolioData);
      setOperation(Operation.UPDATE);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <MetaForm initialValues={form} handleSave={handleSave} />
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

      <MessageModal
        handleClose={handleClose}
        modalFlag={message.flag}
        operation={message.operation}
        value={message.message}
      />
    </div>
  );
}
