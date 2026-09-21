import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Flame, Sparkles, Leaf, Coffee, Award } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CATEGORIES = [
  { id: 'all', label: 'All Favorites' },
  { id: 'grill', label: 'Wood Grill & Meats' },
  { id: 'brunch', label: 'Artisan Brunch' },
  { id: 'coffee', label: 'Specialty Coffee' },
  { id: 'dessert', label: 'Bakes & Sweets' },
];

const MENU_ITEMS = [
  {
    id: 1,
    category: 'brunch',
    name: 'Avocado Sourdough Toast',
    price: 340,
    badge: 'Top Rated',
    tag: 'Vegetarian Friendly',
    desc: 'Crispy toasted rustic sourdough, fresh Hass avocado fans, organic poached egg with golden runny yolk, chili flakes, pumpkin seeds, and microgreens.',
    img: 'assets/images/avocado_toast.jpg',
  },
  {
    id: 2,
    category: 'grill',
    name: 'Smoked Brisket & Chimichurri',
    price: 560,
    badge: "Chef's Special",
    tag: 'Wood-Fired Smoke',
    desc: 'Succulent 12-hour wood-smoked tender brisket slices glazed with roasted jus, served with punchy Argentine chimichurri and garlic baby potatoes.',
    img: 'assets/images/brisket.jpg',
  },
  {
    id: 3,
    category: 'brunch',
    name: 'Skillet Shakshoukah',
    price: 360,
    badge: 'Guest Favorite',
    tag: 'Hot Cast-Iron',
    desc: 'Sizzling cast-iron skillet with spiced San Marzano tomato & bell pepper sauce, baked farm eggs, creamy feta crumble, and warm sourdough slices.',
    img: 'assets/images/shakshouka.jpg',
  },
  {
    id: 4,
    category: 'dessert',
    name: 'Burnt Basque Cheesecake',
    price: 310,
    badge: 'Bakery Pick',
    tag: 'Fresh Daily',
    desc: 'San Sebastian style caramelized outer crust with an ultra-creamy, velvety molten center. Served with whipped cream or hot espresso pour.',
    img: 'assets/images/cheesecake.jpg',
  },
  {
    id: 5,
    category: 'coffee',
    name: 'Nitro Cold Brew & Tonic',
    price: 260,
    badge: 'In-House Roast',
    tag: 'Single Origin Arabica',
    desc: '18-hour cold steeped single origin Arabica infused with nitrogen for a silky Guinness-like head, sweet cocoa finish, and zero bitterness.',
    img: 'assets/images/packaging.jpg',
  },
  {
    id: 6,
    category: 'dessert',
    name: 'Molten Chocolate Pancakes',
    price: 320,
    badge: 'Sweet Tooth',
    tag: 'Brioche Stack',
    desc: 'Golden fluffy pancakes stacked high, smothered with warm Belgian dark chocolate sauce, fresh banana coins, raspberries, and toasted hazelnut crunch.',
    img: 'assets/images/hero.jpg',
  },
];

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { addToCart } = useCart();

  const filteredItems =
    activeCategory === 'all'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-8 sm:mb-14">
          <span className="font-script text-2xl sm:text-3xl text-neutral-500 block mb-1 sm:mb-2">
            Freshly Smoked &amp; Brewed
          </span>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl uppercase tracking-wider text-neutral-950">
            THE OPEN CUP MENU
          </h2>
        </div>

        {/* Category Switcher with Sliding Active Pill */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-3 sm:pb-0 scrollbar-none mb-8 sm:mb-14 px-1">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all z-10 shrink-0 ${
                  isActive
                    ? 'text-white'
                    : 'glass-pill-studio text-neutral-600 hover:text-neutral-950 hover:bg-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-menu-pill"
                    className="absolute inset-0 bg-neutral-950 rounded-full shadow-lg -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Card Grid with AnimatePresence */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.article
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -8 }}
                className="glass-card-studio rounded-[26px] sm:rounded-[30px] overflow-hidden flex flex-col group transition-all"
              >
                {/* Image Container */}
                <div className="relative w-full h-52 sm:h-64 overflow-hidden bg-neutral-200">
                  <span className="absolute top-4 right-4 glass-pill-studio text-neutral-900 text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md z-10">
                    {item.badge}
                  </span>
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-5 sm:p-7 flex flex-col flex-grow">
                  <div className="flex items-baseline justify-between gap-4 mb-2 sm:mb-3">
                    <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wide text-neutral-950">
                      {item.name}
                    </h3>
                    <span className="font-extrabold text-lg sm:text-xl text-neutral-950 shrink-0">
                      &#8377;{item.price}
                    </span>
                  </div>

                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6 flex-grow">
                    {item.desc}
                  </p>

                  <div className="flex items-center justify-between pt-3.5 sm:pt-4 border-t border-neutral-200/80">
                    <span className="text-[11px] sm:text-xs font-bold text-neutral-500 flex items-center gap-1.5">
                      <Sparkles size={14} className="text-amber-600" />
                      {item.tag}
                    </span>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addToCart(item, 1)}
                      className="bg-neutral-950 hover:bg-neutral-800 text-white font-black text-xs uppercase tracking-wider px-4 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-md flex items-center gap-2 transition-all shrink-0"
                    >
                      <Plus size={14} />
                      <span>Add to Tray</span>
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
