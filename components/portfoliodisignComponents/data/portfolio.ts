
import { PortfolioData } from "../types/portfolio";

const portfolioData: PortfolioData = {
  meta: {
    slug: "dr-aisha-sharma",
    profession: "Doctor",
    name: "Dr. Aisha Sharma",
    tagline: "Compassionate Care, Advanced Medicine",
    description:
      "Board-certified cardiologist with 15+ years of experience delivering exceptional cardiac care in Bengaluru.",
    seo: {
      title: "Dr. Aisha Sharma | Cardiologist in Bengaluru",
      description:
        "Expert cardiac care by Dr. Aisha Sharma, MD. Specializing in preventive cardiology, interventional procedures & heart disease management.",
      keywords: [
        "cardiologist Bengaluru",
        "heart specialist",
        "cardiac care",
        "Dr Aisha Sharma",
        "preventive cardiology",
      ],
    },
    accentColor: "#0ea5e9",
  },
  hero: {
    heading: "Advanced Cardiac Care You Can Trust",
    subheading:
      "Combining cutting-edge technology with compassionate care to protect your heart health.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800",
    carousel: [
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200",
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200",
    ],
    cta: [
      {
        label: "Book Appointment",
        href: "#contact",
        variant: "primary",
        icon: "calendar",
      },
      {
        label: "Learn More",
        href: "#about",
        variant: "secondary",
        icon: "arrow-right",
      },
    ],
    stats: [
      { label: "Years Experience", value: "15+" },
      { label: "Patients Treated", value: "12,000+" },
      { label: "Success Rate", value: "98.5%" },
      { label: "Awards", value: "8" },
    ],
  },
  about: {
    title: "About Dr. Aisha Sharma",
    description:
      "With over 15 years of dedicated service in cardiology, I have built my practice on the foundation of patient-first care, evidence-based medicine, and continuous learning. My approach integrates the latest diagnostic technologies with a deeply human touch, ensuring every patient feels heard, understood, and cared for.\n\nI completed my MBBS from AIIMS Delhi, followed by MD in Internal Medicine and DM in Cardiology. I have been a Fellow of the American College of Cardiology (FACC) since 2014 and regularly present research at international conferences.",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600",
    highlights: [
      { icon: "award", title: "FACC Certified", value: "American College of Cardiology" },
      { icon: "users", title: "Patients Served", value: "12,000+" },
      { icon: "briefcase", title: "Experience", value: "15 Years" },
      { icon: "star", title: "Patient Rating", value: "4.9 / 5.0" },
    ],
  },
  businessInfo: {
    ownerName: "Dr. Aisha Sharma",
    registrationNumber: "KAR-MED-2009-04821",
    gst: "29AABCU9603R1ZP",
    established: "2009",
    licenseNumber: "KMC-45892",
    additionalInfo: [
      { label: "Specialization", value: "Interventional Cardiology" },
      { label: "Languages", value: "English, Hindi, Kannada" },
      { label: "Insurance", value: "Accepts all major health plans" },
    ],
  },
  services: [
    {
      id: "svc-001",
      title: "Preventive Cardiology",
      description:
        "Comprehensive heart health assessments and lifestyle programs to prevent cardiovascular disease before it starts.",
      image: "https://images.unsplash.com/photo-1666214276372-24e584e5542e?w=400",
      price: "₹2,500",
      duration: "60 min",
      badge: "Most Popular",
      features: [
        "Full cardiac risk assessment",
        "ECG & Echo screening",
        "Personalised diet plan",
        "Follow-up consultation",
      ],
    },
    {
      id: "svc-002",
      title: "Interventional Procedures",
      description:
        "Minimally invasive cardiac procedures including angioplasty, stenting, and catheter-based interventions.",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=400",
      price: "Consultation Required",
      duration: "Varies",
      badge: "Advanced",
      features: [
        "Coronary angioplasty",
        "Stent placement",
        "Cardiac catheterisation",
        "Post-procedure monitoring",
      ],
    },
    {
      id: "svc-003",
      title: "Cardiac Rehabilitation",
      description:
        "Structured recovery programs for patients recovering from heart attacks, surgeries, or managing chronic conditions.",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400",
      price: "₹8,000 / month",
      duration: "4–12 weeks",
      badge: "",
      features: [
        "Supervised exercise training",
        "Nutritional counselling",
        "Stress management",
        "Medication optimisation",
      ],
    },
  ],
  projects: [
    {
      id: "prj-001",
      title: "Community Heart Health Drive 2023",
      description:
        "Organised a city-wide cardiac screening camp that screened over 3,000 residents in under-served communities.",
      category: "Community Outreach",
      year: "2023",
      images: [
        {
          url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600",
          alt: "Community health camp",
        },
      ],
      tags: ["Outreach", "Screening", "Prevention"],
      link: "",
    },
    {
      id: "prj-002",
      title: "Tele-Cardiology Initiative",
      description:
        "Launched a remote consultation platform enabling rural patients to access cardiac care without travelling to the city.",
      category: "Innovation",
      year: "2022",
      images: [
        {
          url: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600",
          alt: "Telemedicine consultation",
        },
      ],
      tags: ["Telemedicine", "Rural Health", "Digital"],
      link: "",
    },
  ],
  skills: [
    { name: "Echocardiography", level: 98, category: "Diagnostics" },
    { name: "Coronary Angioplasty", level: 95, category: "Interventional" },
    { name: "Cardiac CT", level: 88, category: "Diagnostics" },
    { name: "Electrophysiology", level: 80, category: "Interventional" },
    { name: "Patient Communication", level: 99, category: "Soft Skills" },
  ],
  certifications: [
    {
      title: "Fellow, American College of Cardiology",
      issuer: "ACC",
      year: "2014",
    },
    {
      title: "DM — Cardiology",
      issuer: "AIIMS Delhi",
      year: "2009",
    },
    {
      title: "Advanced Cardiac Life Support (ACLS)",
      issuer: "American Heart Association",
      year: "2023",
    },
  ],
  gallery: [
    {
      url: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600",
      alt: "State-of-the-art cath lab",
      category: "Facility",
    },
    {
      url: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600",
      alt: "Consultation room",
      category: "Facility",
    },
    {
      url: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=600",
      alt: "Patient care",
      category: "Care",
    },
    {
      url: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600",
      alt: "Award ceremony",
      category: "Achievements",
    },
    {
      url: "https://images.unsplash.com/photo-1579165466814-1cbfa2a23a93?w=600",
      alt: "Medical conference",
      category: "Events",
    },
    {
      url: "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?w=600",
      alt: "Team collaboration",
      category: "Team",
    },
  ],
  testimonials: [
    {
      id: "tst-001",
      name: "Ramesh Nair",
      role: "Patient, Angioplasty",
      rating: 5,
      text: "Dr. Sharma saved my life. After my heart attack, she performed an emergency angioplasty with exceptional skill. Her follow-up care has been outstanding and I'm back to normal life.",
      date: "March 2024",
    },
    {
      id: "tst-002",
      name: "Priya Menon",
      role: "Patient, Preventive Cardiology",
      rating: 5,
      text: "I came for a routine check and she detected a hidden risk that no one else had flagged. Her thorough approach and warm demeanor made the entire experience reassuring.",
      date: "January 2024",
    },
    {
      id: "tst-003",
      name: "Suresh Patel",
      role: "Patient, Cardiac Rehab",
      rating: 5,
      text: "The rehabilitation program designed by Dr. Sharma was life-changing. I lost 8 kg, improved my ejection fraction, and feel 10 years younger. Highly recommended.",
      date: "November 2023",
    },
  ],
  faq: [
    {
      question: "How do I book an appointment?",
      answer:
        "You can book via the Contact section below, call our clinic directly, or send a WhatsApp message. We offer same-day appointments for urgent cases.",
    },
    {
      question: "Do you accept health insurance?",
      answer:
        "Yes, we accept all major health insurance plans including Star Health, HDFC Ergo, Niva Bupa, and government schemes like CGHS and ECHS.",
    },
    {
      question: "What should I bring to my first appointment?",
      answer:
        "Please bring your previous medical reports, ECG results, list of current medications, and your insurance card. Arrive 15 minutes early for registration.",
    },
    {
      question: "Are telemedicine consultations available?",
      answer:
        "Yes! We offer video consultations via our secure portal. These are ideal for follow-ups, second opinions, and patients located outside Bengaluru.",
    },
  ],
  contact: {
    email: "dr.aisha@heartcare.in",
    phone: "+91-80-4567-8901",
    whatsapp: "+918045678901",
    address: "Heart Care Clinic, 42 Indiranagar 100 Feet Road, Bengaluru, Karnataka 560038",
    map: {
      lat: 12.9784,
      lng: 77.6408,
      zoom: 15,
    },
    workingHours: [
      { day: "Monday – Friday", hours: "9:00 AM – 6:00 PM", closed: false },
      { day: "Saturday", hours: "9:00 AM – 2:00 PM", closed: false },
      { day: "Sunday", hours: "", closed: true },
    ],
  },
  socialLinks: [
    { platform: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
    { platform: "Twitter", url: "https://twitter.com", icon: "twitter" },
    { platform: "Instagram", url: "https://instagram.com", icon: "instagram" },
  ],
};

export default portfolioData;
