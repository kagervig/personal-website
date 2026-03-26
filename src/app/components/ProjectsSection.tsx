import { Code } from 'lucide-react';
import { PROJECTS } from '@/app/data';
import { SectionHeader } from './SectionHeader';
import { ExpandableCard } from './ExpandableCard';

interface ProjectsSectionProps {
  expandedItems: Record<string, boolean>;
  onToggle: (id: string) => void;
}

export const ProjectsSection = ({ expandedItems, onToggle }: ProjectsSectionProps) => (
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
          onToggle={() => onToggle(project.id)}
        />
      ))}
    </div>
  </section>
);
