'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/artists', label: 'Artists', icon: '🎤' },
    { href: '/songs', label: 'Library', icon: '🎵' },
  ];

  return (
    <nav className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-slate-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
              ♪
            </div>
            <span className="text-white font-black text-2xl tracking-tight group-hover:text-blue-300 transition-colors">
              Music App
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 font-semibold ${
                  pathname === item.href
                    ? 'bg-gradient-to-r from-blue-600 to-slate-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-bold">{item.label}</span>
                {pathname === item.href && (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
