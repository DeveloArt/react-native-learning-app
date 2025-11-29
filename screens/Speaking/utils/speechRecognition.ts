export const RECORDING_TIMEOUT_MS = 5000;
export const PROCESSING_DELAY_MS = 500;
export const SPEECH_LOCALE = 'es-ES';

export const normalizeWord = (word: string): string => {
  return word
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '');
};

export const areWordsSimilar = (recognized: string, expected: string): boolean => {
  const normalizedRecognized = normalizeWord(recognized);
  const normalizedExpected = normalizeWord(expected);

  if (normalizedRecognized === normalizedExpected) return true;

  const recognizedWords = normalizedRecognized.split(/\s+/);

  if (recognizedWords.some((word) => word === normalizedExpected)) return true;

  return false;
};
