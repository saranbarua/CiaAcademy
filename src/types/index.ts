export type CourseCategory = 
  | 'security' 
  | 'construction' 
  | 'business' 
  | 'health-social-care' 
  | 'english' 
  | 'professional-qualifications';

export interface CourseModule {
  title: string;
  duration: string;
  topics: string[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: CourseCategory;
  categoryName: string;
  badge?: string;
  shortDescription: string;
  fullDescription: string;
  level: string; // e.g. "Level 2 / SIA", "Level 3", "Level 5", "Professional"
  duration: string; // e.g. "6 Days", "1 Year", "12 Weeks"
  studyMode: 'Classroom' | 'Online Live' | 'Blended' | 'Fast-Track Weekend';
  price: number;
  originalPrice?: number;
  fundingAvailable?: boolean;
  rating: number;
  reviewsCount: number;
  enrolledCount: number;
  image: string;
  featured?: boolean;
  awardingBody: string;
  accreditationIcon?: string;
  learningOutcomes: string[];
  modules: CourseModule[];
  entryRequirements: string[];
  targetAudience: string[];
  careerOpportunities: {
    role: string;
    avgSalary: string;
  }[];
  assessmentMethod: string;
  upcomingDates: {
    date: string;
    location: string;
    seatsLeft: number;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface CategoryInfo {
  id: CourseCategory;
  name: string;
  slug: string;
  iconName: string;
  tagline: string;
  description: string;
  color: string;
  accentColor: string;
  image: string;
  courseCount: number;
  popularCert: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  course: string;
  country: string;
  flag: string;
  avatar: string;
  rating: number;
  quote: string;
  story: string;
  outcome: string;
  verified: boolean;
}

export interface Partner {
  id: string;
  name: string;
  type: 'Awarding Body' | 'Accreditation' | 'University Partner' | 'Industry Body';
  logoText: string;
  badge?: string;
  description: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  tags: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Courses' | 'Admissions' | 'International' | 'Exams & SIA' | 'Fees';
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  description: string;
  icon: string;
}

export interface CountryGuide {
  code: string;
  name: string;
  flag: string;
  overview: string;
  academicRequirement: string;
  englishRequirement: string;
  visaType: string;
  processingTime: string;
  popularChoices: string[];
  scholarshipAvailable: boolean;
}
