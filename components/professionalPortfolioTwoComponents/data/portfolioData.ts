import type { PortfolioData } from '../types/portfolio';

const portfolioData: PortfolioData = {
  meta: {
    slug: 'arjun-mehta',
    profession: 'Architect & Design Visionary',
    name: 'Arjun Mehta',
    tagline: 'Building Futures, Crafting Legacies',
    description:
      'Award-winning architect with 14 years transforming visions into iconic spaces. Specializing in sustainable luxury design, cultural landmarks, and urban masterplanning across India and Southeast Asia.',
    seo: {
      title: 'Arjun Mehta — Architect & Design Visionary | Bangalore',
      description:
        'Award-winning architect specializing in sustainable luxury design, urban spaces, and cultural landmarks across India.',
      keywords: ['architect', 'sustainable design', 'luxury homes', 'urban design', 'Bangalore', 'India'],
    },
    accentColor: '#c9a96e',
  },
  hero: {
    heading: 'Arjun Mehta',
    subheading: 'Building Futures, Crafting Legacies',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
    carousel: [],
    cta: [
      { label: 'View My Work', href: '#projects', variant: 'primary', icon: '→' },
      { label: 'Get in Touch', href: '#contact', variant: 'secondary' },
    ],
    stats: [
      { label: 'Projects Built', value: '140+' },
      { label: 'Years Experience', value: '14' },
      { label: 'Design Awards', value: '18' },
    ],
  },
  about: {
    title: 'Designing spaces that inspire generations',
    description:
      "Born in Bangalore and trained at the School of Planning and Architecture, New Delhi, I've spent 14 years creating spaces that balance innovation with cultural sensitivity. My work has been recognized by the Indian Institute of Architects and featured in Architectural Digest, Dezeen, and Wallpaper magazine. Great architecture tells a story — of its people, its place, and its time.",
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80',
    highlights: [
      { icon: '🏛️', title: 'Based In', value: 'Bangalore, India' },
      { icon: '🎓', title: 'Education', value: 'B.Arch, SPA New Delhi' },
      { icon: '🏆', title: 'Awards Won', value: '18 Design Awards' },
      { icon: '🌿', title: 'Philosophy', value: 'Sustainable Luxury' },
    ],
  },
  businessInfo: {
    ownerName: 'Ar. Arjun Mehta',
    registrationNumber: 'LLP/KA/2011/0043210',
    gst: '29ABCFM2890R1ZN',
    established: '2010',
    licenseNumber: 'CA/2011/87654',
    additionalInfo: [
      { label: 'IIA Fellowship', value: 'IIA/BLR/FEL/2021/0022' },
      { label: 'LEED AP No.', value: '1234567-US-BD+C' },
    ],
  },
  services: [
    {
      id: 's1',
      title: 'Luxury Residential Design',
      description:
        'Custom homes and villas with meticulous attention to spatial flow, natural light, and lifestyle integration. Every detail curated to your vision.',
      image: '',
      price: '₹8,00,000',
      duration: 'onwards / project',
      badge: 'Most Popular',
      features: [
        'Full architectural drawings & BOQ',
        '3D visualization & walkthroughs',
        'Site supervision & contractor coordination',
        'Interior design integration',
        '12 months post-completion support',
      ],
    },
    {
      id: 's2',
      title: 'Commercial & Workspace Design',
      description:
        'Dynamic offices, retail spaces, and commercial complexes that elevate brand identity and foster human productivity. LEED certification expertise.',
      image: '',
      price: '₹12,00,000',
      duration: 'onwards / project',
      badge: 'Corporate',
      features: [
        'Workplace strategy consulting',
        'LEED & GRIHA certification guidance',
        'Phased construction planning',
        'Regulatory approvals support',
        'Biophilic design integration',
      ],
    },
    {
      id: 's3',
      title: 'Urban Masterplanning',
      description:
        'Large-scale urban planning for townships, mixed-use developments, and cultural districts. Shaping communities for the next 50 years.',
      image: '',
      price: '₹40,00,000',
      duration: 'onwards / project',
      badge: 'Consulting',
      features: [
        'Land use & zoning strategy',
        'Infrastructure planning & utilities',
        'Environmental impact assessment',
        'Community engagement workshops',
        'Phased development roadmap',
      ],
    },
  ],
  projects: [
    {
      id: 'p1',
      title: 'The Verdant Villa, Coorg',
      description:
        'A 6,800 sq.ft. luxury retreat in the Western Ghats. Designed around old-growth trees using reclaimed Mangalore tiles and basalt stone. Winner of IIA Award 2023.',
      category: 'Residential',
      year: '2023',
      images: [{ url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=700&q=80', alt: 'Verdant Villa' }],
      tags: ['Sustainable', 'Luxury', 'Passive Cooling', 'Stone & Wood'],
      link: '#',
    },
    {
      id: 'p2',
      title: 'Namma Hub, Bangalore',
      description:
        'A 240,000 sq.ft. co-working and retail complex in Whitefield. Biophilic design with sky gardens on every floor. LEED Platinum certified. 3,200 daily workers.',
      category: 'Commercial',
      year: '2022',
      images: [{ url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80', alt: 'Namma Hub' }],
      tags: ['LEED Platinum', 'Biophilic', 'Mixed-Use', 'Smart Building'],
      link: '#',
    },
    {
      id: 'p3',
      title: 'Kala Bhavan Cultural Centre, Mysuru',
      description:
        '18,000 sq.ft. cultural centre celebrating Karnataka arts. 400-seat auditorium, three galleries, open-air amphitheatre. Commissioned by the Karnataka state government.',
      category: 'Cultural',
      year: '2021',
      images: [{ url: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?w=700&q=80', alt: 'Kala Bhavan' }],
      tags: ['Cultural', 'Government', 'Civic', 'Heritage Inspired'],
      link: '#',
    },
    {
      id: 'p4',
      title: 'Sunrise Township Masterplan, Hosur',
      description:
        '250-acre integrated township for 12,000 residents. 30% green space, solar-powered streets, pedestrian-first network. Shortlisted for Aga Khan Award.',
      category: 'Urban Planning',
      year: '2020',
      images: [{ url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&q=80', alt: 'Sunrise Township' }],
      tags: ['Urban Planning', 'Township', 'Solar', 'Pedestrian-First'],
      link: '#',
    },
  ],
  skills: [
    { name: 'AutoCAD & Revit BIM', level: 96, category: 'Design & Architecture' },
    { name: 'Sustainable Design (LEED)', level: 92, category: 'Design & Architecture' },
    { name: '3D Visualization (Rhino)', level: 88, category: 'Design & Architecture' },
    { name: 'Parametric Design', level: 80, category: 'Design & Architecture' },
    { name: 'Concept & Sketch Art', level: 95, category: 'Design & Architecture' },
    { name: 'Site Supervision', level: 94, category: 'Project Management' },
    { name: 'Client Communication', level: 98, category: 'Project Management' },
    { name: 'Urban Masterplanning', level: 85, category: 'Project Management' },
    { name: 'Budget & Cost Control', level: 87, category: 'Project Management' },
    { name: 'Heritage Restoration', level: 78, category: 'Project Management' },
  ],
  certifications: [
    { title: 'Council of Architecture Registered Architect', issuer: 'Council of Architecture, India', year: '2011' },
    { title: 'LEED AP Building Design + Construction', issuer: 'U.S. Green Building Council', year: '2015' },
    { title: 'GRIHA Evaluator Certification', issuer: 'The Energy and Resources Institute', year: '2017' },
    { title: 'Autodesk Revit Architecture Professional', issuer: 'Autodesk', year: '2018' },
    { title: 'IIA Fellow — Indian Institute of Architects', issuer: 'Indian Institute of Architects', year: '2021' },
    { title: 'Passive House Designer Certification', issuer: 'Passive House Institute, Germany', year: '2019' },
  ],
  gallery: [
    { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6d9e3e46?w=400&q=75', alt: 'Living space', category: 'Interior' },
    { url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&q=75', alt: 'Kitchen', category: 'Residential' },
    { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&q=75', alt: 'Architecture detail', category: 'Detail' },
    { url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&q=75', alt: 'Pool terrace', category: 'Luxury' },
    { url: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=400&q=75', alt: 'Modern interior', category: 'Interior' },
    { url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=75', alt: 'Exterior', category: 'Exterior' },
    { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=75', alt: 'Office space', category: 'Commercial' },
    { url: 'https://images.unsplash.com/photo-1574359411659-15573a27fd0c?w=400&q=75', alt: 'Night view', category: 'Night View' },
  ],
  testimonials: [
    { id: 't1', name: 'Priya Krishnamurthy', role: 'Homeowner, Coorg', rating: 5, text: 'Arjun transformed our Coorg estate beyond imagination. He understood the land, the light, and our family\'s soul. Every room feels intentional and alive. Truly a master of his craft.', date: 'Dec 2023' },
    { id: 't2', name: 'Rajan Nair', role: 'CEO, Namma Ventures', rating: 5, text: 'Namma Hub would not exist as it does without Arjun\'s vision. He challenged every conventional assumption about workspace design and delivered a building our employees love.', date: 'Mar 2023' },
    { id: 't3', name: 'Shekhar Gowda', role: 'Director, Karnataka Arts Council', rating: 5, text: 'The Kala Bhavan project was complex — government timelines, budget pressures, community expectations. Arjun navigated it with grace and delivered a landmark Mysuru is proud of.', date: 'Aug 2022' },
    { id: 't4', name: 'Anil Reddy', role: 'MD, Reddy Infracon', rating: 5, text: "We've worked with many architects across India. Arjun stands apart in his clarity of thought, commitment to sustainability, and genuine care for the end user of each space.", date: 'Nov 2022' },
    { id: 't5', name: 'Meena & Vikram Shah', role: 'Homeowners, Bangalore', rating: 5, text: 'From the first sketch to the final walk-through, working with Arjun was joyful and collaborative. Our new home is a conversation starter at every gathering.', date: 'Feb 2023' },
    { id: 't6', name: 'Kavitha Menon', role: 'CFO, GreenBuild Group', rating: 5, text: "Arjun's mastery of passive design reduced our building's energy costs by 38%. He doesn't just design beautiful spaces — he designs intelligent ones.", date: 'Jun 2023' },
  ],
  faq: [
    { question: 'How long does a typical residential project take?', answer: 'A typical residential project takes 12–24 months from concept to completion — 2–3 months design, 1–2 months approvals, and 9–18 months construction. We provide a detailed schedule at inception so you always know what\'s next.' },
    { question: 'Do you work outside Bangalore?', answer: 'We regularly work across South India — Coorg, Mysuru, Chennai, Hyderabad, Goa — and have completed projects in Delhi NCR, Mumbai, Singapore, and UAE. Travel costs are discussed transparently upfront.' },
    { question: 'What is your design fee structure?', answer: 'Fees are typically 6–12% of construction cost depending on complexity. For large commercial projects, we work on retainer-plus-milestone models. All structures are transparent and documented in the appointment letter.' },
    { question: 'Can you handle government approvals and permits?', answer: 'Yes. Our team has extensive experience with BBMP, BDA, BMRDA, and various municipal bodies. We handle building plan sanctions, commencement certificates, occupancy certificates, and specialist NoCs.' },
    { question: 'Do you offer sustainable design as a default?', answer: 'Sustainability is baked into every project — passive cooling, natural ventilation, rainwater harvesting, high-performance glazing. For formal certification we guide through LEED, GRIHA, and IGBC pathways.' },
  ],
  contact: {
    email: 'arjun@mehta-architects.in',
    phone: '+91 98800 01234',
    whatsapp: '+91 98800 01234',
    address: '14, Lavelle Road, Ashok Nagar, Bangalore – 560001, Karnataka',
    map: { lat: 12.9716, lng: 77.5946, zoom: 14 },
    workingHours: [
      { day: 'Monday – Friday', hours: '9:00 AM – 7:00 PM', closed: false },
      { day: 'Saturday', hours: '10:00 AM – 4:00 PM', closed: false },
      { day: 'Sunday', hours: '', closed: true },
    ],
  },
  socialLinks: [
    { platform: 'LinkedIn', url: '#', icon: '🔗' },
    { platform: 'Instagram', url: '#', icon: '📸' },
    { platform: 'Twitter', url: '#', icon: '🐦' },
    { platform: 'Behance', url: '#', icon: '🎨' },
    { platform: 'YouTube', url: '#', icon: '▶️' },
  ],
};

export default portfolioData;