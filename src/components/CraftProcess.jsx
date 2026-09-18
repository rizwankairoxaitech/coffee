import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Flame, Utensils, Heart, Sparkles, Dog, ShieldCheck, Box } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    title: 'SOURCE & SELECT',
    desc: 'Ethically sourced Arabica beans from high-altitude estates and prime, marble-grained brisket cuts.',
    img: 'assets/images/step1.jpg',
  },
  {
    num: '02',
    title: 'CALIBRATED EXTRACTION',
    desc: 'Precision 9-bar extraction for silky golden crema, paired with slow wood-smoked charcoal grill pits.',
    img: 'assets/images/step2.jpg',
  },
  {
    num: '03',
    title: 'SAVOUR THE DETAIL',
    desc: 'Herbaceous chimichurri, runny organic poached yolks, molten dark chocolate, and microgreens.',
    img: 'assets/images/step3.jpg',
  },
  {
    num: '04',
    title: 'MADE WITH LOVE',
    desc: 'Unhurried rooftop conversations, cozy breeze, warm hospitality from our team, and memorable flavors.',
    img: 'assets/images/step4.jpg',
  },
];

const PILLARS = [
  { icon: Coffee, title: '100% Specialty Coffee', sub: 'Single-origin beans roasted in-house daily' },
  { icon: Flame, title: 'Wood-Fired Smoke', sub: 'Tender brisket, ribs & chimichurri jus' },
  { icon: Dog, title: 'Pet-Friendly Rooftop', sub: 'Water bowls & treats for your dogs #petfriendly' },
  { icon: Box, title: 'Dine-in & Takeaway', sub: 'Enjoy the vibe or grab your favorite box to-go' },
];

export default function CraftProcess() {
  return (
    <section id="craft" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-6 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-neutral-950 text-white flex items-center justify-center shadow-lg">
              <Sparkles size={22} className="text-amber-400" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl uppercase tracking-wider text-neutral-950">
              OUR ARTISAN WAY
            </h2>
          </div>
          <div className="h-[2px] bg-gradient-to-r from-neutral-300/80 to-transparent flex-grow" />
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {STEPS.map((step, idx) => (
            <motion.article
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              whileHover={{ y: -8 }}
              className="glass-card-studio rounded-3xl p-5 flex flex-col group transition-all"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-5">
                <span className="absolute top-3 left-3 bg-neutral-950 text-white font-display text-lg w-10 h-10 rounded-full flex items-center justify-center shadow-md z-10 font-bold">
                  {step.num}
                </span>
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <h3 className="font-display text-2xl uppercase tracking-wide text-neutral-950 mb-2">
                {step.title}
              </h3>

              <p className="text-neutral-600 text-sm leading-relaxed flex-grow">
                {step.desc}
              </p>
            </motion.article>
          ))}
        </div>

        {/* 4 Brand Pillars Bar */}
        <div className="glass-card-studio rounded-3xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="flex flex-col items-center text-center gap-3 p-4 rounded-2xl hover:bg-white/40 transition-all">
                <div className="w-14 h-14 rounded-full bg-neutral-950 text-white flex items-center justify-center shadow-md">
                  <Icon size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-wider text-neutral-950 mb-1">
                    {p.title}
                  </h4>
                  <p className="text-xs text-neutral-500">
                    {p.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
