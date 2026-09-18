import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RECIPES } from '../data/recipes';
import BackgroundLayers from './BackgroundLayers';
import GiantTypography from './GiantTypography';
import HeroRecipeCard from './HeroRecipeCard';
import FloatingIngredients from './FloatingIngredients';
import ScrollProgressIndicator from './ScrollProgressIndicator';
import RecipeModal from './RecipeModal';
import { playChimeSound, playDrawerSound } from '../utils/audio';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeRecipeIndex, setActiveRecipeIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedModalRecipe, setSelectedModalRecipe] = useState(0);

  const prevActiveRef = useRef(0);

  useEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;

    // Pin for 200% extra scroll distance (3 screens total: Cold Coffee, Cheesecake, Avocado Toast)
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=200%',
      pin: pinRef.current,
      pinSpacing: true,
      scrub: 0.1,
      anticipatePin: 1,
      onUpdate: (self) => {
        const rawProgress = self.progress * (RECIPES.length - 1);
        setScrollProgress(rawProgress);

        const currentSnap = Math.round(rawProgress);
        if (currentSnap !== prevActiveRef.current) {
          prevActiveRef.current = currentSnap;
          setActiveRecipeIndex(currentSnap);
          const notes = [440, 523, 659];
          playChimeSound(notes[currentSnap] || 520, 0.07);
        }
      },
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      trigger.kill();
    };
  }, []);

  const scrollToRecipe = (index) => {
    const triggers = ScrollTrigger.getAll();
    const myTrigger = triggers.find((t) => t.trigger === sectionRef.current);
    if (myTrigger) {
      const targetScroll = myTrigger.start + (index / (RECIPES.length - 1)) * (myTrigger.end - myTrigger.start);
      if (window.lenis) {
        window.lenis.scrollTo(targetScroll, { duration: 1.2 });
      } else {
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    }
  };

  const handleOpenRecipe = (index) => {
    playDrawerSound();
    setSelectedModalRecipe(index);
    setModalOpen(true);
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full"
      style={{
        backgroundColor: '#070709',
      }}
    >
      {/* Pinned 100vh Viewport Locked in Place during Recipe Transitions */}
      <div
        ref={pinRef}
        className="w-full h-screen overflow-hidden"
        style={{
          width: '100vw',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#070709',
        }}
      >
        {/* Layer 1: Atmospheric Background Crossfader */}
        <BackgroundLayers scrollProgress={scrollProgress} />

        {/* Layer 2: Giant Kinetic Editorial Typography (pure white Carena font) */}
        <GiantTypography scrollProgress={scrollProgress} />

        {/* Layer 3: Main Recipe Food Centerpiece (Left-to-Right Animated Travel) */}
        <HeroRecipeCard
          scrollProgress={scrollProgress}
          onOpenRecipe={handleOpenRecipe}
        />

        {/* Layer 4: Large Floating Ingredients (Top-to-Bottom Animated Travel) */}
        <FloatingIngredients scrollProgress={scrollProgress} />

        {/* Layer 5: Vertical Progress Indicator & Scroll Prompt */}
        <ScrollProgressIndicator
          scrollProgress={scrollProgress}
          onSelectRecipe={scrollToRecipe}
        />
      </div>

      {/* Recipe Modal Drawer */}
      <RecipeModal
        recipe={RECIPES[selectedModalRecipe]}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
