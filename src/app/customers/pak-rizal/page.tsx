"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";

interface Visit {
  id: string;
  date: string;
  service: string;
  price: number;
}

export default function CustomerProfilePage() {
  const router = useRouter();

  // Customer State
  const [name, setName] = useState("Pak Rizal");
  const [phone, setPhone] = useState("+62 812-1100-4455");
  const [cycle, setCycle] = useState(26);
  const [favService, setFavService] = useState("Potong + keramas");
  const [optIn, setOptIn] = useState(true);

  // Visit History State
  const [visits, setVisits] = useState<Visit[]>([
    { id: "1", date: "1 Okt 2025", service: "Potong + keramas", price: 35000 },
    { id: "2", date: "5 Sep 2025", service: "Potong", price: 35000 },
    { id: "3", date: "11 Agu 2025", service: "Potong + jenggot", price: 50000 },
    { id: "4", date: "16 Jul 2025", service: "Potong", price: 35000 },
    { id: "5", date: "20 Jun 2025", service: "Potong + keramas", price: 35000 },
    { id: "6", date: "26 Mei 2025", service: "Potong", price: 35000 },
    { id: "7", date: "28 Apr 2025", service: "Potong", price: 20000 },
  ]);

  const [lastVisitLabel, setLastVisitLabel] = useState("34 hari lalu");
  const [daysOverdue, setDaysOverdue] = useState(8);

  // Modals
  const [showAddVisitModal, setShowAddVisitModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showReminderPreviewModal, setShowReminderPreviewModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Visit Form
  const [newVisitService, setNewVisitService] = useState("Potong + keramas");
  const [newVisitPrice, setNewVisitPrice] = useState("35000");
  const [newVisitDate, setNewVisitDate] = useState("Hari ini");

  // Edit Profile Form
  const [editName, setEditName] = useState(name);
  const [editPhone, setEditPhone] = useState(phone);
  const [editCycle, setEditCycle] = useState(cycle.toString());

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const totalLtv = visits.reduce((acc, v) => acc + v.price, 0);

  const handleRecordVisit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: Visit = {
      id: Date.now().toString(),
      date: newVisitDate || "Hari ini",
      service: newVisitService,
      price: parseInt(newVisitPrice, 10) || 35000,
    };

    setVisits([newEntry, ...visits]);
    setLastVisitLabel("Hari ini");
    setDaysOverdue(0);
    setShowAddVisitModal(false);
    showToast(`✓ Kunjungan ${newVisitService} berhasil dicatat! Siklus potong ${name} telah direset.`);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setName(editName);
    setPhone(editPhone);
    setCycle(parseInt(editCycle, 10) || 26);
    setShowEditProfileModal(false);
    showToast("✓ Profil pelanggan berhasil diperbarui.");
  };

  const handleConfirmSendReminder = () => {
    setShowReminderPreviewModal(false);
    showToast(`✓ Pengingat WhatsApp terkirim ke nomor ${name} (${phone})! ✓✓`);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      {/* Sidebar Navigation */}
      <Sidebar current="Pelanggan" />

      {/* MainContent */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto pt-14 pb-20 lg:pt-0 lg:pb-8">
        {/* Top Navigation / Header Bar */}
        <header className="bg-white border-b border-slate-200/80 px-4 sm:px-8 py-3.5 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">{name}</h1>
                <button
                  onClick={() => {
                    setEditName(name);
                    setEditPhone(phone);
                    setEditCycle(cycle.toString());
                    setShowEditProfileModal(true);
                  }}
                  className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-semibold transition"
                >
                  Sunting
                </button>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                Pelanggan sejak Maret 2024 · ID: CUST-0184
              </p>
            </div>

            {/* Quick Actions in Header */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddVisitModal(true)}
                className="px-3 py-1.5 rounded-lg bg-[#199e67] hover:bg-[#148556] text-white text-xs font-semibold shadow-xs transition"
              >
                + Catat Kunjungan
              </button>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-xs font-medium shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                WA Online
              </div>
            </div>
          </div>
        </header>

        {/* Page Body Container */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full">
          {/* Back Button & Toast */}
          <div className="mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-2">
            <Link
              href="/customers"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs"
            >
              ← Kembali ke direktori pelanggan
            </Link>

            <AnimatePresence>
              {toastMessage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold shadow-xs"
                >
                  {toastMessage}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Detail Cards Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* BEGIN: LeftCardRingkasan */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              aria-labelledby="ringkasan-title"
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900" id="ringkasan-title">
                  Ringkasan Profil CRM
                </h3>
                <span className="text-xs text-slate-400 font-mono">Status: {daysOverdue > 0 ? "Jatuh Tempo" : "Normal"}</span>
              </div>

              {/* Key-Value Information List */}
              <div className="space-y-3.5 text-xs text-slate-600">
                <div className="flex justify-between items-center py-0.5 border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">Nomor WhatsApp</span>
                  <span className="font-semibold text-slate-900 font-mono">{phone}</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">Total kunjungan</span>
                  <span className="font-bold text-slate-900">{visits.length} kali</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">Terakhir datang</span>
                  <span className="font-semibold text-slate-900">{lastVisitLabel}</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">Siklus rata-rata</span>
                  <span className="font-semibold text-slate-900">{cycle} hari</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">Layanan favorit</span>
                  <span className="font-semibold text-slate-900">{favService}</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">Nilai seumur hidup (LTV)</span>
                  <span className="font-bold text-emerald-700 text-sm">
                    Rp {totalLtv.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-slate-500 font-medium">Izin pesan WhatsApp (opt-in)</span>
                  <button
                    onClick={() => {
                      setOptIn(!optIn);
                      showToast(`Izin pesan WhatsApp ${!optIn ? "diaktifkan" : "dinonaktifkan"}.`);
                    }}
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                      optIn
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : "bg-gray-100 text-gray-600 border-gray-200"
                    }`}
                  >
                    {optIn ? "✓ Sudah setuju" : "Belum diizinkan"}
                  </button>
                </div>
              </div>

              {/* Alert Banner Box */}
              {daysOverdue > 0 ? (
                <div className="bg-[#FFF8EE] border-l-4 border-[#F59E0B] p-3.5 rounded-r-xl space-y-1">
                  <h4 className="text-xs font-bold text-[#B45309]">Lewat {daysOverdue} hari dari siklusnya</h4>
                  <p className="text-[11px] text-[#92400E] leading-relaxed">
                    {name} biasanya kembali tiap {cycle} hari. Sekarang sudah {lastVisitLabel}. Sigap siap mengirimkan pengingat ramah.
                  </p>
                </div>
              ) : (
                <div className="bg-[#E7F6EF] border-l-4 border-[#10B981] p-3.5 rounded-r-xl space-y-1">
                  <h4 className="text-xs font-bold text-emerald-900">Siklus potong rambut tepat waktu</h4>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    {name} baru saja melakukan kunjungan. Pengingat otomatis berikutnya dijadwalkan dalam {cycle} hari.
                  </p>
                </div>
              )}

              {/* Action Buttons Group */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowReminderPreviewModal(true)}
                  className="bg-[#10B981] hover:bg-[#059669] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors"
                  type="button"
                >
                  Kirim Pengingat WhatsApp
                </motion.button>
                <button
                  onClick={() => router.push("/inbox")}
                  className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
                  type="button"
                >
                  Buka Chat Inbox
                </button>
                <button
                  onClick={() => setShowAddVisitModal(true)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
                  type="button"
                >
                  + Catat Kunjungan
                </button>
              </div>
            </motion.section>
            {/* END: LeftCardRingkasan */}

            {/* BEGIN: RightCardRiwayat */}
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              aria-labelledby="riwayat-title"
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 sm:p-6 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900" id="riwayat-title">
                  Riwayat Kunjungan ({visits.length})
                </h3>
                <button
                  onClick={() => setShowAddVisitModal(true)}
                  className="text-xs font-semibold text-emerald-600 hover:underline"
                >
                  + Kunjungan Baru
                </button>
              </div>

              {/* Visit History Entries */}
              <div className="divide-y divide-slate-100 text-xs max-h-[380px] overflow-y-auto pr-1">
                {visits.map((v) => (
                  <div key={v.id} className="py-3 flex justify-between items-center hover:bg-slate-50/50 px-2 rounded-lg transition-colors">
                    <div>
                      <div className="font-bold text-slate-800">{v.date}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{v.service}</div>
                    </div>
                    <div className="font-bold text-slate-900 text-right">
                      Rp {v.price.toLocaleString("id-ID")}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
            {/* END: RightCardRiwayat */}
          </div>
        </div>

        {/* Modal: Catat Kunjungan Baru */}
        <AnimatePresence>
          {showAddVisitModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-base font-bold text-slate-900">Catat Kunjungan Baru untuk {name}</h3>
                  <button onClick={() => setShowAddVisitModal(false)} className="text-slate-400 hover:text-slate-600">
                    ✕
                  </button>
                </div>

                <form onSubmit={handleRecordVisit} className="space-y-4 mt-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Tanggal Kunjungan</label>
                    <input
                      type="text"
                      required
                      value={newVisitDate}
                      onChange={(e) => setNewVisitDate(e.target.value)}
                      placeholder="Contoh: Hari ini, atau 29 Okt 2025"
                      className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Layanan yang Dikerjakan</label>
                    <select
                      value={newVisitService}
                      onChange={(e) => {
                        setNewVisitService(e.target.value);
                        if (e.target.value === "Potong dewasa") setNewVisitPrice("35000");
                        if (e.target.value === "Potong + keramas") setNewVisitPrice("35000");
                        if (e.target.value === "Potong + jenggot") setNewVisitPrice("50000");
                        if (e.target.value === "Potong anak") setNewVisitPrice("25000");
                        if (e.target.value === "Pewarnaan / Semir") setNewVisitPrice("60000");
                      }}
                      className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                    >
                      <option value="Potong + keramas">Potong + keramas</option>
                      <option value="Potong dewasa">Potong dewasa</option>
                      <option value="Potong + jenggot">Potong + jenggot</option>
                      <option value="Potong anak">Potong anak</option>
                      <option value="Pewarnaan / Semir">Pewarnaan / Semir</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Total Pembayaran (Rp)</label>
                    <input
                      type="number"
                      required
                      value={newVisitPrice}
                      onChange={(e) => setNewVisitPrice(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setShowAddVisitModal(false)}
                      className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-semibold"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#199e67] hover:bg-[#148556] text-white rounded-lg font-semibold shadow-xs"
                    >
                      Simpan Kunjungan
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modal: Sunting Profil Pelanggan */}
        <AnimatePresence>
          {showEditProfileModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-base font-bold text-slate-900">Sunting Profil Pelanggan</h3>
                  <button onClick={() => setShowEditProfileModal(false)} className="text-slate-400 hover:text-slate-600">
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4 mt-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Nama Panggilan / Lengkap</label>
                    <input
                      type="text"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Nomor WhatsApp</label>
                    <input
                      type="text"
                      required
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Siklus Potong Rambut (Hari)</label>
                    <input
                      type="number"
                      required
                      value={editCycle}
                      onChange={(e) => setEditCycle(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setShowEditProfileModal(false)}
                      className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-semibold"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#199e67] hover:bg-[#148556] text-white rounded-lg font-semibold shadow-xs"
                    >
                      Simpan Perubahan
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modal: Preview Pengingat WhatsApp */}
        <AnimatePresence>
          {showReminderPreviewModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
                      WA
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">Kirim Pengingat ke {name}</h3>
                  </div>
                  <button onClick={() => setShowReminderPreviewModal(false)} className="text-slate-400 hover:text-slate-600">
                    ✕
                  </button>
                </div>

                <div className="my-4">
                  <p className="text-xs text-slate-500 mb-2 font-medium">Pratinjau Pesan Resmi WhatsApp:</p>
                  <div className="bg-[#eef8f3] p-4 rounded-xl border border-emerald-200/80 text-xs text-slate-800 leading-relaxed space-y-2">
                    <p className="font-semibold text-emerald-950">
                      Halo {name}! 👋
                    </p>
                    <p>
                      Sudah <strong>{lastVisitLabel}</strong> sejak potong rambut terakhir di <strong>Barbershop Rapi Bro</strong>.
                    </p>
                    <p>
                      Berdasarkan siklus biasanya ({cycle} hari), rambut Kakak mungkin sudah mulai panjang dan siap dirapikan kembali. Mau kami reservasikan kursi akhir pekan ini?
                    </p>
                    <p className="text-[10.5px] text-emerald-700 italic border-t border-emerald-200/60 pt-2 mt-2">
                      Ketik &quot;Mau&quot; untuk langsung amankan kursi tanpa antre.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowReminderPreviewModal(false)}
                    className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-semibold text-xs"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleConfirmSendReminder}
                    className="px-4 py-2 bg-[#199e67] hover:bg-[#148556] text-white rounded-lg font-semibold text-xs shadow-xs flex items-center gap-1.5"
                  >
                    <span>Kirim Sekarang</span>
                    <span>✓</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
