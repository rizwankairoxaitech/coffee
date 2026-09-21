import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, GraduationCap, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    clearCart,
    subtotal,
    discountAmount,
    total,
    applyIdDiscount,
    setApplyIdDiscount,
    showToast,
  } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsCartOpen(false);
    alert(
      `🎉 ORDER RECEIVED AT THE OPEN CUP BY HOT CATCH!\n\nTotal Paid: $${total}\nPickup/Dine: No. 1, 13th Avenue, Harrington Rd, Chetpet, Chennai.\nHotline: 077088 11068\n\nYour artisan meal & coffee are being prepared!`
    );
    clearCart();
    showToast('🎉 Order placed successfully! See you at Harrington Rd.');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 w-full sm:max-w-md h-full bg-[#f0f3f8]/95 backdrop-blur-2xl border-l border-neutral-300 z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md text-neutral-950 p-4 sm:p-6 flex items-center justify-between border-b border-neutral-200">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-neutral-950" />
                <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wide">
                  YOUR ORDER TRAY
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-neutral-500 hover:text-neutral-950 transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items List */}
            <div className="p-6 overflow-y-auto flex-grow space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-neutral-400">
                  <p className="font-display text-2xl mb-2 uppercase tracking-wide text-neutral-950">
                    YOUR TRAY IS EMPTY
                  </p>
                  <p className="text-xs text-neutral-500">
                    Add smoked brisket, avocado toast, or single-origin Ethiopian coffee!
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 pb-4 border-b border-neutral-200"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-neutral-300"
                    />

                    <div className="flex-grow">
                      <h4 className="font-bold text-sm text-neutral-950 line-clamp-1">
                        {item.name}
                      </h4>
                      <div className="text-xs font-bold text-neutral-600 mt-0.5">
                        ${item.price} each &middot; ${item.price * item.qty}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 glass-pill-studio text-neutral-950 rounded-full p-1 shadow-sm">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs hover:bg-neutral-100"
                      >
                        &minus;
                      </button>
                      <span className="w-5 text-center font-black text-xs">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs hover:bg-neutral-100"
                      >
                        &#43;
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="bg-white/90 backdrop-blur-md p-6 border-t border-neutral-200 space-y-4">
                {/* 10% ID Discount Banner */}
                <div className="glass-pill-studio rounded-2xl p-3.5 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="idDisc"
                    checked={applyIdDiscount}
                    onChange={(e) => {
                      setApplyIdDiscount(e.target.checked);
                      if (e.target.checked) {
                        showToast('🎓 Flat 10% ID Discount applied to order!');
                      }
                    }}
                    className="w-5 h-5 accent-neutral-950 cursor-pointer"
                  />
                  <label
                    htmlFor="idDisc"
                    className="text-xs font-bold text-neutral-800 cursor-pointer flex items-center gap-1.5"
                  >
                    <GraduationCap size={16} className="text-amber-800" />
                    <span>Show Student / Corporate ID (Flat 10% OFF)</span>
                  </label>
                </div>

                {/* Subtotal & Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-neutral-950">${subtotal}</span>
                  </div>

                  {applyIdDiscount && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Flat 10% ID Discount</span>
                      <span>-${discountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-lg font-black text-neutral-950 pt-2 border-t border-neutral-200">
                    <span>TOTAL</span>
                    <span className="font-display text-2xl text-neutral-950">
                      ${total}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="w-full bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold text-sm uppercase tracking-wider py-4 rounded-full shadow-xl flex items-center justify-center gap-3 transition-all"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight size={18} />
                </motion.button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
