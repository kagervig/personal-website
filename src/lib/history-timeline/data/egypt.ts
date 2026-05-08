import { TimelineData, Era, Ruler, Event, Construction, TimelineId } from '../types';

export const egyptData: TimelineData = {
  id: 'egypt',
  title: 'Ancient Egypt',
  subtitle: 'From the Predynastic kings to the Arab Conquest',
  startYear: -5000,
  endYear: 641,
  defaultZoomPreset: 'millennia',
  eras: [
    {
      id: 'predynastic',
      name: 'Predynastic Period',
      startYear: -5000,
      endYear: -3100,
      colour: '#c9a84c',
      description: "Long before the pyramids were built, early Egyptians lived in farming villages along the River Nile. Over thousands of years, these small communities grew into powerful kingdoms. By around 3100 BCE, Upper and Lower Egypt were ready to be united into one great civilisation.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Predynastic_Egypt'
    },
    {
      id: 'early-dynastic',
      name: 'Early Dynastic Period',
      startYear: -3100,
      endYear: -2686,
      colour: '#b5651d',
      description: "This exciting period saw Egypt first united under one pharaoh. The first dynasties established the traditions of kingship, writing, and monumental building that would define Egyptian civilisation for thousands of years. Memphis became the first capital city.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Early_Dynastic_Period_(Egypt)'
    },
    {
      id: 'old-kingdom',
      name: 'Old Kingdom',
      startYear: -2686,
      endYear: -2181,
      colour: '#d4a017',
      description: "Often called the 'Age of the Pyramids', the Old Kingdom was when Egypt built its most famous monuments. Pharaohs like Khufu, Khafre, and Menkaure commanded thousands of workers to construct the Great Pyramids at Giza. Egypt was wealthy, well-organised, and at the height of its early power.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Old_Kingdom_of_Egypt'
    },
    {
      id: 'first-intermediate',
      name: 'First Intermediate Period',
      startYear: -2181,
      endYear: -2055,
      colour: '#8b3a0f',
      description: "The Old Kingdom collapsed due to drought, famine, and weak pharaohs. Egypt split into rival kingdoms fighting for control. This turbulent time shows how even the mightiest civilisations can face crises — but Egypt would rise again.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/First_Intermediate_Period_of_Egypt'
    },
    {
      id: 'middle-kingdom',
      name: 'Middle Kingdom',
      startYear: -2055,
      endYear: -1650,
      colour: '#e8d5a3',
      description: "Egypt was reunited and entered a golden age of art, literature, and trade. The pharaohs built great temples, dug irrigation canals, and expanded Egypt's borders into Nubia. This period produced some of Egypt's finest literature and sculpture.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Middle_Kingdom_of_Egypt'
    },
    {
      id: 'second-intermediate',
      name: 'Second Intermediate Period',
      startYear: -1650,
      endYear: -1550,
      colour: '#a0522d',
      description: "Foreign rulers called the Hyksos invaded from the north and ruled Lower Egypt for over a century. They introduced new weapons including the horse-drawn chariot. Egyptian princes in Thebes eventually drove them out and reunited the country.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Second_Intermediate_Period_of_Egypt'
    },
    {
      id: 'new-kingdom',
      name: 'New Kingdom',
      startYear: -1550,
      endYear: -1069,
      colour: '#c9a84c',
      description: "Egypt's most powerful and prosperous era. Great warrior pharaohs like Thutmose III and Ramesses II built a vast empire stretching into Asia and deep into Africa. This was the age of Tutankhamun, Nefertiti, and the magnificent temples of Karnak and Abu Simbel.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/New_Kingdom_of_Egypt'
    },
    {
      id: 'third-intermediate',
      name: 'Third Intermediate Period',
      startYear: -1069,
      endYear: -664,
      colour: '#b5651d',
      description: "After the New Kingdom's glory, Egypt fragmented into competing kingdoms. Foreign dynasties from Libya and Nubia took the throne. Despite political division, Egyptian culture and religion remained vibrant and influential.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Third_Intermediate_Period_of_Egypt'
    },
    {
      id: 'late-period',
      name: 'Late Period',
      startYear: -664,
      endYear: -332,
      colour: '#d4a017',
      description: "Egypt came under threat from Assyria and Persia, both of whom conquered it at different times. Despite foreign rulers, Egypt's culture endured. The Persian conquest brought new ideas but also upheaval for the Egyptian people.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Late_Period_of_ancient_Egypt'
    },
    {
      id: 'ptolemaic',
      name: 'Ptolemaic Period',
      startYear: -332,
      endYear: -30,
      colour: '#8b3a0f',
      description: "After Alexander the Great conquered Egypt in 332 BCE, his general Ptolemy founded a Greek-speaking dynasty. The great city of Alexandria became a centre of learning. Cleopatra, the last ruler of this dynasty, famously allied with Julius Caesar and Mark Antony before Egypt fell to Rome.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Ptolemaic_Kingdom'
    },
    {
      id: 'roman-egypt',
      name: 'Roman & Byzantine Egypt',
      startYear: -30,
      endYear: 641,
      colour: '#e8d5a3',
      description: "After Cleopatra's death, Egypt became a crucial province of the Roman Empire and later the Byzantine Empire. Known as the 'Breadbasket of Rome', it supplied vast quantities of grain. This era saw the rise of Christianity, the development of Coptic culture, and finally the Arab Conquest in 641 CE.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Roman_Egypt'
    }
  ],
  rulers: [
    {
      id: 'narmer',
      name: 'Narmer',
      startYear: -3100,
      endYear: -3050,
      eraId: 'early-dynastic',
      description: "Narmer is believed to be the pharaoh who first unified Upper and Lower Egypt, creating one of the world's first nation-states. The famous Narmer Palette shows him wearing the crowns of both kingdoms.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Narmer',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/NarmerPalette_ROM.png/220px-NarmerPalette_ROM.png'
    },
    {
      id: 'djoser',
      name: 'Djoser',
      startYear: -2667,
      endYear: -2648,
      eraId: 'old-kingdom',
      description: "Pharaoh Djoser commissioned the world's first large stone structure — the Step Pyramid at Saqqara. His brilliant architect Imhotep designed this revolutionary building, which inspired all later pyramid construction.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Djoser',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Djoser_statue_side_Memphis.jpg/220px-Djoser_statue_side_Memphis.jpg'
    },
    {
      id: 'sneferu',
      name: 'Sneferu',
      startYear: -2613,
      endYear: -2589,
      eraId: 'old-kingdom',
      description: "Sneferu was one of Egypt's greatest builders, constructing three large pyramids including the first true smooth-sided pyramid. He transformed Egyptian architecture from stepped structures to the classic pyramid shape we recognise today.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Sneferu'
    },
    {
      id: 'khufu',
      name: 'Khufu',
      startYear: -2589,
      endYear: -2566,
      eraId: 'old-kingdom',
      description: "Khufu (also known as Cheops) ordered the construction of the Great Pyramid of Giza — the largest pyramid ever built and one of the Seven Wonders of the Ancient World. For nearly 4,000 years it was the tallest man-made structure on Earth.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Khufu',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Khufu-Karnak.jpg/220px-Khufu-Karnak.jpg'
    },
    {
      id: 'khafre',
      name: 'Khafre',
      startYear: -2558,
      endYear: -2532,
      eraId: 'old-kingdom',
      description: "Khafre built the second-largest pyramid at Giza and is believed to have created the Great Sphinx, which bears his face. He continued his father Khufu's grand building programme at the Giza plateau.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Khafre',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Khephren.jpg/220px-Khephren.jpg'
    },
    {
      id: 'menkaure',
      name: 'Menkaure',
      startYear: -2532,
      endYear: -2503,
      eraId: 'old-kingdom',
      description: "Menkaure built the smallest of the three main Giza pyramids, though it was surrounded by three smaller 'queen's pyramids'. He was said by ancient Greek writers to be a just and kind ruler.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Menkaure'
    },
    {
      id: 'hatshepsut',
      name: 'Hatshepsut',
      startYear: -1473,
      endYear: -1458,
      eraId: 'new-kingdom',
      description: "Hatshepsut was one of ancient Egypt's most successful female pharaohs, ruling for over 20 years. She organised a famous trading expedition to the land of Punt and built the magnificent mortuary temple at Deir el-Bahri. After her death, her successor Thutmose III tried to erase all record of her reign.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Hatshepsut',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Hatshepsut.png/220px-Hatshepsut.png'
    },
    {
      id: 'thutmose-iii',
      name: 'Thutmose III',
      startYear: -1458,
      endYear: -1425,
      eraId: 'new-kingdom',
      description: "Often called the 'Napoleon of Egypt', Thutmose III was a brilliant military commander who expanded Egypt's empire to its greatest extent. He fought seventeen campaigns in Asia and never lost a battle. He also built extensively throughout Egypt and Nubia.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Thutmose_III',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/TuthmosisIII-2.jpg/220px-TuthmosisIII-2.jpg'
    },
    {
      id: 'amenhotep-iii',
      name: 'Amenhotep III',
      startYear: -1386,
      endYear: -1353,
      eraId: 'new-kingdom',
      description: "Amenhotep III ruled during one of Egypt's most peaceful and prosperous periods. He built on a colossal scale, including the great temple at Luxor and the Colossi of Memnon. His court was one of the most splendid in the ancient world.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Amenhotep_III'
    },
    {
      id: 'akhenaten',
      name: 'Akhenaten',
      startYear: -1353,
      endYear: -1336,
      eraId: 'new-kingdom',
      description: "Akhenaten caused the most dramatic religious revolution in Egyptian history by abolishing the traditional gods and declaring that only the sun disc Aten should be worshipped. He built a new capital city called Akhetaten and his wife Nefertiti played a powerful role. After his death, the old religion was restored.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Akhenaten',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Akhenaten_AI.jpg/220px-Akhenaten_AI.jpg'
    },
    {
      id: 'tutankhamun',
      name: 'Tutankhamun',
      startYear: -1336,
      endYear: -1327,
      eraId: 'new-kingdom',
      description: "Tutankhamun became pharaoh aged just 9 and died when he was about 19. He restored the traditional Egyptian religion after his father Akhenaten's revolution. Though a relatively minor king in his time, the 1922 discovery of his intact tomb by Howard Carter made him the most famous pharaoh in the world.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Tutankhamun',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/CairoEgMuseumTaaMaskMostlyPhotographed.jpg/220px-CairoEgMuseumTaaMaskMostlyPhotographed.jpg'
    },
    {
      id: 'ramesses-ii',
      name: 'Ramesses II',
      startYear: -1279,
      endYear: -1213,
      eraId: 'new-kingdom',
      description: "Ramesses II (also written Ramesses the Great) was Egypt's most celebrated pharaoh. He ruled for an astonishing 66 years, fought the Battle of Kadesh against the Hittites, and signed one of history's first peace treaties. He built colossal temples including Abu Simbel, covered with enormous statues of himself.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Ramesses_II',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Ramesses_II_in_his_chariot.jpg/220px-Ramesses_II_in_his_chariot.jpg'
    },
    {
      id: 'ramesses-iii',
      name: 'Ramesses III',
      startYear: -1184,
      endYear: -1153,
      eraId: 'new-kingdom',
      description: "Ramesses III was the last great pharaoh of the New Kingdom. He successfully defended Egypt against two massive invasions by the mysterious 'Sea Peoples'. Despite his military success, he was later assassinated in a harem conspiracy.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Ramesses_III'
    },
    {
      id: 'cleopatra-vii',
      name: 'Cleopatra VII',
      startYear: -51,
      endYear: -30,
      eraId: 'ptolemaic',
      description: "Cleopatra VII was the last active ruler of Egypt's Ptolemaic dynasty and one of the most famous women in history. She spoke nine languages and was a skilled politician who allied herself with Julius Caesar and later Mark Antony to protect Egypt's independence. When Octavian (later Augustus) defeated Antony, Cleopatra chose death over capture.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Cleopatra',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Kleopatra-VII.-Altes-Museum-Berlin1.jpg/220px-Kleopatra-VII.-Altes-Museum-Berlin1.jpg'
    },
    {
      id: 'augustus-egypt',
      name: 'Augustus (as Pharaoh)',
      startYear: -30,
      endYear: 14,
      eraId: 'roman-egypt',
      description: "After annexing Egypt, Augustus was depicted in Egyptian temples as a traditional pharaoh, maintaining the continuity of divine kingship while ruling from Rome.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Augustus'
    },
    {
      id: 'hadrian-egypt',
      name: 'Hadrian',
      startYear: 117,
      endYear: 138,
      eraId: 'roman-egypt',
      description: "Emperor Hadrian travelled extensively in Egypt in 130 CE. Following the tragic drowning of his companion Antinous in the Nile, he founded the city of Antinoöpolis.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Hadrian'
    },
    {
      id: 'diocletian-egypt',
      name: 'Diocletian',
      startYear: 284,
      endYear: 305,
      eraId: 'roman-egypt',
      description: "Diocletian restructured Egypt into smaller administrative units and famously suppressed a major revolt in Alexandria in 298 CE.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Diocletian'
    }
  ],
  events: [
    {
      id: 'unification',
      name: 'Unification of Upper & Lower Egypt',
      year: -3100,
      category: 'politics',
      description: "Around 3100 BCE, King Narmer united the two kingdoms of Upper and Lower Egypt into a single state.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Unification_of_Egypt',
      importance: 3
    },
    {
      id: 'great-pyramid-completed',
      name: 'Great Pyramid Completed',
      year: -2560,
      category: 'culture',
      description: "The Great Pyramid of Khufu at Giza was completed around 2560 BCE.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Great_Pyramid_of_Giza',
      importance: 3
    },
    {
      id: 'old-kingdom-collapse',
      name: 'Collapse of the Old Kingdom',
      year: -2181,
      category: 'disaster',
      description: "The Old Kingdom collapsed around 2181 BCE due to drought and weak government.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/First_Intermediate_Period_of_Egypt',
      importance: 2
    },
    {
      id: 'hyksos-invasion',
      name: 'Hyksos Invasion',
      year: -1650,
      category: 'war',
      description: "Foreign rulers called the Hyksos invaded and introduced chariots to Egypt.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Hyksos',
      importance: 2
    },
    {
      id: 'amarna-revolution',
      name: 'Amarna Religious Revolution',
      year: -1350,
      category: 'religion',
      description: "Pharaoh Akhenaten abolished the traditional gods in favour of the sun disc Aten.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Atenism',
      importance: 2
    },
    {
      id: 'abu-simbel-begins',
      name: 'Abu Simbel Construction Begins',
      year: -1285,
      category: 'culture',
      description: "Ramesses II ordered the construction of two massive temples cut directly into the rock face.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Abu_Simbel_temples',
      importance: 2
    },
    {
      id: 'battle-of-kadesh',
      name: 'Battle of Kadesh',
      year: -1274,
      category: 'war',
      description: "One of the largest chariot battles in history, ending in a famous peace treaty.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Battle_of_Kadesh',
      importance: 2
    },
    {
      id: 'persian-conquest',
      name: 'Persian Conquest of Egypt',
      year: -525,
      category: 'war',
      description: "The Persian king Cambyses II invaded and conquered Egypt in 525 BCE.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Achaemenid_Egypt',
      importance: 3
    },
    {
      id: 'alexander-conquers',
      name: 'Alexander the Great Conquers Egypt',
      year: -332,
      category: 'war',
      description: "Alexander the Great arrived in Egypt and founded the city of Alexandria.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Alexander_the_Great',
      importance: 3
    },
    {
      id: 'ptolemy-coronation',
      name: 'Coronation of Ptolemy I Soter',
      year: -305,
      category: 'politics',
      description: "Ptolemy I declared himself King of Egypt, founding a three-century dynasty.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Ptolemy_I_Soter',
      importance: 2
    },
    {
      id: 'battle-raphia',
      name: 'Battle of Raphia',
      year: -217,
      category: 'war',
      description: "A major victory for Ptolemy IV against the Seleucids.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Battle_of_Raphia',
      importance: 1
    },
    {
      id: 'rosetta-stone',
      name: 'Rosetta Stone Decreed',
      year: -196,
      category: 'politics',
      description: "A decree issued in three scripts that eventually allowed hieroglyphs to be decoded.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Rosetta_Stone',
      importance: 3
    },
    {
      id: 'roman-protectorate',
      name: 'Roman Protectorate Status',
      year: -168,
      category: 'politics',
      description: "Rome intervened in the Day of Eleusis to protect Egypt from the Seleucids.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Ptolemaic_Kingdom#Rome',
      importance: 2
    },
    {
      id: 'battle-of-actium',
      name: 'Battle of Actium',
      year: -31,
      category: 'war',
      description: "The naval battle that ended Egyptian independence.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Battle_of_Actium',
      importance: 3
    },
    {
      id: 'fall-of-ptolemies',
      name: 'Fall of the Ptolemies',
      year: -30,
      category: 'politics',
      description: "Following Cleopatra's death, Octavian annexed Egypt as a Roman province.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Roman_Egypt',
      importance: 3
    },
    {
      id: 'breadbasket-rome',
      name: 'Breadbasket of Rome',
      year: 50,
      category: 'trade',
      description: "Egypt provided one-third of the total grain supply to the city of Rome.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Cura_Annonae',
      importance: 2
    },
    {
      id: 'jewish-revolt',
      name: 'The Jewish Revolt',
      year: 115,
      category: 'war',
      description: "A major uprising within the Jewish diaspora in Alexandria.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Kitos_War',
      importance: 1
    },
    {
      id: 'hadrian-visit',
      name: 'Visit of Hadrian',
      year: 130,
      category: 'exploration',
      description: "Emperor Hadrian travelled extensively and founded Antinoöpolis.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Antino%C3%B6polis',
      importance: 2
    },
    {
      id: 'rise-christianity',
      name: 'Rise of Christianity',
      year: 180,
      category: 'religion',
      description: "Alexandria became a primary centre of Christian scholarship and monasticism.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Coptic_Orthodox_Church',
      importance: 2
    },
    {
      id: 'edict-caracalla',
      name: 'The Edict of Caracalla',
      year: 212,
      category: 'legislation',
      description: "Granted Roman citizenship to all free inhabitants of the Empire.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Constitutio_Antoniniana',
      importance: 2
    },
    {
      id: 'zenobia-occupation',
      name: 'The Occupation of Zenobia',
      year: 269,
      category: 'war',
      description: "Egypt was briefly occupied by the Palmyrene Empire.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Zenobia',
      importance: 2
    },
    {
      id: 'diocletian-reforms',
      name: 'Diocletian’s Reforms',
      year: 298,
      category: 'politics',
      description: "Diocletian restructured Egypt and divided it into smaller units.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Diocletian',
      importance: 2
    },
    {
      id: 'council-chalcedon',
      name: 'The Council of Chalcedon',
      year: 451,
      category: 'religion',
      description: "A major theological schism that divided the Coptic church from Constantinople.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Council_of_Chalcedon',
      importance: 2
    },
    {
      id: 'arab-conquest',
      name: 'The Arab Conquest',
      year: 641,
      category: 'war',
      description: "Marked the end of over 600 years of Roman and Byzantine rule.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Muslim_conquest_of_Egypt',
      importance: 3
    }
  ],
  constructions: [
    {
      id: 'step-pyramid',
      name: 'Step Pyramid of Djoser',
      year: -2650,
      category: 'monument',
      description: "The world's first large stone building, designed by Imhotep.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Pyramid_of_Djoser',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Saqqara_BW_5.jpg/320px-Saqqara_BW_5.jpg',
      importance: 3
    },
    {
      id: 'great-pyramid',
      name: 'Great Pyramid of Khufu',
      year: -2560,
      category: 'monument',
      description: "The oldest and largest of the Seven Wonders of the Ancient World.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Great_Pyramid_of_Giza',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Khufu%27s_Pyramid_in_2010.jpg/320px-Khufu%27s_Pyramid_in_2010.jpg',
      importance: 3
    },
    {
      id: 'pyramid-khafre',
      name: 'Pyramid of Khafre',
      year: -2540,
      category: 'monument',
      description: "The second-largest pyramid at Giza.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Pyramid_of_Khafre',
      importance: 2
    },
    {
      id: 'pyramid-menkaure',
      name: 'Pyramid of Menkaure',
      year: -2510,
      category: 'monument',
      description: "The smallest of the three main Giza pyramids.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Pyramid_of_Menkaure',
      importance: 2
    },
    {
      id: 'great-sphinx',
      name: 'Great Sphinx of Giza',
      year: -2530,
      category: 'monument',
      description: "The largest monumental sculpture in the ancient world.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Great_Sphinx_of_Giza',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Great_Sphinx_of_Giza_-_20080716a.jpg/320px-Great_Sphinx_of_Giza_-_20080716a.jpg',
      importance: 3
    },
    {
      id: 'temple-hatshepsut',
      name: 'Temple of Hatshepsut',
      year: -1458,
      category: 'temple',
      description: "A magnificent mortuary temple at Deir el-Bahri.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Mortuary_Temple_of_Hatshepsut',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Mortuary_temple_of_Hatshepsut_2010.jpg/320px-Mortuary_temple_of_Hatshepsut_2010.jpg',
      importance: 3
    },
    {
      id: 'luxor-temple',
      name: 'Luxor Temple',
      year: -1390,
      category: 'temple',
      description: "Built mainly by Amenhotep III and Ramesses II on the east bank of the Nile.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Luxor_Temple',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Luxor_temple_R01.jpg/320px-Luxor_temple_R01.jpg',
      importance: 3
    },
    {
      id: 'karnak-temple',
      name: 'Karnak Temple Complex',
      year: -1365,
      category: 'temple',
      description: "The largest religious building ever constructed.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Karnak',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Karnak_temple_Ramesses_III_forecourt_entrance.jpg/320px-Karnak_temple_Ramesses_III_forecourt_entrance.jpg',
      importance: 3
    },
    {
      id: 'valley-of-kings',
      name: 'Valley of the Kings',
      year: -1350,
      category: 'monument',
      description: "The royal burial ground for pharaohs of the New Kingdom.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Valley_of_the_Kings',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Valley_of_the_Kings_from_above.jpg/320px-Valley_of_the_Kings_from_above.jpg',
      importance: 3
    },
    {
      id: 'abu-simbel',
      name: 'Abu Simbel Temples',
      year: -1279,
      category: 'temple',
      description: "Ramesses II carved two enormous temples directly into a sandstone cliff.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Abu_Simbel_temples',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Abu_Simbel%2C_Ramesses_Temple%2C_front%2C_Egypt%2C_Oct_2004.jpg/320px-Abu_Simbel%2C_Ramesses_Temple%2C_front%2C_Egypt%2C_Oct_2004.jpg',
      importance: 3
    },
    {
      id: 'ptolemais-hermiou',
      name: 'Ptolemais Hermiou',
      year: -305,
      category: 'landmark',
      description: "A major Greek administrative centre deep in the Nile Valley.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Ptolemais_Hermiou',
      importance: 1
    },
    {
      id: 'library-alexandria',
      name: 'Library of Alexandria',
      year: -290,
      category: 'landmark',
      description: "The premier centre for science and literature in the ancient world.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Library_of_Alexandria',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Ancientlibraryalex.jpg/320px-Ancientlibraryalex.jpg',
      importance: 3
    },
    {
      id: 'lighthouse-alexandria',
      name: 'Lighthouse of Alexandria',
      year: -280,
      category: 'landmark',
      description: "One of the Seven Wonders of the Ancient World.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Lighthouse_of_Alexandria',
      importance: 3
    },
    {
      id: 'temple-philae',
      name: 'Temple of Isis at Philae',
      year: -275,
      category: 'temple',
      description: "Constructed during the Ptolemaic period on a beautiful island.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Philae',
      importance: 2
    },
    {
      id: 'fayum-reclamation',
      name: 'Fayum Land Reclamation',
      year: -270,
      category: 'monument',
      description: "Massive irrigation project turned Fayum into an agricultural hub.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Faiyum_Oasis',
      importance: 1
    },
    {
      id: 'serapeum-alexandria',
      name: 'The Serapeum of Alexandria',
      year: -240,
      category: 'monument',
      description: "A massive temple dedicated to the god Serapis.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Serapeum_of_Alexandria',
      importance: 2
    },
    {
      id: 'temple-edfu',
      name: 'Temple of Horus at Edfu',
      year: -237,
      category: 'temple',
      description: "The best-preserved cult temple in all of Egypt.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Temple_of_Edfu',
      importance: 2
    },
    {
      id: 'temple-khnum-esna',
      name: 'Temple of Khnum at Esna',
      year: -180,
      category: 'temple',
      description: "Earliest parts date to Ptolemy VI; famous for its hypostyle hall.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Esna#Temple_of_Esna',
      importance: 1
    },
    {
      id: 'temple-kom-ombo',
      name: 'Temple of Kom Ombo',
      year: -175,
      category: 'temple',
      description: "A unique 'double temple' dedicated to Sobek and Haroeris.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Temple_of_Kom_Ombo',
      importance: 2
    },
    {
      id: 'temple-dendera',
      name: 'Temple of Hathor at Dendera',
      year: -54,
      category: 'temple',
      description: "Largely rebuilt beginning in 54 BCE during the reign of Ptolemy XII.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Dendera_Temple_complex',
      importance: 2
    },
    {
      id: 'temple-kalabsha',
      name: 'Temple of Kalabsha',
      year: -30,
      category: 'temple',
      description: "Built starting around 30 BCE under Augustus.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Temple_of_Kalabsha',
      importance: 1
    },
    {
      id: 'dendera-mammisi',
      name: 'Mammisi at Dendera',
      year: -10,
      category: 'monument',
      description: "Birth House built during the reign of Augustus.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Mammisi',
      importance: 1
    },
    {
      id: 'esna-hypostyle',
      name: 'Temple of Esna (Hypostyle Hall)',
      year: 40,
      category: 'temple',
      description: " surviving hypostyle hall was constructed and decorated between 40 CE and 250 CE.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Esna#Temple_of_Esna',
      importance: 1
    },
    {
      id: 'trajans-kiosk',
      name: 'Trajan’s Kiosk (Philae)',
      year: 98,
      category: 'monument',
      description: "A majority of this iconic structure is attributed to Trajan’s reign.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Philae',
      importance: 2
    },
    {
      id: 'nile-red-sea-canal',
      name: 'Nile-Red Sea Canal',
      year: 106,
      category: 'landmark',
      description: "Linked the Nile directly to the Red Sea for trade ships.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Canal_of_the_Pharaohs',
      importance: 2
    },
    {
      id: 'antinoopolis',
      name: 'Antinoöpolis',
      year: 130,
      category: 'landmark',
      description: "Founded by Emperor Hadrian in memory of Antinous.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Antino%C3%B6polis',
      importance: 1
    },
    {
      id: 'via-nova-hadriana',
      name: 'Via Nova Hadriana',
      year: 137,
      category: 'road',
      description: "An 800km desert highway connecting Antinoöpolis to the Red Sea.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Via_Hadriana',
      importance: 1
    },
    {
      id: 'pompeys-pillar',
      name: 'Pompey’s Pillar',
      year: 297,
      category: 'monument',
      description: "Dedicated to commemorate Diocletian’s victory in Alexandria.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Pompey%27s_Pillar_(column)',
      importance: 1
    },
    {
      id: 'babylon-fortress',
      name: 'Babylon Fortress',
      year: 300,
      category: 'fort',
      description: "Constructed circa 300 CE under Emperor Diocletian.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Babylon_Fortress',
      importance: 2
    }
  ]
};
