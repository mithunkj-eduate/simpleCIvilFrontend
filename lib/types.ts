export interface PortfolioMeta {
  slug: string;
  profession: string;
  name: string;
  tagline: string;
  description: string;
  logo?: string;
  favicon?: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
  theme?: "light" | "dark";
  accentColor?: string;
}

export interface HeroStat {
  label: string;
  value: string;
}

export interface CTAButton {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "outline";
  icon?: string;
}

export interface HeroSection {
  heading: string;
  subheading: string;
  image: string;
  carousel?: string[];
  cta: CTAButton[];
  stats?: HeroStat[];
}

export interface AboutHighlight {
  icon: string;
  title: string;
  value: string;
}

export interface AboutSection {
  title: string;
  description: string;
  image?: string;
  highlights?: AboutHighlight[];
}

export interface BusinessInfo {
  ownerName: string;
  registrationNumber?: string;
  gst?: string;
  established?: string;
  licenseNumber?: string;
  additionalInfo?: { label: string; value: string }[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image?: string;
  price?: string;
  priceUnit?: string;
  duration?: string;
  features?: string[];
  badge?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  image?: string;
  price?: string;
  category?: string;
  badge?: string;
  inStock?: boolean;
}

export interface ProjectImage {
  url: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category?: string;
  images: ProjectImage[];
  tags?: string[];
  link?: string;
  year?: string;
}

export interface Skill {
  name: string;
  level: number;
  category?: string;
  icon?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  image?: string;
  credential?: string;
}

export interface GalleryImage {
  url: string;
  alt: string;
  category?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  avatar?: string;
  rating: number;
  text: string;
  date?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface WorkingHours {
  day: string;
  hours: string;
  closed?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ContactSection {
  email?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  map?: {
    lat: number;
    lng: number;
    zoom?: number;
  };
  workingHours?: WorkingHours[];
}

export interface PortfolioData {
  meta: PortfolioMeta;
  hero: HeroSection;
  about?: AboutSection;
  businessInfo?: BusinessInfo;
  services?: Service[];
  products?: Product[];
  projects?: Project[];
  skills?: Skill[];
  certifications?: Certification[];
  gallery?: GalleryImage[];
  testimonials?: Testimonial[];
  faq?: FAQ[];
  contact?: ContactSection;
  socialLinks?: SocialLink[];
}
