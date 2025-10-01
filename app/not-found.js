import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-6">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-r from-blue-600 to-slate-600 rounded-3xl flex items-center justify-center text-white text-6xl font-black shadow-2xl mb-6">
            ⚠️
          </div>
        </div>
        <div className="text-8xl font-black text-white mb-6 tracking-tight">404</div>
        <h1 className="text-4xl font-black text-white mb-6 tracking-tight">
          PAGE NOT FOUND
        </h1>
        <p className="text-gray-400 text-xl mb-12 font-light leading-relaxed">
          The music you're looking for seems to have moved to a different location. 
          Let's get you back to the rhythm.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-slate-600 hover:from-blue-700 hover:to-slate-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span>🏠</span>
            <span>Go Home</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link
            href="/artists"
            className="group inline-flex items-center gap-3 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-sm border border-slate-700 hover:border-slate-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
          >
            <span>🎤</span>
            <span>Browse Artists</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
