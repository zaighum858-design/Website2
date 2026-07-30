export interface Project {
  id: string;
  title: string;
  client: string;
  category: 'software' | 'web-mobile' | 'ai' | 'cloud-web3';
  categoryLabel: string;
  description: string;
  fullCaseStudy: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  image: string;
  featured: boolean;
  year: string;
  architecture: string[];
  demoUrl?: string;
}

export interface SolutionPillar {
  id: string;
  title: string;
  tagline: string;
  iconName: string;
  description: string;
  items: string[];
  techStack: string[];
  highlightMetric: string;
  image: string;
}

export interface ApproachStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  duration: string;
}

export interface Metric {
  label: string;
  value: string;
  suffix?: string;
  prefix?: string;
  description: string;
}

export interface Industry {
  id: string;
  title: string;
  description: string;
  icon: string;
  useCases: string[];
  image: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
}
