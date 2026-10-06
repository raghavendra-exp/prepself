/* Interactive Historical Atlas & Archaeological Map Lab
   Complete History of India — Calibrated SVG Map Engine & Site Explorer */

const HistoryMap = (() => {
  const SITES = [
  {
    "id": "harappa",
    "name": "Harappa",
    "layer": "ivc",
    "layerName": "Indus Valley Civilisation",
    "era": "c. 2600 \u2013 1900 BCE (Mature Phase)",
    "state": "Punjab (Montgomery/Sahiwal, Pakistan)",
    "river": "Ravi River",
    "finder": "Daya Ram Sahni (1921)",
    "x": 230,
    "y": 180,
    "lat": 30.6275,
    "lon": 72.8683,
    "highlights": "First discovered site of the Indus civilization. Notable for 6 granaries in two rows, red sandstone male torso, cofin burial (R-37 & Cemetery H), workmen quarters, and copper bullock cart.",
    "prelimsTrap": "Ravi river, NOT Indus directly. First site excavated by Daya Ram Sahni under Sir John Marshall.",
    "mainsRelevance": "Exemplifies advanced urban planning, standardized baked brick ratios (4:2:1), and systematic grain storage administration.",
    "periodId": "indus-valley-civilization"
  },
  {
    "id": "mohenjo-daro",
    "name": "Mohenjo-daro",
    "layer": "ivc",
    "layerName": "Indus Valley Civilisation",
    "era": "c. 2600 \u2013 1900 BCE",
    "state": "Sindh (Larkana, Pakistan)",
    "river": "Indus River",
    "finder": "R.D. Banerjee (1922)",
    "x": 180,
    "y": 260,
    "lat": 27.3292,
    "lon": 68.1389,
    "highlights": "'Mound of the Dead'. Features the Great Bath (bitumen waterproofing), Great Granary, College of Priests, Bronze Dancing Girl (lost-wax casting), and Steatite Priest-King statue.",
    "prelimsTrap": "The Great Bath is at Mohenjo-daro, NOT Harappa. Bronze dancing girl uses lost-wax (cire perdue) technique.",
    "mainsRelevance": "Ritualistic purity reflected in civic architecture, municipal grid system, and elaborate underground drainage systems.",
    "periodId": "indus-valley-civilization"
  },
  {
    "id": "dholavira",
    "name": "Dholavira",
    "layer": "ivc",
    "layerName": "Indus Valley Civilisation",
    "era": "c. 3000 \u2013 1500 BCE",
    "state": "Gujarat (Khadir Bet, Kutch)",
    "river": "Mansar and Manhar seasonal streams",
    "finder": "J.P. Joshi (1967-68), R.S. Bisht",
    "x": 185,
    "y": 380,
    "lat": 23.8864,
    "lon": 70.2131,
    "highlights": "UNESCO World Heritage Site (2021). Unique 3-tier city division (Citadel, Middle Town, Lower Town). Monumental stone water reservoirs, 10-character signboard in Indus script, and cascading water management.",
    "prelimsTrap": "Unlike other IVC cities divided into 2 parts, Dholavira has THREE parts. Built of sandstone/limestone, not just baked bricks.",
    "mainsRelevance": "Masterclass in arid zone water engineering, rain harvesting, and civic resilience in a drought-prone salt plain.",
    "periodId": "indus-valley-civilization"
  },
  {
    "id": "lothal",
    "name": "Lothal",
    "layer": "ivc",
    "layerName": "Indus Valley Civilisation",
    "era": "c. 2400 \u2013 1900 BCE",
    "state": "Gujarat (Ahmedabad district)",
    "river": "Bhogavo River (Gulf of Khambhat)",
    "finder": "S.R. Rao (1954)",
    "x": 210,
    "y": 430,
    "lat": 22.5222,
    "lon": 72.2494,
    "highlights": "World's earliest known tidal dockyard. Persian Gulf seal, joint burial of male-female, fire altars, painted jar (Panchatantra story of thirsty crow/cunning fox), ivory scale for linear measurement.",
    "prelimsTrap": "Tidal dockyard connected to the Bhogavo river, evidence of maritime trade with Mesopotamia/Oman.",
    "mainsRelevance": "Demonstrates Bronze Age maritime commerce, specialized bead manufacture, and international transhipment networks.",
    "periodId": "indus-valley-civilization"
  },
  {
    "id": "kalibangan",
    "name": "Kalibangan",
    "layer": "ivc",
    "layerName": "Indus Valley Civilisation",
    "era": "c. 2600 \u2013 1900 BCE",
    "state": "Rajasthan (Hanumangarh)",
    "river": "Ghaggar (ancient Saraswati)",
    "finder": "Luigi Pio Tessitori / A. Ghosh & B.B. Lal",
    "x": 265,
    "y": 240,
    "lat": 29.4739,
    "lon": 74.1319,
    "highlights": "'Black Bangles'. Earliest ploughed agricultural field surface in the world (cross-grid furrows for two crops simultaneously). Series of 7 fire altars, camel bones, and mud-brick fortifications.",
    "prelimsTrap": "Ploughed agricultural field discovered here, NOT at Harappa. No drainage system in lower town like Mohenjo-daro.",
    "mainsRelevance": "Crucial evidence for double cropping agriculture (mustard + gram) and ritual fire sacrifices in proto-historic India.",
    "periodId": "indus-valley-civilization"
  },
  {
    "id": "rakhigarhi",
    "name": "Rakhigarhi",
    "layer": "ivc",
    "layerName": "Indus Valley Civilisation",
    "era": "c. 2600 \u2013 1900 BCE",
    "state": "Haryana (Hisar district)",
    "river": "Drishadvati / Ghaggar basin",
    "finder": "Amarendra Nath / Vasant Shinde",
    "x": 300,
    "y": 240,
    "lat": 29.2894,
    "lon": 76.1158,
    "highlights": "Largest Indus Valley Civilisation settlement in the subcontinent (over 350 hectares). DNA analysis of ancient skeletal remains showing continuity of indigenous South Asian ancestry.",
    "prelimsTrap": "Rakhigarhi is currently recognized as larger than Mohenjo-daro in total excavated mound footprint.",
    "mainsRelevance": "Challenged theories of migration; key center for metallurgical craft, lapidary workshops, and trade connectivity.",
    "periodId": "indus-valley-civilization"
  },
  {
    "id": "alamgirpur",
    "name": "Alamgirpur",
    "layer": "ivc",
    "layerName": "Indus Valley Civilisation",
    "era": "c. 2400 \u2013 1900 BCE",
    "state": "Uttar Pradesh (Meerut district)",
    "river": "Hindon River (Yamuna tributary)",
    "finder": "Bharat Sevak Samaj / Y.D. Sharma (1958)",
    "x": 340,
    "y": 260,
    "lat": 29.0225,
    "lon": 77.4917,
    "highlights": "Easternmost outpost of the Indus Valley Civilisation. Presence of pottery with cloth impressions, terracotta beads, and faience ornaments.",
    "prelimsTrap": "Marks the absolute eastern boundary of Harappan extent in the upper Ganga-Yamuna Doab.",
    "mainsRelevance": "Critical for understanding Harappan eastward expansion and interaction with indigenous Ochre Coloured Pottery (OCP) cultures.",
    "periodId": "up-prehistoric"
  },
  {
    "id": "chanhudaro",
    "name": "Chanhudaro",
    "layer": "ivc",
    "layerName": "Indus Valley Civilisation",
    "era": "c. 2500 \u2013 1900 BCE",
    "state": "Sindh (Pakistan)",
    "river": "Indus River",
    "finder": "N.G. Majumdar (1931), Ernest Mackay",
    "x": 195,
    "y": 300,
    "lat": 26.175,
    "lon": 68.32,
    "highlights": "Only Indus city without a fortified citadel. Dedicated industrial craft township for bead-making, shell-cutting, metal-working, and seal manufacturing. Inkpot and cosmetics (kohl, lipstick).",
    "prelimsTrap": "The ONLY IVC city without a citadel! Footprints of dog chasing a cat imprinted on a brick.",
    "mainsRelevance": "Shows occupational specialization and decentralized production hubs operating outside fortified administrative centers.",
    "periodId": "indus-valley-civilization"
  },
  {
    "id": "rajgriha",
    "name": "Rajgriha (Girivraja)",
    "layer": "mahajanapadas",
    "layerName": "16 Mahajanapadas & Capitals",
    "era": "c. 6th \u2013 5th Century BCE",
    "state": "Bihar (Nalanda district)",
    "river": "Encircled by five hills (Vaibhara, Ratna, etc.)",
    "finder": "Bimbisara / Haryanka Dynasty capital",
    "x": 525,
    "y": 350,
    "lat": 25.0289,
    "lon": 85.4207,
    "highlights": "First capital of Magadha. Cyclopean stone walls (40 km circumference). Venue of the First Buddhist Council (Sattapanni Cave, 483 BCE) under Ajatashatru. Associated with Mahavira and Buddha.",
    "prelimsTrap": "First capital of Magadha before Pataliputra. First Buddhist Council held here under King Ajatashatru.",
    "mainsRelevance": "Strategic hill fortification that enabled Magadha's initial hegemony over rival Mahajanapadas.",
    "periodId": "age-of-mahajanapadas"
  },
  {
    "id": "pataliputra",
    "name": "Pataliputra",
    "layer": "mahajanapadas",
    "layerName": "16 Mahajanapadas & Capitals",
    "era": "c. 490 BCE onwards",
    "state": "Bihar (Modern Patna)",
    "river": "Confluence of Ganga, Son, Gandak, and Ghaghara",
    "finder": "Founded by Udayin (Haryanka Dynasty)",
    "x": 515,
    "y": 335,
    "lat": 25.6127,
    "lon": 85.1442,
    "highlights": "Imperial metropolis of the Haryankas, Nandas, Mauryas, and Guptas. Megasthenes described it as Palibothra with 64 gates and 570 towers. Site of Third Buddhist Council (250 BCE).",
    "prelimsTrap": "Founded by Udayin (Bimbisara's grandson), NOT Chandragupta Maurya. Mentioned by Megasthenes in Indica.",
    "mainsRelevance": "Jaladurga (water fortress) controlling lucrative riparian commerce along the entire Middle Gangetic Valley.",
    "periodId": "mauryan-empire"
  },
  {
    "id": "shravasti",
    "name": "Shravasti (Sahet-Mahet)",
    "layer": "mahajanapadas",
    "layerName": "16 Mahajanapadas & Capitals",
    "era": "c. 6th Century BCE",
    "state": "Uttar Pradesh (Shravasti / Balrampur)",
    "river": "Rapti River (ancient Achiravati)",
    "finder": "Capital of Kosala Kingdom (King Prasenjit)",
    "x": 435,
    "y": 300,
    "lat": 27.519,
    "lon": 82.0224,
    "highlights": "Buddha spent 24 rainy seasons (vassavasa) here. Jetavana monastery donated by merchant Anathapindika. Major junction on the Uttarapatha trade highway.",
    "prelimsTrap": "Identified as Sahet-Mahet by Alexander Cunningham. Capital of Kosala.",
    "mainsRelevance": "Highlights merchant patronage of early heterodox sects and trade node between Gangetic plain and Himalayan foothills.",
    "periodId": "up-mahajanapadas"
  },
  {
    "id": "kaushambi",
    "name": "Kaushambi",
    "layer": "mahajanapadas",
    "layerName": "16 Mahajanapadas & Capitals",
    "era": "c. 6th Century BCE",
    "state": "Uttar Pradesh (near Prayagraj)",
    "river": "Yamuna River",
    "finder": "Capital of Vatsa (King Udayana)",
    "x": 420,
    "y": 345,
    "lat": 25.34,
    "lon": 81.38,
    "highlights": "Capital of Vatsa Mahajanapada. Massive burnt-brick ramparts. Famous Ghoshitarama monastery where Buddha stayed. Inscriptions of Ashoka and later Samudragupta (Prayag Prashasti).",
    "prelimsTrap": "Capital of Vatsa (romantic hero Udayana in Bhasa's Swapnavasavadatta). Ashokan pillar later relocated to Allahabad fort by Akbar.",
    "mainsRelevance": "Crucial river port where traffic from western coast converged before descending into the middle Gangetic plains.",
    "periodId": "up-mahajanapadas"
  },
  {
    "id": "ujjain",
    "name": "Ujjain (Ujjayini / Avanti)",
    "layer": "mahajanapadas",
    "layerName": "16 Mahajanapadas & Capitals",
    "era": "c. 6th Century BCE",
    "state": "Madhya Pradesh (Malwa plateau)",
    "river": "Shipra River",
    "finder": "Capital of Northern Avanti (King Pradyota)",
    "x": 280,
    "y": 420,
    "lat": 23.1765,
    "lon": 75.7885,
    "highlights": "Prime meridian of ancient Hindu astronomy (0\u00b0 longitude). Mahakaleshwar Jyotirlinga. Governed by Ashoka as viceroy during Bindusara's reign. Center of Gupta golden age under Vikramaditya.",
    "prelimsTrap": "Avanti was split into North (Ujjain) and South (Mahishmati). Prime meridian in Surya Siddhanta.",
    "mainsRelevance": "Key junction linking Uttarapatha and Dakshinapatha; agricultural richness of Malwa black soil fueled Avanti's military power.",
    "periodId": "age-of-mahajanapadas"
  },
  {
    "id": "taxila",
    "name": "Taxila (Takshashila)",
    "layer": "mahajanapadas",
    "layerName": "16 Mahajanapadas & Capitals",
    "era": "c. 6th Century BCE \u2013 5th Century CE",
    "state": "Punjab / Khyber Pakhtunkhwa (Pakistan)",
    "river": "Indus basin / Margalla Hills",
    "finder": "Capital of Gandhara Mahajanapada",
    "x": 190,
    "y": 100,
    "lat": 33.7463,
    "lon": 72.8258,
    "highlights": "UNESCO World Heritage Site. Pre-eminent center of higher learning; Chanakya, Panini, Charaka, and Jivaka studied/taught here. Confluence of Persian, Greek, Scythian, and Indian cultural traditions.",
    "prelimsTrap": "Capital of Gandhara. Not a residential university with centralized exams like Nalanda, but a mentor-student scholarly hub.",
    "mainsRelevance": "Gateway between Central Asia and the Gangetic basin; birthplace of the synthesized Gandhara Greco-Buddhist artistic school.",
    "periodId": "age-of-mahajanapadas"
  },
  {
    "id": "vaishali",
    "name": "Vaishali",
    "layer": "mahajanapadas",
    "layerName": "16 Mahajanapadas & Capitals",
    "era": "c. 6th Century BCE",
    "state": "Bihar (Vaishali district)",
    "river": "Gandak River",
    "finder": "Capital of Vajji Confederacy (Lichchhavis)",
    "x": 510,
    "y": 320,
    "lat": 25.986,
    "lon": 85.1275,
    "highlights": "World's earliest documented republic (gana-sangha). Birthplace of Lord Mahavira (Kundagrama). Location of the Second Buddhist Council (383 BCE, Kalasoka) and Buddha's last sermon.",
    "prelimsTrap": "Second Buddhist council held here under Kalasoka. Famous court dancer Amrapali became a Buddhist nun.",
    "mainsRelevance": "Demonstrates democratic republican governance (Sansthadhara/assembly voting) parallel to monarchical states.",
    "periodId": "age-of-mahajanapadas"
  },
  {
    "id": "sarnath",
    "name": "Sarnath (Isipatana / Mrigadava)",
    "layer": "ashoka",
    "layerName": "Ashokan Edicts & Pillars",
    "era": "c. 3rd Century BCE (Ashoka)",
    "state": "Uttar Pradesh (Varanasi district)",
    "river": "Varuna and Ganga confluence",
    "finder": "Dharmachakra Pravartana Site",
    "x": 465,
    "y": 340,
    "lat": 25.3811,
    "lon": 83.0214,
    "highlights": "Buddha's First Sermon (Turning the Wheel of Dharma). Site of Ashoka's Lion Capital (Adopted as National Emblem of India) and Dhamek Stupa. Edict condemning schism in the Buddhist Sangha.",
    "prelimsTrap": "The four lions facing back-to-back atop an abacus with elephant, horse, bull, and lion separated by dharmachakras. Chunar sandstone with Mauryan polish.",
    "mainsRelevance": "Epitome of Mauryan court art; transition from wooden to monumental stone sculpture carrying imperial moral pedagogy.",
    "periodId": "ashoka-the-great"
  },
  {
    "id": "sanchi",
    "name": "Sanchi",
    "layer": "ashoka",
    "layerName": "Ashokan Edicts & Pillars",
    "era": "c. 3rd Century BCE \u2013 12th Century CE",
    "state": "Madhya Pradesh (Raisen district)",
    "river": "Betwa River",
    "finder": "Gen. Henry Taylor (1818), Sir John Marshall",
    "x": 325,
    "y": 380,
    "lat": 23.4795,
    "lon": 77.7397,
    "highlights": "UNESCO World Heritage Site. Great Stupa commissioned by Ashoka over Buddha's relics. Elaborate carved stone gateways (Toranas) added by Satavahanas portraying Jataka tales. Ashokan Schism Edict pillar.",
    "prelimsTrap": "Buddha never physically visited Sanchi during his lifetime! Gateways (toranas) were built under Satavahanas, not Ashoka.",
    "mainsRelevance": "Mastery of narrative stone relief, aniconic representation of Buddha (footprints, umbrella, vacant throne), and civic guild patronage.",
    "periodId": "ashoka-the-great"
  },
  {
    "id": "dhauli",
    "name": "Dhauli (Tosali)",
    "layer": "ashoka",
    "layerName": "Ashokan Edicts & Pillars",
    "era": "c. 261 \u2013 256 BCE",
    "state": "Odisha (Bhubaneswar)",
    "river": "Daya River",
    "finder": "Site of the bloody Kalinga War",
    "x": 560,
    "y": 475,
    "lat": 20.1919,
    "lon": 85.8394,
    "highlights": "Major Rock Edicts XI-XIII replaced by Two Separate Kalinga Edicts ('All men are my children'). Forepart of an elephant carved out of living rock atop the inscription.",
    "prelimsTrap": "Major Rock Edict XIII (describing remorse for Kalinga slaughter) is intentionally omitted at Dhauli and Jaugada, replaced by conciliatory Separate Edicts!",
    "mainsRelevance": "Marks Ashoka's ideological transformation from Bherighosha (war drum) to Dhammaghosha (righteous proclamation).",
    "periodId": "ashoka-the-great"
  },
  {
    "id": "girnar",
    "name": "Girnar (Junagadh)",
    "layer": "ashoka",
    "layerName": "Ashokan Edicts & Pillars",
    "era": "c. 250 BCE \u2013 455 CE",
    "state": "Gujarat (Junagadh district)",
    "river": "Suvarnarekha River basin",
    "finder": "James Tod (1822)",
    "x": 175,
    "y": 460,
    "lat": 21.5222,
    "lon": 70.4579,
    "highlights": "Granite boulder bearing inscriptions of THREE famous rulers: Ashoka (14 Major Rock Edicts in Brahmi), Western Kshatrapa Rudradaman I (first long Sanskrit prashasti, 150 CE), and Gupta emperor Skandagupta (repair of Sudarshana lake, 455 CE).",
    "prelimsTrap": "Sudarshana Lake was originally built by Chandragupta Maurya's governor Pushyagupta, canals added by Ashoka's governor Tushaspha, repaired without taxing subjects by Rudradaman I.",
    "mainsRelevance": "Priceless epigraphic evidence proving administrative state continuity across Mauryan, Saka, and Gupta dynasties.",
    "periodId": "ashoka-the-great"
  },
  {
    "id": "maski",
    "name": "Maski",
    "layer": "ashoka",
    "layerName": "Ashokan Edicts & Pillars",
    "era": "c. 250 BCE",
    "state": "Karnataka (Raichur district)",
    "river": "Maski River (tributary of Tungabhadra)",
    "finder": "C. Beadon (1915)",
    "x": 330,
    "y": 620,
    "lat": 15.9558,
    "lon": 76.6575,
    "highlights": "Minor Rock Edict where the author was for the first time explicitly identified by his personal name: 'Devanampiya Ashoka', settling centuries of historical debate.",
    "prelimsTrap": "Before Maski (1915), edicts only mentioned 'Devanampiya Piyadassi'. Confirmed Ashoka's authorship of all edicts.",
    "mainsRelevance": "Demonstrated the southward expansion of the Mauryan empire into the Krishna-Tungabhadra doab.",
    "periodId": "ashoka-the-great"
  },
  {
    "id": "rampurva",
    "name": "Rampurva",
    "layer": "ashoka",
    "layerName": "Ashokan Edicts & Pillars",
    "era": "c. 3rd Century BCE",
    "state": "Bihar (West Champaran)",
    "river": "Gandak river basin",
    "finder": "A.C.L. Carlleyle (1876)",
    "x": 480,
    "y": 290,
    "lat": 27.2667,
    "lon": 84.5,
    "highlights": "Twin Ashokan pillars. Famous for the Rampurva Bull Capital (now housed in the forecourt of Rashtrapati Bhavan) and Lion Capital (Indian Museum, Kolkata).",
    "prelimsTrap": "Rampurva Bull Capital is at Rashtrapati Bhavan, New Delhi. Masterpiece of naturalistic animal sculpture.",
    "mainsRelevance": "Exhibits synthesis of indigenous Indian animistic reverence with Greco-Persian surface polishing methods.",
    "periodId": "ashoka-the-great"
  },
  {
    "id": "ajanta",
    "name": "Ajanta Caves",
    "layer": "heritage",
    "layerName": "Classical Art & UNESCO Heritage",
    "era": "2nd Century BCE \u2013 6th Century CE",
    "state": "Maharashtra (Chhatrapati Sambhajinagar)",
    "river": "Waghora River horseshoe gorge",
    "finder": "Discovered by Capt. John Smith (1819)",
    "x": 265,
    "y": 485,
    "lat": 20.5519,
    "lon": 75.7033,
    "highlights": "UNESCO World Heritage Site. 30 rock-cut Buddhist chaityas and viharas. Renowned worldwide for fresco/tempera mural paintings: Bodhisattva Padmapani, Vajrapani, Dying Princess, and continuous Jataka narratives under Vakataka patronage.",
    "prelimsTrap": "Ajanta is EXCLUSIVELY Buddhist (unlike Ellora which has Buddhist, Hindu, and Jain caves). Murals done on mud-cowdung-plaster layer (tempera technique).",
    "mainsRelevance": "High-water mark of ancient Indian painting; sophisticated mastery of human emotions, perspective, jewelry, and global trade cosmopolitanism.",
    "periodId": "gupta-age"
  },
  {
    "id": "ellora",
    "name": "Ellora Caves (Verul)",
    "layer": "heritage",
    "layerName": "Classical Art & UNESCO Heritage",
    "era": "6th \u2013 10th Century CE",
    "state": "Maharashtra (Chhatrapati Sambhajinagar)",
    "river": "Charanandri Hills",
    "finder": "Rashtrakuta & Yadava kings",
    "x": 255,
    "y": 505,
    "lat": 20.0268,
    "lon": 75.1792,
    "highlights": "UNESCO World Heritage Site. 34 rock-cut caves: Buddhist (1-12), Hindu (13-29), Jain (30-34). Features Cave 16: Kailasha Temple, world's largest monolithic rock-cut structure carved top-to-bottom from a basalt cliff under Krishna I.",
    "prelimsTrap": "Ellora is MULTI-RELIGIOUS (Buddhist + Brahmanical + Jain). Cave 16 Kailash temple excavated top-down, not built bottom-up.",
    "mainsRelevance": "Celebrates religious syncretism and supreme structural bravura in subtractive stone sculpture.",
    "periodId": "early-medieval-period"
  },
  {
    "id": "khajuraho",
    "name": "Khajuraho Group of Monuments",
    "layer": "heritage",
    "layerName": "Classical Art & UNESCO Heritage",
    "era": "c. 950 \u2013 1050 CE",
    "state": "Madhya Pradesh (Chhatarpur)",
    "river": "Khudar River",
    "finder": "Chandella Dynasty rulers",
    "x": 395,
    "y": 350,
    "lat": 24.8318,
    "lon": 79.9199,
    "highlights": "UNESCO World Heritage Site. Zenith of the Nagara (Chandella) style temple architecture. Kandariya Mahadeva, Lakshmana Temple, and Parshvanatha Temple. Shikhara clusters imitating Mount Kailash peaks.",
    "prelimsTrap": "Both Hindu and Jain temples coexist peacefully here. Built by Chandella Rajput rulers.",
    "mainsRelevance": "Philosophical integration of the four Purusharthas (Dharma, Artha, Kama, Moksha) carved onto external sanctum friezes.",
    "periodId": "kingdoms-of-north"
  },
  {
    "id": "konark",
    "name": "Konark Sun Temple",
    "layer": "heritage",
    "layerName": "Classical Art & UNESCO Heritage",
    "era": "c. 1250 CE",
    "state": "Odisha (Puri district)",
    "river": "Chandrabhaga river mouth / Bay of Bengal",
    "finder": "King Narasimhadeva I (Eastern Ganga)",
    "x": 570,
    "y": 485,
    "lat": 19.8876,
    "lon": 86.0945,
    "highlights": "UNESCO World Heritage Site ('Black Pagoda'). Designed as a colossal stone chariot with 24 carved wheels pulled by 7 horses. Kalinga architectural school; wheels function as astronomical sundials accurate to a minute.",
    "prelimsTrap": "Built by Eastern Ganga ruler Narasimhadeva I, NOT Cholas or Pallavas. European sailors termed it the 'Black Pagoda'.",
    "mainsRelevance": "Pinnacle of Orissan rekha and pidha deula engineering utilizing chlorite stone and iron beam lintels.",
    "periodId": "kingdoms-of-north"
  },
  {
    "id": "brihadisvara",
    "name": "Brihadisvara Temple (Thanjavur)",
    "layer": "heritage",
    "layerName": "Classical Art & UNESCO Heritage",
    "era": "1010 CE",
    "state": "Tamil Nadu (Thanjavur)",
    "river": "Kaveri delta",
    "finder": "Rajaraja Chola I ('Peruvudaiyar Kovil')",
    "x": 375,
    "y": 750,
    "lat": 10.7828,
    "lon": 79.1318,
    "highlights": "UNESCO World Heritage Site (Great Living Chola Temples). Pure Dravidian style; 66m high pyramidal Vimana capped by an 80-tonne monolithic granite cupola. Massive monolithic Nandi and bronze Nataraja sculptures.",
    "prelimsTrap": "In Chola architecture, the VIMANA (tower over sanctum) dominates, unlike Vijayanagara/Nayaka where GOPURAM (gateway) dominates!",
    "mainsRelevance": "Monumental reflection of Chola maritime sovereignty, agricultural wealth of Kaveri, and temple as socio-economic redistributive nexus.",
    "periodId": "kingdoms-of-south"
  },
  {
    "id": "mamallapuram",
    "name": "Mamallapuram (Mahabalipuram)",
    "layer": "heritage",
    "layerName": "Classical Art & UNESCO Heritage",
    "era": "7th \u2013 8th Century CE",
    "state": "Tamil Nadu (Chengalpattu)",
    "river": "Coromandel Coast / Bay of Bengal",
    "finder": "Pallava Dynasty (Narasimhavarman I & Rajasimha)",
    "x": 395,
    "y": 700,
    "lat": 12.6269,
    "lon": 80.1927,
    "highlights": "UNESCO World Heritage Site. Pancha Pandava Rathas (monolithic rock temples), Descent of the Ganga / Arjuna's Penance (world's largest open-air rock relief), and the structural Shore Temple.",
    "prelimsTrap": "Transition point from rock-cut cave temples (Mahendra style) to structural masonry temples (Rajasimha style).",
    "mainsRelevance": "Pioneered South Indian temple architecture; served as Pallavas' premier international seaport for Southeast Asian embassies.",
    "periodId": "kingdoms-of-south"
  },
  {
    "id": "nalanda",
    "name": "Nalanda Mahavihara",
    "layer": "heritage",
    "layerName": "Classical Art & UNESCO Heritage",
    "era": "5th \u2013 12th Century CE",
    "state": "Bihar (Nalanda district)",
    "river": "Middle Ganga Plain",
    "finder": "Founded by Kumargupta I (Gupta Dynasty)",
    "x": 525,
    "y": 345,
    "lat": 25.1357,
    "lon": 85.4449,
    "highlights": "UNESCO World Heritage Site. Ancient residential international university educating 10,000 students. Famous library Dharmaganja (Ratnasagara, Ratnodadhi, Ratnaranjaka). Visited by Xuanzang and Yijing. Destroyed by Bakhtiyar Khilji (1193 CE).",
    "prelimsTrap": "Founded by Gupta emperor Kumaragupta I (Sakraditya), later patronized by Harsha and Pala kings (Dharmapala).",
    "mainsRelevance": "Global hub of Buddhist scholasticism (Mahayana & Vajrayana), logic, medicine, astronomy, and international cultural diplomacy.",
    "periodId": "gupta-age"
  },
  {
    "id": "belur-halebidu",
    "name": "Belur & Halebidu (Dwarasamudra)",
    "layer": "heritage",
    "layerName": "Classical Art & UNESCO Heritage",
    "era": "12th \u2013 13th Century CE",
    "state": "Karnataka (Hassan district)",
    "river": "Yagachi River",
    "finder": "Hoysala Dynasty (Vishnuvardhana)",
    "x": 310,
    "y": 690,
    "lat": 13.1622,
    "lon": 75.8596,
    "highlights": "UNESCO World Heritage Site (Sacred Ensembles of the Hoysalas, 2023). Chennakeshava Temple (Belur) and Hoysaleshwara Temple (Halebidu). Stellate (star-shaped) platforms, chloritic schist (soapstone) intricate filigree carvings.",
    "prelimsTrap": "Hoysala temples are celebrated for their star-shaped (stellate) plans and soft soapstone carving signed by master sculptors (e.g. Ruvari Mallitamma).",
    "mainsRelevance": "Bridge between Northern Nagara and Southern Dravida styles, forming the exquisite Vesara architectural expression.",
    "periodId": "kingdoms-of-south"
  },
  {
    "id": "panipat",
    "name": "Panipat Battleground",
    "layer": "battles",
    "layerName": "Battlefields & Medieval Forts",
    "era": "1526, 1556, 1761 CE",
    "state": "Haryana",
    "river": "Yamuna River basin",
    "finder": "Gateway to Delhi",
    "x": 315,
    "y": 245,
    "lat": 29.3909,
    "lon": 76.9635,
    "highlights": "Scene of three epochal battles: First (1526: Babur defeats Ibrahim Lodi using Tulughma & artillery); Second (1556: Akbar/Bairam Khan defeats Hemu); Third (1761: Ahmad Shah Abdali defeats Marathas under Sadashivrao Bhau).",
    "prelimsTrap": "Why Panipat? Strategic bottleneck on the Grand Trunk Road between the Punjab plains and Delhi, easy supply logistics, flat terrain for cavalry maneuvers.",
    "mainsRelevance": "Classic UPSC GS-1 question: 'Why did all decisive battles deciding India's fate take place at Panipat?'",
    "periodId": "babur"
  },
  {
    "id": "tarain",
    "name": "Tarain (Taraori)",
    "layer": "battles",
    "layerName": "Battlefields & Medieval Forts",
    "era": "1191 & 1192 CE",
    "state": "Haryana (Karnal district)",
    "river": "Ghaggar-Yamuna plains",
    "finder": "Clash of Rajput and Ghurid empires",
    "x": 310,
    "y": 235,
    "lat": 29.8,
    "lon": 76.93,
    "highlights": "First Battle (1191): Prithviraj Chauhan decisively defeats Muhammad Ghori. Second Battle (1192): Ghori returns with superior Turkish mounted archery and mobile tactics, defeating Prithviraj, laying the foundation of Turkish rule in North India.",
    "prelimsTrap": "Second Battle of Tarain in 1192 established Muslim political power in North India, leading to Delhi Sultanate in 1206.",
    "mainsRelevance": "Contrasts feudal static Rajput cavalry with mobile, centrally commanded Central Asian mounted archery and crossbows.",
    "periodId": "early-medieval-period"
  },
  {
    "id": "talikota",
    "name": "Talikota (Rakshasi-Tangadi)",
    "layer": "battles",
    "layerName": "Battlefields & Medieval Forts",
    "era": "23 January 1565",
    "state": "Karnataka (Krishna River)",
    "river": "Krishna River",
    "finder": "Deccan Sultanates alliance vs Vijayanagara",
    "x": 320,
    "y": 605,
    "lat": 16.48,
    "lon": 76.31,
    "highlights": "Decisive battle where allied Deccan Sultanates (Bijapur, Golconda, Ahmadnagar, Bidar) routed the Vijayanagara army under Aliya Rama Raya. Resulted in the catastrophic sack and ruin of Hampi.",
    "prelimsTrap": "Also known as Battle of Rakshasi-Tangadi. Berar did NOT participate in the Sultanate alliance.",
    "mainsRelevance": "Shifted the geopolitical power balance in South India, ending Vijayanagara's imperial dominance over the peninsula.",
    "periodId": "vijayanagara-empire"
  },
  {
    "id": "haldighati",
    "name": "Haldighati",
    "layer": "battles",
    "layerName": "Battlefields & Medieval Forts",
    "era": "18 June 1576",
    "state": "Rajasthan (Aravalli Range)",
    "river": "Banas River pass",
    "finder": "Maharana Pratap vs Akbar's army",
    "x": 240,
    "y": 375,
    "lat": 24.89,
    "lon": 73.71,
    "highlights": "Fierce mountain pass clash between Maharana Pratap of Mewar and Mughal imperial forces commanded by Raja Man Singh I of Amber. Immortalized for the valor of Pratap and his horse Chetak, and Afghan commander Hakim Khan Sur.",
    "prelimsTrap": "Mughals were commanded by a Rajput (Raja Man Singh), while Rana Pratap's vanguard was led by an Afghan Muslim (Hakim Khan Sur) and Bhil archers led by Rana Punja!",
    "mainsRelevance": "Symbolizes indigenous resistance to imperial hegemony and early guerrilla warfare tactics in rugged mountain terrains.",
    "periodId": "akbar-the-great"
  },
  {
    "id": "chittorgarh",
    "name": "Chittorgarh Fort",
    "layer": "battles",
    "layerName": "Battlefields & Medieval Forts",
    "era": "7th Century onwards (Sieges: 1303, 1535, 1568)",
    "state": "Rajasthan",
    "river": "Berach and Gambhiri rivers",
    "finder": "Sisodia Rajputs of Mewar",
    "x": 260,
    "y": 365,
    "lat": 24.8879,
    "lon": 74.6453,
    "highlights": "UNESCO World Heritage Site (Hill Forts of Rajasthan). Largest fort complex in India (700 acres). Site of historical jauhar by Rani Padmini (1303, Alauddin Khilji siege), Vijay Stambha (Tower of Victory built by Rana Kumbha), and Kirti Stambha.",
    "prelimsTrap": "Vijay Stambha built by Rana Kumbha to celebrate victory over Mahmud Khilji of Malwa. Dedicated to Lord Vishnu.",
    "mainsRelevance": "Archetype of Rajput defensive hill fortification combining self-sustaining water tanks, massive bastions, and moral codes of honor.",
    "periodId": "khilji-dynasty"
  },
  {
    "id": "fatehpur-sikri",
    "name": "Fatehpur Sikri",
    "layer": "battles",
    "layerName": "Battlefields & Medieval Forts",
    "era": "1571 \u2013 1585 CE",
    "state": "Uttar Pradesh (Agra district)",
    "river": "Artificial lake / Sikri ridge",
    "finder": "Founded by Akbar",
    "x": 350,
    "y": 310,
    "lat": 27.0945,
    "lon": 77.6679,
    "highlights": "UNESCO World Heritage Site. Akbar's red sandstone capital built to honor Sufi saint Shaikh Salim Chishti. Buland Darwaza (world's highest gateway, celebrating Gujarat conquest), Ibadat Khana (debates on comparative religion leading to Sulh-i-Kul), and Panch Mahal.",
    "prelimsTrap": "Abandoned in 1585 primarily due to water shortage and Akbar's military campaigns in the Northwest. Buland Darwaza commemorates victory over Gujarat (1573).",
    "mainsRelevance": "Physical embodiment of Akbar's eclectic cultural synthesis, fusing Gujarati, Rajasthani, and Persian architectural idioms.",
    "periodId": "akbar-the-great"
  },
  {
    "id": "plassey",
    "name": "Plassey (Palashi)",
    "layer": "freedom",
    "layerName": "Freedom Struggle Landmarks",
    "era": "23 June 1757",
    "state": "West Bengal (Nadia district)",
    "river": "Bhagirathi River",
    "finder": "Robert Clive vs Siraj-ud-Daulah",
    "x": 585,
    "y": 385,
    "lat": 23.8,
    "lon": 88.25,
    "highlights": "Battle that inaugurated British colonial rule in India. Robert Clive's East India Company defeated Nawab Siraj-ud-Daulah through the treacherous defection of commander Mir Jafar, Rai Durlabh, and financier Jagat Seth.",
    "prelimsTrap": "More of a negotiated treason than a military battle! Clive had only 3,000 troops against Siraj's 50,000.",
    "mainsRelevance": "Initiated the catastrophic 'Drain of Wealth' from Bengal, transforming the EIC from a commercial enterprise into a territorial despot.",
    "periodId": "establishment-of-british-power"
  },
  {
    "id": "buxar",
    "name": "Buxar",
    "layer": "freedom",
    "layerName": "Freedom Struggle Landmarks",
    "era": "22 October 1764",
    "state": "Bihar",
    "river": "Ganga River",
    "finder": "Major Hector Munro vs Combined Indian Forces",
    "x": 485,
    "y": 335,
    "lat": 25.5647,
    "lon": 83.9777,
    "highlights": "Decisive battlefield victory of British troops under Hector Munro over the confederate alliance of Mir Qasim (Nawab of Bengal), Shuja-ud-Daula (Nawab of Awadh), and Mughal Emperor Shah Alam II. Led to the Treaty of Allahabad (1765) granting Diwani rights.",
    "prelimsTrap": "Unlike Plassey which was won by treachery, Buxar was a genuine military battle demonstrating British artillery and disciplinary superiority.",
    "mainsRelevance": "Treaty of Allahabad (1765) granted Diwani rights (revenue collection) of Bengal, Bihar, and Orissa to the Company, laying the formal legal foundation of the British Empire in India.",
    "periodId": "establishment-of-british-power"
  },
  {
    "id": "meerut-1857",
    "name": "Meerut",
    "layer": "freedom",
    "layerName": "Freedom Struggle Landmarks",
    "era": "10 May 1857",
    "state": "Uttar Pradesh",
    "river": "Upper Ganga-Yamuna Doab",
    "finder": "Outbreak of the 1857 Great Revolt",
    "x": 330,
    "y": 255,
    "lat": 28.9845,
    "lon": 77.7064,
    "highlights": "Indian sepoys mutinied against Enfield greased cartridges, killed British officers, broke open jails, and marched through the night to Delhi to declare 82-year-old Mughal emperor Bahadur Shah Zafar as the Shahenshah-e-Hindustan.",
    "prelimsTrap": "Mangal Pandey mutinied earlier at Barrackpore (29 March 1857), but the coordinated open revolt erupted at Meerut on 10 May 1857.",
    "mainsRelevance": "First pan-Indian uprising that united sepoys, dispossessed aristocrats, peasants, and artisans, ending East India Company rule in 1858.",
    "periodId": "up-revolt-of-1857"
  },
  {
    "id": "jhansi",
    "name": "Jhansi",
    "layer": "freedom",
    "layerName": "Freedom Struggle Landmarks",
    "era": "1857 \u2013 1858 CE",
    "state": "Uttar Pradesh (Bundelkhand)",
    "river": "Pahuj and Betwa rivers",
    "finder": "Rani Lakshmibai's heroic stand",
    "x": 335,
    "y": 340,
    "lat": 25.4484,
    "lon": 78.5685,
    "highlights": "Epicenter of the 1857 uprising in Central India. Annexed under Lord Dalhousie's Doctrine of Lapse. Rani Lakshmibai led fierce armed defense against Sir Hugh Rose, who described her as 'the only man among the rebels'.",
    "prelimsTrap": "Annexed by Dalhousie under Doctrine of Lapse (1853) because her adopted son Damodar Rao was denied succession.",
    "mainsRelevance": "Immortal symbol of anti-colonial female leadership and tactical military defiance.",
    "periodId": "up-revolt-of-1857"
  },
  {
    "id": "champaran",
    "name": "Champaran",
    "layer": "freedom",
    "layerName": "Freedom Struggle Landmarks",
    "era": "1917 CE",
    "state": "Bihar",
    "river": "Gandak basin",
    "finder": "Rajkumar Shukla invited Mahatma Gandhi",
    "x": 490,
    "y": 305,
    "lat": 26.8,
    "lon": 84.5,
    "highlights": "Mahatma Gandhi's FIRST Satyagraha in India (First Civil Disobedience). Protest against the oppressive Tinkathia system forcing farmers to cultivate indigo on 3/20th of their land. Resulted in abolition of Tinkathia and 25% compensation refund.",
    "prelimsTrap": "Champaran was Civil Disobedience; Kheda (1918) was Non-Cooperation; Ahmedabad Mill Strike (1918) was first Hunger Strike!",
    "mainsRelevance": "Proved the efficacy of Satyagraha on Indian soil; shifted the nationalist base from urban intelligentsia to the rural peasantry.",
    "periodId": "mahatma-gandhi"
  },
  {
    "id": "jallianwala-bagh",
    "name": "Jallianwala Bagh (Amritsar)",
    "layer": "freedom",
    "layerName": "Freedom Struggle Landmarks",
    "era": "13 April 1919 (Baisakhi)",
    "state": "Punjab",
    "river": "Ravi-Beas doab",
    "finder": "Rowlatt Act Satyagraha",
    "x": 265,
    "y": 180,
    "lat": 31.6206,
    "lon": 74.8801,
    "highlights": "Peaceful gathering protesting the arrest of Dr. Saifuddin Kitchlew and Dr. Satyapal under Rowlatt Act. Brig. Gen. Reginald Dyer blocked the sole narrow exit and ordered troops to fire 1,650 rounds without warning, killing hundreds. Rabindranath Tagore renounced his Knighthood.",
    "prelimsTrap": "Hunter Committee was appointed to inquire into the massacre. Uddham Singh assassinated Michael O'Dwyer (Lt. Governor of Punjab) in London in 1940.",
    "mainsRelevance": "Decisive watershed that permanently shattered moral legitimacy of the British Raj, precipitating the Non-Cooperation Movement (1920).",
    "periodId": "indian-freedom-struggle"
  },
  {
    "id": "chauri-chaura",
    "name": "Chauri Chaura",
    "layer": "freedom",
    "layerName": "Freedom Struggle Landmarks",
    "era": "4 February 1922",
    "state": "Uttar Pradesh (Gorakhpur)",
    "river": "Rapti-Ghaghara basin",
    "finder": "Non-Cooperation Movement",
    "x": 475,
    "y": 315,
    "lat": 26.65,
    "lon": 83.58,
    "highlights": "Police opened fire on a peaceful procession; enraged crowd retaliated by torching the police station, killing 22 policemen. Distressed by the violation of Ahimsa, Mahatma Gandhi unilaterally called off the nationwide Non-Cooperation Movement on 12 February 1922.",
    "prelimsTrap": "Suspension approved by CWC meeting at Bardoli (Bardoli Resolution, Feb 1922). Led to the formation of Swaraj Party by CR Das and Motilal Nehru.",
    "mainsRelevance": "Illustrates Gandhi's unflinching commitment to means over ends and his belief that an undisciplined movement invites brutal state repression.",
    "periodId": "up-freedom-struggle"
  },
  {
    "id": "dandi",
    "name": "Dandi",
    "layer": "freedom",
    "layerName": "Freedom Struggle Landmarks",
    "era": "12 March \u2013 6 April 1930",
    "state": "Gujarat (Navsari district)",
    "river": "Arabian Sea coast",
    "finder": "Salt Satyagraha",
    "x": 215,
    "y": 480,
    "lat": 20.888,
    "lon": 72.801,
    "highlights": "Culmination of the 240-mile Salt March from Sabarmati Ashram to Dandi. Gandhi broke the British Salt Law by picking up a fistful of natural salt, inaugurating the nationwide Civil Disobedience Movement.",
    "prelimsTrap": "March started on 12 March with 78 chosen volunteers, reached Dandi on 5 April, broke law on 6 April 1930. Followed by Dharasana Salt Raid led by Sarojini Naidu.",
    "mainsRelevance": "Masterstroke of political symbolism; salt\u2014a universal necessity\u2014united every class, caste, and gender against unfair colonial taxation.",
    "periodId": "mahatma-gandhi"
  },
  {
    "id": "kakori",
    "name": "Kakori",
    "layer": "freedom",
    "layerName": "Freedom Struggle Landmarks",
    "era": "9 August 1925",
    "state": "Uttar Pradesh (near Lucknow)",
    "river": "Gomti basin",
    "finder": "Hindustan Republican Association (HRA)",
    "x": 410,
    "y": 310,
    "lat": 26.8789,
    "lon": 80.7989,
    "highlights": "Kakori Train Action. HRA revolutionaries led by Ram Prasad Bismil, Ashfaqullah Khan, Chandrashekhar Azad, and Rajendra Lahiri halted the 8-Down train to seize British government treasury to fund revolutionary activities.",
    "prelimsTrap": "Officially renamed 'Kakori Train Action' by UP government. Bismil, Ashfaqullah, Roshan Singh, and Lahiri were martyred by hanging.",
    "mainsRelevance": "Symbolized fearless revolutionary youth movement asserting self-determination and Hindu-Muslim unity against imperial injustice.",
    "periodId": "up-freedom-struggle"
  }
];

  let activeLayer = 'all';
  let activeSite = null;
  let searchTerm = '';

  const LAYERS = [
    { id: 'all', label: 'All Historical Sites', icon: '🏛️', count: SITES.length },
    { id: 'ivc', label: 'Indus Valley Civilisation', icon: '🏺', count: SITES.filter(s=>s.layer==='ivc').length },
    { id: 'mahajanapadas', label: '16 Mahajanapadas & Capitals', icon: '👑', count: SITES.filter(s=>s.layer==='mahajanapadas').length },
    { id: 'ashoka', label: 'Ashokan Edicts & Pillars', icon: '📜', count: SITES.filter(s=>s.layer==='ashoka').length },
    { id: 'heritage', label: 'Classical Art & UNESCO Sites', icon: '🛕', count: SITES.filter(s=>s.layer==='heritage').length },
    { id: 'battles', label: 'Battlefields & Medieval Forts', icon: '⚔️', count: SITES.filter(s=>s.layer==='battles').length },
    { id: 'freedom', label: 'Freedom Struggle Landmarks', icon: '🇮🇳', count: SITES.filter(s=>s.layer==='freedom').length }
  ];

  function getSites() {
    return SITES;
  }

  function getFilteredSites() {
    return SITES.filter(s => {
      const matchLayer = activeLayer === 'all' || s.layer === activeLayer;
      const matchSearch = !searchTerm || 
        s.name.toLowerCase().includes(searchTerm) || 
        s.state.toLowerCase().includes(searchTerm) || 
        s.highlights.toLowerCase().includes(searchTerm) ||
        s.layerName.toLowerCase().includes(searchTerm);
      return matchLayer && matchSearch;
    });
  }

  function setLayer(layerId) {
    activeLayer = layerId;
    render();
  }

  let currentEngine = 'google-hybrid';
  let leafletMap = null;
  let leafletTileLayer = null;
  let leafletMarkersGroup = null;

  const LAYER_COLORS = {
    ivc: '#d97706',
    mahajanapadas: '#2563eb',
    edicts: '#16a34a',
    temples: '#9333ea',
    battles: '#dc2626',
    freedom: '#ea580c'
  };

  function initLeaflet() {
    const mapEl = document.getElementById('leafletMap');
    if (!mapEl || typeof L === 'undefined') return;

    if (!leafletMap) {
      leafletMap = L.map('leafletMap', {
        center: [22.8, 79.5],
        zoom: 5,
        minZoom: 4,
        maxZoom: 18,
        zoomControl: true
      });

      setTileLayer(currentEngine);
      leafletMarkersGroup = L.layerGroup().addTo(leafletMap);
      renderLeafletMarkers();
    }
  }

  function setTileLayer(type) {
    if (!leafletMap) return;
    if (leafletTileLayer) leafletMap.removeLayer(leafletTileLayer);

    let url = '';
    let attribution = '';
    let maxZoom = 20;

    if (type === 'google-hybrid') {
      url = 'https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}';
      attribution = '&copy; Google Maps Satellite & Labels';
      leafletTileLayer = L.tileLayer(url, { subdomains: ['0','1','2','3'], maxZoom, attribution });
    } else if (type === 'google-terrain') {
      url = 'https://mt{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}';
      attribution = '&copy; Google Maps Terrain Relief';
      leafletTileLayer = L.tileLayer(url, { subdomains: ['0','1','2','3'], maxZoom, attribution });
    } else if (type === 'google-roadmap') {
      url = 'https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
      attribution = '&copy; Google Maps Vector';
      leafletTileLayer = L.tileLayer(url, { subdomains: ['0','1','2','3'], maxZoom, attribution });
    } else {
      url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      attribution = '&copy; OpenStreetMap contributors';
      leafletTileLayer = L.tileLayer(url, { maxZoom: 19, attribution });
    }

    leafletTileLayer.addTo(leafletMap);
  }

  function setEngine(engineId) {
    currentEngine = engineId;

    document.querySelectorAll('.engine-btn').forEach(btn => btn.classList.remove('active'));
    const btnMap = {
      'google-hybrid': 'btnEngineHybrid',
      'google-terrain': 'btnEngineTerrain',
      'google-roadmap': 'btnEngineRoadmap',
      'svg': 'btnEngineSvg'
    };
    const activeBtn = document.getElementById(btnMap[engineId]);
    if (activeBtn) activeBtn.classList.add('active');

    const leafletEl = document.getElementById('leafletMap');
    const svgEl = document.getElementById('svgMapWrap');

    if (engineId === 'svg') {
      if (leafletEl) leafletEl.style.display = 'none';
      if (svgEl) svgEl.style.display = 'block';
    } else {
      if (svgEl) svgEl.style.display = 'none';
      if (leafletEl) {
        leafletEl.style.display = 'block';
        if (!leafletMap) {
          initLeaflet();
        } else {
          setTileLayer(engineId);
          setTimeout(() => leafletMap.invalidateSize(), 150);
        }
      }
    }
  }

  function renderLeafletMarkers() {
    if (!leafletMap || !leafletMarkersGroup) return;
    leafletMarkersGroup.clearLayers();

    const filtered = getFilteredSites();
    filtered.forEach(s => {
      if (!s.lat || !s.lon) return;

      const color = LAYER_COLORS[s.layer] || '#7c2d12';
      const markerHtml = `
        <div style="
          width: 20px; 
          height: 20px; 
          border-radius: 50%; 
          background: ${color}; 
          border: 2px solid #ffffff; 
          box-shadow: 0 2px 6px rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        ">
          <div style="width: 6px; height: 6px; border-radius: 50%; background: #ffffff;"></div>
        </div>`;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-leaflet-marker',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      const marker = L.marker([s.lat, s.lon], { icon: customIcon });

      const popupContent = `
        <div style="font-family:var(--font-body); font-size:0.9rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <span class="badge badge-site badge-${s.layer}">${s.layerName}</span>
            <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--ink-faint);">${s.lat.toFixed(2)}°N, ${s.lon.toFixed(2)}°E</span>
          </div>
          <h3 style="font-size:1.15rem; margin:2px 0 6px; font-family:var(--font-display);">${s.name}</h3>
          <p style="font-size:0.84rem; color:var(--ink-soft); margin:0 0 6px;"><b>Era:</b> ${s.era}<br><b>State:</b> ${s.state} &bull; <b>River:</b> ${s.river}</p>
          <p style="font-size:0.82rem; color:var(--ink); margin:0 0 10px; line-height:1.4;">${s.highlights.slice(0, 130)}…</p>
          <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:8px;">
            <a href="https://www.google.com/maps/search/?api=1&query=${s.lat},${s.lon}" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="font-size:0.75rem; padding:3px 8px;">📍 Google Maps</a>
            <a href="https://earth.google.com/web/search/${s.lat},${s.lon}" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="font-size:0.75rem; padding:3px 8px;">🌍 Earth 3D</a>
            <button onclick="HistoryMap.selectSite('${s.id}')" class="btn btn-primary btn-sm" style="font-size:0.75rem; padding:3px 8px;">Dossier &rarr;</button>
          </div>
        </div>`;

      marker.bindPopup(popupContent);
      marker.on('click', () => {
        selectSite(s.id, false);
      });

      leafletMarkersGroup.addLayer(marker);
    });
  }

  function setSearch(term) {
    searchTerm = (term || '').toLowerCase().trim();
    render();
  }

  function selectSite(siteId, panMap = true) {
    activeSite = SITES.find(s => s.id === siteId) || null;
    renderDossier();
    highlightMarker(siteId);

    if (panMap && activeSite && activeSite.lat && activeSite.lon && leafletMap) {
      leafletMap.flyTo([activeSite.lat, activeSite.lon], 9, { duration: 1.2 });
    }
  }

  function highlightMarker(siteId) {
    document.querySelectorAll('.map-marker').forEach(el => {
      if (el.dataset.id === siteId) {
        el.classList.add('selected');
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        el.classList.remove('selected');
      }
    });
  }

  function renderDossier() {
    const dossierEl = document.getElementById('mapDossier');
    if (!dossierEl) return;

    if (!activeSite) {
      dossierEl.innerHTML = `
        <div class="dossier-empty">
          <div class="dossier-icon">🗺️</div>
          <h3>Select a Historical Site</h3>
          <p>Click any calibrated marker on the map to inspect its archaeological profile, river basin, excavator, high-yield UPSC Prelims trap, and Mains significance.</p>
          <div class="dossier-quick-chips">
            <button class="pill-chip" onclick="HistoryMap.selectSite('dholavira')">🏺 Dholavira</button>
            <button class="pill-chip" onclick="HistoryMap.selectSite('sarnath')">📜 Sarnath</button>
            <button class="pill-chip" onclick="HistoryMap.selectSite('ellora')">🛕 Ellora</button>
            <button class="pill-chip" onclick="HistoryMap.selectSite('panipat')">⚔️ Panipat</button>
            <button class="pill-chip" onclick="HistoryMap.selectSite('dandi')">🇮🇳 Dandi</button>
          </div>
        </div>`;
      return;
    }

    const s = activeSite;
    const practiceCategory = (s.layer === 'ivc' || s.layer === 'mahajanapadas' || s.layer === 'edicts')
      ? 'ancient'
      : (s.layer === 'temples' ? 'art-culture' : (s.layer === 'battles' ? 'medieval' : 'modern'));

    dossierEl.innerHTML = `
      <div class="dossier-card reveal in">
        <div class="dossier-header">
          <span class="badge badge-site badge-${s.layer}">${s.layerName}</span>
          <button class="dossier-close" onclick="HistoryMap.selectSite(null)" aria-label="Close dossier">&times;</button>
        </div>
        <h2 class="dossier-title">${s.name}</h2>
        <div class="dossier-meta">
          <span class="d-meta-item"><b>Era:</b> ${s.era}</span>
          <span class="d-meta-item"><b>Location:</b> ${s.state}</span>
          <span class="d-meta-item"><b>Coordinates:</b> ${s.lat ? `${s.lat.toFixed(4)}°N, ${s.lon.toFixed(4)}°E` : 'Calibrated'}</span>
          <span class="d-meta-item"><b>River Basin:</b> ${s.river}</span>
          <span class="d-meta-item"><b>Excavator / Patron:</b> ${s.finder}</span>
        </div>

        <div class="dossier-section">
          <h4>Key Archaeological &amp; Historical Profile</h4>
          <p>${s.highlights}</p>
        </div>

        <div class="upsc-panel" style="margin:16px 0; border-color:var(--seal); background:var(--seal-tint);">
          <h4 style="color:var(--seal-strong); margin-bottom:6px;">⚠️ UPSC Prelims Trap Alert</h4>
          <p style="font-size:0.88rem; margin:0; color:var(--ink);">${s.prelimsTrap}</p>
        </div>

        <div class="upsc-panel" style="margin:16px 0; border-color:var(--accent); background:var(--accent-tint);">
          <h4 style="color:var(--accent-strong); margin-bottom:6px;">🎯 UPSC Mains Analytical Relevance</h4>
          <p style="font-size:0.88rem; margin:0; color:var(--ink);">${s.mainsRelevance}</p>
        </div>

        <div class="dossier-actions" style="display:flex; flex-direction:column; gap:8px; margin-top:16px;">
          ${s.lat && s.lon ? `
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <a href="https://www.google.com/maps/search/?api=1&query=${s.lat},${s.lon}" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="flex:1;">📍 Open in Google Maps</a>
              <a href="https://earth.google.com/web/search/${s.lat},${s.lon}" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="flex:1;">🌍 Explore in Google Earth 3D</a>
            </div>
          ` : ''}
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <a href="timeline.html#${s.periodId}" class="btn btn-primary btn-sm" style="flex:1;">📖 Period Details &rarr;</a>
            <a href="practice.html?category=${practiceCategory}" class="btn btn-outline btn-sm" style="flex:1;">🎯 Practice MCQs &rarr;</a>
          </div>
        </div>
      </div>`;
  }

  function renderMarkers() {
    const markersGroup = document.getElementById('mapMarkersGroup');
    if (markersGroup) {
      const filtered = getFilteredSites();
      document.getElementById('siteCountBadge').textContent = `${filtered.length} sites displayed`;

      markersGroup.innerHTML = filtered.map(s => {
        const isSelected = activeSite && activeSite.id === s.id;
        return `
          <g class="map-marker layer-${s.layer} ${isSelected ? 'selected' : ''}" 
             data-id="${s.id}" 
             transform="translate(${s.x}, ${s.y})" 
             onclick="HistoryMap.selectSite('${s.id}')"
             tabindex="0" role="button" aria-label="${s.name}, ${s.layerName}">
            <circle class="marker-pulse" r="14"></circle>
            <circle class="marker-ring" r="8"></circle>
            <circle class="marker-dot" r="4.5"></circle>
            <text class="marker-label" x="9" y="4">${s.name}</text>
          </g>`;
      }).join('');
    }

    renderLeafletMarkers();
  }

  function renderLayerChips() {
    const bar = document.getElementById('mapLayerFilterBar');
    if (!bar) return;
    bar.innerHTML = LAYERS.map(l => `
      <button class="filter-chip ${activeLayer === l.id ? 'active' : ''}" 
              onclick="HistoryMap.setLayer('${l.id}')">
        <span>${l.icon}</span> ${l.label} 
        <span class="chip-count">(${l.count})</span>
      </button>`).join('');
  }

  function renderListCards() {
    const listEl = document.getElementById('mapSitesList');
    if (!listEl) return;
    const filtered = getFilteredSites();
    if (!filtered.length) {
      listEl.innerHTML = `<p class="loading-note" style="grid-column:1/-1;">No historical sites found matching "${searchTerm}".</p>`;
      return;
    }
    listEl.innerHTML = filtered.map(s => `
      <div class="site-card tablet reveal in ${activeSite && activeSite.id === s.id ? 'active' : ''}" 
           onclick="HistoryMap.selectSite('${s.id}'); document.getElementById('mapStageWrap').scrollIntoView({behavior:'smooth'});">
        <div class="sc-head">
          <span class="badge badge-site badge-${s.layer}">${s.layerName}</span>
          <span class="t-range" style="font-size:0.75rem;">${s.river}</span>
        </div>
        <h3 style="font-size:1.15rem; margin:8px 0 4px;">${s.name}</h3>
        <p class="t-tag" style="margin-bottom:8px;">${s.state} &bull; ${s.era}</p>
        <p style="font-size:0.85rem; color:var(--ink-soft); margin-bottom:12px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${s.highlights}</p>
        <span class="t-arrow" style="font-size:0.78rem;">View site details &rarr;</span>
      </div>`).join('');
  }

  function render() {
    renderLayerChips();
    renderMarkers();
    renderListCards();
    renderDossier();
  }

  function init() {
    renderNav('map.html');
    renderBreadcrumb([{ label: 'Home', href: 'index.html' }, { label: 'Historical Map Lab' }]);
    initLeaflet();
    render();
    renderFooter();

    const searchInput = document.getElementById('mapSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        setSearch(e.target.value);
      });
    }

    // Check query param for preset site
    const params = new URLSearchParams(location.search);
    const siteParam = params.get('site');
    if (siteParam) {
      selectSite(siteParam);
    } else {
      selectSite('dholavira');
    }
  }

  return { init, getSites, setLayer, setSearch, selectSite, setEngine };
})();

