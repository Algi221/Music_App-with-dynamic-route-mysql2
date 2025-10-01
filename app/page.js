import Link from 'next/link';
import Image from 'next/image';
import { getRandomSongs, getAllArtists } from '@/lib/database';

export default async function Home() {
  const featuredSongs = await getRandomSongs(6);
  const artists = await getAllArtists();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-slate-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-transparent"></div>
        <div className="relative container mx-auto px-4 py-24 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-slate-600 rounded-2xl mb-6 shadow-2xl">
              <span className="text-3xl">🎵</span>
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight">
            MUSIC
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-slate-400">
              APP
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Premium music experience for the modern listener. Discover, stream, and enjoy high-quality audio with sophisticated design.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/artists"
              className="group bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
            >
              <span className="flex items-center justify-center gap-3">
                <span>🎤</span>
                <span>Explore Artists</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>
            <Link
              href="/songs"
              className="group bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-sm border border-slate-700 hover:border-slate-600 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center justify-center gap-3">
                <span>🎵</span>
                <span>Browse Library</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Featured Songs */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              FEATURED
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-slate-400">
                TRACKS
              </span>
            </h2>
            <p className="text-gray-400 text-xl font-light max-w-2xl mx-auto">
              Curated selection of premium tracks from our extensive library
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredSongs.map((song, index) => (
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
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-500 to-slate-500 rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-lg truncate group-hover:text-blue-300 transition-colors">
                      {song.title}
                    </h3>
                    <p className="text-gray-400 text-sm truncate font-medium">
                      {song.artist_name}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-gray-500 text-xs font-mono bg-slate-800/50 px-2 py-1 rounded">
                        {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
                      </span>
                      <span className="text-gray-600 text-xs">•</span>
                      <span className="text-gray-500 text-xs font-medium">{song.release_year}</span>
                    </div>
                  </div>
                  <div className="text-gray-500 group-hover:text-blue-400 transition-colors text-2xl group-hover:scale-110 transform duration-300">
                    ▶
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Artists */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              TOP
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-slate-400">
                ARTISTS
              </span>
            </h2>
            <p className="text-gray-400 text-xl font-light max-w-2xl mx-auto">
              Discover the most influential artists in our premium collection
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {artists.slice(0, 5).map((artist, index) => (
              <Link
                key={artist.id}
                href={`/artists/${artist.slug}`}
                className="group text-center"
              >
                <div className="relative mb-6">
                  <div className="w-28 h-28 mx-auto rounded-2xl overflow-hidden group-hover:scale-110 transition-transform duration-500 shadow-2xl">
          <Image
                      src={artist.image_url}
                      alt={artist.name}
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-slate-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-white font-bold text-lg group-hover:text-blue-300 transition-colors mb-2">
                  {artist.name}
                </h3>
                <p className="text-gray-500 text-sm font-medium bg-slate-800/30 px-3 py-1 rounded-full">
                  {artist.genre}
                </p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/artists"
              className="group inline-flex items-center gap-3 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-sm border border-slate-700 hover:border-slate-600 text-white px-8 py-4 rounded-xl transition-all duration-300 font-semibold"
            >
              <span>View All Artists</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-slate-800/20 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-12 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="group">
              <div className="text-6xl font-black text-white mb-4 group-hover:text-blue-400 transition-colors">
                {artists.length}
              </div>
              <div className="text-gray-400 text-lg font-semibold uppercase tracking-wider">Artists</div>
              <div className="text-gray-600 text-sm mt-2">Premium Collection</div>
            </div>
            <div className="group">
              <div className="text-6xl font-black text-white mb-4 group-hover:text-blue-400 transition-colors">
                {artists.length * 5}
              </div>
              <div className="text-gray-400 text-lg font-semibold uppercase tracking-wider">Tracks</div>
              <div className="text-gray-600 text-sm mt-2">High Quality Audio</div>
            </div>
            <div className="group">
              <div className="text-6xl font-black text-white mb-4 group-hover:text-blue-400 transition-colors">
                10+
              </div>
              <div className="text-gray-400 text-lg font-semibold uppercase tracking-wider">Genres</div>
              <div className="text-gray-600 text-sm mt-2">Diverse Selection</div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-slate-800/30 to-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
              READY TO
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-slate-400">
                EXPERIENCE?
              </span>
            </h2>
            <p className="text-gray-400 text-xl mb-10 font-light max-w-3xl mx-auto">
              Join the premium music experience. Discover, stream, and enjoy high-quality audio with sophisticated design tailored for the modern listener.
            </p>
            <Link
              href="/songs"
              className="group inline-flex items-center gap-4 bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 text-white px-12 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
            >
              <span>🎵</span>
              <span>Start Listening Now</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
