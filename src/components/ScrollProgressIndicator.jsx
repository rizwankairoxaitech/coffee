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
      <div style={{
        position: "absolute",
        right: "36px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        pointerEvents: "auto"
      }}>
        {RECIPES.map((recipe, index) => {
          const dist = Math.abs(scrollProgress - index);
          const isActive = dist < 0.5;

          return (
            <button
              key={recipe.id}
              onClick={() => onSelectRecipe(index)}
              title={`Jump to ${recipe.name}`}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "6px"
              }}
            >
              {/* Outer Indicator Ring */}
              <div style={{
                width: isActive ? "28px" : "12px",
                height: isActive ? "28px" : "12px",
                borderRadius: "50%",
                border: isActive ? `2px solid ${recipe.accentLight}` : "1.5px solid rgba(255, 255, 255, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: isActive ? `0 0 16px ${recipe.glowColor}` : "none",
                background: isActive ? "rgba(255,255,255,0.08)" : "transparent"
              }}>
                {/* Core Dot */}
                <div style={{
                  width: isActive ? "8px" : "4px",
                  height: isActive ? "8px" : "4px",
                  borderRadius: "50%",
                  background: isActive ? recipe.accentLight : "rgba(255, 255, 255, 0.4)",
                  transition: "all 0.3s ease"
                }} />
              </div>

              {/* Hover Label */}
              <span style={{
                position: "absolute",
                right: "38px",
                padding: "4px 10px",
                borderRadius: "6px",
                background: "rgba(15, 15, 20, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                fontSize: "10px",
                fontWeight: "700",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#ffffff",
                whiteSpace: "nowrap",
                opacity: isActive ? 1 : 0,
                transform: isActive ? "translateX(0)" : "translateX(10px)",
                transition: "all 0.3s ease",
                pointerEvents: "none"
              }}>
                {recipe.number} — {recipe.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Subtle Scroll Down Prompt at Bottom Center */}
      {scrollProgress < 1.8 && (
        <div style={{
          position: "absolute",
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
          pointerEvents: "none",
          opacity: 0.65,
          animation: "ambientFloatSlow 3s ease-in-out infinite"
        }}>
          <span style={{
            fontSize: "9px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontWeight: "700",
            color: "rgba(255, 255, 255, 0.55)"
          }}>
            SCROLL TO EXPLORE
          </span>
          <ChevronDown size={14} color={currentRecipe.accentLight} />
        </div>
      )}
    </>
  );
}
