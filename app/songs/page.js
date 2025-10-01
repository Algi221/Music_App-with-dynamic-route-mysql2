import Link from "next/link";
import Image from "next/image";
import { getAllSongs } from "@/lib/database";

export default async function SongsPage() {
  const songs = await getAllSongs();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            MUSIC
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-slate-400">
              LIBRARY
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            Explore our complete collection of premium tracks. High-quality
            audio with sophisticated design for the discerning listener.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {songs.map((song, index) => (
            <Link
              key={song.id}
              href={`/songs/${song.slug}`}
              className="group bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-700/40 hover:border-slate-600/50 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl"
            >
              <div className="flex items-center space-x-5">
                <div className="relative">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={song.image_url}
                      alt={song.title}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-slate-500 rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-lg truncate group-hover:text-blue-300 transition-colors mb-1">
                    {song.title}
                  </h3>
                  <p className="text-gray-400 text-sm truncate font-medium mb-2">
                    by {song.artist_name}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-xs font-mono bg-slate-800/50 px-2 py-1 rounded">
                      {Math.floor(song.duration / 60)}:
                      {(song.duration % 60).toString().padStart(2, "0")}
                    </span>
                    <span className="text-gray-600 text-xs">•</span>
                    <span className="text-gray-500 text-xs font-medium">
                      {song.release_year}
                    </span>
                    <span className="text-gray-600 text-xs">•</span>
                    <span className="text-gray-500 text-xs font-medium">
                      {song.genre}
                    </span>
                  </div>
                </div>
                <div className="text-gray-500 group-hover:text-blue-400 transition-colors text-2xl group-hover:scale-110 transform duration-300">
                  ▶
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-sm border border-slate-700 hover:border-slate-600 text-white px-8 py-4 rounded-xl transition-all duration-300 font-semibold"
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
