import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, ShoppingCart, Search, User, Menu, X, Instagram, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function LandingHero({ onEnterMain, isVisible }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setIsReserveOpen, setIsCartOpen, itemCount } = useCart();

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

  // Ensure video autoplays reliably and loops continuously
  useEffect(() => {
    if (videoRef.current && isVisible) {
      videoRef.current.play().catch((err) => {
        console.warn('Autoplay prevented or video loading:', err);
      });
    }
  }, [isVisible]);

  // Keyboard, Wheel, and Touch swipe shortcut to enter main page (scroll bottom to top)
  useEffect(() => {
    if (!isVisible) return;

    let hasTriggered = false;

    const handleWheel = (e) => {
      if (e.deltaY > 15) {
        if (hasTriggered) return;
        hasTriggered = true;
        if (e.cancelable) {
          e.preventDefault();
        }
        onEnterMain();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'Enter') {
        if (hasTriggered) return;
        hasTriggered = true;
        e.preventDefault();
        onEnterMain();
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        touchStartY = e.touches[0].clientY;
      }
    };
    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const touchCurrentY = e.touches[0].clientY;
        if (touchStartY - touchCurrentY > 25) {
          if (!hasTriggered) {
            hasTriggered = true;
            if (e.cancelable) {
              e.preventDefault();
            }
            onEnterMain();
          }
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isVisible, onEnterMain]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 1.65, // Elegant, smooth bottom-to-top curtain transition
              ease: [0.65, 0, 0.25, 1], // Buttery smooth cubic bezier
            },
          }}
          className="fixed inset-0 z-[100] w-full h-[100dvh] bg-[#dfe4eb] text-neutral-900 flex flex-col justify-center items-center overflow-hidden shadow-2xl select-none"
        >
          {/* =========================================================================
              CLEAN MINIMAL THIRD WAVE STYLE HEADER
             ========================================================================= */}
          <header className="absolute top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
              {/* LEFT: Nav Links (Desktop) */}
              <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
                {leftNav.map((item) => (
                  <button
                    key={item.label}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEnterMain(item.href);
                    }}
                    className="text-[#1b2b3a] hover:text-[#c88a4b] text-[13px] font-bold tracking-[0.14em] uppercase transition-colors duration-200 bg-transparent border-none cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* CENTER: Minimal Third Wave Style Brand Logo */}
              <div
                className="flex flex-col items-center justify-center group py-1 text-center select-none cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onEnterMain();
                }}
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
              </div>

              {/* RIGHT: Contact, About & Utility Icons (Desktop) */}
              <div className="hidden lg:flex items-center gap-7 xl:gap-8">
                {rightNav.map((item) => (
                  <button
                    key={item.label}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEnterMain(item.href);
                    }}
                    className="text-[#1b2b3a] hover:text-[#c88a4b] text-[13px] font-bold tracking-[0.14em] uppercase transition-colors duration-200 bg-transparent border-none cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}

                {/* Cart Icon with Counter */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEnterMain();
                    setIsCartOpen(true);
                  }}
                  className="relative p-1 text-[#1b2b3a] hover:text-[#c88a4b] transition-colors bg-transparent border-none cursor-pointer"
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
                  onClick={(e) => {
                    e.stopPropagation();
                    onEnterMain('#menu');
                  }}
                  className="p-1 text-[#1b2b3a] hover:text-[#c88a4b] transition-colors bg-transparent border-none cursor-pointer"
                  aria-label="Search"
                >
                  <Search size={19} strokeWidth={2.2} />
                </button>

                {/* Profile / Account Icon */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEnterMain('#reserve');
                    setIsReserveOpen(true);
                  }}
                  className="p-1 text-[#1b2b3a] hover:text-[#c88a4b] transition-colors bg-transparent border-none cursor-pointer"
                  aria-label="Account / Reservations"
                  title="Book a table or view profile"
                >
                  <User size={19} strokeWidth={2.2} />
                </button>
              </div>

              {/* MOBILE CONTROLS */}
              <div className="flex items-center gap-3 lg:hidden">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEnterMain();
                    setIsCartOpen(true);
                  }}
                  className="relative p-2 text-[#1b2b3a] bg-transparent border-none"
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
                  onClick={(e) => {
                    e.stopPropagation();
                    setMobileOpen(!mobileOpen);
                  }}
                  className="p-2 text-[#1b2b3a] rounded-lg hover:bg-neutral-100 transition-colors bg-transparent border-none"
                  aria-label="Toggle Menu"
                >
                  {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
            </div>

            {/* MOBILE MENU DROPDOWN */}
            {mobileOpen && (
              <div className="lg:hidden border-t border-neutral-200 bg-white px-6 py-6 space-y-4 shadow-xl">
                <div className="space-y-3 pb-4 border-b border-neutral-200">
                  {leftNav.concat(rightNav).map((item) => (
                    <button
                      key={item.label}
                      onClick={(e) => {
                        e.stopPropagation();
                        setMobileOpen(false);
                        onEnterMain(item.href);
                      }}
                      className="block w-full text-left text-[#1b2b3a] font-bold text-sm tracking-wider uppercase py-1 hover:text-[#c88a4b] bg-transparent border-none"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMobileOpen(false);
                      onEnterMain('#reserve');
                      setIsReserveOpen(true);
                    }}
                    className="flex-1 bg-[#1b2b3a] text-white text-xs font-bold uppercase tracking-wider py-3 rounded-full text-center shadow-md hover:bg-[#142330] border-none cursor-pointer"
                  >
                    Reserve a Table
                  </button>
                </div>
              </div>
            )}
          </header>

          {/* =========================================================================
              FULL-SCREEN CINEMATIC LOOPING VIDEO HERO SCENE
             ========================================================================= */}
          <div
            className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-pointer group"
            onClick={onEnterMain}
          >
            {/* Looping Full-Bleed Video from assets/images/landings.mp4 */}
            <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#dfe4eb]">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                poster="/hot_catch_landing.jpg"
                className="w-full h-full object-cover object-center"
              >
                <source src="assets/images/landings.mp4" type="video/mp4" />
                <source src="/assets/images/landings.mp4" type="video/mp4" />
                <source src="/landings.mp4" type="video/mp4" />
                <source src="assets/images/landing.mp4" type="video/mp4" />
                <source src="/landing.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Subtle dark ambient gradient overlay to make foreground card pop */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
            </div>

            {/* =========================================================================
                INSTAGRAM BIO GLASS CARD OVER VIDEO (COMPACT & DOCKED LEFT)
               ========================================================================= */}
            <motion.div
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-3 sm:bottom-6 md:bottom-10 left-3 sm:left-6 md:left-10 z-40 w-[260px] sm:w-[320px] md:w-[360px] max-w-[85vw] max-h-[calc(100dvh-5.5rem)] overflow-y-auto bg-white/92 backdrop-blur-2xl border border-white/90 rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.35)] text-neutral-900 select-auto pointer-events-auto scrollbar-none"
            >
              {/* Profile Header Row: Round Badge + Username + Stats */}
              <div className="flex items-center gap-2.5 sm:gap-3.5 mb-2 sm:mb-3">
                {/* Round Circular Logo Badge */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 shrink-0 rounded-full bg-white border-2 border-[#5c3a28] p-0.5 shadow-sm flex items-center justify-center">
                  <div className="w-full h-full rounded-full border border-[#5c3a28]/40 flex flex-col items-center justify-center p-0.5 text-[#5c3a28] bg-[#fcfaf7]">
                    <svg
                      viewBox="0 0 48 38"
                      fill="none"
                      className="w-4 h-4 sm:w-5 sm:h-5 stroke-[#5c3a28]"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 4C20 6.5 23 8.5 21 11C20 12 22 13 24 14" strokeWidth="1.8" />
                      <path d="M27 6C29 8 26 10 28 12" strokeWidth="1.6" />
                      <path d="M12 17C12 17 13 30 24 30C35 30 36 17 36 17H12Z" fill="white" />
                      <path d="M36 20H39C41.5 20 43 22 43 24C43 26 41.5 27.5 39 27.5H34" />
                      <path d="M9 32C15 34 33 34 39 32" strokeWidth="2.2" />
                    </svg>
                    <span className="font-black text-[4.5px] sm:text-[5.5px] uppercase tracking-wider text-[#5c3a28] leading-none mt-0.5">
                      Open Cup
                    </span>
                  </div>
                </div>

                {/* Profile Text & Stats */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-black text-xs sm:text-sm md:text-base text-neutral-950 tracking-tight">
                      the.opencup
                    </span>
                    <span className="bg-neutral-950/10 text-neutral-800 text-[8px] sm:text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                      Cafe
                    </span>
                  </div>
                  <div className="text-[10px] sm:text-xs text-neutral-500 font-medium truncate">
                    The Open Cup by Hot Catch
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] sm:text-[11px] text-neutral-700 mt-0.5 font-semibold">
                    <span><strong className="text-neutral-950 font-black">71</strong> posts</span>
                    <span>&middot;</span>
                    <span><strong className="text-neutral-950 font-black">1.4k</strong> followers</span>
                    <span>&middot;</span>
                    <span><strong className="text-neutral-950 font-black">6</strong> following</span>
                  </div>
                </div>
              </div>

              {/* Bio Headline */}
              <h2 className="text-xs sm:text-sm md:text-base font-black text-neutral-950 tracking-tight leading-snug mb-1 sm:mb-1.5">
                {"A garden café in the heart of Chennai"}
              </h2>

              {/* Bio Subtitle & Offerings */}
              <p className="text-neutral-600 text-[10px] sm:text-xs leading-relaxed mb-1.5 sm:mb-2 line-clamp-2 sm:line-clamp-none font-normal">
                Signature Coffee &amp; Desserts &middot; Smoky Grills &amp; Briskets in a tranquil rooftop setting.
              </p>

              {/* Location Badge */}
              <div className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-neutral-800 mb-2.5 sm:mb-3.5">
                <MapPin size={12} className="text-rose-600 shrink-0 sm:w-3.5 sm:h-3.5" />
                <span>Harrington Road, Chennai</span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1.5 sm:gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEnterMain('#menu');
                  }}
                  className="flex-1 bg-[#1b2b3a] hover:bg-[#14222d] text-white font-extrabold text-[10px] sm:text-xs uppercase tracking-wider py-2 px-3 sm:py-2.5 sm:px-3.5 rounded-full shadow-md transition-all duration-200 transform hover:scale-[1.02] active:scale-95 text-center"
                >
                  Explore Menu &rarr;
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEnterMain('#reserve');
                    setIsReserveOpen(true);
                  }}
                  className="flex-1 bg-[#c88a4b] hover:bg-[#b57a3e] text-neutral-950 font-black text-[10px] sm:text-xs uppercase tracking-wider py-2 px-3 sm:py-2.5 sm:px-3.5 rounded-full shadow-md transition-all duration-200 transform hover:scale-[1.02] active:scale-95 text-center"
                >
                  Book Table
                </button>

                <a
                  href="https://instagram.com/the.opencup"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="self-center sm:self-auto p-1.5 sm:p-2 rounded-full border border-neutral-300 hover:border-neutral-950 text-neutral-700 hover:text-neutral-950 hover:bg-white transition-all shadow-sm flex items-center justify-center shrink-0"
                  title="Visit Instagram @the.opencup"
                >
                  <Instagram size={13} className="sm:w-3.5 sm:h-3.5" />
                </a>
              </div>
            </motion.div>

            {/* Floating Cue Button */}
            <div
              className="absolute top-20 right-3 sm:top-auto sm:bottom-12 sm:right-12 z-40 flex flex-col items-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
              onClick={(e) => {
                e.stopPropagation();
                onEnterMain();
              }}
            >
              <div className="flex items-center gap-2 bg-neutral-950/85 backdrop-blur-xl px-3.5 py-1.5 sm:px-6 sm:py-3 rounded-full border border-white/20 shadow-[0_12px_30px_rgba(0,0,0,0.3)] text-white hover:bg-white hover:text-neutral-950 transition-all duration-300">
                <Sparkles size={12} className="text-amber-400 transition-colors" />
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.18em] sm:tracking-[0.25em]">
                  Enter Experience
                </span>
                <ChevronDown size={13} className="animate-bounce" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


