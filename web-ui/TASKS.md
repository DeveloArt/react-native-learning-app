# Web UI Tasks List

## 1. Content Categories Selection (`content_categories_selection/`)

### Components to Create:
- **CategoryCard Component**
  - Props: `title`, `icon`, `progress`, `color`, `onPress`
  - Progress bar with percentage display
  - Icon integration with Material Symbols
  - Dark mode support

- **TopAppBar Component**
  - Back button functionality
  - Title display
  - Sticky positioning

- **BottomNavBar Component**
  - Navigation items with active state
  - Icon and text display
  - Active tab highlighting

### Logic to Implement:
- Category selection state management
- Progress calculation and display
- Navigation handlers
- Category data fetching

### Type Improvements:
- Category interface with progress tracking
- Navigation item types
- Color scheme types for categories

---

## 2. Flashcards Study Session (`flashcards_study_session/`)

### Components to Create:
- **Flashcard Component**
  - Front/back flip animation
  - Card content display (word, translation, example)
  - Audio playback integration
  - Visual feedback for card states

- **ProgressBar Component**
  - Session progress tracking
  - Current card indicator (e.g., "4/10")
  - Animated progress bar

- **ActionButtons Component**
  - Known/Unknown buttons
  - Success/danger color schemes
  - Button press animations

### Logic to Implement:
- Card deck management
- Flip animation logic
- Progress tracking
- Audio playback functionality
- Session state management

### Type Improvements:
- Flashcard interface (front/back content)
- Session progress types
- Action button states

---

## 3. Learning Statistics Progress (`learning_statistics_progress/`)

### Components to Create:
- **StatsCard Component**
  - Metric display with icon
  - Progress bars
  - Value formatting

- **ActivityChart Component**
  - Weekly activity visualization
  - Bar chart implementation
  - Responsive sizing

- **RecentWords Component**
  - Word cards with verification status
  - Category badges
  - Translation display

### Logic to Implement:
- Statistics data aggregation
- Chart data processing
- Progress calculations
- Recent words filtering

### Type Improvements:
- Statistics data interfaces
- Chart data types
- Progress metrics types

---

## 4. Profile and App Settings (`profile_and_app_settings/`)

### Components to Create:
- **ProfileHeader Component**
  - User avatar display
  - Name and level display
  - Profile statistics

- **SettingsSection Component**
  - Section headers
  - Grouped settings items
  - Consistent styling

- **LanguageSelector Component**
  - Dropdown with flags
  - Language selection logic
  - Current language display

- **TTSSpeedSlider Component**
  - Custom range slider
  - Speed value display
  - Real-time updates

### Logic to Implement:
- User profile management
- Settings persistence
- Language switching
- TTS speed adjustment
- Logout functionality

### Type Improvements:
- User profile interface
- Settings configuration types
- Language options enum

---

## 5. Pronunciation Practice (`pronunciation_practice/`)

### Components to Create:
- **WordDisplay Component**
  - Large word display
  - Translation text
  - Audio button integration

- **RecordingButton Component**
  - Pulsating animation effects
  - Microphone button
  - Recording state management

- **WaveformDisplay Component**
  - Animated waveform bars
  - Recording visualization
  - Dynamic height calculation

- **ResultsCard Component**
  - Accuracy percentage display
  - Success/failure states
  - Result progress bar

### Logic to Implement:
- Speech recognition integration
- Recording state management
- Accuracy calculation
- Waveform animation
- Results processing

### Type Improvements:
- Recording state types
- Pronunciation results interface
- Accuracy metrics types

---

## 6. Sentence Builder Practice (`sentence_builder_practice/`)

### Components to Create:
- **SentenceCard Component**
  - Source sentence display
  - Translation preview
  - Audio integration

- **WordChip Component**
  - Individual word buttons
  - Selection state management
  - Drag and drop support

- **AssemblyArea Component**
  - Sentence construction area
  - Drag and drop zone
  - Empty state handling

- **LessonProgress Component**
  - Lesson indicator
  - Progress bar
  - Hint button

### Logic to Implement:
- Word selection logic
- Sentence validation
- Drag and drop functionality
- Lesson progression
- Hint system

### Type Improvements:
- Word chip interface
- Sentence validation types
- Lesson progress types

---

## 7. Home Dashboard (`¡hola!_home_dashboard/`)

### Components to Create:
- **StreakCard Component**
  - Streak counter display
  - Motivational messages
  - Call-to-action button
  - Illustration integration

- **QuickPracticeGrid Component**
  - Practice mode cards
  - Icon integration
  - Navigation handlers

- **ProgressCard Component**
  - Progress bars with glow effects
  - Goal tracking
  - Percentage display
  - Motivational messages

- **TabBar Component**
  - Bottom navigation
  - Active state management
  - Icon and text display

### Logic to Implement:
- Dashboard data aggregation
- Streak calculation
- Progress tracking
- Navigation handling
- User greeting personalization

### Type Improvements:
- Dashboard data interface
- Streak information types
- Progress metrics types

---

## Common Tasks Across All Screens:

### Shared Components:
- **LoadingSpinner Component**
- **ErrorBoundary Component**
- **ThemeProvider Component**
- **LocalizationProvider Component**

### Type System Improvements:
- Global theme types
- Navigation types
- API response types
- Error handling types

### State Management:
- Redux store setup for global state
- Local state management patterns
- Data fetching hooks
- Caching strategies

### Accessibility:
- Screen reader support
- Keyboard navigation
- Color contrast compliance
- Focus management

### Performance:
- Component memoization
- Image optimization
- Bundle splitting
- Lazy loading strategies

### Testing:
- Unit tests for components
- Integration tests for workflows
- Accessibility testing
- Performance testing
