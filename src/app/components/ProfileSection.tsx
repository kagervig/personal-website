import { User } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

export const ProfileSection = () => (
  <section id="profile" className="section-padding">
    <SectionHeader title="About Me" icon={User} />
    <div className="flex flex-col md:flex-row gap-10 items-start">
      <img
        src="/profile.jpg"
        alt="Kristian Allin"
        className="w-48 h-48 rounded-3xl object-cover flex-shrink-0 shadow-lg mx-auto md:mx-0"
      />
      <div className="space-y-4 text-muted leading-relaxed">
        <p>
          I'm Kristian — a full-stack developer and former product manager based in Toronto, Canada.
          I've spent nearly a decade working in marketing and product at Keysight Technologies before
          deciding to go all-in on software engineering.
        </p>
        <p>
          Outside of code, I'm an avid traveller, hiker, and hobby photographer and videographer.
          My photos and footage are featured on Adobe Stock, Shutterstock, Getty, and Envato, and I run two YouTube channels covering travel and drone cinematography.
        </p>
        <p>I've lived in the UK, Germany and Canada. I speak German professionally, Spanish conversationally, and enough Mandarin and Danish to get by as a tourist.'</p>
      </div>
    </div>
  </section>
);
