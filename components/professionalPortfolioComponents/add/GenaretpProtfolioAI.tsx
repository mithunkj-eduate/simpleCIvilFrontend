"use client";

import { useContext, useEffect, useState } from "react";
import Api, { api } from "@/components/helpers/apiheader";
import { AppContext } from "@/context/context";
import { ApiErrorResponse, msgType } from "@/utils/commenTypes";
import { emptyMessage } from "@/utils/constants";
import { Operation } from "@/utils/enum.types";
import { PortfolioData } from "@/lib/types";
import { AxiosError } from "axios";
import MessageModal from "@/customComponents/MessageModal";
import Loading from "@/components/helpers/Loading";

export default function GeneratePortfolioPage() {
  const [copied, setCopied] = useState(false);
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 📋 Copy Prompt
  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ✅ Validate JSON Structure
  const validateJSON = (data: PortfolioData) => {
    console.log(data, "data");
    return (
      data?.meta && data?.hero && data?.about && data?.services && data?.contact
    );
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    let parsed;

    // ✅ Step 1: Safe JSON Parse
    try {
      parsed = JSON.parse(jsonInput);

    } catch (error) {
console.log(error,"valied")

      setError("Invalid JSON format ❌ (Check commas, quotes)");
      return;
    }

    // ✅ Step 2: Validate Structure
    const isValid = validateJSON(parsed);
    if (!isValid) {
      setError("Invalid JSON structure ❌ (Missing required fields)");
      return;
    }

    // ✅ Step 3: API Call
    try {
      await handleSave(parsed);

      setJsonInput("");
    } catch (error) {
      setError("Invalid JSON format ❌");
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
          setOperation(Operation.UPDATE);
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
              setMessage({
                flag: true,
                message: "created successfully!",
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

  if (loading) return <Loading />;

  return (
    <div className="ai-container">
      <h1 className="ai-title">Create Website with AI</h1>

      <p className="ai-subtitle">
        Copy the prompt → Generate JSON → Paste below
      </p>

      {/* PROMPT BOX */}
      <div className="ai-box">
        <pre>{prompt}</pre>
      </div>

      <button onClick={handleCopy} className="ai-button">
        {copied ? "Copied ✅" : "Copy Prompt"}
      </button>

      {/* TEXTAREA */}
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Paste ChatGPT JSON here..."
        className="ai-textarea"
      />

      {/* ERROR */}
      {error && <p className="ai-error">{error}</p>}

      {/* SUCCESS */}
      {success && <p className="ai-success">{success}</p>}

      {/* SUBMIT */}
      <button onClick={handleSubmit} className="ai-submit">
        Create Website
      </button>

      <MessageModal
        handleClose={handleClose}
        modalFlag={message.flag}
        operation={message.operation}
        value={message.message}
      />
    </div>
  );
}

export const prompt = `Create a professional portfolio website content in JSON format.

STRICT RULES:
- Do NOT change structure
- Do NOT remove fields
- Only change values
- Return ONLY JSON

{
  meta: {
    slug: "dr-priya-sharma",
    profession: "doctor",
    name: "Dr. Priya Sharma",
    tagline: "Specialist in Cardiology & Internal Medicine",
    description:
      "Board-certified cardiologist with 15+ years of experience providing compassionate, evidence-based care to patients across Bengaluru.",
    seo: {
      title: "Dr. Priya Sharma – Cardiologist in Bengaluru",
      description:
        "Experienced cardiologist offering comprehensive heart care, preventive cardiology, and advanced diagnostics in Bengaluru.",
      keywords: [
        "cardiologist",
        "heart doctor",
        "Bengaluru",
        "cardiology clinic",
      ],
    },
    accentColor: "#0ea5e9",
  },
  hero: {
    heading: "Expert Heart Care You Can Trust",
    subheading:
      "15+ years of excellence in cardiology, helping patients lead healthier, longer lives with personalized treatment plans.",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
    carousel: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1200&q=80",
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f3?w=1200&q=80",
    ],
    cta: [
      {
        label: "Book Appointment",
        href: "#contact",
        variant: "primary",
        icon: "Calendar",
      },
      {
        label: "WhatsApp Us",
        href: "https://wa.me/919876543210",
        variant: "secondary",
        icon: "MessageCircle",
      },
    ],
    stats: [
      { label: "Years Experience", value: "15+" },
      { label: "Patients Treated", value: "12,000+" },
      { label: "Success Rate", value: "98%" },
      { label: "Awards Won", value: "8" },
    ],
  },
  about: {
    title: "About Dr. Priya Sharma",
    description:
      "A passionate cardiologist committed to delivering world-class cardiac care. Trained at AIIMS Delhi and Johns Hopkins,
       Dr. Sharma combines cutting-edge medical science with genuine compassion. She believes every patient deserves 
       personalized attention and a clear understanding of their health journey.",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=800&q=80",
    highlights: [
      { icon: "GraduationCap", title: "Education", value: "AIIMS Delhi, MD" },
      {
        icon: "Award",
        title: "Fellowship",
        value: "Johns Hopkins Cardiology",
      },
      {
        icon: "MapPin",
        title: "Location",
        value: "Bengaluru, Karnataka",
      },
      {
        icon: "Languages",
        title: "Languages",
        value: "English, Hindi, Kannada",
      },
    ],
  },
  businessInfo: {
    ownerName: "Dr. Priya Sharma",
    registrationNumber: "MCI-2008-KA-14892",
    gst: "29ABCDE1234F1Z5",
    established: "2009",
    licenseNumber: "KMC-KA-8823",
    additionalInfo: [
      { label: "Specialty", value: "Interventional Cardiology" },
      { label: "Hospital Affiliation", value: "Manipal Hospitals, Bengaluru" },
    ],
  },
  services: [
    {
      id: "s1",
      title: "Comprehensive Cardiac Evaluation",
      description:
        "Full heart health checkup including ECG, echocardiogram, stress test, and blood panel analysis.",
      image:
        "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=600&q=80",
      price: "₹3,500",
      duration: "2 hours",
      badge: "Most Popular",
      features: ["ECG & Echo", "Stress Test", "Lipid Profile", "Report & Consultation"],
    },
    {
      id: "s2",
      title: "Heart Disease Management",
      description:
        "Ongoing management of hypertension, arrhythmia, coronary artery disease, and heart failure.",
      image:
        "https://images.unsplash.com/photo-1631217873436-e8d8b64ce0b3?w=600&q=80",
      price: "₹1,200",
      priceUnit: "visit",
      duration: "45 min",
      features: ["Medication Review", "Lifestyle Counseling", "Follow-up Plan"],
    },
    {
      id: "s3",
      title: "Preventive Cardiology",
      description:
        "Risk assessment and preventive strategies for patients with family history of heart disease.",
      image:
        "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80",
      price: "₹2,000",
      duration: "1 hour",
      features: ["Risk Scoring", "Diet Planning", "Exercise Prescription"],
    },
    {
      id: "s4",
      title: "Angioplasty & Stenting",
      description:
        "Minimally invasive procedures to open blocked arteries and restore healthy blood flow.",
      image:
        "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&q=80",
      price: "Contact for Pricing",
      badge: "Surgical",
      features: ["Pre-op Workup", "Procedure", "Post-op Care", "Rehabilitation"],
    },
  ],
  projects: [
    {
      id: "p1",
      title: "Cardiac Wellness Camp 2023",
      description:
        "Free community health screening camp serving 500+ patients in rural Karnataka, providing ECGs, BP checks, and awareness sessions.",
      category: "Community Health",
      year: "2023",
      images: [
        {
          url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
          alt: "Health camp",
        },
        {
          url: "https://images.unsplash.com/photo-1530026405186-ed1f139313f3?w=800&q=80",
          alt: "Screening",
        },
      ],
      tags: ["Community", "Screening", "Awareness"],
    },
    {
      id: "p2",
      title: "Research: Post-COVID Cardiac Outcomes",
      description:
        "Published study on long-term cardiovascular effects in COVID-19 survivors, cited in 3 international journals.",
      category: "Research",
      year: "2022",
      images: [
        {
          url: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=800&q=80",
          alt: "Research",
        },
      ],
      tags: ["Research", "COVID-19", "Publication"],
      link: "#",
    },
  ],
  skills: [
    { name: "Interventional Cardiology", level: 98, category: "Clinical" },
    { name: "Echocardiography", level: 95, category: "Diagnostics" },
    { name: "Cardiac Imaging", level: 90, category: "Diagnostics" },
    { name: "Heart Failure Management", level: 93, category: "Clinical" },
    { name: "Electrophysiology", level: 80, category: "Specialized" },
    { name: "Patient Communication", level: 99, category: "Soft Skills" },
  ],
  certifications: [
    {
      title: "Board Certified Cardiologist",
      issuer: "National Board of Examinations",
      year: "2010",
    },
    {
      title: "Fellowship in Interventional Cardiology",
      issuer: "Johns Hopkins Hospital",
      year: "2012",
    },
    {
      title: "ACLS Certification",
      issuer: "American Heart Association",
      year: "2023",
    },
    {
      title: "Best Cardiologist Award",
      issuer: "Karnataka Medical Council",
      year: "2022",
    },
  ],
  gallery: [
    {
      url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80",
      alt: "Clinic exterior",
      category: "Clinic",
    },
    {
      url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
      alt: "Consultation room",
      category: "Clinic",
    },
    {
      url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80",
      alt: "Modern equipment",
      category: "Equipment",
    },
    {
      url: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&q=80",
      alt: "ECG machine",
      category: "Equipment",
    },
    {
      url: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80",
      alt: "Patient care",
      category: "Team",
    },
    {
      url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
      alt: "Medical team",
      category: "Team",
    },
    {
      url: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&q=80",
      alt: "Cath lab",
      category: "Equipment",
    },
    {
      url: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=600&q=80",
      alt: "Consultation",
      category: "Clinic",
    },
    {
      url: "https://images.unsplash.com/photo-1631217873436-e8d8b64ce0b3?w=600&q=80",
      alt: "Ward rounds",
      category: "Team",
    },
    {
      url: "https://images.unsplash.com/photo-1530026405186-ed1f139313f3?w=600&q=80",
      alt: "Community camp",
      category: "Events",
    },
    {
      url: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80",
      alt: "Health awareness",
      category: "Events",
    },
    {
      url: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=600&q=80",
      alt: "Research lab",
      category: "Research",
    },
  ],
  testimonials: [
    {
      id: "t1",
      name: "Rajesh Kumar",
      role: "Patient",
      rating: 5,
      text: "Dr. Sharma saved my life. After my heart attack, her quick diagnosis and expert treatment got me back on my feet in record time. Truly the best cardiologist in Bengaluru.",
      date: "March 2024",
    },
    {
      id: "t2",
      name: "Sunita Reddy",
      role: "Patient",
      rating: 5,
      text: "I was terrified of my diagnosis, but Dr. Sharma explained everything so clearly. Her calm, compassionate approach made all the difference during a very difficult time.",
      date: "January 2024",
    },
    {
      id: "t3",
      name: "Anand Menon",
      role: "Patient",
      rating: 5,
      text: "After years of high BP and anxiety, I finally found a doctor who listens. Dr. Sharma's preventive approach has transformed my lifestyle and my heart health.",
      date: "November 2023",
    },
    {
      id: "t4",
      name: "Meena Iyer",
      role: "Patient",
      rating: 4,
      text: "Excellent care, modern facilities, and a team that truly cares. The only improvement could be shorter waiting times, but the quality of treatment is unmatched.",
      date: "October 2023",
    },
  ],
  faq: [
    {
      question: "How do I book an appointment?",
      answer:
        "You can book via WhatsApp, phone call, or the contact form below. We typically confirm appointments within 2 hours.",
    },
    {
      question: "Do you accept health insurance?",
      answer:
        "Yes, we work with most major insurance providers including Star Health, ICICI Lombard, Bajaj Allianz, and government schemes like Ayushman Bharat.",
    },
    {
      question: "What should I bring to my first visit?",
      answer:
        "Please bring any previous ECGs, reports, prescription history, and your insurance card. Arriving 15 minutes early helps with paperwork.",
    },
    {
      question: "Do you offer home visits or telemedicine?",
      answer:
        "Yes, we offer video consultations for follow-up appointments and prescription renewals. Home visits are available for mobility-limited patients within Bengaluru.",
    },
    {
      question: "How long does a consultation take?",
      answer:
        "A first consultation takes 45–60 minutes. Follow-up visits are typically 20–30 minutes. Please factor in waiting time during peak hours.",
    },
  ],
  contact: {
    email: "dr.priyasharma@heartcare.in",
    phone: "+91 98765 43210",
    whatsapp: "+919876543210",
    address:
      "404, MedCity Tower, 100 Feet Road, Indiranagar, Bengaluru – 560038",
    map: {
      lat: 12.9784,
      lng: 77.6408,
      zoom: 15,
    },
    workingHours: [
      { day: "Monday – Friday", hours: "9:00 AM – 7:00 PM" },
      { day: "Saturday", hours: "9:00 AM – 2:00 PM" },
      { day: "Sunday", hours: "Emergency Only", closed: false },
    ],
  },
  socialLinks: [
    { platform: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" },
    { platform: "Twitter", url: "https://twitter.com", icon: "Twitter" },
    {
      platform: "Instagram",
      url: "https://instagram.com",
      icon: "Instagram",
    },
    { platform: "YouTube", url: "https://youtube.com", icon: "Youtube" },
  ],
}`;
