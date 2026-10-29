"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AdminSidebar from "@/components/AdminSidebar";

interface PackageItem {
  id: string;
  type: string;
  templatesCount: number;
  version: string;
  usedBy: string;
  lastUpdate: string;
  description: string;
  sampleQuestions: Array<{ q: string; a: string }>;
}

const INITIAL_PACKAGES: PackageItem[] = [
  {
    id: "pkg-1",
    type: "Barbershop & Pangkas Rambut",
    templatesCount: 14,
    version: "v2.4",
    usedBy: "312 usaha",
    lastUpdate: "18 Okt 2025",
    description: "Template spesifik jadwal potong, booking kapster, harga anak/dewasa, dan treatment cukur.",
    sampleQuestions: [
      { q: "Berapa harga potong rambut?", a: "Dewasa Rp 35.000, anak Rp 25.000 sudah termasuk keramas." },
      { q: "Jam buka berapa?", a: "Selasa–Minggu 09.00–21.00 WIB. Senin tutup." },
      { q: "Bisa booking dulu?", a: "Bisa kak! Silakan sebutkan nama dan jam yang diinginkan." },
    ],
  },
  {
    id: "pkg-2",
    type: "Laundry Kiloan & Satuan",
    templatesCount: 16,
    version: "v3.1",
    usedBy: "487 usaha",
    lastUpdate: "2 Nov 2025",
    description: "Template status cucian selesai, tarif reguler/kilat 6 jam, parfum pilihan, dan antar-jemput.",
    sampleQuestions: [
      { q: "Berapa tarif cuci kiloan?", a: "Cuci komplit reguler (2 hari) Rp 8.000/kg, kilat 1 hari Rp 12.000/kg." },
      { q: "Bisa ambil antar ke rumah?", a: "Bisa kak, gratis ongkir antar jemput minimal 5 kg dalam radius 3 km." },
      { q: "Cucian saya atas nama Budi sudah beres?", a: "Bisa kami bantu cek nomor nota/struk cuciannya kak?" },
    ],
  },
  {
    id: "pkg-3",
    type: "Bengkel Motor & Servis",
    templatesCount: 18,
    version: "v2.0",
    usedBy: "221 usaha",
    lastUpdate: "29 Sep 2025",
    description: "Template servis berkala, ganti oli mesin/gardan, tune up injeksi, dan ketersediaan sparepart.",
    sampleQuestions: [
      { q: "Biaya servis rutin berapa mas?", a: "Servis tune up ringan Rp 45.000, belum termasuk oli." },
      { q: "Ada oli Shell / Motul?", a: "Ready kak, ada Motul Expert dan Shell AX7 original resmi." },
      { q: "Bisa ganti ban tubeless?", a: "Bisa, free pasang dengan alat tire changer modern." },
    ],
  },
  {
    id: "pkg-4",
    type: "Toko Roti & Kue",
    templatesCount: 12,
    version: "v1.6",
    usedBy: "96 usaha",
    lastUpdate: "11 Agu 2025",
    description: "Template pemesanan snack box, cake ulang tahun kustom, varian rasa, dan ketahanan simpan.",
    sampleQuestions: [
      { q: "Bisa pesan snack box untuk rapat?", a: "Bisa kak! Minimal pemesanan H-1 untuk 20 kotak." },
      { q: "Bisa custom tulisan kue ulang tahun?", a: "Bisa kak, gratis lilin dan pisau pemotong kue." },
    ],
  },
  {
    id: "pkg-5",
    type: "Notaris & Jasa Profesional",
    templatesCount: 11,
    version: "v1.2",
    usedBy: "34 usaha",
    lastUpdate: "24 Okt 2025",
    description: "Template konsultasi akta, jam temu, berkas persyaratan, dan prosedur legalitas.",
    sampleQuestions: [
      { q: "Syarat pengurusan PT apa saja?", a: "KTP, NPWP para pendiri, draft nama PT, dan surat domisili." },
      { q: "Bisa konsultasi hari Sabtu?", a: "Hari Sabtu kantor kami buka khusus perjanjian temu 09.00–13.00." },
    ],
  },
];

export default function AdminTemplatePackagesPage() {
  const [packages, setPackages] = useState<PackageItem[]>(INITIAL_PACKAGES);
  const [search, setSearch] = useState("");
  const [selectedPkg, setSelectedPkg] = useState<PackageItem | null>(null);

  // New Package Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTypeName, setNewTypeName] = useState("");
  const [newVersion, setNewVersion] = useState("v1.0");
  const [newCount, setNewCount] = useState(12);
  const [newDesc, setNewDesc] = useState("");

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddPackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTypeName.trim()) return;

    const newPkg: PackageItem = {
      id: `pkg-${Date.now()}`,
      type: newTypeName.trim(),
      templatesCount: newCount,
      version: newVersion,
      usedBy: "0 usaha",
      lastUpdate: "Baru dibuat",
      description: newDesc.trim() || "Paket template industri baru.",
      sampleQuestions: [
        { q: "Berapa jam buka operasional?", a: "Buka setiap hari kerja pukul 09.00–17.00 WIB." },
        { q: "Berapa tarif layanan?", a: "Tarif bervariasi sesuai paket pilihan Anda." },
      ],
    };

    setPackages((prev) => [newPkg, ...prev]);
    setNewTypeName("");
    setNewDesc("");
    setShowAddModal(false);
    showToast(`Paket baru "${newPkg.type}" berhasil dibuat!`);
  };

  const handleDeployUpdate = (pkgId: string) => {
    setPackages((prev) =>
      prev.map((p) => {
        if (p.id === pkgId) {
          const verNum = (parseFloat(p.version.replace("v", "")) + 0.1).toFixed(1);
          const updatedVer = `v${verNum}`;
          showToast(`Pembaruan ${updatedVer} untuk ${p.type} berhasil dirilis ke ${p.usedBy}!`);
          if (selectedPkg?.id === pkgId) {
            setSelectedPkg({ ...p, version: updatedVer, lastUpdate: "Hari ini" });
          }
          return { ...p, version: updatedVer, lastUpdate: "Hari ini" };
        }
        return p;
      })
    );
  };

  const filteredPackages = packages.filter((p) =>
    p.type.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#ebf0ec] font-sans">
      {/* Responsive Admin Sidebar */}
      <AdminSidebar current="Paket" />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto pt-16 pb-20 lg:pt-8 lg:pb-8 px-4 sm:px-8 lg:px-10">
        {/* Toast Alert */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-5 right-5 z-50 bg-[#0b3d2b] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg border border-emerald-400/30 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TopBar */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Katalog Paket Template Industri</h1>
            <p className="text-xs text-slate-500 mt-0.5 font-normal">
              {packages.length} paket template terdaftar · Digunakan oleh 1.150 UMKM aktif
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 bg-[#189e68] hover:bg-[#138456] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span>+ Buat Paket Usaha Baru</span>
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-200/80 text-slate-700 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
              <span>Admin Sigap</span>
            </div>
          </div>
        </header>

        {/* Banner Notice Card */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0b3d2b] rounded-2xl p-5 mb-6 text-white flex items-start gap-4 shadow-sm"
          data-purpose="banner-card"
        >
          <div className="w-8 h-8 rounded-full bg-[#189e68] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow">
            ✓
          </div>
          <div className="pr-6">
            <h2 className="font-bold text-[13.5px] leading-tight text-white mb-1">
              Template Terstandar: Aset UMKM yang Berkembang Kolektif
            </h2>
            <p className="text-[11.5px] leading-relaxed text-emerald-100/80 max-w-5xl">
              Setiap kali satu barbershop menyempurnakan jawaban atas pertanyaan baru, tim ahli Sigap memvalidasi polanya
              dan mendistribusikannya ke seluruh pengguna paket terkait tanpa menimpa suntingan kustom masing-masing.
            </p>
          </div>
        </motion.section>

        {/* Search Bar */}
        <div className="mb-4 max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari jenis paket industri..."
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
        </div>

        {/* Table Card */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden mb-6"
          data-purpose="template-table"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[10.5px] uppercase tracking-wider text-slate-600 font-bold bg-slate-50/50">
                  <th className="py-3.5 px-6" scope="col">Jenis Industri Usaha</th>
                  <th className="py-3.5 px-6 text-center" scope="col">Isi Template</th>
                  <th className="py-3.5 px-6 text-center" scope="col">Versi Paket</th>
                  <th className="py-3.5 px-6 text-center" scope="col">Digunakan Oleh</th>
                  <th className="py-3.5 px-6" scope="col">Pembaruan Terakhir</th>
                  <th className="py-3.5 px-6 text-center" scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPackages.map((pkg) => (
                  <tr
                    key={pkg.id}
                    onClick={() => setSelectedPkg(pkg)}
                    className="hover:bg-slate-50/70 transition cursor-pointer"
                  >
                    <td className="py-4 px-6">
                      <span className="font-bold text-slate-900 block">{pkg.type}</span>
                      <span className="text-[11px] text-slate-500 mt-0.5 block max-w-sm truncate">{pkg.description}</span>
                    </td>
                    <td className="py-4 px-6 text-center font-semibold text-slate-700">
                      {pkg.templatesCount} template
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                        {pkg.version}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center font-bold text-slate-800">{pkg.usedBy}</td>
                    <td className="py-4 px-6 text-slate-500">{pkg.lastUpdate}</td>
                    <td className="py-4 px-6 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => setSelectedPkg(pkg)}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-lg transition"
                      >
                        Pratinjau
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>
      </main>

      {/* MODAL: Pratinjau Isi Paket Template */}
      <AnimatePresence>
        {selectedPkg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 text-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedPkg.type}</h3>
                  <p className="text-[11px] text-slate-500">
                    Versi {selectedPkg.version} · Digunakan oleh {selectedPkg.usedBy}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPkg(null)}
                  className="text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="py-4 space-y-3">
                <p className="text-slate-600 leading-relaxed">{selectedPkg.description}</p>

                <h4 className="font-bold text-slate-900 text-xs pt-2">Contoh Tanya-Jawab Bawaan Paket:</h4>
                <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {selectedPkg.sampleQuestions.map((q, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="font-bold text-slate-900">Q: {q.q}</p>
                      <p className="text-slate-600 mt-1">A: {q.a}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => handleDeployUpdate(selectedPkg.id)}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition"
                  >
                    Rilis Pembaruan Versi ({selectedPkg.version} → v{(parseFloat(selectedPkg.version.replace("v", "")) + 0.1).toFixed(1)})
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPkg(null)}
                    className="px-4 py-1.5 border border-slate-200 text-slate-600 font-semibold rounded-xl"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: Tambah Paket Baru */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 text-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-base font-bold text-slate-900">Buat Paket Usaha Baru</h3>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddPackage} className="mt-4 space-y-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Jenis Usaha / Industri</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Klinik Kecantikan & Skincare"
                    value={newTypeName}
                    onChange={(e) => setNewTypeName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Versi Awal</label>
                    <input
                      type="text"
                      required
                      value={newVersion}
                      onChange={(e) => setNewVersion(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Jumlah Template Bawaan</label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={newCount}
                      onChange={(e) => setNewCount(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Deskripsi Singkat Paket</label>
                  <textarea
                    rows={3}
                    placeholder="Contoh: Template reservasi dokter kecantikan, perawatan facial, dan konsultasi produk."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 font-semibold hover:bg-slate-50 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-xs transition"
                  >
                    Simpan Paket Baru
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
