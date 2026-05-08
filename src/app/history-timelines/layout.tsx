import { Metadata } from 'next';
import './timeline.css';

export const metadata: Metadata = {
  title: 'History Timelines',
  description: 'Interactive guided tours through ancient civilizations and history.',
  icons: {
    icon: '/history-timelines/favicon.svg',
  },
  openGraph: {
    images: ['/history-timelines/opengraph.jpg'],
  },
};

export default function HistoryTimelineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="history-timeline-root">
      {children}
    </div>
  );
}
