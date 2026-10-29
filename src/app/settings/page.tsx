"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  roleDescription: string;
  status: "Anda" | "Aktif";
}

const INITIAL_TEAM: TeamMember[] = [
  {
    id: 1,
    name: "Pak Andi",
    role: "Pemilik",
    roleDescription: "Akses penuh sistem",
    status: "Anda",
  },
  {
    id: 2,
    name: "Mas Deni",
    role: "Kapster",
    roleDescription: "Hanya inbox & chat",
    status: "Aktif",
  },
  {
    id: 3,
    name: "Mas Rio",
    role: "Kapster",
    roleDescription: "Hanya inbox & chat",
    status: "Aktif",
  },
];

export default function SettingsPage() {
  const router = useRouter();

  // Business Profile
  const [bizName, setBizName] = useState("Barbershop Rapi Bro");
  const [bizAddress, setBizAddress] = useState("Jl. Pahlawan No. 42, Tangerang");
  const [bizHours, setBizHours] = useState("Selasa–Minggu, 09.00–21.00");
  const [bizPhone, setBizPhone] = useState("+62 895-3461-84632");

  // Team
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("Kapster");

  // WhatsApp Diagnostics Modal
  const [showDiagnosticModal, setShowDiagnosticModal] = useState(false);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<{
    latency: number;
    graphApi: string;
    webhook: string;
    quality: string;
  } | null>(null);

  // Token management
  const [showToken, setShowToken] = useState(false);
  const apiToken = "EAAO7zZC1ZA4j4BO8ZB5Y6u3r21p9q0X_sigap_live_token";

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Profil usaha berhasil disimpan dan disinkronkan ke AI Sigap!");
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const newMember: TeamMember = {
      id: Date.now(),
      name: newMemberName.trim(),
      role: newMemberRole,
      roleDescription: newMemberRole === "Pemilik" ? "Akses penuh sistem" : "Hanya inbox & chat",
      status: "Aktif",
    };

    setTeam((prev) => [...prev, newMember]);
    setNewMemberName("");
    setShowAddMemberModal(false);
    showToast(`Anggota tim ${newMember.name} berhasil ditambahkan!`);
  };

  const handleDeleteMember = (id: number) => {
    const member = team.find((m) => m.id === id);
    if (member?.status === "Anda") {
      showToast("Anda tidak dapat menghapus akun pemilik utama.");
      return;
    }
    if (confirm(`Hapus ${member?.name} dari tim?`)) {
      setTeam((prev) => prev.filter((m) => m.id !== id));
      showToast("Anggota tim berhasil dihapus.");
    }
  };

  const runDiagnostic = () => {
    setIsDiagnosing(true);
    setDiagnosticResult(null);
    setShowDiagnosticModal(true);

    setTimeout(() => {
      setIsDiagnosing(false);
      setDiagnosticResult({
        latency: 42,
        graphApi: "v21.0 Connected (HTTP 200 OK)",
        webhook: "Active & Verified (sigap.id/api/webhook)",
        quality: "GREEN (High Quality Rating)",
      });
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      {/* Sidebar Navigation */}
      <Sidebar current="Pengaturan" />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto pt-14 pb-24 lg:pt-0 lg:pb-10">
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

        {/* Top Header Bar */}
        <header className="px-4 sm:px-6 lg:px-8 pt-5 sm:pt-7 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Pengaturan Sistem</h1>
            <p className="text-xs text-gray-500 font-medium mt-0.5">{bizName} · Outlet Utama</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={runDiagnostic}
              className="px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl shadow-2xs transition flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
              <span>Uji Koneksi WhatsApp</span>
            </button>

            {/* WhatsApp Connection Status Badge */}
            <div className="inline-flex items-center space-x-2 bg-[#E7F3ED] text-[#1E6B4B] px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
              <span>WhatsApp Cloud API Terhubung</span>
            </div>
          </div>
        </header>

        {/* Main Settings Two-Column Grid */}
        <div className="px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* Card: Profil Usaha */}
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100"
              data-purpose="business-profile-card"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-gray-900">Profil Usaha &amp; Outlet</h2>
                <span className="text-[10px] text-slate-400">Dipakai AI untuk menjawab pelanggan</span>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1" htmlFor="biz-name">
                    Nama Usaha
                  </label>
                  <input
                    className="w-full text-xs font-normal text-gray-800 bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] outline-none transition"
                    id="biz-name"
                    type="text"
                    value={bizName}
                    onChange={(e) => setBizName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1" htmlFor="biz-address">
                    Alamat Lengkap &amp; Patokan Lokasi
                  </label>
                  <input
                    className="w-full text-xs font-normal text-gray-800 bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] outline-none transition"
                    id="biz-address"
                    type="text"
                    value={bizAddress}
                    onChange={(e) => setBizAddress(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1" htmlFor="biz-hours">
                    Hari &amp; Jam Operasional
                  </label>
                  <input
                    className="w-full text-xs font-normal text-gray-800 bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 focus:ring-1 focus:ring-[#10B981] focus:border-[#10B981] outline-none transition"
                    id="biz-hours"
                    type="text"
                    value={bizHours}
                    onChange={(e) => setBizHours(e.target.value)}
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold rounded-xl shadow-2xs transition"
                  >
                    Simpan Perubahan Profil
                  </button>
                </div>
              </form>
            </motion.section>

            {/* Card: Nomor WhatsApp Resmi */}
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100"
              data-purpose="whatsapp-number-card"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-gray-900">Nomor WhatsApp Cloud API</h2>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Resmi Meta
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-gray-500 font-medium">Nomor Telepon</span>
                  <span className="font-bold text-gray-900 tracking-wide">{bizPhone}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-gray-500 font-medium">Status Verifikasi</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    ✓ Terverifikasi Meta Business
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-gray-500 font-medium">Mutu Kualitas Nomor</span>
                  <span className="font-semibold text-emerald-700">Tinggi (Hijau)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Jatah Kuota Percakapan</span>
                  <span className="font-bold text-gray-900">1.500 / bulan (Terpakai: 1.020)</span>
                </div>
              </div>
            </motion.section>

            {/* Card: API & Webhook Credentials */}
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100"
            >
              <h2 className="text-sm font-bold text-gray-900 mb-4">Kredensial API &amp; Webhook</h2>

              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-gray-500 font-medium mb-1">Access Token Sigap Live</label>
                  <div className="flex gap-2">
                    <input
                      type={showToken ? "text" : "password"}
                      readOnly
                      value={apiToken}
                      className="flex-1 bg-slate-50 border border-slate-200 text-slate-700 p-2 rounded-xl text-xs font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowToken(!showToken)}
                      className="px-2.5 py-1.5 border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 font-semibold text-[11px]"
                    >
                      {showToken ? "Sembunyikan" : "Lihat"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(apiToken);
                        showToast("Token API berhasil disalin ke clipboard!");
                      }}
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-bold text-[11px]"
                    >
                      Salin
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-500 font-medium mb-1">Webhook Callback URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value="https://sigap.id/api/v1/webhook/whatsapp"
                      className="flex-1 bg-slate-50 border border-slate-200 text-slate-700 p-2 rounded-xl text-xs font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText("https://sigap.id/api/v1/webhook/whatsapp");
                        showToast("Webhook URL berhasil disalin!");
                      }}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-bold text-[11px]"
                    >
                      Salin
                    </button>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Card: Tim & Akses Staf */}
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100"
              data-purpose="team-members-card"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-bold text-gray-900">Anggota Tim &amp; Staf</h2>
                  <p className="text-[11px] text-slate-500 mt-0.5">{team.length} dari 3 pengguna aktif di Paket Plus</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddMemberModal(true)}
                  className="px-3 py-1.5 bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold rounded-xl shadow-2xs transition"
                >
                  + Tambah Staf
                </button>
              </div>

              <div className="divide-y divide-gray-100">
                {team.map((member) => (
                  <div key={member.id} className="flex items-center justify-between py-3">
                    <div>
                      <div className="text-xs font-bold text-gray-900">{member.name}</div>
                      <div className="text-[11px] text-gray-500 mt-0.5">
                        {member.role} · {member.roleDescription}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                          member.status === "Anda"
                            ? "bg-[#E7F5EE] text-[#1E7453]"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {member.status}
                      </span>
                      {member.status !== "Anda" && (
                        <button
                          type="button"
                          onClick={() => handleDeleteMember(member.id)}
                          className="text-slate-400 hover:text-rose-600 text-xs p-1"
                          title="Hapus staf"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Card: Langganan Saat Ini */}
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100"
              data-purpose="subscription-card"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-gray-900">Langganan Aktif</h2>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Auto-Renewal Aktif
                </span>
              </div>

              {/* Active Plan Banner */}
              <div className="bg-[#0F4733] text-white p-5 rounded-2xl shadow-xs mb-5">
                <div className="text-[10px] uppercase tracking-wider font-bold text-emerald-200">
                  PAKET AKTIF SAAT INI
                </div>
                <div className="text-xl font-bold mt-1 tracking-tight">Paket Plus (Barbershop)</div>
                <div className="text-[11px] text-emerald-100/90 mt-1">
                  Rp 199.000 / bulan / outlet · Tagihan berikutnya: 1 Desember 2025
                </div>
              </div>

              {/* Usage Metrics */}
              <div className="space-y-3 text-xs mb-5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-gray-500 font-medium">Percakapan bulan ini</span>
                  <span className="font-bold text-gray-900">1.020 / 1.500 percakapan</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-gray-500 font-medium">Pelanggan terdata di CRM</span>
                  <span className="font-bold text-gray-900">184 kontak</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-gray-500 font-medium">Pengguna aktif</span>
                  <span className="font-bold text-gray-900">{team.length} / 3 pengguna</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Metode pembayaran tersimpan</span>
                  <span className="font-bold text-gray-900">BCA Virtual Account</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => router.push("/pricing")}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-xs text-center"
              >
                Tingkatkan / Ubah Paket Langganan →
              </button>
            </motion.section>
          </div>
        </div>
      </main>

      {/* MODAL: Tambah Anggota Tim */}
      <AnimatePresence>
        {showAddMemberModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-base font-bold text-slate-900">Tambah Anggota Tim / Staf</h3>
                <button
                  type="button"
                  onClick={() => setShowAddMemberModal(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddMember} className="mt-4 space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Mas Budi / Mbak Rina"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Peran &amp; Hak Akses</label>
                  <select
                    value={newMemberRole}
                    onChange={(e) => setNewMemberRole(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Kapster">Kapster (Hanya membaca &amp; membalas chat Inbox)</option>
                    <option value="Kasir">Kasir (Melihat profil pelanggan &amp; riwayat kunjungan)</option>
                    <option value="Pemilik">Pemilik (Akses penuh termasuk pengaturan &amp; paket)</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAddMemberModal(false)}
                    className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 font-semibold hover:bg-slate-50 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#10B981] text-white rounded-xl font-bold hover:bg-[#059669] shadow-xs transition"
                  >
                    Simpan Anggota
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: WhatsApp Connection Diagnostics */}
      <AnimatePresence>
        {showDiagnosticModal && (
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
                  <h3 className="text-sm font-bold text-slate-900">Diagnostik WhatsApp Cloud API</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDiagnosticModal(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              </div>

              {isDiagnosing ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-10 h-10 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="font-semibold text-slate-700">Menghubungi server Meta Graph API...</p>
                  <p className="text-[11px] text-slate-400">Memeriksa webhook latency &amp; status nomor</p>
                </div>
              ) : diagnosticResult ? (
                <div className="py-4 space-y-3.5">
                  <div className="p-3 bg-emerald-50 border border-emerald-200/80 rounded-xl text-emerald-900">
                    <div className="font-bold text-xs flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      Semua Layanan WhatsApp Berfungsi Normal (100%)
                    </div>
                    <div className="text-[11px] text-emerald-800 mt-1">
                      Koneksi stabil, respons bot rata-rata {diagnosticResult.latency} ms.
                    </div>
                  </div>

                  <div className="space-y-2 text-slate-600">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span>Meta Graph API:</span>
                      <span className="font-mono font-bold text-slate-900">{diagnosticResult.graphApi}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span>Webhook Status:</span>
                      <span className="font-mono font-bold text-slate-900">Terverifikasi (200 OK)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span>Quality Rating:</span>
                      <span className="font-bold text-emerald-700">{diagnosticResult.quality}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Latency Ping:</span>
                      <span className="font-bold text-emerald-700">{diagnosticResult.latency} ms</span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={runDiagnostic}
                      className="px-3 py-1.5 border border-slate-200 rounded-xl text-slate-700 font-semibold hover:bg-slate-50"
                    >
                      Uji Ulang Ping
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDiagnosticModal(false)}
                      className="px-4 py-1.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              ) : null}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
