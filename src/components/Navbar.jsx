import React, { useState } from 'react';
import { ShoppingCart, Search, User, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Navbar({ onReopenLanding }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount, setIsCartOpen, setIsReserveOpen } = useCart();

  const leftNav = [
    { label: 'SHOP', href: '#menu' },
    { label: 'LEARN & DO', href: '#craft' },
    { label: 'CAFES', href: '#rooftop' },
    { label: 'MERCHANDISE', href: '#spotlight' },
  ];

  const rightNav = [
    { label: 'CONTACT', href: '#reserve' },
    { label: 'ABOUT', href: '#philosophy' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* LEFT: Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {leftNav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[#1b2b3a] hover:text-[#c88a4b] text-[13px] font-bold tracking-[0.14em] uppercase transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CENTER: Minimal Third Wave Style Brand Logo */}
        <a
          href="#"
          className="flex flex-col items-center justify-center group py-1 text-center select-none"
        >
          {/* Stylized Coffee Cup Icon with Steam Wave */}
          <div className="w-10 h-7 flex items-center justify-center text-[#1b2b3a] group-hover:text-[#c88a4b] transition-all duration-300 transform group-hover:scale-105">
            <svg
              viewBox="0 0 58 36"
              fill="none"
              className="w-9 h-7 stroke-current"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 9C4 9 7.5 30 27 30C46.5 30 50 9 50 9H4Z" />
              <path d="M12 16C17 19.5 23 13 31 16.5C37 19 40 16.5 42 14.5" strokeWidth="2.2" />
              <path d="M50 12.5H52.5C55 12.5 57 14.5 57 17C57 19.5 55 21.5 52.5 21.5H47" />
            </svg>
          </div>
          <span className="font-display tracking-[0.2em] text-[13px] sm:text-[14px] font-black text-[#1b2b3a] uppercase leading-tight mt-0.5 group-hover:text-[#c88a4b] transition-colors">
            THE OPEN CUP
          </span>
          <span className="text-[8px] sm:text-[9px] tracking-[0.28em] text-[#1b2b3a]/70 uppercase font-bold -mt-0.5">
            COFFEE ROASTERS
          </span>
        </a>

        {/* RIGHT: Contact, About & Utility Icons (Desktop) */}
        <div className="hidden lg:flex items-center gap-7 xl:gap-8">
          {rightNav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[#1b2b3a] hover:text-[#c88a4b] text-[13px] font-bold tracking-[0.14em] uppercase transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}

          {/* Cart Icon with Counter */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-1 text-[#1b2b3a] hover:text-[#c88a4b] transition-colors"
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={19} strokeWidth={2.2} />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#1b2b3a] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>

          {/* Search Icon */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-1 text-[#1b2b3a] hover:text-[#c88a4b] transition-colors"
            aria-label="Search"
          >
            <Search size={19} strokeWidth={2.2} />
          </button>

          {/* Profile / Account Icon */}
          <button
            onClick={() => setIsReserveOpen(true)}
            className="p-1 text-[#1b2b3a] hover:text-[#c88a4b] transition-colors"
            aria-label="Account / Reservations"
            title="Book a table or view profile"
          >
            <User size={19} strokeWidth={2.2} />
          </button>
        </div>

        {/* MOBILE CONTROLS */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[#1b2b3a]"
            aria-label="Cart"
          >
            <ShoppingCart size={20} strokeWidth={2.2} />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#1b2b3a] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-[#1b2b3a] rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* SEARCH BAR DROPDOWN */}
      {searchOpen && (
        <div className="border-t border-neutral-200 bg-[#faf8f5] px-4 py-3">
          <div className="max-w-xl mx-auto flex items-center gap-3 bg-white border border-neutral-300 rounded-full px-4 py-2 shadow-inner">
            <Search size={16} className="text-neutral-400" />
            <input
              type="text"
              placeholder="Search specialty roasts, cold brews, brunch..."
              className="w-full text-sm bg-transparent outline-none text-[#1b2b3a] placeholder:text-neutral-400"
              autoFocus
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-xs font-bold text-neutral-500 hover:text-neutral-900"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}

      {/* MOBILE BACKDROP OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-20 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* MOBILE MENU DROPDOWN */}
      {mobileOpen && (
        <div className="lg:hidden relative z-50 border-t border-neutral-200 bg-white/95 backdrop-blur-xl px-6 py-6 space-y-4 shadow-2xl">
          <div className="space-y-3 pb-4 border-b border-neutral-200">
            {leftNav.concat(rightNav).map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block text-[#1b2b3a] font-bold text-sm tracking-wider uppercase py-1.5 hover:text-[#c88a4b] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => {
                setMobileOpen(false);
                setIsReserveOpen(true);
              }}
              className="flex-1 bg-[#1b2b3a] text-white text-xs font-bold uppercase tracking-wider py-3 rounded-full text-center shadow-md hover:bg-[#142330]"
            >
              Reserve a Table
            </button>
            {onReopenLanding && (
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onReopenLanding();
                }}
                className="px-4 py-3 border border-neutral-300 rounded-full text-xs font-bold text-[#1b2b3a] uppercase tracking-wider hover:bg-neutral-50 flex items-center gap-1.5 shrink-0"
                title="View animated cover story"
              >
                <Sparkles size={13} className="text-amber-600" />
                <span>View Cover</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

