import React, { useState } from "react";
import { RECIPES } from "../data/recipes";

export default function FloatingIngredients({ scrollProgress }) {
  const [hoveredId, setHoveredId] = useState(null);

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
              // Gentle organic micro-offset per ingredient
              const offsetX = delta * ing.parallax.x * ing.speed * 0.4;
              const offsetY = delta * ing.parallax.y * ing.speed * 0.4;
              const rotation = ing.initial.rotate + delta * ing.parallax.rotate;
              const isHovered = hoveredId === ing.id;

              return (
                <div
                  key={ing.id}
                  onMouseEnter={() => setHoveredId(ing.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    position: "absolute",
                    left: ing.initial.x,
                    top: ing.initial.y,
                    width: `${ing.initial.size}px`,
                    height: `${ing.initial.size}px`,
                    transform: `translate3d(${offsetX}px, ${offsetY}px, 0) rotate(${rotation}deg) scale(${isHovered ? 1.25 : 1})`,
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
