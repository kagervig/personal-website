'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  ChevronDown,
  ExternalLink,
  Code,
  Briefcase,
  GraduationCap,
  Terminal,
  Menu,
  X,
  Smartphone,
  Map as MapIcon,
  Camera,
  Download
} from 'lucide-react';

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const YoutubeIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Data ---

const PROJECTS = [
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

const EXPERIENCE = [
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

const SKILLS = {
  languages: ['Java', 'SQL', 'Python', 'JavaScript', 'React', 'Git'],
  technologies: ['PostgreSQL', 'MySQL', 'Render', 'Supabase', 'Vercel', 'Next.js']
};

const EDUCATION = [
  {
    school: 'Arizona State University',
    degree: 'CSE110: Principles of Programming',
    year: '2025',
    grade: '94%',
    logo: 'https://logo.clearbit.com/asu.edu'
  },
  {
    school: 'Sheffield Hallam University',
    degree: 'BA Business & German',
    year: '2014 - 2018',
    grade: '1st Class Honours',
    logo: 'https://logo.clearbit.com/shu.ac.uk'
  },
  {
    school: 'Universität Passau',
    degree: 'Economics & German Exchange Semester',
    year: '2016',
    grade: '',
    logo: 'https://logo.clearbit.com/uni-passau.de'
  }
];

const PERSONAL = {
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

// --- Components ---

const SectionHeader = ({ title, icon: Icon }: { title: string; icon: React.ElementType }) => (
  <div className="flex items-center gap-3 mb-12">
    <div className="p-2 bg-accent/10 rounded-lg text-accent">
      <Icon size={24} />
    </div>
    <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
  </div>
);

interface ExpandableCardProps {
  title: string;
  subtitle: string;
  period?: string;
  description: string;
  details: string[];
  tags?: string[];
  isOpen: boolean;
  onToggle: () => void;
}

const ExpandableCard = ({
  title,
  subtitle,
  period,
  description,
  details,
  tags,
  isOpen,
  onToggle
}: ExpandableCardProps) => (
  <motion.div
    layout
    className={cn(
      "group relative overflow-hidden rounded-2xl border transition-all duration-300",
      isOpen ? "bg-white shadow-xl border-accent/20" : "bg-white/50 border-gray-200 hover:border-accent/40 hover:shadow-md"
    )}
  >
    <button
      onClick={onToggle}
      className="w-full text-left p-6 md:p-8 focus:outline-none"
    >
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-ink">{title}</h3>
            {period && <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full text-muted">{period}</span>}
          </div>
          <p className="text-accent font-medium">{subtitle}</p>
          <p className="text-muted text-sm mt-2">{description}</p>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-muted group-hover:text-accent transition-colors"
        >
          <ChevronDown size={20} />
        </motion.div>
      </div>

      {tags && (
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 bg-gray-100 text-gray-500 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
    </button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="px-6 md:px-8 pb-8 pt-0 border-t border-gray-100">
            <ul className="mt-6 space-y-3">
              {details.map((detail, idx) => (
                <motion.li
                  key={idx}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-3 text-muted leading-relaxed"
                >
                  <span className="text-accent mt-1.5">•</span>
                  <span>{detail}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'skills', 'experience', 'education', 'personal', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'personal', label: 'Personal' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-bg selection:bg-accent/20 selection:text-accent">
      {/* --- Navigation --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="glass rounded-2xl px-6 py-3 flex items-center justify-between shadow-sm">
            <a href="#home" className="text-xl font-bold tracking-tighter text-ink flex items-center gap-2">
              <span className="w-8 h-8 bg-ink text-white rounded-lg flex items-center justify-center text-sm">KA</span>
              Kristian Allin
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-accent",
                    activeSection === link.id ? "text-accent" : "text-muted"
                  )}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-xl text-sm font-bold hover:bg-accent/90 transition-all"
              >
                <Download size={14} />
                Resume
              </a>
            </div>

            {/* Mobile Nav Toggle */}
            <button
              className="md:hidden p-2 text-ink"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-20 left-6 right-6 glass rounded-2xl p-6 shadow-xl"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map(link => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "text-lg font-medium py-2 border-b border-gray-100 last:border-none",
                      activeSection === link.id ? "text-accent" : "text-muted"
                    )}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- Hero Section --- */}
      <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
            alt="Kristian Allin"
            className="w-full h-full object-cover grayscale opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-bg/60 to-bg"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent font-mono text-sm tracking-widest uppercase mb-4 block">Full-Stack Developer & Data Engineer</span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-ink mb-6">
              Kristian Allin
            </h1>
            <p className="text-xl md:text-2xl text-muted leading-relaxed max-w-2xl mx-auto mb-10">
              Building production-ready web applications and high-scale data pipelines for Fortune 500 companies.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#projects"
                className="px-8 py-4 bg-ink text-white rounded-xl font-bold hover:bg-accent transition-all hover:scale-105 active:scale-95 shadow-lg shadow-ink/10"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-8 py-4 bg-white text-ink border border-gray-200 rounded-xl font-bold hover:border-accent transition-all hover:scale-105 active:scale-95"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-muted"
          >
            <ChevronDown size={32} />
          </motion.div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto">
        {/* --- Projects Section --- */}
        <section id="projects" className="section-padding">
          <SectionHeader title="Featured Projects" icon={Code} />
          <div className="grid grid-cols-1 gap-8">
            {PROJECTS.map(project => (
              <ExpandableCard
                key={project.id}
                title={project.title}
                subtitle={project.year}
                description={project.description}
                details={project.details}
                tags={project.tech}
                isOpen={!!expandedItems[project.id]}
                onToggle={() => toggleExpand(project.id)}
              />
            ))}
          </div>
        </section>

        {/* --- Skills Section --- */}
        <section id="skills" className="section-padding bg-white/30 rounded-[3rem]">
          <SectionHeader title="Technical Skills" icon={Terminal} />
          <div className="grid grid-cols-1 gap-12">
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-muted uppercase tracking-wider">Languages & Tools</h3>
              <div className="flex flex-wrap gap-3">
                {SKILLS.languages.map(skill => (
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    key={skill}
                    className="px-6 py-3 bg-white border border-gray-200 rounded-2xl font-medium shadow-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-muted uppercase tracking-wider">Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {SKILLS.technologies.map(skill => (
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    key={skill}
                    className="px-6 py-3 bg-accent/5 border border-accent/10 text-accent rounded-2xl font-medium shadow-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- Experience Section --- */}
        <section id="experience" className="section-padding">
          <SectionHeader title="Work Experience" icon={Briefcase} />
          <div className="space-y-6">
            {EXPERIENCE.map(exp => (
              <ExpandableCard
                key={exp.id}
                title={exp.company}
                subtitle={exp.role}
                period={exp.period}
                description={exp.description}
                details={exp.details}
                isOpen={!!expandedItems[exp.id]}
                onToggle={() => toggleExpand(exp.id)}
              />
            ))}
          </div>
        </section>

        {/* --- Education Section --- */}
        <section id="education" className="section-padding">
          <SectionHeader title="Education" icon={GraduationCap} />
          <div className="grid grid-cols-1 gap-8">
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col md:flex-row gap-6 items-center md:items-start">
                <div className="w-20 h-20 flex-none bg-gray-50 rounded-2xl p-2 flex items-center justify-center overflow-hidden border border-gray-100">
                  <img
                    src={edu.logo}
                    alt={`${edu.school} logo`}
                    className="max-w-full max-h-full object-contain"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(edu.school)}&background=random&color=fff`;
                    }}
                  />
                </div>
                <div className="flex-grow text-center md:text-left">
                  <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-2">
                    <h3 className="text-xl font-bold text-ink">{edu.school}</h3>
                    <span className="text-sm font-mono text-accent">{edu.year}</span>
                  </div>
                  <p className="text-lg text-muted mb-1">{edu.degree}</p>
                  {edu.grade && <p className="text-sm font-bold text-accent">{edu.grade}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Personal Section --- */}
        <section id="personal" className="section-padding">
          <SectionHeader title="Personal" icon={Camera} />

          <div className="grid grid-cols-1 gap-12 mb-12">
            {/* YouTube Channels */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="text-red-600"><YoutubeIcon size={24} /></span>
                YouTube Channels
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {PERSONAL.youtube.map(channel => (
                  <a
                    key={channel.name}
                    href={channel.url}
                    target="_blank"
                    className="p-6 bg-white border border-gray-200 rounded-2xl hover:border-accent transition-all group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold group-hover:text-accent transition-colors">{channel.name}</h4>
                      <ExternalLink size={16} className="text-muted opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                    <p className="text-sm text-muted">{channel.description}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Favorite Apps */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Smartphone className="text-accent" />
                Favorite Apps
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PERSONAL.apps.map(app => (
                  <div key={app.name} className="p-4 bg-white border border-gray-200 rounded-2xl flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center font-bold text-accent">
                      {app.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{app.name}</h4>
                      <p className="text-xs text-muted">{app.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {/* Photo Carousel */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Camera className="text-accent" />
                  Photography
                </h3>
                <div className="flex gap-2">
                  {PERSONAL.stockLinks.map(link => (
                    <a key={link.name} href={link.url} className="text-xs font-bold text-accent hover:underline">
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="relative aspect-video rounded-[2rem] overflow-hidden group max-w-4xl mx-auto w-full">
                <div className="flex h-full w-full overflow-x-auto snap-x snap-mandatory no-scrollbar">
                  {PERSONAL.photos.map((photo, idx) => (
                    <div key={idx} className="flex-none w-full h-full snap-center">
                      <img
                        src={photo}
                        alt={`Photography ${idx}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {PERSONAL.photos.map((_, idx) => (
                    <div key={idx} className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted italic text-center">Hobby photographer selling stock photos and videos.</p>
            </div>

            {/* Visited Countries Map Widget */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <MapIcon className="text-accent" />
                Travel Map
              </h3>
              <div className="p-8 bg-ink rounded-[2rem] text-white flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden max-w-4xl mx-auto w-full">
                <div className="absolute inset-0 opacity-20">
                  <svg viewBox="0 0 1000 500" className="w-full h-full fill-white">
                    <path d="M150,100 Q200,50 300,100 T500,150 T700,100 T900,200 L900,400 Q700,450 500,400 T200,450 T100,350 Z" />
                  </svg>
                </div>
                <div className="relative z-10 text-center">
                  <div className="text-5xl font-bold text-accent mb-2">{PERSONAL.visitedCountries.length}</div>
                  <div className="text-sm uppercase tracking-widest font-bold text-gray-400">Countries Visited</div>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {PERSONAL.visitedCountries.map(country => (
                      <span key={country} className="text-[10px] px-2 py-1 bg-white/10 rounded-lg">
                        {country}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Contact Section --- */}
        <section id="contact" className="section-padding mb-24">
          <div className="bg-ink text-white rounded-[3rem] p-12 md:p-24 text-center overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-0 left-0 w-64 h-64 bg-accent blur-[120px]"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent blur-[120px]"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">Let&apos;s build something together.</h2>
              <p className="text-xl text-gray-400 max-w-xl mx-auto mb-12">
                Currently open to new opportunities and interesting projects. Feel free to reach out!
              </p>

              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href="mailto:kpallin90@gmail.com"
                  className="flex items-center gap-3 px-8 py-4 bg-white text-ink rounded-2xl font-bold hover:bg-accent hover:text-white transition-all"
                >
                  <Mail size={20} />
                  Email Me
                </a>
                <div className="flex gap-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all"
                  >
                    <GithubIcon size={24} />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl transition-all"
                  >
                    <LinkedinIcon size={24} />
                  </a>
                </div>
              </div>

              <div className="mt-16 pt-16 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 text-gray-500 text-sm">
                <p>© 2026 Kristian Allin. All rights reserved.</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
