export const SectionHeader = ({ title, icon: Icon }: { title: string; icon: React.ElementType }) => (
  <div className="flex items-center gap-3 mb-12">
    <div className="p-2 bg-accent/10 rounded-lg text-accent">
      <Icon size={24} />
    </div>
    <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
  </div>
);
