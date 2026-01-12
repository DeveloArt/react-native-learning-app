# ¡Hola! - React Native Learning App - UI Description

## Overview

¡Hola! is a comprehensive Spanish language learning mobile application built with React Native and Expo. The app focuses on daily, bite-sized learning sessions through multiple interactive modes designed to help users master Spanish vocabulary and sentence construction.

## Target Audience

- Language learners who want to integrate Spanish into their daily routine
- Users preferring short, focused learning sessions (5-10 minutes daily)
- People looking for offline-first language learning
- Polish and English speakers learning Spanish

## Core Architecture

- **Framework**: React Native with Expo
- **Navigation**: Expo Router with tab-based navigation
- **Styling**: TailwindCSS with NativeWind
- **State Management**: React Query, Zustand, useReducer
- **Storage**: AsyncStorage for offline functionality
- **Internationalization**: i18next (Polish/English)
- **Voice Recognition**: React Native Voice
- **Text-to-Speech**: Expo Speech

## App Structure & Navigation

### Main Navigation (5 Tabs)

1. **Home** - Dashboard with quick access to learning modes
2. **Flashcards** - Vocabulary learning with spaced repetition
3. **Builder** - Sentence construction practice
4. **Speaking** - Voice recognition and pronunciation practice
5. **Stats** - Learning progress and statistics

### Additional Screens

- **Categories** - Topic-based content selection
- **Settings** - Language preferences, dark mode, TTS speed

## Detailed Screen Functionality

### 1. Home Screen

**Purpose**: Main dashboard and entry point
**Components**:

- Welcome heading with personalized greeting ("¡Hola!")
- Quick access buttons to all learning modes
- Progress overview cards
- Daily streak indicator

**Key Features**:

- Clean, motivating interface
- One-tap access to all learning modes
- Visual progress indicators
- Daily learning encouragement

### 2. Flashcards Screen

**Purpose**: Vocabulary acquisition through flashcard methodology
**Core Flow**:

1. Category selection (Travel, Food, Daily Life, etc.)
2. Random 10-card deck generation
3. Front side shows Spanish word
4. Tap to reveal translation (EN/PL based on user language)
5. Example sentences with translations
6. User marks as "Known" or "Unknown"
7. Progress tracking and automatic deck reshuffling

**Key Features**:

- Category-based learning
- Bilingual support (Spanish ↔ English/Polish)
- Example sentences in context
- Progress bar with completion tracking
- Swipe animations between cards
- Offline functionality

### 3. Sentence Builder Screen

**Purpose**: Grammar and sentence structure practice
**Core Flow**:

1. Category selection (Cuisine, Travel, Work, etc.)
2. Display prompt in user's language
3. Show shuffled Spanish word pool
4. User drags/taps words to build sentence
5. Real-time validation
6. Auto-advance on correct completion
7. Error feedback for incorrect attempts

**Key Features**:

- Drag-and-drop word placement
- Real-time sentence validation
- Category-specific content
- Visual feedback for correct/incorrect answers
- Progressive difficulty

### 4. Speaking Screen

**Purpose**: Pronunciation practice and voice recognition
**Core Flow**:

1. Display target Spanish word with translation
2. User presses and holds microphone button
3. Voice recognition captures pronunciation
4. Speech-to-text processing
5. Accuracy assessment
6. Visual feedback (correct/try again)
7. Next word progression

**Key Features**:

- Voice recognition with Spanish language support
- Real-time pronunciation feedback
- Visual recording indicators
- Accuracy scoring
- Microphone permission handling

### 5. Statistics Screen

**Purpose**: Learning progress tracking and motivation
**Components**:

- Summary cards (total words learned, study days, current streak)
- 7-day progress chart
- Streak motivation card
- Weekly activity visualization

**Key Features**:

- Daily streak tracking
- Weekly progress charts
- Learning statistics
- Motivational messaging
- Visual progress indicators

### 6. Categories Screen

**Purpose**: Content organization and topic selection
**Categories Include**:

- **Cuisine**: Food, Drinks, Dishes, Restaurant
- **Nature**: Animals, Plants, Weather, Landscapes
- **Travel**: Airport, Hotel, Transport, Sightseeing
- **Shopping**: Groceries, Clothing, Electronics
- **Health**: Pharmacy, Symptoms, Doctor, Fitness
- **Home**: Furniture, Chores, Daily Routine, Tools
- **Education**: School, University, Materials, Schedule
- **Work**: Recruitment, Office, Professions, Projects
- **Leisure**: Sports, Music, Film, Books, Hobbies
- **Communication**: Greetings, Requests, Opinions, Complaints

**Key Features**:

- Color-coded category cards
- Icon-based visual identification
- Subcategory organization
- Progress tracking per category

## Design System

### Color Scheme

- **Primary**: Blue variants for actions and highlights
- **Surface**: Light/dark backgrounds for different sections
- **Text**: High contrast for readability
- **Accent**: Category-specific colors for visual organization

### Typography

- **Font**: Montserrat family (Light, Regular, Medium, SemiBold, Bold)
- **Sizes**: Small, Medium, Large hierarchy
- **Weights**: Regular, Medium, Bold for emphasis

### Components

- **Buttons**: Primary, Secondary, Icon variants
- **Cards**: Themed surface cards with shadows
- **Progress Bars**: Visual completion indicators
- **Headers**: Consistent navigation with back functionality
- **Modals**: Category selection and overlays

## User Experience Principles

### Learning Flow

1. **Quick Entry**: Immediate access to learning modes
2. **Focused Sessions**: Single task per screen
3. **Immediate Feedback**: Real-time validation and responses
4. **Progress Tracking**: Visual progress indicators
5. **Motivation**: Streaks and achievements

### Accessibility

- High contrast text
- Clear visual hierarchy
- Touch-friendly targets
- Screen reader support
- Voice navigation options

### Offline-First Design

- All content available offline
- Local storage for progress
- No network dependency for core functionality
- Sync capabilities for future updates

## Data Structure

### Flashcard Data

```typescript
{
  id: string;
  word: string; // Spanish
  translationEn: string;
  translationPl: string;
  examples: ExampleSentence[];
  category: string;
}
```

### Sentence Builder Data

```typescript
{
  promptEn: string;
  promptPl: string;
  targetEs: string; // Spanish sentence to build
  category: string;
  subcategory: string;
}
```

### User Progress

```typescript
{
  dailyStats: StudyStats;
  streak: number;
  categoryProgress: CategoryProgress;
  learnedWords: string[];
}
```

## Technical Considerations

### Performance

- Lazy loading for content
- Optimized animations
- Efficient state management
- Memory-conscious data handling

### Responsive Design

- Adaptive layouts for different screen sizes
- Touch-friendly interface
- Platform-specific adjustments (iOS/Android)

### Internationalization

- Dynamic language switching
- Localized content
- RTL language support preparation
- Cultural adaptation considerations

## Future Enhancements

- Spaced repetition algorithm
- Daily notifications
- Achievement system
- Social features
- Advanced analytics
- Audio recording for pronunciation comparison
- Grammar explanations
- Cultural context modules

## Success Metrics

- Daily active users
- Session completion rates
- Streak maintenance
- Category progression
- User retention
- Learning outcome improvement

This comprehensive UI description provides the foundation for redesigning the application with a modern, user-friendly interface that maintains the core learning functionality while improving visual appeal and user experience.
