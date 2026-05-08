import { TimelineData } from './types';

export const romansInBritainData: TimelineData = {
  id: 'romans-in-britain',
  title: 'Romans in Britain',
  subtitle: "From Caesar's raids to the final withdrawal",
  startYear: -55,
  endYear: 410,
  defaultZoomPreset: 'centuries',
  eras: [
    {
      id: 'caesars-raids',
      name: "Caesar's Raids",
      startYear: -55,
      endYear: -54,
      colour: '#3d5a3e',
      description: "Julius Caesar led two military expeditions to Britain. Though he won battles against the British tribes, he didn't conquer the island, instead taking hostages and setting up treaties before returning to Gaul.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Julius_Caesar%27s_invasions_of_Britain'
    },
    {
      id: 'pre-conquest',
      name: 'Pre-Conquest Client Kingdoms',
      startYear: -54,
      endYear: 43,
      colour: '#9b2335',
      description: "For nearly a century after Caesar left, Britain remained independent but heavily influenced by Rome. Powerful British kings traded with the empire and some even styled themselves after Roman rulers.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Roman_Britain#Pre-conquest_client_kingdoms'
    },
    {
      id: 'conquest-resistance',
      name: 'Conquest and Resistance',
      startYear: 43,
      endYear: 84,
      colour: '#3d5a80',
      description: "Emperor Claudius launched the full conquest of Britain. The Roman legions advanced rapidly but faced fierce resistance, most notably from the British chieftain Caratacus and Queen Boudica.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Roman_conquest_of_Britain'
    },
    {
      id: 'consolidation',
      name: 'Consolidation',
      startYear: 84,
      endYear: 122,
      colour: '#7a7a72',
      description: "After Agricola's campaigns in Scotland, the Romans consolidated their hold on the province. Roman towns, villas, and roads were established, deeply embedding Roman culture into British life.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Roman_Britain'
    },
    {
      id: 'hadrians-wall-era',
      name: "Hadrian's Wall Era",
      startYear: 122,
      endYear: 208,
      colour: '#3d5a3e',
      description: "Emperor Hadrian ordered a massive wall built to separate the Roman province from the unconquered tribes to the north. This era saw the height of Roman military engineering and frontier life in Britain.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Hadrian%27s_Wall'
    },
    {
      id: 'late-roman-britain',
      name: 'Late Roman Britain',
      startYear: 208,
      endYear: 410,
      colour: '#9b2335',
      description: "Despite a golden age of prosperous villas in the south, the later period saw increasing threats from Saxon pirates, Irish raiders, and Picts. Eventually, the Roman army withdrew to fight civil wars on the continent.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/End_of_Roman_rule_in_Britain'
    }
  ],
  rulers: [
    {
      id: 'julius-caesar',
      name: 'Julius Caesar',
      startYear: -55,
      endYear: -54,
      eraId: 'caesars-raids',
      description: "Though not a governor, Caesar was the first Roman general to cross the Channel and fight on British soil. His detailed writings give us our earliest historical accounts of the British people.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Julius_Caesar'
    },
    {
      id: 'aulus-plautius',
      name: 'Aulus Plautius',
      startYear: 43,
      endYear: 47,
      eraId: 'conquest-resistance',
      description: "Aulus Plautius commanded the main Roman invasion of Britain in 43 CE under Emperor Claudius. He led four legions across the Channel and defeated the British kings Caratacus and Togodumnus at the Battle of the Medway. He became the first governor of the new province of Britannia.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Aulus_Plautius'
    },
    {
      id: 'ostorius-scapula',
      name: 'Ostorius Scapula',
      startYear: 47,
      endYear: 52,
      eraId: 'conquest-resistance',
      description: "The second Roman governor, he defeated the British leader Caratacus and captured him, sending him in chains to Rome.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Publius_Ostorius_Scapula'
    },
    {
      id: 'didius-gallus',
      name: 'Didius Gallus',
      startYear: 52,
      endYear: 57,
      eraId: 'conquest-resistance',
      description: "Governor who consolidated Roman gains and intervened in the complex politics of the British Brigantes tribe.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Aulus_Didius_Gallus'
    },
    {
      id: 'quintus-veranius',
      name: 'Quintus Veranius',
      startYear: 57,
      endYear: 58,
      eraId: 'conquest-resistance',
      description: "Appointed to conquer Wales, but died within a year of taking office.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Quintus_Veranius'
    },
    {
      id: 'gnaeus-julius-agricola',
      name: 'Gnaeus Julius Agricola',
      startYear: 77,
      endYear: 84,
      eraId: 'conquest-resistance',
      description: "Governor Gnaeus Julius Agricola was Rome's most successful commander in Britain. He pushed Roman rule deep into Scotland, winning a great victory at the Battle of Mons Graupius — the northernmost land battle in Roman history. His son-in-law Tacitus wrote a biography of him, our main source for this period.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Gnaeus_Julius_Agricola',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Agricola.jpg/220px-Agricola.jpg'
    },
    {
      id: 'sextus-julius-severus',
      name: 'Sextus Julius Severus',
      startYear: 130,
      endYear: 133,
      eraId: 'hadrians-wall-era',
      description: "A highly capable general brought in by Emperor Hadrian. He later left Britain to crush the Bar Kokhba revolt in Judea.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Sextus_Julius_Severus'
    },
    {
      id: 'quintus-lollius-urbicus',
      name: 'Quintus Lollius Urbicus',
      startYear: 139,
      endYear: 142,
      eraId: 'hadrians-wall-era',
      description: "Governor who pushed the frontier north again and oversaw the construction of the Antonine Wall in Scotland.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Quintus_Lollius_Urbicus'
    },
    {
      id: 'gnaeus-julius-verus',
      name: 'Gnaeus Julius Verus',
      startYear: 158,
      endYear: 163,
      eraId: 'hadrians-wall-era',
      description: "Faced significant unrest in northern Britain and likely oversaw the withdrawal from the Antonine Wall back to Hadrian's Wall.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Gnaeus_Julius_Verus'
    },
    {
      id: 'clodius-albinus',
      name: 'Clodius Albinus',
      startYear: 192,
      endYear: 197,
      eraId: 'hadrians-wall-era',
      description: "A powerful governor who declared himself Emperor. He took the British legions to Gaul to fight for the throne but was defeated by Septimius Severus.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Clodius_Albinus'
    },
    {
      id: 'septimius-severus-britain',
      name: 'Septimius Severus',
      startYear: 208,
      endYear: 211,
      eraId: 'late-roman-britain',
      description: "Emperor Septimius Severus personally led a massive military campaign into Scotland in 208-211 CE, the last major Roman military push into Scotland. He nearly succeeded in subduing the entire island but died at York before completing the conquest. His campaigns were the largest military operation in Britain since the initial conquest.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Septimius_Severus'
    },
    {
      id: 'carausius',
      name: 'Carausius',
      startYear: 286,
      endYear: 293,
      eraId: 'late-roman-britain',
      description: "Marcus Aurelius Carausius was a Roman naval commander who declared himself Emperor of Britain and northern Gaul, creating a breakaway 'British Empire' that lasted for seven years. He was a capable ruler who maintained Roman standards and kept Britain prosperous, but was eventually assassinated by his own finance minister.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Carausius'
    },
    {
      id: 'magnus-maximus',
      name: 'Magnus Maximus',
      startYear: 383,
      endYear: 388,
      eraId: 'late-roman-britain',
      description: "Magnus Maximus was a successful general in Britain who was proclaimed emperor by his troops in 383 CE. He withdrew much of the Roman army from Britain to support his campaigns in Gaul and Spain, leaving Britain increasingly exposed to raids. In Welsh legend he is remembered as Macsen Wledig.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Magnus_Maximus'
    }
  ],
  events: [
    {
      id: 'caesar-raid-1',
      name: "Caesar's First Raid",
      year: -55,
      category: 'war',
      description: "Julius Caesar's first expedition to Britain. The landing was fiercely contested by British charioteers on the beaches of Kent. Storms damaged the Roman fleet, forcing Caesar to return to Gaul before winter.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Julius_Caesar%27s_invasions_of_Britain'
    },
    {
      id: 'caesar-raid-2',
      name: "Caesar's Second Raid",
      year: -54,
      category: 'war',
      description: "Caesar returned with a much larger force of five legions. He pushed inland, crossed the Thames, and forced the powerful British king Cassivellaunus to submit and pay tribute.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Julius_Caesar%27s_invasions_of_Britain'
    },
    {
      id: 'claudian-invasion',
      name: 'Claudian Invasion',
      year: 43,
      category: 'war',
      description: "Emperor Claudius ordered the full conquest of Britain. Under the command of Aulus Plautius, four Roman legions landed in Kent, beginning nearly 400 years of Roman rule.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Roman_conquest_of_Britain'
    },
    {
      id: 'battle-medway',
      name: 'Battle of the Medway',
      year: 43,
      category: 'war',
      description: "A crucial early battle in the Roman conquest. The Romans surprised the British army by swimming fully armed across the River Medway. Emperor Claudius later arrived to lead the final march into the British capital, Camulodunum.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Battle_of_the_Medway'
    },
    {
      id: 'boudican-revolt',
      name: "Boudica's Revolt",
      year: 60,
      category: 'war',
      description: "Queen Boudica of the Iceni tribe led a massive uprising against the Romans after being flogged and seeing her daughters attacked. Her army destroyed the Roman cities of Camulodunum, Londinium, and Verulamium.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Boudica'
    },
    {
      id: 'watling-street',
      name: 'Battle of Watling Street',
      year: 61,
      category: 'war',
      description: "The decisive battle that ended Boudica's revolt. A heavily outnumbered Roman force under Suetonius Paulinus used superior tactics and discipline to defeat the massive British army, securing Roman rule in Britain.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Battle_of_Watling_Street'
    },
    {
      id: 'wales-conquest',
      name: 'Conquest of Wales',
      year: 78,
      category: 'war',
      description: "Agricola completed the gruelling conquest of the rugged Welsh tribes, culminating in an amphibious assault on the druidic stronghold of Anglesey (Mona).",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Roman_conquest_of_Anglesey'
    },
    {
      id: 'mons-graupius',
      name: 'Battle of Mons Graupius',
      year: 84,
      category: 'war',
      description: "Agricola's legions defeated a massive army of Caledonians (Picts) in northern Scotland. Despite the victory, Roman troops were soon withdrawn from the far north to fight elsewhere in the empire.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Battle_of_Mons_Graupius'
    },
    {
      id: 'hadrians-wall-starts',
      name: "Hadrian's Wall Begun",
      year: 122,
      category: 'politics',
      description: "Following Emperor Hadrian's visit to Britain, construction began on a magnificent stone wall across northern England. It took around six years to build and marked the northernmost frontier of the Roman Empire.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Hadrian%27s_Wall'
    },
    {
      id: 'antonine-wall',
      name: 'Antonine Wall Built',
      year: 142,
      category: 'politics',
      description: "The Romans pushed north again and built a turf and timber wall across the narrow neck of Scotland between the Forth and the Clyde. It was abandoned after only about 20 years.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Antonine_Wall'
    },
    {
      id: 'severan-campaigns',
      name: 'Severan Campaigns',
      year: 208,
      category: 'war',
      description: "Emperor Septimius Severus brought a massive army to Britain to crush the rebellious northern tribes. Though militarily successful, Severus died at Eboracum (York) in 211, and the Romans retreated back to Hadrian's Wall.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Roman_invasion_of_Caledonia_(208%E2%80%93210)'
    },
    {
      id: 'carausian-revolt',
      name: 'Carausian Revolt',
      year: 286,
      category: 'politics',
      description: "The naval commander Carausius rebelled and seized power, establishing a breakaway 'Britannic Empire'. For a decade, Britain was an independent Roman state.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Carausian_Revolt'
    },
    {
      id: 'diocletian-recapture',
      name: 'Constantius Chlorus Recaptures Britain',
      year: 296,
      category: 'war',
      description: "A Roman fleet successfully crossed the Channel in heavy fog and defeated the British usurper Allectus (who had murdered Carausius), bringing Britain back into the Roman Empire.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Carausian_Revolt#Recovery_by_Rome'
    },
    {
      id: 'great-conspiracy',
      name: 'Great Conspiracy',
      year: 367,
      category: 'disaster',
      description: "A catastrophic year when the Roman garrison on Hadrian's Wall mutinied, allowing a coordinated attack by Picts from the north, Scots (Irish) from the west, and Saxons from the east. It took a skilled general, Count Theodosius, to restore order.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Great_Conspiracy'
    },
    {
      id: 'rescript-honorius',
      name: 'Rescript of Honorius',
      year: 410,
      category: 'politics',
      description: "Under severe pressure from barbarian invasions in Italy, Emperor Honorius wrote to the British cities telling them they must 'look to their own defences'. This is seen as the official end of Roman rule in Britain.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/End_of_Roman_rule_in_Britain'
    }
  ],
  constructions: [
    {
      id: 'camulodunum',
      name: 'Camulodunum Fortress',
      year: 43,
      category: 'fort',
      description: "The first Roman legionary fortress in Britain, established at modern-day Colchester. It later became a colony for retired soldiers and the first capital of the new province.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Camulodunum'
    },
    {
      id: 'londinium',
      name: 'Londinium Founded',
      year: 47,
      category: 'monument',
      description: "Roman traders established a settlement on the River Thames. With its deep-water port, it quickly became the commercial heart and later the capital of Roman Britain.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Londinium'
    },
    {
      id: 'lindum',
      name: 'Lindum (Lincoln) Fortress',
      year: 48,
      category: 'fort',
      description: "A major legionary fortress established by the Ninth Legion. It later became an important colonia (settlement for retired veterans).",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Lindum_Colonia'
    },
    {
      id: 'aquae-sulis',
      name: 'Baths of Aquae Sulis',
      year: 60,
      category: 'temple',
      description: "The Romans constructed a magnificent bath and temple complex around the natural hot springs at modern-day Bath, dedicated to the goddess Sulis Minerva.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Aquae_Sulis'
    },
    {
      id: 'eboracum',
      name: 'Eboracum (York) Fortress',
      year: 71,
      category: 'fort',
      description: "A major military base established in northern England. Two Roman emperors, Septimius Severus and Constantius Chlorus, would later die here.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Eboracum'
    },
    {
      id: 'deva',
      name: 'Deva Victrix (Chester)',
      year: 74,
      category: 'fort',
      description: "The vast fortress of the Twentieth Legion on the River Dee. Its massive stone walls still form the core of the city walls of Chester today.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Deva_Victrix'
    },
    {
      id: 'isca',
      name: 'Isca Augusta (Caerleon)',
      year: 75,
      category: 'fort',
      description: "The fortress of the Second Augustan Legion in south Wales, boasting a magnificent amphitheatre that locals later believed to be King Arthur's Round Table.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Isca_Augusta'
    },
    {
      id: 'hadrians-wall-const',
      name: "Hadrian's Wall",
      year: 122,
      category: 'fort',
      description: "A 73-mile-long stone barrier stretching from the Tyne to the Solway. It was dotted with milecastles, turrets, and large forts, representing an incredible feat of Roman engineering.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Hadrian%27s_Wall'
    },
    {
      id: 'antonine-wall-const',
      name: 'Antonine Wall',
      year: 142,
      category: 'fort',
      description: "A turf and timber fortification built across the central belt of Scotland. Though shorter than Hadrian's Wall, it was heavily fortified, but proved too difficult to maintain.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Antonine_Wall'
    },
    {
      id: 'silchester',
      name: 'Calleva (Silchester) Walls',
      year: 200,
      category: 'monument',
      description: "Massive stone town walls were erected around this important Roman city. Unusually, Calleva was never built over in later periods, leaving the Roman street plan intact beneath the fields.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Calleva_Atrebatum'
    },
    {
      id: 'saxon-shore',
      name: 'Saxon Shore Forts',
      year: 280,
      category: 'fort',
      description: "A series of massive, imposing coastal forts built along the coast of south-east England to defend against increasing raids from Saxon pirates.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Saxon_Shore'
    },
    {
      id: 'yorkshire-signals',
      name: 'Yorkshire Signal Stations',
      year: 370,
      category: 'fort',
      description: "A network of tall, heavily defended coastal watchtowers built along the Yorkshire coast to provide early warning of seaborne raids from Picts and Saxons.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Roman_Britain'
    }
  ]
};