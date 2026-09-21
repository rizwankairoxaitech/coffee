import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Dog, Users, Car, Wifi } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function RooftopShowcase() {
  const { setIsReserveOpen } = useCart();

  const features = [
    {
      icon: Dog,
      title: 'Pet-Friendly Rooftop Deck',
      desc: 'Dogs are warmly welcomed outside with water bowls, shade, and friendly pats. #petfriendly',
    },
    {
      icon: Users,
      title: 'Attentive, Heartfelt Hospitality',
      desc: 'Commended in guest reviews for beloved hosts like Chinu, Rohit, and Holy.',
    },
    {
      icon: Car,
      title: 'Valet & Free Street Parking',
      desc: 'Hassle-free parking right on 13th Avenue, Harrington Road.',
    },
    {
      icon: Wifi,
      title: 'High-Speed Wi-Fi & Power Plugs',
      desc: 'Ideal for peaceful solo remote work or team catchups over pour-over coffee.',
    },
  ];

  return (
    <section id="rooftop" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card-studio rounded-[30px] sm:rounded-[38px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Content Left */}
          <div className="lg:col-span-6 p-6 sm:p-12 lg:p-16 flex flex-col justify-center">
            <span className="font-script text-2xl sm:text-3xl text-neutral-500 mb-1 sm:mb-2">
              The Harrington Road Vibe
            </span>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl uppercase tracking-wider leading-tight mb-4 sm:mb-6 text-neutral-950">
              A CALM NOOK IN A BUSTLING CITY
            </h2>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
              More than a café, less than a formal restaurant—just right. Perched on our breezy rooftop at Chetpet with warm wood finishes, lush greenery, and soothing acoustic tunes, it's crafted for lazy afternoons, remote work, or evening dinner conversations.
            </p>

            <div className="space-y-3.5 sm:space-y-4 mb-8 sm:mb-10">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className="flex items-start gap-3 sm:gap-4">
                    <div className="w-8 h-8 rounded-full bg-neutral-950 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      <Icon size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-neutral-950">
                        {f.title}
                      </h4>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsReserveOpen(true)}
                className="w-full sm:w-auto justify-center inline-flex items-center gap-3 bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-xl transition-all"
              >
                <span>Book Rooftop Table</span>
                <ArrowRight size={18} />
              </motion.button>
            </div>
          </div>

          {/* Media Right */}
          <div className="lg:col-span-6 h-full min-h-[260px] sm:min-h-[480px] relative overflow-hidden">
            <img
              src="assets/images/rooftop.jpg"
              alt="Guests enjoying food and coffee on the rooftop terrace of The Open Cup in Chennai with dog"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden" />
          </div>
        </div>
      </div>
    </section>
  );
}
