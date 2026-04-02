export interface SeoMeta {
  title: string;
  description: string;
  keywords: string[];
}

export interface Meta {
  slug: string;
  profession: string;
  name: string;
  tagline: string;
  description: string;
  seo: SeoMeta;
  accentColor: string;
}

export interface CtaButton {
  label: string;
  href: string;
  variant: "primary" | "secondary";
  icon: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface Hero {
  heading: string;
  subheading: string;
  image: string;
  carousel: string[];
  cta: CtaButton[];
  stats: Stat[];
}

export interface Highlight {
  icon: string;
  title: string;
  value: string;
}

export interface About {
  title: string;
  description: string;
  image: string;
  highlights: Highlight[];
}

export interface AdditionalInfo {
  label: string;
  value: string;
}

export interface BusinessInfo {
  ownerName: string;
  registrationNumber: string;
  gst: string;
  established: string;
  licenseNumber: string;
  additionalInfo: AdditionalInfo[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  duration: string;
  badge: string;
  features: string[];
}

export interface ProjectImage {
  url: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  year: string;
  images: ProjectImage[];
  tags: string[];
  link: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
}

export interface GalleryItem {
  url: string;
  alt: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  date: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface MapConfig {
  lat: number;
  lng: number;
  zoom: number;
}

export interface WorkingHour {
  day: string;
  hours: string;
  closed: boolean;
}

export interface Contact {
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  map: MapConfig;
  workingHours: WorkingHour[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface PortfolioData {
  meta: Meta;
  hero: Hero;
  about: About;
  businessInfo: BusinessInfo;
  services: Service[];
  projects: Project[];
  skills: Skill[];
  certifications: Certification[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  faq: FAQ[];
  contact: Contact;
  socialLinks: SocialLink[];
}
