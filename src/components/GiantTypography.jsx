import React, { useState, useEffect } from "react";
import { RECIPES } from "../data/recipes";

export default function GiantTypography({ scrollProgress }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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

        // Smooth centered crossfade as on Vercel deployment on desktop
        const opacity = Math.max(0, Math.min(1, 1 - dist * (isMobile ? 2.0 : 1.1)));
        const translateY = -delta * 50;
        const scale = 1 - dist * 0.05;

        // On desktop: exact Vercel giantTitle (["Cheesecake"])
        // On mobile: split into 2 lines for high-impact mobile sizing
        const titleLines = isMobile && recipe.id === "cheesecake"
          ? ["Cheese", "cake"]
          : recipe.giantTitle;

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
            {titleLines.map((line, lineIdx) => {
              const lineStagger = (lineIdx - (titleLines.length - 1) / 2) * 14;
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
