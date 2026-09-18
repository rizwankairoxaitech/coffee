import React from "react";
import { RECIPES } from "../data/recipes";

export default function GiantTypography({ scrollProgress }) {
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2,
      pointerEvents: "none",
      overflow: "hidden"
    }}>
      {RECIPES.map((recipe, index) => {
        const delta = scrollProgress - index;
        const dist = Math.abs(delta);

        if (dist >= 1.0) return null;

        // Smooth centered crossfade with subtle vertical breathing
        const opacity = Math.max(0, Math.min(1, 1 - dist * 1.1));
        const translateY = -delta * 50;
        const scale = 1 - dist * 0.05;

        return (
          <div
            key={recipe.id}
            style={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              opacity: opacity,
              transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
              transition: "transform 0.08s ease-out, opacity 0.08s ease-out",
              willChange: "transform, opacity"
            }}
          >
            {recipe.giantTitle.map((line, lineIdx) => {
              const lineStagger = (lineIdx - (recipe.giantTitle.length - 1) / 2) * 14;
              const yOffset = delta * lineStagger;

              return (
                <div
                  key={lineIdx}
                  className="giant-typography"
                  style={{
                    transform: `translateY(${yOffset}px)`,
                    letterSpacing: "0.01em",
                    color: "#ffffff",
                    textShadow: "0 20px 50px rgba(0, 0, 0, 0.75), 0 4px 15px rgba(0, 0, 0, 0.5)"
                  }}
                >
                  {line}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
