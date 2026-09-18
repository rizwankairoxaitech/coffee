import React, { useState } from 'react';
import { Mail, ArrowRight, Instagram, Facebook, Twitter, Linkedin, Youtube, Smartphone, CheckCircle } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#14222d] text-[#cbd5e1] pt-16 pb-12 border-t border-[#233544]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP SECTION: NEWSLETTER / GET ALL THE UPDATES */}
        <div className="pb-14 border-b border-[#233544] flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left max-w-xl">
            <h3 className="font-display text-2xl sm:text-3xl text-white tracking-[0.14em] uppercase mb-2">
              GET ALL THE UPDATES!
            </h3>
            <p className="text-[#94a3b8] text-sm leading-relaxed">
              Be the first to know about new single-origin harvest drops, rooftop events, artisanal brunch specials, and exclusive member perks.
            </p>
          </div>

          {/* Subscription Form */}
          <form
            onSubmit={handleSubscribe}
            className="w-full max-w-md flex flex-col sm:flex-row items-center gap-3"
          >
            <div className="relative w-full">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-[#1b2d3c] border border-[#2d4355] text-white text-sm px-4 py-3.5 rounded-full placeholder:text-[#64748b] focus:outline-none focus:border-[#c88a4b] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto shrink-0 bg-[#c88a4b] hover:bg-[#b57a3e] text-neutral-950 font-black text-xs tracking-[0.15em] uppercase px-8 py-3.5 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>

        {subscribed && (
          <div className="mt-4 p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-xl flex items-center justify-center gap-2 text-emerald-300 text-xs font-bold">
            <CheckCircle size={16} />
            <span>Thank you for subscribing to The Open Cup coffee roaster dispatch!</span>
          </div>
        )}

        {/* MIDDLE SECTION: 5 COLUMN DIRECTORY */}
        <div className="py-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 border-b border-[#233544]">
          {/* Col 1: SHOP */}
          <div>
            <h4 className="font-display text-white text-xs sm:text-sm tracking-[0.2em] uppercase mb-5 font-black">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#94a3b8]">
              <li><a href="#menu" className="hover:text-[#c88a4b] transition-colors">Specialty Whole Beans</a></li>
              <li><a href="#menu" className="hover:text-[#c88a4b] transition-colors">Artisanal Drip Bags</a></li>
              <li><a href="#menu" className="hover:text-[#c88a4b] transition-colors">Nitro Cold Brew Packs</a></li>
              <li><a href="#menu" className="hover:text-[#c88a4b] transition-colors">Manual Brewing Equipment</a></li>
              <li><a href="#spotlight" className="hover:text-[#c88a4b] transition-colors">Merchandise &amp; Tumblers</a></li>
              <li><a href="#spotlight" className="hover:text-[#c88a4b] transition-colors">Curated Gift Boxes</a></li>
            </ul>
          </div>

          {/* Col 2: ABOUT */}
          <div>
            <h4 className="font-display text-white text-xs sm:text-sm tracking-[0.2em] uppercase mb-5 font-black">
              ABOUT US
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#94a3b8]">
              <li><a href="#philosophy" className="hover:text-[#c88a4b] transition-colors">Our Roastery Story</a></li>
              <li><a href="#craft" className="hover:text-[#c88a4b] transition-colors">The Third Wave Philosophy</a></li>
              <li><a href="#craft" className="hover:text-[#c88a4b] transition-colors">Direct Trade Estates</a></li>
              <li><a href="#craft" className="hover:text-[#c88a4b] transition-colors">Master Roasting Process</a></li>
              <li><a href="#philosophy" className="hover:text-[#c88a4b] transition-colors">Sustainability &amp; Ethics</a></li>
              <li><a href="#reserve" className="hover:text-[#c88a4b] transition-colors">Careers &amp; Internships</a></li>
            </ul>
          </div>

          {/* Col 3: CAFES */}
          <div>
            <h4 className="font-display text-white text-xs sm:text-sm tracking-[0.2em] uppercase mb-5 font-black">
              CAFES
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#94a3b8]">
              <li><a href="#rooftop" className="hover:text-[#c88a4b] transition-colors">Harrington Rd, Chennai (Flagship)</a></li>
              <li><a href="#rooftop" className="hover:text-[#c88a4b] transition-colors">Indiranagar, Bengaluru</a></li>
              <li><a href="#rooftop" className="hover:text-[#c88a4b] transition-colors">Bandra West, Mumbai</a></li>
              <li><a href="#rooftop" className="hover:text-[#c88a4b] transition-colors">Connaught Place, New Delhi</a></li>
              <li><a href="#rooftop" className="hover:text-[#c88a4b] transition-colors">Jubilee Hills, Hyderabad</a></li>
              <li><a href="#rooftop" className="hover:text-[#c88a4b] transition-colors">Koregaon Park, Pune</a></li>
            </ul>
          </div>

          {/* Col 4: CUSTOMER SUPPORT */}
          <div>
            <h4 className="font-display text-white text-xs sm:text-sm tracking-[0.2em] uppercase mb-5 font-black">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#94a3b8]">
              <li><a href="#reserve" className="hover:text-[#c88a4b] transition-colors">Track Your Order</a></li>
              <li><a href="#reserve" className="hover:text-[#c88a4b] transition-colors">Frequently Asked Questions</a></li>
              <li><a href="#reserve" className="hover:text-[#c88a4b] transition-colors">Shipping &amp; Delivery Terms</a></li>
              <li><a href="#reserve" className="hover:text-[#c88a4b] transition-colors">Returns &amp; Cancellations</a></li>
              <li><a href="#reserve" className="hover:text-[#c88a4b] transition-colors">Privacy Policy</a></li>
              <li><a href="#reserve" className="hover:text-[#c88a4b] transition-colors">Terms &amp; Conditions</a></li>
            </ul>
          </div>

          {/* Col 5: CONTACT & APP DOWNLOAD */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-display text-white text-xs sm:text-sm tracking-[0.2em] uppercase mb-5 font-black">
              CONTACT &amp; APP
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-[#94a3b8] mb-5">
              <p className="text-white font-bold">Harrington Road Roastery</p>
              <p className="leading-snug">No. 1, 13th Avenue, Chetpet, Chennai 600031</p>
              <p>Hotline: <a href="tel:07708811068" className="text-[#c88a4b] font-bold hover:underline">077088 11068</a></p>
              <p>Email: <a href="mailto:care@theopencup.com" className="text-[#c88a4b] font-bold hover:underline">care@theopencup.com</a></p>
            </div>

            {/* App download badges */}
            <div className="space-y-2">
              <div className="bg-[#1b2d3c] border border-[#2d4355] rounded-xl px-3 py-2 flex items-center gap-2 cursor-pointer hover:border-[#c88a4b] transition-colors">
                <Smartphone size={18} className="text-[#c88a4b]" />
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-[#64748b]">Download on</div>
                  <div className="text-xs font-bold text-white">Apple App Store</div>
                </div>
              </div>
              <div className="bg-[#1b2d3c] border border-[#2d4355] rounded-xl px-3 py-2 flex items-center gap-2 cursor-pointer hover:border-[#c88a4b] transition-colors">
                <Smartphone size={18} className="text-[#c88a4b]" />
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-[#64748b]">Get it on</div>
                  <div className="text-xs font-bold text-white">Google Play Store</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM LEGAL & SOCIAL */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            {/* Third wave style logo mark */}
            <div className="w-8 h-6 flex items-center justify-center text-[#c88a4b]">
              <svg viewBox="0 0 58 36" fill="none" className="w-7 h-5 stroke-current" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 9C4 9 7.5 30 27 30C46.5 30 50 9 50 9H4Z" />
                <path d="M12 16C17 19.5 23 13 31 16.5C37 19 40 16.5 42 14.5" strokeWidth="2.4" />
                <path d="M50 12.5H52.5C55 12.5 57 14.5 57 17C57 19.5 55 21.5 52.5 21.5H47" />
              </svg>
            </div>
            <span className="text-xs text-[#64748b]">
              &copy; {new Date().getFullYear()} The Open Cup Coffee Roasters India Pvt. Ltd. All rights reserved.
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-[#94a3b8]">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#1b2d3c] flex items-center justify-center hover:text-white hover:bg-[#c88a4b] transition-all" aria-label="Instagram">
              <Instagram size={14} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#1b2d3c] flex items-center justify-center hover:text-white hover:bg-[#c88a4b] transition-all" aria-label="Facebook">
              <Facebook size={14} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#1b2d3c] flex items-center justify-center hover:text-white hover:bg-[#c88a4b] transition-all" aria-label="Twitter">
              <Twitter size={14} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#1b2d3c] flex items-center justify-center hover:text-white hover:bg-[#c88a4b] transition-all" aria-label="LinkedIn">
              <Linkedin size={14} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-[#1b2d3c] flex items-center justify-center hover:text-white hover:bg-[#c88a4b] transition-all" aria-label="YouTube">
              <Youtube size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
