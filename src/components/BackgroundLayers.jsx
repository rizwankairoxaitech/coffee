import React from "react";
import { RECIPES } from "../data/recipes";

export default function BackgroundLayers({ scrollProgress }) {
  // scrollProgress ranges from 0 to 2 (continuous)
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      overflow: "hidden",
      zIndex: 1,
      pointerEvents: "none"
    }}>
      {RECIPES.map((recipe, index) => {
        // Calculate distance from current scroll position
        const dist = Math.abs(scrollProgress - index);
        // Smooth crossfade curve
        const opacity = Math.max(0, Math.min(1, 1 - dist));
        // Dynamic continuous scale from 1.05 to 1.16
        const scale = 1.06 + Math.min(dist * 0.08, 0.12);

        return (
          <div
            key={recipe.id}
            style={{
              position: "absolute",
              inset: -20, // bleed edge to prevent scaling seams
              opacity: opacity,
              transform: `scale(${scale})`,
              transition: "opacity 0.1s ease-out, transform 0.1s ease-out",
              willChange: "opacity, transform"
            }}
          >
            {/* Base Photographic High-Res Layer */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${recipe.bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "brightness(0.65) contrast(1.1) saturate(1.15) blur(1.5px)"
              }}
            />

            {/* Tinted Gradient Atmospheric Overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: recipe.bgGradient
              }}
            />

            {/* Deep Vignette Mask to frame focus onto central hero */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse at 50% 50%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.75) 70%, #000000 100%)"
              }}
            />
          </div>
        );
      })}

      {/* Subtle Grain / Scanline Ambient Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          backgroundImage: "radial-gradient(circle at 50% 50%, #ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />
    </div>
  );
}
