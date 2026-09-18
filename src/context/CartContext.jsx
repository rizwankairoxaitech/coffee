import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [applyIdDiscount, setApplyIdDiscount] = useState(false);
  const [isDuskMode, setIsDuskMode] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Audio Context reference
  const [audioCtx, setAudioCtx] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const addToCart = (item, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...item, qty }];
    });
    showToast(`Added ${qty}x ${item.name} to your tray!`);
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discountAmount = applyIdDiscount ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discountAmount;
  const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // Toggle Ambiance Audio (Warm Web Audio API synthesized cafe chords)
  const toggleAudio = () => {
    if (!isAudioPlaying) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.06, ctx.currentTime);
        masterGain.connect(ctx.destination);

        const freqs = [174.61, 220.0, 261.63, 329.63];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          const lfo = ctx.createOscillator();
          lfo.frequency.setValueAtTime(0.25 + idx * 0.1, ctx.currentTime);
          const lfoGain = ctx.createGain();
          lfoGain.gain.setValueAtTime(0.02, ctx.currentTime);
          lfo.connect(oscGain.gain);
          lfo.start();

          oscGain.gain.setValueAtTime(0.04, ctx.currentTime);
          osc.connect(oscGain);
          oscGain.connect(masterGain);
          osc.start();
        });

        setAudioCtx(ctx);
        setIsAudioPlaying(true);
        showToast('🎧 Relaxing Cafe Ambiance Chords Playing!');
      } catch (e) {
        console.warn('Web Audio error:', e);
      }
    } else {
      if (audioCtx) {
        audioCtx.close();
        setAudioCtx(null);
      }
      setIsAudioPlaying(false);
      showToast('Quiet mode enabled.');
    }
  };

  // Toggle Dusk Theme
  const toggleDuskMode = () => {
    setIsDuskMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        showToast('🌙 Switched to Evening Rooftop Dusk Mode!');
      } else {
        document.documentElement.classList.remove('dark');
        showToast('☀️ Switched to Golden Hour Daylight Mode!');
      }
      return next;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        clearCart,
        subtotal,
        discountAmount,
        total,
        itemCount,
        applyIdDiscount,
        setApplyIdDiscount,
        isCartOpen,
        setIsCartOpen,
        isReserveOpen,
        setIsReserveOpen,
        isDuskMode,
        toggleDuskMode,
        isAudioPlaying,
        toggleAudio,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
