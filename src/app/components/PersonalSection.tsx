import { Camera, Smartphone, Map as MapIcon, ExternalLink } from 'lucide-react';
import { PERSONAL } from '@/app/data';
import { SectionHeader } from './SectionHeader';
import { YoutubeIcon, AdobeStockIcon, ShutterstockIcon, GettyIcon, EnvatoIcon } from './icons';
import { TravelMap } from './TravelMap';
import { PhotoCarousel } from './PhotoCarousel';

const STOCK_ICONS: Record<string, React.ReactNode> = {
  'Adobe Stock': <AdobeStockIcon size={28} />,
  'Shutterstock': <ShutterstockIcon size={28} />,
  'Getty Images': <GettyIcon size={28} />,
  'Envato': <EnvatoIcon size={28} />,
};

export const PersonalSection = () => (
  <section id="personal" className="section-padding !pt-8">
    <SectionHeader title="Personal" icon={Camera} />

    {/* Profile intro */}
    <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
      <img
        src="/profile.jpg"
        alt="Kristian Allin"
        className="w-40 h-40 rounded-3xl object-cover flex-shrink-0 shadow-lg mx-auto md:mx-0"
      />
      <div className="space-y-4 text-muted leading-relaxed">
        <p>
          I'm Kristian — a full-stack developer and former product manager based in Toronto, Canada.
          I spent nearly a decade working in marketing and product at Keysight Technologies before
          deciding to go all-in on software engineering.
        </p>
        <p>
          Outside of code, I'm an avid traveller, hiker, and hobby photographer and videographer.
          My photos and footage are featured on Adobe Stock, Shutterstock, Getty, and Envato, and I run two YouTube channels covering travel and drone cinematography.
        </p>
        <p>I've lived in the UK, Germany and Canada. I speak German professionally, Spanish conversationally, and enough Mandarin and Danish to get by as a tourist.</p>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-12 mb-12">
      {/* YouTube Channels */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <span className="text-red-600"><YoutubeIcon size={24} /></span>
          YouTube Channels
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PERSONAL.youtube.map(channel => (
            <div
              key={channel.name}
              className="p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl flex flex-col gap-4"
            >
              <div className="flex items-center gap-4 flex-1">
                <img
                  src={channel.icon}
                  alt={channel.name}
                  className={`rounded-2xl object-cover flex-shrink-0 ${channel.name === 'Drone Relaxation' ? 'w-[101px] h-[101px]' : 'w-28 h-28'}`}
                />
                <div>
                  <h4 className="font-bold">{channel.name}</h4>
                  <p className="text-xs text-muted mb-1">{channel.subscribers} subscribers</p>
                  <p className="text-sm text-muted">{channel.description}</p>
                </div>
              </div>
              <a
                href={channel.url}
                target="_blank"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl transition-all self-start"
              >
                <YoutubeIcon size={16} />
                Subscribe on YouTube
              </a>
            </div>
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
            <div key={app.name} className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl flex items-center gap-4">
              <img
                src={app.icon}
                alt={app.name}
                className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
              />
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
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Camera className="text-accent" />
          Photography
        </h3>
        <PhotoCarousel photos={PERSONAL.photos} />
        <p className="text-sm text-muted text-center max-w-4xl mx-auto w-full">
          I sell stock photos and footage as a successful contributor on these four platforms.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto w-full">
          {PERSONAL.stockLinks.map(link => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl hover:border-accent transition-all group"
            >
              <div className="flex-shrink-0">{STOCK_ICONS[link.name]}</div>
              <span className="text-sm font-medium group-hover:text-accent transition-colors">{link.name}</span>
              <ExternalLink size={12} className="text-muted opacity-0 group-hover:opacity-100 transition-all ml-auto flex-shrink-0" />
            </a>
          ))}
        </div>
      </div>

      {/* Visited Countries Map Widget */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <MapIcon className="text-accent" />
          Travel Map
        </h3>
        <p className="text-sm text-muted text-center">I'm fortunate to have traveled far and wide, here's everywhere I've been so far!</p>
        <div className="max-w-4xl mx-auto w-full">
          <TravelMap visitedCountryCodes={PERSONAL.visitedCountryCodes} />
        </div>
      </div>
    </div>
  </section>
);
