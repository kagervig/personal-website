import { motion } from 'motion/react';
import { Terminal } from 'lucide-react';
import { SKILLS } from '@/app/data';
import { SectionHeader } from './SectionHeader';

export const SkillsSection = () => (
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
);
