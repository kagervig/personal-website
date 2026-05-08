import { TimelineData, Era, Ruler, Event, Construction, TimelineId } from '../types';

export const britainData: TimelineData = {
  id: 'britain',
  title: 'Britain Through the Ages',
  subtitle: 'From the first humans to the modern nation',
  startYear: -900000,
  endYear: 2024,
  defaultZoomPreset: 'decades',
  defaultCentreYear: 1000,
  eras: [
    {
      id: 'lower-palaeolithic',
      name: 'Lower Palaeolithic',
      startYear: -900000,
      endYear: -40000,
      colour: '#8b7355',
      description: "The earliest evidence of ancient human species in Britain. During this immense period, Britain was repeatedly connected to and separated from continental Europe due to devastating ice ages. Early humans made simple stone tools and hunted enormous animals like mammoths and straight-tusked elephants.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Genetic_history_of_the_British_Isles#Palaeolithic'
    },
    {
      id: 'middle-upper-palaeolithic',
      name: 'Middle & Upper Palaeolithic',
      startYear: -40000,
      endYear: -10000,
      colour: '#7a5c2e',
      description: "Modern humans (Homo sapiens) arrived in Britain. During the coldest parts of the Ice Age, the land became a frozen wasteland and was completely abandoned. The famous 'Red Lady of Paviland' (actually a man) was buried in a Welsh cave during this era.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Upper_Palaeolithic'
    },
    {
      id: 'mesolithic',
      name: 'Mesolithic',
      startYear: -10000,
      endYear: -4000,
      colour: '#6b4c1e',
      description: "As the ice finally retreated, Britain became a densely forested island. Hunter-gatherer communities adapted to the new landscape, making tiny, sharp flint tools called microliths. Around 6500 BCE, rising sea levels permanently cut Britain off from Europe.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Mesolithic'
    },
    {
      id: 'neolithic',
      name: 'Neolithic',
      startYear: -4000,
      endYear: -2500,
      colour: '#c9a84c',
      description: "A massive revolution: people learned to farm. They cleared forests to grow wheat and keep domestic animals like sheep and cows. They also began building enormous communal monuments, including huge earthworks and early stone circles.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Neolithic_British_Isles'
    },
    {
      id: 'bronze-age',
      name: 'Bronze Age',
      startYear: -2500,
      endYear: -750,
      colour: '#b5651d',
      description: "People discovered how to mix copper and tin to make bronze, revolutionising tools and weapons. Society became more unequal, with powerful chieftains buried with wealthy grave goods. This era saw the completion of Stonehenge and increased trade with Europe.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Bronze_Age_Britain'
    },
    {
      id: 'iron-age',
      name: 'Iron Age',
      startYear: -750,
      endYear: 43,
      colour: '#4a4a4a',
      description: "The discovery of ironworking made stronger, cheaper weapons and farming tools. The population grew rapidly, and people built massive defensive hillforts. These 'Celtic' tribes were skilled artists and fierce warriors who fiercely resisted early Roman invasions.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Iron_Age_Britain'
    },
    {
      id: 'roman-britain',
      name: 'Roman Britain',
      startYear: 43,
      endYear: 410,
      colour: '#6b3fa0',
      description: "The Roman Empire conquered much of Britain, introducing towns, straight roads, writing, bathhouses, and eventually Christianity. While many native Britons adopted Roman ways, tribes in Scotland successfully resisted conquest. The Romans eventually abandoned Britain to defend their crumbling empire.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Roman_Britain'
    },
    {
      id: 'anglo-saxon',
      name: 'Anglo-Saxon & Viking Age',
      startYear: 410,
      endYear: 1066,
      colour: '#c8a000',
      description: "After the Romans left, Germanic tribes (Angles, Saxons, Jutes) settled in Britain, bringing a new language that became English. Later, terrifying Viking raids from Scandinavia developed into full-scale invasions, before the kingdoms finally united into a single 'England'.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Anglo-Saxon_England'
    },
    {
      id: 'medieval',
      name: 'Medieval',
      startYear: 1066,
      endYear: 1485,
      colour: '#5c3d1a',
      description: "Beginning with the dramatic Norman Conquest, this was an age of castles, knights, and powerful monasteries. It saw the sealing of Magna Carta, devastating plagues like the Black Death, and decades of bitter civil war known as the Wars of the Roses.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/England_in_the_Middle_Ages'
    },
    {
      id: 'early-modern',
      name: 'Early Modern',
      startYear: 1485,
      endYear: 1760,
      colour: '#1a3a6b',
      description: "A period of tremendous upheaval. The Tudor monarchs broke away from the Catholic Church, while the Stuarts fought a bloody Civil War with Parliament. It was an age of global exploration, Shakespearean theatre, scientific discovery, and the formal union of England and Scotland.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Early_modern_Britain'
    },
    {
      id: 'industrial-revolution',
      name: 'Industrial Revolution',
      startYear: 1760,
      endYear: 1914,
      colour: '#2c4a1e',
      description: "Britain transformed from a farming country into the 'workshop of the world'. Steam engines, factories, and railways changed everyday life forever. Cities exploded in size, and Britain built a vast global empire, while ordinary people began demanding democratic rights.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Industrial_Revolution'
    },
    {
      id: 'modern-britain',
      name: 'Modern Britain',
      startYear: 1914,
      endYear: 2024,
      colour: '#1a4a6b',
      description: "The 20th century opened with the horrors of two World Wars. The post-war period saw the decline of the empire, the creation of the NHS and welfare state, dramatic technological leaps, and the transformation of Britain into a diverse, multicultural modern nation.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Social_history_of_the_United_Kingdom_(1945%E2%80%93present)'
    }
  ],
  rulers: [
    {
      id: 'hunter-gatherers',
      name: 'Hunter-Gatherer Peoples',
      startYear: -900000,
      endYear: -4000,
      eraId: 'lower-palaeolithic',
      description: "For hundreds of thousands of years, early humans and later modern humans lived as nomadic hunter-gatherers, moving across the landscape to follow herds of animals and find seasonal plants.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Hunter-gatherer',
      unknown: false
    },
    {
      id: 'neolithic-chiefs',
      name: 'Neolithic Tribes & Chiefdoms',
      startYear: -4000,
      endYear: -2500,
      eraId: 'neolithic',
      description: "The introduction of farming allowed people to settle in permanent villages. Society began to be led by powerful individuals or families who could organize the immense labour needed to build early monuments.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Neolithic_British_Isles',
      unknown: false
    },
    {
      id: 'bronze-chiefs',
      name: 'Bronze Age Chiefdoms',
      startYear: -2500,
      endYear: -750,
      eraId: 'bronze-age',
      description: "Society became more hierarchical. Powerful chieftains controlled the trade in precious metals needed to make bronze, and were often buried under massive circular mounds called barrows.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Bronze_Age_Britain',
      unknown: false
    },
    {
      id: 'iron-tribes',
      name: 'Iron Age Tribes (Celts)',
      startYear: -750,
      endYear: 43,
      eraId: 'iron-age',
      description: "Britain was divided into numerous fiercely independent tribal territories, each ruled by kings or queens. They minted their own coins and lived in heavily defended hillforts.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Iron_Age_Britain',
      unknown: false
    },
    {
      id: 'roman-province-rule',
      name: 'Roman Province of Britannia',
      startYear: 43,
      endYear: 410,
      eraId: 'roman-britain',
      description: "For nearly 400 years, Britain was a province of the vast Roman Empire, governed by Roman officials and protected by the formidable Roman army.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Roman_Britain',
      unknown: false
    },
    {
      id: 'anglo-saxon-kings',
      name: 'Anglo-Saxon Kingdoms',
      startYear: 410,
      endYear: 927,
      eraId: 'anglo-saxon',
      description: "England was divided into several competing kingdoms (the Heptarchy) including Wessex, Mercia, and Northumbria, which constantly fought each other and invading Vikings for supremacy.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Heptarchy',
      unknown: false
    },
    {
      id: 'english-monarchy',
      name: 'English Monarchy',
      startYear: 927,
      endYear: 1707,
      eraId: 'medieval',
      description: "From the unification of England by Æthelstan until the Act of Union, England was ruled as a single nation by successive royal dynasties, eventually forming a personal union with the Scottish crown.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/List_of_English_monarchs',
      unknown: false
    },
    {
      id: 'great-britain',
      name: 'Kingdom of Great Britain',
      startYear: 1707,
      endYear: 1801,
      eraId: 'early-modern',
      description: "Created by the political union of the kingdoms of England and Scotland, sharing a single parliament at Westminster.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Kingdom_of_Great_Britain',
      unknown: false
    },
    {
      id: 'uk',
      name: 'United Kingdom',
      startYear: 1801,
      endYear: 2024,
      eraId: 'modern-britain',
      description: "Following the union with Ireland (and the later independence of the Republic of Ireland), the modern constitutional monarchy of the UK emerged, with political power shifting firmly from the monarch to Parliament.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/United_Kingdom',
      unknown: false
    }
  ],
  events: [
    {
      id: 'first-humans',
      name: 'First humans in Britain',
      year: -900000,
      category: 'exploration',
      description: "The earliest evidence of ancient human species in Britain was found at Happisburgh in Norfolk, where fossilised footprints show early humans walking along a muddy estuary over 800,000 years ago.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Happisburgh_footprints'
    },
    {
      id: 'modern-humans',
      name: 'First modern humans',
      year: -40000,
      category: 'exploration',
      description: "Homo sapiens (our own species) arrived in Britain. They lived alongside Neanderthals for a brief period before the Neanderthals died out.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Genetic_history_of_the_British_Isles#Palaeolithic'
    },
    {
      id: 'doggerland-floods',
      name: 'Doggerland floods',
      year: -6500,
      category: 'climate',
      description: "As the last Ice Age melted, global sea levels rose dramatically. The low-lying land connecting Britain to Europe, known as Doggerland, was permanently flooded. Britain became an island.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Doggerland'
    },
    {
      id: 'farming-begins',
      name: 'Farming begins in Britain',
      year: -4000,
      category: 'science',
      description: "The idea of farming arrived with new migrants from Europe. Instead of hunting and gathering, people began to clear forests to grow wheat and keep domestic animals like cows and sheep.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Neolithic_British_Isles'
    },
    {
      id: 'bronze-age-begins',
      name: 'Bronze Age begins',
      year: -2500,
      category: 'science',
      description: "The 'Beaker People' arrived from Europe, bringing with them the knowledge of how to smelt copper and tin to create a new, hard metal: bronze.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Bronze_Age_Britain'
    },
    {
      id: 'first-iron',
      name: 'First iron working',
      year: -750,
      category: 'science',
      description: "Iron working technology reached Britain. Iron was much more common than the ingredients for bronze, meaning more people could afford strong metal tools and weapons.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Iron_Age_Britain'
    },
    {
      id: 'roman-invasion',
      name: 'Roman invasion',
      year: 43,
      category: 'war',
      description: "Under the orders of Emperor Claudius, a massive Roman army invaded Britain, beginning nearly four centuries of Roman occupation.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Roman_conquest_of_Britain'
    },
    {
      id: 'roman-withdrawal',
      name: 'Roman withdrawal',
      year: 410,
      category: 'politics',
      description: "Under severe attack from barbarian tribes elsewhere, the Roman army officially withdrew from Britain, leaving the native Britons to defend themselves.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/End_of_Roman_rule_in_Britain'
    },
    {
      id: 'anglo-saxon-settle',
      name: 'Anglo-Saxons settle',
      year: 450,
      category: 'politics',
      description: "Germanic tribes from northern Europe began to migrate to and settle in eastern Britain, eventually forming the early English kingdoms.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Anglo-Saxon_settlement_of_Britain'
    },
    {
      id: 'viking-raids',
      name: 'Viking raids begin',
      year: 793,
      category: 'war',
      description: "Viking raiders from Scandinavia attacked the wealthy monastery at Lindisfarne in Northumbria, sending shockwaves across Christian Europe.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Viking_activity_in_the_British_Isles'
    },
    {
      id: 'norman-conquest',
      name: 'Norman Conquest',
      year: 1066,
      category: 'war',
      description: "William the Conqueror defeated King Harold at the Battle of Hastings, violently introducing Norman rule and fundamentally changing English society.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Norman_Conquest'
    },
    {
      id: 'black-death-event',
      name: 'Black Death',
      year: 1348,
      category: 'disaster',
      description: "A horrific outbreak of bubonic plague struck Britain, killing up to half the population and causing massive economic and social changes.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Black_Death_in_England'
    },
    {
      id: 'printing-press',
      name: 'Printing press introduced',
      year: 1476,
      category: 'science',
      description: "William Caxton set up the first printing press in England at Westminster, revolutionising how information and literature could be shared.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/William_Caxton'
    },
    {
      id: 'english-civil-war',
      name: 'English Civil War',
      year: 1642,
      category: 'war',
      description: "A bitter and bloody conflict broke out between supporters of King Charles I and supporters of Parliament, eventually resulting in the King's execution.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/English_Civil_War'
    },
    {
      id: 'act-of-union',
      name: 'Act of Union with Scotland',
      year: 1707,
      category: 'politics',
      description: "The separate kingdoms of England and Scotland were formally united into a single political entity: the Kingdom of Great Britain.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Acts_of_Union_1707'
    },
    {
      id: 'industrial-rev-begins',
      name: 'Industrial Revolution begins',
      year: 1760,
      category: 'science',
      description: "A massive transition to new manufacturing processes began. Britain led the world in using coal and steam power to drive factories and transport.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Industrial_Revolution'
    },
    {
      id: 'abolition-slavery',
      name: 'Abolition of slavery',
      year: 1833,
      category: 'legislation',
      description: "After decades of campaigning, Parliament passed the Slavery Abolition Act, making the purchase or ownership of slaves illegal in most of the British Empire.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Slavery_Abolition_Act_1833'
    },
    {
      id: 'ww1',
      name: 'World War I',
      year: 1914,
      category: 'war',
      description: "Britain entered a devastating global conflict. Millions of British and Empire soldiers fought in horrific trench warfare, resulting in enormous casualties.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/History_of_the_United_Kingdom_during_the_First_World_War'
    },
    {
      id: 'ww2',
      name: 'World War II',
      year: 1939,
      category: 'war',
      description: "Britain fought to defend Europe against Nazi Germany. The war saw the terrifying bombing of British cities during the Blitz, and famous victories like the Battle of Britain.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/United_Kingdom_home_front_during_World_War_II'
    },
    {
      id: 'nhs-founded',
      name: 'NHS founded',
      year: 1948,
      category: 'politics',
      description: "The National Health Service was established by the post-war Labour government, providing free healthcare to everyone in Britain, based on need rather than the ability to pay.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/History_of_the_National_Health_Service'
    }
  ],
  constructions: [
    {
      id: 'skara-brae',
      name: 'Skara Brae village',
      year: -3100,
      category: 'monument',
      description: "An incredibly well-preserved Neolithic stone village in Orkney, Scotland. The houses still have their original stone beds, dressers, and hearths.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Skara_Brae'
    },
    {
      id: 'stonehenge',
      name: 'Stonehenge',
      year: -2500,
      category: 'monument',
      description: "Britain's most famous ancient monument. The enormous stone circle in Wiltshire was built in stages, with some huge stones dragged all the way from Wales.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Stonehenge'
    },
    {
      id: 'maiden-castle',
      name: 'Maiden Castle',
      year: -600,
      category: 'fort',
      description: "The largest and most complex Iron Age hillfort in Britain, covering an area the size of 50 football pitches with massive defensive earthworks.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Maiden_Castle,_Dorset'
    },
    {
      id: 'hadrians-wall',
      name: 'Hadrian\'s Wall',
      year: 122,
      category: 'fort',
      description: "A monumental 73-mile Roman defensive wall stretching across northern England, designed to control movement and defend against the unconquered tribes to the north.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Hadrian%27s_Wall'
    },
    {
      id: 'canterbury-cathedral-first',
      name: 'Canterbury (first cathedral)',
      year: 597,
      category: 'church',
      description: "Augustine of Canterbury established the first cathedral here after arriving from Rome to convert the Anglo-Saxons to Christianity.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Canterbury_Cathedral'
    },
    {
      id: 'tower-of-london',
      name: 'Tower of London',
      year: 1066,
      category: 'castle',
      description: "Founded by William the Conqueror as a powerful fortress to control the city of London. The central White Tower was built to inspire awe and fear.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Tower_of_London'
    },
    {
      id: 'oxford-university',
      name: 'Oxford University',
      year: 1096,
      category: 'landmark',
      description: "Teaching began at Oxford in 1096, making it the oldest university in the English-speaking world. It grew rapidly after English students were banned from attending the University of Paris.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/University_of_Oxford'
    },
    {
      id: 'globe-theatre',
      name: 'Globe Theatre',
      year: 1599,
      category: 'landmark',
      description: "The famous polygonal open-air theatre built on the south bank of the Thames, where many of William Shakespeare's greatest plays were first performed.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Globe_Theatre'
    },
    {
      id: 'ironbridge',
      name: 'Ironbridge',
      year: 1779,
      category: 'bridge',
      description: "The world's first major bridge to be constructed entirely of cast iron, crossing the River Severn in Shropshire — a striking symbol of the Industrial Revolution.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/The_Iron_Bridge'
    },
    {
      id: 'houses-of-parliament',
      name: 'Houses of Parliament',
      year: 1870,
      category: 'palace',
      description: "After a devastating fire in 1834, the Palace of Westminster was rebuilt in a stunning Gothic Revival style, becoming a global symbol of British democracy.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Palace_of_Westminster'
    }
  ]
};