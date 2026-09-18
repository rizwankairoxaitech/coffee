/**
 * THE OPEN CUP by Hot Catch — Interactive Client Logic
 * Kinetic animations, 3D tilt, ambient particle canvas, Web Audio soundscape,
 * animated number counters, cart management, and table reservation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ----------------------------------------------------
  // 1. Ambient Cursor Spotlight (Smooth Lerp Follower)
  // ----------------------------------------------------
  const cursorGlow = document.getElementById('cursorGlow');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderCursorGlow() {
    if (cursorGlow) {
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;
      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;
    }
    requestAnimationFrame(renderCursorGlow);
  }
  renderCursorGlow();

  // ----------------------------------------------------
  // 2. Animated Steam & Roasting Ember Particle Canvas
  // ----------------------------------------------------
  const canvas = document.getElementById('heroSteamCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    });

    const particles = [];
    const PARTICLE_COUNT = 32;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 1.2,
        speedY: Math.random() * 0.6 + 0.25,
        speedX: (Math.random() - 0.5) * 0.35,
        opacity: Math.random() * 0.6 + 0.15,
        fadeSpeed: Math.random() * 0.005 + 0.002,
        hue: Math.random() > 0.6 ? 38 : 22 // warm amber or coffee gold
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.speedX;
        p.opacity -= p.fadeSpeed;

        if (p.y < 0 || p.opacity <= 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
          p.opacity = Math.random() * 0.5 + 0.2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 85%, 65%, ${p.opacity})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `hsla(${p.hue}, 85%, 65%, 0.5)`;
        ctx.fill();
      });

      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // ----------------------------------------------------
  // 3. Interactive 3D Card Tilt on Mousemove
  // ----------------------------------------------------
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s ease-out';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease-out';
    });
  });

  // ----------------------------------------------------
  // 4. Animated Number Counters
  // ----------------------------------------------------
  const statNumbers = document.querySelectorAll('.hero-stat-num');
  let statsAnimated = false;

  function runNumberCounters() {
    if (statsAnimated) return;
    statsAnimated = true;

    statNumbers.forEach((el) => {
      const target = parseFloat(el.getAttribute('data-target'));
      const isDecimal = el.getAttribute('data-decimal');
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1800; // ms
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutExpo
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = target * ease;

        if (isDecimal) {
          el.textContent = currentVal.toFixed(1) + suffix;
        } else {
          el.textContent = Math.floor(currentVal) + suffix;
        }

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          el.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
        }
      }
      requestAnimationFrame(updateCounter);
    });
  }
  // Run on load
  setTimeout(runNumberCounters, 400);

  // ----------------------------------------------------
  // 5. Scroll Reveal with IntersectionObserver
  // ----------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealElements.forEach((el) => revealObserver.observe(el));

  // ----------------------------------------------------
  // 6. Ambiance Switcher (Golden Hour vs. Evening Dusk)
  // ----------------------------------------------------
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDusk = document.body.classList.toggle('theme-dusk');
      if (isDusk) {
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Golden Hour Mode';
        showToast('🌙 Switched to Evening Rooftop Dusk Mode!');
      } else {
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Rooftop Dusk Mode';
        showToast('☀️ Switched to Golden Hour Day Mode!');
      }
    });
  }

  // ----------------------------------------------------
  // 7. Web Audio API Relaxing Cafe Ambiance Soundscape
  // ----------------------------------------------------
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  const audioBtnText = document.getElementById('audioBtnText');
  let audioCtx = null;
  let isPlayingAudio = false;
  let masterGain = null;

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      if (!isPlayingAudio) {
        startCafeAudio();
        isPlayingAudio = true;
        audioBtnText.textContent = 'Cafe Ambiance: Playing';
        audioToggleBtn.style.background = 'rgba(217, 119, 6, 0.3)';
        audioToggleBtn.style.borderColor = '#D97706';
        showToast('🎧 Relaxing Cafe Ambiance Chords Playing!');
      } else {
        stopCafeAudio();
        isPlayingAudio = false;
        audioBtnText.textContent = 'Cafe Ambiance: Off';
        audioToggleBtn.style.background = 'rgba(255, 255, 255, 0.08)';
        audioToggleBtn.style.borderColor = 'rgba(255, 255, 255, 0.16)';
        showToast('Quiet mode enabled.');
      }
    });
  }

  function startCafeAudio() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();

      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);

      // Warm acoustic coffee shop chords (F, A, C, E)
      const freqs = [174.61, 220.0, 261.63, 329.63];
      freqs.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const oscGain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        // Gentle subtle tremolo/vibrato
        const lfo = audioCtx.createOscillator();
        lfo.frequency.setValueAtTime(0.2 + idx * 0.1, audioCtx.currentTime);
        const lfoGain = audioCtx.createGain();
        lfoGain.gain.setValueAtTime(0.02, audioCtx.currentTime);
        lfo.connect(oscGain.gain);
        lfo.start();

        oscGain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
      });
    } catch (e) {
      console.log('Audio init notice:', e);
    }
  }

  function stopCafeAudio() {
    if (audioCtx) {
      audioCtx.close();
      audioCtx = null;
    }
  }

  // ----------------------------------------------------
  // 8. Live Hours Check (9 AM - 11 PM)
  // ----------------------------------------------------
  function updateLiveHoursStatus() {
    const statusBadges = [
      document.getElementById('liveStatusBadge'),
      document.getElementById('heroLiveBadge')
    ];
    const statusTexts = [
      document.getElementById('liveStatusText'),
      document.getElementById('heroLiveText')
    ];

    const now = new Date();
    const currentHour = now.getHours();
    const isOpen = currentHour >= 9 && currentHour < 23;

    statusBadges.forEach((b) => {
      if (!b) return;
      if (isOpen) {
        b.style.background = 'rgba(16, 185, 129, 0.16)';
        b.style.borderColor = 'rgba(16, 185, 129, 0.4)';
        b.style.color = '#34D399';
      } else {
        b.style.background = 'rgba(239, 68, 68, 0.16)';
        b.style.borderColor = 'rgba(239, 68, 68, 0.4)';
        b.style.color = '#F87171';
      }
    });

    statusTexts.forEach((t) => {
      if (!t) return;
      t.innerHTML = isOpen
        ? 'Open Now &middot; Closes 11:00 PM'
        : 'Closed &middot; Opens at 9:00 AM';
    });
  }
  updateLiveHoursStatus();

  // ----------------------------------------------------
  // 9. Menu Category Filtering with Smooth Transition
  // ----------------------------------------------------
  const filterPills = document.querySelectorAll('.filter-pill');
  const menuCards = document.querySelectorAll('.menu-card-kinetic');

  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      filterPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');

      const selectedCategory = pill.getAttribute('data-category');

      menuCards.forEach((card) => {
        const itemCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || itemCategory === selectedCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // ----------------------------------------------------
  // 10. Spotlight Stepper & Dynamic Button
  // ----------------------------------------------------
  let spotlightCount = 1;
  const SPOTLIGHT_ITEM = {
    id: 99,
    name: 'Organic Brunch Blend Tin (250g)',
    price: 480,
    img: 'assets/images/packaging.jpg'
  };

  const stepperMinus = document.getElementById('stepperMinus');
  const stepperPlus = document.getElementById('stepperPlus');
  const stepperCount = document.getElementById('stepperCount');
  const spotlightAddToCartBtn = document.getElementById('spotlightAddToCartBtn');

  if (stepperMinus && stepperPlus && stepperCount) {
    stepperMinus.addEventListener('click', () => {
      if (spotlightCount > 1) {
        spotlightCount--;
        stepperCount.textContent = spotlightCount;
        updateSpotlightBtnPrice();
      }
    });

    stepperPlus.addEventListener('click', () => {
      spotlightCount++;
      stepperCount.textContent = spotlightCount;
      updateSpotlightBtnPrice();
    });
  }

  function updateSpotlightBtnPrice() {
    if (spotlightAddToCartBtn) {
      const price = SPOTLIGHT_ITEM.price * spotlightCount;
      spotlightAddToCartBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        Add Tin to Order &middot; &#8377;${price}
      `;
    }
  }

  if (spotlightAddToCartBtn) {
    spotlightAddToCartBtn.addEventListener('click', () => {
      addToCart(
        SPOTLIGHT_ITEM.id,
        SPOTLIGHT_ITEM.name,
        SPOTLIGHT_ITEM.price,
        SPOTLIGHT_ITEM.img,
        spotlightCount
      );
      showToast(`Added ${spotlightCount}x ${SPOTLIGHT_ITEM.name} to tray!`);
      openCart();
    });
  }

  // ----------------------------------------------------
  // 11. Shopping Cart Drawer & Real-Time 10% ID Discount
  // ----------------------------------------------------
  let cart = [];
  const cartDrawer = document.getElementById('cartDrawer');
  const cartBackdrop = document.getElementById('cartBackdrop');
  const cartOpenBtn = document.getElementById('cartOpenBtn');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartCountEl = document.getElementById('cartCount');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartDiscountRow = document.getElementById('cartDiscountRow');
  const cartDiscountAmountEl = document.getElementById('cartDiscountAmount');
  const cartTotalEl = document.getElementById('cartTotal');
  const cartIdDiscount = document.getElementById('cartIdDiscount');
  const btnCheckout = document.getElementById('btnCheckout');

  document.querySelectorAll('.btn-add-item').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'), 10);
      const name = btn.getAttribute('data-name');
      const price = parseInt(btn.getAttribute('data-price'), 10);
      const img = btn.getAttribute('data-img');

      addToCart(id, name, price, img, 1);
      showToast(`Added ${name} to order tray!`);
    });
  });

  function addToCart(id, name, price, img, qty = 1) {
    const existing = cart.find((item) => item.id === id);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ id, name, price, img, qty });
    }
    renderCart();
  }

  function renderCart() {
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountEl.textContent = totalCount;

    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div style="text-align:center; padding: 40px 10px; color: var(--c-text-secondary);">
          <p style="font-size: 1.1rem; margin-bottom: 8px;">Your tray is currently empty.</p>
          <p style="font-size: 0.85rem;">Add some smoked brisket, avocado toast or pour-over coffee!</p>
        </div>
      `;
      cartSubtotalEl.innerHTML = '&#8377;0';
      cartDiscountRow.style.display = 'none';
      cartTotalEl.innerHTML = '&#8377;0';
      return;
    }

    let subtotal = 0;
    cartItemsList.innerHTML = '';

    cart.forEach((item) => {
      const itemSubtotal = item.price * item.qty;
      subtotal += itemSubtotal;

      const itemRow = document.createElement('div');
      itemRow.className = 'cart-item-row';
      itemRow.innerHTML = `
        <img src="${item.img}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">&#8377;${item.price} each &middot; &#8377;${itemSubtotal}</div>
        </div>
        <div class="cart-qty-ctrl">
          <button class="cart-qty-btn" data-action="decrease" data-id="${item.id}">&minus;</button>
          <span style="font-weight:800; font-size:0.95rem; min-width:24px; text-align:center;">${item.qty}</span>
          <button class="cart-qty-btn" data-action="increase" data-id="${item.id}">&plus;</button>
        </div>
      `;
      cartItemsList.appendChild(itemRow);
    });

    let finalTotal = subtotal;
    if (cartIdDiscount && cartIdDiscount.checked) {
      const discount = Math.round(subtotal * 0.1);
      finalTotal = subtotal - discount;
      cartDiscountRow.style.display = 'flex';
      cartDiscountAmountEl.innerHTML = `-&#8377;${discount}`;
    } else {
      cartDiscountRow.style.display = 'none';
    }

    cartSubtotalEl.innerHTML = `&#8377;${subtotal}`;
    cartTotalEl.innerHTML = `&#8377;${finalTotal}`;

    cartItemsList.querySelectorAll('.cart-qty-btn').forEach((b) => {
      b.addEventListener('click', () => {
        const id = parseInt(b.getAttribute('data-id'), 10);
        const action = b.getAttribute('data-action');
        const item = cart.find((i) => i.id === id);
        if (!item) return;

        if (action === 'increase') {
          item.qty++;
        } else if (action === 'decrease') {
          item.qty--;
          if (item.qty <= 0) {
            cart = cart.filter((i) => i.id !== id);
          }
        }
        renderCart();
      });
    });
  }

  if (cartIdDiscount) {
    cartIdDiscount.addEventListener('change', () => {
      renderCart();
      if (cartIdDiscount.checked) {
        showToast('🎓 Flat 10% ID Discount applied to your order!');
      }
    });
  }

  function openCart() {
    cartDrawer.classList.add('active');
    cartBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawer.classList.remove('active');
    cartBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (cartOpenBtn) cartOpenBtn.addEventListener('click', openCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);

  if (btnCheckout) {
    btnCheckout.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Your tray is empty. Add delicious items first!');
        return;
      }
      closeCart();
      showToast('Order received! Takeaway/Delivery ready at Harrington Rd.');
      alert(
        `🎉 Thank you for your order at The Open Cup by Hot Catch!\n\nYour order total is: ${cartTotalEl.textContent}\nLocation: No. 1, 13th Avenue, Harrington Rd, Chetpet, Chennai.\nHotline: 077088 11068`
      );
      cart = [];
      renderCart();
    });
  }

  // ----------------------------------------------------
  // 12. Table Reservation Booking Form
  // ----------------------------------------------------
  const reservationForm = document.getElementById('reservationForm');
  const resDateInput = document.getElementById('resDate');

  if (resDateInput) {
    const today = new Date().toISOString().split('T')[0];
    resDateInput.value = today;
    resDateInput.min = today;
  }

  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('resName').value;
      const phone = document.getElementById('resPhone').value;
      const date = document.getElementById('resDate').value;
      const time = document.getElementById('resTime').value;
      const guests = document.getElementById('resGuests').value;
      const seating = document.getElementById('resSeating').value;
      const pet = document.getElementById('resPetFriendly').checked;

      const petMsg = pet
        ? '\n🐾 Pet Dog: Yes (Table equipped with water bowl & treats)'
        : '';

      alert(
        `✅ TABLE RESERVED AT THE OPEN CUP!\n\nGuest Name: ${name}\nPhone: ${phone}\nDate: ${date}\nTime: ${time}\nParty: ${guests}\nArea: ${seating}${petMsg}\n\nWe look forward to welcoming you to Harrington Road, Chetpet!`
      );

      showToast(`Table confirmed for ${name} at ${time}!`);
      reservationForm.reset();
    });
  }

  const btnHeaderReserve = document.getElementById('btnHeaderReserve');
  if (btnHeaderReserve) {
    btnHeaderReserve.addEventListener('click', () => {
      document.getElementById('reserve').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ----------------------------------------------------
  // 13. Google Review Modal
  // ----------------------------------------------------
  const reviewModal = document.getElementById('reviewModal');
  const btnOpenReviewModal = document.getElementById('btnOpenReviewModal');
  const closeReviewModal = document.getElementById('closeReviewModal');
  const reviewSubmitForm = document.getElementById('reviewSubmitForm');

  if (btnOpenReviewModal && reviewModal) {
    btnOpenReviewModal.addEventListener('click', () => {
      reviewModal.classList.add('active');
    });
  }

  if (closeReviewModal && reviewModal) {
    closeReviewModal.addEventListener('click', () => {
      reviewModal.classList.remove('active');
    });
  }

  if (reviewModal) {
    reviewModal.addEventListener('click', (e) => {
      if (e.target === reviewModal) {
        reviewModal.classList.remove('active');
      }
    });
  }

  if (reviewSubmitForm) {
    reviewSubmitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const reviewerName = document.getElementById('newReviewerName').value;
      const rating = document.getElementById('newReviewRating').value;
      showToast(
        `Thank you ${reviewerName}! Your ${rating}-star review was posted.`
      );
      reviewModal.classList.remove('active');
      reviewSubmitForm.reset();
    });
  }

  // ----------------------------------------------------
  // 14. Mobile Navigation Toggle
  // ----------------------------------------------------
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileNavToggle && navLinks) {
    mobileNavToggle.addEventListener('click', () => {
      const isVisible = navLinks.style.display === 'flex';
      if (isVisible) {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.background = 'var(--c-deep-roast)';
        navLinks.style.padding = '24px';
        navLinks.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
      }
    });
  }

  // ----------------------------------------------------
  // 15. Toast Alert Helper
  // ----------------------------------------------------
  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>&#9749;</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }
});
