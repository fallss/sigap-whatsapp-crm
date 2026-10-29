"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  current?: string;
}

export default function Sidebar({ current }: SidebarProps) {
  const pathname = usePathname();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Close drawer on route change or Escape
  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileDrawerOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileDrawerOpen]);

  const navItems = [
    {
      name: "Beranda",
      href: "/dashboard",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      name: "Inbox",
      href: "/inbox",
      badge: "3",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a.75.75 0 0 1-.974-.94 4.025 4.025 0 0 0 .524-1.782C3.393 16.702 3 14.475 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      name: "Pelanggan",
      href: "/customers",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      name: "Pengingat",
      href: "/reminders",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      name: "Laporan",
      href: "/analytics",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      name: "Template",
      href: "/templates",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1 13.5 18v-2.25Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      name: "Paket Langganan",
      href: "/pricing",
      icon: (
        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  const isCurrentActive = (item: typeof navItems[0]) => {
    return (
      current === item.name ||
      (item.href === "/dashboard" && (pathname === "/" || pathname === "/dashboard")) ||
      (item.href !== "/dashboard" && pathname.startsWith(item.href))
    );
  };

  return (
    <>
      {/* =========================================================================
          DESKTOP SIDEBAR (Visible only on lg and larger screens)
          ========================================================================= */}
      <aside
        className="hidden lg:flex w-64 bg-[#0d4a3b] text-white shrink-0 flex-col justify-between min-h-screen px-4 py-6 select-none sticky top-0 h-screen overflow-y-auto border-r border-[#0a3a2e]"
        data-purpose="desktop-sidebar"
      >
        {/* Top Part: Logo & Main Navigation */}
        <div className="flex flex-col gap-6">
          {/* App Brand / Logo */}
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-1 group" data-purpose="brand-logo">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center font-bold text-xl text-white shadow-sm ring-2 ring-emerald-400/30 group-hover:scale-105 transition-transform">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight leading-none text-white">Sigap</span>
              <span className="text-[9.5px] uppercase tracking-wider text-emerald-300 font-semibold mt-1">
                Asisten CS WhatsApp
              </span>
            </div>
          </Link>

          {/* Navigation Menu */}
          <nav className="flex flex-col gap-1.5 mt-2 font-medium text-sm" data-purpose="main-navigation">
            {navItems.map((item) => {
              const isActive = isCurrentActive(item);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-150 ${
                    isActive
                      ? "bg-[#1c5e4c] text-white font-semibold shadow-inner"
                      : "text-emerald-100 hover:bg-[#145543] hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="w-5 h-5 text-xs bg-emerald-500 font-bold rounded-full flex items-center justify-center text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Part: Settings & User Profile */}
        <div className="flex flex-col gap-3 pt-4 border-t border-emerald-800/40" data-purpose="sidebar-footer">
          {/* Admin Link */}
          <Link
            href="/admin/businesses"
            className={`flex items-center gap-3 px-3 py-2 text-xs text-emerald-200/80 hover:text-white rounded-lg hover:bg-[#145543] transition-colors ${
              pathname.startsWith("/admin") ? "bg-[#1c5e4c] text-white font-semibold" : ""
            }`}
          >
            <svg className="w-4 h-4 opacity-75 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Admin Internal</span>
          </Link>

          {/* Pengaturan */}
          <Link
            href="/settings"
            className={`flex items-center gap-3 px-3 py-2 text-sm text-emerald-100 hover:text-white rounded-lg hover:bg-[#145543] transition-colors ${
              pathname === "/settings" ? "bg-[#1c5e4c] text-white font-semibold" : ""
            }`}
          >
            <svg className="w-5 h-5 opacity-80 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Pengaturan</span>
          </Link>

          {/* Account / Store Profile Badge */}
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl bg-black/10" data-purpose="profile-card">
            <div className="w-8 h-8 rounded-full bg-emerald-700 border border-emerald-500/30 flex items-center justify-center font-bold text-sm text-emerald-100 shrink-0">
              A
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-semibold text-white truncate">Barbershop Rapi Bro</span>
              <span className="text-[10px] text-emerald-300 truncate">Pak Andi · Paket Plus</span>
            </div>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          MOBILE TOP APP BAR (Visible on screens < lg)
          ========================================================================= */}
      <header
        className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#0d4a3b] text-white z-40 px-3.5 sm:px-4 flex items-center justify-between shadow-md border-b border-emerald-800/50 select-none"
        data-purpose="mobile-top-bar"
      >
        <div className="flex items-center gap-2.5">
          {/* Hamburger Drawer Toggle Button */}
          <button
            onClick={() => setMobileDrawerOpen(true)}
            aria-label="Buka menu navigasi"
            className="w-9 h-9 rounded-xl bg-[#145543] active:bg-[#1c5e4c] text-emerald-100 flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          {/* Logo & Brand */}
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-sm text-white shadow-xs">
              S
            </div>
            <span className="font-extrabold text-base tracking-tight text-white">Sigap</span>
          </Link>
        </div>

        {/* Right side: WhatsApp status pill & user avatar */}
        <div className="flex items-center gap-2">
          <div className="hidden xs:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-[11px] font-medium text-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>WA Online</span>
          </div>
          <Link
            href="/settings"
            className="w-8 h-8 rounded-full bg-emerald-700 border border-emerald-500/40 flex items-center justify-center text-xs font-bold text-white shadow-xs"
          >
            A
          </Link>
        </div>
      </header>

      {/* =========================================================================
          MOBILE SLIDE-OVER DRAWER (Off-canvas sidebar)
          ========================================================================= */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Sliding Drawer Container */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
              className="relative w-[300px] max-w-[85vw] bg-[#0d4a3b] text-white h-full flex flex-col justify-between p-5 shadow-2xl z-10 overflow-y-auto"
            >
              {/* Drawer Header */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-emerald-800/50 mb-5">
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="flex items-center gap-3"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center font-bold text-lg text-white shadow-sm ring-2 ring-emerald-400/30">
                      S
                    </div>
                    <div className="flex flex-col">
                      <span className="font-extrabold text-lg tracking-tight text-white leading-none">Sigap</span>
                      <span className="text-[9px] uppercase tracking-wider text-emerald-300 font-semibold mt-1">
                        Asisten CS WhatsApp
                      </span>
                    </div>
                  </Link>

                  <button
                    onClick={() => setMobileDrawerOpen(false)}
                    aria-label="Tutup menu"
                    className="w-8 h-8 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Navigation Items in Drawer */}
                <nav className="flex flex-col gap-1 font-medium text-sm">
                  {navItems.map((item) => {
                    const isActive = isCurrentActive(item);

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileDrawerOpen(false)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                          isActive
                            ? "bg-[#1c5e4c] text-white font-semibold shadow-inner"
                            : "text-emerald-100 hover:bg-[#145543] hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <span>{item.name}</span>
                        </div>
                        {item.badge && (
                          <span className="w-5 h-5 text-xs bg-emerald-500 font-bold rounded-full flex items-center justify-center text-white">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Footer Links */}
              <div className="flex flex-col gap-2.5 pt-4 border-t border-emerald-800/50 mt-6">
                <Link
                  href="/admin/businesses"
                  onClick={() => setMobileDrawerOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 text-xs text-emerald-200/90 hover:text-white rounded-lg hover:bg-[#145543] transition-colors ${
                    pathname.startsWith("/admin") ? "bg-[#1c5e4c] text-white font-semibold" : ""
                  }`}
                >
                  <svg className="w-4 h-4 opacity-75 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Admin Internal</span>
                </Link>

                <Link
                  href="/settings"
                  onClick={() => setMobileDrawerOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 text-xs text-emerald-100 hover:text-white rounded-lg hover:bg-[#145543] transition-colors ${
                    pathname === "/settings" ? "bg-[#1c5e4c] text-white font-semibold" : ""
                  }`}
                >
                  <svg className="w-4 h-4 opacity-80 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Pengaturan</span>
                </Link>

                {/* Profile Card */}
                <div className="flex items-center gap-3 px-2 py-2.5 rounded-xl bg-black/20 mt-1">
                  <div className="w-9 h-9 rounded-full bg-emerald-700 border border-emerald-500/40 flex items-center justify-center font-bold text-sm text-emerald-100 shrink-0">
                    A
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-xs font-semibold text-white truncate">Barbershop Rapi Bro</span>
                    <span className="text-[10px] text-emerald-300 truncate">Pak Andi · Paket Plus</span>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          MOBILE BOTTOM NAVIGATION BAR (Thumb-friendly fast switching on HP)
          ========================================================================= */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-200/90 z-30 flex items-center justify-around px-2 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] select-none"
        data-purpose="mobile-bottom-nav"
      >
        {/* Beranda */}
        <Link
          href="/dashboard"
          className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all ${
            pathname === "/" || pathname === "/dashboard"
              ? "text-emerald-700 font-bold"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span className="text-[10px] mt-0.5 leading-tight">Beranda</span>
        </Link>

        {/* Inbox (with unread badge) */}
        <Link
          href="/inbox"
          className={`relative flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all ${
            pathname.startsWith("/inbox")
              ? "text-emerald-700 font-bold"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <span className="absolute top-0 right-2.5 w-4 h-4 bg-emerald-500 text-white font-extrabold text-[9px] rounded-full flex items-center justify-center shadow-xs">
            3
          </span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a.75.75 0 0 1-.974-.94 4.025 4.025 0 0 0 .524-1.782C3.393 16.702 3 14.475 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
          <span className="text-[10px] mt-0.5 leading-tight">Inbox</span>
        </Link>

        {/* Pelanggan */}
        <Link
          href="/customers"
          className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all ${
            pathname.startsWith("/customers")
              ? "text-emerald-700 font-bold"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
          </svg>
          <span className="text-[10px] mt-0.5 leading-tight">Pelanggan</span>
        </Link>

        {/* Pengingat */}
        <Link
          href="/reminders"
          className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all ${
            pathname.startsWith("/reminders")
              ? "text-emerald-700 font-bold"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
          <span className="text-[10px] mt-0.5 leading-tight">Pengingat</span>
        </Link>

        {/* Menu (Opens Drawer) */}
        <button
          onClick={() => setMobileDrawerOpen(true)}
          className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all ${
            pathname.startsWith("/analytics") || pathname.startsWith("/templates") || pathname.startsWith("/pricing") || pathname.startsWith("/settings")
              ? "text-emerald-700 font-bold"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1 13.5 18v-2.25Z" />
          </svg>
          <span className="text-[10px] mt-0.5 leading-tight">Lainnya</span>
        </button>
      </nav>
    </>
  );
}
