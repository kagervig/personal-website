import { GraduationCap } from 'lucide-react';
import { EDUCATION } from '@/app/data';
import { SectionHeader } from './SectionHeader';

export const EducationSection = () => (
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
);
