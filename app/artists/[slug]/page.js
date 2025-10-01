import Link from 'next/link';
import Image from 'next/image';
import { getArtistBySlug, getSongsByArtist } from '@/lib/database';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);
  
  if (!artist) {
    return {
      title: 'Artist Not Found',
    };
  }

  return {
    title: `${artist.name} - Music App`,
    description: artist.bio,
  };
}

export default async function ArtistPage({ params }) {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);
  const songs = await getSongsByArtist(slug);

  if (!artist) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <div className="container mx-auto px-6 py-12">
        {/* Artist Header */}
        <div className="text-center mb-16">
          <div className="relative mb-8">
            <div className="w-64 h-64 mx-auto rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={artist.image_url}
                alt={artist.name}
                width={256}
                height={256}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-blue-500 to-slate-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                VERIFIED ARTIST
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            {artist.name.toUpperCase()}
          </h1>
          
          <div className="flex justify-center gap-6 mb-8">
            <span className="bg-gradient-to-r from-blue-600 to-slate-600 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg">
              {artist.genre}
            </span>
            <span className="bg-slate-800/50 border border-slate-700 text-gray-300 px-6 py-3 rounded-xl text-sm font-semibold">
              {artist.country}
            </span>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-400 leading-relaxed font-light">
              {artist.bio}
            </p>
          </div>
        </div>

        {/* Songs Section */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              DISCOGRAPHY
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-slate-400">
                ({songs.length} TRACKS)
              </span>
            </h2>
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
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-gray-500 font-mono bg-slate-800/50 px-2 py-1 rounded">
                        {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
                      </span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-500 font-medium">{song.release_year}</span>
                    </div>
                  </div>
                  <div className="text-gray-500 group-hover:text-blue-400 transition-colors text-2xl group-hover:scale-110 transform duration-300">
                    ▶
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-6">
          <Link
            href="/artists"
            className="group inline-flex items-center gap-3 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-sm border border-slate-700 hover:border-slate-600 text-white px-8 py-4 rounded-xl transition-all duration-300 font-semibold"
          >
            <span>←</span>
            <span>All Artists</span>
          </Link>
          <Link
            href="/"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 text-white px-8 py-4 rounded-xl transition-all duration-300 font-semibold shadow-lg"
          >
            <span>🏠</span>
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
