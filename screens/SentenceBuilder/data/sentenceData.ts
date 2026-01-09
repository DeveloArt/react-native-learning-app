import { Sentence } from '../types/sentenceBuilderTypes';

export const sentenceData: Sentence[] = [
  {
    id: '1',
    source: 'I want to drink water',
    translation: 'Chcę pić wodę',
    targetWords: ['Yo', 'quiero', 'beber', 'agua'],
    distractorWords: ['comida', 'casa', 'coche'],
    correctOrder: ['Yo', 'quiero', 'beber', 'agua'],
  },
  {
    id: '2',
    source: 'She likes to read books',
    translation: 'Ona lubi czytać książki',
    targetWords: ['Ella', 'le gusta', 'leer', 'libros'],
    distractorWords: ['escribir', 'peliculas', 'musica'],
    correctOrder: ['Ella', 'le gusta', 'leer', 'libros'],
  },
  {
    id: '3',
    source: 'We are going to the store',
    translation: 'Idziemy do sklepu',
    targetWords: ['Nosotros', 'vamos', 'a', 'la', 'tienda'],
    distractorWords: ['casa', 'escuela', 'parque'],
    correctOrder: ['Nosotros', 'vamos', 'a', 'la', 'tienda'],
  },
  {
    id: '4',
    source: 'He eats breakfast every morning',
    translation: 'On je śniadanie każdego ranka',
    targetWords: ['Él', 'come', 'desayuno', 'cada', 'mañana'],
    distractorWords: ['cena', 'tarde', 'noche'],
    correctOrder: ['Él', 'come', 'desayuno', 'cada', 'mañana'],
  },
  {
    id: '5',
    source: 'They play soccer in the park',
    translation: 'Oni grają w piłkę nożną w parku',
    targetWords: ['Ellos', 'juegan', 'fútbol', 'en', 'el', 'parque'],
    distractorWords: ['baloncesto', 'calle', 'casa'],
    correctOrder: ['Ellos', 'juegan', 'fútbol', 'en', 'el', 'parque'],
  },
  {
    id: '6',
    source: 'The cat sleeps on the couch',
    translation: 'Kot śpi na kanapie',
    targetWords: ['El', 'gato', 'duerme', 'en', 'el', 'sofá'],
    distractorWords: ['perro', 'cama', 'mesa'],
    correctOrder: ['El', 'gato', 'duerme', 'en', 'el', 'sofá'],
  },
  {
    id: '7',
    source: 'I need to buy groceries',
    translation: 'Muszę kupić artykuły spożywcze',
    targetWords: ['Yo', 'necesito', 'comprar', 'comida'],
    distractorWords: ['ropa', 'libros', 'coche'],
    correctOrder: ['Yo', 'necesito', 'comprar', 'comida'],
  },
  {
    id: '8',
    source: 'She speaks three languages',
    translation: 'Ona mówi trzema językami',
    targetWords: ['Ella', 'habla', 'tres', 'idiomas'],
    distractorWords: ['dos', 'cuatro', 'cinco'],
    correctOrder: ['Ella', 'habla', 'tres', 'idiomas'],
  },
  {
    id: '9',
    source: 'We watch movies on weekends',
    translation: 'Oglądamy filmy w weekendy',
    targetWords: ['Nosotros', 'vemos', 'películas', 'los', 'fines', 'de', 'semana'],
    distractorWords: ['series', 'diarios', 'trabajo'],
    correctOrder: ['Nosotros', 'vemos', 'películas', 'los', 'fines', 'de', 'semana'],
  },
  {
    id: '10',
    source: 'The sun rises in the east',
    translation: 'Słońce wschodzi na wschodzie',
    targetWords: ['El', 'sol', 'sale', 'por', 'el', 'este'],
    distractorWords: ['oeste', 'norte', 'sur'],
    correctOrder: ['El', 'sol', 'sale', 'por', 'el', 'este'],
  },
];

export const getLessonProgress = (currentIndex: number, totalSentences: number): number => {
  return Math.round(((currentIndex + 1) / totalSentences) * 100);
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
