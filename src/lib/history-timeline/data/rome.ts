import { TimelineData } from './types';

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
      description: "According to legend, Rome was founded in 753 BCE by the twin brothers Romulus and Remus, who were raised by a she-wolf. The early city was ruled by a series of kings. Over two and a half centuries, Rome grew from a small hilltop settlement into a powerful city-state, laying the foundations for the greatest empire the world had ever seen.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Roman_Kingdom'
    },
    {
      id: 'republic',
      name: 'Roman Republic',
      startYear: -509,
      endYear: -27,
      colour: '#722f37',
      description: "After overthrowing their last king in 509 BCE, the Romans created a republic governed by elected officials called consuls and a senate of aristocrats. The Republic conquered Italy, then the Mediterranean world, fighting great wars against Carthage, Greece, and the eastern kingdoms. It produced legendary figures like Julius Caesar, Cicero, and Scipio Africanus, before collapsing into civil war.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Roman_Republic'
    },
    {
      id: 'principate',
      name: 'Early Roman Empire',
      shortName: 'Principate',
      startYear: -27,
      endYear: 284,
      colour: '#8c6b2f',
      description: "Augustus Caesar became the first Roman Emperor in 27 BCE, creating a system where one man held supreme power whilst pretending to preserve the old Republic. Under strong emperors, Rome reached its greatest extent, governing 70 million people across Europe, North Africa, and western Asia. This era saw the birth of Jesus and the spread of Christianity.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Roman_Empire'
    },
    {
      id: 'crisis',
      name: 'Crisis of the Third Century',
      startYear: 235,
      endYear: 284,
      colour: '#5c3566',
      description: "The Roman Empire nearly collapsed between 235 and 284 CE. In just 50 years, over 20 emperors came and went — most killed by their own soldiers. Plague, invasion, and economic collapse threatened to tear the empire apart. This period shows how even the mightiest powers can face catastrophic crises.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Crisis_of_the_Third_Century'
    },
    {
      id: 'dominate',
      name: 'Late Roman Empire',
      shortName: 'Dominate',
      startYear: 284,
      endYear: 395,
      colour: '#6a7f8e',
      description: "Emperors Diocletian and Constantine reformed and stabilised the empire. Constantine legalised Christianity in 313 CE and moved the capital to Constantinople. The empire was increasingly split between east and west, and Christianity transformed from a persecuted sect into the official state religion.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Dominate'
    },
    {
      id: 'western-empire',
      name: 'Western Roman Empire',
      startYear: 395,
      endYear: 476,
      colour: '#722f37',
      description: "The Western Roman Empire struggled to hold back wave after wave of Germanic invaders. Successive emperors were increasingly powerless figureheads. In 410 CE, Rome itself was sacked for the first time in 800 years. In 476 CE, the last western emperor was deposed by a Germanic chieftain — the traditional date for the fall of the Western Roman Empire.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Western_Roman_Empire'
    },
    {
      id: 'byzantine',
      name: 'Eastern Roman Empire',
      shortName: 'Byzantine',
      startYear: 476,
      endYear: 1453,
      colour: '#4a5c7a',
      description: "The Eastern Roman Empire, based at Constantinople, survived for nearly a thousand years after the fall of the west. Known to historians as the Byzantine Empire, it preserved Roman law, Greek learning, and Christian culture. Under Justinian I it briefly reconquered much of the western empire. It finally fell in 1453 when Constantinople was captured by the Ottoman Turks.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Byzantine_Empire'
    }
  ],
  rulers: [
    {
      id: 'republic-rulers',
      name: 'Roman Republic',
      startYear: -509,
      endYear: -27,
      eraId: 'republic',
      description: "During the Roman Republic, power was shared between elected consuls and the Senate rather than held by a single ruler. Two consuls were elected each year to prevent any one person gaining too much power. Great figures like Scipio Africanus, Marius, Sulla, Pompey, and Julius Caesar served the Republic before it descended into civil war.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Roman_Republic',
      unknown: false
    },
    {
      id: 'augustus',
      name: 'Augustus',
      startYear: -27,
      endYear: 14,
      eraId: 'principate',
      description: "Augustus (born Gaius Octavius) was Rome's first emperor and one of the greatest rulers in history. After defeating his rivals in a series of civil wars, he created a stable system of one-man rule that lasted for centuries. He boasted that he found Rome a city of brick and left it a city of marble. His 41-year reign began Rome's golden age.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Augustus',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Statue-Augustus.jpg/220px-Statue-Augustus.jpg'
    },
    {
      id: 'tiberius',
      name: 'Tiberius',
      startYear: 14,
      endYear: 37,
      eraId: 'principate',
      description: "Tiberius was a successful general who succeeded his stepfather Augustus. A brilliant but gloomy and reclusive emperor, he later retired to the island of Capri, leaving the empire in the hands of his ambitious praetorian prefect, Sejanus.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Tiberius'
    },
    {
      id: 'caligula',
      name: 'Caligula',
      startYear: 37,
      endYear: 41,
      eraId: 'principate',
      description: "Caligula's short reign is remembered for his extreme cruelty, extravagance, and erratic behaviour. He famously considered making his favourite horse a consul before he was assassinated by his own guards.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Caligula'
    },
    {
      id: 'claudius',
      name: 'Claudius',
      startYear: 41,
      endYear: 54,
      eraId: 'principate',
      description: "Emperor Claudius ordered the successful Roman invasion of Britain in 43 CE, personally visiting the island to witness the conquest of Camulodunum (modern Colchester). Despite being considered an unlikely emperor due to his physical disabilities, he proved to be an effective administrator.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Claudius'
    },
    {
      id: 'nero',
      name: 'Nero',
      startYear: 54,
      endYear: 68,
      eraId: 'principate',
      description: "Nero was the last of the Julio-Claudian emperors. He is infamous for supposedly 'fiddling while Rome burned' during the Great Fire of Rome in 64 CE. After facing a widespread rebellion, he took his own life.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Nero'
    },
    {
      id: 'vespasian',
      name: 'Vespasian',
      startYear: 69,
      endYear: 79,
      eraId: 'principate',
      description: "Vespasian emerged victorious from the 'Year of the Four Emperors' to found the Flavian dynasty. A practical and successful military commander, he ordered the construction of the Colosseum in Rome.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Vespasian'
    },
    {
      id: 'titus',
      name: 'Titus',
      startYear: 79,
      endYear: 81,
      eraId: 'principate',
      description: "Titus was a popular emperor who commanded the Roman forces that captured Jerusalem. His brief reign saw two major disasters: the eruption of Mount Vesuvius in 79 CE and a great fire in Rome in 80 CE.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Titus'
    },
    {
      id: 'domitian',
      name: 'Domitian',
      startYear: 81,
      endYear: 96,
      eraId: 'principate',
      description: "Domitian was an effective but increasingly paranoid emperor. He strengthened the economy and expanded border defences, but his authoritarian style made him enemies in the Senate. He was eventually assassinated.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Domitian'
    },
    {
      id: 'nerva',
      name: 'Nerva',
      startYear: 96,
      endYear: 98,
      eraId: 'principate',
      description: "Nerva was the first of the 'Five Good Emperors'. Though his reign was short, he established the important precedent of adopting a capable successor rather than passing power to a biological heir.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Nerva'
    },
    {
      id: 'trajan',
      name: 'Trajan',
      startYear: 98,
      endYear: 117,
      eraId: 'principate',
      description: "Trajan was Rome's greatest military emperor, expanding the empire to its largest ever extent. He conquered Dacia (modern Romania) and much of Mesopotamia. His markets in Rome were an ancient shopping centre. Trajan's Column in Rome, still standing today, tells the story of his campaigns in carved relief.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Trajan',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Trajan_bust.jpg/220px-Trajan_bust.jpg'
    },
    {
      id: 'hadrian',
      name: 'Hadrian',
      startYear: 117,
      endYear: 138,
      eraId: 'principate',
      description: "Emperor Hadrian was one of Rome's most cultured rulers, fascinated by Greek philosophy and art. He consolidated the empire's borders rather than expanding them, and is most famous in Britain for ordering the construction of Hadrian's Wall across northern England. He also rebuilt the Pantheon in Rome.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Hadrian',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Bust_of_Hadrian_in_the_Museo_del_Prado_n%C2%BA212_cropped.jpeg/220px-Bust_of_Hadrian_in_the_Museo_del_Prado_n%C2%BA212_cropped.jpeg'
    },
    {
      id: 'antoninus-pius',
      name: 'Antoninus Pius',
      startYear: 138,
      endYear: 161,
      eraId: 'principate',
      description: "Antoninus Pius presided over the most peaceful period in Roman history. He was a skilled administrator who rarely left Italy, managing the vast empire effectively from Rome.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Antoninus_Pius'
    },
    {
      id: 'marcus-aurelius',
      name: 'Marcus Aurelius',
      startYear: 161,
      endYear: 180,
      eraId: 'principate',
      description: "Marcus Aurelius was the 'philosopher emperor' — a Stoic who wrote his private thoughts in a book called 'Meditations', still read today. He spent much of his reign fighting off barbarian invasions on the Danube frontier. He is often called the last of the 'Five Good Emperors'.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Marcus_Aurelius',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/MSR-ra-1-DM-crop.jpg/220px-MSR-ra-1-DM-crop.jpg'
    },
    {
      id: 'commodus',
      name: 'Commodus',
      startYear: 180,
      endYear: 192,
      eraId: 'principate',
      description: "Commodus ended the era of the 'Five Good Emperors'. He ignored matters of state and preferred to perform as a gladiator in the Colosseum. His assassination sparked another period of civil war.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Commodus'
    },
    {
      id: 'septimius-severus',
      name: 'Septimius Severus',
      startYear: 193,
      endYear: 211,
      eraId: 'principate',
      description: "Septimius Severus emerged as emperor after a civil war. He increased the military's power and pay, telling his sons: 'Be harmonious, enrich the soldiers, and scorn all others.'",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Septimius_Severus'
    },
    {
      id: 'caracalla',
      name: 'Caracalla',
      startYear: 211,
      endYear: 217,
      eraId: 'principate',
      description: "Caracalla is best known for the Edict of Caracalla, which granted Roman citizenship to all free men in the empire, and for building the massive Baths of Caracalla in Rome.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Caracalla'
    },
    {
      id: 'diocletian',
      name: 'Diocletian',
      startYear: 284,
      endYear: 305,
      eraId: 'dominate',
      description: "Emperor Diocletian saved the Roman Empire from collapse by introducing sweeping reforms. He divided the empire into four sections (the Tetrarchy), each with its own ruler, and created a massive new military and administrative system. He also launched the last and most severe persecution of Christians.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Diocletian'
    },
    {
      id: 'constantine-i',
      name: 'Constantine I',
      startYear: 306,
      endYear: 337,
      eraId: 'dominate',
      description: "Constantine the Great was the first Roman emperor to convert to Christianity. His Edict of Milan in 313 CE granted religious tolerance throughout the empire, ending the persecution of Christians. He moved the capital to the new city of Constantinople (modern Istanbul) and presided over the Council of Nicaea.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Constantine_the_Great',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Constantinople_Colossus.jpg/220px-Constantinople_Colossus.jpg'
    },
    {
      id: 'theodosius-i',
      name: 'Theodosius I',
      startYear: 379,
      endYear: 395,
      eraId: 'western-empire',
      description: "Theodosius I was the last emperor to rule the whole Roman Empire. He made Christianity the official state religion and banned pagan worship. After his death the empire was permanently divided between his two sons, splitting into the Western and Eastern Roman Empires forever.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Theodosius_I'
    },
    {
      id: 'romulus-augustulus',
      name: 'Romulus Augustulus',
      startYear: 475,
      endYear: 476,
      eraId: 'western-empire',
      description: "Romulus Augustulus was just a teenager when he became the last emperor of the Western Roman Empire. He was deposed in 476 CE by the Germanic chieftain Odoacer, who sent the imperial regalia to Constantinople and declared himself king of Italy. This event is traditionally used to mark the fall of the Western Roman Empire.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Romulus_Augustulus'
    },
    {
      id: 'justinian-i',
      name: 'Justinian I',
      startYear: 527,
      endYear: 565,
      eraId: 'byzantine',
      description: "Emperor Justinian I nearly restored the Roman Empire to its former glory. He reconquered North Africa, Italy, and parts of Spain; compiled Rome's laws into the famous Corpus Juris Civilis (still the basis of many legal systems); and built the magnificent Hagia Sophia in Constantinople. He also had to deal with the devastating Plague of Justinian.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Justinian_I',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/JustinianCodex.jpg/220px-JustinianCodex.jpg'
    },
    {
      id: 'constantine-xi',
      name: 'Constantine XI',
      startYear: 1449,
      endYear: 1453,
      eraId: 'byzantine',
      description: "Constantine XI Palaiologos was the last emperor of the Eastern Roman Empire (Byzantine Empire). He died heroically defending Constantinople against the Ottoman siege in 1453, fighting in the city streets until he was killed. His death ended over 2,000 years of Roman imperial rule.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Constantine_XI_Palaiologos'
    }
  ],
  events: [
    {
      id: 'founding-of-rome',
      name: 'Founding of Rome',
      year: -753,
      category: 'politics',
      description: "According to Roman legend, Rome was founded on the Palatine Hill by Romulus, after he killed his twin brother Remus in a dispute. This traditional date marks the beginning of the Roman timeline (Ab urbe condita).",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Founding-of-rome'
    },
    {
      id: 'republic-founded',
      name: 'Expulsion of Kings',
      year: -509,
      category: 'politics',
      description: "The last king of Rome, Tarquin the Proud, was overthrown. The Romans established a Republic, vowing never again to be ruled by a single monarch.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Overthrow_of_the_Roman_monarchy'
    },
    {
      id: 'twelve-tables',
      name: 'Twelve Tables Law',
      year: -451,
      category: 'legislation',
      description: "The Twelve Tables were the first written laws of the Roman Republic. Displayed in the Roman Forum, they formed the foundation of all subsequent Roman law.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Twelve_Tables'
    },
    {
      id: 'punic-wars-begin',
      name: 'Start of the Punic Wars',
      year: -264,
      category: 'war',
      description: "Rome clashed with the powerful North African city of Carthage in the first of three massive wars that would eventually see Rome dominate the Mediterranean.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Punic_Wars'
    },
    {
      id: 'caesar-assassinated',
      name: 'Julius Caesar Assassinated',
      year: -44,
      category: 'politics',
      description: "On the Ides of March, Julius Caesar was stabbed to death by a group of senators, including his friend Brutus, who feared he was making himself a king. This plunged Rome into civil war.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Assassination_of_Julius_Caesar'
    },
    {
      id: 'battle-of-actium',
      name: 'Battle of Actium',
      year: -31,
      category: 'war',
      description: "Octavian's fleet defeated the combined forces of Mark Antony and Cleopatra VII, ending the civil wars and leaving Octavian as the sole ruler of the Roman world.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Battle_of_Actium'
    },
    {
      id: 'birth-of-jesus',
      name: 'Birth of Jesus',
      year: -4,
      category: 'religion',
      description: "Jesus of Nazareth was born in the Roman province of Judea during the reign of Augustus. The religion founded by his followers, Christianity, would eventually transform the Roman Empire.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Jesus'
    },
    {
      id: 'vesuvius-eruption',
      name: 'Vesuvius Eruption',
      year: 79,
      category: 'disaster',
      description: "Mount Vesuvius erupted, burying the cities of Pompeii and Herculaneum under metres of volcanic ash and pumice. This tragedy perfectly preserved the cities for modern archaeologists.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Eruption_of_Mount_Vesuvius_in_79_AD'
    },
    {
      id: 'edict-of-milan',
      name: 'Edict of Milan',
      year: 313,
      category: 'legislation',
      description: "Emperor Constantine issued the Edict of Milan, establishing religious tolerance throughout the Roman Empire and ending the state persecution of Christians.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Edict_of_Milan'
    },
    {
      id: 'sack-of-rome',
      name: 'Sack of Rome',
      year: 410,
      category: 'war',
      description: "The Visigoths, led by Alaric, captured and sacked the city of Rome. It was the first time in 800 years that the city had fallen to an enemy, sending shockwaves across the empire.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Sack_of_Rome_(410)'
    },
    {
      id: 'fall-of-west',
      name: 'Fall of Western Empire',
      year: 476,
      category: 'politics',
      description: "The Germanic chieftain Odoacer deposed the teenage emperor Romulus Augustulus, marking the traditional end of the Western Roman Empire.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Fall_of_the_Western_Roman_Empire'
    },
    {
      id: 'justinian-reconquest',
      name: 'Justinian\'s Reconquest Begins',
      year: 533,
      category: 'war',
      description: "Emperor Justinian I dispatched his brilliant general Belisarius to reconquer the western provinces, successfully retaking North Africa and Italy for the empire.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Vandalic_War'
    },
    {
      id: 'fall-of-constantinople',
      name: 'Fall of Constantinople',
      year: 1453,
      category: 'war',
      description: "The Ottoman Turks under Mehmed the Conqueror breached the massive walls of Constantinople. The last emperor died in battle, ending the final remnant of the Roman Empire after over 2,000 years.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Fall_of_Constantinople'
    },
    {
      id: 'first-triumvirate',
      name: 'The First Triumvirate',
      year: -60,
      category: 'politics',
      description: "An informal political alliance between Julius Caesar, Pompey the Great, and Marcus Licinius Crassus to bypass the conservative Senate.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/First_Triumvirate'
    },
    {
      id: 'gallic-wars',
      name: 'The Gallic Wars',
      year: -58,
      category: 'war',
      description: "A series of military campaigns waged by Julius Caesar against Gallic tribes, which culminated in the annexation of Gaul.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Gallic_Wars'
    },
    {
      id: 'battle-of-teutoburg-forest',
      name: 'Battle of the Teutoburg Forest',
      year: 9,
      category: 'war',
      description: "An ambush by an alliance of Germanic tribes led by Arminius, which destroyed three Roman legions and set the Rhine River as the permanent border of the empire.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Battle_of_the_Teutoburg_Forest'
    },
    {
      id: 'conquest-of-dacia',
      name: 'Conquest of Dacia',
      year: 101,
      category: 'war',
      description: "Trajan's successful military campaign to defeat Decebalus and capture the Dacian gold mines, which brought massive wealth into the Roman treasury.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Trajan%27s_Dacian_Wars'
    },
    {
      id: 'tetrarchy',
      name: 'The Tetrarchy',
      year: 293,
      category: 'politics',
      description: "A system of governance introduced by Diocletian, dividing the empire into four regions ruled by a co-emperor and a junior emperor to stabilize the succession.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Tetrarchy'
    },
    {
      id: 'battle-of-adrianople',
      name: 'Battle of Adrianople',
      year: 378,
      category: 'war',
      description: "Fought between the Roman army led by Emperor Valens and Gothic rebels, resulting in a catastrophic defeat for the Romans that signaled a shift in military balance.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Battle_of_Adrianople'
    },
    {
      id: 'division-of-the-empire',
      name: 'Division of the Roman Empire',
      year: 395,
      category: 'politics',
      description: "Following the death of Emperor Theodosius I, the empire was permanently split into the Western and Eastern Roman Empires.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Division_of_the_Roman_Empire'
    }
  ],
  constructions: [
    {
      id: 'circus-maximus',
      name: 'Circus Maximus',
      year: -550,
      category: 'monument',
      description: "The first and largest chariot-racing stadium in ancient Rome. At its largest, it could hold an incredible 150,000 spectators.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Circus_Maximus'
    },
    {
      id: 'roman-forum',
      name: 'Roman Forum',
      year: -700,
      category: 'monument',
      description: "The centre of day-to-day life in Rome: the site of triumphal processions, elections, public speeches, and commercial affairs.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Roman_Forum'
    },
    {
      id: 'appian-way',
      name: 'Appian Way',
      year: -312,
      category: 'road',
      description: "One of the earliest and most strategically important Roman roads, connecting Rome to Brindisi in southeast Italy.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Appian_Way'
    },
    {
      id: 'pont-du-gard',
      name: 'Pont du Gard',
      year: 19,
      category: 'bridge',
      description: "An ancient Roman aqueduct bridge built to carry water over 50 km to the Roman colony of Nemausus (Nîmes). A masterpiece of engineering.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Pont_du_Gard'
    },
    {
      id: 'colosseum',
      name: 'Colosseum',
      year: 80,
      category: 'monument',
      description: "The Flavian Amphitheatre was the largest ancient amphitheatre ever built. Used for gladiatorial contests and public spectacles, it could hold up to 80,000 spectators.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Colosseum'
    },
    {
      id: 'trajans-column',
      name: "Trajan's Column",
      year: 113,
      category: 'monument',
      description: "A Roman triumphal column that commemorates Roman emperor Trajan's victory in the Dacian Wars, famous for its spiral bas-relief.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Trajan%27s_Column'
    },
    {
      id: 'pantheon',
      name: 'Pantheon',
      year: 125,
      category: 'temple',
      description: "Rebuilt by Hadrian, this former Roman temple boasts the world's largest unreinforced concrete dome — an engineering marvel that still stands today.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Pantheon,_Rome'
    },
    {
      id: 'hadrians-wall',
      name: "Hadrian's Wall",
      year: 122,
      category: 'fort',
      description: "A defensive fortification in the Roman province of Britannia, begun under the rule of Emperor Hadrian. It marked the northwest frontier of the empire.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Hadrian%27s_Wall'
    },
    {
      id: 'baths-of-caracalla',
      name: 'Baths of Caracalla',
      year: 216,
      category: 'monument',
      description: "The city's second largest Roman public baths, built during the reigns of emperors Septimius Severus and Caracalla.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Baths_of_Caracalla'
    },
    {
      id: 'arch-of-constantine',
      name: 'Arch of Constantine',
      year: 315,
      category: 'monument',
      description: "A triumphal arch in Rome dedicated to the emperor Constantine the Great to commemorate his victory over Maxentius at the Battle of Milvian Bridge.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Arch_of_Constantine'
    },
    {
      id: 'hagia-sophia',
      name: 'Hagia Sophia',
      year: 537,
      category: 'church',
      description: "Built by Emperor Justinian I as the Christian cathedral of Constantinople, its massive dome is considered the epitome of Byzantine architecture.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Hagia_Sophia'
    },
    {
      id: 'roman-concrete',
      name: 'Invention of Roman Concrete',
      year: -150,
      category: 'monument',
      description: "A major structural breakthrough utilizing lime and volcanic ash (pozzolana). This highly durable and flexible material allowed Roman engineers to build monumental arches, domes, and structures that defied previous architectural limits.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Roman_concrete'
    },
    {
      id: 'hypocaust-system',
      name: 'Introduction of the Hypocaust System',
      year: -50,
      category: 'monument',
      description: "An advanced central heating system used to heat the floors of Roman public baths and wealthy villas.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Hypocaust'
    }
  ]
};