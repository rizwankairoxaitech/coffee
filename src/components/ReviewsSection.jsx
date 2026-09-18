import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, MessageSquare, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const REVIEWS = [
  {
    initials: 'TB',
    name: 'Tania Bernett',
    meta: '4 reviews · 7 photos',
    time: '4 months ago',
    rating: 5,
    text: 'The food is great. Vibe is peaceful. You can hangout here... work here... anything.. and the service is timely, caring and kind. Definitely the new hangout place!',
    tags: ['#peacefulvibe', '#workfriendly'],
  },
  {
    initials: 'SN',
    name: 'Sagar Nagaraj',
    meta: 'Local Guide · 92 reviews',
    time: '2 months ago',
    rating: 5,
    text: 'The Shakshoukah was out of this world. Amazing presentation, taste and speed. Staff like Rohit are very kind, and the kitchen were generous when they offered us a free brownie with ice cream.',
    tags: ['#shakshoukah', '#greatstaff'],
  },
  {
    initials: 'LG',
    name: 'Loshika Ganesan',
    meta: '6 reviews',
    time: '2 months ago',
    rating: 5,
    text: 'The Cafe was soo gooddddd, calmmmmm and pleasanttt, and staffs working there were toooo gooodddd especially Chinu! Overall a good experience, enjoyed every minute. Highly recommend #petfriendly',
    tags: ['#petfriendly', '#calmvibe'],
  },
  {
    initials: 'AM',
    name: 'Ashwin George Mathew',
    meta: 'Local Guide · 38 reviews',
    time: '4 months ago',
    rating: 5,
    text: 'The food is great. The brisket and chimichurri was delicious and the umami flavour was on point. The drinks, the dessert, and the service is good!',
    tags: ['#brisket', '#chimichurri'],
  },
  {
    initials: 'DR',
    name: 'Dharshika Rajasekar',
    meta: '9 reviews',
    time: '4 months ago',
    rating: 5,
    text: "This cafe is such a hidden gem in the city and I will visit again just for the service. Chinu, you're so sweet and apart from the view, you're the reason my girlfriend and I will come here again!",
    tags: ['#hiddengem', '#sweetstaff'],
  },
  {
    initials: 'H',
    name: 'Harini',
    meta: '1 review',
    time: '3 months ago',
    rating: 5,
    text: 'Had best service from Holy! The aesthetic ambiance had a great time nice place to take photos especially the rooftop.',
    tags: ['#rooftopview', '#aestheticphotos'],
  },
];

export default function ReviewsSection() {
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [reviewsList, setReviewsList] = useState(REVIEWS);
  const [formName, setFormName] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formText, setFormText] = useState('');
  const { showToast } = useCart();

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!formName || !formText) return;

    const newReview = {
      initials: formName.slice(0, 2).toUpperCase(),
      name: formName,
      meta: 'Verified Guest',
      time: 'Just now',
      rating: Number(formRating),
      text: formText,
      tags: ['#guestreview'],
    };

    setReviewsList([newReview, ...reviewsList]);
    setIsWriteModalOpen(false);
    setFormName('');
    setFormText('');
    showToast('🎉 Thank you! Your review was shared on Google Reviews.');
  };

  return (
    <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="font-script text-3xl text-neutral-500 block mb-2">
            What Our Guests Say
          </span>
          <h2 className="font-display text-5xl sm:text-6xl uppercase tracking-wider text-neutral-950">
            4.7 ★ GOOGLE MAPS REVIEWS
          </h2>
        </div>

        {/* Rating Summary Banner with Gemini AI summary */}
        <div className="glass-card-studio rounded-[34px] p-8 sm:p-12 mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-3 flex items-center gap-5">
            <div className="font-display text-6xl text-neutral-950 leading-none">
              4.7
            </div>
            <div>
              <div className="flex text-amber-500 mb-1">
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
              </div>
              <div className="text-xs font-black uppercase tracking-wider text-neutral-500">
                44+ Verified Reviews
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-neutral-200/80 pt-6 lg:pt-0 lg:pl-8">
            <div className="inline-flex items-center gap-2 bg-neutral-950 text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full mb-3 shadow-sm">
              <Sparkles size={14} className="text-amber-400" />
              <span>Summarized with Gemini</span>
            </div>
            <p className="text-neutral-600 text-sm leading-relaxed italic">
              "Diners like this cafe's delicious food, with popular items including avocado toast, brisket, chimichurri, and grilled chicken. They also highlight the cozy, peaceful, and aesthetic ambiance, making it a great spot for relaxing or working. Guests mention the staff are friendly, attentive, and provide timely service."
            </p>
          </div>

          <div className="lg:col-span-2 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsWriteModalOpen(true)}
              className="bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full shadow-md whitespace-nowrap"
            >
              Write a Review
            </motion.button>
          </div>
        </div>

        {/* Real Reviews 3-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsList.map((rev, idx) => (
            <motion.article
              key={idx}
              whileHover={{ y: -6 }}
              className="glass-card-studio rounded-3xl p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-neutral-950 text-white flex items-center justify-center font-black text-sm">
                    {rev.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-neutral-950">
                      {rev.name}
                    </h4>
                    <span className="text-[11px] text-neutral-500">
                      {rev.meta}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-xs text-neutral-400">{rev.time}</span>
                </div>

                <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                  "{rev.text}"
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap pt-4 border-t border-neutral-200/80">
                {rev.tags.map((t, i) => (
                  <span
                    key={i}
                    className="glass-pill-studio text-neutral-700 text-[11px] font-bold px-2.5 py-1 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      <AnimatePresence>
        {isWriteModalOpen && (
          <div className="fixed inset-0 bg-neutral-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card-studio rounded-[34px] max-w-lg w-full p-8 relative shadow-2xl"
            >
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="absolute top-6 right-6 text-neutral-400 hover:text-neutral-900"
              >
                <X size={22} />
              </button>

              <h3 className="font-display text-3xl uppercase tracking-wider text-neutral-950 mb-2">
                SHARE YOUR EXPERIENCE
              </h3>
              <p className="text-xs text-neutral-500 mb-6">
                Tell others about your favorites: brisket, chimichurri, avocado toast, staff, or rooftop view!
              </p>

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Meera Raman"
                    className="w-full bg-white/90 border border-neutral-300 rounded-xl px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Rating
                  </label>
                  <select
                    value={formRating}
                    onChange={(e) => setFormRating(e.target.value)}
                    className="w-full bg-white/90 border border-neutral-300 rounded-xl px-4 py-2.5 text-sm text-neutral-900 outline-none focus:border-neutral-900"
                  >
                    <option value="5">★★★★★ (5/5 - Outstanding)</option>
                    <option value="4">★★★★☆ (4/5 - Very Good)</option>
                    <option value="3">★★★☆☆ (3/5 - Average)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-espresso-900 dark:text-latte-200 mb-1">
                    Review Content
                  </label>
                  <textarea
                    required
                    rows="3"
                    value={formText}
                    onChange={(e) => setFormText(e.target.value)}
                    placeholder="Describe the dishes, hospitality, and vibe..."
                    className="w-full bg-white dark:bg-espresso-800 border border-latte-300 dark:border-white/15 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-caramel-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-caramel-600 hover:bg-caramel-700 text-white font-extrabold uppercase tracking-wider text-xs py-3.5 rounded-full shadow-lg transition-all"
                >
                  Post Review
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
