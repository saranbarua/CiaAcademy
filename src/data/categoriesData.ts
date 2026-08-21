import { CategoryInfo } from '../types';

export const categoriesData: CategoryInfo[] = [
  {
    id: 'security',
    name: 'Security & SIA Licencing',
    slug: 'security',
    iconName: 'ShieldCheck',
    tagline: 'Get Licensed & Employed in the UK Security Industry',
    description: 'Accredited SIA security training programs designed to qualify you for Door Supervision, CCTV surveillance, and specialized security roles.',
    color: 'from-violet-600 to-indigo-700',
    accentColor: '#7C3AED',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    courseCount: 5,
    popularCert: 'SIA Door Supervisor & CCTV'
  },
  {
    id: 'construction',
    name: 'Construction & Health & Safety',
    slug: 'construction',
    iconName: 'HardHat',
    tagline: 'Official CSCS Green Card & CITB Training',
    description: 'Essential health & safety qualifications for site operatives, site supervisors, and project engineers entering the UK construction sector.',
    color: 'from-amber-600 to-orange-600',
    accentColor: '#F97316',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    courseCount: 4,
    popularCert: 'Level 1 Health & Safety + CSCS'
  },
  {
    id: 'business',
    name: 'Business & Management',
    slug: 'business',
    iconName: 'Briefcase',
    tagline: 'Executive Leadership & Strategic Administration',
    description: 'UK Ofqual-regulated diplomas in business management, leadership, marketing, and corporate strategy with direct university top-up pathways.',
    color: 'from-blue-600 to-indigo-800',
    accentColor: '#4F46E5',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    courseCount: 4,
    popularCert: 'Level 5 Diploma in Leadership'
  },
  {
    id: 'health-social-care',
    name: 'Health & Social Care',
    slug: 'health-social-care',
    iconName: 'HeartHandshake',
    tagline: 'NHS & Private Care Sector Recognised Diplomas',
    description: 'Mandatory Care training, Level 2 and Level 3 Diplomas in Adult Care, Medication Administration, and Safeguarding qualifications.',
    color: 'from-teal-500 to-emerald-700',
    accentColor: '#06B6D4',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    courseCount: 4,
    popularCert: 'Level 3 Diploma in Adult Care'
  },
  {
    id: 'english',
    name: 'English & IELTS Preparation',
    slug: 'english',
    iconName: 'Languages',
    tagline: 'Target Band 7.5+ IELTS, OET & Academic English',
    description: 'Specialized language coaching for UK university entrance, visa compliance, professional registrations, and everyday business fluency.',
    color: 'from-cyan-600 to-blue-600',
    accentColor: '#0EA5E9',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    courseCount: 4,
    popularCert: 'IELTS Academic Masterclass'
  },
  {
    id: 'professional-qualifications',
    name: 'Professional Qualifications',
    slug: 'professional-qualifications',
    iconName: 'Award',
    tagline: 'Globally Valued Certifications (ACCA, AAT, TEFL)',
    description: 'High-impact accounting, finance, procurement, and teaching credentials recognized by global employers and statutory boards.',
    color: 'from-purple-600 to-pink-600',
    accentColor: '#A855F7',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    courseCount: 4,
    popularCert: 'ACCA Foundation & Applied Skills'
  }
];
