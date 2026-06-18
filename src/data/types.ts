export interface Project {
  id: string;
  title: string;
  description?: string;
  longDescription?: string;
  technologies: string[];
  imageUrl?: string;
  links?: {
    live?: string;
    github?: string;
  };
  startDate?: string;
  endDate?: string;
  metrics?: Record<string, string>;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  graduationYear?: number | string;
  completionYear?: number | string;
  gpa?: string;
  highlights?: string[];
  imageUrl?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issuedDate?: string;
  expiryDate?: string;
  credentialUrl?: string;
  credentialId?: string;
  score?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  achievements?: string[];
}

export interface GitHubRepo {
  id: string;
  name: string;
  description: string;
  url: string;
  stars?: number;
  language?: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    bio: string;
    location?: string;
    email: string;
    phone?: string;
    avatar?: string;
    headerImage?: string;
    tagline: string;
  };
  education: Education[];
  skills: Record<string, string[]>;
  projects: Project[];
  certifications: Certification[];
  githubRepos?: GitHubRepo[];
  experience?: Experience[];
  social: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    email?: string;
  };
  languages?: { name: string; proficiency: string }[];
  about: {
    headline: string;
    story: string;
    personalInterests?: string[];
    availability?: string;
  };
}
