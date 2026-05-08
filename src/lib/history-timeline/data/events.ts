export type Era = 
  | "Ancient World"
  | "Classical Antiquity"
  | "Medieval"
  | "Renaissance & Enlightenment"
  | "Industrial Age"
  | "Modern Era";

export type Category = 
  | "Science"
  | "War"
  | "Art"
  | "Politics"
  | "Exploration"
  | "Religion"
  | "Technology"
  | "Philosophy";

export type Region = 
  | "Europe"
  | "Asia"
  | "Americas"
  | "Middle East"
  | "Africa"
  | "Global";

export interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  category: Category;
  region: Region;
  era: Era;
}

export const eras: Era[] = [
  "Ancient World",
  "Classical Antiquity",
  "Medieval",
  "Renaissance & Enlightenment",
  "Industrial Age",
  "Modern Era",
];

export const categories: Category[] = [
  "Science",
  "War",
  "Art",
  "Politics",
  "Exploration",
  "Religion",
  "Technology",
  "Philosophy",
];

export const regions: Region[] = [
  "Europe",
  "Asia",
  "Americas",
  "Middle East",
  "Africa",
  "Global",
];

export const events: TimelineEvent[] = [
  {
    id: "sumer-writing",
    year: -3200,
    title: "Invention of Cuneiform",
    description: "The Sumerians developed one of the earliest known writing systems, using wedge-shaped marks on clay tablets. This marked the transition from prehistory to recorded history.",
    category: "Technology",
    region: "Middle East",
    era: "Ancient World",
  },
  {
    id: "great-pyramid",
    year: -2560,
    title: "Completion of the Great Pyramid",
    description: "The Great Pyramid of Giza was completed as a tomb for the Egyptian pharaoh Khufu. It remained the tallest man-made structure in the world for nearly 4,000 years.",
    category: "Art",
    region: "Africa",
    era: "Ancient World",
  },
  {
    id: "hammurabi-code",
    year: -1754,
    title: "Code of Hammurabi",
    description: "Babylonian King Hammurabi enacted one of the oldest deciphered writings of significant length in the world, establishing laws and corresponding punishments.",
    category: "Politics",
    region: "Middle East",
    era: "Ancient World",
  },
  {
    id: "buddhism-founded",
    year: -500,
    title: "Founding of Buddhism",
    description: "Siddhartha Gautama began teaching in ancient India after attaining enlightenment, formulating the core philosophies that would become Buddhism.",
    category: "Religion",
    region: "Asia",
    era: "Classical Antiquity",
  },
  {
    id: "athenian-democracy",
    year: -508,
    title: "Establishment of Athenian Democracy",
    description: "Cleisthenes introduced a system of political reforms that he called demokratia, or 'rule by the people', creating the first known democracy in the world.",
    category: "Politics",
    region: "Europe",
    era: "Classical Antiquity",
  },
  {
    id: "alexander-conquests",
    year: -323,
    title: "Conquests of Alexander the Great",
    description: "Alexander the Great created one of the largest empires in history by age 30, stretching from Greece to northwestern India, spreading Hellenistic culture.",
    category: "War",
    region: "Middle East",
    era: "Classical Antiquity",
  },
  {
    id: "roman-empire",
    year: -27,
    title: "Augustus Becomes First Roman Emperor",
    description: "Following the assassination of Julius Caesar and subsequent civil wars, Octavian was granted the title Augustus, marking the end of the Roman Republic.",
    category: "Politics",
    region: "Europe",
    era: "Classical Antiquity",
  },
  {
    id: "fall-of-rome",
    year: 476,
    title: "Fall of the Western Roman Empire",
    description: "The deposition of Emperor Romulus Augustulus by the Germanic king Odoacer traditionally marks the end of the Western Roman Empire and the beginning of the Middle Ages.",
    category: "Politics",
    region: "Europe",
    era: "Medieval",
  },
  {
    id: "islam-founded",
    year: 610,
    title: "Origins of Islam",
    description: "The Prophet Muhammad reported receiving his first revelation in a cave on Mount Hira, which would eventually form the Quran and the foundation of Islam.",
    category: "Religion",
    region: "Middle East",
    era: "Medieval",
  },
  {
    id: "charlemagne",
    year: 800,
    title: "Charlemagne Crowned Emperor",
    description: "Pope Leo III crowned Charlemagne as Emperor of the Romans, reviving the imperial title in Western Europe after more than three centuries.",
    category: "Politics",
    region: "Europe",
    era: "Medieval",
  },
  {
    id: "first-crusade",
    year: 1099,
    title: "Capture of Jerusalem",
    description: "The First Crusade culminated in the capture of Jerusalem by Western Christian forces, establishing Crusader states in the Levant.",
    category: "War",
    region: "Middle East",
    era: "Medieval",
  },
  {
    id: "magna-carta",
    year: 1215,
    title: "Signing of the Magna Carta",
    description: "King John of England was forced to sign a charter limiting his powers and establishing the principle that everyone is subject to the law.",
    category: "Politics",
    region: "Europe",
    era: "Medieval",
  },
  {
    id: "mongol-empire",
    year: 1206,
    title: "Genghis Khan Unites the Mongols",
    description: "Temüjin was proclaimed Genghis Khan, launching campaigns that would create the largest contiguous land empire in history.",
    category: "War",
    region: "Asia",
    era: "Medieval",
  },
  {
    id: "black-death",
    year: 1347,
    title: "The Black Death",
    description: "A devastating global epidemic of bubonic plague struck Europe and Asia, killing an estimated 75-200 million people and profoundly altering European society.",
    category: "Science",
    region: "Global",
    era: "Medieval",
  },
  {
    id: "gutenberg-press",
    year: 1440,
    title: "Invention of the Printing Press",
    description: "Johannes Gutenberg introduced movable type to Europe, revolutionizing the spread of information and accelerating the Renaissance, Reformation, and Scientific Revolution.",
    category: "Technology",
    region: "Europe",
    era: "Renaissance & Enlightenment",
  },
  {
    id: "fall-constantinople",
    year: 1453,
    title: "Fall of Constantinople",
    description: "The capture of the capital of the Byzantine Empire by the Ottoman Empire marked the end of the Roman Empire and a major blow to Christendom.",
    category: "War",
    region: "Middle East",
    era: "Renaissance & Enlightenment",
  },
  {
    id: "columbus-voyage",
    year: 1492,
    title: "Columbus Reaches the Americas",
    description: "Christopher Columbus landed in the Caribbean, initiating widespread European exploration and the eventual colonization of the Americas.",
    category: "Exploration",
    region: "Americas",
    era: "Renaissance & Enlightenment",
  },
  {
    id: "protestant-reformation",
    year: 1517,
    title: "Ninety-five Theses",
    description: "Martin Luther published his disputation against the Catholic Church's practices, sparking the Protestant Reformation and a century of religious conflict.",
    category: "Religion",
    region: "Europe",
    era: "Renaissance & Enlightenment",
  },
  {
    id: "copernican-revolution",
    year: 1543,
    title: "Heliocentric Theory",
    description: "Nicolaus Copernicus published 'On the Revolutions of the Heavenly Spheres', proposing that the Earth and planets revolve around the Sun.",
    category: "Science",
    region: "Europe",
    era: "Renaissance & Enlightenment",
  },
  {
    id: "scientific-method",
    year: 1687,
    title: "Principia Mathematica",
    description: "Isaac Newton published his laws of motion and universal gravitation, cementing the foundations of classical mechanics and the Scientific Revolution.",
    category: "Science",
    region: "Europe",
    era: "Renaissance & Enlightenment",
  },
  {
    id: "american-revolution",
    year: 1776,
    title: "Declaration of Independence",
    description: "The Thirteen American Colonies declared themselves independent sovereign states, free from British rule, leading to the formation of the United States.",
    category: "Politics",
    region: "Americas",
    era: "Renaissance & Enlightenment",
  },
  {
    id: "french-revolution",
    year: 1789,
    title: "Storming of the Bastille",
    description: "Parisian revolutionaries stormed the Bastille prison, a turning point in the French Revolution that led to the overthrow of the absolute monarchy.",
    category: "Politics",
    region: "Europe",
    era: "Renaissance & Enlightenment",
  },
  {
    id: "industrial-revolution",
    year: 1814,
    title: "First Steam Locomotive",
    description: "George Stephenson built the first practical steam locomotive, accelerating the Industrial Revolution's transformation of manufacturing and transport.",
    category: "Technology",
    region: "Europe",
    era: "Industrial Age",
  },
  {
    id: "origin-of-species",
    year: 1859,
    title: "On the Origin of Species",
    description: "Charles Darwin published his theory of evolution by natural selection, fundamentally changing humanity's understanding of biology and our place in nature.",
    category: "Science",
    region: "Global",
    era: "Industrial Age",
  },
  {
    id: "american-civil-war",
    year: 1861,
    title: "American Civil War",
    description: "A conflict fought in the United States between the Union and the Confederacy, primarily over the abolition of slavery.",
    category: "War",
    region: "Americas",
    era: "Industrial Age",
  },
  {
    id: "ww1",
    year: 1914,
    title: "Assassination of Archduke Franz Ferdinand",
    description: "The assassination in Sarajevo triggered a web of alliances, plunging Europe into World War I, leading to the collapse of four empires.",
    category: "War",
    region: "Global",
    era: "Modern Era",
  },
  {
    id: "russian-revolution",
    year: 1917,
    title: "Bolshevik Revolution",
    description: "Vladimir Lenin and the Bolsheviks seized power in Russia, leading to the establishment of the Soviet Union and the rise of global communism.",
    category: "Politics",
    region: "Europe",
    era: "Modern Era",
  },
  {
    id: "ww2",
    year: 1939,
    title: "Invasion of Poland",
    description: "Nazi Germany invaded Poland, initiating World War II, the deadliest conflict in human history which reshaped the global political landscape.",
    category: "War",
    region: "Global",
    era: "Modern Era",
  },
  {
    id: "atomic-bomb",
    year: 1945,
    title: "Atomic Bombings of Japan",
    description: "The United States detonated two nuclear weapons over the Japanese cities of Hiroshima and Nagasaki, ending World War II and beginning the Atomic Age.",
    category: "Technology",
    region: "Asia",
    era: "Modern Era",
  },
  {
    id: "dna-structure",
    year: 1953,
    title: "Discovery of DNA Structure",
    description: "James Watson and Francis Crick published the double-helix structure of DNA, unlocking the molecular basis of genetics and heredity.",
    category: "Science",
    region: "Europe",
    era: "Modern Era",
  },
  {
    id: "moon-landing",
    year: 1969,
    title: "Apollo 11 Moon Landing",
    description: "American astronauts Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon, marking a pinnacle of human engineering.",
    category: "Exploration",
    region: "Global",
    era: "Modern Era",
  },
  {
    id: "world-wide-web",
    year: 1989,
    title: "Invention of the World Wide Web",
    description: "Tim Berners-Lee invented the World Wide Web, launching the Information Age and fundamentally changing how humanity communicates and works.",
    category: "Technology",
    region: "Global",
    era: "Modern Era",
  },
  {
    id: "human-genome",
    year: 2003,
    title: "Human Genome Project Completed",
    description: "Scientists successfully mapped the entire human genome, opening new frontiers in medicine, biology, and the understanding of human evolution.",
    category: "Science",
    region: "Global",
    era: "Modern Era",
  },
];
