import { Camera, Smartphone, Map as MapIcon, ExternalLink } from 'lucide-react';
import { PERSONAL } from '@/app/data';
import { SectionHeader } from './SectionHeader';
import { YoutubeIcon } from './icons';

export const PersonalSection = () => (
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
);
