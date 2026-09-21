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
        className="w-full max-w-[680px] h-full max-h-[100dvh] flex flex-col overflow-y-auto p-5 sm:p-10 relative shadow-2xl"
        style={{
          background: "linear-gradient(180deg, #13131a 0%, #0c0c10 100%)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.14)",
          boxShadow: "-20px 0 60px rgba(0, 0, 0, 0.7)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-7 sm:right-7 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center cursor-pointer transition-all z-20 hover:bg-white/20"
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "#ffffff",
          }}
        >
          <X size={18} />
        </button>

        {/* Top Recipe Banner Card */}
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 pb-6 border-b border-white/10 items-center sm:items-start text-center sm:text-left mt-4 sm:mt-0">
          <img
            src={recipe.mainImage}
            alt={recipe.name}
            className="w-28 h-32 sm:w-32 sm:h-40 rounded-2xl object-cover shrink-0 shadow-xl"
            style={{
              boxShadow: `0 10px 30px ${recipe.glowColor}, 0 0 0 1px rgba(255,255,255,0.15)`
            }}
          />

          <div className="flex flex-col justify-center flex-1 min-w-0">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5">
              <span style={{
                fontFamily: "var(--font-hero)",
                fontSize: "12px",
                fontWeight: "800",
                color: recipe.accentLight
              }}>
                RECIPE {recipe.number}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-bold tracking-wider uppercase text-white/70">
                {recipe.difficulty}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 leading-tight">
              {recipe.name}
            </h2>

            <p className="text-xs sm:text-[13px] text-white/70 mb-3 sm:mb-4 leading-relaxed max-w-md">
              {recipe.description}
            </p>

            {/* Quick Metrics */}
            <div className="flex items-center justify-center sm:justify-start gap-4 flex-wrap text-xs text-white/90">
              <div className="flex items-center gap-1.5">
                <Clock size={13} color={recipe.accentLight} />
                <span>{recipe.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users size={13} color={recipe.accentLight} />
                <span>{recipe.servings}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Flame size={13} color={recipe.accentLight} />
                <span>{recipe.calories}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none my-5 shrink-0">
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
                className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all border"
                style={{
                  background: isActive ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.04)",
                  borderColor: isActive ? recipe.accentLight : "rgba(255, 255, 255, 0.08)",
                  color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.6)",
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
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 mb-5">
              <div className="flex items-center gap-3">
                <Clock size={20} color={recipe.accentLight} />
                <div>
                  <div className="text-[10px] text-white/50 uppercase tracking-wider">
                    Prep Timer
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white">
                    {formatTimer(timerSeconds)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setTimerRunning(!timerRunning)}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer border-none"
                  style={{
                    background: timerRunning ? "rgba(239, 68, 68, 0.2)" : recipe.accentLight,
                    color: timerRunning ? "#ef4444" : "#000000",
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
                  className="p-2 rounded-xl bg-white/10 text-white border-none cursor-pointer hover:bg-white/20"
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
                      padding: "16px 18px",
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {Object.entries(recipe.nutrition).map(([key, val]) => (
                <div
                  key={key}
                  className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 text-center"
                >
                  <div className="text-[10px] uppercase tracking-wider text-white/50 mb-1">
                    {key}
                  </div>
                  <div className="text-base sm:text-lg font-black" style={{ color: recipe.accentLight }}>
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
