import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee } from 'lucide-react';
import { CartProvider, useCart } from './context/CartContext';
import LandingHero from './components/LandingHero';
import Navbar from './components/Navbar';
import MarqueeTicker from './components/MarqueeTicker';
import Hero from './components/Hero';
import SpotlightProduct from './components/SpotlightProduct';
import PhilosophyBanner from './components/PhilosophyBanner';
import CraftProcess from './components/CraftProcess';
import MenuSection from './components/MenuSection';
import RooftopShowcase from './components/RooftopShowcase';
import ReviewsSection from './components/ReviewsSection';
import ReservationSection from './components/ReservationSection';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function MainApp() {
  const { toastMessage } = useCart();
  const cursorRef = useRef(null);
  const lenisRef = useRef(null);
  const [isLandingOpen, setIsLandingOpen] = useState(true);

  // 1. Initialize Lenis Smooth Inertia Scrolling + Connect with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;
    window.lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      window.lenis = null;
    };
  }, []);

  // Lock scroll position to top while landing page is open so background never shifts down
  useEffect(() => {
    if (isLandingOpen) {
      window.scrollTo(0, 0);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
        lenisRef.current.stop();
      }
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (lenisRef.current) {
        lenisRef.current.start();
      }
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    }
  }, [isLandingOpen]);

  // 2. Ambient Mouse Cursor Glow Tracker
  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;
    let animationFrame;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      if (cursorRef.current) {
        glowX += (mouseX - glowX) * 0.12;
        glowY += (mouseY - glowY) * 0.12;
        cursorRef.current.style.left = `${glowX}px`;
        cursorRef.current.style.top = `${glowY}px`;
      }
      animationFrame = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="relative min-h-screen text-neutral-900 transition-colors duration-500 overflow-x-clip">
      {/* Interactive Animated Coffee Cup Landing Page (Smooth Bottom-to-Top Transition) */}
      <LandingHero
        isVisible={isLandingOpen}
        onEnterMain={(targetHref) => {
          setIsLandingOpen(false);
          if (targetHref && typeof targetHref === 'string') {
            setTimeout(() => {
              if (lenisRef.current) {
                lenisRef.current.scrollTo(targetHref, { duration: 1.2 });
              } else {
                const el = document.querySelector(targetHref);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }, 650);
          } else {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            if (lenisRef.current) {
              lenisRef.current.scrollTo(0, { immediate: true });
            }
          }
        }}
      />

      {/* Ambient Spotlight Glow */}
      <div ref={cursorRef} className="cursor-glow hidden lg:block" />

      {/* Floating Header */}
      <Navbar onReopenLanding={() => setIsLandingOpen(true)} />

      {/* Main Sections */}
      <main>
        <Hero />
        <SpotlightProduct />
        <PhilosophyBanner />
        <CraftProcess />
        <MarqueeTicker
          items={[
            'HOT CATCH SPECIALTY ROASTS',
            'WOOD-SMOKED CHIMICHURRI BRISKET',
            'NITRO COLD BREW SINGLE ORIGIN',
            'FREE STREET & VALET PARKING',
            'PET-FRIENDLY ROOFTOP NOOK',
            'ARTISANAL BRUNCH CLASSICS',
            'BURNT BASQUE CHEESECAKE DAILY',
          ]}
        />
        <MenuSection />
        <RooftopShowcase />
        <ReviewsSection />
        <ReservationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass-pill-studio text-neutral-900 px-6 py-3.5 rounded-full shadow-2xl border border-white flex items-center gap-3 text-xs sm:text-sm font-bold"
          >
            <Coffee size={18} className="text-amber-800" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}
