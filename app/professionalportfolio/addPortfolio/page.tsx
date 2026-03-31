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
import { ApiErrorResponse, msgType } from "@/utils/commenTypes";
import { emptyMessage } from "@/utils/constants";
import { samplePortfolioData } from "@/data/portfolios";
import { PortfolioData } from "@/lib/types";
import { LicenseTypes, Operation } from "@/utils/enum.types";
import MessageModal from "@/customComponents/MessageModal";
import {
  formStepsPortfolio,
  StepProgress,
} from "@/components/professionalPortfolioComponents/add/StepProgress";
import { AxiosError } from "axios";
import Navbar from "@/components/commen/Navbar";
import Loading from "@/components/helpers/Loading";

// export default function Dashboard() {
//   const [form, setForm] = useState<PortfolioData>(samplePortfolioData);

//   // const [loading, setLoading] = useState(false);

//   const { TOKEN } = Api();
//   const { state } = useContext(AppContext);
//   const [message, setMessage] = useState<msgType>(emptyMessage);
//   const [operation, setOperation] = useState(Operation.CREATE);

//   useEffect(() => {
//     if (!TOKEN || !state.user) return;

//     const getStore = async () => {
//       try {
//         const res = await api.get(`/professionalPortfolio`, {
//           headers: {
//             Authorization: `Bearer ${TOKEN}`,
//             "Content-Type": "application/json",
//           },
//         });

//         console.log(res, "res");
//         if (res.data) {
//           setForm(res.data);
//           setOperation(Operation.UPDATE);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getStore();
//   }, [TOKEN, state.user]);

//   const handleSave = async (value: PortfolioData) => {
//     try {
//       // setLoading(true);

//       if (!TOKEN || !state.user) return;

//       if (operation === Operation.CREATE) {
//         const addUpdatePortfolio = async () => {
//           try {
//             const res = await api.post(`/professionalPortfolio`, value, {
//               headers: {
//                 Authorization: `Bearer ${TOKEN}`,
//                 "Content-Type": "application/json",
//               },
//             });

//             if (res.data) {
//               setForm({
//                 ...res.data,
//                 meta: {
//                   slug: res.data.meta.slug,
//                 },
//               });
//               setMessage({
//                 flag: true,
//                 message: "added successfully!",
//                 operation: Operation.CREATE,
//               });
//             }
//           } catch (error) {
//             console.log(error);
//           }
//         };
//         addUpdatePortfolio();
//       } else {
//         const addUpdatePortfolio = async () => {
//           try {
//             const res = await api.put(`/professionalPortfolio`, value, {
//               headers: {
//                 Authorization: `Bearer ${TOKEN}`,
//                 "Content-Type": "application/json",
//               },
//             });

//             if (res.data) {
//               setForm({
//                 ...res.data,
//                 meta: {
//                   slug: res.data.meta.slug,
//                 },
//               });
//               setMessage({
//                 flag: true,
//                 message: "updated successfully!",
//                 operation: Operation.CREATE,
//               });
//             }
//           } catch (error) {
//             console.log(error);
//           }
//         };
//         addUpdatePortfolio();
//       }

//       // alert("✅ Website Created Successfully!");
//     } catch (err) {
//       alert("❌ Error creating website");
//     } finally {
//       // setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     setMessage(emptyMessage);
//     if (
//       message.operation === Operation.CREATE ||
//       message.operation === Operation.UPDATE
//     ) {
//       setForm(samplePortfolioData);
//       setOperation(Operation.UPDATE);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <MetaForm initialValues={form} handleSave={handleSave} />
//       <HeroForm initialValues={form} handleSave={handleSave} />
//       <AboutForm  initialValues={form} handleSave={handleSave}/>
//       <BusinessInfoForm  initialValues={form} handleSave={handleSave}/>
//       {/* <ServicesForm  initialValues={form} handleSave={handleSave}/> */}
//       <ProjectsForm  initialValues={form} handleSave={handleSave}/>
//       <SkillsForm  initialValues={form} handleSave={handleSave}/>
//       <CertificationsForm  initialValues={form} handleSave={handleSave}/>
//       <GalleryForm  initialValues={form} handleSave={handleSave}/>
//       <TestimonialsForm  initialValues={form} handleSave={handleSave}/>
//       <FAQForm  initialValues={form} handleSave={handleSave}/>
//       <ContactForm  initialValues={form} handleSave={handleSave}/>
//       <SocialLinksForm  initialValues={form} handleSave={handleSave}/>

//       <MessageModal
//         handleClose={handleClose}
//         modalFlag={message.flag}
//         operation={message.operation}
//         value={message.message}
//       />
//     </div>
//   );

// }

export default function Dashboard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<PortfolioData | null>(samplePortfolioData);
  const [loading, setLoading] = useState(true);

  const { TOKEN } = Api();
  const { state } = useContext(AppContext);
  const [message, setMessage] = useState<msgType>(emptyMessage);
  const [operation, setOperation] = useState(Operation.CREATE);

  useEffect(() => {
    if (!TOKEN || !state.user) return;

    const getStore = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/professionalPortfolio`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        if (res.data) {
          setForm({
            ...res.data,
            meta: {
              ...res.data.meta,
              slug: res.data.meta.slug,
            },
          });
          setOperation(Operation.UPDATE);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getStore();
  }, [step, TOKEN, state.user]);

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
              setMessage({
                flag: true,
                message: "added successfully!",
                operation: Operation.CREATE,
              });
              setTimeout(() => {
                setForm({
                  ...res.data,
                  meta: {
                    ...res.data.meta,
                    slug: res.data.meta.slug,
                  },
                });

                nextStep();
              }, 1000);
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
              setMessage({
                flag: true,
                message: "updated successfully!",
                operation: Operation.CREATE,
              });
              setTimeout(() => {
                // setForm({
                //   ...res.data,
                //   meta: {
                //     ...res.data.meta,
                //     slug: res.data?.meta?.slug,
                //   },
                // });

                nextStep();
              }, 1000);
            }
          } catch (error) {
            console.log(error);
          }
        };
        addUpdatePortfolio();
      }

      // alert("✅ Website Created Successfully!");
    } catch (error) {
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
    }
  };

  const handleClose = () => {
    setMessage(emptyMessage);
    if (
      message.operation === Operation.CREATE ||
      message.operation === Operation.UPDATE
    ) {
      setOperation(Operation.UPDATE);
    }
  };

  // ---------- NAVIGATION ----------
  const nextStep = () => {
    if (step < formStepsPortfolio.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };


  // ---------- FORM RENDER ----------
  const renderForm = () => {
    if (form)
      switch (step) {
        case 0:
          return (
            <MetaForm
              initialValues={form}
              handleSave={handleSave}
              step={step}
              prevStep={prevStep}
            />
          );

        case 1:
          return (
            <HeroForm
              initialValues={form}
              handleSave={handleSave}
              step={step}
              prevStep={prevStep}
            />
          );
        case 2:
          return (
            <AboutForm
              initialValues={form}
              handleSave={handleSave}
              step={step}
              prevStep={prevStep}
            />
          );
        case 3:
          return (
            <BusinessInfoForm
              initialValues={form}
              handleSave={handleSave}
              step={step}
              prevStep={prevStep}
            />
          );
        case 4:
          return (
            <ProjectsForm
              initialValues={form}
              handleSave={handleSave}
              step={step}
              prevStep={prevStep}
            />
          );
        case 5:
          return (
            <SkillsForm
              initialValues={form}
              handleSave={handleSave}
              step={step}
              prevStep={prevStep}
            />
          );
        case 6:
          return (
            <CertificationsForm
              initialValues={form}
              handleSave={handleSave}
              step={step}
              prevStep={prevStep}
            />
          );
        case 7:
          return (
            <GalleryForm
              initialValues={form}
              handleSave={handleSave}
              step={step}
              prevStep={prevStep}
            />
          );
        case 8:
          return (
            <TestimonialsForm
              initialValues={form}
              handleSave={handleSave}
              step={step}
              prevStep={prevStep}
            />
          );
        case 9:
          return (
            <FAQForm
              initialValues={form}
              handleSave={handleSave}
              step={step}
              prevStep={prevStep}
            />
          );
        case 10:
          return (
            <ContactForm
              initialValues={form}
              handleSave={handleSave}
              step={step}
              prevStep={prevStep}
            />
          );
        case 11:
          return (
            <SocialLinksForm
              initialValues={form}
              handleSave={handleSave}
              step={step}
              prevStep={prevStep}
            />
          );
        default:
          return null;
      }
  };

  return (
    <>
      <Navbar NavType={LicenseTypes.WEBSIT} />

      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        {/* 🔥 Progress Bar */}
        {/* <StepProgress step={step} /> */}

        {/* 🔥 Current Form */}
        <div className="mt-6">{loading ? <Loading /> : renderForm()}</div>

        <MessageModal
          handleClose={handleClose}
          modalFlag={message.flag}
          operation={message.operation}
          value={message.message}
        />
      </div>
    </>
  );
}
