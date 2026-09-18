import React, { useState, useEffect } from "react";
import { RECIPES } from "../data/recipes";

export default function HeroRecipeCard({ scrollProgress, onOpenRecipe }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const normY = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
      setMousePos({ x: normX, y: normY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 5,
      pointerEvents: "none",
      overflow: "hidden"
    }}>
      {RECIPES.map((recipe, index) => {
        const delta = scrollProgress - index;
        const dist = Math.abs(delta);

        // Completely off screen once dist >= 1.0
        if (dist >= 1.0) return null;

        // Dedicated resting space around center:
        // Between -0.15 and +0.15, the recipe sits stably in center
        const deadzone = 0.15;
        let t = 0;
        if (dist > deadzone) {
          t = Math.min(1, (dist - deadzone) / (1.0 - deadzone));
        }

        // Smooth cubic ease for fluid cinematic trajectory
        const eased = t * t * (3 - 2 * t);
        const sign = delta > 0 ? 1 : -1;

        // Moves FULL RIGHT (+120vw) when leaving, enters from FULL LEFT (-120vw) into center (0vw)
        const translateX = sign * eased * 120; // in vw
        const translateY = Math.sin(t * Math.PI) * -20; // subtle arc
        const opacity = Math.max(0, 1 - Math.pow(t, 2.5));
        const scale = 1 - t * 0.15;
        const rotateZ = sign * eased * 12;

        // Interactive 3D mouse perspective tilt
        const tiltX = -mousePos.y * 6;
        const tiltY = mousePos.x * 6;

        return (
          <div
            key={recipe.id}
            onClick={() => onOpenRecipe(index)}
            style={{
              position: "absolute",
              opacity: opacity,
              transform: `translate3d(${translateX}vw, ${translateY}px, 0) scale(${scale}) rotate(${rotateZ}deg)`,
              transition: "transform 0.08s ease-out, opacity 0.08s ease-out",
              willChange: "transform, opacity",
              pointerEvents: opacity > 0.8 ? "auto" : "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {/* 3D Perspective Container */}
            <div
              style={{
                perspective: "1200px",
                transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {/* Soft Ambient Colored Glow Behind Dish */}
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${recipe.glowColor} 0%, transparent 70%)`,
                  opacity: 0.75,
                  filter: "blur(45px)",
                  zIndex: 0,
                  pointerEvents: "none"
                }}
              />

              {/* Floating Cutout Food Image (Large Centerpiece) */}
              <div
                className="float-slow"
                style={{
                  position: "relative",
                  width: "clamp(520px, 50vw, 850px)",
                  height: "clamp(540px, 72vh, 860px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 1
                }}
              >
                <img
                  src={recipe.mainImage}
                  alt={recipe.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    transform: `scale(1.15) translate(${mousePos.x * -8}px, ${mousePos.y * -8}px)`,
                    filter: `
                      drop-shadow(0 35px 50px rgba(0, 0, 0, 0.8))
                      drop-shadow(0 15px 25px rgba(0, 0, 0, 0.6))
                      drop-shadow(0 0 45px ${recipe.glowColor})
                    `,
                    transition: "transform 0.2s ease-out",
                    userSelect: "none",
                    pointerEvents: "auto"
                  }}
                  draggable={false}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
