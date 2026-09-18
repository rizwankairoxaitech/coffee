import React from 'react';

export default function MarqueeTicker({ inverted = false, items }) {
  const defaultItems = [
    '★ 4.7 RATED ON GOOGLE',
    'SLOW-SMOKED BRISKET & CHIMICHURRI',
    'ETHIOPIAN YIRGACHEFFE ROASTED IN-HOUSE',
    'PET-FRIENDLY ROOFTOP #PETFRIENDLY',
    '10% FLAT STUDENT & CORPORATE ID DISCOUNT',
    'SIZZLING CAST-IRON SHAKSHOUKAH',
    'SAN SEBASTIAN BURNT BASQUE CHEESECAKE',
    'HARRINGTON ROAD, CHETPET, CHENNAI',
  ];

  const displayList = items || defaultItems;

  return (
    <div
      className="overflow-hidden py-3 whitespace-nowrap select-none border-y border-neutral-300/80 bg-[#dbe0e7] text-neutral-900 relative"
      aria-hidden="true"
    >
      <div className="inline-flex items-center gap-10 animate-marquee">
        {[...displayList, ...displayList, ...displayList].map((text, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 font-display text-base tracking-wider uppercase text-neutral-900"
          >
            <span className="text-amber-700">
              ✦
            </span>
            <span className="font-extrabold">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
