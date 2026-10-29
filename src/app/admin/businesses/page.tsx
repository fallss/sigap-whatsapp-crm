"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AdminSidebar from "@/components/AdminSidebar";

interface Business {
  id: string;
  name: string;
  type: string;
  plan: string;
  owner: string;
  phone: string;
  customers: number;
  lastActive: string;
  status: "Aktif" | "Uji coba" | "Berhenti";
  statusBg: string;
  monthlyChats: number;
  monthlyReminders: number;
}

const INITIAL_BUSINESSES: Business[] = [
  {
    id: "b-1",
    name: "Barbershop Rapi Bro",
    type: "Barbershop",
    plan: "Plus",
    owner: "Pak Andi",
    phone: "+62 895-3461-84632",
    customers: 184,
    lastActive: "4 Nov 2025 · 10:42 WIB",
    status: "Aktif",
    statusBg: "bg-emerald-50 text-emerald-700 border-emerald-100",
    monthlyChats: 1020,
    monthlyReminders: 31,
  },
  {
    id: "b-2",
    name: "Laundry Bersih Wangi",
    type: "Laundry",
    plan: "Plus",
    owner: "Ibu Ratna",
    phone: "+62 813-8899-7711",
    customers: 412,
    lastActive: "4 Nov 2025 · 09:15 WIB",
    status: "Aktif",
    statusBg: "bg-emerald-50 text-emerald-700 border-emerald-100",
    monthlyChats: 1480,
    monthlyReminders: 94,
  },
  {
    id: "b-3",
    name: "Kantor Notaris Hendra S.H.",
    type: "Notaris",
    plan: "Dasar",
    owner: "Pak Hendra",
    phone: "+62 811-2233-0099",
    customers: 96,
    lastActive: "3 Nov 2025 · 17:00 WIB",
    status: "Aktif",
    statusBg: "bg-emerald-50 text-emerald-700 border-emerald-100",
    monthlyChats: 320,
    monthlyReminders: 0,
  },
  {
    id: "b-4",
    name: "Bengkel Jaya Motor",
    type: "Bengkel",
    plan: "Dasar",
    owner: "Mas Joko",
    phone: "+62 818-4455-6677",
    customers: 238,
    lastActive: "28 Okt 2025 · 14:20 WIB",
    status: "Uji coba",
    statusBg: "bg-amber-50 text-amber-700 border-amber-200/60",
    monthlyChats: 180,
    monthlyReminders: 12,
  },
  {
    id: "b-5",
    name: "Roti Manis Bu Tini",
    type: "Toko roti",
    plan: "Dasar",
    owner: "Ibu Tini",
    phone: "+62 815-6677-8899",
    customers: 57,
    lastActive: "12 Okt 2025 · 11:00 WIB",
    status: "Berhenti",
    statusBg: "bg-gray-100 text-gray-600 border-gray-200",
    monthlyChats: 45,
    monthlyReminders: 0,
  },
];

export default function AdminBusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>(INITIAL_BUSINESSES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"Semua" | "Aktif" | "Uji coba" | "Berhenti">("Semua");
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleStatus = (bizId: string) => {
    setBusinesses((prev) =>
      prev.map((b) => {
        if (b.id === bizId) {
          const nextStatus = b.status === "Aktif" ? "Berhenti" : "Aktif";
          const nextBg =
            nextStatus === "Aktif"
              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
              : "bg-gray-100 text-gray-600 border-gray-200";
          showToast(`Status usaha "${b.name}" diubah menjadi ${nextStatus}`);
          if (selectedBusiness?.id === bizId) {
            setSelectedBusiness({ ...b, status: nextStatus, statusBg: nextBg });
          }
          return { ...b, status: nextStatus, statusBg: nextBg };
        }
        return b;
      })
    );
  };

  const filteredBusinesses = businesses.filter((b) => {
    const matchSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.type.toLowerCase().includes(search.toLowerCase()) ||
      b.owner.toLowerCase().includes(search.toLowerCase());
    if (!matchSearch) return false;
    if (statusFilter !== "Semua" && b.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="flex min-h-screen bg-[#f7faf8] font-sans">
      {/* Responsive Admin Sidebar */}
      <AdminSidebar current="Usaha" />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto pt-16 pb-20 lg:pt-8 lg:pb-8 px-4 sm:px-8 lg:px-10" data-purpose="dashboard-content">
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

        {/* TopBar */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 gap-4" data-purpose="page-header">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">Direktori Usaha Pengguna Sigap</h1>
            <p className="text-xs font-medium text-gray-500 mt-0.5">
              1.150 usaha terdaftar · 1.043 aktif menggunakan WhatsApp asisten
            </p>
          </div>

          <div className="flex items-center">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200/70 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 mr-2"></span>
              Dasbor Superadmin
            </span>
          </div>
        </header>

        {/* Statistics Grid */}
        <section aria-label="Ringkasan Statistik" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between"
          >
            <span className="text-xs font-medium text-gray-400">Usaha aktif</span>
            <div className="mt-2.5">
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">1.043</span>
              <p className="text-xs font-semibold text-emerald-600 mt-1 flex items-center">+87 bulan ini</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between"
          >
            <span className="text-xs font-medium text-gray-400">Dalam masa uji coba</span>
            <div className="mt-2.5">
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">94</span>
              <p className="text-xs font-medium text-amber-700 mt-1">23 berakhir minggu ini</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between"
          >
            <span className="text-xs font-medium text-gray-400">Retensi pelanggan</span>
            <div className="mt-2.5">
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">98,8%</span>
              <p className="text-xs font-medium text-emerald-600 mt-1">Hanya 1,2% churn</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between"
          >
            <span className="text-xs font-medium text-gray-400">Estimasi ARR</span>
            <div className="mt-2.5">
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">Rp 1,93 M</span>
              <p className="text-xs font-semibold text-emerald-600 mt-1">+9,4% MoM</p>
            </div>
          </motion.div>
        </section>

        {/* Search & Filter Toolbar */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Cari nama usaha, jenis bisnis, atau nama pemilik..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs px-3.5 py-2 pl-9 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
            <svg
              className="w-4 h-4 text-slate-400 absolute left-3 top-2.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
            {(["Semua", "Aktif", "Uji coba", "Berhenti"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition ${
                  statusFilter === tab ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Business Data Table */}
        <section
          className="mt-4 bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden"
          data-purpose="table-container"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" id="business-table">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-gray-50/50">
                  <th className="py-3.5 px-6" scope="col">Nama Usaha</th>
                  <th className="py-3.5 px-6" scope="col">Jenis</th>
                  <th className="py-3.5 px-6 text-center" scope="col">Paket</th>
                  <th className="py-3.5 px-6 text-center" scope="col">Pelanggan CRM</th>
                  <th className="py-3.5 px-6" scope="col">Aktif Terakhir</th>
                  <th className="py-3.5 px-6 text-center" scope="col">Status</th>
                  <th className="py-3.5 px-6 text-center" scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-xs">
                {filteredBusinesses.map((biz) => (
                  <tr
                    key={biz.id}
                    onClick={() => setSelectedBusiness(biz)}
                    className="hover:bg-slate-50/70 transition cursor-pointer"
                  >
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900">{biz.name}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">{biz.owner} · {biz.phone}</div>
                    </td>
                    <td className="py-4 px-6 text-gray-600 font-medium">{biz.type}</td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-block px-2.5 py-0.5 text-[11px] rounded bg-gray-100 text-gray-700 font-semibold">
                        {biz.plan}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center font-bold text-gray-800">{biz.customers}</td>
                    <td className="py-4 px-6 text-gray-500">{biz.lastActive}</td>
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${biz.statusBg}`}
                      >
                        {biz.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => setSelectedBusiness(biz)}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-lg transition"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Informational Banner */}
        <section
          className="mt-6 bg-[#ebf7f1] rounded-xl p-4 border-l-4 border-[#0fa968] flex flex-col justify-center"
          data-purpose="info-callout"
        >
          <h2 className="text-xs font-bold text-gray-900">Privasi &amp; Keamanan Terjaga</h2>
          <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">
            Admin Sigap hanya melihat telemetri penggunaan kuota, kesehatan koneksi Cloud API, dan paket aktif. Isi
            percakapan rahasia antara pemilik usaha dan pelanggan mereka dienkripsi end-to-end.
          </p>
        </section>
      </main>

      {/* MODAL: Detail Usaha */}
      <AnimatePresence>
        {selectedBusiness && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 text-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedBusiness.name}</h3>
                  <p className="text-[11px] text-slate-500">ID: {selectedBusiness.id} · {selectedBusiness.type}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedBusiness(null)}
                  className="text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="py-4 space-y-3">
                <div className="p-3 bg-slate-50 rounded-xl space-y-2 border border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Pemilik:</span>
                    <span className="font-bold text-slate-900">{selectedBusiness.owner}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Nomor WhatsApp:</span>
                    <span className="font-mono font-bold text-slate-900">{selectedBusiness.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Paket Langganan:</span>
                    <span className="font-bold text-emerald-800">Paket {selectedBusiness.plan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status Akun:</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${selectedBusiness.statusBg}`}>
                      {selectedBusiness.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-slate-600">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Percakapan Bulan Ini:</span>
                    <span className="font-bold text-slate-900">{selectedBusiness.monthlyChats} chat</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span>Pengingat Keluar Terkirim:</span>
                    <span className="font-bold text-slate-900">{selectedBusiness.monthlyReminders} pesan</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Pelanggan di CRM:</span>
                    <span className="font-bold text-slate-900">{selectedBusiness.customers} orang</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(selectedBusiness.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      selectedBusiness.status === "Aktif"
                        ? "bg-rose-50 text-rose-700 hover:bg-rose-100"
                        : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    }`}
                  >
                    {selectedBusiness.status === "Aktif" ? "Jeda Akun" : "Aktifkan Akun"}
                  </button>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        showToast(`Pesan broadcast dikirim ke ${selectedBusiness.name}`);
                        setSelectedBusiness(null);
                      }}
                      className="px-3 py-1.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800"
                    >
                      Kirim Pesan
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedBusiness(null)}
                      className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-xl font-semibold"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
