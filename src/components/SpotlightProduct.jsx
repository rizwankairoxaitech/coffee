import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function SpotlightProduct() {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const product = {
    id: 99,
    name: 'Organic Brunch Blend Tin (250g)',
    price: 480,
    img: 'assets/images/packaging.jpg',
  };

  const handleAdd = () => {
    addToCart(product, quantity);
  };

  return (
    <section id="spotlight" className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card-studio rounded-[32px] sm:rounded-[38px] p-6 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative overflow-hidden transition-all">
          {/* Left Column: Product Information */}
          <div className="lg:col-span-6 flex flex-col items-start z-10">
            <div className="inline-flex items-center gap-2 bg-neutral-950 text-white text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-4 sm:mb-6 shadow-sm">
              <ShieldCheck size={16} />
              <span>100% Artisanal &amp; Fresh Everyday</span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl text-neutral-950 tracking-wide uppercase leading-tight mb-3 sm:mb-4">
              ORGANIC BRUNCH BLEND &amp; ROASTED SINGLE ORIGIN
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="flex text-amber-500">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <span className="font-bold text-neutral-950 text-sm">4.9</span>
              <span className="text-neutral-500 text-xs">(128 guest reviews)</span>
            </div>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-lg">
              Carefully curated whole-bean Ethiopia Yirgacheffe and Colombian Supremo roasted in-house. Perfectly balanced for smooth pour-overs, velvety flat whites, and chilled iced brews. No artificial extracts—just honest, pure bean notes.
            </p>

            {/* Quantity Stepper & Add to Cart */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full">
              <div className="inline-flex items-center justify-center glass-pill-studio rounded-full p-1 shadow-sm text-neutral-950 shrink-0 self-center sm:self-auto">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg hover:bg-neutral-100 transition-colors"
                >
                  &minus;
                </button>
                <span className="w-10 text-center font-black text-base">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg hover:bg-neutral-100 transition-colors"
                >
                  &#43;
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAdd}
                className="w-full sm:w-auto justify-center bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-xl flex items-center gap-3 transition-all text-center"
              >
                <ShoppingBag size={18} />
                <span>Add Tin to Order &middot; &#8377;{product.price * quantity}</span>
              </motion.button>
            </div>
          </div>

          {/* Right Column: 3D Packaging Showcase with Rotating Stamp */}
          <div className="lg:col-span-6 relative mt-4 lg:mt-0">
            {/* Animated Rotating Stamp Seal */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-4 sm:-top-6 left-6 sm:left-12 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-neutral-950 text-white border-2 border-dashed border-white shadow-2xl flex flex-col items-center justify-center text-center z-20 cursor-pointer font-black"
            >
              <Heart size={14} className="text-white mb-0.5 fill-white" />
              <span className="font-extrabold text-[9px] sm:text-[10px] tracking-wider leading-none uppercase">
                BEST<br />PICK
              </span>
            </motion.div>

            {/* Split Gallery Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-5 items-center">
              <div className="sm:col-span-7 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/80 shadow-2xl h-64 sm:h-96 group">
                <img
                  src="assets/images/packaging.jpg"
                  alt="Craft packaging canisters and cups of The Open Cup"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
              </div>

              <div className="sm:col-span-5 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/80 shadow-2xl h-52 sm:h-80 group">
                <img
                  src="assets/images/cheesecake.jpg"
                  alt="San Sebastian Burnt Basque Cheesecake"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
