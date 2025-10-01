'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

export default function AudioPlayer({ song, className = '' }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = parseFloat(e.target.value);
    audio.volume = newVolume;
    setVolume(newVolume);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl ${className}`}>
      <audio ref={audioRef} src={song.audio_url} preload="metadata" />
      
      {/* Song Info */}
      <div className="text-center mb-8">
        <div className="w-32 h-32 mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={song.image_url}
            alt={song.title}
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-3xl font-black text-white mb-3 tracking-tight">{song.title}</h2>
        <p className="text-gray-400 text-lg font-semibold">by {song.artist_name}</p>
        <div className="flex justify-center gap-4 mt-4">
          <span className="bg-gradient-to-r from-blue-600 to-slate-600 text-white px-4 py-2 rounded-xl text-sm font-bold">
            {song.genre}
          </span>
          <span className="bg-slate-800/50 border border-slate-700 text-gray-300 px-4 py-2 rounded-xl text-sm font-semibold">
            {song.release_year}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div 
          className="w-full h-3 bg-slate-700/50 rounded-full cursor-pointer shadow-inner"
          onClick={handleSeek}
        >
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-slate-500 rounded-full transition-all duration-100 shadow-lg"
            style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-400 mt-3 font-mono">
          <span className="bg-slate-800/50 px-3 py-1 rounded-lg">{formatTime(currentTime)}</span>
          <span className="bg-slate-800/50 px-3 py-1 rounded-lg">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center mb-8">
        <button
          onClick={togglePlayPause}
          className="group w-20 h-20 bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 rounded-2xl flex items-center justify-center text-white text-3xl shadow-2xl hover:scale-110 transition-all duration-300"
        >
          <span className="group-hover:scale-110 transition-transform">
            {isPlaying ? '⏸️' : '▶️'}
          </span>
        </button>
      </div>

      {/* Volume Control */}
      <div className="bg-slate-800/30 rounded-2xl p-6">
        <div className="flex items-center space-x-4">
          <span className="text-gray-400 text-lg">🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="flex-1 h-3 bg-slate-700/50 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${volume * 100}%, #475569 ${volume * 100}%, #475569 100%)`
            }}
          />
          <span className="text-gray-400 text-sm font-mono bg-slate-800/50 px-3 py-1 rounded-lg min-w-[3rem] text-center">
            {Math.round(volume * 100)}%
          </span>
        </div>
      </div>

      {/* Status */}
      <div className="mt-6 pt-6 border-t border-slate-700/50">
        <div className="flex items-center justify-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
          <span className="text-gray-400 text-sm font-semibold">
            {isPlaying ? 'NOW PLAYING' : 'READY TO PLAY'}
          </span>
        </div>
      </div>
    </div>
  );
}
