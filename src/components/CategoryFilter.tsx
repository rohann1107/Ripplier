import React, { useRef, useState, useEffect } from "react";
import type { Category, Difficulty } from "../types";
import { CATEGORIES } from "../data/topics";
import { audioEngine } from "../utils/audioEngine";
import {
  ChevronDown,
  Check,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (cat: Category | "All") => void;
  selectedDifficulty: Difficulty | "All";
  onSelectDifficulty: (diff: Difficulty | "All") => void;
}

const DIFFICULTIES: (Difficulty | "All")[] = [
  "All",
  "Easy",
  "Medium",
  "Hard",
  "Extreme",
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedDifficulty,
  onSelectDifficulty,
}) => {

  const dropdownRef = useRef<HTMLDivElement>(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-2 my-3 flex flex-col gap-3">

      {/* Difficulty */}
      <div className="flex items-center justify-center gap-1 overflow-x-auto no-scrollbar whitespace-nowrap">

        <span className="text-xs font-mono uppercase text-[#666666] mr-2 ">
          LEVEL:
        </span>

        {DIFFICULTIES.map((diff) => {

          const active = selectedDifficulty === diff;

          return (
            <button
              key={diff}
              onClick={() => {
                audioEngine.playClickSound();
                onSelectDifficulty(diff);
              }}
              className={`px-2 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono whitespace-nowrap transition-all cursor-pointer border ${active
                ? "bg-[#C58A55]/15 border-[#C58A55] text-[#C58A55] shadow-glow-gold"
                : "bg-[#181818] border-white/[0.08] text-[#AAAAAA] hover:text-[#F5F2EC] hover:border-white/[0.2]"
                }`}
            >
              {diff}
            </button>
          );
        })}

      </div>

      {/* Category Dropdown */}
      <div
        ref={dropdownRef}
        className="relative w-full mt-5"
      >

        <button
          onClick={() => {
            audioEngine.playClickSound();
            setDropdownOpen(!dropdownOpen);
          }}
          className="w-full h-12 px-4 rounded-xl bg-[#111111] border border-white/[0.08] flex items-center justify-between text-[#F5F2EC] hover:border-[#C58A55]/40 transition-all"
        >

          <span className="font-mono text-sm truncate">
            {selectedCategory === "All"
              ? "🌐 All Topics"
              : selectedCategory}
          </span>

          <ChevronDown
            className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""
              }`}
          />

        </button>

        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="absolute left-0 right-0 top-[54px] z-50 rounded-xl border border-white/[0.08] bg-[#111111] shadow-2xl overflow-hidden"
            >
              <div className="max-h-72 overflow-y-auto no-scrollbar">

                {CATEGORIES.map((cat) => {

                  const active = selectedCategory === cat;

                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        audioEngine.playClickSound();
                        onSelectCategory(cat as Category | "All");
                        setDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-3 flex items-center justify-between text-left transition-all ${active
                        ? "bg-[#C58A55]/15 text-[#C58A55]"
                        : "text-[#F5F2EC] hover:bg-white/[0.04]"
                        }`}
                    >
                      <span className="font-mono text-sm">
                        {cat === "All"
                          ? "🌐 All Topics"
                          : cat}
                      </span>

                      {active && (
                        <Check className="w-4 h-4" />
                      )}
                    </button>
                  );

                })}

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Active Niche */}
      <div className="flex items-center justify-center mt-2 text-xs font-mono text-[#AAAAAA]">

        <Layers className="w-3.5 h-3.5 text-[#C58A55] mr-2" />

        <span>
          Current Niche:
          <span className="text-[#C58A55] ml-1">
            {selectedCategory}
          </span>
        </span>

      </div>

    </div>
  );
};