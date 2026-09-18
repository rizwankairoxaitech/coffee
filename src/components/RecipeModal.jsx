import React, { useState } from "react";
import { X, Clock, Users, Flame, CheckCircle2, Circle, ChefHat, Play, Pause, RotateCcw, Award } from "lucide-react";
const confetti = () => {};
import { playChimeSound, playTickSound } from "../utils/audio";

export default function RecipeModal({ recipe, isOpen, onClose }) {
  if (!isOpen || !recipe) return null;

  const [activeTab, setActiveTab] = useState("ingredients"); // "ingredients" | "steps" | "nutrition"
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [completedSteps, setCompletedSteps] = useState({});
  
  // Quick Cooking Timer State
  const [timerSeconds, setTimerSeconds] = useState(180); // 3 mins default
  const [timerRunning, setTimerRunning] = useState(false);

  React.useEffect(() => {
    let interval = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      playChimeSound(880, 0.15);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const toggleIngredient = (idx) => {
    playTickSound();
    setCheckedIngredients((prev) => {
      const next = { ...prev, [idx]: !prev[idx] };
      // Check if all are checked
      const allChecked = recipe.ingredients.every((_, i) => (i === idx ? !prev[idx] : prev[i]));
      if (allChecked) {
        playChimeSound(660, 0.12);
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
      }
      return next;
    });
  };

  const toggleStep = (stepNum) => {
    playTickSound();
    setCompletedSteps((prev) => {
      const next = { ...prev, [stepNum]: !prev[stepNum] };
      const allDone = recipe.instructions.every((s) => (s.step === stepNum ? !prev[stepNum] : prev[s.step]));
      if (allDone) {
        playChimeSound(750, 0.15);
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.5 } });
      }
      return next;
    });
  };

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 200,
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      background: "rgba(5, 5, 8, 0.75)",
      backdropFilter: "blur(18px)",
      WebkitBackdropFilter: "blur(18px)"
    }} onClick={onClose}>
      {/* Slide-in Drawer Container */}
      <div
        style={{
          width: "100%",
          maxWidth: "680px",
          height: "100vh",
          background: "linear-gradient(180deg, #13131a 0%, #0c0c10 100%)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.14)",
          boxShadow: "-20px 0 60px rgba(0, 0, 0, 0.7)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          padding: "36px 40px",
          position: "relative"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "28px",
            right: "28px",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s ease"
          }}
        >
          <X size={20} />
        </button>

        {/* Top Recipe Banner Card */}
        <div style={{
          display: "flex",
          gap: "24px",
          paddingBottom: "28px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
          <img
            src={recipe.mainImage}
            alt={recipe.name}
            style={{
              width: "130px",
              height: "170px",
              borderRadius: "18px",
              objectFit: "cover",
              boxShadow: `0 10px 30px ${recipe.glowColor}, 0 0 0 1px rgba(255,255,255,0.15)`
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "6px"
            }}>
              <span style={{
                fontFamily: "var(--font-hero)",
                fontSize: "12px",
                fontWeight: "800",
                color: recipe.accentLight
              }}>
                RECIPE {recipe.number}
              </span>
              <span style={{
                padding: "2px 8px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.08)",
                fontSize: "10px",
                fontWeight: "700",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)"
              }}>
                {recipe.difficulty}
              </span>
            </div>

            <h2 style={{
              fontFamily: "var(--font-hero)",
              fontSize: "32px",
              fontWeight: "900",
              lineHeight: "1.1",
              color: "#ffffff",
              marginBottom: "8px"
            }}>
              {recipe.name}
            </h2>

            <p style={{
              fontSize: "13px",
              color: "rgba(255, 255, 255, 0.65)",
              marginBottom: "16px",
              lineHeight: "1.4"
            }}>
              {recipe.description}
            </p>

            {/* Quick Metrics */}
            <div style={{ display: "flex", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "rgba(255,255,255,0.85)" }}>
                <Clock size={14} color={recipe.accentLight} />
                <span>{recipe.time}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "rgba(255,255,255,0.85)" }}>
                <Users size={14} color={recipe.accentLight} />
                <span>{recipe.servings}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "rgba(255,255,255,0.85)" }}>
                <Flame size={14} color={recipe.accentLight} />
                <span>{recipe.calories}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: "flex",
          gap: "10px",
          marginTop: "24px",
          marginBottom: "24px"
        }}>
          {[
            { id: "ingredients", label: "Ingredients", count: recipe.ingredients.length },
            { id: "steps", label: "Method & Timer", count: recipe.instructions.length },
            { id: "nutrition", label: "Nutrition & Pairing" }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "10px 18px",
                  borderRadius: "12px",
                  background: isActive ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.04)",
                  border: isActive ? `1px solid ${recipe.accentLight}` : "1px solid rgba(255, 255, 255, 0.08)",
                  color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.6)",
                  fontFamily: "var(--font-hero)",
                  fontSize: "12px",
                  fontWeight: "700",
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                {tab.label} {tab.count && <span style={{ opacity: 0.6, marginLeft: "4px" }}>({tab.count})</span>}
              </button>
            );
          })}
        </div>

        {/* Tab Content 1: Ingredients Checklist */}
        {activeTab === "ingredients" && (
          <div>
            <div style={{
              fontSize: "12px",
              color: "rgba(255, 255, 255, 0.5)",
              marginBottom: "16px",
              display: "flex",
              justifyContent: "space-between"
            }}>
              <span>Tap to check off as you prepare:</span>
              <span style={{ color: recipe.accentLight }}>
                {Object.values(checkedIngredients).filter(Boolean).length} of {recipe.ingredients.length} ready
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {recipe.ingredients.map((ing, idx) => {
                const isChecked = !!checkedIngredients[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleIngredient(idx)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "14px 18px",
                      borderRadius: "14px",
                      background: isChecked ? "rgba(34, 197, 94, 0.08)" : "rgba(255, 255, 255, 0.03)",
                      border: isChecked ? "1px solid rgba(34, 197, 94, 0.35)" : "1px solid rgba(255, 255, 255, 0.08)",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      {isChecked ? (
                        <CheckCircle2 size={18} color="#22c55e" />
                      ) : (
                        <Circle size={18} color="rgba(255, 255, 255, 0.3)" />
                      )}
                      <span style={{
                        fontSize: "14px",
                        color: isChecked ? "rgba(255, 255, 255, 0.5)" : "#ffffff",
                        textDecoration: isChecked ? "line-through" : "none",
                        fontWeight: "500"
                      }}>
                        {ing.name}
                      </span>
                    </div>

                    <span style={{
                      fontSize: "13px",
                      fontWeight: "700",
                      color: isChecked ? "rgba(255, 255, 255, 0.4)" : recipe.accentLight,
                      letterSpacing: "0.04em"
                    }}>
                      {ing.amount}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab Content 2: Preparation Steps & Timer */}
        {activeTab === "steps" && (
          <div>
            {/* Interactive Cooking Timer Bar */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 20px",
              borderRadius: "16px",
              background: "rgba(255, 255, 255, 0.05)",
              border: `1px solid ${recipe.glowColor}`,
              marginBottom: "20px"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Clock size={20} color={recipe.accentLight} />
                <div>
                  <div style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.5)", textTransform: "uppercase" }}>
                    Prep Timer
                  </div>
                  <div style={{ fontFamily: "var(--font-hero)", fontSize: "22px", fontWeight: "900", color: "#ffffff" }}>
                    {formatTimer(timerSeconds)}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => setTimerRunning(!timerRunning)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "10px",
                    background: timerRunning ? "rgba(239, 68, 68, 0.2)" : recipe.accentLight,
                    color: timerRunning ? "#ef4444" : "#000000",
                    border: "none",
                    fontWeight: "700",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    cursor: "pointer"
                  }}
                >
                  {timerRunning ? <Pause size={14} /> : <Play size={14} />}
                  <span>{timerRunning ? "Pause" : "Start"}</span>
                </button>

                <button
                  onClick={() => {
                    setTimerRunning(false);
                    setTimerSeconds(180);
                  }}
                  style={{
                    padding: "8px",
                    borderRadius: "10px",
                    background: "rgba(255, 255, 255, 0.08)",
                    color: "#ffffff",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>

            {/* Steps List */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {recipe.instructions.map((step) => {
                const isDone = !!completedSteps[step.step];
                return (
                  <div
                    key={step.step}
                    onClick={() => toggleStep(step.step)}
                    style={{
                      padding: "18px 20px",
                      borderRadius: "16px",
                      background: isDone ? "rgba(34, 197, 94, 0.06)" : "rgba(255, 255, 255, 0.03)",
                      border: isDone ? "1px solid rgba(34, 197, 94, 0.3)" : "1px solid rgba(255, 255, 255, 0.08)",
                      cursor: "pointer",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                      <div style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        background: isDone ? "#22c55e" : recipe.accentLight,
                        color: "#000000",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "var(--font-hero)",
                        fontSize: "13px",
                        fontWeight: "900"
                      }}>
                        {step.step}
                      </div>

                      <h4 style={{
                        fontSize: "15px",
                        fontWeight: "700",
                        color: isDone ? "rgba(255, 255, 255, 0.6)" : "#ffffff"
                      }}>
                        {step.title}
                      </h4>
                    </div>

                    <p style={{
                      fontSize: "13px",
                      lineHeight: "1.6",
                      color: isDone ? "rgba(255, 255, 255, 0.45)" : "rgba(255, 255, 255, 0.75)",
                      paddingLeft: "40px"
                    }}>
                      {step.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab Content 3: Nutrition & Sommelier Tips */}
        {activeTab === "nutrition" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Nutritional Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "12px"
            }}>
              {Object.entries(recipe.nutrition).map(([key, val]) => (
                <div
                  key={key}
                  style={{
                    padding: "16px 12px",
                    borderRadius: "14px",
                    background: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    textAlign: "center"
                  }}
                >
                  <div style={{
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "rgba(255, 255, 255, 0.5)",
                    marginBottom: "6px"
                  }}>
                    {key}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-hero)",
                    fontSize: "18px",
                    fontWeight: "900",
                    color: recipe.accentLight
                  }}>
                    {val}
                  </div>
                </div>
              ))}
            </div>

            {/* Sommelier Tasting Advice */}
            <div style={{
              padding: "20px",
              borderRadius: "16px",
              background: "rgba(255, 255, 255, 0.03)",
              border: `1px solid ${recipe.glowColor}`,
              display: "flex",
              gap: "14px"
            }}>
              <Award size={24} color={recipe.accentLight} style={{ flexShrink: 0, marginTop: "2px" }} />
              <div>
                <h4 style={{
                  fontFamily: "var(--font-hero)",
                  fontSize: "14px",
                  fontWeight: "800",
                  color: "#ffffff",
                  marginBottom: "6px"
                }}>
                  Atelier Sommelier Note
                </h4>
                <p style={{
                  fontSize: "13px",
                  lineHeight: "1.6",
                  color: "rgba(255, 255, 255, 0.7)"
                }}>
                  {recipe.sommelierTip}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
