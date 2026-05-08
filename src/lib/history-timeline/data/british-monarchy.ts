import { TimelineData, Era, Ruler, Event, Construction, TimelineId } from '../types';

export const britishMonarchyData: TimelineData = {
  id: 'british-monarchy',
  title: 'British Monarchy',
  subtitle: 'From Æthelstan, first King of England, to the present day',
  startYear: 927,
  endYear: 2024,
  defaultZoomPreset: 'centuries',
  eras: [
    {
      id: 'anglo-saxon',
      name: 'Anglo-Saxon',
      startYear: 927,
      endYear: 1066,
      colour: '#c8a000',
      description: "The Anglo-Saxon period saw the unification of England into a single kingdom under Æthelstan. This era was characterised by frequent Viking raids and settlements, culminating in the brief rule of Danish kings before returning to an English monarch. It ended abruptly with the Norman Conquest in 1066.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Anglo-Saxons'
    },
    {
      id: 'norman',
      name: 'Norman',
      startYear: 1066,
      endYear: 1154,
      colour: '#1a3a6b',
      description: "Following William the Conqueror's victory at the Battle of Hastings, England was ruled by Norman kings who spoke French and built massive stone castles to secure their power. The period saw a profound change in English society, law, and language.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/House_of_Normandy'
    },
    {
      id: 'plantagenet',
      name: 'Plantagenet',
      startYear: 1154,
      endYear: 1399,
      colour: '#1a5c1a',
      description: "The Plantagenets were a powerful and dynamic dynasty who at their height ruled an empire stretching from Scotland to the Pyrenees. Their reign saw the sealing of Magna Carta, the foundation of Parliament, and the outbreak of the Hundred Years' War.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/House_of_Plantagenet'
    },
    {
      id: 'lancaster',
      name: 'House of Lancaster',
      startYear: 1399,
      endYear: 1461,
      colour: '#8b0000',
      description: "A branch of the Plantagenets, the Lancastrian kings included Henry V, famous for his great victory at Agincourt. However, the reign of his son Henry VI led to catastrophic losses in France and the outbreak of the Wars of the Roses.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/House_of_Lancaster'
    },
    {
      id: 'york',
      name: 'House of York',
      startYear: 1461,
      endYear: 1485,
      colour: '#f0f0f0',
      description: "The rival branch to the Lancastrians in the Wars of the Roses. Edward IV proved to be a capable and popular ruler, but the controversial reign of his brother Richard III ended in defeat at the Battle of Bosworth Field.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/House_of_York'
    },
    {
      id: 'tudor',
      name: 'House of Tudor',
      startYear: 1485,
      endYear: 1603,
      colour: '#8b0000',
      description: "One of England's most famous dynasties. The Tudors guided the country through the immense religious and social upheaval of the Reformation. It was an age of discovery, brilliant literature, and growing national confidence under Elizabeth I.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/House_of_Tudor'
    },
    {
      id: 'stuart',
      name: 'House of Stuart',
      startYear: 1603,
      endYear: 1714,
      colour: '#4b0082',
      description: "The Stuarts united the crowns of Scotland and England. Their era was dominated by severe political and religious conflict, leading to a devastating Civil War, the execution of Charles I, a brief republic, and finally the Glorious Revolution which established parliamentary supremacy.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/House_of_Stuart'
    },
    {
      id: 'hanover',
      name: 'House of Hanover',
      startYear: 1714,
      endYear: 1901,
      colour: '#b8860b',
      description: "Under the Hanoverians, Britain transformed into the world's first industrialised nation and built a massive global empire. The era saw the loss of the American colonies, victory over Napoleon, and the long, defining reign of Queen Victoria.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/House_of_Hanover'
    },
    {
      id: 'windsor',
      name: 'House of Windsor',
      startYear: 1901,
      endYear: 2024,
      colour: '#1a3a6b',
      description: "Originally the House of Saxe-Coburg and Gotha, the royal family changed their name to Windsor during the First World War. This era witnessed two devastating World Wars, the decline of the British Empire, the development of modern democracy, and the record-breaking reign of Elizabeth II.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/House_of_Windsor'
    }
  ],
  rulers: [
    {
      id: 'athelstan',
      name: 'Æthelstan',
      startYear: 927,
      endYear: 939,
      eraId: 'anglo-saxon',
      description: "The first King of all England. He conquered the last remaining Viking kingdom of York and secured his power with a great victory at the Battle of Brunanburh.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/%C3%86thelstan'
    },
    {
      id: 'edmund-i',
      name: 'Edmund I',
      startYear: 939,
      endYear: 946,
      eraId: 'anglo-saxon',
      description: "Re-established English control over northern England after Viking uprisings. He was murdered at a feast by an outlaw.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Edmund_I'
    },
    {
      id: 'edward-confessor',
      name: 'Edward the Confessor',
      startYear: 1042,
      endYear: 1066,
      eraId: 'anglo-saxon',
      description: "A deeply religious king who ordered the building of Westminster Abbey. He died without an heir, leading to the succession crisis that caused the Norman Conquest.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Edward_the_Confessor'
    },
    {
      id: 'harold-godwinson',
      name: 'Harold Godwinson',
      startYear: 1066,
      endYear: 1066,
      eraId: 'anglo-saxon',
      description: "The last Anglo-Saxon king of England. After defeating a Viking invasion in the north, he marched his exhausted army south and was killed at the Battle of Hastings.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Harold_Godwinson'
    },
    {
      id: 'william-i',
      name: 'William I the Conqueror',
      startYear: 1066,
      endYear: 1087,
      eraId: 'norman',
      description: "William the Conqueror defeated King Harold at the Battle of Hastings in 1066, forever changing the course of English history. He introduced the feudal system, built castles across the country, and ordered the Domesday Book — a remarkable survey of all land and property in England. He could barely speak English but became one of the most transformative rulers the country has ever known.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/William_the_Conqueror'
    },
    {
      id: 'william-ii',
      name: 'William II',
      startYear: 1087,
      endYear: 1100,
      eraId: 'norman',
      description: "Known as William Rufus because of his red face. He was a capable but unpopular king who was killed by a stray arrow while hunting in the New Forest.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/William_II_of_England'
    },
    {
      id: 'henry-i',
      name: 'Henry I',
      startYear: 1100,
      endYear: 1135,
      eraId: 'norman',
      description: "The youngest son of William the Conqueror. A highly educated and effective administrator whose death without a legitimate male heir plunged the country into a civil war known as 'The Anarchy'.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Henry_I_of_England'
    },
    {
      id: 'stephen',
      name: 'Stephen',
      startYear: 1135,
      endYear: 1154,
      eraId: 'norman',
      description: "Seized the throne on the death of Henry I, leading to years of civil war with his cousin Matilda. It was said that during his reign, 'Christ and his saints slept'.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Stephen,_King_of_England'
    },
    {
      id: 'henry-ii',
      name: 'Henry II',
      startYear: 1154,
      endYear: 1189,
      eraId: 'plantagenet',
      description: "An incredibly energetic king who ruled a vast empire stretching to the Pyrenees. He reformed English law but is famously remembered for his bitter dispute with Thomas Becket, Archbishop of Canterbury, who was murdered in his cathedral.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Henry_II_of_England'
    },
    {
      id: 'richard-i',
      name: 'Richard I',
      startYear: 1189,
      endYear: 1199,
      eraId: 'plantagenet',
      description: "Known as 'Richard the Lionheart'. A famous military leader and crusader who spent only about six months of his ten-year reign actually in England.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Richard_I_of_England'
    },
    {
      id: 'john',
      name: 'John',
      startYear: 1199,
      endYear: 1216,
      eraId: 'plantagenet',
      description: "Often considered one of England's worst kings. He lost most of the English lands in France, alienated his barons, and was famously forced to seal Magna Carta at Runnymede in 1215.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/John,_King_of_England'
    },
    {
      id: 'henry-iii',
      name: 'Henry III',
      startYear: 1216,
      endYear: 1272,
      eraId: 'plantagenet',
      description: "Reigned for 56 years, overseeing the rebuilding of Westminster Abbey. He faced a major rebellion led by Simon de Montfort, which resulted in the first elected Parliament.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Henry_III_of_England'
    },
    {
      id: 'edward-i',
      name: 'Edward I',
      startYear: 1272,
      endYear: 1307,
      eraId: 'plantagenet',
      description: "A fierce and formidable king known as 'Longshanks'. He conquered Wales, building magnificent castles to secure his rule, and spent years attempting to conquer Scotland.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Edward_I_of_England'
    },
    {
      id: 'edward-iii',
      name: 'Edward III',
      startYear: 1327,
      endYear: 1377,
      eraId: 'plantagenet',
      description: "One of England's most successful medieval kings. He started the Hundred Years' War to claim the French throne, winning famous victories at Crécy and Poitiers. His reign also saw the catastrophic Black Death arrive in England.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Edward_III_of_England'
    },
    {
      id: 'richard-ii',
      name: 'Richard II',
      startYear: 1377,
      endYear: 1399,
      eraId: 'plantagenet',
      description: "Became king as a child and faced the Peasants' Revolt. He became increasingly tyrannical and was eventually deposed by his cousin Henry Bolingbroke (Henry IV), dying in captivity.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Richard_II_of_England'
    },
    {
      id: 'henry-v',
      name: 'Henry V',
      startYear: 1413,
      endYear: 1422,
      eraId: 'lancaster',
      description: "A legendary warrior king who won a spectacular victory against the French at the Battle of Agincourt in 1415, against overwhelming odds.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Henry_V_of_England'
    },
    {
      id: 'henry-vi',
      name: 'Henry VI',
      startYear: 1422,
      endYear: 1461,
      eraId: 'lancaster',
      description: "A pious and gentle man who suffered from severe mental breakdowns. His weak rule led to the loss of English lands in France and the outbreak of the Wars of the Roses. He founded Eton College and King's College, Cambridge.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Henry_VI_of_England'
    },
    {
      id: 'edward-iv',
      name: 'Edward IV',
      startYear: 1461,
      endYear: 1483,
      eraId: 'york',
      description: "A tall, handsome, and capable Yorkist king who won the throne during the Wars of the Roses. He brought a period of stability and prosperity to the country after years of conflict.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Edward_IV_of_England'
    },
    {
      id: 'richard-iii',
      name: 'Richard III',
      startYear: 1483,
      endYear: 1485,
      eraId: 'york',
      description: "Seized the throne from his young nephew, who disappeared in the Tower of London. A highly controversial figure, he was killed at the Battle of Bosworth, the last English king to die in battle.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Richard_III_of_England'
    },
    {
      id: 'henry-vii',
      name: 'Henry VII',
      startYear: 1485,
      endYear: 1509,
      eraId: 'tudor',
      description: "Won the throne at Bosworth Field and united the warring houses of Lancaster and York. A shrewd and careful king who restored the country's finances and brought peace to England.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Henry_VII_of_England'
    },
    {
      id: 'henry-viii',
      name: 'Henry VIII',
      startYear: 1509,
      endYear: 1547,
      eraId: 'tudor',
      description: "Henry VIII is one of England's most famous and controversial monarchs. He had six wives — two of whom he had executed — and broke with the Roman Catholic Church to create the Church of England, making himself its head. This split, known as the English Reformation, changed religion in Britain forever. He was also a talented musician, poet, and sportsman in his youth.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Henry_VIII',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Henry-VIII-kingofengland_1491-1547.jpg/220px-Henry-VIII-kingofengland_1491-1547.jpg'
    },
    {
      id: 'edward-vi',
      name: 'Edward VI',
      startYear: 1547,
      endYear: 1553,
      eraId: 'tudor',
      description: "Henry VIII's only legitimate son, who became king at age 9. During his short reign, England became a truly Protestant country. He died of illness at just 15 years old.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Edward_VI_of_England'
    },
    {
      id: 'mary-i',
      name: 'Mary I',
      startYear: 1553,
      endYear: 1558,
      eraId: 'tudor',
      description: "The first queen to rule England in her own right. She fiercely attempted to return the country to Catholicism, having nearly 300 Protestants burned at the stake, which earned her the nickname 'Bloody Mary'.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Mary_I_of_England'
    },
    {
      id: 'elizabeth-i',
      name: 'Elizabeth I',
      startYear: 1558,
      endYear: 1603,
      eraId: 'tudor',
      description: "Elizabeth I was the last Tudor monarch and one of England's greatest rulers. She guided the country through dangerous religious tensions and presided over a golden age of exploration, theatre, and poetry. She never married, calling herself 'married to England'. Her reign saw the defeat of the Spanish Armada in 1588 — one of the most famous victories in English history.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Elizabeth_I',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Elizabeth_I_Rainbow_Portrait.jpg/220px-Elizabeth_I_Rainbow_Portrait.jpg'
    },
    {
      id: 'james-i',
      name: 'James I',
      startYear: 1603,
      endYear: 1625,
      eraId: 'stuart',
      description: "Already King James VI of Scotland, he succeeded Elizabeth to unite the two crowns. He survived the Gunpowder Plot of 1605 and sponsored the famous King James Version of the Bible.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/James_VI_and_I'
    },
    {
      id: 'charles-i',
      name: 'Charles I',
      startYear: 1625,
      endYear: 1649,
      eraId: 'stuart',
      description: "A king who believed he ruled by divine right and frequently clashed with Parliament. These disputes plunged the country into the devastating English Civil War, resulting in his defeat, trial, and execution.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Charles_I_of_England'
    },
    {
      id: 'commonwealth',
      name: 'The Commonwealth',
      startYear: 1649,
      endYear: 1660,
      eraId: 'stuart',
      description: "Following the execution of Charles I, England was a republic. For much of this period it was ruled by Oliver Cromwell as 'Lord Protector', enforcing strict Puritan values including the banning of Christmas festivities.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Commonwealth_of_England',
      unknown: true
    },
    {
      id: 'charles-ii',
      name: 'Charles II',
      startYear: 1660,
      endYear: 1685,
      eraId: 'stuart',
      description: "Restored to the throne in 1660, known as the 'Merry Monarch' for reversing the strict Puritan laws. His reign saw the tragedy of the Great Plague and the Great Fire of London, but also an explosion of science and arts.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Charles_II_of_England'
    },
    {
      id: 'james-ii',
      name: 'James II',
      startYear: 1685,
      endYear: 1688,
      eraId: 'stuart',
      description: "A Catholic king in a fiercely Protestant country. His attempts to promote Catholicism led to his overthrow in the 'Glorious Revolution' by his own daughter Mary and her husband William.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/James_II_of_England'
    },
    {
      id: 'william-mary',
      name: 'William III & Mary II',
      startYear: 1689,
      endYear: 1702,
      eraId: 'stuart',
      description: "The only joint monarchs in British history. They accepted the Bill of Rights, which severely limited royal power and firmly established the authority of Parliament.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/William_III_of_England'
    },
    {
      id: 'anne',
      name: 'Anne',
      startYear: 1702,
      endYear: 1714,
      eraId: 'stuart',
      description: "During her reign, the Acts of Union formally united England and Scotland into a single sovereign state called Great Britain. Despite 17 pregnancies, she died without a surviving heir.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Anne,_Queen_of_Great_Britain'
    },
    {
      id: 'george-i',
      name: 'George I',
      startYear: 1714,
      endYear: 1727,
      eraId: 'hanover',
      description: "A German prince who became king because he was the closest Protestant relative to Queen Anne. He spoke very little English and preferred to spend time in his native Hanover, relying heavily on his ministers.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/George_I_of_Great_Britain'
    },
    {
      id: 'george-iii',
      name: 'George III',
      startYear: 1760,
      endYear: 1820,
      eraId: 'hanover',
      description: "Reigned for nearly 60 years. His era saw immense changes including the agricultural and industrial revolutions, but he is most famously remembered as the king who lost the American colonies. Later in life, he suffered from severe mental illness.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/George_III_of_the_United_Kingdom'
    },
    {
      id: 'victoria',
      name: 'Victoria',
      startYear: 1837,
      endYear: 1901,
      eraId: 'hanover',
      description: "Queen Victoria reigned for 63 years — longer than any previous British monarch — and gave her name to an entire era. During her reign, Britain became the world's most powerful nation, with an empire covering a quarter of the Earth's surface. She was the grandmother of many European royal families. When her beloved husband Prince Albert died, she wore black for the rest of her life.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Queen_Victoria',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Queen_Victoria_by_Bassano.jpg/220px-Queen_Victoria_by_Bassano.jpg'
    },
    {
      id: 'george-v',
      name: 'George V',
      startYear: 1910,
      endYear: 1936,
      eraId: 'windsor',
      description: "Guided the country through the immense trauma of the First World War. In 1917, due to anti-German sentiment, he changed the royal family's name from Saxe-Coburg and Gotha to Windsor.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/George_V'
    },
    {
      id: 'elizabeth-ii',
      name: 'Elizabeth II',
      startYear: 1952,
      endYear: 2022,
      eraId: 'windsor',
      description: "The longest-reigning monarch in British history, serving for 70 years. She oversaw a period of astonishing technological and social change, seeing the transition from the British Empire to the Commonwealth of Nations. She was a deeply respected global figure of stability and duty.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Elizabeth_II',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Queen_Elizabeth_II_in_March_2015.jpg/220px-Queen_Elizabeth_II_in_March_2015.jpg'
    },
    {
      id: 'charles-iii',
      name: 'Charles III',
      startYear: 2022,
      endYear: 2024,
      eraId: 'windsor',
      description: "The current King of the United Kingdom. He became king after serving as the longest-serving Prince of Wales in British history, and has been a long-time advocate for environmental causes.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Charles_III'
    }
  ],
  events: [
    {
      id: 'hastings',
      name: 'Battle of Hastings',
      year: 1066,
      category: 'war',
      description: "Duke William of Normandy defeated King Harold Godwinson. The battle changed the course of English history, introducing a new ruling class, language, and culture to the country.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Battle_of_Hastings'
    },
    {
      id: 'domesday',
      name: 'Domesday Book',
      year: 1086,
      category: 'politics',
      description: "An incredibly detailed survey of all land and property in England ordered by William the Conqueror to assess taxes. It provides a unique window into medieval life.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Domesday_Book'
    },
    {
      id: 'magna-carta',
      name: 'Magna Carta',
      year: 1215,
      category: 'legislation',
      description: "Rebellious barons forced King John to agree to a charter of liberties at Runnymede. It established the principle that everybody, including the king, was subject to the law.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Magna_Carta'
    },
    {
      id: 'black-death',
      name: 'Black Death',
      year: 1348,
      category: 'disaster',
      description: "A devastating global pandemic of bubonic plague struck England, killing an estimated third to half of the country's population and causing massive social upheaval.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Black_Death_in_England'
    },
    {
      id: 'peasents-revolt',
      name: "Peasants' Revolt",
      year: 1381,
      category: 'politics',
      description: "A major uprising across large parts of England driven by anger over harsh taxes and strict laws following the Black Death. The rebels marched on London but were eventually defeated.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Peasants%27_Revolt'
    },
    {
      id: 'wars-of-roses',
      name: 'Wars of the Roses',
      year: 1455,
      category: 'war',
      description: "A brutal series of civil wars fought over control of the English throne between supporters of two rival cadet branches of the royal House of Plantagenet: Lancaster and York.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Wars_of_the_Roses'
    },
    {
      id: 'english-reformation',
      name: 'English Reformation',
      year: 1534,
      category: 'religion',
      description: "The Act of Supremacy made Henry VIII the Supreme Head of the Church of England, formally breaking ties with the Pope in Rome and beginning the English Reformation.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/English_Reformation'
    },
    {
      id: 'spanish-armada',
      name: 'Defeat of Spanish Armada',
      year: 1588,
      category: 'war',
      description: "An English naval force defeated an enormous Spanish invasion fleet sent by King Philip II to overthrow Queen Elizabeth I and restore Catholicism.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Spanish_Armada'
    },
    {
      id: 'gunpowder-plot',
      name: 'Gunpowder Plot',
      year: 1605,
      category: 'politics',
      description: "A failed assassination attempt against King James I by a group of provincial English Catholics who tried to blow up the House of Lords during the State Opening of Parliament.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Gunpowder_Plot'
    },
    {
      id: 'english-civil-war',
      name: 'English Civil War',
      year: 1642,
      category: 'war',
      description: "A series of civil wars and political machinations between Parliamentarians ('Roundheads') and Royalists ('Cavaliers'), leading to the execution of Charles I.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/English_Civil_War'
    },
    {
      id: 'glorious-revolution',
      name: 'Glorious Revolution',
      year: 1688,
      category: 'politics',
      description: "The bloodless overthrow of the Catholic King James II, replaced by his Protestant daughter Mary and her Dutch husband, William of Orange.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Glorious_Revolution'
    },
    {
      id: 'act-union-scotland',
      name: 'Acts of Union (Scotland)',
      year: 1707,
      category: 'legislation',
      description: "The Kingdom of England and the Kingdom of Scotland, which had shared a monarch since 1603, were formally united into a single kingdom called Great Britain.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Acts_of_Union_1707'
    },
    {
      id: 'act-union-ireland',
      name: 'Acts of Union (Ireland)',
      year: 1801,
      category: 'legislation',
      description: "United the Kingdom of Great Britain and the Kingdom of Ireland to create the United Kingdom of Great Britain and Ireland.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Acts_of_Union_1800'
    },
    {
      id: 'great-reform-act',
      name: 'Great Reform Act',
      year: 1832,
      category: 'legislation',
      description: "A major change to the electoral system of England and Wales, expanding the number of people able to vote and giving representation to the new industrial cities.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Reform_Act_1832'
    },
    {
      id: 'crystal-palace',
      name: 'Great Exhibition',
      year: 1851,
      category: 'culture',
      description: "An international exhibition held in the spectacular 'Crystal Palace' in London's Hyde Park, celebrating modern industrial technology and design. It was organized by Prince Albert.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Great_Exhibition'
    },
    {
      id: 'womens-suffrage',
      name: 'Women\'s Suffrage',
      year: 1918,
      category: 'legislation',
      description: "Following the contribution of women during the First World War, the Representation of the People Act finally granted the right to vote to some women over the age of 30.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Representation_of_the_People_Act_1918'
    },
    {
      id: 'end-of-empire',
      name: 'Indian Independence',
      year: 1947,
      category: 'politics',
      description: "The partition of India marked a key moment in the rapid dismantling of the British Empire, as former colonies across the globe began to gain independence.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Partition_of_India'
    },
    {
      id: 'coronation-elizabeth',
      name: 'Coronation of Elizabeth II',
      year: 1953,
      category: 'culture',
      description: "The coronation of Queen Elizabeth II at Westminster Abbey was the first major international event to be broadcast live on television to millions around the world.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Coronation_of_Elizabeth_II'
    },
    {
      id: 'coronation-charles',
      name: 'Coronation of Charles III',
      year: 2023,
      category: 'culture',
      description: "The coronation of King Charles III and Queen Camilla took place at Westminster Abbey, seventy years after his mother's coronation.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Coronation_of_Charles_III_and_Camilla'
    }
  ],
  constructions: [
    {
      id: 'tower-of-london',
      name: 'Tower of London',
      year: 1066,
      category: 'castle',
      description: "A historic castle founded by William the Conqueror on the north bank of the River Thames to secure his control over the hostile citizens of London.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Tower_of_London'
    },
    {
      id: 'windsor-castle',
      name: 'Windsor Castle',
      year: 1070,
      category: 'castle',
      description: "The oldest and largest occupied castle in the world, founded by William the Conqueror. It has been the family home of British kings and queens for almost 1,000 years.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Windsor_Castle'
    },
    {
      id: 'westminster-abbey',
      name: 'Westminster Abbey',
      year: 1065,
      category: 'church',
      description: "A large, mainly Gothic abbey church just to the west of the Palace of Westminster. It has been the location of the coronations of 40 English and British monarchs.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Westminster_Abbey'
    },
    {
      id: 'durham-cathedral',
      name: 'Durham Cathedral',
      year: 1093,
      category: 'church',
      description: "One of the finest examples of Norman architecture in Europe. It was built to house the shrine of St Cuthbert.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Durham_Cathedral'
    },
    {
      id: 'caernarfon-castle',
      name: 'Caernarfon Castle',
      year: 1283,
      category: 'castle',
      description: "A massive medieval fortress in Wales built by King Edward I. It is famous for its distinctive polygonal towers.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Caernarfon_Castle'
    },
    {
      id: 'hampton-court',
      name: 'Hampton Court Palace',
      year: 1515,
      category: 'palace',
      description: "Originally built for Cardinal Thomas Wolsey, this magnificent palace was taken over by King Henry VIII, who expanded it greatly.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Hampton_Court_Palace'
    },
    {
      id: 'st-pauls',
      name: 'St Paul\'s Cathedral',
      year: 1710,
      category: 'church',
      description: "Designed by Sir Christopher Wren in the English Baroque style, it was built as part of a major rebuilding programme after the Great Fire of London.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/St_Paul%27s_Cathedral'
    },
    {
      id: 'buckingham-palace',
      name: 'Buckingham Palace',
      year: 1703,
      category: 'palace',
      description: "Originally known as Buckingham House, it became the official London residence of the British monarch on the accession of Queen Victoria in 1837.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Buckingham_Palace'
    },
    {
      id: 'palace-of-westminster',
      name: 'Palace of Westminster',
      year: 1840,
      category: 'palace',
      description: "After a disastrous fire destroyed the medieval complex, the new Houses of Parliament were rebuilt in a magnificent Gothic Revival style, featuring the famous Elizabeth Tower (Big Ben).",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Palace_of_Westminster'
    },
    {
      id: 'tower-bridge',
      name: 'Tower Bridge',
      year: 1894,
      category: 'bridge',
      description: "A combined bascule and suspension bridge in London, built to ease road traffic while maintaining river access to the busy Pool of London docks.",
      wikipediaUrl: 'https://en.wikipedia.org/wiki/Tower_Bridge'
    }
  ]
};