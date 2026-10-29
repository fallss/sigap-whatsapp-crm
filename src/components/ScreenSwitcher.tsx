"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { STITCH_SCREENS, StitchScreen } from "@/data/screens";

export default function ScreenSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<string>("Semua");
  const pathname = usePathname();

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const currentScreen = STITCH_SCREENS.find((s) => {
    if (s.route === "/dashboard" && (pathname === "/" || pathname === "/dashboard")) {
      return true;
    }
    return pathname === s.route;
  });

  const categories = ["Semua", "Auth", "Onboarding", "Aplikasi Utama", "Admin"];

  const filteredScreens = filter === "Semua"
    ? STITCH_SCREENS
    : STITCH_SCREENS.filter((s) => s.category === filter);

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-20 sm:bottom-4 right-3 sm:right-4 z-40 flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#0d4a3b] text-white shadow-xl hover:bg-[#0a3a2e] border border-emerald-500/30 transition-all font-medium text-xs backdrop-blur-md"
        >
          <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-bold hidden xs:inline">Stitch Screens</span>
          <span className="font-bold xs:hidden">Screens</span>
          <span className="bg-emerald-500 text-white font-extrabold text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full">
            16 / 16
          </span>
          {currentScreen && (
            <span className="hidden md:inline-block max-w-[130px] truncate text-emerald-200 text-[11px] border-l border-emerald-700/60 pl-2">
              #{currentScreen.number} {currentScreen.shortTitle}
            </span>
          )}
        </motion.button>
      </div>

      {/* Modal Overlay & Selector */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[88vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-6 pb-3 sm:pb-4 bg-gradient-to-r from-[#0d4a3b] to-[#125e4c] text-white flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-400 text-[#0d4a3b] flex items-center justify-center font-black text-sm shrink-0">
                      S
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                      16 Screens Stitch Project Clone
                    </h3>
                  </div>
                  <p className="text-[11px] text-emerald-200/90 mt-1 font-mono">
                    Project ID: 12390023088494410686
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm transition shrink-0 ml-2"
                >
                  ✕
                </button>
              </div>

              {/* Filter Tabs */}
              <div className="px-4 sm:px-6 py-2.5 border-b border-slate-100 flex items-center gap-1.5 sm:gap-2 overflow-x-auto bg-slate-50">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      filter === cat
                        ? "bg-[#0d4a3b] text-white shadow-xs"
                        : "bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200/70"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Screen List Grid */}
              <div className="p-3.5 sm:p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                {filteredScreens.map((screen: StitchScreen) => {
                  const isActive =
                    (screen.route === "/dashboard" &&
                      (pathname === "/" || pathname === "/dashboard")) ||
                    pathname === screen.route;

                  return (
                    <Link
                      key={screen.id}
                      href={screen.route}
                      onClick={() => setIsOpen(false)}
                      className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-150 group ${
                        isActive
                          ? "bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm"
                          : "bg-white border-slate-200 hover:border-emerald-300 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 ${
                              isActive
                                ? "bg-[#0d4a3b] text-white"
                                : "bg-slate-100 text-slate-700 group-hover:bg-emerald-100 group-hover:text-emerald-800"
                            }`}
                          >
                            {screen.number}
                          </span>
                          <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                            {screen.category}
                          </span>
                        </div>
                        {isActive && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            Sedang Dibuka
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-xs text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                        {screen.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {screen.description}
                      </p>

                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
                        <span className="truncate max-w-[140px]">ID: {screen.id}</span>
                        <span className="text-emerald-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                          {screen.route} →
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-6">
                <span>Tekan <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px] font-mono">Esc</kbd> untuk menutup</span>
                <span className="font-medium text-[#0d4a3b]">Next.js · Tailwind CSS · Framer Motion</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
