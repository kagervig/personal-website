import { TimelineData, Era, Ruler, Event, Construction, TimelineId } from '../types';

export const romeData: TimelineData = {
  id: 'rome',
  title: 'Roman Empire',
  subtitle: 'From the founding of Rome to the fall of Constantinople',
  startYear: -753,
  endYear: 1453,
  defaultZoomPreset: 'centuries',
  eras: [
    {
      id: 'kingdom',
      name: 'Roman Kingdom',
      startYear: -753,
      endYear: -509,
      colour: '#4a5c7a',
      description: "According to legend, Rome was founded in 753 BCE by the twin brothers Romulus and Remus. The early city was ruled by a series of kings who transformed Rome from a small hilltop settlement into a powerful city-state.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Roman_Kingdom'
    },
    {
      id: 'republic',
      name: 'Roman Republic',
      startYear: -509,
      endYear: -27,
      colour: '#722f37',
      description: "Established in 509 BCE, the Republic was led by two annually elected Consuls and the Senate. It was a period of massive expansion and internal strife, culminating in the rise of Julius Caesar and the eventual transition to the Empire.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Roman_Republic'
    },
    {
      id: 'principate',
      name: 'Early Roman Empire',
      shortName: 'Principate',
      startYear: -27,
      endYear: 284,
      colour: '#8c6b2f',
      description: "Augustus Caesar became the first Roman Emperor in 27 BCE. Under strong emperors, Rome reached its greatest extent, governing 70 million people across Europe, North Africa, and western Asia.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Roman_Empire'
    },
    {
      id: 'crisis',
      name: 'Crisis of the Third Century',
      startYear: 235,
      endYear: 284,
      colour: '#5c3566',
      description: "The Roman Empire nearly collapsed due to plague, invasion, and economic collapse. Over 20 emperors came and went in just 50 years.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Crisis_of_the_Third_Century'
    },
    {
      id: 'dominate',
      name: 'Late Roman Empire',
      shortName: 'Dominate',
      startYear: 284,
      endYear: 395,
      colour: '#6a7f8e',
      description: "Emperors Diocletian and Constantine reformed and stabilised the empire. Constantine legalised Christianity and moved the capital to Constantinople.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Dominate'
    },
    {
      id: 'western-empire',
      name: 'Western Roman Empire',
      startYear: 395,
      endYear: 476,
      colour: '#722f37',
      description: "The Western Roman Empire struggled to hold back invaders. In 476 CE, the last western emperor was deposed, marking the fall of the West.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Western_Roman_Empire'
    },
    {
      id: 'byzantine',
      name: 'Eastern Roman Empire',
      shortName: 'Byzantine',
      startYear: 476,
      endYear: 1453,
      colour: '#4a5c7a',
      description: "The Eastern Roman Empire survived for another thousand years, preserving Roman law and Christian culture until the fall of Constantinople.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Byzantine_Empire'
    }
  ],
  rulers: [
    {
      id: 'numa-pompilius',
      name: 'Numa Pompilius',
      startYear: -715,
      endYear: -673,
      eraId: 'kingdom',
      description: "Rome's second king, remembered for his wisdom and piety. He established many of the city's most important religious institutions.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Numa_Pompilius'
    },
    {
      id: 'tarquinius-priscus',
      name: 'Tarquinius Priscus',
      startYear: -616,
      endYear: -579,
      eraId: 'kingdom',
      description: "The first Etruscan king of Rome. He brought Etruscan engineering and culture to the city.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Lucius_Tarquinius_Priscus'
    },
    {
      id: 'servius-tullius',
      name: 'Servius Tullius',
      startYear: -578,
      endYear: -535,
      eraId: 'kingdom',
      description: "Transformative king credited with establishing the census and dividing the population into classes.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Servius_Tullius'
    },
    {
      id: 'republic-rulers',
      name: 'Roman Republic',
      startYear: -509,
      endYear: -27,
      eraId: 'republic',
      description: "Two consuls were elected each year to lead the Republic. Power was shared with the Senate.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Roman_Republic',
      unknown: false
    },
    {
      id: 'sulla',
      name: 'Lucius Cornelius Sulla',
      startYear: -82,
      endYear: -79,
      eraId: 'republic',
      description: "Sulla was the first Roman general to march on Rome and seize total power, declaring himself Dictator to 'restore the Republic'.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Sulla'
    },
    {
      id: 'augustus',
      name: 'Augustus',
      startYear: -27,
      endYear: 14,
      eraId: 'principate',
      description: "Rome's first emperor who established the Pax Romana.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Augustus',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Statue-Augustus.jpg/220px-Statue-Augustus.jpg'
    },
    {
      id: 'trajan',
      name: 'Trajan',
      startYear: 98,
      endYear: 117,
      eraId: 'principate',
      description: "Greatest military emperor who expanded the empire to its largest ever extent.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Trajan',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Trajan_bust.jpg/220px-Trajan_bust.jpg'
    },
    {
      id: 'hadrian',
      name: 'Hadrian',
      startYear: 117,
      endYear: 138,
      eraId: 'principate',
      description: "Cultured ruler who consolidated borders and rebuilt the Pantheon.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Hadrian',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Bust_of_Hadrian_in_the_Museo_del_Prado_n%C2%BA212_cropped.jpeg/220px-Bust_of_Hadrian_in_the_Museo_del_Prado_n%C2%BA212_cropped.jpeg'
    },
    {
      id: 'marcus-aurelius',
      name: 'Marcus Aurelius',
      startYear: 161,
      endYear: 180,
      eraId: 'principate',
      description: "The 'philosopher emperor' and author of 'Meditations'.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Marcus_Aurelius',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/MSR-ra-1-DM-crop.jpg/220px-MSR-ra-1-DM-crop.jpg'
    },
    {
      id: 'diocletian',
      name: 'Diocletian',
      startYear: 284,
      endYear: 305,
      eraId: 'dominate',
      description: "Saved the empire from collapse by introducing the Tetrarchy and massive reforms.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Diocletian'
    },
    {
      id: 'constantine-i',
      name: 'Constantine I',
      startYear: 306,
      endYear: 337,
      eraId: 'dominate',
      description: "First Christian emperor who moved the capital to Constantinople.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Constantine_the_Great',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Constantinople_Colossus.jpg/220px-Constantinople_Colossus.jpg'
    },
    {
      id: 'justinian-i',
      name: 'Justinian I',
      startYear: 527,
      endYear: 565,
      eraId: 'byzantine',
      description: "Reconquered much of the West and built Hagia Sophia.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Justinian_I',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/JustinianCodex.jpg/220px-JustinianCodex.jpg'
    }
  ],
  events: [
    {
      id: 'founding-of-rome',
      name: 'Founding of Rome',
      year: -753,
      category: 'politics',
      description: "Traditional date marking the beginning of the Roman timeline.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Founding-of-rome',
      importance: 3
    },
    {
      id: 'republic-founded',
      name: 'Expulsion of Kings',
      year: -509,
      category: 'politics',
      description: "The last king, Tarquin the Proud, was overthrown. Rome established a Republic led by two annually elected Consuls.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Overthrow_of_the_Roman_monarchy',
      importance: 3
    },
    {
      id: 'gallic-sack',
      name: 'Sack of Rome by Gauls',
      year: -390,
      category: 'war',
      description: "A traumatising defeat at the hands of Brennus and the Gauls.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Battle_of_the_Allia',
      importance: 2
    },
    {
      id: 'punic-wars',
      name: 'The Punic Wars',
      year: -264,
      category: 'war',
      description: "Three massive wars against Carthage. Rome gained control of the Western Mediterranean.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Punic_Wars',
      importance: 3
    },
    {
      id: 'gracchan-reforms',
      name: 'Gracchan Reforms',
      year: -133,
      category: 'politics',
      description: "Violent political strife over land redistribution.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Gracchi_brothers',
      importance: 2
    },
    {
      id: 'sulla-dictatorship',
      name: 'Sulla’s Dictatorship',
      year: -82,
      category: 'politics',
      description: "The first time a Roman general marched on Rome and seized total power.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Sulla',
      importance: 2
    },
    {
      id: 'first-triumvirate',
      name: 'The First Triumvirate',
      year: -60,
      category: 'politics',
      description: "An informal political alliance between Caesar, Pompey, and Crassus.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/First_Triumvirate',
      importance: 3
    },
    {
      id: 'caesar-assassinated',
      name: 'Julius Caesar Assassinated',
      year: -44,
      category: 'politics',
      description: "The death of Julius Caesar led to the final civil wars of the Republic.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Assassination_of_Julius_Caesar',
      importance: 3
    },
    {
      id: 'battle-of-actium',
      name: 'Battle of Actium',
      year: -31,
      category: 'war',
      description: "Octavian defeated Mark Antony and Cleopatra, becoming sole ruler of the Roman world.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Battle_of_Actium',
      importance: 3
    },
    {
      id: 'vesuvius-eruption',
      name: 'Vesuvius Eruption',
      year: 79,
      category: 'disaster',
      description: "Mount Vesuvius erupted, burying Pompeii and Herculaneum.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Eruption_of_Mount_Vesuvius_in_79_AD',
      importance: 2
    },
    {
      id: 'edict-of-milan',
      name: 'Edict of Milan',
      year: 313,
      category: 'legislation',
      description: "Constantine establishing religious tolerance.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Edict_of_Milan',
      importance: 2
    },
    {
      id: 'sack-of-rome',
      name: 'Sack of Rome',
      year: 410,
      category: 'war',
      description: "The Visigoths breached Rome's walls for the first time in 800 years.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Sack_of_Rome_(410)',
      importance: 3
    },
    {
      id: 'fall-of-constantinople',
      name: 'Fall of Constantinople',
      year: 1453,
      category: 'war',
      description: "The end of the Roman Empire after over 2,000 years.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Fall_of_Constantinople',
      importance: 3
    }
  ],
  constructions: [
    {
      id: 'roman-forum',
      name: 'Roman Forum Expansion',
      year: -700,
      category: 'monument',
      description: "During the Republic, the Forum became the political heart of the world.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Roman_Forum',
      importance: 3
    },
    {
      id: 'servian-wall-rebuilt',
      name: 'Servian Wall',
      year: -378,
      category: 'fort',
      description: "Rebuilt after the Gallic Sack using massive Tufa blocks.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Servian_Wall',
      importance: 2
    },
    {
      id: 'via-appia',
      name: 'Via Appia',
      year: -312,
      category: 'road',
      description: "The first and most famous long-distance Roman road.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Appian_Way',
      importance: 3
    },
    {
      id: 'aqua-appia',
      name: 'Aqua Appia',
      year: -312,
      category: 'landmark',
      description: "Rome’s first aqueduct, mostly underground to protect it during wartime.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Aqua_Appia',
      importance: 2
    },
    {
      id: 'pons-aemilius',
      name: 'Pons Aemilius',
      year: -142,
      category: 'bridge',
      description: "The first stone bridge across the Tiber River.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Pons_Aemilius',
      importance: 1
    },
    {
      id: 'temple-portunus',
      name: 'Temple of Portunus',
      year: -100,
      category: 'temple',
      description: "An incredibly well-preserved temple showing transition to Ionic style.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Temple_of_Portunus',
      importance: 1
    },
    {
      id: 'theatre-pompey',
      name: 'Theatre of Pompey',
      year: -55,
      category: 'monument',
      description: "The first permanent stone theatre in Rome.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Theatre_of_Pompey',
      importance: 2
    },
    {
      id: 'forum-caesar',
      name: 'Forum of Caesar',
      year: -46,
      category: 'monument',
      description: "The first of the 'Imperial Fora,' built by Julius Caesar.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Forum_of_Caesar',
      importance: 2
    },
    {
      id: 'colosseum',
      name: 'Colosseum',
      year: 80,
      category: 'monument',
      description: "The Flavian Amphitheatre, the largest ancient amphitheatre ever built.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Colosseum',
      importance: 3
    },
    {
      id: 'pantheon',
      name: 'Pantheon',
      year: 125,
      category: 'temple',
      description: "Rebuilt by Hadrian with the world's largest unreinforced concrete dome.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Pantheon,_Rome',
      importance: 3
    },
    {
      id: 'hagia-sophia',
      name: 'Hagia Sophia',
      year: 537,
      category: 'church',
      description: "The epitome of Byzantine architecture, built by Justinian I.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Hagia_Sophia',
      importance: 3
    }
  ],
  population: [
    {
      id: 'pop-8bce',
      century: '8th BCE',
      year: -750,
      count: '1,000 – 5,000',
      description: "A collection of small huts on the Palatine and Quirinal hills."
    },
    {
      id: 'pop-6bce',
      century: '6th BCE',
      year: -550,
      count: '20,000 – 35,000',
      description: "Significant growth under the later Etruscan kings."
    },
    {
      id: 'pop-4bce',
      century: '4th BCE',
      year: -350,
      count: '40,000 – 60,000',
      description: "Growth follows the recovery from the Gallic Sack of Rome."
    },
    {
      id: 'pop-2bce',
      century: '2nd BCE',
      year: -150,
      count: '150,000 – 250,000',
      description: "Rome becomes a Mediterranean superpower after the Punic Wars."
    },
    {
      id: 'pop-1bce',
      century: '1st BCE',
      year: -50,
      count: '750,000 – 1,000,000',
      description: "Rome becomes the first city in history to hit 1 million people."
    },
    {
      id: 'pop-2ce',
      century: '2nd CE',
      year: 150,
      count: '1,000,000+',
      description: "The peak of the Empire under the Antonine Emperors."
    },
    {
      id: 'pop-4ce',
      century: '4th CE',
      year: 350,
      count: '500,000 – 800,000',
      description: "Population begins to fluctuate as the capital moves to Constantinople."
    },
    {
      id: 'pop-6ce',
      century: '6th CE',
      year: 550,
      count: '30,000 – 50,000',
      description: "Following the Gothic Wars, Rome's population collapses dramatically."
    }
  ]
};
