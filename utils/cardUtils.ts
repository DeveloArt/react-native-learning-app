import { StudyCard, WordEntry } from '@/api/database/flashcards';

// Utility functions for card operations
export class CardUtils {
  /**
   * Pick random entries from an array
   */
  static pickRandomEntries<T>(items: T[], desiredCount: number): T[] {
    if (items.length <= desiredCount) return [...items];
    const selectedIndices = new Set<number>();
    while (selectedIndices.size < desiredCount) {
      selectedIndices.add(Math.floor(Math.random() * items.length));
    }
    const result: T[] = [];
    selectedIndices.forEach((index) => result.push(items[index]));
    return result;
  }

  /**
   * Shuffle array using Fisher-Yates algorithm
   */
  static shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * Filter cards by category
   */
  static filterByCategory(cards: WordEntry[], category: string | null): WordEntry[] {
    if (!category) return cards;
    return cards.filter((card) => card.category === category);
  }

  /**
   * Create a study deck from word entries
   */
  static createStudyDeck(wordEntries: WordEntry[], count: number = 10): StudyCard[] {
    const selected = this.pickRandomEntries(wordEntries, count);
    const mapped = selected.map((entry) => ({
      id: entry.id,
      frontLanguageLabel: 'Spanish',
      frontText: entry.word,
      backLanguageLabel: 'English',
      backTextEn: entry.translationEn,
      backTextPl: entry.translationPl,
      examples: entry.examples,
    }));
    return this.shuffleArray(mapped);
  }

  /**
   * Calculate progress percentage
   */
  static calculateProgress(known: number, total: number): number {
    if (total === 0) return 0;
    return Math.min(1, Math.max(0, known / total));
  }

  /**
   * Check if deck is completed
   */
  static isDeckCompleted(knownIds: Set<string>, deck: StudyCard[]): boolean {
    if (deck.length === 0) return false;
    return deck.every((card) => knownIds.has(card.id));
  }

  /**
   * Get next card index
   */
  static getNextIndex(currentIndex: number, deckLength: number, incorrectQueue: number[]): number {
    if (currentIndex < deckLength - 1) {
      return currentIndex + 1;
    }
    if (incorrectQueue.length > 0) {
      return incorrectQueue[0];
    }
    return currentIndex; // Stay at current index if no next card
  }

  /**
   * Add card to incorrect queue if not already present
   */
  static addToIncorrectQueue(index: number, queue: number[]): number[] {
    if (queue.includes(index)) return queue;
    return [...queue, index];
  }

  /**
   * Remove first card from incorrect queue
   */
  static removeFromIncorrectQueue(queue: number[]): number[] {
    if (queue.length === 0) return queue;
    const [, ...rest] = queue;
    return rest;
  }

  /**
   * Localize card text based on language
   */
  static localizeCard(card: StudyCard, language: string, t: (key: string) => string) {
    const isPl = language.startsWith('pl');
    const backLanguageLabel = isPl ? t('config.languagePolish') : t('config.languageEnglish');
    const backText = isPl ? card.backTextPl : card.backTextEn;
    const examples = (card.examples || []).map((e) => ({
      sentence: e.sentence,
      translation: isPl ? e.translationPl : e.translationEn,
    }));

    return {
      ...card,
      backLanguageLabel,
      backText,
      examples,
    };
  }

  /**
   * Validate card data
   */
  static validateCard(card: StudyCard): boolean {
    return !!(
      card.id &&
      card.frontText &&
      card.backTextEn &&
      card.backTextPl &&
      Array.isArray(card.examples)
    );
  }

  /**
   * Get card difficulty based on examples length
   */
  static getCardDifficulty(card: StudyCard): 'easy' | 'medium' | 'hard' {
    const exampleCount = card.examples?.length || 0;
    if (exampleCount === 0) return 'easy';
    if (exampleCount <= 2) return 'medium';
    return 'hard';
  }

  /**
   * Group cards by difficulty
   */
  static groupByDifficulty(cards: StudyCard[]): {
    easy: StudyCard[];
    medium: StudyCard[];
    hard: StudyCard[];
  } {
    return cards.reduce(
      (groups: { easy: StudyCard[]; medium: StudyCard[]; hard: StudyCard[] }, card) => {
        const difficulty = this.getCardDifficulty(card);
        groups[difficulty].push(card);
        return groups;
      },
      { easy: [], medium: [], hard: [] },
    );
  }
}
