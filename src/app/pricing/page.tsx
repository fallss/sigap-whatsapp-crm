"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<"dasar" | "plus" | "jaringan">("plus");

  // Checkout Modal State
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState<"Paket Dasar" | "Paket Plus" | "Paket Jaringan">("Paket Plus");
  const [paymentMethod, setPaymentMethod] = useState<"qris" | "bca" | "mandiri">("qris");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Interactive ROI Calculator State
  const [calcChatsPerDay, setCalcChatsPerDay] = useState(35);
  const [calcRemindersPerMonth, setCalcRemindersPerMonth] = useState(40);
  const [calcAvgTicket, setCalcAvgTicket] = useState(35000);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Prices based on cycle
  const prices = {
    dasar: billingCycle === "monthly" ? 99000 : 82000,
    plus: billingCycle === "monthly" ? 199000 : 165000,
    jaringan: billingCycle === "monthly" ? 169000 : 139000,
  };

  // Open Checkout Modal
  const openCheckout = (planName: "Paket Dasar" | "Paket Plus" | "Paket Jaringan") => {
    setCheckoutPlan(planName);
    setPromoCode("");
    setPromoApplied(false);
    setPaymentSuccess(false);
    setShowCheckout(true);
  };

  // Apply promo
  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "DISKONUMKM" || promoCode.trim().toUpperCase() === "SIGAPHEMAT") {
      setPromoApplied(true);
      showToast("Kode promo berhasil digunakan! Diskon Rp 20.000 diterapkan.");
    } else {
      showToast("Kode promo tidak valid atau telah kedaluwarsa.");
    }
  };

  // Calculate Base and Total
  const currentPriceNumber =
    checkoutPlan === "Paket Dasar"
      ? billingCycle === "monthly"
        ? 99000
        : 99000 * 10
      : checkoutPlan === "Paket Plus"
      ? billingCycle === "monthly"
        ? 199000
        : 199000 * 10
      : billingCycle === "monthly"
      ? 169000
      : 169000 * 10;

  const discountAmount = promoApplied ? 20000 : 0;
  const finalPrice = Math.max(0, currentPriceNumber - discountAmount);

  // Payment Confirmation
  const handleConfirmPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
      showToast(`Pembayaran ${checkoutPlan} berhasil diverifikasi!`);
    }, 1200);
  };

  // Calculator outputs
  const estimatedReturnedCustomers = Math.round(calcRemindersPerMonth * 0.29);
  const estimatedRevenueFromReminders = estimatedReturnedCustomers * calcAvgTicket;
  const metaMessageCost = calcRemindersPerMonth * 600; // Rp 600 per utility template
  const netEstimatedProfit = estimatedRevenueFromReminders - metaMessageCost - 199000;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      {/* Sidebar Navigation */}
      <Sidebar current="Paket Langganan" />

      {/* Main Content */}
      <main
        className="flex-1 flex flex-col min-w-0 pt-16 pb-24 lg:pt-8 lg:pb-8 px-4 sm:px-6 lg:px-8 overflow-y-auto"
        data-purpose="main-content-layout"
      >
        {/* Toast Alert */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-5 right-5 z-50 bg-[#0d4a3b] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg border border-emerald-400/30 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Header Area */}
        <header
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-slate-200/60 gap-4"
          data-purpose="header-section"
        >
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Paket Langganan Sigap</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Solusi WhatsApp asisten cerdas untuk UMKM · Uji coba 14 hari tanpa kartu kredit
            </p>
          </div>

          {/* Billing Cycle Toggle */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl self-start sm:self-auto text-xs">
            <button
              type="button"
              onClick={() => {
                setBillingCycle("monthly");
                showToast("Beralih ke tagihan bulanan");
              }}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition ${
                billingCycle === "monthly" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Tagihan Bulanan
            </button>
            <button
              type="button"
              onClick={() => {
                setBillingCycle("annual");
                showToast("Diskon 17% diaktifkan (Bayar 10 bulan, dapat 12 bulan)!");
              }}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                billingCycle === "annual" ? "bg-emerald-600 text-white shadow-2xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>Tahunan</span>
              <span className="text-[10px] bg-amber-400 text-amber-950 px-1.5 py-0.2 rounded font-extrabold">
                Hemat 17%
              </span>
            </button>
          </div>
        </header>

        {/* BEGIN: PricingCardsSection */}
        <section aria-label="Pilihan Paket" className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Paket Dasar */}
          <motion.div
            whileHover={{ y: -4 }}
            className={`bg-white rounded-2xl p-6 border flex flex-col justify-between shadow-xs transition ${
              selectedPlan === "dasar" ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-slate-200"
            }`}
            data-purpose="pricing-card"
          >
            <div>
              <h2 className="text-base font-bold text-slate-800">Paket Dasar</h2>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Rp {prices.dasar.toLocaleString("id-ID")}
                </span>
                <span className="text-xs text-slate-500 font-medium">/ bulan / outlet</span>
              </div>
              {billingCycle === "annual" && (
                <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                  Ditagih Rp {(99000 * 10).toLocaleString("id-ID")} / tahun (Gratis 2 bulan)
                </p>
              )}
              <p className="text-[12px] leading-relaxed text-slate-500 mt-3 pb-4 border-b border-slate-100 min-h-[50px]">
                Untuk usaha yang butuh CS WhatsApp 24 jam menjawab cepat, namun belum perlu siklus pengingat otomatis.
              </p>

              {/* Feature Items */}
              <ul className="mt-5 space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-emerald-500 mr-2 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  <span>AI menjawab chat 24 jam nonstop</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-emerald-500 mr-2 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  <span>Paket template sesuai jenis usaha Anda</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-emerald-500 mr-2 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  <span>Eskalasi otomatis &amp; mode draf aman</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-emerald-500 mr-2 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  <span>1 nomor WhatsApp resmi Cloud API</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-emerald-500 mr-2 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  <span>500 percakapan / bulan</span>
                </li>
                <li className="flex items-center text-slate-400">
                  <span className="inline-block w-4 text-center mr-2 font-bold shrink-0">–</span>
                  <span>Database &amp; siklus CRM pelanggan</span>
                </li>
                <li className="flex items-center text-slate-400">
                  <span className="inline-block w-4 text-center mr-2 font-bold shrink-0">–</span>
                  <span>Pengingat WhatsApp otomatis</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => openCheckout("Paket Dasar")}
              className="mt-7 w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs text-center"
              type="button"
            >
              Pilih Paket Dasar
            </button>
          </motion.div>

          {/* Card 2: Paket Plus (Highlighted) */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl p-6 border-2 border-[#199d69] flex flex-col justify-between shadow-md relative"
            data-purpose="pricing-card-highlighted"
          >
            <div className="absolute -top-3 left-6">
              <span className="bg-[#199d69] text-white text-[10px] font-extrabold tracking-wide uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                PAKET TERPOPULER (AKTIF)
              </span>
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">Paket Plus</h2>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Rp {prices.plus.toLocaleString("id-ID")}
                </span>
                <span className="text-xs text-slate-500 font-medium">/ bulan / outlet</span>
              </div>
              {billingCycle === "annual" && (
                <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                  Ditagih Rp {(199000 * 10).toLocaleString("id-ID")} / tahun (Gratis 2 bulan)
                </p>
              )}
              <p className="text-[12px] leading-relaxed text-slate-500 mt-3 pb-4 border-b border-slate-100 min-h-[50px]">
                Untuk barbershop, salon, klinik &amp; bengkel. Menghitung siklus keterlambatan dan otomatis mengingatkan
                pelanggan agar balik!
              </p>

              {/* Feature Items */}
              <ul className="mt-5 space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center font-medium">
                  <svg className="w-4 h-4 text-emerald-500 mr-2 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  <span>Semua fitur di Paket Dasar</span>
                </li>
                <li className="flex items-center font-medium">
                  <svg className="w-4 h-4 text-emerald-500 mr-2 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  <span>Database CRM pelanggan otomatis</span>
                </li>
                <li className="flex items-center font-medium">
                  <svg className="w-4 h-4 text-emerald-500 mr-2 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  <span>Kalkulasi siklus kunjungan otomatis</span>
                </li>
                <li className="flex items-center font-medium">
                  <svg className="w-4 h-4 text-emerald-500 mr-2 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  <span>Pengingat WhatsApp terjadwal &amp; masal</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-emerald-500 mr-2 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  <span>1.500 percakapan / bulan (3 pengguna)</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-emerald-500 mr-2 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  <span>Riwayat chat &amp; data pelanggan 12 bulan</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => openCheckout("Paket Plus")}
              className="mt-7 w-full py-2.5 px-4 rounded-xl bg-[#199d69] hover:bg-[#15885a] text-white text-xs font-bold transition shadow-xs text-center"
              type="button"
            >
              Perpanjang / Kelola Paket Plus
            </button>
          </motion.div>

          {/* Card 3: Paket Jaringan */}
          <motion.div
            whileHover={{ y: -4 }}
            className={`bg-white rounded-2xl p-6 border flex flex-col justify-between shadow-xs transition ${
              selectedPlan === "jaringan" ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-slate-200"
            }`}
            data-purpose="pricing-card"
          >
            <div>
              <h2 className="text-base font-bold text-slate-800">Paket Jaringan (Multi-Outlet)</h2>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Rp {prices.jaringan.toLocaleString("id-ID")}
                </span>
                <span className="text-xs text-slate-500 font-medium">/ outlet / bulan</span>
              </div>
              {billingCycle === "annual" && (
                <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                  Ditagih Rp {(169000 * 10).toLocaleString("id-ID")} / tahun per outlet
                </p>
              )}
              <p className="text-[12px] leading-relaxed text-slate-500 mt-3 pb-4 border-b border-slate-100 min-h-[50px]">
                Untuk pemilik yang memiliki &gt;2 cabang. Satu dasbor pusat untuk membandingkan kinerja seluruh cabang.
              </p>

              {/* Feature Items */}
              <ul className="mt-5 space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-emerald-500 mr-2 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  <span>Semua fitur di Paket Plus</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-emerald-500 mr-2 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  <span>Dasbor multi-cabang terpusat</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-emerald-500 mr-2 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  <span>Percakapan &amp; anggota tanpa batas</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-emerald-500 mr-2 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                  <span>Manajer akun prioritas &amp; setup gratis</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => openCheckout("Paket Jaringan")}
              className="mt-7 w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs text-center"
              type="button"
            >
              Pilih Paket Jaringan
            </button>
          </motion.div>
        </section>
        {/* END: PricingCardsSection */}

        {/* INTERACTIVE SIMULATOR / ROI CALCULATOR */}
        <section className="mt-10 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Kalkulator Potensi Omzet &amp; Biaya Meta WhatsApp</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Geser slider di bawah untuk melihat estimasi pengembalian investasi (ROI) di usaha Anda.
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
              Simulasi Dinamis
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-center">
            {/* Sliders (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Slider 1: Chat masuk */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-700">Rata-rata chat masuk per hari:</span>
                  <span className="font-bold text-emerald-800">{calcChatsPerDay} chat / hari</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="150"
                  step="5"
                  value={calcChatsPerDay}
                  onChange={(e) => setCalcChatsPerDay(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>10 chat</span>
                  <span>75 chat</span>
                  <span>150 chat</span>
                </div>
              </div>

              {/* Slider 2: Pengingat dikirim */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-700">Pengingat siklus dikirim per bulan:</span>
                  <span className="font-bold text-emerald-800">{calcRemindersPerMonth} pesan</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="5"
                  value={calcRemindersPerMonth}
                  onChange={(e) => setCalcRemindersPerMonth(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>10 pesan</span>
                  <span>100 pesan</span>
                  <span>200 pesan</span>
                </div>
              </div>

              {/* Slider 3: Harga layanan */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-700">Rata-rata nilai transaksi per pelanggan:</span>
                  <span className="font-bold text-emerald-800">Rp {calcAvgTicket.toLocaleString("id-ID")}</span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="150000"
                  step="5000"
                  value={calcAvgTicket}
                  onChange={(e) => setCalcAvgTicket(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>Rp 20.000</span>
                  <span>Rp 85.000</span>
                  <span>Rp 150.000</span>
                </div>
              </div>
            </div>

            {/* Calculations Summary Card (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0c4b3a] to-[#125e4a] text-white p-5 rounded-2xl shadow-sm">
              <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-300">
                ESTIMASI HASIL BULANAN
              </span>

              <div className="mt-3 space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-emerald-700/60">
                  <span className="text-emerald-100">Pelanggan diprediksi kembali:</span>
                  <span className="font-bold text-white text-sm">~{estimatedReturnedCustomers} orang</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-emerald-700/60">
                  <span className="text-emerald-100">Tambahan omzet kotor:</span>
                  <span className="font-bold text-emerald-300 text-sm">
                    Rp {estimatedRevenueFromReminders.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-emerald-700/60">
                  <span className="text-emerald-100">Biaya resmi Meta WA (Rp 600/pesan):</span>
                  <span className="text-emerald-200">Rp {metaMessageCost.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-emerald-700/60">
                  <span className="text-emerald-100">Biaya langganan Sigap Plus:</span>
                  <span className="text-emerald-200">Rp 199.000</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-emerald-600/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-emerald-200 block uppercase font-bold">Laba Bersih Tambahan</span>
                  <span className="text-xl font-extrabold text-white">
                    {netEstimatedProfit > 0 ? "+" : ""}Rp {netEstimatedProfit.toLocaleString("id-ID")}
                  </span>
                </div>
                <span className="text-xs bg-emerald-400 text-emerald-950 font-bold px-2.5 py-1 rounded-lg">
                  ROI Positif
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Breakdown Table */}
        <section
          className="mt-8 bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden"
          data-purpose="breakdown-table"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs" id="pricing-breakdown">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-400 font-semibold tracking-wider uppercase text-[10.5px]">
                  <th className="py-3 px-6 w-1/4" scope="col">KOMPONEN BIAYA</th>
                  <th className="py-3 px-6 w-1/4" scope="col">TARIF</th>
                  <th className="py-3 px-6 w-1/2" scope="col">KETERANGAN RESMI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="py-3.5 px-6 font-semibold text-slate-800">Uji coba awal</td>
                  <td className="py-3.5 px-6 font-medium text-emerald-700">Gratis 14 hari</td>
                  <td className="py-3.5 px-6 text-slate-500">Tanpa komitmen &amp; tanpa kartu kredit. Akses penuh Paket Plus.</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="py-3.5 px-6 font-semibold text-slate-800">Diskon tahunan</td>
                  <td className="py-3.5 px-6 font-medium text-emerald-700">Hemat 17%</td>
                  <td className="py-3.5 px-6 text-slate-500">Bayar 10 bulan langsung aktif 12 bulan penuh.</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="py-3.5 px-6 font-semibold text-slate-800">Chat inbound (pelanggan bertanya)</td>
                  <td className="py-3.5 px-6 font-medium">Gratis (1.000 percakapan/bln)</td>
                  <td className="py-3.5 px-6 text-slate-500">Meta tidak menagih biaya balasan selama jendela 24 jam.</td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition">
                  <td className="py-3.5 px-6 font-semibold text-slate-800">Pesan pengingat keluar (Outbound)</td>
                  <td className="py-3.5 px-6 font-medium">Rp 600 / pesan</td>
                  <td className="py-3.5 px-6 text-slate-500">Mengikuti tarif resmi utilitas Meta WhatsApp Cloud API.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* CHECKOUT & UPGRADE MODAL */}
      <AnimatePresence>
        {showCheckout && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100"
            >
              {!paymentSuccess ? (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Konfirmasi Langganan {checkoutPlan}</h3>
                      <p className="text-xs text-slate-500">
                        Siklus: {billingCycle === "monthly" ? "Bulanan" : "Tahunan (Hemat 17%)"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowCheckout(false)}
                      className="text-slate-400 hover:text-slate-600 font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="mt-4 space-y-4 text-xs">
                    {/* Invoice Breakdown */}
                    <div className="p-3.5 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                      <div className="flex justify-between">
                        <span className="text-slate-600">{checkoutPlan} ({billingCycle === "monthly" ? "1 Bulan" : "1 Tahun"})</span>
                        <span className="font-semibold text-slate-900">Rp {currentPriceNumber.toLocaleString("id-ID")}</span>
                      </div>
                      {promoApplied && (
                        <div className="flex justify-between text-emerald-700 font-semibold">
                          <span>Voucher Diskon UMKM</span>
                          <span>- Rp 20.000</span>
                        </div>
                      )}
                      <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                        <span>Total Pembayaran:</span>
                        <span className="text-emerald-700">Rp {finalPrice.toLocaleString("id-ID")}</span>
                      </div>
                    </div>

                    {/* Voucher Code */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Punya kode promo? (contoh: DISKONUMKM)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 p-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none uppercase"
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
                      >
                        Terapkan
                      </button>
                    </div>

                    {/* Payment Method Selector */}
                    <div>
                      <label className="block font-semibold text-slate-700 mb-2">Metode Pembayaran:</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "qris", name: "QRIS Instan" },
                          { id: "bca", name: "BCA VA" },
                          { id: "mandiri", name: "Mandiri VA" },
                        ].map((m) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setPaymentMethod(m.id as any)}
                            className={`p-2.5 rounded-xl border text-center font-bold text-xs transition ${
                              paymentMethod === m.id
                                ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            {m.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Payment Method Details */}
                    {paymentMethod === "qris" && (
                      <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 flex items-center gap-3">
                        {/* Simulated QR Code SVG */}
                        <div className="w-16 h-16 bg-white p-1 rounded-lg border border-slate-200 shrink-0 flex items-center justify-center">
                          <svg className="w-14 h-14" viewBox="0 0 100 100" fill="none">
                            <rect width="100" height="100" fill="white" />
                            <path d="M10 10h30v30h-30zM15 15v20h20v-20zM60 10h30v30h-30zM65 15v20h20v-20zM10 60h30v30h-30zM15 65v20h20v-20zM22 22h6v6h-6zM72 22h6v6h-6zM22 72h6v6h-6zM50 10h5v15h-5zM60 50h15v5h-15zM75 60h15v15h-15zM50 65h10v25h-10zM65 80h25v10h-25z" fill="#0c4b3a" />
                          </svg>
                        </div>
                        <div className="text-[11px] text-slate-600">
                          <p className="font-bold text-slate-800">Scan QRIS Nasional</p>
                          <p className="text-[10px] mt-0.5">Mendukung BCA, GoPay, OVO, ShopeePay, Dana, &amp; Livin Mandiri.</p>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "bca" && (
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 block">Nomor BCA Virtual Account:</span>
                          <span className="font-mono font-bold text-slate-800 text-sm">80777 0812 1100 4455</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText("80777081211004455");
                            showToast("Nomor VA BCA berhasil disalin!");
                          }}
                          className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-lg text-[10px] font-bold"
                        >
                          Salin
                        </button>
                      </div>
                    )}

                    {paymentMethod === "mandiri" && (
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 block">Nomor Mandiri Virtual Account:</span>
                          <span className="font-mono font-bold text-slate-800 text-sm">88908 0812 1100 4455</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText("88908081211004455");
                            showToast("Nomor VA Mandiri berhasil disalin!");
                          }}
                          className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-lg text-[10px] font-bold"
                        >
                          Salin
                        </button>
                      </div>
                    )}

                    <div className="pt-2 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowCheckout(false)}
                        className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl font-semibold"
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        disabled={isProcessingPayment}
                        onClick={handleConfirmPayment}
                        className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-xs transition disabled:opacity-50 flex items-center gap-1.5"
                      >
                        {isProcessingPayment ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            <span>Memverifikasi...</span>
                          </>
                        ) : (
                          <span>Bayar &amp; Aktifkan Paket</span>
                        )}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-6 text-center">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Pembayaran Berhasil Dikonfirmasi!</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    {checkoutPlan} Anda telah aktif. Kuota percakapan dan pengingat WhatsApp telah diperbarui.
                  </p>

                  <div className="mt-4 p-3 bg-slate-50 rounded-xl text-left text-xs space-y-1 border border-slate-100 max-w-sm mx-auto">
                    <div className="flex justify-between">
                      <span className="text-slate-500">ID Transaksi:</span>
                      <span className="font-mono font-bold text-slate-800">SGP-INV-{Date.now().toString().slice(-6)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Status:</span>
                      <span className="font-bold text-emerald-700">Lunas (Aktif)</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowCheckout(false)}
                    className="mt-6 px-6 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs hover:bg-emerald-700"
                  >
                    Kembali ke Dasbor
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
