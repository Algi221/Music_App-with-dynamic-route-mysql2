import Link from 'next/link';
import Image from 'next/image';
import { getAllArtists } from '@/lib/database';

export default async function ArtistsPage() {
  const artists = await getAllArtists();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            ARTIST
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-slate-400">
              COLLECTION
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            Explore our curated collection of world-class artists. Each profile showcases their unique style, discography, and musical journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {artists.map((artist, index) => (
            <Link
              key={artist.id}
              href={`/artists/${artist.slug}`}
              className="group bg-slate-800/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-700/40 hover:border-slate-600/50 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl"
            >
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="w-36 h-36 mx-auto rounded-2xl overflow-hidden group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                    <Image
                      src={artist.image_url}
                      alt={artist.name}
                      width={144}
                      height={144}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-slate-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-2xl font-black text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {artist.name}
                </h3>
                <div className="space-y-2 mb-6">
                  <p className="text-gray-400 text-sm font-semibold bg-slate-800/50 px-4 py-2 rounded-full">
                    {artist.genre}
                  </p>
                  <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                    {artist.country}
                  </p>
                </div>
                <div className="group-hover:scale-105 transition-transform duration-300">
                  <span className="inline-block bg-gradient-to-r from-blue-600 to-slate-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg">
                    View Profile →
                  </span>
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
