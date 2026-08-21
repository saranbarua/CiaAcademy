import { Course } from '../types';

export const coursesData: Course[] = [
  // 1. Security & SIA
  {
    id: 'sia-door-supervisor',
    slug: 'sia-door-supervisor-course',
    title: 'SIA Door Supervisor Licence Course',
    category: 'security',
    categoryName: 'Security & SIA Licencing',
    badge: 'High Demand',
    shortDescription: 'Qualify for your SIA Door Supervisor licence to work in clubs, bars, events, retail, airports, and corporate venues across the UK.',
    fullDescription: 'The Level 2 Award for Door Supervisors in the Private Security Industry (RQF) is a mandatory qualification required by the Security Industry Authority (SIA) to apply for a Door Supervisor licence. This comprehensive 6-day training covers physical intervention techniques, conflict management, civil and criminal law, emergency first aid (EFAW), and counter-terrorism awareness.',
    level: 'Level 2 RQF / SIA Accredited',
    duration: '6 Days (Including First Aid)',
    studyMode: 'Classroom',
    price: 249,
    originalPrice: 299,
    fundingAvailable: true,
    rating: 4.9,
    reviewsCount: 342,
    enrolledCount: 1850,
    image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    featured: true,
    awardingBody: 'Highfield Qualifications / SIA',
    accreditationIcon: 'ShieldCheck',
    learningOutcomes: [
      'Understand private security industry principles and UK legal frameworks',
      'Master physical intervention techniques and safe escorting practices',
      'Handle high-stress conflict resolution and de-escalation',
      'Gain official Emergency First Aid at Work (EFAW) certification',
      'Learn emergency evacuation and terror threat counter-procedures (ACT)'
    ],
    modules: [
      {
        title: 'Unit 1: Principles of Working in the Private Security Industry',
        duration: '1.5 Days',
        topics: ['Legislation and civil/criminal law', 'Health and safety', 'Fire safety and evacuation', 'Customer care and communication', 'Terrorism response']
      },
      {
        title: 'Unit 2: Principles of Working as a Door Supervisor',
        duration: '1.5 Days',
        topics: ['Behavioural standards', 'Licensing law & venue entry rules', 'Search procedures & contraband handling', 'Arrest procedures & evidence logging']
      },
      {
        title: 'Unit 3: Conflict Management for the Private Security Industry',
        duration: '1 Day',
        topics: ['Defusing hostile situations', 'Non-verbal communication', 'Post-incident support', 'Risk reduction strategies']
      },
      {
        title: 'Unit 4: Physical Intervention Skills for the Security Industry',
        duration: '2 Days',
        topics: ['Escorting & guiding holds', 'Breakaway techniques', 'Duty of care and positional asphyxia risks', 'Practical assessed scenarios']
      }
    ],
    entryRequirements: [
      'Minimum age of 18 years old',
      'Proof of Right to Work in the UK / Valid Photo ID',
      'Basic English communication proficiency (Level 1 equivalent)'
    ],
    targetAudience: [
      'Individuals seeking flexible, well-paid security roles',
      'Students looking for weekend and evening employment',
      'Career changers entering the corporate security and event sectors'
    ],
    careerOpportunities: [
      { role: 'Door Supervisor / Event Security', avgSalary: '£13.50 - £18.00 / hr' },
      { role: 'Corporate Front of House Security', avgSalary: '£28,000 - £34,000 / yr' },
      { role: 'Hospital & Retail Security Officer', avgSalary: '£14.00 - £17.50 / hr' }
    ],
    assessmentMethod: 'Multiple-choice examinations and practical physical intervention assessments.',
    upcomingDates: [
      { date: 'Next Monday (Weekly Batches)', location: 'Central London Campus / Birmingham', seatsLeft: 4 },
      { date: 'Weekend Fast-Track (2 Consecutive Weekends)', location: 'London East Campus', seatsLeft: 6 },
      { date: '1st of Next Month', location: 'Manchester & Leeds', seatsLeft: 8 }
    ],
    faqs: [
      {
        question: 'Does this course include Emergency First Aid at Work (EFAW)?',
        answer: 'Yes! Our course fully includes the mandatory Level 3 Emergency First Aid at Work (EFAW) certification at no extra cost, fulfilling the SIA licensing requirement.'
      },
      {
        question: 'How quickly do I get my exam results?',
        answer: 'Results are typically released within 5 to 7 working days. We upload your pass credentials directly to the SIA database for instant licence processing.'
      },
      {
        question: 'Can a Door Supervisor work as a standard Security Guard?',
        answer: 'Yes. An SIA Door Supervisor licence is a higher-tier qualification that permits you to perform both Door Supervision and standard Static Security Guarding roles.'
      }
    ]
  },
  {
    id: 'sia-cctv-operator',
    slug: 'sia-cctv-operator-course',
    title: 'SIA CCTV Public Space Surveillance Course',
    category: 'security',
    categoryName: 'Security & SIA Licencing',
    badge: 'Popular',
    shortDescription: 'Become a certified CCTV Operator and work in control rooms, smart city surveillance, transportation hubs, and retail control centres.',
    fullDescription: 'The Level 2 Award for CCTV Operations (Public Space Surveillance) within the Private Security Industry equips you with the legal and technical skills required to operate commercial and municipal CCTV systems. Learn the GDPR legislation, Data Protection Act compliance, evidence handling for UK police, and camera tracking techniques.',
    level: 'Level 2 RQF / SIA Certified',
    duration: '3 Days',
    studyMode: 'Classroom',
    price: 199,
    originalPrice: 249,
    fundingAvailable: true,
    rating: 4.85,
    reviewsCount: 189,
    enrolledCount: 940,
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    featured: false,
    awardingBody: 'Highfield Qualifications',
    accreditationIcon: 'ShieldCheck',
    learningOutcomes: [
      'Operate advanced PTZ cameras and multi-screen monitoring systems',
      'Understand CCTV codes of practice, GDPR, and human rights legislation',
      'Preserve and export video evidence for court proceedings',
      'Collaborate with police control rooms and emergency responders during live incidents'
    ],
    modules: [
      {
        title: 'Unit 1: Principles of Working in the Private Security Industry',
        duration: '1 Day',
        topics: ['Role of the private security industry', 'Emergency procedures', 'Standards of behaviour']
      },
      {
        title: 'Unit 2: CCTV Operations and Public Space Surveillance',
        duration: '2 Days',
        topics: ['Data Protection Act & Surveillance Camera Code', 'Camera equipment and controls', 'Incident management and tracking', 'Evidence logging and audit trails']
      }
    ],
    entryRequirements: [
      'Minimum age of 18',
      'Proof of Right to Work in the UK',
      'Competent basic IT navigation and English fluency'
    ],
    targetAudience: [
      'Security professionals wanting climate-controlled control room roles',
      'Individuals interested in smart surveillance and municipal operations'
    ],
    careerOpportunities: [
      { role: 'CCTV Control Room Operator', avgSalary: '£14.00 - £19.50 / hr' },
      { role: 'Transport Hub Surveillance Specialist', avgSalary: '£30,000 - £36,000 / yr' }
    ],
    assessmentMethod: 'Multiple-choice exams and practical CCTV console exercise assessment.',
    upcomingDates: [
      { date: 'Every Wednesday', location: 'London & Manchester', seatsLeft: 5 },
      { date: 'Mid-Month Batch', location: 'Birmingham', seatsLeft: 7 }
    ],
    faqs: [
      {
        question: 'Can I combine this with the Door Supervisor course?',
        answer: 'Yes! We offer a discounted Combo Security Package (Door Supervisor + CCTV Operator) allowing you to hold dual licences.'
      }
    ]
  },
  {
    id: 'sia-topup-training',
    slug: 'sia-topup-training-door-supervisor',
    title: 'SIA Top-Up Training for Door Supervisors',
    category: 'security',
    categoryName: 'Security & SIA Licencing',
    badge: 'Mandatory for Renewal',
    shortDescription: 'Mandatory 2-day refresher training required by the SIA to renew your Door Supervisor licence, covering updated physical intervention and terror response.',
    fullDescription: 'If your SIA Door Supervisor licence is due for renewal, you must complete the SIA Top-Up Refresher Course. This updated curriculum includes terror threat awareness, updated physical intervention techniques, and critical equipment management.',
    level: 'Level 2 Refresher',
    duration: '2 Days',
    studyMode: 'Classroom',
    price: 139,
    originalPrice: 179,
    fundingAvailable: false,
    rating: 4.92,
    reviewsCount: 512,
    enrolledCount: 2400,
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80',
    featured: false,
    awardingBody: 'Highfield / SIA',
    accreditationIcon: 'ShieldCheck',
    learningOutcomes: [
      'Meet SIA mandatory licence renewal standards',
      'Re-qualify on physical intervention skills and positional asphyxia',
      'Complete Counter-Terrorism Action (ACT) training'
    ],
    modules: [
      {
        title: 'Top-Up Physical Intervention & Safety',
        duration: '1 Day',
        topics: ['Revised hold techniques', 'Vulnerability awareness', 'First aid refresher check']
      },
      {
        title: 'Terrorism & Crowd Safety Updates',
        duration: '1 Day',
        topics: ['ACT e-learning verification', 'Emergency evacuation protocols', 'Knowledge exam']
      }
    ],
    entryRequirements: [
      'Existing or recently expired SIA Door Supervisor licence',
      'Valid First Aid at Work or EFAW certificate'
    ],
    targetAudience: ['Existing SIA licence holders needing licence renewal'],
    careerOpportunities: [
      { role: 'Renewed SIA Door Supervisor', avgSalary: '£14.00 - £18.50 / hr' }
    ],
    assessmentMethod: 'Multiple-choice test and practical physical check.',
    upcomingDates: [
      { date: 'Every Tuesday & Thursday', location: 'All UK Centres', seatsLeft: 8 }
    ],
    faqs: [
      {
        question: 'Do I need First Aid before doing Top-Up?',
        answer: 'Yes, you must have a valid EFAW or FAW certificate. If you do not have one, you can add our 1-day EFAW module prior to the course.'
      }
    ]
  },

  // 2. Construction & CSCS
  {
    id: 'cscs-green-card-package',
    slug: 'cscs-green-card-course-package',
    title: 'CSCS Green Card Complete Package (Level 1 H&S + CITB Test)',
    category: 'construction',
    categoryName: 'Construction & Health & Safety',
    badge: 'Fast Track',
    shortDescription: 'All-inclusive package to get your official CSCS Labourer Green Card. Includes Level 1 Health & Safety course, CITB Operatives Test, and Card application.',
    fullDescription: 'To work on any commercial or residential construction site in the UK, holding an official CSCS Green Card is mandatory. Our complete package provides the Ofqual-regulated Level 1 Award in Health and Safety in a Construction Environment, full CITB Operatives test preparation and booking, and direct card application assistance.',
    level: 'Level 1 RQF / CSCS Approved',
    duration: '1 Day + Exam',
    studyMode: 'Classroom',
    price: 185,
    originalPrice: 220,
    fundingAvailable: true,
    rating: 4.95,
    reviewsCount: 620,
    enrolledCount: 3100,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    featured: true,
    awardingBody: 'CITB / Qualsafe Awards',
    accreditationIcon: 'HardHat',
    learningOutcomes: [
      'Understand UK construction site health, safety, and welfare regulations',
      'Identify hazards involving working at height, excavation, and manual handling',
      'Safely operate around site plant, heavy machinery, and electrical supplies',
      'Pass the official CITB Health, Safety & Environment test with high score'
    ],
    modules: [
      {
        title: 'Module 1: Principles of Risk Assessment in Construction',
        duration: '2 Hours',
        topics: ['Risk assessments & method statements (RAMS)', 'Hazard identification', 'Site induction rules']
      },
      {
        title: 'Module 2: Safe Working at Height & Manual Handling',
        duration: '2 Hours',
        topics: ['Scaffolding and ladder safety', 'Ergonomic lifting techniques', 'PPE standards']
      },
      {
        title: 'Module 3: Hazardous Substances & Environmental Safety',
        duration: '2 Hours',
        topics: ['COSHH regulations', 'Asbestos awareness basics', 'Noise and vibration risks', 'Fire prevention']
      }
    ],
    entryRequirements: [
      'Minimum age 16',
      'Valid UK ID or Passport',
      'No previous construction experience needed'
    ],
    targetAudience: [
      'Anyone wanting to work on UK construction sites as a labourer, trade assistant, or site operative'
    ],
    careerOpportunities: [
      { role: 'Construction Site Labourer', avgSalary: '£13.00 - £17.00 / hr' },
      { role: 'Trade Assistant / Builder Apprentice', avgSalary: '£26,000 - £32,000 / yr' }
    ],
    assessmentMethod: 'Level 1 multiple-choice exam + CITB Touchscreen Test.',
    upcomingDates: [
      { date: 'Daily Sessions (Mon - Sat)', location: 'London, Birmingham, Manchester, Leeds', seatsLeft: 6 }
    ],
    faqs: [
      {
        question: 'How long is the CSCS Green Card valid for?',
        answer: 'The CSCS Green Labourer Card is valid for 5 years and can be easily renewed afterwards.'
      },
      {
        question: 'What is your first-time pass rate?',
        answer: 'We maintain a 98.2% first-time pass rate with free re-sits included in your package if needed.'
      }
    ]
  },
  {
    id: 'citb-site-safety-plus-sssts',
    slug: 'sssts-site-supervisors-safety-training-scheme',
    title: 'CITB SSSTS Site Supervisors Safety Training Scheme',
    category: 'construction',
    categoryName: 'Construction & Health & Safety',
    badge: 'Supervisory',
    shortDescription: 'The industry-standard 2-day qualification for first-line managers and site supervisors responsible for site health & safety.',
    fullDescription: 'The Site Supervisor Safety Training Scheme (SSSTS) is an accredited CITB course specifically structured for site supervisors, team leaders, and gangers. It ensures you understand your legal duties under the Health and Safety at Work Act 1974 and how to foster a proactive safety culture on site.',
    level: 'CITB Site Safety Plus',
    duration: '2 Days',
    studyMode: 'Blended',
    price: 295,
    originalPrice: 350,
    fundingAvailable: false,
    rating: 4.88,
    reviewsCount: 142,
    enrolledCount: 720,
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
    featured: false,
    awardingBody: 'CITB Site Safety Plus',
    accreditationIcon: 'HardHat',
    learningOutcomes: [
      'Execute supervisor health & safety legal duties',
      'Deliver effective Toolbox Talks and site safety briefings',
      'Conduct dynamic risk assessments and manage subcontractor compliance',
      'Investigate site incidents and implement corrective measures'
    ],
    modules: [
      {
        title: 'Supervisory Responsibilities & Legal Framework',
        duration: 'Day 1',
        topics: ['HASAWA 1974', 'CDM Regulations 2015', 'Enforcement and HSE notices']
      },
      {
        title: 'Site Safety Delivery & Practical Supervision',
        duration: 'Day 2',
        topics: ['Delivering Toolbox Talks', 'Managing high-risk activities', 'Final multiple-choice examination']
      }
    ],
    entryRequirements: ['Good command of English', 'Experience on construction sites recommended'],
    targetAudience: ['Site supervisors, foremen, team leaders, and newly promoted managers'],
    careerOpportunities: [
      { role: 'Site Supervisor / Foreman', avgSalary: '£38,000 - £48,000 / yr' },
      { role: 'Assistant Site Manager', avgSalary: '£45,000 - £55,000 / yr' }
    ],
    assessmentMethod: 'Continuous classroom assessment, toolbox talk delivery, and multiple-choice examination.',
    upcomingDates: [
      { date: 'Next Tuesday & Wednesday', location: 'London & Online Zoom', seatsLeft: 4 }
    ],
    faqs: [
      {
        question: 'Is the certificate valid across all major UK contractors?',
        answer: 'Yes, CITB SSSTS is recognized by Build UK and all tier-1 contractors across the UK.'
      }
    ]
  },

  // 3. Business & Leadership
  {
    id: 'level-5-diploma-business-management',
    slug: 'level-5-diploma-business-management-leadership',
    title: 'Level 5 Extended Diploma in Business & Strategic Leadership',
    category: 'business',
    categoryName: 'Business & Management',
    badge: 'University Fast-Track',
    shortDescription: 'Equivalent to Year 2 of a UK Bachelor Degree (240 Credits). Qualifies you for final-year direct entry (Top-Up) to a UK BA (Hons) degree.',
    fullDescription: 'The Level 5 Extended Diploma in Business Management is an Ofqual-regulated higher education qualification. It is designed to develop strategic management, financial analysis, operations, marketing, and leadership competencies. Successful completion allows direct progression to the final year (Top-Up) of a UK Bachelor’s degree at dozens of leading UK universities.',
    level: 'Level 5 (Ofqual Regulated - 240 Credits)',
    duration: '9 to 12 Months',
    studyMode: 'Blended',
    price: 1850,
    originalPrice: 2400,
    fundingAvailable: true,
    rating: 4.96,
    reviewsCount: 210,
    enrolledCount: 650,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    featured: true,
    awardingBody: 'OTHM / Pearson Edexcel / Qualifi',
    accreditationIcon: 'Briefcase',
    learningOutcomes: [
      'Master strategic decision-making, organisational dynamics, and change management',
      'Conduct corporate financial analysis and budget forecasting',
      'Formulate global marketing and international business strategies',
      'Directly progress to the final year (Top-Up) of a UK Bachelor Degree (BA Hons)'
    ],
    modules: [
      {
        title: 'Core Management Modules',
        duration: 'Term 1',
        topics: ['Business Research Methods', 'Strategic Marketing Management', 'Human Resource Planning']
      },
      {
        title: 'Executive Leadership & Strategy',
        duration: 'Term 2',
        topics: ['Financial Decision Making', 'Operations & Supply Chain Management', 'Strategic Leadership Project']
      }
    ],
    entryRequirements: [
      'Level 3 qualification (A-Levels / BTEC / High School Diploma) OR 2+ years relevant work experience',
      'IELTS 5.5 or equivalent English fluency'
    ],
    targetAudience: [
      'Students wanting an affordable fast-track route to a UK university degree',
      'Working professionals seeking accelerated career progression into senior management'
    ],
    careerOpportunities: [
      { role: 'Operations & Business Manager', avgSalary: '£42,000 - £56,000 / yr' },
      { role: 'Strategy & Project Consultant', avgSalary: '£48,000 - £65,000 / yr' }
    ],
    assessmentMethod: 'Assignment-based coursework and business project reports (No written exams).',
    upcomingDates: [
      { date: 'Autumn Intake (October)', location: 'Campus & Online Portal', seatsLeft: 12 },
      { date: 'Spring Intake (February)', location: 'Campus & Online Portal', seatsLeft: 15 }
    ],
    faqs: [
      {
        question: 'Which UK universities accept this for BA (Hons) Top-Up?',
        answer: 'Over 40 UK universities including University of Sunderland, Anglia Ruskin University, University of Northampton, and Buckinghamshire New University accept this diploma for direct final-year entry.'
      }
    ]
  },
  {
    id: 'level-3-business-administration',
    slug: 'level-3-diploma-business-administration',
    title: 'Level 3 Diploma in Business Administration',
    category: 'business',
    categoryName: 'Business & Management',
    badge: 'Foundation',
    shortDescription: 'Master office administration, corporate communication, business finance, and project coordination for immediate entry into corporate environments.',
    fullDescription: 'The Level 3 Diploma in Business Administration provides the core foundational skills required to excel in modern office environments, customer relationship management, financial documentation, and team administration.',
    level: 'Level 3 RQF (60 Credits)',
    duration: '6 Months',
    studyMode: 'Online Live',
    price: 850,
    originalPrice: 1100,
    fundingAvailable: true,
    rating: 4.82,
    reviewsCount: 164,
    enrolledCount: 520,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    featured: false,
    awardingBody: 'City & Guilds / Pearson',
    accreditationIcon: 'Briefcase',
    learningOutcomes: [
      'Manage office workflows, executive schedules, and corporate databases',
      'Create high-impact business presentations and financial reports',
      'Support project teams and streamline digital workplace communication'
    ],
    modules: [
      {
        title: 'Administrative Systems & Documentation',
        duration: '3 Months',
        topics: ['Business document production', 'Data management and GDPR', 'Customer relations']
      },
      {
        title: 'Operational Support & Team Coordination',
        duration: '3 Months',
        topics: ['Budget tracking', 'Meeting coordination', 'Event management']
      }
    ],
    entryRequirements: ['Good general education (GCSE grade C/4 or equivalent)'],
    targetAudience: ['School leavers, administrative officers, and corporate support staff'],
    careerOpportunities: [
      { role: 'Executive Assistant / Office Coordinator', avgSalary: '£26,000 - £34,000 / yr' }
    ],
    assessmentMethod: 'Portfolio of evidence and practical assignments.',
    upcomingDates: [
      { date: 'Flexible Monthly Start Dates', location: 'Virtual Learning Environment', seatsLeft: 20 }
    ],
    faqs: [
      {
        question: 'Can I study this while working full-time?',
        answer: 'Yes, this course offers flexible evening live webinars and recorded self-paced learning.'
      }
    ]
  },

  // 4. Health & Social Care
  {
    id: 'level-3-diploma-adult-care',
    slug: 'level-3-diploma-adult-care-health-social',
    title: 'Level 3 Diploma in Adult Care (RQF)',
    category: 'health-social-care',
    categoryName: 'Health & Social Care',
    badge: 'NHS & Care Sector Recognized',
    shortDescription: 'The gold-standard UK qualification for Senior Care Workers, Healthcare Assistants, and Support Leaders in residential, nursing, and community care.',
    fullDescription: 'The Level 3 Diploma in Adult Care (RQF) is the definitive qualification for lead adult care workers in England and Wales. It demonstrates professional competence across duty of care, safeguarding vulnerable adults, person-centred care planning, dementia support, and medication management.',
    level: 'Level 3 RQF (58 Credits)',
    duration: '6 to 9 Months',
    studyMode: 'Blended',
    price: 980,
    originalPrice: 1300,
    fundingAvailable: true,
    rating: 4.93,
    reviewsCount: 380,
    enrolledCount: 1420,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    featured: true,
    awardingBody: 'Highfield / NCFE CACHE / Qualsafe',
    accreditationIcon: 'HeartHandshake',
    learningOutcomes: [
      'Promote person-centred values, dignity, and independence in care settings',
      'Implement robust safeguarding procedures and infection control protocols',
      'Lead and mentor junior care assistants and manage medication safely',
      'Qualify for sponsorship-eligible Senior Care Worker roles in the UK'
    ],
    modules: [
      {
        title: 'Core Healthcare Competencies',
        duration: 'Phase 1',
        topics: ['Duty of care and ethical dilemmas', 'Promoting equality and inclusion', 'Infection prevention and control']
      },
      {
        title: 'Specialist Clinical & Senior Support',
        duration: 'Phase 2',
        topics: ['Medication administration protocols', 'Dementia awareness and care pathways', 'End of life care planning']
      }
    ],
    entryRequirements: [
      'Employment or voluntary placement in an adult care setting (minimum 100 hours)',
      'DBS Enhanced Check clearance',
      'English proficiency at Level 1 or above'
    ],
    targetAudience: [
      'Care workers aiming for promotion to Senior Care Worker or Care Team Leader',
      'International nurses and healthcare professionals seeking UK qualification equivalence'
    ],
    careerOpportunities: [
      { role: 'Senior Healthcare Assistant (NHS / Private)', avgSalary: '£25,000 - £31,000 / yr' },
      { role: 'Care Team Leader / Field Care Supervisor', avgSalary: '£29,000 - £36,000 / yr' }
    ],
    assessmentMethod: 'Workplace observation by certified assessor and portfolio of practical evidence.',
    upcomingDates: [
      { date: 'Open Enrollment (Start Any Monday)', location: 'Blended Workplace & Online', seatsLeft: 10 }
    ],
    faqs: [
      {
        question: 'Does this qualification qualify for UK Skilled Worker Health & Care Visa roles?',
        answer: 'Yes! Level 3 Diploma in Adult Care is the standard qualification required for Senior Care Worker job roles in the UK.'
      }
    ]
  },
  {
    id: 'mandatory-care-training-certificate',
    slug: 'mandatory-care-training-care-certificate',
    title: 'Mandatory Care Training & Care Certificate (15 Standards)',
    category: 'health-social-care',
    categoryName: 'Health & Social Care',
    badge: 'Fast Qualification',
    shortDescription: 'Complete induction training covering the 15 standards of the UK Care Certificate. Includes Practical Moving & Handling and Basic Life Support.',
    fullDescription: 'Mandatory Care Training is an essential requirement for anyone working as a Care Assistant, Support Worker, or Healthcare Assistant in the UK. This comprehensive course covers all 15 Care Certificate standards plus hands-on moving & handling practical sessions.',
    level: 'Care Certificate Standard',
    duration: '3 Days Intensive',
    studyMode: 'Classroom',
    price: 160,
    originalPrice: 200,
    fundingAvailable: false,
    rating: 4.89,
    reviewsCount: 420,
    enrolledCount: 2100,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    featured: false,
    awardingBody: 'Skills for Care Endorsed',
    accreditationIcon: 'HeartHandshake',
    learningOutcomes: [
      'Understand the 15 standards of the UK Care Certificate',
      'Perform safe patient moving and handling with hoists and slide sheets',
      'Administer basic life support (CPR) and AED operation',
      'Demonstrate fire safety, food hygiene, and infection prevention'
    ],
    modules: [
      {
        title: 'Standards 1-8: Core Principles & Communication',
        duration: 'Day 1',
        topics: ['Understand your role', 'Your personal development', 'Duty of care', 'Equality & diversity', 'Work in a person-centred way']
      },
      {
        title: 'Standards 9-15: Clinical Safety & Safeguarding',
        duration: 'Day 2',
        topics: ['Safeguarding adults & children', 'Mental capacity act', 'Health & safety', 'Handling information']
      },
      {
        title: 'Practical Moving & Handling and BLS',
        duration: 'Day 3',
        topics: ['Manual handling practical hoist training', 'Basic Life Support (CPR + Defibrillator)', 'Scenario assessments']
      }
    ],
    entryRequirements: ['Passionate about helping people', 'Valid ID'],
    targetAudience: ['New entrants to NHS, nursing homes, and homecare agencies'],
    careerOpportunities: [
      { role: 'Care Assistant / Support Worker', avgSalary: '£12.50 - £15.00 / hr' }
    ],
    assessmentMethod: 'Practical simulation assessment and written knowledge checks.',
    upcomingDates: [
      { date: 'Every Monday to Wednesday', location: 'London Training Suite', seatsLeft: 6 }
    ],
    faqs: [
      {
        question: 'Do care agencies accept this certificate?',
        answer: 'Yes! Our certificate is fully endorsed by Skills for Care and accepted by NHS trusts and private care agencies nationwide.'
      }
    ]
  },

  // 5. English & IELTS
  {
    id: 'ielts-academic-masterclass',
    slug: 'ielts-academic-general-masterclass-band-7-plus',
    title: 'IELTS Academic & General Masterclass (Target Band 7.5+)',
    category: 'english',
    categoryName: 'English & IELTS Preparation',
    badge: 'Target Band 7.5+',
    shortDescription: 'Intensive British Council trained preparation for IELTS Academic & General. Focuses on Band 8.0 essay writing, fluent speaking, and rapid reading techniques.',
    fullDescription: 'Our IELTS Masterclass is taught exclusively by certified British Council and IDP-trained IELTS examiners. We diagnose your exact weaknesses in Writing Task 1 & 2, provide live 1-on-1 speaking interview mock exams with instant feedback, and teach proprietary speed-reading and audio tracking methods.',
    level: 'B2 / C1 / C2 Preparation',
    duration: '8 Weeks (Live Interactive)',
    studyMode: 'Blended',
    price: 320,
    originalPrice: 420,
    fundingAvailable: false,
    rating: 4.97,
    reviewsCount: 490,
    enrolledCount: 1650,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    featured: true,
    awardingBody: 'British Council Trained Faculty',
    accreditationIcon: 'Languages',
    learningOutcomes: [
      'Master the 4 evaluation criteria: Task Achievement, Coherence, Lexical Resource, and Grammatical Range',
      'Confidently write high-scoring Band 7.5+ Task 1 reports and Task 2 argument essays',
      'Speak with natural fluency, idioms, and accurate phonetics in IELTS Speaking Parts 1, 2 & 3',
      'Solve Reading section passages in under 55 minutes with 90%+ accuracy'
    ],
    modules: [
      {
        title: 'Writing Mastery (Academic & General)',
        duration: 'Weeks 1 - 3',
        topics: ['Data report structures', 'Argumentative essay templates', 'Complex grammatical patterns', 'Weekly examiner corrections']
      },
      {
        title: 'Speaking Fluency & Mock Tests',
        duration: 'Weeks 4 - 5',
        topics: ['Topic cue cards', 'Handling abstract Part 3 questions', 'Intonation and confidence coaching']
      },
      {
        title: 'Listening & Reading High-Speed Drills',
        duration: 'Weeks 6 - 8',
        topics: ['Distractor traps in Listening', 'True/False/Not Given mastery', 'Full-length timed simulated exams']
      }
    ],
    entryRequirements: ['Intermediate English level (B1 minimum)'],
    targetAudience: [
      'Students applying to UK, Canadian, or Australian universities',
      'Healthcare professionals preparing for GMC / NMC registration',
      'Skilled migrants fulfilling visa English requirements'
    ],
    careerOpportunities: [
      { role: 'University Admission Ready (UK / Global)', avgSalary: 'Degree Entry' },
      { role: 'NMC / GMC Registered Professional', avgSalary: 'NHS Band 5+' }
    ],
    assessmentMethod: 'Weekly mock exams under real exam conditions with personalized score reports.',
    upcomingDates: [
      { date: 'New Cohort Every Monday', location: 'Online Live Interactive & London Campus', seatsLeft: 8 }
    ],
    faqs: [
      {
        question: 'Are mock tests and essay corrections included?',
        answer: 'Yes! You receive unlimited essay grading from certified examiners and 4 full 1-on-1 speaking mock tests.'
      }
    ]
  },
  {
    id: 'oet-occupational-english-healthcare',
    slug: 'oet-occupational-english-test-nurses-doctors',
    title: 'OET (Occupational English Test) for Nurses & Doctors',
    category: 'english',
    categoryName: 'English & IELTS Preparation',
    badge: 'Medical English',
    shortDescription: 'Tailored English coaching for nurses and doctors seeking UK NMC/GMC registration with clinical roleplays and medical referral letter writing.',
    fullDescription: 'The Occupational English Test (OET) is the premier English test specifically designed for medical professionals. Our course focuses on clinical consultation dialogues, medical history taking, and writing precise referral and discharge letters.',
    level: 'Professional Medical English (OET Grade B+)',
    duration: '6 Weeks',
    studyMode: 'Online Live',
    price: 390,
    originalPrice: 480,
    fundingAvailable: false,
    rating: 4.94,
    reviewsCount: 175,
    enrolledCount: 580,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    featured: false,
    awardingBody: 'OET Preparation Provider',
    accreditationIcon: 'Languages',
    learningOutcomes: [
      'Attain Grade B or higher across all 4 sub-tests (Listening, Reading, Writing, Speaking)',
      'Draft concise, medically accurate discharge and referral letters',
      'Communicate with empathy, clarity, and professionalism during patient consultations'
    ],
    modules: [
      {
        title: 'OET Medical Writing & Referral Formats',
        duration: '3 Weeks',
        topics: ['Discharge summaries', 'Transfer letters', 'Case notes synthesis']
      },
      {
        title: 'Clinical Speaking Roleplays & Listening',
        duration: '3 Weeks',
        topics: ['Patient anxiety handling', 'Medical consultations', 'Clinical listening sub-tests']
      }
    ],
    entryRequirements: ['Medical or nursing background', 'Intermediate English competency'],
    targetAudience: ['International Nurses, Midwives, and Medical Doctors seeking UK registration'],
    careerOpportunities: [
      { role: 'UK Registered Nurse (NMC PIN)', avgSalary: '£32,000 - £40,000 / yr' }
    ],
    assessmentMethod: 'Simulated clinical role-play examinations and referral letter audits.',
    upcomingDates: [
      { date: 'Mid-Month Batch', location: 'Live Virtual Classroom', seatsLeft: 5 }
    ],
    faqs: [
      {
        question: 'Is OET easier than IELTS for healthcare professionals?',
        answer: 'Many nurses and doctors find OET more intuitive because the scenarios and vocabulary directly reflect their everyday hospital work.'
      }
    ]
  },

  // 6. Professional Qualifications
  {
    id: 'acca-foundation-applied-knowledge',
    slug: 'acca-accounting-foundation-applied-knowledge',
    title: 'ACCA Foundation & Applied Knowledge Course',
    category: 'professional-qualifications',
    categoryName: 'Professional Qualifications',
    badge: 'Global Finance',
    shortDescription: 'Begin your journey towards Chartered Certified Accountant (ACCA) status. Covers Business and Technology (BT), Management Accounting (MA), and Financial Accounting (FA).',
    fullDescription: 'ACCA is the world’s leading professional accountancy qualification, recognized in over 180 countries. Our expert tutors guide you through the Applied Knowledge papers, providing intensive question-practice sessions, computer-based exam (CBE) preparation, and comprehensive study notes.',
    level: 'ACCA Applied Knowledge (Papers BT, MA, FA)',
    duration: '6 Months',
    studyMode: 'Blended',
    price: 890,
    originalPrice: 1200,
    fundingAvailable: true,
    rating: 4.91,
    reviewsCount: 156,
    enrolledCount: 460,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    featured: true,
    awardingBody: 'ACCA Global / Platinum Approved Content',
    accreditationIcon: 'Award',
    learningOutcomes: [
      'Master double-entry bookkeeping, trial balance preparation, and financial statements',
      'Formulate cost accounting, budgeting, and variance analysis reports',
      'Understand corporate governance, ethics, and modern fintech environments',
      'Pass all 3 on-demand Computer-Based Exams (CBEs)'
    ],
    modules: [
      {
        title: 'Paper BT: Business and Technology',
        duration: '6 Weeks',
        topics: ['Business organisation', 'Governance & ethics', 'Leadership and digital finance']
      },
      {
        title: 'Paper MA: Management Accounting',
        duration: '8 Weeks',
        topics: ['Cost classification', 'Budgeting techniques', 'Standard costing & variance analysis']
      },
      {
        title: 'Paper FA: Financial Accounting',
        duration: '10 Weeks',
        topics: ['Double-entry principles', 'Income statements and balance sheets', 'Consolidated financial reports']
      }
    ],
    entryRequirements: ['High school diploma or university degree in any discipline'],
    targetAudience: ['Aspiring accountants, finance analysts, and audit associates'],
    careerOpportunities: [
      { role: 'Junior Accountant / Audit Assistant', avgSalary: '£28,000 - £36,000 / yr' },
      { role: 'Financial Analyst', avgSalary: '£38,000 - £50,000 / yr' }
    ],
    assessmentMethod: 'On-demand Computer-Based Examinations (CBE).',
    upcomingDates: [
      { date: 'Intakes in January, April, July & October', location: 'London Campus & Online', seatsLeft: 10 }
    ],
    faqs: [
      {
        question: 'Are CBE exam fees included?',
        answer: 'Course tuition includes full study manuals, mock testing platform, and revision bootcamps. CBE test center seat bookings can be purchased alongside your course.'
      }
    ]
  },
  {
    id: 'tefl-120-hour-certificate',
    slug: 'tefl-120-hour-premier-teacher-certification',
    title: '120-Hour Premier TEFL / TESOL Teaching Certification',
    category: 'professional-qualifications',
    categoryName: 'Professional Qualifications',
    badge: 'Teach Worldwide',
    shortDescription: 'Globally recognized 120-Hour TEFL certification to teach English online and in prestigious schools across Asia, Europe, Middle East, and Latin America.',
    fullDescription: 'The 120-hour TEFL qualification is the international baseline standard required by schools, language institutes, and online platforms worldwide. Learn modern communicative language teaching methodologies, lesson planning, classroom management, and grammar instruction.',
    level: 'Level 5 Equivalent (120 Hours)',
    duration: '4 to 8 Weeks (Self-Paced / Guided)',
    studyMode: 'Online Live',
    price: 195,
    originalPrice: 280,
    fundingAvailable: false,
    rating: 4.88,
    reviewsCount: 310,
    enrolledCount: 1190,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    featured: false,
    awardingBody: 'Accredited TEFL Provider',
    accreditationIcon: 'Award',
    learningOutcomes: [
      'Plan and execute engaging 45-minute communicative English lessons',
      'Teach phonics, vocabulary acquisition, and functional conversation',
      'Utilize digital interactive tools for remote 1-on-1 and group teaching',
      'Receive full lifetime job placement support with global partner schools'
    ],
    modules: [
      {
        title: 'Pedagogy & Lesson Planning Frameworks',
        duration: '50 Hours',
        topics: ['PPP Methodology', 'Needs analysis', 'Teaching the 4 core language skills']
      },
      {
        title: 'Grammar in Context & Classroom Management',
        duration: '40 Hours',
        topics: ['Verb tenses simplified', 'Error correction techniques', 'Young learners vs Adult pedagogy']
      },
      {
        title: 'Teaching Online & Practicum Lesson Planning',
        duration: '30 Hours',
        topics: ['Digital whiteboards', 'Virtual ESL tools', 'Assessed final lesson plan portfolio']
      }
    ],
    entryRequirements: ['Fluent English speaker (native or minimum C1 level)'],
    targetAudience: ['Graduates, career changers, digital nomads, and educators looking to travel or teach remotely'],
    careerOpportunities: [
      { role: 'Online ESL Tutor (Remote)', avgSalary: '£15.00 - £26.00 / hr' },
      { role: 'International School English Teacher', avgSalary: '£28,000 - £45,000 / yr + Housing' }
    ],
    assessmentMethod: 'Practical lesson plan portfolio assessment and knowledge quizzes.',
    upcomingDates: [
      { date: 'Instant Access (Start Today)', location: 'Global Online Learning Portal', seatsLeft: 50 }
    ],
    faqs: [
      {
        question: 'Is this certificate accepted in Japan, South Korea, and the UAE?',
        answer: 'Yes, our 120-hour certificate is fully accredited and authenticated for work visa processing across Asia, Europe, and the Middle East.'
      }
    ]
  }
];
