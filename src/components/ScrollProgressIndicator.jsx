import React from "react";
import { RECIPES } from "../data/recipes";
import { ChevronDown } from "lucide-react";

export default function ScrollProgressIndicator({
  scrollProgress,
  onSelectRecipe
}) {
  const currentRecipe = RECIPES[Math.round(scrollProgress)] || RECIPES[0];

  return (
    <>
      {/* Right-Side Vertical Scrubber */}
      <div className="absolute right-3 sm:right-9 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3 sm:gap-4 pointer-events-auto">
        {RECIPES.map((recipe, index) => {
          const dist = Math.abs(scrollProgress - index);
          const isActive = dist < 0.5;

          return (
            <button
              key={recipe.id}
              onClick={() => onSelectRecipe(index)}
              title={`Jump to ${recipe.name}`}
              className="relative flex items-center bg-transparent border-none cursor-pointer p-1.5 focus:outline-none"
            >
              {/* Outer Indicator Ring */}
              <div
                style={{
                  width: isActive ? "26px" : "12px",
                  height: isActive ? "26px" : "12px",
                  borderRadius: "50%",
                  border: isActive ? `2px solid ${recipe.accentLight}` : "1.5px solid rgba(255, 255, 255, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  boxShadow: isActive ? `0 0 16px ${recipe.glowColor}` : "none",
                  background: isActive ? "rgba(255,255,255,0.08)" : "transparent"
                }}
              >
                {/* Core Dot */}
                <div
                  style={{
                    width: isActive ? "8px" : "4px",
                    height: isActive ? "8px" : "4px",
                    borderRadius: "50%",
                    background: isActive ? recipe.accentLight : "rgba(255, 255, 255, 0.4)",
                    transition: "all 0.3s ease"
                  }}
                />
              </div>

              {/* Hover Label (Shown on desktop only to avoid covering mobile viewport) */}
              <span
                className="hidden md:block absolute right-[38px] px-2.5 py-1 rounded-md bg-[#0f0f14]/85 border border-white/10 backdrop-blur-md text-[10px] font-bold tracking-wider uppercase text-white whitespace-nowrap pointer-events-none transition-all duration-300"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateX(0)" : "translateX(10px)",
                }}
              >
                {recipe.number} — {recipe.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Subtle Scroll Down Prompt at Bottom Center */}
      {scrollProgress < 1.8 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 pointer-events-none opacity-80 float-slow text-center px-4 w-full">
          <span className="text-[8px] sm:text-[9px] tracking-[0.22em] sm:tracking-[0.25em] uppercase font-bold text-white/70">
            SCROLL TO EXPLORE &middot; TAP DISH FOR RECIPE
          </span>
          <ChevronDown size={13} color={currentRecipe.accentLight} />
        </div>
      )}
    </>
  );
}
