

const assignments = [

// grade 7 
  {
    id: 'g7-math-fractions',
    grade: 'Grade 7',
    subject: 'Mathematics',
    title: 'Fractions worksheet',
    details: 'Choose the correct answer for each question.',
    due: '2026-11-17T16:00',
    questions: [
      { question: 'What is 1/2 + 1/4?', options: ['2/6', '3/4', '1/4', '2/4'], answer: 1 },
      { question: 'Which is bigger, 3/4 or 2/3?', options: ['3/4', '2/3', 'They are equal', 'Cannot tell'], answer: 0 },
      { question: 'In the fraction 5/8, what is the numerator?', options: ['8', '5', '13', '3'], answer: 1 },
      { question: 'What is 3/5 - 1/5?', options: ['2/5', '2/10', '4/5', '3/10'], answer: 0 }
    ]
  },
  {
    id: 'g7-english-nouns-verbs',
    grade: 'Grade 7',
    subject: 'English',
    title: 'Nouns and verbs',
    details: 'Choose the correct answer for each question.',
    due: '2026-11-18T19:00',
    questions: [
      { question: 'Which word is a noun?', options: ['Quickly', 'Teacher', 'Jump', 'Bright'], answer: 1 },
      { question: 'Which word is the verb in: "The children play in the garden."?', options: ['children', 'play', 'garden', 'The'], answer: 1 },
      { question: 'Which sentence is correct?', options: ['She walk to school every day.', 'She walks to school every day.', 'She walking to school every day.', 'She walken to school every day.'], answer: 1 },
      { question: 'What is the plural of "child"?', options: ['Childs', 'Childes', 'Children', 'Childrens'], answer: 2 }
    ]
  },
  {
    id: 'g7-science-plants',
    grade: 'Grade 7',
    subject: 'Science',
    title: 'Plant life cycle',
    details: 'Choose the correct answer for each question.',
    due: '2026-11-12T16:00',
    questions: [
      { question: 'Which is the first stage of a plant\'s life cycle?', options: ['Flowering', 'Seed', 'Fruit', 'Seedling'], answer: 1 },
      { question: 'What does a seed need to start growing?', options: ['Water, air and warmth', 'Only sunlight', 'Only soil', 'Darkness and ice'], answer: 0 },
      { question: 'Which part of the plant takes in water from the soil?', options: ['Leaves', 'Flower', 'Roots', 'Fruit'], answer: 2 },
      { question: 'Which part of a flower later becomes the fruit?', options: ['Petal', 'Ovary', 'Stem', 'Root'], answer: 1 }
    ]
  },
  {
    id: 'g7-sst-kenya-map',
    grade: 'Grade 7',
    subject: 'Social studies',
    title: 'Map of Kenya',
    details: 'Choose the correct answer for each question.',
    due: '2026-11-05T16:00',
    questions: [
      { question: 'What is the capital city of Kenya?', options: ['Mombasa', 'Kisumu', 'Nairobi', 'Nakuru'], answer: 2 },
      { question: 'Which is the largest lake in Africa, shared by Kenya, Uganda and Tanzania?', options: ['Lake Turkana', 'Lake Victoria', 'Lake Naivasha', 'Lake Baringo'], answer: 1 },
      { question: 'Which is the longest river in Kenya?', options: ['Tana River', 'Athi River', 'Nzoia River', 'Ewaso Nyiro'], answer: 0 },
      { question: 'Which ocean borders Kenya to the east?', options: ['Atlantic Ocean', 'Pacific Ocean', 'Indian Ocean', 'Arctic Ocean'], answer: 2 }
    ]
  },

  //grade 8
  {
    id: 'g8-math-ratios',
    grade: 'Grade 8',
    subject: 'Mathematics',
    title: 'Ratios and percentages',
    details: 'Choose the correct answer for each question.',
    due: '2026-11-17T16:00',
    questions: [
      { question: 'What is 20% of 50?', options: ['5', '10', '20', '25'], answer: 1 },
      { question: 'Simplify the ratio 12:18.', options: ['2:3', '3:4', '6:9', '4:5'], answer: 0 },
      { question: 'A shirt costing KES 800 has a 25% discount. How much is the discount?', options: ['KES 100', 'KES 200', 'KES 400', 'KES 25'], answer: 1 },
      { question: 'Write 3/4 as a percentage.', options: ['34%', '43%', '75%', '80%'], answer: 2 }
    ]
  },
  {
    id: 'g8-english-vocabulary',
    grade: 'Grade 8',
    subject: 'English',
    title: 'Vocabulary and meaning',
    details: 'Choose the correct answer for each question.',
    due: '2026-11-19T19:00',
    questions: [
      { question: 'Which word means the opposite of "generous"?', options: ['Kind', 'Selfish', 'Happy', 'Brave'], answer: 1 },
      { question: 'Which word means "very big"?', options: ['Tiny', 'Enormous', 'Narrow', 'Fragile'], answer: 1 },
      { question: 'Yesterday, Amina ___ her homework before supper.', options: ['finish', 'finishes', 'finished', 'finishing'], answer: 2 },
      { question: 'Which word is a synonym of "begin"?', options: ['Stop', 'Start', 'Finish', 'Delay'], answer: 1 }
    ]
  },
  {
    id: 'g8-science-matter',
    grade: 'Grade 8',
    subject: 'Science',
    title: 'States of matter',
    details: 'Choose the correct answer for each question.',
    due: '2026-11-11T16:00',
    questions: [
      { question: 'Which state of matter has a fixed shape and a fixed volume?', options: ['Solid', 'Liquid', 'Gas', 'Steam'], answer: 0 },
      { question: 'What is it called when a liquid turns into a gas?', options: ['Condensation', 'Freezing', 'Evaporation', 'Melting'], answer: 2 },
      { question: 'At what temperature does pure water freeze, in degrees Celsius?', options: ['0', '10', '50', '100'], answer: 0 },
      { question: 'What happens when ice turns into water?', options: ['Freezing', 'Melting', 'Boiling', 'Condensation'], answer: 1 }
    ]
  },
  {
    id: 'g8-sst-trade',
    grade: 'Grade 8',
    subject: 'Social studies',
    title: 'Trade and resources',
    details: 'Choose the correct answer for each question.',
    due: '2026-11-06T16:00',
    questions: [
      { question: 'What is trade?', options: ['Buying and selling goods and services', 'Growing food', 'Building roads', 'Teaching students'], answer: 0 },
      { question: 'Which of these is a renewable resource?', options: ['Coal', 'Oil', 'Sunlight', 'Natural gas'], answer: 2 },
      { question: 'Which country is Kenya\'s neighbour to the north?', options: ['Tanzania', 'Uganda', 'Ethiopia', 'Rwanda'], answer: 2 },
      { question: 'Which crop is a major cash crop grown in the Kenyan highlands?', options: ['Tea', 'Cocoa', 'Rubber', 'Palm oil'], answer: 0 }
    ]
  },

  // grade 9
  {
    id: 'g9-math-pythagoras',
    grade: 'Grade 9',
    subject: 'Mathematics',
    title: 'Pythagoras theorem',
    details: 'Choose the correct answer for each question.',
    due: '2026-11-18T16:00',
    questions: [
      { question: 'A right-angled triangle has two sides of 3 cm and 4 cm. How long is the hypotenuse?', options: ['5 cm', '6 cm', '7 cm', '12 cm'], answer: 0 },
      { question: 'Which formula is Pythagoras\' theorem?', options: ['a + b = c', 'a² + b² = c²', 'a × b = c', 'a² - b² = c²'], answer: 1 },
      { question: 'The hypotenuse is...', options: ['The shortest side', 'The side opposite the right angle', 'Any side', 'The side at the bottom'], answer: 1 },
      { question: 'A triangle has sides 5, 12 and 13. Is it right-angled?', options: ['Yes, because 5² + 12² = 13²', 'No, because 5 + 12 is not 13', 'No, because 13 is too long', 'Yes, because 5 + 12 = 17'], answer: 0 }
    ]
  },
  {
    id: 'g9-english-figures',
    grade: 'Grade 9',
    subject: 'English',
    title: 'Figures of speech',
    details: 'Choose the correct answer for each question.',
    due: '2026-11-20T19:00',
    questions: [
      { question: '"The classroom was a zoo." This is an example of a...', options: ['Simile', 'Metaphor', 'Alliteration', 'Onomatopoeia'], answer: 1 },
      { question: '"As brave as a lion." This is a...', options: ['Metaphor', 'Personification', 'Simile', 'Idiom'], answer: 2 },
      { question: 'Which word is an example of onomatopoeia?', options: ['Buzz', 'Table', 'Happy', 'Quick'], answer: 0 },
      { question: '"The wind whispered through the trees." This is...', options: ['Personification', 'Simile', 'Hyperbole', 'A proverb'], answer: 0 }
    ]
  },
  {
    id: 'g9-science-atoms',
    grade: 'Grade 9',
    subject: 'Science',
    title: 'Atoms and elements',
    details: 'Choose the correct answer for each question.',
    due: '2026-11-13T16:00',
    questions: [
      { question: 'What is the centre of an atom called?', options: ['Electron', 'Nucleus', 'Shell', 'Molecule'], answer: 1 },
      { question: 'Which particle has a negative charge?', options: ['Proton', 'Neutron', 'Electron', 'Nucleus'], answer: 2 },
      { question: 'What is the chemical symbol for oxygen?', options: ['O', 'Ox', 'Og', 'Oy'], answer: 0 },
      { question: 'An element is a substance that...', options: ['Is made of only one kind of atom', 'Is made of different atoms joined together', 'Cannot be found in nature', 'Is always a gas'], answer: 0 }
    ]
  },
  {
    id: 'g9-sst-constitution',
    grade: 'Grade 9',
    subject: 'Social studies',
    title: 'The Constitution of Kenya',
    details: 'Choose the correct answer for each question.',
    due: '2026-11-04T16:00',
    questions: [
      { question: 'In which year was the current Constitution of Kenya promulgated?', options: ['2002', '2007', '2010', '2013'], answer: 2 },
      { question: 'How many counties does Kenya have?', options: ['27', '37', '47', '57'], answer: 2 },
      { question: 'Who is the head of state and government in Kenya?', options: ['The Speaker', 'The Chief Justice', 'The President', 'The Governor'], answer: 2 },
      { question: 'Which arm of government makes the laws?', options: ['The Judiciary', 'The Executive', 'The Legislature', 'The Police'], answer: 2 }
    ]
  }

];