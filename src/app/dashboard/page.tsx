"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";

interface NightlyLog {
  time: string;
  customerName: string;
  customerMessage: string;
  topic: string;
  sigapReply: string;
  templateCategory: string;
  ruleCheck: string;
}

const NIGHTLY_LOGS: NightlyLog[] = [
  {
    time: "22.14",
    customerName: "+62 812-7766-1122",
    topic: "Harga potong anak",
    customerMessage: "Malam min, mau tanya potong rambut anak berapa ya? Bawa anak umur 4 tahun.",
    sigapReply:
      "Potong rambut anak usia di bawah 10 tahun Rp 25.000 ya kak, sudah termasuk keramas ringan. Kapster kami ramah dan sabar untuk anak-anak.",
    templateCategory: "Paket Barbershop v2.4 — Harga",
    ruleCheck: "Batas aman: Lolos (Tidak ada kata keluhan)",
  },
  {
    time: "23.02",
    customerName: "+62 813-8899-4433",
    topic: "Jam buka hari Minggu",
    customerMessage: "Halo, hari Minggu buka sampai jam berapa ya mas? Apa perlu antre panjang?",
    sigapReply:
      "Buka setiap hari Selasa–Minggu pukul 09.00–21.00 WIB. Hari Minggu jam 10 pagi biasanya masih santai dan tidak antre panjang.",
    templateCategory: "Paket Barbershop v2.4 — Operasional",
    ruleCheck: "Batas aman: Lolos (Jam buka valid)",
  },
  {
    time: "23.41",
    customerName: "+62 811-2233-4455",
    topic: "Alamat & parkir",
    customerMessage: "Alamatnya di mana ya? Ada parkir motor yang aman?",
    sigapReply:
      "Lokasi kami di Jl. Pahlawan No. 42 (sebelah Indomaret). Ada area parkir motor luas dan dijaga juru parkir.",
    templateCategory: "Paket Barbershop v2.4 — Lokasi",
    ruleCheck: "Batas aman: Lolos",
  },
  {
    time: "05.50",
    customerName: "+62 819-3322-1100",
    topic: "Bisa booking jam 8 pagi?",
    customerMessage: "Pagi mas, bisa booking potong jam 8 pagi ini gak ya?",
    sigapReply:
      "Halo kak! Barbershop kami buka mulai pukul 09.00 pagi. Apakah bersedia jika kami jadwalkan di slot perdana jam 09.15 WIB?",
    templateCategory: "Paket Barbershop v2.4 — Layanan & Reservasi",
    ruleCheck: "Batas aman: Di luar jam buka ditangani ramah",
  },
];

export default function DashboardPage() {
  const router = useRouter();

  // Nightly Log Modal
  const [selectedLog, setSelectedLog] = useState<NightlyLog | null>(null);

  // WhatsApp Health Modal
  const [showHealthModal, setShowHealthModal] = useState(false);

  // Quick Action Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <div className="flex min-h-screen bg-[#f3f6f4] font-sans">
      {/* Sidebar Navigation */}
      <Sidebar current="Beranda" />

      {/* Main Content */}
      <main
        className="flex-1 flex flex-col min-w-0 pt-16 pb-24 lg:pt-8 lg:pb-8 px-4 sm:px-6 lg:px-8 overflow-y-auto"
        data-purpose="main-dashboard-content"
      >
        {/* Toast Alert */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-5 right-5 z-50 bg-[#0c4b3a] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg border border-emerald-400/30 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Header Bar */}
        <header
          className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-4"
          data-purpose="dashboard-header"
        >
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Beranda Operasional</h1>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              Barbershop Rapi Bro · Selasa, 4 November 2025
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* WhatsApp Connection Status Badge (Interactive) */}
            <button
              type="button"
              onClick={() => setShowHealthModal(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 shadow-2xs hover:bg-emerald-100/70 transition cursor-pointer self-start sm:self-auto"
              title="Klik untuk melihat status koneksi WhatsApp Cloud API"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-semibold text-emerald-800">WhatsApp Aktif • Terhubung</span>
            </button>
          </div>
        </header>

        {/* Top Key Metrics Cards (4 Columns) */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          data-purpose="key-metrics"
        >
          {/* Metric 1 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -2 }}
            onClick={() => router.push("/inbox")}
            className="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between cursor-pointer hover:border-emerald-200 transition"
          >
            <span className="text-xs text-gray-500 font-medium">Chat masuk hari ini</span>
            <div className="mt-2 mb-1">
              <span className="text-3xl font-extrabold text-gray-900 tracking-tight">34</span>
            </div>
            <span className="text-xs font-semibold text-emerald-600">+6 dari kemarin</span>
          </motion.div>

          {/* Metric 2 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -2 }}
            onClick={() => router.push("/templates")}
            className="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between cursor-pointer hover:border-emerald-200 transition"
          >
            <span className="text-xs text-gray-500 font-medium">Dijawab otomatis Sigap</span>
            <div className="mt-2 mb-1">
              <span className="text-3xl font-extrabold text-gray-900 tracking-tight">71%</span>
            </div>
            <span className="text-xs font-medium text-gray-500">24 dari 34 chat dijawab instan</span>
          </motion.div>

          {/* Metric 3 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -2 }}
            onClick={() => router.push("/inbox")}
            className="bg-white rounded-2xl p-4 border border-amber-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between cursor-pointer hover:bg-amber-50/20 transition"
          >
            <span className="text-xs text-gray-600 font-medium">Perlu jawaban Anda</span>
            <div className="mt-2 mb-1">
              <span className="text-3xl font-extrabold text-amber-900 tracking-tight">3</span>
            </div>
            <span className="text-xs font-bold text-amber-700">Tertua 12 menit lalu → Buka</span>
          </motion.div>

          {/* Metric 4 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -2 }}
            onClick={() => router.push("/customers")}
            className="bg-white rounded-2xl p-4 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between cursor-pointer hover:border-emerald-200 transition"
          >
            <span className="text-xs text-gray-500 font-medium">Pelanggan jatuh tempo</span>
            <div className="mt-2 mb-1">
              <span className="text-3xl font-extrabold text-gray-900 tracking-tight">12</span>
            </div>
            <span className="text-xs font-semibold text-emerald-700">Lewat dari siklus 27 hari</span>
          </motion.div>
        </motion.section>

        {/* Main Content Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Perlu Perhatian Anda */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-7 bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
            data-purpose="attention-needed-section"
          >
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-gray-900 text-sm tracking-tight">Perlu Perhatian Anda</h2>
                <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold flex items-center justify-center">
                  3
                </span>
              </div>
              <Link href="/inbox" className="text-xs font-semibold text-emerald-700 hover:underline">
                Buka Semua di Inbox →
              </Link>
            </div>

            {/* Attention Items List */}
            <div className="space-y-3.5">
              {/* Item 1: Bu Maya */}
              <Link
                href="/inbox"
                className="block p-3.5 bg-gray-50/75 hover:bg-emerald-50/50 hover:border-emerald-200 transition rounded-xl border border-gray-100 group"
              >
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-bold text-xs text-gray-900 group-hover:text-emerald-800 transition">
                    Bu Maya
                  </span>
                  <span className="text-[11px] text-gray-400">12 menit lalu</span>
                </div>
                <p className="text-xs text-gray-700 italic font-normal mb-2 leading-relaxed">
                  “Rambut anak saya kemarin dipotong terlalu pendek, saya kecewa”
                </p>
                <div>
                  <span className="inline-block text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50">
                    Keluhan — Sigap menahan balasan sesuai batas aman
                  </span>
                </div>
              </Link>

              {/* Item 2: Pak Yudi */}
              <Link
                href="/inbox"
                className="block p-3.5 bg-gray-50/75 hover:bg-emerald-50/50 hover:border-emerald-200 transition rounded-xl border border-gray-100 group"
              >
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-bold text-xs text-gray-900 group-hover:text-emerald-800 transition">
                    Pak Yudi
                  </span>
                  <span className="text-[11px] text-gray-400">34 menit lalu</span>
                </div>
                <p className="text-xs text-gray-700 italic font-normal mb-2 leading-relaxed">
                  “Bisa potong di rumah? Ibu saya susah jalan”
                </p>
                <div>
                  <span className="inline-block text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50">
                    Di luar template standar — draf telah disiapkan Sigap
                  </span>
                </div>
              </Link>

              {/* Item 3: Nomor baru */}
              <Link
                href="/inbox"
                className="block p-3.5 bg-gray-50/75 hover:bg-emerald-50/50 hover:border-emerald-200 transition rounded-xl border border-gray-100 group"
              >
                <div className="flex justify-between items-baseline mb-1">
                  <span className="font-bold text-xs text-gray-900 group-hover:text-emerald-800 transition">
                    Nomor Baru (+62 812-9900-4471)
                  </span>
                  <span className="text-[11px] text-gray-400">1 jam lalu</span>
                </div>
                <p className="text-xs text-gray-700 italic font-normal mb-2 leading-relaxed">
                  “Halo, hari Minggu buka sampai jam berapa ya mas? Apa perlu antre panjang?”
                </p>
                <div>
                  <span className="inline-block text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/50">
                    Draf siap — tinggal tekan tombol kirim
                  </span>
                </div>
              </Link>
            </div>

            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => router.push("/inbox")}
              className="mt-4 w-full py-2.5 bg-[#249e6b] hover:bg-[#1f8b5e] text-white text-xs font-bold rounded-xl transition shadow-sm text-center"
              type="button"
            >
              Buka Inbox &amp; Jawab Semua Pesan
            </motion.button>
          </motion.section>

          {/* Right Column: Pengingat & Riwayat Semalam */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Box: Pengingat minggu ini */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
              data-purpose="reminders-card"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-gray-900 text-sm tracking-tight">Pengingat Siklus Otomatis</h2>
                <Link href="/reminders" className="text-[11px] font-semibold text-emerald-700 hover:underline">
                  Kelola Semua →
                </Link>
              </div>

              <div className="flex flex-col gap-2.5">
                <Link
                  href="/customers/pak-rizal"
                  className="p-3 rounded-xl bg-gray-50/80 border border-gray-100/90 flex flex-col gap-0.5 hover:bg-emerald-50/40 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900">Potong rutin — siklus 27 hari</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      Terjadwal
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium">12 pelanggan · Jumat, 07.00 WIB</span>
                </Link>

                <Link
                  href="/reminders"
                  className="p-3 rounded-xl bg-gray-50/80 border border-gray-100/90 flex flex-col gap-0.5 hover:bg-emerald-50/40 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-900">Pelanggan lama kembali (&gt;60 hari)</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      Terjadwal
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium">8 pelanggan · Sabtu, 09.00 WIB</span>
                </Link>
              </div>
            </motion.section>

            {/* Box: Yang Sigap kerjakan semalam (Interactive Timeline) */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
              data-purpose="nightly-activity-card"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-gray-900 text-sm tracking-tight">
                  Yang Sigap Kerjakan Semalam
                </h2>
                <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Klik entri untuk rincian
                </span>
              </div>

              {/* Timeline Activity Items */}
              <div className="space-y-2.5 mb-4 text-xs font-normal">
                {NIGHTLY_LOGS.map((log) => (
                  <div
                    key={log.time}
                    onClick={() => setSelectedLog(log)}
                    className="flex items-start gap-3 p-2 rounded-xl hover:bg-emerald-50/60 transition cursor-pointer border border-transparent hover:border-emerald-200"
                  >
                    <span className="text-gray-900 font-bold text-xs w-9 shrink-0 pt-0.5">{log.time}</span>
                    <div className="flex flex-col flex-1">
                      <span className="text-gray-800 font-bold leading-tight">{log.topic}</span>
                      <span className="text-[11px] text-emerald-700 font-semibold mt-0.5 flex items-center gap-1">
                        ✓ Dijawab otomatis tanpa membangunkan Anda
                      </span>
                    </div>
                    <span className="text-slate-400 text-xs font-bold">→</span>
                  </div>
                ))}
              </div>

              {/* Highlight Banner Footer */}
              <div className="bg-emerald-50/70 border-l-4 border-emerald-500 rounded-r-xl p-3 flex items-start gap-2.5">
                <p className="text-xs text-gray-700 leading-snug">
                  <span className="font-bold text-emerald-950">9 chat masuk di luar jam buka.</span> Semua terjawab rapi
                  dan pelanggan terlayani tanpa staf harus lembur.
                </p>
              </div>
            </motion.section>
          </div>
        </div>
      </main>

      {/* MODAL: Detail Percakapan Semalam */}
      <AnimatePresence>
        {selectedLog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-gray-100 text-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Log Respon Otomatis Semalam</h3>
                  <p className="text-[11px] text-slate-500">
                    Pukul {selectedLog.time} WIB · {selectedLog.customerName}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedLog(null)}
                  className="text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              </div>

              {/* WhatsApp Simulated Messages */}
              <div className="my-4 p-3.5 bg-[#e5ddd5] rounded-xl space-y-3">
                {/* Customer */}
                <div className="flex flex-col items-start max-w-[90%]">
                  <div className="bg-white rounded-xl rounded-tl-none p-2.5 shadow-2xs text-slate-800 leading-relaxed">
                    <p>{selectedLog.customerMessage}</p>
                  </div>
                  <span className="text-[9px] text-slate-500 mt-0.5 ml-1">{selectedLog.time}</span>
                </div>

                {/* Sigap */}
                <div className="flex flex-col items-end max-w-[90%] ml-auto">
                  <div className="bg-[#dcf8c6] rounded-xl rounded-tr-none p-2.5 shadow-2xs text-slate-900 leading-relaxed font-medium">
                    <p>{selectedLog.sigapReply}</p>
                  </div>
                  <span className="text-[9px] text-emerald-800 font-bold mt-0.5 mr-1">
                    {selectedLog.time} ✓✓ Dibalas Sigap
                  </span>
                </div>
              </div>

              {/* Logic Audit */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5 text-slate-600 text-[11px] mb-4">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-700">Pencocokan:</span>
                  <span className="font-medium text-emerald-800">{selectedLog.templateCategory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-700">Evaluasi Batas Aman:</span>
                  <span className="text-slate-800 font-medium">{selectedLog.ruleCheck}</span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedLog(null)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: WhatsApp Health & Diagnostic */}
      <AnimatePresence>
        {showHealthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 text-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <h3 className="text-sm font-bold text-slate-900">Kesehatan WhatsApp Cloud API</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowHealthModal(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="py-4 space-y-3">
                <div className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-xl text-emerald-900">
                  <div className="font-bold text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    Nomor Terhubung &amp; Siap Menerima Chat
                  </div>
                  <div className="text-[11px] text-emerald-800 mt-1">
                    Nomor: +62 812–1100–4455 (Barbershop Rapi Bro). Latensi webhook rata-rata 38ms.
                  </div>
                </div>

                <div className="space-y-2 text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Meta Graph API:</span>
                    <span className="font-bold text-emerald-700">v21.0 Online</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Pesan Masuk Hari Ini:</span>
                    <span className="font-bold text-slate-900">34 Pesan</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Kualitas Nomor (Quality Rating):</span>
                    <span className="font-bold text-emerald-700">HIGH (Hijau)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Limit Pengiriman (Messaging Limit):</span>
                    <span className="font-bold text-slate-900">1.000 pelanggan unik/24 jam</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowHealthModal(false);
                      router.push("/settings");
                    }}
                    className="px-3.5 py-1.5 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50"
                  >
                    Buka Pengaturan Lengkap
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowHealthModal(false)}
                    className="px-4 py-1.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
