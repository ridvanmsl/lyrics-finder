# Lyrics Finder

A modern, sleek web application that allows users to find lyrics for their favorite songs quickly and easily.

![Lyrics Finder App](https://cdn.pixabay.com/photo/2023/02/08/00/36/music-7775443_1280.png)

## Features

- Search for song lyrics by artist and song title
- Beautiful, responsive UI with animated gradient background
- Glass-morphism design with smooth animations
- Error handling for unfound lyrics or API issues
- Reset functionality to start a new search

## Technology Stack

- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Lucide React for icons
- Lyrics.ovh API for fetching lyrics data

## Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/lyrics-finder.git

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## How It Works

Enter an artist name and song title, then click "Find Lyrics". The application fetches lyrics from the Lyrics.ovh API and displays them in a beautiful, readable format. If lyrics can't be found, a helpful error message is displayed.

The entire application is contained in a single file (app/page.tsx) for simplicity and portability.

