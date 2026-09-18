import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Car, Navigation, Calendar, Dog } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ReservationSection() {
  const { showToast } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '07:00 PM',
    guests: '2 Guests',
    seating: 'Breezy Rooftop Terrace',
    pet: false,
    notes: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const petNote = formData.pet
      ? '\n🐾 Pet Dog: Yes (Table equipped with fresh water bowl & treats)'
      : '';

    alert(
      `✅ TABLE RESERVED AT THE OPEN CUP!\n\nGuest: ${formData.name}\nPhone: ${formData.phone}\nDate: ${formData.date}\nTime: ${formData.time}\nParty: ${formData.guests}\nArea: ${formData.seating}${petNote}\n\nWe look forward to welcoming you to Harrington Road, Chetpet!`
    );

    showToast(`Table confirmed for ${formData.name} at ${formData.time}!`);
    setFormData({
      name: '',
      phone: '',
      date: new Date().toISOString().split('T')[0],
      time: '07:00 PM',
      guests: '2 Guests',
      seating: 'Breezy Rooftop Terrace',
      pet: false,
      notes: '',
    });
  };

  return (
    <section id="reserve" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Location Info Card Left */}
          <div className="lg:col-span-5 glass-card-studio rounded-[38px] p-8 sm:p-12 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 bg-neutral-950 text-white px-3.5 py-1 rounded-full text-xs font-bold mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Open Now &middot; Closes 11:00 PM</span>
              </div>

              <h2 className="font-display text-4xl sm:text-5xl uppercase tracking-wider mb-8 text-neutral-950">
                VISIT THE OPEN CUP
              </h2>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-neutral-950 flex items-center justify-center text-white flex-shrink-0 shadow-md">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-wider text-neutral-500 mb-1">
                      Address &amp; Landmark
                    </h5>
                    <p className="text-sm text-neutral-800 leading-snug">
                      No. 1, 13th Avenue, 1/1, Harrington Rd, Chetpet, Chennai, Tamil Nadu 600031
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">Plus Code: 369Q+V8 Chennai</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-neutral-950 flex items-center justify-center text-white flex-shrink-0 shadow-md">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-wider text-neutral-500 mb-1">
                      Table Hotline
                    </h5>
                    <a
                      href="tel:07708811068"
                      className="text-base font-extrabold text-neutral-950 hover:underline transition-colors"
                    >
                      077088 11068
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-neutral-950 flex items-center justify-center text-white flex-shrink-0 shadow-md">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-wider text-neutral-500 mb-1">
                      Operating Hours
                    </h5>
                    <p className="text-sm text-neutral-800">Monday &ndash; Sunday: 9:00 AM &ndash; 11:00 PM</p>
                    <p className="text-xs text-neutral-500">Dine-in &middot; Takeaway &middot; Delivery</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-neutral-950 flex items-center justify-center text-white flex-shrink-0 shadow-md">
                    <Car size={20} />
                  </div>
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-wider text-neutral-500 mb-1">
                      Parking &amp; Pet Amenities
                    </h5>
                    <p className="text-sm text-neutral-800">
                      Free street &amp; valet parking available &middot; Dogs allowed on rooftop deck
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <a
                href="https://maps.app.goo.gl/qwD1UZiSouimGXPw9"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 bg-neutral-950 text-white hover:bg-neutral-800 px-5 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-md"
              >
                <Navigation size={14} />
                <span>Get Directions</span>
              </a>

              <a
                href="https://www.google.com/maps/reserve/v/dine/c/5JYWR_seGlU"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 glass-pill-studio hover:bg-white px-5 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all text-neutral-900 shadow-sm"
              >
                <Calendar size={14} />
                <span>Google Reserve</span>
              </a>
            </div>
          </div>

          {/* Reservation Booking Form Right */}
          <div className="lg:col-span-7 glass-card-studio rounded-[38px] p-8 sm:p-12 flex flex-col justify-center">
            <h3 className="font-display text-4xl sm:text-5xl uppercase tracking-wider text-neutral-950 mb-2">
              RESERVE A TABLE
            </h3>
            <p className="text-neutral-500 text-sm mb-8">
              Book your cozy indoor corner or breezy rooftop table with instant confirmation.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-white/90 border border-neutral-300 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 0987654321"
                    className="w-full bg-white/90 border border-neutral-300 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-white/90 border border-neutral-300 rounded-xl px-4 py-3 text-sm text-neutral-900 outline-none focus:border-neutral-900 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Time
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-white/90 border border-neutral-300 rounded-xl px-4 py-3 text-sm text-neutral-900 outline-none focus:border-neutral-900 transition-colors"
                  >
                    <option value="11:00 AM">11:00 AM (Brunch)</option>
                    <option value="01:00 PM">01:00 PM (Lunch)</option>
                    <option value="04:30 PM">04:30 PM (Sunset Coffee)</option>
                    <option value="07:00 PM">07:00 PM (Dinner)</option>
                    <option value="09:00 PM">09:00 PM (Late Night)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Number of Guests
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full bg-white/90 border border-neutral-300 rounded-xl px-4 py-3 text-sm text-neutral-900 outline-none focus:border-neutral-900 transition-colors"
                  >
                    <option value="1 Guest">1 Guest (Solo Dining / Remote Work)</option>
                    <option value="2 Guests">2 Guests (Cozy Pair)</option>
                    <option value="4 Guests">4 Guests</option>
                    <option value="6+ Guests">6+ Guests (Group Dinner)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Seating Preference
                  </label>
                  <select
                    value={formData.seating}
                    onChange={(e) => setFormData({ ...formData, seating: e.target.value })}
                    className="w-full bg-white/90 border border-neutral-300 rounded-xl px-4 py-3 text-sm text-neutral-900 outline-none focus:border-neutral-900 transition-colors"
                  >
                    <option value="Breezy Rooftop Terrace">Breezy Rooftop Terrace</option>
                    <option value="Indoor AC Cozy Nook">Indoor AC Cozy Nook</option>
                    <option value="Pet-Friendly Patio">Pet-Friendly Patio</option>
                  </select>
                </div>
              </div>

              {/* Pet-Friendly Toggle */}
              <div className="glass-pill-studio rounded-2xl p-4 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="petCheck"
                  checked={formData.pet}
                  onChange={(e) => setFormData({ ...formData, pet: e.target.checked })}
                  className="w-5 h-5 accent-neutral-950 rounded cursor-pointer"
                />
                <label htmlFor="petCheck" className="text-xs sm:text-sm font-bold text-neutral-900 cursor-pointer flex items-center gap-2">
                  <Dog size={16} className="text-amber-800" />
                  <span>I will be bringing my pet dog (Table prepared with water bowl &amp; treats)</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Special Notes (Optional)
                </label>
                <textarea
                  rows="2"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Anniversary, birthday, quiet work corner, etc."
                  className="w-full bg-white/90 border border-neutral-300 rounded-xl px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-neutral-900 transition-colors"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold text-sm uppercase tracking-wider py-4 rounded-full shadow-xl transition-all"
              >
                Confirm Table Reservation
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
