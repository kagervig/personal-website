import { TimelineData, Era, Ruler, Event, Construction, TimelineId } from '../types';

export const egyptData: TimelineData = {
  id: 'egypt',
  title: 'Ancient Egypt',
  subtitle: 'From the Predynastic kings to the closing of the temples',
  startYear: -5000,
  endYear: 395,
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
      name: 'Roman Egypt',
      startYear: -30,
      endYear: 395,
      colour: '#e8d5a3',
      description: "After Cleopatra's death, Egypt became a province of the Roman Empire. It supplied enormous quantities of grain to feed Rome. Egyptian religion and culture continued to flourish, but slowly Christianity began to spread. The great temples gradually fell silent.",
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
    }
  ],
  events: [
    {
      id: 'unification',
      name: 'Unification of Upper & Lower Egypt',
      year: -3100,
      category: 'politics',
      description: "Around 3100 BCE, King Narmer united the two kingdoms of Upper and Lower Egypt into a single state. This was one of the most important moments in history — the birth of one of the world's first great civilisations. The pharaoh wore a double crown representing both kingdoms.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Unification_of_Egypt'
    },
    {
      id: 'great-pyramid-completed',
      name: 'Great Pyramid Completed',
      year: -2560,
      category: 'culture',
      description: "The Great Pyramid of Khufu at Giza was completed around 2560 BCE. Built by tens of thousands of skilled workers — not slaves as was once thought — it used over 2 million stone blocks and stood 146 metres tall. It remained the world's tallest structure for nearly 4,000 years.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Great_Pyramid_of_Giza'
    },
    {
      id: 'old-kingdom-collapse',
      name: 'Collapse of the Old Kingdom',
      year: -2181,
      category: 'disaster',
      description: "The Old Kingdom collapsed around 2181 BCE due to a combination of drought, famine, and weak central government. Ancient texts describe chaos and suffering: 'The land is completely perished... the sun is covered and does not shine.' It was a catastrophic end to Egypt's first golden age.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/First_Intermediate_Period_of_Egypt'
    },
    {
      id: 'hyksos-invasion',
      name: 'Hyksos Invasion',
      year: -1650,
      category: 'war',
      description: "The Hyksos, a people from the eastern Mediterranean, swept into northern Egypt with superior bronze weapons and horse-drawn chariots — technologies the Egyptians had never seen before. They established their own dynasty and ruled Lower Egypt for over a century before being expelled.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Hyksos'
    },
    {
      id: 'amarna-revolution',
      name: 'Amarna Religious Revolution',
      year: -1350,
      category: 'religion',
      description: "Pharaoh Akhenaten shocked Egypt by declaring that only the sun disc Aten should be worshipped, abolishing centuries of Egyptian religion. He built an entirely new capital city called Akhetaten (modern Amarna) and closed the temples of the old gods. After his death, everything was reversed and his name was erased from monuments.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Atenism'
    },
    {
      id: 'abu-simbel-begins',
      name: 'Abu Simbel Construction Begins',
      year: -1279,
      category: 'culture',
      description: "Ramesses II ordered the construction of two massive temples cut directly into the rock face at Abu Simbel in Nubia. Four colossal statues of Ramesses himself, each 20 metres tall, guard the entrance. The temples were designed so that twice a year, sunlight illuminates the statues inside on Ramesses's birthday.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Abu_Simbel_temples'
    },
    {
      id: 'battle-of-kadesh',
      name: 'Battle of Kadesh',
      year: -1274,
      category: 'war',
      description: "The Battle of Kadesh between Ramesses II and the Hittite king Muwatalli II was one of the largest chariot battles in history, with thousands of warriors on each side. It ended in stalemate and led to the world's first known peace treaty. Both sides claimed victory!",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Battle_of_Kadesh'
    },
    {
      id: 'persian-conquest',
      name: 'Persian Conquest of Egypt',
      year: -525,
      category: 'war',
      description: "The Persian king Cambyses II invaded and conquered Egypt in 525 BCE, defeating Pharaoh Psamtik III at the Battle of Pelusium. Egypt became a province of the vast Persian Empire. The Persians respected some Egyptian customs but their rule was often unpopular.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Achaemenid_Egypt'
    },
    {
      id: 'alexander-conquers',
      name: 'Alexander the Great Conquers Egypt',
      year: -332,
      category: 'war',
      description: "Alexander the Great arrived in Egypt in 332 BCE and was welcomed as a liberator after the unpopular Persian occupation. He was declared pharaoh and travelled to the oracle of Amun at Siwa, where he was supposedly told he was the son of a god. He founded the city of Alexandria before moving on to conquer Persia.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Alexander_the_Great'
    },
    {
      id: 'rosetta-stone',
      name: 'Rosetta Stone Carved',
      year: -196,
      category: 'politics',
      description: "The Rosetta Stone was carved in 196 BCE during the reign of Ptolemy V. It contains the same decree written in three scripts: Ancient Egyptian hieroglyphs, Demotic script, and Ancient Greek. When discovered in 1799, it allowed scholars to finally decode hieroglyphics — unlocking thousands of years of Egyptian history.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Rosetta_Stone'
    },
    {
      id: 'battle-of-actium',
      name: 'Battle of Actium',
      year: -31,
      category: 'war',
      description: "The naval Battle of Actium in 31 BCE was one of history's most decisive battles. Octavian's fleet defeated the combined forces of Mark Antony and Cleopatra VII. This battle ended Egypt's independence — within a year, both Antony and Cleopatra had taken their own lives and Egypt became a Roman province.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Battle_of_Actium'
    },
    {
      id: 'roman-province',
      name: 'Egypt Becomes Roman Province',
      year: 30,
      category: 'politics',
      description: "After Cleopatra's death in 30 BCE, the Emperor Augustus declared Egypt a Roman province. Egypt's vast grain harvests became crucial for feeding the city of Rome. The country would never again be ruled by an Egyptian dynasty, marking the end of 3,000 years of pharaonic civilisation.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Roman_Egypt'
    },
    {
      id: 'theodosius-closes-temples',
      name: 'Theodosius Closes Pagan Temples',
      year: 391,
      category: 'religion',
      description: "The Roman Emperor Theodosius I banned all pagan worship throughout the empire in 391 CE, ordering Egyptian temples to close. This marked the end of ancient Egyptian religion after over 3,000 years of continuous practice. The last known hieroglyphic inscription was carved at the Temple of Isis at Philae in 394 CE.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Edict_of_Thessalonica'
    }
  ],
  constructions: [
    {
      id: 'step-pyramid',
      name: 'Step Pyramid of Djoser',
      year: -2650,
      category: 'monument',
      description: "The Step Pyramid at Saqqara was the world's first large stone building, designed by the brilliant architect Imhotep for Pharaoh Djoser. It rises in six giant steps to a height of 62 metres. Before this, Egyptian tombs were flat-roofed structures called mastabas — this pyramid changed architecture forever.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Pyramid_of_Djoser',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Saqqara_BW_5.jpg/320px-Saqqara_BW_5.jpg'
    },
    {
      id: 'great-pyramid',
      name: 'Great Pyramid of Giza',
      year: -2560,
      category: 'monument',
      description: "The Great Pyramid was built for Pharaoh Khufu and is the oldest of the Seven Wonders of the Ancient World — and the only one still largely intact. Built with over 2.3 million stone blocks, some weighing up to 80 tonnes, it was constructed with extraordinary precision. The four sides align almost perfectly with the compass points.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Great_Pyramid_of_Giza',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Khufu%27s_Pyramid_in_2010.jpg/320px-Khufu%27s_Pyramid_in_2010.jpg'
    },
    {
      id: 'great-sphinx',
      name: 'Great Sphinx of Giza',
      year: -2530,
      category: 'monument',
      description: "The Great Sphinx is the largest monumental sculpture in the ancient world, carved from a single ridge of limestone. With the body of a lion and the face of a human (believed to be Pharaoh Khafre), it stands 73 metres long and 20 metres tall. For thousands of years it was buried up to its neck in sand.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Great_Sphinx_of_Giza',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Great_Sphinx_of_Giza_-_20080716a.jpg/320px-Great_Sphinx_of_Giza_-_20080716a.jpg'
    },
    {
      id: 'temple-hatshepsut',
      name: 'Temple of Hatshepsut',
      year: -1458,
      category: 'temple',
      description: "The mortuary temple of Hatshepsut at Deir el-Bahri is considered one of the most beautiful buildings of the ancient world. It rises in three colonnaded terraces against the limestone cliffs. The walls are decorated with painted reliefs showing the divine birth of Hatshepsut and her famous trading expedition to Punt.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Mortuary_Temple_of_Hatshepsut',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Mortuary_temple_of_Hatshepsut_2010.jpg/320px-Mortuary_temple_of_Hatshepsut_2010.jpg'
    },
    {
      id: 'luxor-temple',
      name: 'Luxor Temple',
      year: -1390,
      category: 'temple',
      description: "The Luxor Temple was built mainly by Amenhotep III and Ramesses II on the east bank of the Nile. Unlike other temples dedicated to gods, Luxor was dedicated to the rejuvenation of kingship. Alexander the Great later added a shrine here, and the Romans converted part of it into a church.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Luxor_Temple',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Luxor_temple_R01.jpg/320px-Luxor_temple_R01.jpg'
    },
    {
      id: 'valley-of-kings',
      name: 'Valley of the Kings',
      year: -1350,
      category: 'monument',
      description: "The Valley of the Kings on the west bank of the Nile at Luxor was the royal burial ground for pharaohs of the New Kingdom. Cut deep into the rock, these decorated tombs were filled with treasures for the afterlife. Over 60 royal tombs have been discovered here, including the famous tomb of Tutankhamun.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Valley_of_the_Kings',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Valley_of_the_Kings_from_above.jpg/320px-Valley_of_the_Kings_from_above.jpg'
    },
    {
      id: 'karnak-temple',
      name: 'Karnak Temple Complex',
      year: -1350,
      category: 'temple',
      description: "The Karnak Temple Complex at Luxor is the largest religious building ever constructed. Built and added to by successive pharaohs over 2,000 years, it covers over 100 hectares. Its Great Hypostyle Hall contains 134 massive columns arranged in 16 rows, some over 21 metres tall.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Karnak',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Karnak_temple_Ramesses_III_forecourt_entrance.jpg/320px-Karnak_temple_Ramesses_III_forecourt_entrance.jpg'
    },
    {
      id: 'abu-simbel',
      name: 'Abu Simbel Temples',
      year: -1279,
      category: 'temple',
      description: "Ramesses II carved two enormous temples directly into a sandstone cliff at Abu Simbel in Nubia. The Great Temple is guarded by four 20-metre statues of Ramesses himself. In an extraordinary feat of modern engineering, the entire complex was moved in the 1960s to save it from rising floodwaters.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Abu_Simbel_temples',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Abu_Simbel%2C_Ramesses_Temple%2C_front%2C_Egypt%2C_Oct_2004.jpg/320px-Abu_Simbel%2C_Ramesses_Temple%2C_front%2C_Egypt%2C_Oct_2004.jpg'
    },
    {
      id: 'library-alexandria',
      name: 'Library of Alexandria',
      year: -305,
      category: 'landmark',
      description: "The Great Library of Alexandria, founded during the reign of Ptolemy I, was the largest library in the ancient world. Scholars estimate it held between 400,000 and 700,000 scrolls. It attracted the greatest thinkers of the ancient world including Euclid and Archimedes. Its gradual destruction was a devastating loss to human knowledge.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Library_of_Alexandria',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Ancientlibraryalex.jpg/320px-Ancientlibraryalex.jpg'
    },
    {
      id: 'lighthouse-alexandria',
      name: 'Lighthouse of Alexandria',
      year: -280,
      category: 'landmark',
      description: "The Lighthouse of Alexandria, on the island of Pharos, was one of the Seven Wonders of the Ancient World. Standing between 100 and 130 metres tall, it was one of the tallest man-made structures in the world for centuries. A great fire at its top guided ships safely into the busy port of Alexandria.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Lighthouse_of_Alexandria'
    }
  ]
};