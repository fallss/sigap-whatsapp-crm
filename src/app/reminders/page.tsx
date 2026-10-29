"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";

interface ReminderItem {
  id: number;
  title: string;
  detail: string;
  recipientsCount: number;
  scheduledTime: string;
  status: "Terjadwal" | "Draf" | "Terkirim" | "Dibatalkan";
  sampleMessage: string;
}

const INITIAL_REMINDERS: ReminderItem[] = [
  {
    id: 1,
    title: "Potong rutin — siklus 27 hari",
    detail: "12 pelanggan lewat siklus · Jumat, 7 Nov · 07.00 WIB",
    recipientsCount: 12,
    scheduledTime: "Jumat, 7 Nov · 07.00 WIB",
    status: "Terjadwal",
    sampleMessage:
      "Halo kak {{nama}}, sudah 27 hari sejak potong rambut terakhir di Barbershop Rapi Bro. Waktunya rapikan rambut agar tetap segar! Mau kami siapkan slot kursi untuk hari ini atau besok?",
  },
  {
    id: 2,
    title: "Pelanggan lama kembali (> 60 hari)",
    detail: "8 pelanggan > 60 hari · Sabtu, 8 Nov · 09.00 WIB",
    recipientsCount: 8,
    scheduledTime: "Sabtu, 8 Nov · 09.00 WIB",
    status: "Terjadwal",
    sampleMessage:
      "Halo kak {{nama}}, sudah lama tidak berjumpa di Barbershop Rapi Bro! Khusus minggu ini ada treatment keramas mint gratis setiap potong rambut. Yuk mampir!",
  },
  {
    id: 3,
    title: "Promo Jumat berkah",
    detail: "18 pelanggan · Belum dijadwalkan",
    recipientsCount: 18,
    scheduledTime: "Belum dijadwalkan",
    status: "Draf",
    sampleMessage:
      "Selamat pagi kak {{nama}}! Sambut Jumat berkah dengan potongan rambut rapi di Barbershop Rapi Bro. Buka mulai jam 09.00 ya kak.",
  },
  {
    id: 4,
    title: "Pengingat akhir pekan lalu",
    detail: "11 pelanggan terkirim · 31 Okt 2025",
    recipientsCount: 11,
    scheduledTime: "31 Okt 2025 · 08.00 WIB",
    status: "Terkirim",
    sampleMessage:
      "Halo kak {{nama}}, akhir pekan waktunya ganteng maksimal! Slot kapster Mas Deni & Rio siap menyambut.",
  },
];

export default function RemindersPage() {
  const [items, setItems] = useState<ReminderItem[]>(INITIAL_REMINDERS);
  const [filterTab, setFilterTab] = useState<"Semua" | "Terjadwal" | "Draf" | "Terkirim">("Semua");

  // Create Modal State
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSchedule, setNewSchedule] = useState("");
  const [newSegment, setNewSegment] = useState("12 pelanggan lewat siklus");
  const [newMessage, setNewMessage] = useState(
    "Halo kak {{nama}}, sudah waktunya rapikan rambut lagi di Barbershop Rapi Bro. Mau kami pesankan antrean hari ini?"
  );

  // Preview Modal State
  const [previewItem, setPreviewItem] = useState<ReminderItem | null>(null);

  // Sending Progress State (Live Simulation)
  const [sendingItem, setSendingItem] = useState<ReminderItem | null>(null);
  const [sendProgress, setSendProgress] = useState(0);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Add Reminder Handler
  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const count = newSegment.includes("12") ? 12 : newSegment.includes("8") ? 8 : 25;
    const newItem: ReminderItem = {
      id: Date.now(),
      title: newTitle.trim(),
      detail: `${count} pelanggan · ${newSchedule || "Dijadwalkan segera"}`,
      recipientsCount: count,
      scheduledTime: newSchedule || "Segera",
      status: "Terjadwal",
      sampleMessage: newMessage,
    };

    setItems((prev) => [newItem, ...prev]);
    setNewTitle("");
    setNewSchedule("");
    setShowModal(false);
    showToast("Pengingat baru berhasil dijadwalkan!");
  };

  // Trigger Immediate Send with Progress Animation
  const handleSendNow = (item: ReminderItem) => {
    setSendingItem(item);
    setSendProgress(10);

    const interval = setInterval(() => {
      setSendProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setItems((prev) =>
              prev.map((r) =>
                r.id === item.id ? { ...r, status: "Terkirim", scheduledTime: "Baru saja terkirim" } : r
              )
            );
            setSendingItem(null);
            setSendProgress(0);
            showToast(`Berhasil mengirim pengingat ke ${item.recipientsCount} pelanggan via WhatsApp!`);
          }, 500);
          return 100;
        }
        return p + 25;
      });
    }, 350);
  };

  // Cancel / Delete reminder
  const handleCancelReminder = (id: number) => {
    setItems((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Dibatalkan" } : r))
    );
    showToast("Pengingat dibatalkan.");
  };

  const filteredItems = items.filter((item) => {
    if (filterTab === "Terjadwal") return item.status === "Terjadwal";
    if (filterTab === "Draf") return item.status === "Draf";
    if (filterTab === "Terkirim") return item.status === "Terkirim";
    return true;
  });

  const totalSentCount = items
    .filter((i) => i.status === "Terkirim")
    .reduce((acc, curr) => acc + curr.recipientsCount, 31);

  return (
    <div className="flex min-h-screen bg-[#f3f6f4] font-sans">
      {/* Sidebar Navigation */}
      <Sidebar current="Pengingat" />

      {/* BEGIN: MainContent */}
      <main className="flex-1 flex flex-col min-w-0 pt-16 pb-24 lg:pt-8 lg:pb-8 px-4 sm:px-6 lg:px-8 overflow-y-auto">
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

        {/* Top Header Area */}
        <header
          className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3"
          data-purpose="page-header"
        >
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Pengingat Siklus Otomatis</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {items.filter((i) => i.status === "Terjadwal").length} pengingat terjadwal minggu ini · Otomatis lewat WhatsApp
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#199f70] hover:bg-[#14835c] text-white text-xs font-bold rounded-xl shadow-xs transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span>+ Susun Pengingat Baru</span>
            </button>

            {/* WhatsApp Status Pill */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-semibold text-emerald-800 shadow-xs"
              data-purpose="whatsapp-status"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>WhatsApp terhubung</span>
            </div>
          </div>
        </header>

        {/* BEGIN: AreaAverageBanner */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-2xl bg-[#0c4b3a] text-white p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-4.5 shadow-sm"
          data-purpose="benchmark-alert-banner"
        >
          {/* Days Circular Counter Badge */}
          <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-full bg-[#199f70] flex items-center justify-center text-white font-extrabold text-sm sm:text-base shrink-0 shadow-inner">
            27
          </div>
          {/* Detailed Benchmarking Text */}
          <div className="text-xs leading-relaxed">
            <h2 className="font-bold text-sm text-white leading-snug">
              Rata-rata pelanggan barbershop di area Anda kembali tiap 27 hari
            </h2>
            <p className="text-emerald-100/80 font-normal mt-0.5">
              Angka ini dari gabungan data 312 barbershop pengguna Sigap. Pelanggan Anda sendiri: rata-rata 26 hari.
              Sigap mengirim pengingat personal tepat saat rambut mulai panjang kembali.
            </p>
          </div>
        </motion.section>
        {/* END: AreaAverageBanner */}

        {/* BEGIN: GridContentSections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Card: List of Reminders */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="lg:col-span-7 bg-white rounded-2xl p-5 shadow-xs border border-slate-100 flex flex-col justify-between"
            data-purpose="scheduled-reminders-card"
          >
            <div>
              {/* Header with Filter Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-slate-100 gap-2">
                <h2 className="text-sm font-bold text-slate-800">Daftar Jadwal Pengingat</h2>
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
                  {(["Semua", "Terjadwal", "Draf", "Terkirim"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setFilterTab(tab)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition ${
                        filterTab === tab ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3 mt-3">
                {filteredItems.length === 0 ? (
                  <div className="p-8 text-center text-slate-400 text-xs">
                    Tidak ada pengingat pada kategori ini.
                  </div>
                ) : (
                  filteredItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-[#f8faf9] border border-emerald-50/80 hover:bg-emerald-50/40 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-xs font-bold text-slate-900 tracking-tight">{item.title}</h3>
                            <span
                              className={`px-2 py-0.5 text-[10px] font-semibold rounded-md border ${
                                item.status === "Terjadwal"
                                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                  : item.status === "Terkirim"
                                  ? "bg-blue-50 text-blue-800 border-blue-200"
                                  : item.status === "Dibatalkan"
                                  ? "bg-rose-50 text-rose-700 border-rose-200"
                                  : "bg-amber-50 text-amber-800 border-amber-200"
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1 font-medium">{item.detail}</p>
                        </div>
                      </div>

                      {/* Interactive Buttons */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setPreviewItem(item)}
                            className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Pratinjau Pesan
                          </button>

                          {item.status === "Terjadwal" && (
                            <>
                              <span className="text-slate-300">·</span>
                              <button
                                type="button"
                                onClick={() => handleCancelReminder(item.id)}
                                className="text-[11px] font-semibold text-slate-500 hover:text-rose-600"
                              >
                                Batalkan
                              </button>
                            </>
                          )}
                        </div>

                        {item.status === "Terjadwal" && (
                          <button
                            type="button"
                            onClick={() => handleSendNow(item)}
                            className="px-3 py-1 bg-[#0c4b3a] hover:bg-[#083629] text-white text-[11px] font-bold rounded-lg shadow-2xs transition"
                          >
                            Kirim Sekarang
                          </button>
                        )}
                        {item.status === "Terkirim" && (
                          <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                            ✓ Pesan tersampaikan
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Action Bottom Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setShowModal(true)}
              className="mt-5 w-full bg-[#1b9a69] hover:bg-[#168359] text-white font-bold py-2.5 px-4 rounded-xl text-xs transition duration-150 ease-in-out shadow-xs text-center"
              type="button"
            >
              + Susun Pengingat Siklus Baru
            </motion.button>
          </motion.section>

          {/* Right Card: Hasil Pengingat & Analytics */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="lg:col-span-5 bg-white rounded-2xl p-5 shadow-xs border border-slate-100 flex flex-col justify-between"
            data-purpose="october-analytics-card"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-slate-800">Performa Pengingat Aktif</h2>
                <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  Bulan Berjalan
                </span>
              </div>

              {/* 2x2 Metric Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-[#f8faf9] rounded-xl p-3.5 border border-emerald-50/60">
                  <span className="block text-[11px] font-medium text-slate-500 mb-1">Pesan terkirim</span>
                  <span className="text-2xl font-extrabold text-slate-900 tracking-tight">{totalSentCount}</span>
                </div>
                <div className="bg-[#f8faf9] rounded-xl p-3.5 border border-emerald-50/60">
                  <span className="block text-[11px] font-medium text-slate-500 mb-1">Dibalas pelanggan</span>
                  <span className="text-2xl font-extrabold text-slate-900 tracking-tight">14</span>
                </div>
                <div className="bg-[#f8faf9] rounded-xl p-3.5 border border-emerald-50/60">
                  <span className="block text-[11px] font-medium text-slate-500 mb-1">Datang kembali</span>
                  <span className="text-2xl font-extrabold text-emerald-800 tracking-tight">11</span>
                </div>
                <div className="bg-[#f8faf9] rounded-xl p-3.5 border border-emerald-50/60">
                  <span className="block text-[11px] font-medium text-slate-500 mb-1">Pendapatan kembali</span>
                  <span className="text-2xl font-extrabold text-emerald-800 tracking-tight">Rp 420rb</span>
                </div>
              </div>
            </div>

            {/* Pale Green Summary Callout */}
            <div className="bg-[#dcf0e7] rounded-xl p-4 flex items-start gap-3 border border-emerald-100/60">
              <div className="w-1 self-stretch bg-[#1ea470] rounded-full shrink-0"></div>
              <div className="text-[11px] leading-relaxed text-slate-700">
                <span className="font-bold text-slate-900 text-xs">Konversi Kehadiran 31.4%</span>
                <br />
                <span className="text-slate-600 font-medium">
                  Biaya resmi Meta WhatsApp: Rp 22.800. Pendapatan potong rambut kembali: Rp 420.000 (ROI 18x lipat).
                </span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-600">
              <span className="font-bold text-slate-800 block mb-0.5">Aturan Pengiriman Aman:</span>
              Maksimal 1 pengingat per pelanggan tiap 14 hari agar tidak mengganggu (anti-spam Meta policy).
            </div>
          </motion.section>
        </div>
        {/* END: GridContentSections */}
      </main>

      {/* MODAL: Susun Pengingat Baru */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-base font-bold text-slate-900">Susun Pengingat WhatsApp Baru</h3>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-slate-500 mt-2 mb-4">
                Sigap akan menyaring pelanggan secara cerdas sesuai siklus keterlambatan potong rambut.
              </p>

              <form onSubmit={handleAddReminder} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Judul Pengingat</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Pengingat Akhir Pekan — 26 hari"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Segmen Pelanggan</label>
                  <select
                    value={newSegment}
                    onChange={(e) => setNewSegment(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="12 pelanggan lewat siklus">Lewat siklus potong (&gt; 27 hari) — 12 orang</option>
                    <option value="8 pelanggan lama">Pelanggan tidak datang (&gt; 60 hari) — 8 orang</option>
                    <option value="25 pelanggan aktif">Pelanggan loyal rutin — 25 orang</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Jadwal Pengiriman</label>
                  <input
                    type="text"
                    placeholder="Contoh: Minggu, 9 Nov · 08.30 WIB"
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    value={newSchedule}
                    onChange={(e) => setNewSchedule(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Draf Teks WhatsApp (Gunakan {"{{nama}}"} untuk otomatisasi nama pelanggan)
                  </label>
                  <textarea
                    rows={3}
                    required
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none leading-relaxed"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 font-semibold hover:bg-slate-50 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1b9a69] text-white rounded-xl font-bold hover:bg-[#168359] shadow-xs transition"
                  >
                    Jadwalkan Pengingat
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: Pratinjau Pesan WhatsApp */}
      <AnimatePresence>
        {previewItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-gray-100"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                    WA
                  </div>
                  <h3 className="text-xs font-bold text-slate-900">Simulasi Tampilan WhatsApp</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewItem(null)}
                  className="text-slate-400 hover:text-slate-600 font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              {/* Chat Bubble Simulation */}
              <div className="my-4 p-4 bg-[#e5ddd5] rounded-xl">
                <div className="bg-white rounded-xl rounded-tl-none p-3 shadow-2xs text-xs text-slate-800 leading-relaxed max-w-[95%]">
                  <p>{previewItem.sampleMessage.replace("{{nama}}", "Pak Rizal")}</p>
                  <div className="text-right text-[10px] text-slate-400 mt-1">07:02 ✓✓</div>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 mb-4 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <p>
                  <strong>Target:</strong> {previewItem.recipientsCount} pelanggan
                </p>
                <p>
                  <strong>Jadwal:</strong> {previewItem.scheduledTime}
                </p>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewItem(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: Sending Progress Simulation */}
      <AnimatePresence>
        {sendingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl text-center"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Mengirim Pesan WhatsApp...</h3>
              <p className="text-xs text-slate-500 mb-4">
                Mengirim ke {sendingItem.recipientsCount} pelanggan via Meta Cloud API
              </p>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden mb-2">
                <div
                  className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${sendProgress}%` }}
                ></div>
              </div>
              <span className="text-xs font-semibold text-emerald-800">{sendProgress}% Selesai</span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
