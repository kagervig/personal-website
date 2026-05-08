import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/history-timeline/ui/input";
import { Badge } from "@/components/history-timeline/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/history-timeline/ui/select";
import { categories, eras, regions, Category, Era, Region } from "@/lib/history-timeline/data/events";

interface TimelineFiltersProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategories: Category[];
  toggleCategory: (c: Category) => void;
  selectedEra: Era | "All";
  setSelectedEra: (e: Era | "All") => void;
  selectedRegion: Region | "All";
  setSelectedRegion: (r: Region | "All") => void;
}

export function TimelineFilters({
  searchQuery,
  setSearchQuery,
  selectedCategories,
  toggleCategory,
  selectedEra,
  setSelectedEra,
  selectedRegion,
  setSelectedRegion
}: TimelineFiltersProps) {
  return (
    <div className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-40 px-4 py-4 shadow-sm">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search historical events..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 font-serif bg-background"
            />
          </div>
          
          <div className="flex w-full md:w-auto gap-4">
            <Select value={selectedEra} onValueChange={(val) => setSelectedEra(val as Era | "All")}>
              <SelectTrigger className="w-full md:w-[200px] font-serif bg-background">
                <SelectValue placeholder="Select Era" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Eras</SelectItem>
                {eras.map(era => (
                  <SelectItem key={era} value={era}>{era}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedRegion} onValueChange={(val) => setSelectedRegion(val as Region | "All")}>
              <SelectTrigger className="w-full md:w-[200px] font-serif bg-background">
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Regions</SelectItem>
                {regions.map(region => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
          <span className="text-sm text-muted-foreground py-1 mr-2">Categories:</span>
          {categories.map(cat => (
            <Badge 
              key={cat}
              variant={selectedCategories.includes(cat) ? "default" : "outline"}
              className={`cursor-pointer transition-colors ${selectedCategories.includes(cat) ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"}`}
              onClick={() => toggleCategory(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
