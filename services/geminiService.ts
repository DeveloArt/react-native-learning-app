// Mock Gemini AI service for React Native
// In production, this would integrate with the actual Google Gemini API

export async function explainWord(word: string): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock responses for common words
  const mockResponses: Record<string, string> = {
    "La Manzana": "La manzana is a feminine noun, so it uses 'la' instead of 'el'. It's one of the first fruits many Spanish learners encounter.",
    "El Libro": "El libro is a masculine noun. Books are fundamental in Spanish culture, from literature to academic texts.",
    "Comer": "Comer is an irregular verb meaning 'to eat'. It's essential for daily conversations about food and meals.",
    "Gracias": "Gracias is the standard way to say 'thank you' in Spanish. It's used in both formal and informal situations.",
  };
  
  return mockResponses[word] || `The Spanish word "${word}" is commonly used in everyday conversations. Practice using it in different contexts to improve your vocabulary and understanding of Spanish grammar patterns.`;
}

export async function getDailyTip(): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const tips = [
    "Consistency is key to mastering Spanish!",
    "Practice speaking Spanish every day, even if just for 5 minutes.",
    "Listen to Spanish music to improve your pronunciation.",
    "Watch Spanish movies with subtitles to learn new vocabulary.",
    "Try thinking in Spanish throughout your day.",
    "Use flashcards to memorize new words effectively.",
    "Join a Spanish language exchange group for practice.",
    "Don't be afraid to make mistakes - they're part of learning!",
    "Set small, achievable daily goals for your Spanish practice.",
    "Immerse yourself in the language as much as possible.",
  ];
  
  return tips[Math.floor(Math.random() * tips.length)];
}
