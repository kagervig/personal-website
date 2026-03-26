'use client';

import { useState, useEffect } from 'react';
import { NAV_LINKS } from '@/app/data';
import { Nav } from '@/app/components/Nav';
import { Hero } from '@/app/components/Hero';
import { ProjectsSection } from '@/app/components/ProjectsSection';
import { SkillsSection } from '@/app/components/SkillsSection';
import { ExperienceSection } from '@/app/components/ExperienceSection';
import { EducationSection } from '@/app/components/EducationSection';
import { PersonalSection } from '@/app/components/PersonalSection';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const { id } of NAV_LINKS) {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-bg selection:bg-accent/20 selection:text-accent">
      <Nav activeSection={activeSection} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Hero />
      <main className="max-w-7xl mx-auto">
        <ProjectsSection expandedItems={expandedItems} onToggle={toggleExpand} />
        <SkillsSection />
        <ExperienceSection expandedItems={expandedItems} onToggle={toggleExpand} />
        <EducationSection />
        <PersonalSection />
      </main>
    </div>
  );
}
