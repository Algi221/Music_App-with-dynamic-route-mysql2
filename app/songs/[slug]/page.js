import Link from 'next/link';
import Image from 'next/image';
import { getSongBySlug, getSongsByArtist } from '@/lib/database';
import { notFound } from 'next/navigation';
import AudioPlayer from '@/components/AudioPlayer';

export async function generateMetadata({ params }) {
  const song = await getSongBySlug(params.slug);
  
  if (!song) {
    return {
      title: 'Song Not Found',
    };
  }

  return {
    title: `${song.title} by ${song.artist_name} - Music App`,
    description: `Listen to ${song.title} by ${song.artist_name}`,
  };
}

export default async function SongPage({ params }) {
  const song = await getSongBySlug(params.slug);
  const artistSongs = await getSongsByArtist(song?.artist_slug);

  if (!song) {
    notFound();
  }

  // Filter out current song from artist songs
  const otherSongs = artistSongs.filter(s => s.id !== song.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <div className="container mx-auto px-6 py-12">
        {/* Navigation */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-sm border border-slate-700 hover:border-slate-600 text-white px-6 py-3 rounded-xl transition-all duration-300 font-semibold"
            >
              <span>←</span>
              <span>Home</span>
            </Link>
            <Link
              href={`/artists/${song.artist_slug}`}
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 text-white px-6 py-3 rounded-xl transition-all duration-300 font-semibold shadow-lg"
            >
              <span>🎤</span>
              <span>View Artist</span>
            </Link>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Audio Player */}
          <AudioPlayer song={song} className="mb-12" />

          {/* Song Details */}
          <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 mb-12 shadow-2xl">
            <h2 className="text-3xl font-black text-white mb-6 tracking-tight">TRACK INFORMATION</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-300 mb-4">Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                    <span className="text-gray-400 font-medium">Title:</span>
                    <span className="text-white font-bold">{song.title}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                    <span className="text-gray-400 font-medium">Artist:</span>
                    <span className="text-white font-bold">{song.artist_name}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                    <span className="text-gray-400 font-medium">Genre:</span>
                    <span className="text-white font-bold">{song.genre}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-700/50">
                    <span className="text-gray-400 font-medium">Year:</span>
                    <span className="text-white font-bold">{song.release_year}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-400 font-medium">Duration:</span>
                    <span className="text-white font-bold font-mono">
                      {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-300 mb-4">Audio Source</h3>
                <div className="bg-slate-800/50 rounded-xl p-4">
                  <p className="text-gray-400 text-sm font-mono break-all">{song.audio_url}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lyrics */}
          {song.lyrics && (
            <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 mb-12 shadow-2xl">
              <h2 className="text-3xl font-black text-white mb-6 tracking-tight">LYRICS</h2>
              <div className="text-gray-300 whitespace-pre-line leading-relaxed text-lg font-light">
                {song.lyrics}
              </div>
            </div>
          )}

          {/* Other Songs by Same Artist */}
          {otherSongs.length > 0 && (
            <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
              <h2 className="text-3xl font-black text-white mb-6 tracking-tight">
                MORE FROM <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-slate-400">{song.artist_name.toUpperCase()}</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherSongs.slice(0, 4).map((otherSong, index) => (
                  <Link
                    key={otherSong.id}
                    href={`/songs/${otherSong.slug}`}
                    className="group bg-slate-800/30 hover:bg-slate-700/40 backdrop-blur-xl border border-slate-700/50 hover:border-slate-600/50 rounded-2xl p-6 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg">
                          <Image
                            src={otherSong.image_url}
                            alt={otherSong.title}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-blue-500 to-slate-500 rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold text-lg truncate group-hover:text-blue-300 transition-colors">
                          {otherSong.title}
                        </h3>
                        <p className="text-gray-400 text-sm font-mono">
                          {Math.floor(otherSong.duration / 60)}:{(otherSong.duration % 60).toString().padStart(2, '0')}
                        </p>
                      </div>
                      <div className="text-gray-500 group-hover:text-blue-400 transition-colors text-xl group-hover:scale-110 transform duration-300">
                        ▶
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
