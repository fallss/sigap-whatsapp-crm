"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface AdminSidebarProps {
  current?: "Paket" | "Usaha";
}

export default function AdminSidebar({ current }: AdminSidebarProps) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  return (
    <>
      {/* =========================================================================
          DESKTOP ADMIN SIDEBAR
          ========================================================================= */}
      <aside
        className="hidden lg:flex w-64 bg-[#0b3e31] text-white flex-col justify-between shrink-0 min-h-screen sticky top-0 h-screen overflow-y-auto border-r border-[#09352a]"
        data-purpose="admin-sidebar"
      >
        <div className="p-6">
          {/* Brand Logo & Title */}
          <Link href="/dashboard" className="flex items-center space-x-3 mb-9 group">
            <div className="w-9 h-9 rounded-xl bg-white text-[#0b3e31] font-bold text-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              S
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white leading-none">Sigap</h1>
              <p className="text-[10px] font-semibold text-emerald-300 tracking-wider uppercase mt-1">
                Panel Admin Internal
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav aria-label="Admin Navigation" className="space-y-1.5">
            {/* Menu: Paket */}
            <Link
              href="/admin/templates"
              className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-all text-sm font-medium ${
                pathname.startsWith("/admin/templates")
                  ? "bg-white/15 text-white font-semibold shadow-sm"
                  : "text-emerald-100 hover:text-white hover:bg-white/5"
              }`}
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect height="7" rx="1.5" width="7" x="3" y="3"></rect>
                <rect height="7" rx="1.5" width="7" x="14" y="3"></rect>
                <rect height="7" rx="1.5" width="7" x="14" y="14"></rect>
                <rect height="7" rx="1.5" width="7" x="3" y="14"></rect>
              </svg>
              <span>Paket Template</span>
            </Link>

            {/* Menu: Usaha */}
            <Link
              href="/admin/businesses"
              className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-all text-sm font-medium ${
                pathname.startsWith("/admin/businesses")
                  ? "bg-white/15 text-white font-semibold shadow-sm"
                  : "text-emerald-100 hover:text-white hover:bg-white/5"
              }`}
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <span>Usaha Pengguna</span>
            </Link>

            {/* Menu: Keluar ke dasbor pemilik */}
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-emerald-100 hover:text-white hover:bg-white/5 transition-all text-sm font-medium mt-4 pt-3 border-t border-emerald-800/40"
            >
              <svg className="w-5 h-5 shrink-0 text-emerald-200/80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
              <span className="truncate">Kembali ke Dasbor</span>
            </Link>
          </nav>
        </div>

        {/* Bottom User Profile Area */}
        <div className="p-5 border-t border-emerald-900/60" data-purpose="user-badge">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700/60 text-emerald-200 text-xs font-semibold flex items-center justify-center">
              D
            </div>
            <div className="leading-tight">
              <p className="text-xs font-bold text-white">Daffa P.</p>
              <p className="text-[11px] text-emerald-300/80">Admin Sigap Internal</p>
            </div>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          MOBILE TOP APP BAR FOR ADMIN
          ========================================================================= */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#0b3e31] text-white z-40 px-4 flex items-center justify-between shadow-md border-b border-emerald-800/50">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Buka menu admin"
            className="w-9 h-9 rounded-xl bg-[#145543] active:bg-[#1c5e4c] text-emerald-100 flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white text-[#0b3e31] flex items-center justify-center font-bold text-sm">
              S
            </div>
            <span className="font-extrabold text-base tracking-tight text-white">Admin Sigap</span>
          </div>
        </div>

        <Link
          href="/dashboard"
          className="text-xs font-medium text-emerald-200 bg-emerald-900/60 px-3 py-1.5 rounded-lg border border-emerald-700/50 hover:text-white"
        >
          Ke Toko →
        </Link>
      </header>

      {/* =========================================================================
          MOBILE SLIDE-OVER DRAWER FOR ADMIN
          ========================================================================= */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
              className="relative w-[280px] max-w-[85vw] bg-[#0b3e31] text-white h-full flex flex-col justify-between p-5 shadow-2xl z-10 overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-emerald-800/50 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white text-[#0b3e31] font-bold text-base flex items-center justify-center">
                      S
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white leading-none">Sigap</h3>
                      <p className="text-[10px] text-emerald-300 font-semibold uppercase mt-0.5">Admin Panel</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="w-8 h-8 rounded-lg bg-emerald-900/60 text-emerald-200 flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>

                <nav className="flex flex-col gap-1.5 text-sm font-medium">
                  <Link
                    href="/admin/templates"
                    onClick={() => setDrawerOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${
                      pathname.startsWith("/admin/templates")
                        ? "bg-white/15 text-white font-semibold"
                        : "text-emerald-100 hover:bg-white/5"
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect height="7" rx="1.5" width="7" x="3" y="3"></rect>
                      <rect height="7" rx="1.5" width="7" x="14" y="3"></rect>
                      <rect height="7" rx="1.5" width="7" x="14" y="14"></rect>
                      <rect height="7" rx="1.5" width="7" x="3" y="14"></rect>
                    </svg>
                    <span>Paket Template</span>
                  </Link>

                  <Link
                    href="/admin/businesses"
                    onClick={() => setDrawerOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition ${
                      pathname.startsWith("/admin/businesses")
                        ? "bg-white/15 text-white font-semibold"
                        : "text-emerald-100 hover:bg-white/5"
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    <span>Usaha Pengguna</span>
                  </Link>

                  <Link
                    href="/dashboard"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-emerald-100 hover:bg-white/5 mt-3 pt-3 border-t border-emerald-800/40"
                  >
                    <svg className="w-5 h-5 text-emerald-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    <span>Kembali ke Dasbor Toko</span>
                  </Link>
                </nav>
              </div>

              <div className="p-4 border-t border-emerald-800/50 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700/60 text-emerald-200 text-xs font-semibold flex items-center justify-center">
                  D
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Daffa P.</p>
                  <p className="text-[10px] text-emerald-300/80">Admin Sigap Internal</p>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          MOBILE ADMIN BOTTOM BAR
          ========================================================================= */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0b3e31] text-white border-t border-emerald-800/50 z-30 flex items-center justify-around px-4 shadow-lg select-none">
        <Link
          href="/admin/templates"
          className={`flex flex-col items-center justify-center w-24 py-1 rounded-xl text-xs ${
            pathname.startsWith("/admin/templates") ? "text-emerald-300 font-bold" : "text-emerald-100/70"
          }`}
        >
          <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect height="7" rx="1.5" width="7" x="3" y="3"></rect>
            <rect height="7" rx="1.5" width="7" x="14" y="3"></rect>
            <rect height="7" rx="1.5" width="7" x="14" y="14"></rect>
            <rect height="7" rx="1.5" width="7" x="3" y="14"></rect>
          </svg>
          <span>Paket</span>
        </Link>

        <Link
          href="/admin/businesses"
          className={`flex flex-col items-center justify-center w-24 py-1 rounded-xl text-xs ${
            pathname.startsWith("/admin/businesses") ? "text-emerald-300 font-bold" : "text-emerald-100/70"
          }`}
        >
          <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <span>Usaha</span>
        </Link>

        <Link
          href="/dashboard"
          className="flex flex-col items-center justify-center w-24 py-1 rounded-xl text-xs text-emerald-200/80 hover:text-white"
        >
          <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
          <span>Ke Toko</span>
        </Link>
      </nav>
    </>
  );
}
