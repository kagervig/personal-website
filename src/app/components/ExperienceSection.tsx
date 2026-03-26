import { Briefcase } from 'lucide-react';
import { EXPERIENCE } from '@/app/data';
import { SectionHeader } from './SectionHeader';
import { ExpandableCard } from './ExpandableCard';

interface ExperienceSectionProps {
  expandedItems: Record<string, boolean>;
  onToggle: (id: string) => void;
}

export const ExperienceSection = ({ expandedItems, onToggle }: ExperienceSectionProps) => (
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
          onToggle={() => onToggle(exp.id)}
        />
      ))}
    </div>
  </section>
);
