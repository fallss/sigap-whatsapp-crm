"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";

interface Customer {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  avatarBg: string;
  avatarText: string;
  favService: string;
  visits: number;
  lastVisitDays: number;
  cycle: number;
  status: "Normal" | "Jatuh tempo" | "Baru";
  statusNote: string;
  ltv: string;
  optIn: boolean;
}

const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: "rizal",
    name: "Pak Rizal",
    phone: "+62 812-1100-4455",
    avatar: "R",
    avatarBg: "#dcfce7",
    avatarText: "#15803d",
    favService: "Potong + keramas",
    visits: 7,
    lastVisitDays: 34,
    cycle: 26,
    status: "Jatuh tempo",
    statusNote: "Lewat 8 hari",
    ltv: "Rp 245.000",
    optIn: true,
  },
  {
    id: "maya",
    name: "Bu Maya",
    phone: "+62 813-2244-5566",
    avatar: "M",
    avatarBg: "#fef3c7",
    avatarText: "#92400e",
    favService: "Potong anak",
    visits: 4,
    lastVisitDays: 8,
    cycle: 31,
    status: "Normal",
    statusNote: "Siklus aman",
    ltv: "Rp 100.000",
    optIn: true,
  },
  {
    id: "yudi",
    name: "Pak Yudi",
    phone: "+62 811-9988-7711",
    avatar: "Y",
    avatarBg: "#e0e7ff",
    avatarText: "#3730a3",
    favService: "Potong dewasa",
    visits: 6,
    lastVisitDays: 22,
    cycle: 28,
    status: "Normal",
    statusNote: "6 hari lagi",
    ltv: "Rp 210.000",
    optIn: true,
  },
  {
    id: "bambang",
    name: "Pak Bambang",
    phone: "+62 815-3322-1100",
    avatar: "B",
    avatarBg: "#fee2e2",
    avatarText: "#991b1b",
    favService: "Potong + jenggot",
    visits: 9,
    lastVisitDays: 45,
    cycle: 30,
    status: "Jatuh tempo",
    statusNote: "Lewat 15 hari",
    ltv: "Rp 350.000",
    optIn: true,
  },
  {
    id: "hendra",
    name: "Pak Hendra",
    phone: "+62 818-7766-5544",
    avatar: "H",
    avatarBg: "#fef3c7",
    avatarText: "#92400e",
    favService: "Potong + keramas",
    visits: 12,
    lastVisitDays: 29,
    cycle: 25,
    status: "Jatuh tempo",
    statusNote: "Lewat 4 hari",
    ltv: "Rp 420.000",
    optIn: true,
  },
  {
    id: "deni",
    name: "Mas Deni",
    phone: "+62 857-4433-2211",
    avatar: "D",
    avatarBg: "#f1f5f9",
    avatarText: "#334155",
    favService: "Potong dewasa",
    visits: 2,
    lastVisitDays: 3,
    cycle: 21,
    status: "Normal",
    statusNote: "Baru potong",
    ltv: "Rp 70.000",
    optIn: true,
  },
  {
    id: "siska",
    name: "Bu Siska",
    phone: "+62 812-3344-9988",
    avatar: "S",
    avatarBg: "#fee2e2",
    avatarText: "#991b1b",
    favService: "Creambath anak",
    visits: 5,
    lastVisitDays: 62,
    cycle: 35,
    status: "Jatuh tempo",
    statusNote: "Lewat 27 hari",
    ltv: "Rp 180.000",
    optIn: true,
  },
  {
    id: "fajar",
    name: "Mas Fajar",
    phone: "+62 819-0011-2233",
    avatar: "F",
    avatarBg: "#dbeafe",
    avatarText: "#1e40af",
    favService: "Potong + pewarnaan",
    visits: 1,
    lastVisitDays: 5,
    cycle: 28,
    status: "Baru",
    statusNote: "Kontak baru",
    ltv: "Rp 85.000",
    optIn: false,
  },
];

export default function CustomersIndexPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [search, setSearch] = useState("");
  const [filterTab, setFilterTab] = useState<"Semua" | "Jatuh tempo" | "Normal" | "Baru">("Semua");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);

  // Form State
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newService, setNewService] = useState("Potong dewasa");
  const [newCycle, setNewCycle] = useState("26");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredCustomers = customers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.favService.toLowerCase().includes(search.toLowerCase());
    if (!matchSearch) return false;
    if (filterTab === "Semua") return true;
    return c.status === filterTab;
  });

  const overdueCount = customers.filter((c) => c.status === "Jatuh tempo").length;

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;

    const newCust: Customer = {
      id: `cust_${Date.now()}`,
      name: newName,
      phone: newPhone,
      avatar: newName.charAt(0).toUpperCase(),
      avatarBg: "#dcfce7",
      avatarText: "#15803d",
      favService: newService,
      visits: 1,
      lastVisitDays: 1,
      cycle: parseInt(newCycle, 10) || 26,
      status: "Baru",
      statusNote: "Baru ditambahkan",
      ltv: "Rp 35.000",
      optIn: true,
    };

    setCustomers([newCust, ...customers]);
    setShowAddModal(false);
    setNewName("");
    setNewPhone("");
    showToast(`✓ Pelanggan baru ${newName} berhasil ditambahkan ke CRM Sigap!`);
  };

  const handleSendSingleReminder = (cust: Customer) => {
    showToast(`✓ Pesan pengingat berhasil dikirimkan ke WhatsApp ${cust.name} (${cust.phone})!`);
  };

  const handleBroadcastOverdue = () => {
    setShowBroadcastModal(false);
    showToast(`✓ Pesan pengingat berhasil dikirimkan sekaligus ke ${overdueCount} pelanggan jatuh tempo!`);
  };

  const handleExportCSV = () => {
    const headers = "Nama,Nomor WhatsApp,Layanan Favorit,Kunjungan,Hari Lalu,Siklus (Hari),Status,LTV,Izin Pesan\n";
    const rows = customers
      .map(
        (c) =>
          `"${c.name}","${c.phone}","${c.favService}",${c.visits},${c.lastVisitDays},${c.cycle},"${c.status} (${c.statusNote})","${c.ltv}","${c.optIn ? "Ya" : "Tidak"}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Data_Pelanggan_Sigap_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("✓ File CSV berhasil diunduh ke perangkat Anda!");
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      {/* Sidebar Navigation */}
      <Sidebar current="Pelanggan" />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 pt-16 pb-24 lg:pt-8 lg:pb-8 px-4 sm:px-6 lg:px-8 overflow-y-auto">
        {/* Top Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200/70 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Database CRM Pelanggan
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              {customers.length} pelanggan terdata · {overdueCount} jatuh tempo potong rambut
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              <span>Ekspor CSV</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-[#199e67] hover:bg-[#148556] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>+ Tambah Pelanggan</span>
            </button>
          </div>
        </header>

        {/* Toast Alert */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-semibold shadow-xs flex items-center justify-between"
            >
              <span>{toastMessage}</span>
              <button onClick={() => setToastMessage(null)} className="text-emerald-700 hover:text-emerald-900 ml-4">
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Summary Stat Cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mt-6">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/70 shadow-2xs">
            <span className="text-[11px] sm:text-xs text-slate-500 font-medium">Total Pelanggan</span>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">{customers.length}</div>
            <span className="text-[10px] sm:text-[11px] text-emerald-600 font-semibold">+23 bulan ini</span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/70 shadow-2xs">
            <span className="text-[11px] sm:text-xs text-slate-500 font-medium">Jatuh Tempo Potong</span>
            <div className="text-xl sm:text-2xl font-bold text-amber-600 mt-1">{overdueCount}</div>
            <button
              onClick={() => setShowBroadcastModal(true)}
              className="text-[10px] sm:text-[11px] text-amber-700 font-bold hover:underline"
            >
              Kirim pengingat masal →
            </button>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/70 shadow-2xs">
            <span className="text-[11px] sm:text-xs text-slate-500 font-medium">Rata-rata Siklus</span>
            <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">26 hari</div>
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Area barbershop: 27 hr</span>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/70 shadow-2xs">
            <span className="text-[11px] sm:text-xs text-slate-500 font-medium">Izin Pesan WhatsApp</span>
            <div className="text-xl sm:text-2xl font-bold text-emerald-600 mt-1">94%</div>
            <span className="text-[10px] sm:text-[11px] text-emerald-700 font-medium">173 bersedia diingatkan</span>
          </div>
        </section>

        {/* Filter and Search Bar */}
        <div className="mt-7 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
            {(["Semua", "Jatuh tempo", "Normal", "Baru"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-3 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap ${
                  filterTab === tab
                    ? "bg-[#0d4a3b] text-white shadow-2xs"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {tab} {tab === "Jatuh tempo" ? `(${overdueCount})` : ""}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Cari nama, nomor, layanan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs px-3.5 py-2 pl-9 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
            />
            <svg
              className="w-4 h-4 text-slate-400 absolute left-3 top-2.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
        </div>

        {/* Customer Data Table */}
        <section className="mt-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-400 font-semibold uppercase text-[10.5px] tracking-wider">
                  <th className="py-3.5 px-5">Pelanggan</th>
                  <th className="py-3.5 px-5">Layanan Favorit</th>
                  <th className="py-3.5 px-5 text-center">Kunjungan</th>
                  <th className="py-3.5 px-5">Terakhir Datang</th>
                  <th className="py-3.5 px-5 text-center">Siklus</th>
                  <th className="py-3.5 px-5 text-center">Status</th>
                  <th className="py-3.5 px-5 text-right">Nilai (LTV)</th>
                  <th className="py-3.5 px-5 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-400">
                      Tidak ada pelanggan yang cocok dengan pencarian &quot;{search}&quot;.
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((cust) => (
                    <tr key={cust.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-5">
                        <Link href="/customers/pak-rizal" className="flex items-center gap-3 group">
                          <div
                            style={{ backgroundColor: cust.avatarBg, color: cust.avatarText }}
                            className="w-8 h-8 rounded-full font-bold flex items-center justify-center text-xs shrink-0"
                          >
                            {cust.avatar}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 transition">
                              {cust.name}
                            </div>
                            <div className="text-[11px] text-slate-400">{cust.phone}</div>
                          </div>
                        </Link>
                      </td>
                      <td className="py-3.5 px-5 font-medium text-slate-800">{cust.favService}</td>
                      <td className="py-3.5 px-5 text-center font-bold text-slate-900">{cust.visits}×</td>
                      <td className="py-3.5 px-5">
                        <span className="font-medium text-slate-700">{cust.lastVisitDays} hari lalu</span>
                      </td>
                      <td className="py-3.5 px-5 text-center font-semibold text-slate-700">{cust.cycle} hari</td>
                      <td className="py-3.5 px-5 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold border ${
                            cust.status === "Jatuh tempo"
                              ? "bg-amber-50 text-amber-800 border-amber-200"
                              : cust.status === "Baru"
                              ? "bg-blue-50 text-blue-800 border-blue-200"
                              : "bg-emerald-50 text-emerald-800 border-emerald-200"
                          }`}
                        >
                          {cust.statusNote}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right font-bold text-slate-900">{cust.ltv}</td>
                      <td className="py-3.5 px-5 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {cust.status === "Jatuh tempo" && (
                            <button
                              onClick={() => handleSendSingleReminder(cust)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] transition-colors"
                              title="Kirim pengingat WhatsApp"
                            >
                              Ingatkan WA
                            </button>
                          )}
                          <Link
                            href="/customers/pak-rizal"
                            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition-colors"
                          >
                            Detail
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Modal: Tambah Pelanggan Baru */}
        <AnimatePresence>
          {showAddModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-base font-bold text-slate-900">Tambah Pelanggan Baru</h3>
                  <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                    ✕
                  </button>
                </div>

                <form onSubmit={handleAddCustomer} className="space-y-4 mt-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Mas Budi Santoso"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Nomor WhatsApp</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: +62 812-3456-7890"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Layanan Favorit</label>
                    <select
                      value={newService}
                      onChange={(e) => setNewService(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                    >
                      <option value="Potong dewasa">Potong dewasa (Rp 35.000)</option>
                      <option value="Potong + keramas">Potong + keramas (Rp 35.000)</option>
                      <option value="Potong anak">Potong anak (Rp 25.000)</option>
                      <option value="Potong + jenggot">Potong + jenggot (Rp 50.000)</option>
                      <option value="Pewarnaan / Semir">Pewarnaan / Semir (Rp 60.000)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Perkiraan Siklus Potong (Hari)</label>
                    <input
                      type="number"
                      value={newCycle}
                      onChange={(e) => setNewCycle(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <p className="text-[10.5px] text-slate-400 mt-1">
                      Sigap akan otomatis mengirimkan pengingat WhatsApp ketika pelanggan melewati siklus ini.
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-semibold"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#199e67] hover:bg-[#148556] text-white rounded-lg font-semibold shadow-xs"
                    >
                      Simpan Pelanggan
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modal: Broadcast Pengingat Masal */}
        <AnimatePresence>
          {showBroadcastModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg mb-3">
                  ⚡
                </div>
                <h3 className="text-base font-bold text-slate-900">Kirim Pengingat Masal WhatsApp?</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Sigap akan mengirim pesan pengingat ramah ke <strong>{overdueCount} pelanggan</strong> yang sudah melewati siklus potong rambutnya.
                </p>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 mt-3 font-mono">
                  “Halo Kak [Nama], sudah [X] hari sejak potong rambut terakhir di Barbershop Rapi Bro. Kursi Anda siap akhir pekan ini!”
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowBroadcastModal(false)}
                    className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-semibold text-xs"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleBroadcastOverdue}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold text-xs shadow-xs"
                  >
                    Kirim Sekarang ({overdueCount} Pesan)
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
