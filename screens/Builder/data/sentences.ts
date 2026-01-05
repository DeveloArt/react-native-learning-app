export interface BuilderSentenceItem {
  id: string;
  promptEn: string; // source sentence shown to user
  promptPl: string;
  targetEs: string; // expected Spanish sentence
}

export type BuilderSentenceMap = Record<string, Record<string, BuilderSentenceItem[]>>;

// categoryKey -> subKey -> sentences
export const builderSentences: BuilderSentenceMap = {
  cuisine: {
    food: [
      {
        id: 'cui-food-1',
        promptEn: 'I like fresh fruit.',
        promptPl: 'Lubię świeże owoce.',
        targetEs: 'Me gustan las frutas frescas.',
      },
      {
        id: 'cui-food-2',
        promptEn: 'We need bread and cheese.',
        promptPl: 'Potrzebujemy chleba i sera.',
        targetEs: 'Necesitamos pan y queso.',
      },
    ],
    drinks: [
      {
        id: 'cui-drinks-1',
        promptEn: 'I would like a glass of water.',
        promptPl: 'Chciałbym szklankę wody.',
        targetEs: 'Quisiera un vaso de agua.',
      },
      {
        id: 'cui-drinks-2',
        promptEn: 'Do you drink coffee in the morning?',
        promptPl: 'Czy pijesz kawę rano?',
        targetEs: '¿Bebes café por la mañana?',
      },
    ],
    dishes: [
      {
        id: 'cui-dishes-1',
        promptEn: 'This soup is very hot.',
        promptPl: 'Ta zupa jest bardzo gorąca.',
        targetEs: 'Esta sopa está muy caliente.',
      },
      {
        id: 'cui-dishes-2',
        promptEn: 'The rice with chicken is tasty.',
        promptPl: 'Ryż z kurczakiem jest smaczny.',
        targetEs: 'El arroz con pollo es sabroso.',
      },
    ],
    restaurant: [
      {
        id: 'cui-rest-1',
        promptEn: 'The bill, please.',
        promptPl: 'Rachunek, proszę.',
        targetEs: 'La cuenta, por favor.',
      },
      {
        id: 'cui-rest-2',
        promptEn: 'A table for two, please.',
        promptPl: 'Stolik dla dwóch osób, proszę.',
        targetEs: 'Una mesa para dos, por favor.',
      },
    ],
  },
  nature: {
    animals: [
      {
        id: 'nat-anim-1',
        promptEn: 'The dog runs in the park.',
        promptPl: 'Pies biega w parku.',
        targetEs: 'El perro corre en el parque.',
      },
      {
        id: 'nat-anim-2',
        promptEn: 'Birds sing in the morning.',
        promptPl: 'Ptaki śpiewają rano.',
        targetEs: 'Los pájaros cantan por la mañana.',
      },
    ],
    plants: [
      {
        id: 'nat-plants-1',
        promptEn: 'These flowers are beautiful.',
        promptPl: 'Te kwiaty są piękne.',
        targetEs: 'Estas flores son hermosas.',
      },
      {
        id: 'nat-plants-2',
        promptEn: 'The tree gives shade.',
        promptPl: 'Drzewo daje cień.',
        targetEs: 'El árbol da sombra.',
      },
    ],
    weather: [
      {
        id: 'nat-weather-1',
        promptEn: 'Today it is very sunny.',
        promptPl: 'Dziś jest bardzo słonecznie.',
        targetEs: 'Hoy hace mucho sol.',
      },
      {
        id: 'nat-weather-2',
        promptEn: 'It rains a lot in autumn.',
        promptPl: 'Jesienią dużo pada.',
        targetEs: 'Llueve mucho en otoño.',
      },
    ],
    landscapes: [
      {
        id: 'nat-land-1',
        promptEn: 'The mountains are high.',
        promptPl: 'Góry są wysokie.',
        targetEs: 'Las montañas son altas.',
      },
      {
        id: 'nat-land-2',
        promptEn: 'We walk along the beach.',
        promptPl: 'Spacerujemy po plaży.',
        targetEs: 'Caminamos por la playa.',
      },
    ],
  },
  travel: {
    airport: [
      {
        id: 'trav-air-1',
        promptEn: 'Our flight is delayed.',
        promptPl: 'Nasz lot jest opóźniony.',
        targetEs: 'Nuestro vuelo está retrasado.',
      },
      {
        id: 'trav-air-2',
        promptEn: 'Where is the boarding gate?',
        promptPl: 'Gdzie jest bramka do wejścia?',
        targetEs: '¿Dónde está la puerta de embarque?',
      },
    ],
    hotel: [
      {
        id: 'trav-hotel-1',
        promptEn: 'I have a reservation.',
        promptPl: 'Mam rezerwację.',
        targetEs: 'Tengo una reserva.',
      },
      {
        id: 'trav-hotel-2',
        promptEn: 'Is breakfast included?',
        promptPl: 'Czy śniadanie jest wliczone?',
        targetEs: '¿El desayuno está incluido?',
      },
    ],
    cityTransport: [
      {
        id: 'trav-city-1',
        promptEn: 'I need a metro ticket.',
        promptPl: 'Potrzebuję biletu na metro.',
        targetEs: 'Necesito un billete de metro.',
      },
      {
        id: 'trav-city-2',
        promptEn: 'Where does this bus go?',
        promptPl: 'Dokąd jedzie ten autobus?',
        targetEs: '¿A dónde va este autobús?',
      },
    ],
    sightseeing: [
      {
        id: 'trav-sight-1',
        promptEn: 'We are visiting the museum.',
        promptPl: 'Zwiedzamy muzeum.',
        targetEs: 'Estamos visitando el museo.',
      },
      {
        id: 'trav-sight-2',
        promptEn: 'The cathedral is very old.',
        promptPl: 'Katedra jest bardzo stara.',
        targetEs: 'La catedral es muy antigua.',
      },
    ],
  },
  shopping: {
    groceries: [
      {
        id: 'shop-groc-1',
        promptEn: 'I am looking for tomatoes.',
        promptPl: 'Szukam pomidorów.',
        targetEs: 'Busco tomates.',
      },
      {
        id: 'shop-groc-2',
        promptEn: 'How much do the eggs cost?',
        promptPl: 'Ile kosztują jajka?',
        targetEs: '¿Cuánto cuestan los huevos?',
      },
    ],
    clothing: [
      {
        id: 'shop-cloth-1',
        promptEn: 'I need a larger size.',
        promptPl: 'Potrzebuję większego rozmiaru.',
        targetEs: 'Necesito una talla más grande.',
      },
      {
        id: 'shop-cloth-2',
        promptEn: 'Where are the changing rooms?',
        promptPl: 'Gdzie są przymierzalnie?',
        targetEs: '¿Dónde están los probadores?',
      },
    ],
    electronics: [
      {
        id: 'shop-elec-1',
        promptEn: 'This phone is too expensive.',
        promptPl: 'Ten telefon jest za drogi.',
        targetEs: 'Este teléfono es demasiado caro.',
      },
      {
        id: 'shop-elec-2',
        promptEn: 'Do you have this cable?',
        promptPl: 'Czy macie ten kabel?',
        targetEs: '¿Tienen este cable?',
      },
    ],
    pharmacy: [
      {
        id: 'shop-pharm-1',
        promptEn: 'I need painkillers.',
        promptPl: 'Potrzebuję leków przeciwbólowych.',
        targetEs: 'Necesito analgésicos.',
      },
      {
        id: 'shop-pharm-2',
        promptEn: 'Do you have bandages?',
        promptPl: 'Czy macie bandaże?',
        targetEs: '¿Tienen vendas?',
      },
    ],
  },
  health: {
    symptoms: [
      {
        id: 'health-symp-1',
        promptEn: 'I have a headache.',
        promptPl: 'Boli mnie głowa.',
        targetEs: 'Me duele la cabeza.',
      },
      {
        id: 'health-symp-2',
        promptEn: 'I feel very tired.',
        promptPl: 'Czuję się bardzo zmęczony.',
        targetEs: 'Me siento muy cansado.',
      },
    ],
    doctor: [
      {
        id: 'health-doc-1',
        promptEn: 'I need to see a doctor.',
        promptPl: 'Muszę zobaczyć się z lekarzem.',
        targetEs: 'Necesito ver a un médico.',
      },
      {
        id: 'health-doc-2',
        promptEn: 'Do I need a prescription?',
        promptPl: 'Czy potrzebuję recepty?',
        targetEs: '¿Necesito una receta?',
      },
    ],
    pharmacy: [
      {
        id: 'health-pharm-1',
        promptEn: 'I am allergic to penicillin.',
        promptPl: 'Jestem uczulony na penicylinę.',
        targetEs: 'Soy alérgico a la penicilina.',
      },
      {
        id: 'health-pharm-2',
        promptEn: 'Where can I find vitamins?',
        promptPl: 'Gdzie znajdę witaminy?',
        targetEs: '¿Dónde puedo encontrar vitaminas?',
      },
    ],
    fitness: [
      {
        id: 'health-fit-1',
        promptEn: 'I go to the gym twice a week.',
        promptPl: 'Chodzę na siłownię dwa razy w tygodniu.',
        targetEs: 'Voy al gimnasio dos veces por semana.',
      },
      {
        id: 'health-fit-2',
        promptEn: 'We run every morning.',
        promptPl: 'Biegamy każdego ranka.',
        targetEs: 'Corremos todas las mañanas.',
      },
    ],
  },
};

// Simple suffix-based generator to pad each subcategory to 10 beginner sentences.
// It reuses seed items and appends easy time/place modifiers across ES/EN/PL.
const SUFFIXES = [
  { es: ' hoy', en: ' today', pl: ' dziś' },
  { es: ' por la mañana', en: ' in the morning', pl: ' rano' },
  { es: ' por la noche', en: ' at night', pl: ' w nocy' },
  { es: ' con mi amigo', en: ' with my friend', pl: ' z moim przyjacielem' },
  { es: ' en casa', en: ' at home', pl: ' w domu' },
  { es: ' en la ciudad', en: ' in the city', pl: ' w mieście' },
  { es: ' a veces', en: ' sometimes', pl: ' czasami' },
  { es: ' todos los días', en: ' every day', pl: ' codziennie' },
];

function stripEndingDot(text: string): string {
  return text.endsWith('.') ? text.slice(0, -1) : text;
}

function padToTen(seed: BuilderSentenceItem[]): BuilderSentenceItem[] {
  const result: BuilderSentenceItem[] = [...seed];
  let suffixIdx = 0;
  let idCounter = 1;
  while (result.length < 10 && seed.length > 0) {
    const base = seed[(result.length - seed.length) % seed.length] ?? seed[0];
    const suf = SUFFIXES[suffixIdx % SUFFIXES.length];
    suffixIdx += 1;
    result.push({
      id: `${base.id}-g${idCounter++}`,
      promptEn: `${stripEndingDot(base.promptEn)}${suf.en}.`,
      promptPl: `${stripEndingDot(base.promptPl)}${suf.pl}.`,
      targetEs: `${stripEndingDot(base.targetEs)}${suf.es}.`,
    });
  }
  return result.slice(0, 10);
}

export function getSentences(categoryKey: string, subKey: string): BuilderSentenceItem[] {
  const seed = builderSentences[categoryKey]?.[subKey] ?? [];
  if (seed.length >= 10) return seed.slice(0, 10);
  if (seed.length === 0) {
    // Provide a minimal neutral fallback to ensure the UI works
    return padToTen([
      {
        id: `${categoryKey}-${subKey}-seed`,
        promptEn: 'This is a simple sentence.',
        promptPl: 'To jest proste zdanie.',
        targetEs: 'Esta es una frase sencilla.',
      },
    ]);
  }
  return padToTen(seed);
}

export function getSentencesForCategory(categoryKey: string): BuilderSentenceItem[] {
  const map = builderSentences[categoryKey] ?? {};
  const all: BuilderSentenceItem[] = Object.values(map).flat();
  if (all.length >= 10) return all.slice(0, 10);
  if (all.length === 0) {
    return padToTen([
      {
        id: `${categoryKey}-seed`,
        promptEn: 'This is a simple sentence.',
        promptPl: 'To jest proste zdanie.',
        targetEs: 'Esta es una frase sencilla.',
      },
    ]);
  }
  return padToTen(all);
}
