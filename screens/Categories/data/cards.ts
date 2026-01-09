import type { CategoryCard } from '../types/types';

export const categoryCards: CategoryCard[] = [
  {
    key: 'cuisine',
    color: '#f97316',
    icon: '🍽️',
    iconColor: '#ffffff',
    progress: 45,
    subcategories: [
      { key: 'food', color: '#fb923c' },
      { key: 'drinks', color: '#fdba74' },
      { key: 'dishes', color: '#fed7aa' },
      { key: 'restaurant', color: '#ffedd5' },
    ],
  },
  {
    key: 'travel',
    color: '#3b82f6',
    icon: '✈️',
    iconColor: '#ffffff',
    progress: 12,
    subcategories: [
      { key: 'airport', color: '#a78bfa' },
      { key: 'hotel', color: '#c4b5fd' },
      { key: 'cityTransport', color: '#ddd6fe' },
      { key: 'sightseeing', color: '#ede9fe' },
    ],
  },
  {
    key: 'work',
    color: '#8b5cf6',
    icon: '💼',
    iconColor: '#ffffff',
    progress: 80,
    subcategories: [
      { key: 'recruitmentCV', color: '#60a5fa' },
      { key: 'officeMeetings', color: '#93c5fd' },
      { key: 'professions', color: '#bfdbfe' },
      { key: 'projectsDeadlines', color: '#dbeafe' },
    ],
  },
  {
    key: 'nature',
    color: '#22c55e',
    icon: '🌿',
    iconColor: '#ffffff',
    progress: 5,
    subcategories: [
      { key: 'animals', color: '#4ade80' },
      { key: 'plants', color: '#86efac' },
      { key: 'weather', color: '#bbf7d0' },
      { key: 'landscapes', color: '#dcfce7' },
    ],
  },
  {
    key: 'education',
    color: '#f43f5e',
    icon: '🎓',
    iconColor: '#ffffff',
    progress: 0,
    subcategories: [
      { key: 'schoolSubjects', color: '#22d3ee' },
      { key: 'universityExams', color: '#67e8f9' },
      { key: 'materialsSupplies', color: '#a5f3fc' },
      { key: 'classesSchedule', color: '#cffafe' },
    ],
  },
  {
    key: 'shopping',
    color: '#f59e0b',
    icon: '🛍️',
    iconColor: '#ffffff',
    progress: 35,
    subcategories: [
      { key: 'groceries', color: '#38bdf8' },
      { key: 'clothing', color: '#7dd3fc' },
      { key: 'electronics', color: '#bae6fd' },
      { key: 'pharmacy', color: '#e0f2fe' },
    ],
  },
];
