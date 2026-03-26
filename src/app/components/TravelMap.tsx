'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import type { Feature, Geometry } from 'geojson';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';
const VISITED_COLOR = '#3b82f6';
const BORDER_COLOR = '#ffffff';
const WIDTH = 800;
const HEIGHT = 400;

// Countries whose territory is merged into another shape in world-atlas (key = host ISO, values = merged codes)
const MERGED_INTO: Record<string, string[]> = {
  'RS': ['XK'], // Kosovo has no separate shape; its territory is part of Serbia
};

const COUNTRY_ISO_MAP: Record<string, string> = {
  "004": "AF", "008": "AL", "012": "DZ", "016": "AS", "020": "AD",
  "024": "AO", "028": "AG", "031": "AZ", "032": "AR", "036": "AU",
  "040": "AT", "044": "BS", "048": "BH", "050": "BD", "051": "AM",
  "052": "BB", "056": "BE", "060": "BM", "064": "BT", "068": "BO",
  "070": "BA", "072": "BW", "076": "BR", "096": "BN", "100": "BG",
  "104": "MM", "108": "BI", "116": "KH", "120": "CM", "124": "CA",
  "132": "CV", "140": "CF", "144": "LK", "148": "TD", "152": "CL",
  "156": "CN", "170": "CO", "174": "KM", "178": "CG", "180": "CD",
  "188": "CR", "191": "HR", "192": "CU", "196": "CY", "203": "CZ",
  "204": "BJ", "208": "DK", "212": "DM", "214": "DO", "218": "EC",
  "222": "SV", "226": "GQ", "231": "ET", "232": "ER", "233": "EE",
  "238": "FK", "242": "FJ", "246": "FI", "250": "FR", "266": "GA",
  "268": "GE", "270": "GM", "276": "DE", "288": "GH", "300": "GR",
  "308": "GD", "320": "GT", "324": "GN", "328": "GY", "332": "HT",
  "340": "HN", "348": "HU", "360": "ID", "364": "IR", "368": "IQ",
  "372": "IE", "376": "IL", "380": "IT", "388": "JM", "392": "JP",
  "400": "JO", "398": "KZ", "404": "KE", "408": "KP", "410": "KR",
  "414": "KW", "417": "KG", "418": "LA", "422": "LB", "426": "LS",
  "428": "LV", "430": "LR", "434": "LY", "440": "LT", "442": "LU",
  "450": "MG", "454": "MW", "458": "MY", "462": "MV", "466": "ML",
  "484": "MX", "496": "MN", "504": "MA", "508": "MZ", "516": "NA",
  "524": "NP", "528": "NL", "540": "NC", "554": "NZ", "558": "NI",
  "562": "NE", "566": "NG", "578": "NO", "586": "PK", "591": "PA",
  "598": "PG", "600": "PY", "604": "PE", "608": "PH", "616": "PL",
  "620": "PT", "630": "PR", "634": "QA", "642": "RO", "643": "RU",
  "646": "RW", "659": "KN", "662": "LC", "670": "VC", "678": "ST",
  "682": "SA", "686": "SN", "694": "SL", "703": "SK", "705": "SI",
  "706": "SO", "710": "ZA", "724": "ES", "728": "SS", "729": "SD",
  "740": "SR", "752": "SE", "756": "CH", "760": "SY", "762": "TJ",
  "764": "TH", "768": "TG", "780": "TT", "788": "TN", "792": "TR",
  "800": "UG", "804": "UA", "784": "AE", "826": "GB", "834": "TZ",
  "840": "US", "858": "UY", "860": "UZ", "862": "VE", "704": "VN",
  "887": "YE", "894": "ZM", "716": "ZW", "818": "EG",
  "498": "MD", "499": "ME", "807": "MK", "688": "RS", "158": "TW",
  "344": "HK", "446": "MO", "438": "LI", "492": "MC", "674": "SM",
  "336": "VA", "748": "SZ", "831": "GG", "833": "IM",
};

interface TooltipState {
  name: string;
  x: number;
  y: number;
  visited: boolean;
}

interface TravelMapProps {
  visitedCountryCodes: string[];
}

type GeoFeature = Feature<Geometry, { name: string }>;

export const TravelMap = ({ visitedCountryCodes }: TravelMapProps) => {
  const [geos, setGeos] = useState<GeoFeature[]>([]);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [pan, setPan] = useState({ x: 0, y: 0, k: 1 });
  const svgRef = useRef<SVGSVGElement>(null);
  const dragRef = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);
  const { resolvedTheme } = useTheme();

  const unvisitedColor = resolvedTheme === 'dark' ? '#334155' : '#e2e8f0';
  const visitedSet = new Set(visitedCountryCodes);

  useEffect(() => {
    fetch(GEO_URL)
      .then(r => r.json())
      .then((topo: Topology) => {
        const countries = feature(topo, topo.objects.countries as GeometryCollection);
        setGeos(countries.features as GeoFeature[]);
      });
  }, []);

  const projection = geoNaturalEarth1()
    .scale((WIDTH / (2 * Math.PI)) * 0.85)
    .translate([WIDTH / 2, HEIGHT / 2]);

  const pathGen = geoPath(projection);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.05 : 1 / 1.05;
    const rect = svgRef.current!.getBoundingClientRect();
    const mx = (e.clientX - rect.left) * (WIDTH / rect.width);
    const my = (e.clientY - rect.top) * (HEIGHT / rect.height);
    setPan(prev => {
      const newK = Math.max(1, Math.min(8, prev.k * factor));
      const ratio = newK / prev.k;
      return { x: mx - ratio * (mx - prev.x), y: my - ratio * (my - prev.y), k: newK };
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    dragRef.current = { x: e.clientX, y: e.clientY, tx: pan.x, ty: pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragRef.current) return;
    const rect = svgRef.current!.getBoundingClientRect();
    const dx = (e.clientX - dragRef.current.x) * (WIDTH / rect.width);
    const dy = (e.clientY - dragRef.current.y) * (HEIGHT / rect.height);
    setPan(prev => ({ ...prev, x: dragRef.current!.tx + dx, y: dragRef.current!.ty + dy }));
  };

  const handleMouseUp = () => { dragRef.current = null; };

  return (
    <div className="w-full rounded-[2rem] overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <div className="flex items-center gap-3 px-5 pt-4 pb-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: VISITED_COLOR }} />
          <span className="text-sm font-medium text-ink">
            {visitedCountryCodes.length} countries visited
          </span>
        </div>
        <span className="text-sm text-muted">
          ({Math.round((visitedCountryCodes.length / 195) * 100)}% of the world)
        </span>
      </div>

      <div className="w-full aspect-[2/1]">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          style={{ width: '100%', height: '100%', cursor: dragRef.current ? 'grabbing' : 'grab' }}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <g transform={`translate(${pan.x},${pan.y}) scale(${pan.k})`}>
            {geos.map((geo, i) => {
              const d = pathGen(geo);
              if (!d) return null;
              const id = String(geo.id).padStart(3, '0');
              const iso = COUNTRY_ISO_MAP[id];
              const merged = iso ? (MERGED_INTO[iso] ?? []) : [];
              const isVisited = iso ? (visitedSet.has(iso) || merged.some(c => visitedSet.has(c))) : false;
              const name = geo.properties?.name ?? '';
              return (
                <path
                  key={i}
                  d={d}
                  fill={isVisited ? VISITED_COLOR : unvisitedColor}
                  stroke={BORDER_COLOR}
                  strokeWidth={0.5 / pan.k}
                  onMouseEnter={e => setTooltip({ name, x: e.clientX, y: e.clientY, visited: isVisited })}
                  onMouseMove={e => setTooltip(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null)}
                  onMouseLeave={() => setTooltip(null)}
                />
              );
            })}
          </g>
        </svg>
      </div>

      <div className="px-5 pb-3 pt-1">
        <p className="text-xs text-muted">Scroll to zoom · Drag to pan</p>
      </div>

      {tooltip && (
        <div className="fixed z-50 pointer-events-none" style={{ left: tooltip.x + 12, top: tooltip.y - 8 }}>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-ink text-xs rounded-md px-2 py-1 shadow-md flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-sm flex-shrink-0" style={{ backgroundColor: tooltip.visited ? VISITED_COLOR : unvisitedColor }} />
            <span className="font-medium">{tooltip.name}</span>
          </div>
        </div>
      )}
    </div>
  );
};
