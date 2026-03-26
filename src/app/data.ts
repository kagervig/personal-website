export const PROJECTS = [
  {
    id: 'cityhopper',
    title: 'CityHopper',
    year: '2026',
    description: 'A full-stack multi-city flight search engine built from scratch.',
    tech: ['Java', 'REST', 'React', 'Next.js', 'PostgreSQL', 'Render', 'Vercel'],
    details: [
      'Designed and built a full-stack multi-city flight search engine from scratch.',
      "Solves a real-world variant of the Travelling Salesman Problem: given a home city and up to 5 destinations, builds a weighted airport graph and applies Dijkstra's algorithm to find the cheapest or fastest itinerary.",
      'Deployed independently on Render (backend) and Vercel (frontend).'
    ]
  },
  {
    id: 'project-two',
    title: 'Project Two',
    year: '2026',
    description: 'Advanced flight search engine with complex graph algorithms.',
    tech: ['Java', 'React', 'PostgreSQL', "Dijkstra's Algorithm"],
    details: [
      'Designed and built a full-stack multi-city flight search engine from scratch: Java REST backend, React/Next.js frontend, PostgreSQL database.',
      "Solves a real-world variant of the Travelling Salesman Problem using Dijkstra's algorithm to find optimal itineraries.",
      'Focuses on high-performance data processing and intuitive UI for complex travel planning.'
    ]
  }
];

export const EXPERIENCE = [
  {
    id: 'keysight-tpm',
    company: 'Keysight Technologies',
    role: 'Technical Product Manager',
    period: '2022 – 2025',
    location: 'Stuttgart, Germany | Toronto, Canada',
    description: 'Re-architected product information management systems and automated data workflows.',
    details: [
      'Re-architected a product information management system across 4,000+ SKUs, directly contributing to $200M in new annual revenue and a 10% improvement in lead generation.',
      'Audited and remediated 90k+ product records using multi-table SQL joins and aggregations to identify data quality issues.',
      'Python scripts automated cleaning and normalisation workflows across multiple business lines.',
      'Drove roadmap alignment across senior leadership, IT, 100+ product owners and engineers company-wide.',
      'Trained 100+ users on system workflows and data ownership, reducing entry errors by 80%.'
    ]
  },
  {
    id: 'keysight-mm',
    company: 'Keysight Technologies',
    role: 'Marketing Manager, Brand',
    period: '2020 – 2022',
    location: 'Toronto, Canada',
    description: 'Consolidated brand designs and managed high-volume email marketing.',
    details: [
      'Built responsive email templates, consolidated 200+ designs into a cohesive brand.',
      'Managed 15M+ annual sends, ensuring high deliverability and engagement.',
      'Collaborated with cross-functional teams to align brand messaging across digital channels.'
    ]
  },
  {
    id: 'keysight-apm',
    company: 'Keysight Technologies',
    role: 'Associate Product Manager',
    period: '2016 – 2020',
    location: 'Toronto, Canada',
    description: 'Prioritized eCommerce roadmap and drove revenue growth.',
    details: [
      'Wrote engineering requirements to prioritise the eCommerce roadmap, driving $14.5M revenue increase.',
      'Analyzed user behavior data to identify friction points in the checkout process.',
      'Worked closely with engineering teams to deliver features on schedule.'
    ]
  },
  {
    id: 'maccoll',
    company: 'MacColl Media Ltd',
    role: 'Director & Co-Founder',
    period: '2008 – 2014',
    location: 'London, UK',
    description: 'Founded and scaled a computer hardware and services business.',
    details: [
      'Founded and scaled a computer hardware and services business to $2M in annual revenue with 7 staff.',
      'Authored ADISA-certified data destruction processes, meeting the liability transfer standards required to win contracts with the NHS and education sector.',
      'Processed over 15,000 devices per annum.'
    ]
  }
];

export const SKILLS = {
  languages: ['Java', 'SQL', 'Python', 'JavaScript', 'React', 'Git'],
  technologies: ['PostgreSQL', 'MySQL', 'Render', 'Supabase', 'Vercel', 'Next.js']
};

export const EDUCATION = [
  {
    school: 'Arizona State University',
    degree: 'CSE110: Principles of Programming',
    year: '2025',
    grade: '94%',
    logo: '/education/ASU-logo.jpg'
  },
  {
    school: 'Sheffield Hallam University',
    degree: 'BA Business & German',
    year: '2014 - 2018',
    grade: '1st Class Honours',
    logo: '/education/SHU-logo.jpg'
  },
  {
    school: 'Universität Passau',
    degree: 'Economics & German',
    year: '2016',
    grade: 'Exchange Semester',
    logo: '/education/UP-logo.jpg'
  }
];

export const PERSONAL = {
  youtube: [
    { name: 'Trail Tales Travel', url: 'https://www.youtube.com/@trailtalestravel', description: 'Travel vlogs and hiking adventures.' },
    { name: 'Drone Relaxation', url: 'https://www.youtube.com/@dronerelaxationvideos', description: 'Cinematic drone footage for relaxation.' }
  ],
  apps: [
    { name: 'Flighty', description: 'Best-in-class flight tracking.' },
    { name: 'AllTrails', description: 'Essential for hiking and trail discovery.' },
    { name: 'Been', description: 'Tracking countries visited around the world.' }
  ],
  photos: [
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1433086566608-e9373f6672da?q=80&w=2070&auto=format&fit=crop'
  ],
  stockLinks: [
    { name: 'Adobe Stock', url: '#' },
    { name: 'Shutterstock', url: '#' }
  ],
  visitedCountries: ['Canada', 'USA', 'UK', 'Germany', 'France', 'Italy', 'Spain', 'Switzerland', 'Austria', 'Japan', 'Thailand', 'Vietnam']
};

export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'personal', label: 'Personal' },
];
