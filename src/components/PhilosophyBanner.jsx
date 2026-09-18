import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const TAGS = [
  'WOOD-SMOKED BRISKET',
  'FRESH CHIMICHURRI',
  'SLOW ROASTED BEANS',
  'PET FRIENDLY ROOFTOP',
  'ORGANIC SOURDOUGH',
  'NITRO COLD BREW',
  'HARRINGTON RD, CHETPET',
];

export default function PhilosophyBanner() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card-studio text-neutral-950 rounded-[38px] p-10 sm:p-16 text-center relative overflow-hidden"
        >
          <div className="flex justify-center mb-4">
            <Heart size={28} className="text-amber-800 fill-amber-800/20 animate-pulse" />
          </div>

          <blockquote className="font-display text-3xl sm:text-5xl lg:text-6xl uppercase tracking-wider max-w-4xl mx-auto leading-tight mb-4 text-neutral-950">
            THERE ARE MEMORIES THAT STAY FOREVER.<br />
            A RUSHED MORNING OR A COLD, BITTER COFFEE<br />
            SHOULD NEVER BE ONE OF THEM.
          </blockquote>

          <div className="font-script text-2xl sm:text-3xl text-neutral-500 mb-8">
            crafted with warmth, smoke, and unhurried patience
          </div>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="px-5 py-2 rounded-full glass-pill-studio text-xs sm:text-sm font-extrabold uppercase tracking-wider text-neutral-700 hover:text-neutral-950 hover:bg-white transition-all cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
