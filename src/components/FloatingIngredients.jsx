import React, { useState } from "react";
import { RECIPES } from "../data/recipes";

export default function FloatingIngredients({ scrollProgress }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div style={{
      position: "absolute",
      inset: 0,
      zIndex: 6,
      pointerEvents: "none",
      overflow: "hidden"
    }}>
      {RECIPES.map((recipe, recipeIdx) => {
        const delta = scrollProgress - recipeIdx;
        const dist = Math.abs(delta);

        // Completely hide and unmount once dist >= 1.0 so ingredients NEVER linger
        if (dist >= 1.0) return null;

        // Dedicated resting space around center:
        // Between -0.15 and +0.15, ingredients float stably in their designated positions
        const deadzone = 0.15;
        let t = 0;
        if (dist > deadzone) {
          t = Math.min(1, (dist - deadzone) / (1.0 - deadzone));
        }

        const eased = t * t * (3 - 2 * t);
        const sign = delta > 0 ? 1 : -1;

        // TOP-TO-BOTTOM travel:
        // Exiting recipe (delta > 0): falls DOWNWARDS towards the bottom (+120vh) and hides
        // Entering recipe (delta < 0): descends from above the TOP (-120vh) down into center (0vh)
        const sweepY = sign * eased * 120; // in vh units
        const groupOpacity = Math.max(0, 1 - Math.pow(t, 2.5));

        return (
          <div
            key={recipe.id}
            style={{
              position: "absolute",
              inset: 0,
              opacity: groupOpacity,
              transform: `translate3d(0, ${sweepY}vh, 0)`,
              transition: "transform 0.08s ease-out, opacity 0.08s ease-out",
              willChange: "transform, opacity"
            }}
          >
            {recipe.floatingIngredients.map((ing) => {
              // Mobile-specific position overrides (leaves desktop 100% untouched)
              const posX = isMobile && ing.mobile?.x ? ing.mobile.x : ing.initial.x;
              const posY = isMobile && ing.mobile?.y ? ing.mobile.y : ing.initial.y;
              const itemSize = isMobile && ing.mobile?.size ? ing.mobile.size : ing.initial.size;
              const itemRotate = isMobile && ing.mobile?.rotate !== undefined ? ing.mobile.rotate : ing.initial.rotate;

              // Gentle organic micro-offset per ingredient (0.4 on desktop as originally deployed)
              const offsetFactor = isMobile ? 0.14 : 0.4;
              const offsetX = delta * ing.parallax.x * ing.speed * offsetFactor;
              const offsetY = delta * ing.parallax.y * ing.speed * offsetFactor;
              const rotation = itemRotate + delta * ing.parallax.rotate;
              const isHovered = hoveredId === ing.id;
              const scale = isMobile ? (ing.mobile?.scale || 0.58) * (isHovered ? 1.25 : 1) : (isHovered ? 1.25 : 1);

              return (
                <div
                  key={ing.id}
                  onMouseEnter={() => setHoveredId(ing.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    position: "absolute",
                    left: posX,
                    top: posY,
                    width: `${itemSize}px`,
                    height: `${itemSize}px`,
                    transformOrigin: "center center",
                    transform: isMobile
                      ? `translate3d(${offsetX}px, ${offsetY}px, 0) translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`
                      : `translate3d(${offsetX}px, ${offsetY}px, 0) rotate(${rotation}deg) scale(${scale})`,
                    transition: "transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)",
                    filter: `
                      drop-shadow(0 20px 30px rgba(0, 0, 0, 0.7))
                      drop-shadow(0 6px 12px rgba(0, 0, 0, 0.5))
                      ${ing.blur ? `blur(${ing.blur})` : ""}
                    `,
                    pointerEvents: groupOpacity > 0.8 ? "auto" : "none",
                    cursor: "pointer",
                    willChange: "transform"
                  }}
                  className={ing.id.includes("1") ? "float-slow" : "float-fast"}
                  title={ing.name}
                >
                  <img
                    src={ing.src}
                    alt={ing.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      pointerEvents: "none",
                      userSelect: "none"
                    }}
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
