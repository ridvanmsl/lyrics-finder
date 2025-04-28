"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Search, Music, Loader2, Mic, RotateCcw } from "lucide-react"

export default function LyricsFinderApp() {
  const [artist, setArtist] = useState("")
  const [song, setSong] = useState("")
  const [lyrics, setLyrics] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [animateBackground, setAnimateBackground] = useState(false)

  useEffect(() => {
    if (lyrics || error) {
      setAnimateBackground(true)
    }
  }, [lyrics, error])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!artist || !song) {
      setError("Please enter both artist and song title")
      return
    }

    setIsLoading(true)
    setLyrics("")
    setError("")
    setAnimateBackground(false)

    try {
      const response = await fetch(
        `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`,
      )

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Lyrics not found for this song. Please check the artist name and song title.")
        }
        throw new Error("Failed to fetch lyrics. Please try again later.")
      }

      const data = await response.json()
      setLyrics(data.lyrics)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  function handleReset() {
    setArtist("")
    setSong("")
    setLyrics("")
    setError("")
    setAnimateBackground(false)
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 transition-all duration-1000 p-4 md:p-8 ${animateBackground ? 'animate-gradient' : ''}`}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
        }
        
        .animate-gradient {
          background-size: 300% 300%;
          animation: gradientShift 15s ease infinite;
        }
        
        .input-focus-effect:focus {
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2), 0 0 20px rgba(123, 97, 255, 0.4);
        }
        
        .card-backdrop {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        
        .appear-animation {
          animation: appearFromBottom 0.6s ease-out forwards;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .pulse-animation {
          animation: pulse 2s infinite;
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes appearFromBottom {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }
      `}</style>

      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center appear-animation">
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <Music className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-indigo-300 mb-3">
            Lyrics Finder
          </h1>
          <p className="text-indigo-200 text-lg">Discover lyrics for your favorite songs</p>
        </header>

        <div className="glass-card rounded-2xl p-6 md:p-8 mb-8 card-backdrop appear-animation" style={{animationDelay: '0.2s'}}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="artist" className="block text-base font-medium text-indigo-200 mb-1">
                  Artist Name
                </label>
                <div className="relative">
                  <Mic className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-300" />
                  <input
                    id="artist"
                    type="text"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    placeholder="Enter artist name"
                    className="w-full pl-12 pr-4 py-3 bg-indigo-900/30 text-white border border-indigo-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 input-focus-effect"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="song" className="block text-base font-medium text-indigo-200 mb-1">
                  Song Title
                </label>
                <div className="relative">
                  <Music className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-indigo-300" />
                  <input
                    id="song"
                    type="text"
                    value={song}
                    onChange={(e) => setSong(e.target.value)}
                    placeholder="Enter song title"
                    className="w-full pl-12 pr-4 py-3 bg-indigo-900/30 text-white border border-indigo-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 input-focus-effect"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 relative overflow-hidden flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 group"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    <span>Find Lyrics</span>
                  </>
                )}
              </button>
              
              {(lyrics || error) && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="md:w-auto flex items-center justify-center gap-2 bg-indigo-900/50 hover:bg-indigo-800/50 text-indigo-200 font-medium py-3 px-6 rounded-xl transition-all duration-300 border border-indigo-700/50"
                >
                  <RotateCcw className="h-5 w-5" />
                  <span className="hidden md:inline">Reset</span>
                </button>
              )}
            </div>
          </form>
        </div>

        {error && (
          <div className="glass-card border-l-4 border-l-red-500 text-red-100 px-6 py-5 rounded-xl mb-8 appear-animation" style={{animationDelay: '0.4s'}}>
            <p>{error}</p>
          </div>
        )}

        {lyrics && (
          <div className="glass-card rounded-2xl p-6 md:p-8 appear-animation" style={{animationDelay: '0.4s'}}>
            <h2 className="text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-indigo-300 mb-5 pb-3 border-b border-indigo-500/30 flex items-center gap-2">
              <Mic className="h-6 w-6 text-indigo-400" />
              <span>{song} by {artist}</span>
            </h2>
            <div className="whitespace-pre-line text-indigo-100 leading-relaxed text-base md:text-lg">
              {lyrics}
            </div>
          </div>
        )}

        <footer className="mt-12 text-center text-indigo-300/60 text-sm appear-animation" style={{animationDelay: '0.6s'}}>
          <p>Powered by Lyrics.ovh API</p>
        </footer>
      </div>
    </div>
  )
}
