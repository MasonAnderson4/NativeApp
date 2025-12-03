# News Digest App

A React Native news application built with Expo and Expo Router that delivers top headlines and categorized news from around the world.

## Features

- **Top Headlines**: Browse the latest breaking news from the United States
- **Categories**: Filter news by topic (Business, Entertainment, Health, Science, Sports, Technology)
- **Article Details**: View article summaries with the ability to read the full article in an external browser
- **Bookmarks**: Save articles for later (session-based storage)
- **Clean UI**: Simple, intuitive interface with tab-based navigation

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router (file-based routing)
- **State Management**: React Context API
- **API**: NewsAPI
- **Language**: TypeScript

## Project Structure

```
app/
├── (tabs)/              # Tab navigator screens
│   ├── index.tsx        # Headlines screen
│   ├── categories.tsx   # Categories screen
│   ├── bookmarks.tsx    # Bookmarks screen
│   ├── settings.tsx     # Settings screen
│   └── _layout.tsx      # Tab layout configuration
├── article.tsx          # Article detail screen
├── _layout.tsx          # Root layout with Stack navigator
context/
├── BookmarksContext.tsx # Bookmark state management
config.ts                # API configuration (not committed)
```

## Getting Started

### Prerequisites

- Node.js installed
- iOS Simulator (Mac only) or Android Emulator
- Expo CLI

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `config.ts` file in the root directory:
   ```typescript
   export const API_KEY = 'your_newsapi_key_here';
   export const NEWS_API_BASE_URL = 'https://newsapi.org/v2';
   ```
   Get your free API key from [NewsAPI](https://newsapi.org/)

3. Start the app:
   ```bash
   npx expo start
   ```

4. Run on your preferred platform:
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan the QR code with Expo Go app on your phone

## How It Works

### Navigation
- **Tab Navigation**: Bottom tabs for main screens (Headlines, Categories, Bookmarks, Settings)
- **Stack Navigation**: Pushes Article detail screen on top of tabs
- **Back Navigation**: Article screen has a back button to return to the previous tab

### Bookmarks
- Bookmarks are stored in React Context state
- Bookmarks persist during the app session but reset when the app is closed
- Add/remove bookmarks from the Article detail screen

### API Integration
- Fetches news from NewsAPI
- Headlines: Top stories from the US
- Categories: Filter by topic (business, entertainment, health, science, sports, technology)

## API Rate Limits

NewsAPI free tier allows 100 requests per day. The app makes:
- 1 request on Headlines screen load
- 1 request per category selection

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [NewsAPI Documentation](https://newsapi.org/docs)
