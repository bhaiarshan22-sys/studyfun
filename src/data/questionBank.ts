import { Question, SubjectId, GradeLevel, Difficulty, LanguageSubtype } from '../types/game';

export const INITIAL_QUESTION_BANK: Question[] = [
  // ================= MATHEMATICS =================
  // Grade 1-2
  {
    id: 'math-g12-1',
    subject: 'math',
    gradeRange: 'Grade 1-2',
    difficulty: 'Easy',
    topic: 'Addition & Counting',
    question: 'What is 4 + 3?',
    options: ['6', '7', '8', '9'],
    correctIndex: 1,
    explanation: 'Count 4, then count 3 more: 5, 6, 7. So 4 + 3 = 7!',
    hint: 'Use your fingers: 4 plus 3 fingers equals 7.'
  },
  {
    id: 'math-g12-2',
    subject: 'math',
    gradeRange: 'Grade 1-2',
    difficulty: 'Easy',
    topic: 'Shapes',
    question: 'How many sides does a triangle have?',
    options: ['2', '3', '4', '5'],
    correctIndex: 1,
    explanation: 'A triangle has 3 straight sides and 3 corners.',
    hint: 'Tri- means three!'
  },
  {
    id: 'math-g12-3',
    subject: 'math',
    gradeRange: 'Grade 1-2',
    difficulty: 'Medium',
    topic: 'Subtraction',
    question: 'If you have 10 apples and eat 4, how many are left?',
    options: ['5', '6', '7', '8'],
    correctIndex: 1,
    explanation: '10 minus 4 equals 6 apples remaining.',
    hint: 'Count down 4 from 10: 9, 8, 7, 6.'
  },

  // Grade 3-5
  {
    id: 'math-g35-1',
    subject: 'math',
    gradeRange: 'Grade 3-5',
    difficulty: 'Easy',
    topic: 'Multiplication',
    question: 'What is 7 × 8?',
    options: ['48', '54', '56', '64'],
    correctIndex: 2,
    explanation: '7 times 8 is 56. (7 × 8 = 56).',
    hint: 'Think of 7 × 7 = 49, plus 7 more.'
  },
  {
    id: 'math-g35-2',
    subject: 'math',
    gradeRange: 'Grade 3-5',
    difficulty: 'Medium',
    topic: 'Fractions',
    question: 'Which fraction is equivalent to 1/2?',
    options: ['2/3', '2/4', '3/8', '1/4'],
    correctIndex: 1,
    explanation: '2/4 simplifies to 1/2 because both numerator and denominator divide by 2.',
    hint: 'Two quarters make half a dollar.'
  },
  {
    id: 'math-g35-3',
    subject: 'math',
    gradeRange: 'Grade 3-5',
    difficulty: 'Hard',
    topic: 'Perimeter & Area',
    question: 'A rectangle has a length of 9 cm and a width of 4 cm. What is its area?',
    options: ['26 cm²', '36 cm²', '32 cm²', '40 cm²'],
    correctIndex: 1,
    explanation: 'Area = Length × Width = 9 × 4 = 36 cm².',
    hint: 'Multiply the length by the width.'
  },

  // Grade 6-8
  {
    id: 'math-g68-1',
    subject: 'math',
    gradeRange: 'Grade 6-8',
    difficulty: 'Easy',
    topic: 'Pre-Algebra',
    question: 'Solve for x: x + 15 = 42',
    options: ['25', '27', '30', '32'],
    correctIndex: 1,
    explanation: 'Subtract 15 from both sides: x = 42 - 15 = 27.',
    hint: 'Isolate x by subtracting 15.'
  },
  {
    id: 'math-g68-2',
    subject: 'math',
    gradeRange: 'Grade 6-8',
    difficulty: 'Medium',
    topic: 'Ratios & Percentages',
    question: 'What is 25% of 160?',
    options: ['30', '35', '40', '50'],
    correctIndex: 2,
    explanation: '25% is 1/4 of 160. 160 ÷ 4 = 40.',
    hint: 'Divide 160 by 4.'
  },
  {
    id: 'math-g68-3',
    subject: 'math',
    gradeRange: 'Grade 6-8',
    difficulty: 'Hard',
    topic: 'Geometry & Angles',
    question: 'Two angles are complementary. If one angle is 38°, what is the measure of the other?',
    options: ['52°', '62°', '142°', '90°'],
    correctIndex: 0,
    explanation: 'Complementary angles add up to 90°. 90° - 38° = 52°.',
    hint: 'Complementary angles sum to 90 degrees.'
  },

  // Grade 9-10 & 11-12
  {
    id: 'math-g912-1',
    subject: 'math',
    gradeRange: 'Grade 9-10',
    difficulty: 'Medium',
    topic: 'Quadratic Equations',
    question: 'What are the roots of x² - 9 = 0?',
    options: ['x = 3 only', 'x = -3 only', 'x = ±3', 'x = ±9'],
    correctIndex: 2,
    explanation: 'x² = 9, so x = ±√9 = ±3.',
    hint: 'Factor as difference of squares: (x - 3)(x + 3) = 0.'
  },
  {
    id: 'math-g912-2',
    subject: 'math',
    gradeRange: 'Grade 11-12',
    difficulty: 'Hard',
    topic: 'Trigonometry & Calculus',
    question: 'What is the derivative of f(x) = 3x² + 5x - 7?',
    options: ['3x + 5', '6x + 5', '6x² + 5', '6x - 7'],
    correctIndex: 1,
    explanation: 'Using the power rule: d/dx(3x²) = 6x, and d/dx(5x) = 5. So f\'(x) = 6x + 5.',
    hint: 'Bring down exponents: d/dx(x^n) = n*x^(n-1).'
  },

  // ================= SCIENCE =================
  // Grade 1-2
  {
    id: 'sci-g12-1',
    subject: 'science',
    gradeRange: 'Grade 1-2',
    difficulty: 'Easy',
    topic: 'Plants & Nature',
    question: 'What do plants need from the sky to grow and make food?',
    options: ['Moonlight', 'Sunlight', 'Snow', 'Rainbows'],
    correctIndex: 1,
    explanation: 'Plants need sunlight to grow healthy and strong through photosynthesis.',
    hint: 'The bright warm star in our daytime sky.'
  },
  {
    id: 'sci-g12-2',
    subject: 'science',
    gradeRange: 'Grade 1-2',
    difficulty: 'Easy',
    topic: 'Animals',
    question: 'Which of these animals lives underwater and breathes with gills?',
    options: ['Eagle', 'Fish', 'Rabbit', 'Lion'],
    correctIndex: 1,
    explanation: 'Fish live in water and use their gills to breathe dissolved oxygen.',
    hint: 'They swim with fins.'
  },

  // Grade 3-5
  {
    id: 'sci-g35-1',
    subject: 'science',
    gradeRange: 'Grade 3-5',
    difficulty: 'Easy',
    topic: 'Solar System',
    question: 'Which planet is known as the "Red Planet"?',
    options: ['Venus', 'Mars', 'Jupiter', 'Mercury'],
    correctIndex: 1,
    explanation: 'Mars appears reddish because of iron oxide (rust) on its surface.',
    hint: 'It is the 4th planet from the Sun.'
  },
  {
    id: 'sci-g35-2',
    subject: 'science',
    gradeRange: 'Grade 3-5',
    difficulty: 'Medium',
    topic: 'States of Matter',
    question: 'Water turning into ice is an example of what process?',
    options: ['Evaporation', 'Freezing', 'Condensation', 'Melting'],
    correctIndex: 1,
    explanation: 'Freezing is when a liquid cools down and turns into a solid.',
    hint: 'It happens at 0°C or 32°F.'
  },

  // Grade 6-8
  {
    id: 'sci-g68-1',
    subject: 'science',
    gradeRange: 'Grade 6-8',
    difficulty: 'Easy',
    topic: 'Cell Biology',
    question: 'Which organelle is often called the "powerhouse of the cell"?',
    options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Vacuole'],
    correctIndex: 1,
    explanation: 'Mitochondria generate most of the chemical energy (ATP) needed by the cell.',
    hint: 'Starts with the letter M.'
  },
  {
    id: 'sci-g68-2',
    subject: 'science',
    gradeRange: 'Grade 6-8',
    difficulty: 'Medium',
    topic: 'Physics & Energy',
    question: 'What type of energy does a rolling boulder possess because of its motion?',
    options: ['Potential Energy', 'Kinetic Energy', 'Thermal Energy', 'Chemical Energy'],
    correctIndex: 1,
    explanation: 'Kinetic energy is the energy of an object due to its motion.',
    hint: 'Energy of movement.'
  },

  // Grade 9-12
  {
    id: 'sci-g912-1',
    subject: 'science',
    gradeRange: 'Grade 9-10',
    difficulty: 'Medium',
    topic: 'Chemistry',
    question: 'What is the chemical formula for ordinary table salt?',
    options: ['H2O', 'NaCl', 'CO2', 'CH4'],
    correctIndex: 1,
    explanation: 'Table salt is Sodium Chloride (NaCl).',
    hint: 'Sodium (Na) and Chlorine (Cl).'
  },
  {
    id: 'sci-g912-2',
    subject: 'science',
    gradeRange: 'Grade 11-12',
    difficulty: 'Hard',
    topic: 'Genetics',
    question: 'In DNA, which nitrogenous base pairs specifically with Guanine (G)?',
    options: ['Adenine (A)', 'Thymine (T)', 'Cytosine (C)', 'Uracil (U)'],
    correctIndex: 2,
    explanation: 'Cytosine (C) always bonds with Guanine (G) with three hydrogen bonds in DNA.',
    hint: 'G pairs with C.'
  },

  // ================= GEOGRAPHY =================
  // Grade 1-2
  {
    id: 'geo-g12-1',
    subject: 'geography',
    gradeRange: 'Grade 1-2',
    difficulty: 'Easy',
    topic: 'Earth & Land',
    question: 'What shape is planet Earth?',
    options: ['Flat square', 'Round sphere', 'Triangle', 'Cube'],
    correctIndex: 1,
    explanation: 'Earth is a round sphere floating in space.',
    hint: 'Like a giant ball or globe.'
  },

  // Grade 3-5
  {
    id: 'geo-g35-1',
    subject: 'geography',
    gradeRange: 'Grade 3-5',
    difficulty: 'Easy',
    topic: 'Continents',
    question: 'Which is the largest continent on Earth by land area and population?',
    options: ['Africa', 'Europe', 'Asia', 'North America'],
    correctIndex: 2,
    explanation: 'Asia is the largest continent in both area and total human population.',
    hint: 'Home to China and India.'
  },
  {
    id: 'geo-g35-2',
    subject: 'geography',
    gradeRange: 'Grade 3-5',
    difficulty: 'Medium',
    topic: 'Oceans',
    question: 'Which is the largest and deepest ocean in the world?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'],
    correctIndex: 2,
    explanation: 'The Pacific Ocean covers more than 30% of the Earth’s surface.',
    hint: 'It contains the Mariana Trench.'
  },

  // Grade 6-8
  {
    id: 'geo-g68-1',
    subject: 'geography',
    gradeRange: 'Grade 6-8',
    difficulty: 'Medium',
    topic: 'World Capitals',
    question: 'What is the capital city of Australia?',
    options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
    correctIndex: 2,
    explanation: 'Canberra was chosen as the compromise capital between Sydney and Melbourne.',
    hint: 'It is a planned city, not Sydney!'
  },
  {
    id: 'geo-g68-2',
    subject: 'geography',
    gradeRange: 'Grade 6-8',
    difficulty: 'Hard',
    topic: 'Landforms & Rivers',
    question: 'Which river flows through northeastern Africa and is historically celebrated as one of the longest in the world?',
    options: ['Amazon River', 'Nile River', 'Yangtze River', 'Mississippi River'],
    correctIndex: 1,
    explanation: 'The Nile River flows north through Egypt and neighboring nations into the Mediterranean Sea.',
    hint: 'Flows through the ancient kingdom of Egypt.'
  },

  // Grade 9-12
  {
    id: 'geo-g912-1',
    subject: 'geography',
    gradeRange: 'Grade 9-10',
    difficulty: 'Medium',
    topic: 'Physical Geography & Tectonics',
    question: 'The "Ring of Fire" encircles which major body of water where intense volcanic activity occurs?',
    options: ['Atlantic Ocean', 'Pacific Ocean', 'Indian Ocean', 'Arctic Ocean'],
    correctIndex: 1,
    explanation: 'The Ring of Fire lines the edges of the Pacific plate where many earthquakes and volcanoes erupt.',
    hint: 'Pacific basin.'
  },

  // ================= HISTORY =================
  // Grade 1-2
  {
    id: 'hist-g12-1',
    subject: 'history',
    gradeRange: 'Grade 1-2',
    difficulty: 'Easy',
    topic: 'Early Inventors',
    question: 'Who helped invent the practical incandescent electric light bulb?',
    options: ['Thomas Edison', 'Christopher Columbus', 'Albert Einstein', 'George Washington'],
    correctIndex: 0,
    explanation: 'Thomas Edison developed a long-lasting light bulb that brought light to homes.',
    hint: 'First name Thomas.'
  },

  // Grade 3-5
  {
    id: 'hist-g35-1',
    subject: 'history',
    gradeRange: 'Grade 3-5',
    difficulty: 'Easy',
    topic: 'Ancient Egypt',
    question: 'What massive stone monuments were built in ancient Egypt as tombs for pharaohs?',
    options: ['Castles', 'Pyramids', 'Skyscrapers', 'Colosseums'],
    correctIndex: 1,
    explanation: 'The ancient Egyptians built grand pyramids, such as the Great Pyramid of Giza, for their pharaohs.',
    hint: 'Triangular stone monuments in Giza.'
  },
  {
    id: 'hist-g35-2',
    subject: 'history',
    gradeRange: 'Grade 3-5',
    difficulty: 'Medium',
    topic: 'Age of Exploration',
    question: 'Which famous explorer completed the first recorded European navigation across the Atlantic in 1492?',
    options: ['Marco Polo', 'Christopher Columbus', 'Ferdinand Magellan', 'Neil Armstrong'],
    correctIndex: 1,
    explanation: 'Christopher Columbus sailed across the Atlantic in 1492.',
    hint: 'In 1492, Columbus sailed the ocean blue.'
  },

  // Grade 6-8
  {
    id: 'hist-g68-1',
    subject: 'history',
    gradeRange: 'Grade 6-8',
    difficulty: 'Medium',
    topic: 'Ancient Greece & Rome',
    question: 'In which ancient city-state was direct democracy first established?',
    options: ['Sparta', 'Athens', 'Rome', 'Alexandria'],
    correctIndex: 1,
    explanation: 'Athens developed democratic institutions where citizens voted on laws directly.',
    hint: 'Home of the Parthenon.'
  },

  // Grade 9-12
  {
    id: 'hist-g912-1',
    subject: 'history',
    gradeRange: 'Grade 9-10',
    difficulty: 'Medium',
    topic: 'Industrial Revolution',
    question: 'Which power source revolutionized manufacturing and transportation during the 18th and 19th centuries?',
    options: ['Solar power', 'Steam engine', 'Nuclear fission', 'Windmills'],
    correctIndex: 1,
    explanation: 'James Watt\'s improved steam engine powered factories, trains, and ships.',
    hint: 'Driven by steam and coal.'
  },
  {
    id: 'hist-g912-2',
    subject: 'history',
    gradeRange: 'Grade 11-12',
    difficulty: 'Hard',
    topic: 'World Wars',
    question: 'Which treaty formally brought World War I to an end in 1919?',
    options: ['Treaty of Paris', 'Treaty of Versailles', 'Treaty of Ghent', 'Geneva Convention'],
    correctIndex: 1,
    explanation: 'The Treaty of Versailles was signed in 1919 in the Hall of Mirrors at Versailles.',
    hint: 'Named after the French palace of Versailles.'
  },

  // ================= ENGLISH =================
  // Grade 1-2
  {
    id: 'eng-g12-1',
    subject: 'english',
    gradeRange: 'Grade 1-2',
    difficulty: 'Easy',
    topic: 'Spelling & Phonics',
    question: 'Which word rhymes with "CAT"?',
    options: ['DOG', 'HAT', 'SUN', 'PEN'],
    correctIndex: 1,
    explanation: 'Hat rhymes with cat because they both end with the "-at" sound.',
    hint: 'You wear it on your head.'
  },
  {
    id: 'eng-g12-2',
    subject: 'english',
    gradeRange: 'Grade 1-2',
    difficulty: 'Easy',
    topic: 'Capital Letters',
    question: 'What kind of letter should always start a new sentence?',
    options: ['A number', 'A lowercase letter', 'A capital (uppercase) letter', 'A punctuation mark'],
    correctIndex: 2,
    explanation: 'Every sentence begins with a capital letter!',
    hint: 'Big letter like A, B, C.'
  },

  // Grade 3-5
  {
    id: 'eng-g35-1',
    subject: 'english',
    gradeRange: 'Grade 3-5',
    difficulty: 'Easy',
    topic: 'Parts of Speech',
    question: 'In the sentence "The happy dog barked loudly", what part of speech is "happy"?',
    options: ['Noun', 'Verb', 'Adjective', 'Adverb'],
    correctIndex: 2,
    explanation: '"Happy" describes the dog (a noun), making it an adjective.',
    hint: 'It describes how the dog feels.'
  },
  {
    id: 'eng-g35-2',
    subject: 'english',
    gradeRange: 'Grade 3-5',
    difficulty: 'Medium',
    topic: 'Synonyms & Antonyms',
    question: 'What is an antonym (opposite) of the word "COURAGEOUS"?',
    options: ['Brave', 'Cowardly', 'Strong', 'Bold'],
    correctIndex: 1,
    explanation: 'Courageous means brave; its direct opposite is cowardly.',
    hint: 'Opposite of being brave.'
  },

  // Grade 6-8
  {
    id: 'eng-g68-1',
    subject: 'english',
    gradeRange: 'Grade 6-8',
    difficulty: 'Medium',
    topic: 'Literary Devices',
    question: '"The classroom was a zoo" is an example of which figurative language technique?',
    options: ['Simile', 'Metaphor', 'Personification', 'Hyperbole'],
    correctIndex: 1,
    explanation: 'It compares the classroom to a zoo directly without using "like" or "as", so it is a metaphor.',
    hint: 'A simile uses "like" or "as"; this one does not.'
  },

  // Grade 9-12
  {
    id: 'eng-g912-1',
    subject: 'english',
    gradeRange: 'Grade 9-10',
    difficulty: 'Medium',
    topic: 'Grammar & Syntax',
    question: 'Which of the following sentences correctly avoids a comma splice or run-on?',
    options: [
      'She loved the book, it had an unforgettable plot.',
      'She loved the book; it had an unforgettable plot.',
      'She loved the book it had an unforgettable plot.',
      'She loved the book, because, it had an unforgettable plot.'
    ],
    correctIndex: 1,
    explanation: 'A semicolon correctly joins two related independent clauses without a coordinating conjunction.',
    hint: 'Look for the semicolon joining two complete thoughts.'
  },

  // ================= LANGUAGES (PORTUGUESE, SPANISH, FRENCH, GERMAN, JAPANESE) =================
  // PORTUGUESE (Special emphasis requested by user!)
  {
    id: 'lang-pt-1',
    subject: 'languages',
    subLanguage: 'Portuguese',
    gradeRange: 'Grade 1-2',
    difficulty: 'Easy',
    topic: 'Portuguese: Greetings & Basics',
    question: 'How do you say "Hello" or "Hi" in Portuguese?',
    options: ['Bonjour', 'Olá', 'Ciao', 'Hola'],
    correctIndex: 1,
    explanation: '"Olá" (or "Oi") means "Hello" in Portuguese.',
    hint: 'Sounds like "Oh-lah" with an accent on the a.'
  },
  {
    id: 'lang-pt-2',
    subject: 'languages',
    subLanguage: 'Portuguese',
    gradeRange: 'Grade 1-2',
    difficulty: 'Easy',
    topic: 'Portuguese: Politeness',
    question: 'How do you say "Thank you" in Portuguese (standard/masculine form)?',
    options: ['Merci', 'Obrigado', 'Gracias', 'Danke'],
    correctIndex: 1,
    explanation: '"Obrigado" (or "Obrigada" when spoken by a female) means "Thank you" in Portuguese.',
    hint: 'Starts with "Obr-".'
  },
  {
    id: 'lang-pt-3',
    subject: 'languages',
    subLanguage: 'Portuguese',
    gradeRange: 'Grade 3-5',
    difficulty: 'Easy',
    topic: 'Portuguese: Numbers & Colors',
    question: 'What color is "azul" in Portuguese?',
    options: ['Red', 'Green', 'Blue', 'Yellow'],
    correctIndex: 2,
    explanation: '"Azul" means "Blue" in Portuguese (e.g., o céu azul = the blue sky).',
    hint: 'Similar to azure in English.'
  },
  {
    id: 'lang-pt-4',
    subject: 'languages',
    subLanguage: 'Portuguese',
    gradeRange: 'Grade 3-5',
    difficulty: 'Medium',
    topic: 'Portuguese: Time of Day',
    question: 'How do you greet someone in the morning with "Good morning" in Portuguese?',
    options: ['Boa tarde', 'Boa noite', 'Bom dia', 'Tudo bem'],
    correctIndex: 2,
    explanation: '"Bom dia" literally means "Good day / Good morning" in Portuguese.',
    hint: 'Dia means day.'
  },
  {
    id: 'lang-pt-5',
    subject: 'languages',
    subLanguage: 'Portuguese',
    gradeRange: 'Grade 6-8',
    difficulty: 'Medium',
    topic: 'Portuguese: Verbs & Questions',
    question: 'What does the common Portuguese phrase "Como você se chama?" mean?',
    options: ['Where are you going?', 'What is your name?', 'How old are you?', 'How much does it cost?'],
    correctIndex: 1,
    explanation: '"Como você se chama?" translates to "What is your name?" (literally: How do you call yourself?).',
    hint: 'Chamar = to call.'
  },
  {
    id: 'lang-pt-6',
    subject: 'languages',
    subLanguage: 'Portuguese',
    gradeRange: 'Grade 9-10',
    difficulty: 'Hard',
    topic: 'Portuguese: Grammar & Ser vs Estar',
    question: 'In Portuguese, which verb is used for permanent characteristics (e.g., "Ele ___ professor")?',
    options: ['Estar (está)', 'Ser (é)', 'Ficar (fica)', 'Ter (tem)'],
    correctIndex: 1,
    explanation: 'The verb "ser" (é) denotes permanent identity, profession, origin, or inherent traits.',
    hint: 'Ser for essence/identity, Estar for temporary state/location.'
  },

  // SPANISH
  {
    id: 'lang-es-1',
    subject: 'languages',
    subLanguage: 'Spanish',
    gradeRange: 'Grade 1-2',
    difficulty: 'Easy',
    topic: 'Spanish: Greetings',
    question: 'How do you say "Hello" in Spanish?',
    options: ['Hola', 'Bonjour', 'Hallo', 'Konnichiwa'],
    correctIndex: 0,
    explanation: '"Hola" is the universal greeting for "Hello" in Spanish.',
    hint: 'The H is silent!'
  },
  {
    id: 'lang-es-2',
    subject: 'languages',
    subLanguage: 'Spanish',
    gradeRange: 'Grade 3-5',
    difficulty: 'Easy',
    topic: 'Spanish: Colors',
    question: 'What color is "rojo" in Spanish?',
    options: ['Blue', 'Red', 'Yellow', 'Black'],
    correctIndex: 1,
    explanation: '"Rojo" means "Red" in Spanish.',
    hint: 'Color of a ripe apple.'
  },

  // FRENCH
  {
    id: 'lang-fr-1',
    subject: 'languages',
    subLanguage: 'French',
    gradeRange: 'Grade 3-5',
    difficulty: 'Easy',
    topic: 'French: Basics',
    question: 'How do you say "Thank you very much" in French?',
    options: ['Merci beaucoup', 'S\'il vous plaît', 'De rien', 'Au revoir'],
    correctIndex: 0,
    explanation: '"Merci beaucoup" translates to "Thank you very much" in French.',
    hint: 'Merci means thanks.'
  },

  // GERMAN
  {
    id: 'lang-de-1',
    subject: 'languages',
    subLanguage: 'German',
    gradeRange: 'Grade 6-8',
    difficulty: 'Easy',
    topic: 'German: Greetings',
    question: 'How do you say "Good day / Hello" formally in German?',
    options: ['Guten Tag', 'Auf Wiedersehen', 'Danke schön', 'Bitte'],
    correctIndex: 0,
    explanation: '"Guten Tag" is the standard German greeting for "Good day".',
    hint: 'Tag means day.'
  },

  // JAPANESE
  {
    id: 'lang-ja-1',
    subject: 'languages',
    subLanguage: 'Japanese',
    gradeRange: 'Grade 6-8',
    difficulty: 'Easy',
    topic: 'Japanese: Greetings',
    question: 'Which word is commonly used to say "Hello" or "Good afternoon" in Japanese?',
    options: ['Konnichiwa', 'Arigatou', 'Sayonara', 'Oyasumi'],
    correctIndex: 0,
    explanation: '"Konnichiwa" (こんにちは) is the classic daytime greeting for "Hello".',
    hint: 'Widely recognized anime greeting.'
  }
];

/**
 * Filter questions for a specific grade level, subject, and difficulty
 */
export function getFilteredQuestions(
  subject: SubjectId,
  grade: GradeLevel,
  difficulty?: Difficulty,
  subLanguage?: LanguageSubtype
): Question[] {
  let list = INITIAL_QUESTION_BANK.filter(q => q.subject === subject);

  if (subject === 'languages' && subLanguage) {
    const langMatches = list.filter(q => q.subLanguage === subLanguage);
    if (langMatches.length > 0) {
      list = langMatches;
    }
  }

  // Filter or match closest grade
  const gradeMatches = list.filter(q => q.gradeRange === grade);
  const pool = gradeMatches.length >= 3 ? gradeMatches : list;

  if (difficulty) {
    const diffMatches = pool.filter(q => q.difficulty === difficulty);
    if (diffMatches.length > 0) return diffMatches;
  }

  return pool;
}

/**
 * Dynamic curriculum synthesizer: Generates fresh, grade-adjusted questions
 * on any requested topic to make the curriculum infinite and customizable!
 */
export function generateCurriculumQuestions(
  subject: SubjectId,
  topic: string,
  grade: GradeLevel,
  difficulty: Difficulty = 'Medium',
  count: number = 5
): Question[] {
  // Check if we have pre-crafted questions
  const preCrafted = getFilteredQuestions(subject, grade, difficulty);
  const matched = preCrafted.filter(q => q.topic.toLowerCase().includes(topic.toLowerCase()));

  const questions: Question[] = [...matched];

  // If we need more, dynamically synthesize based on subject + grade rules
  let synthIdx = 1;
  while (questions.length < count) {
    const id = `dyn-${subject}-${grade.replace(/[^a-zA-Z0-9]/g, '')}-${Date.now()}-${synthIdx++}`;
    const generated = createSyntheticQuestion(subject, topic, grade, difficulty, id);
    questions.push(generated);
  }

  return questions.slice(0, count);
}

function createSyntheticQuestion(
  subject: SubjectId,
  topic: string,
  grade: GradeLevel,
  difficulty: Difficulty,
  id: string
): Question {
  const isElementary = grade === 'Grade 1-2' || grade === 'Grade 3-5';
  const isHighSchool = grade === 'Grade 9-10' || grade === 'Grade 11-12' || grade === 'College / Advanced';

  if (subject === 'math') {
    if (isElementary) {
      const a = Math.floor(Math.random() * 8) + 2;
      const b = Math.floor(Math.random() * 8) + 2;
      const ans = a + b;
      return {
        id,
        subject,
        gradeRange: grade,
        difficulty,
        topic: topic || 'Basic Arithmetic',
        question: `Solve this adventure challenge: If you collect ${a} magic crystals and find ${b} more, how many crystals do you have?`,
        options: [`${ans - 1}`, `${ans}`, `${ans + 2}`, `${ans + 1}`],
        correctIndex: 1,
        explanation: `${a} + ${b} equals ${ans}. Great calculation!`,
        hint: `Combine ${a} and ${b}.`
      };
    } else if (isHighSchool) {
      const m = Math.floor(Math.random() * 4) + 2;
      const c = Math.floor(Math.random() * 10) + 1;
      const x = Math.floor(Math.random() * 5) + 2;
      const y = m * x + c;
      return {
        id,
        subject,
        gradeRange: grade,
        difficulty,
        topic: topic || 'Algebra & Linear Equations',
        question: `In the linear relationship y = ${m}x + ${c}, what is the value of y when x = ${x}?`,
        options: [`${y - 2}`, `${y}`, `${y + m}`, `${y * 2}`],
        correctIndex: 1,
        explanation: `Substitute x = ${x}: y = (${m} × ${x}) + ${c} = ${m * x} + ${c} = ${y}.`,
        hint: `Multiply ${m} by ${x}, then add ${c}.`
      };
    } else {
      // Middle school
      const n = Math.floor(Math.random() * 5) + 3;
      const factor = Math.floor(Math.random() * 4) + 2;
      const prod = n * factor;
      return {
        id,
        subject,
        gradeRange: grade,
        difficulty,
        topic: topic || 'Pre-Algebra Factors',
        question: `What is the missing factor: ? × ${factor} = ${prod}?`,
        options: [`${n + 1}`, `${n}`, `${n - 1}`, `${n * 2}`],
        correctIndex: 1,
        explanation: `Divide ${prod} by ${factor}: ${prod} ÷ ${factor} = ${n}.`,
        hint: `Divide ${prod} by ${factor}.`
      };
    }
  }

  if (subject === 'languages') {
    // Portuguese default if not specified
    const ptVocab = [
      { pt: 'água', en: 'Water', options: ['Fire', 'Water', 'Bread', 'Wind'] },
      { pt: 'livro', en: 'Book', options: ['Book', 'Pen', 'Chair', 'Table'] },
      { pt: 'escola', en: 'School', options: ['Hospital', 'Park', 'School', 'Library'] },
      { pt: 'amigo', en: 'Friend', options: ['Enemy', 'Friend', 'Teacher', 'Doctor'] },
      { pt: 'bom dia', en: 'Good morning', options: ['Good night', 'Good morning', 'See you later', 'Excuse me'] }
    ];
    const pick = ptVocab[Math.floor(Math.random() * ptVocab.length)];
    return {
      id,
      subject,
      subLanguage: 'Portuguese',
      gradeRange: grade,
      difficulty,
      topic: topic || 'Portuguese Vocabulary',
      question: `In Portuguese, what does the word "${pick.pt}" translate to in English?`,
      options: pick.options,
      correctIndex: pick.options.indexOf(pick.en),
      explanation: `"${pick.pt}" means "${pick.en}" in Portuguese.`,
      hint: `Think of daily words used in Portuguese speaking countries.`
    };
  }

  // Generic subject generator
  return {
    id,
    subject,
    gradeRange: grade,
    difficulty,
    topic: topic || 'Core Concepts',
    question: `Key concept check in ${subject.toUpperCase()} (${topic || 'Foundations'}): Which strategy leads to the most accurate scientific or academic conclusion?`,
    options: [
      'Guessing without reviewing facts',
      'Gathering verified evidence and testing hypotheses systematically',
      'Accepting the first thought without verification',
      'Ignoring contradictory data'
    ],
    correctIndex: 1,
    explanation: 'Rigorous inquiry relies on systematic verification, hypothesis testing, and verifiable evidence.',
    hint: 'Look for the evidence-based scientific method.'
  };
}
