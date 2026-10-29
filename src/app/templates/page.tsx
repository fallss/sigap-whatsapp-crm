"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";

interface TemplateQA {
  id: number;
  question: string;
  answer: string;
  category?: string;
  enabled: boolean;
}

const INITIAL_TEMPLATES: TemplateQA[] = [
  {
    id: 1,
    question: "Berapa harga potong rambut?",
    answer: "Potong rambut dewasa Rp 35.000, anak-anak Rp 25.000. Sudah termasuk keramas dan pijat ringan.",
    category: "Harga",
    enabled: true,
  },
  {
    id: 2,
    question: "Jam buka berapa?",
    answer: "Buka setiap hari Selasa–Minggu pukul 09.00–21.00 WIB. Hari Senin kami libur.",
    category: "Operasional",
    enabled: true,
  },
  {
    id: 3,
    question: "Antre berapa lama?",
    answer: "Biasanya 15–30 menit di jam sibuk. Mau kami bantu cekkan antrean saat ini?",
    category: "Operasional",
    enabled: true,
  },
  {
    id: 4,
    question: "Bisa booking dulu?",
    answer: "Bisa kak! Silakan sebutkan nama dan jam yang diinginkan, nanti langsung kami catatkan di jadwal kapster.",
    category: "Layanan",
    enabled: true,
  },
  {
    id: 5,
    question: "Lokasinya di mana?",
    answer: "Jl. Pahlawan No. 42, sebelah Indomaret. Tersedia area parkir motor yang luas dan aman.",
    category: "Operasional",
    enabled: true,
  },
  {
    id: 6,
    question: "Terima pembayaran apa saja?",
    answer: "Kami menerima uang tunai, QRIS (GoPay, OVO, Dana, BCA, dll), dan transfer bank.",
    category: "Harga",
    enabled: true,
  },
  {
    id: 7,
    question: "Ada potong untuk anak?",
    answer: "Ada kak. Potong rambut anak di bawah usia 10 tahun Rp 25.000, kapster kami sabar dan ramah anak.",
    category: "Layanan",
    enabled: true,
  },
  {
    id: 8,
    question: "Bisa cukur jenggot saja?",
    answer: "Bisa, cukur jenggot / kumis Rp 20.000. Jika dipaketkan dengan potong rambut cukup Rp 50.000.",
    category: "Harga",
    enabled: true,
  },
  {
    id: 9,
    question: "Hari libur nasional buka tidak?",
    answer: "Hari libur nasional kami tetap buka dengan jam khusus 10.00–18.00 WIB.",
    category: "Operasional",
    enabled: false,
  },
];

export default function TemplatesPage() {
  const [mode, setMode] = useState<"draft" | "auto">("draft");
  const [guard1, setGuard1] = useState(true);
  const [guard2, setGuard2] = useState(true);
  const [guard3, setGuard3] = useState(false);
  const [templates, setTemplates] = useState<TemplateQA[]>(INITIAL_TEMPLATES);

  // Filter & Search
  const [search, setSearch] = useState("");
  const [filterTab, setFilterTab] = useState<"Semua" | "Aktif" | "Nonaktif">("Semua");

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Add / Edit Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<TemplateQA | null>(null);
  const [formQuestion, setFormQuestion] = useState("");
  const [formAnswer, setFormAnswer] = useState("");
  const [formCategory, setFormCategory] = useState("Layanan");

  // AI Simulator Interactive State
  const [simulatorInput, setSimulatorInput] = useState("");
  const [simulatorChat, setSimulatorChat] = useState<
    Array<{ sender: "user" | "sigap"; text: string; time: string; badge?: string }>
  >([
    {
      sender: "user",
      text: "Halo mas, harga potong rambut sekarang berapa ya?",
      time: "10:14",
    },
    {
      sender: "sigap",
      text: "Potong rambut dewasa Rp 35.000, anak-anak Rp 25.000. Sudah termasuk keramas dan pijat ringan.",
      time: "10:14",
      badge: "Template: Harga (Akurasi 99%)",
    },
  ]);
  const [isSimulating, setIsSimulating] = useState(false);

  // Toggle template enabled state
  const toggleTemplate = (id: number) => {
    setTemplates((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const newState = !t.enabled;
          showToast(`Template "${t.question.slice(0, 25)}..." ${newState ? "diaktifkan" : "dinonaktifkan"}`);
          return { ...t, enabled: newState };
        }
        return t;
      })
    );
  };

  // Save new template
  const handleSaveNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formQuestion.trim() || !formAnswer.trim()) return;

    const newT: TemplateQA = {
      id: Date.now(),
      question: formQuestion.trim(),
      answer: formAnswer.trim(),
      category: formCategory,
      enabled: true,
    };

    setTemplates((prev) => [newT, ...prev]);
    setFormQuestion("");
    setFormAnswer("");
    setShowAddModal(false);
    showToast("Template baru berhasil ditambahkan!");
  };

  // Save edited template
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTemplate || !formQuestion.trim() || !formAnswer.trim()) return;

    setTemplates((prev) =>
      prev.map((t) =>
        t.id === editingTemplate.id
          ? { ...t, question: formQuestion.trim(), answer: formAnswer.trim(), category: formCategory }
          : t
      )
    );
    setEditingTemplate(null);
    setFormQuestion("");
    setFormAnswer("");
    showToast("Perubahan template berhasil disimpan!");
  };

  // Delete template
  const handleDeleteTemplate = (id: number) => {
    const target = templates.find((t) => t.id === id);
    if (confirm(`Hapus template "${target?.question}"?`)) {
      setTemplates((prev) => prev.filter((t) => t.id !== id));
      showToast("Template berhasil dihapus.");
    }
  };

  // Open edit modal
  const openEditModal = (t: TemplateQA) => {
    setEditingTemplate(t);
    setFormQuestion(t.question);
    setFormAnswer(t.answer);
    setFormCategory(t.category || "Layanan");
  };

  // Run AI Simulator response
  const handleRunSimulator = (customText?: string) => {
    const textQuery = customText || simulatorInput;
    if (!textQuery.trim() || isSimulating) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    // Add user message to simulator
    setSimulatorChat((prev) => [...prev, { sender: "user", text: textQuery, time: timeStr }]);
    if (!customText) setSimulatorInput("");
    setIsSimulating(true);

    setTimeout(() => {
      const lower = textQuery.toLowerCase();
      let reply = "";
      let badge = "Dijawab otomatis";

      // Guard 1 check: Complaint detection
      if (
        guard1 &&
        (lower.includes("kecewa") ||
          lower.includes("jelek") ||
          lower.includes("komplain") ||
          lower.includes("rusak") ||
          lower.includes("pendek") ||
          lower.includes("marah"))
      ) {
        reply =
          "Mohon maaf atas ketidaknyamanannya kak. Kami catat keluhan ini dan langsung kami teruskan ke pemilik/kapster senior kami.";
        badge = "Batas Aman Aktif: Keluhan Terdeteksi (Mode Draf)";
      } else {
        // Find best template match
        const matched = templates
          .filter((t) => t.enabled)
          .find((t) => {
            const q = t.question.toLowerCase();
            const words = lower.split(" ").filter((w) => w.length > 3);
            return words.some((w) => q.includes(w));
          });

        if (matched) {
          reply = matched.answer;
          badge = `Template Cocok: ${matched.category || "Umum"}`;
        } else if (lower.includes("halo") || lower.includes("pagi") || lower.includes("siang") || lower.includes("malam")) {
          reply =
            "Halo kak! Selamat datang di Barbershop Rapi Bro. Ada yang bisa kami bantu seputar potong rambut, jadwal, atau lokasi?";
          badge = "Template Sapaan Ramah";
        } else {
          reply =
            "Terima kasih atas pesannya kak. Untuk pertanyaan spesifik ini, kapster kami akan segera membalas langsung ya!";
          badge = mode === "auto" ? "Fallback Otomatis" : "Draf untuk Pemilik";
        }
      }

      setSimulatorChat((prev) => [...prev, { sender: "sigap", text: reply, time: timeStr, badge }]);
      setIsSimulating(false);
    }, 900);
  };

  // Filtered templates
  const filteredTemplates = useMemo(() => {
    return templates.filter((t) => {
      const matchSearch =
        t.question.toLowerCase().includes(search.toLowerCase()) ||
        t.answer.toLowerCase().includes(search.toLowerCase());
      if (!matchSearch) return false;
      if (filterTab === "Aktif") return t.enabled;
      if (filterTab === "Nonaktif") return !t.enabled;
      return true;
    });
  }, [templates, search, filterTab]);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      {/* Sidebar Navigation */}
      <Sidebar current="Template" />

      {/* BEGIN: MainContent */}
      <main
        className="flex-1 flex flex-col min-w-0 pt-16 pb-24 lg:pt-8 lg:pb-8 px-4 sm:px-6 lg:px-8 overflow-y-auto"
        data-purpose="content-area"
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

        {/* BEGIN: TopBar */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 leading-snug">
              Template &amp; Mode AI
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {templates.filter((t) => t.enabled).length} template aktif ·{" "}
              {mode === "draft" ? "Mode draf (pemilik konfirmasi)" : "Mode otomatis (langsung dibalas Sigap)"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setFormQuestion("");
                setFormAnswer("");
                setFormCategory("Layanan");
                setShowAddModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold rounded-xl shadow-xs transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span>+ Tambah Template</span>
            </button>

            {/* Connection Status Indicator */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#DDF3E8] border border-emerald-200/70 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <span className="text-[11px] font-semibold text-[#047857]">WhatsApp terhubung</span>
            </div>
          </div>
        </header>
        {/* END: TopBar */}

        {/* BEGIN: TwoColumnLayout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pb-8">
          {/* BEGIN: LeftColumn (AI Modes, Limits, and Live Simulator) */}
          <section className="lg:col-span-5 flex flex-col gap-6" data-purpose="ai-configuration">
            {/* Mode AI Card Box */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80"
            >
              <div className="flex items-center justify-between mb-3.5">
                <h2 className="text-xs font-bold text-slate-900 tracking-wide uppercase">Mode AI Saat Ini</h2>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {mode === "draft" ? "Aman Terkendali" : "Otomatis 24 Jam"}
                </span>
              </div>

              <div className="space-y-3">
                {/* Mode Draf */}
                <div
                  onClick={() => {
                    setMode("draft");
                    showToast("Beralih ke Mode Draf. Anda yang menyetujui setiap balasan.");
                  }}
                  className={`relative p-3.5 rounded-xl transition-all cursor-pointer ${
                    mode === "draft"
                      ? "border-2 border-[#10B981] bg-[#F0FAF5] shadow-xs"
                      : "border border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                        mode === "draft" ? "border-2 border-[#10B981] bg-white" : "border border-slate-300"
                      }`}
                    >
                      {mode === "draft" && <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 leading-tight">Mode draf</h3>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                        Sigap menyiapkan balasan berdasarkan template, Anda yang menekan tombol kirim. Cocok untuk
                        menjaga kendali penuh.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mode Otomatis */}
                <div
                  onClick={() => {
                    setMode("auto");
                    showToast("Beralih ke Mode Otomatis. Pertanyaan cocok langsung dibalas Sigap.");
                  }}
                  className={`relative p-3.5 rounded-xl transition-all cursor-pointer ${
                    mode === "auto"
                      ? "border-2 border-[#10B981] bg-[#F0FAF5] shadow-xs"
                      : "border border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                        mode === "auto" ? "border-2 border-[#10B981] bg-white" : "border border-slate-300"
                      }`}
                    >
                      {mode === "auto" && <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 leading-tight">Mode otomatis</h3>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        Sigap langsung membalas pertanyaan yang sudah ada templatenya secara instan 24/7.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Batas Aman Settings Box */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-bold text-slate-900 tracking-wide uppercase">Batas Aman AI</h2>
                <span className="text-[10px] text-slate-400">Proteksi Bisnis</span>
              </div>
              <div className="divide-y divide-slate-100">
                {/* Limit 1 */}
                <div className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold text-slate-800 leading-snug block">
                      Teruskan kalau pelanggan menyebut keluhan
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Otomatis tahan balasan dan serahkan ke Anda saat ada nada kecewa
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setGuard1(!guard1);
                      showToast(`Batas keluhan ${!guard1 ? "diaktifkan" : "dinonaktifkan"}`);
                    }}
                    className={`w-9 h-5 rounded-full p-0.5 flex items-center shrink-0 cursor-pointer shadow-inner transition-colors ${
                      guard1 ? "bg-[#10B981] justify-end" : "bg-slate-300 justify-start"
                    }`}
                  >
                    <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-xs" />
                  </button>
                </div>

                {/* Limit 2 */}
                <div className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold text-slate-800 leading-snug block">
                      Jangan sebut harga di luar daftar
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Mencegah AI menebak tarif layanan yang belum didaftarkan
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setGuard2(!guard2);
                      showToast(`Batas daftar harga ${!guard2 ? "diaktifkan" : "dinonaktifkan"}`);
                    }}
                    className={`w-9 h-5 rounded-full p-0.5 flex items-center shrink-0 cursor-pointer shadow-inner transition-colors ${
                      guard2 ? "bg-[#10B981] justify-end" : "bg-slate-300 justify-start"
                    }`}
                  >
                    <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-xs" />
                  </button>
                </div>

                {/* Limit 3 */}
                <div className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold text-slate-800 leading-snug block">
                      Hanya balas di jam 06.00–23.00
                    </span>
                    <span className="text-[10px] text-slate-400">Di tengah malam tahan draf hingga pagi</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setGuard3(!guard3);
                      showToast(`Jam operasional ${!guard3 ? "diaktifkan" : "dinonaktifkan"}`);
                    }}
                    className={`w-9 h-5 rounded-full p-0.5 flex items-center shrink-0 cursor-pointer shadow-inner transition-colors ${
                      guard3 ? "bg-[#10B981] justify-end" : "bg-slate-300 justify-start"
                    }`}
                  >
                    <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-xs" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* LIVE AI SIMULATOR WIDGET */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-gradient-to-br from-[#0c4a3b] to-[#125847] text-white rounded-2xl p-5 shadow-sm border border-emerald-800/40"
              data-purpose="ai-simulator-widget"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                  <h2 className="text-xs font-bold tracking-wide text-white uppercase">Simulator Live AI Sigap</h2>
                </div>
                <span className="text-[10px] bg-emerald-700/60 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-600/50">
                  Uji Coba Respon
                </span>
              </div>
              <p className="text-[11px] text-emerald-100/80 mb-3.5">
                Ketik pertanyaan pelanggan apa pun untuk melihat bagaimana Sigap merespon dan menerapkan batas aman.
              </p>

              {/* Chat Window */}
              <div className="bg-[#f8faf9] rounded-xl p-3 text-slate-800 h-48 overflow-y-auto space-y-2.5 mb-3 border border-emerald-900/20">
                {simulatorChat.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${msg.sender === "user" ? "items-start" : "items-end"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl p-2.5 text-[11px] leading-relaxed shadow-2xs ${
                        msg.sender === "user"
                          ? "bg-white border border-slate-200 text-slate-800 rounded-tl-none"
                          : "bg-[#dcfce7] border border-emerald-200 text-slate-900 rounded-tr-none font-medium"
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[9px] text-slate-600">
                      {msg.badge && <span className="font-semibold text-emerald-700">{msg.badge} · </span>}
                      <span>{msg.time}</span>
                    </div>
                  </div>
                ))}
                {isSimulating && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold p-2 bg-emerald-50 rounded-lg w-max">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]"></span>
                    <span className="text-[10px] ml-1">Sigap sedang menganalisis template...</span>
                  </div>
                )}
              </div>

              {/* Quick sample chips */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {[
                  "Bisa booking jam 4?",
                  "Rambut saya kependekan!",
                  "Bisa bayar pakai QRIS?",
                  "Lokasinya sebelah mana?",
                ].map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => handleRunSimulator(sample)}
                    className="text-[10px] bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 px-2 py-1 rounded-md transition"
                  >
                    + &ldquo;{sample}&rdquo;
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRunSimulator();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  placeholder="Ketik pertanyaan untuk uji coba..."
                  value={simulatorInput}
                  onChange={(e) => setSimulatorInput(e.target.value)}
                  className="flex-1 bg-white text-slate-900 placeholder-slate-400 text-xs px-3 py-2 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <button
                  type="submit"
                  disabled={isSimulating}
                  className="px-3.5 py-2 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold text-xs rounded-xl shadow-xs transition disabled:opacity-50"
                >
                  Kirim
                </button>
              </form>
            </motion.div>
          </section>
          {/* END: LeftColumn */}

          {/* BEGIN: RightColumn (Template List & Management) */}
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-7 bg-white rounded-2xl p-5 lg:p-6 shadow-xs border border-slate-200/80 flex flex-col justify-between"
            data-purpose="template-list-container"
          >
            <div>
              {/* Section Header with version pill & Count */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                <div className="flex items-center gap-2.5">
                  <h2 className="text-sm font-bold text-slate-900 tracking-wide">Daftar Template Jawaban</h2>
                  <span className="bg-[#E2F5EC] text-[#065F46] font-semibold text-[10px] px-2 py-0.5 rounded-full border border-emerald-200">
                    Paket Barbershop v2.4
                  </span>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
                  {(["Semua", "Aktif", "Nonaktif"] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setFilterTab(tab)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition ${
                        filterTab === tab
                          ? "bg-white text-slate-900 shadow-2xs"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Bar */}
              <div className="pt-3 pb-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cari pertanyaan atau kata kunci template..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full text-xs px-3.5 py-2 pl-9 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 transition"
                  />
                  <svg
                    className="w-4 h-4 text-slate-400 absolute left-3 top-2.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* List of Answers & Questions */}
              <div className="divide-y divide-slate-100 text-xs max-h-[600px] overflow-y-auto pr-1">
                {filteredTemplates.length === 0 ? (
                  <div className="text-center py-12 text-slate-400">
                    <p className="text-sm font-semibold">Tidak ada template ditemukan</p>
                    <p className="text-xs mt-1">Coba kata kunci lain atau tambahkan template baru.</p>
                  </div>
                ) : (
                  filteredTemplates.map((t) => (
                    <div
                      key={t.id}
                      className="py-3.5 flex items-start justify-between gap-3 group hover:bg-slate-50/70 p-2 rounded-xl transition"
                    >
                      <div className="pr-2 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-slate-900 leading-snug text-[12.5px]">{t.question}</h3>
                          {t.category && (
                            <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                              {t.category}
                            </span>
                          )}
                          {!t.enabled && (
                            <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                              Mati
                            </span>
                          )}
                        </div>
                        <p className="text-[11.5px] text-slate-600 leading-relaxed">{t.answer}</p>

                        {/* Action buttons (Edit & Delete) */}
                        <div className="mt-2 flex items-center gap-3 opacity-90 group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => openEditModal(t)}
                            className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                            Sunting
                          </button>
                          <span className="text-slate-300">·</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteTemplate(t.id)}
                            className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                            Hapus
                          </button>
                        </div>
                      </div>

                      {/* Enable/Disable Toggle */}
                      <button
                        type="button"
                        onClick={() => toggleTemplate(t.id)}
                        className={`w-9 h-5 rounded-full p-0.5 flex items-center shrink-0 cursor-pointer shadow-inner mt-0.5 transition-colors ${
                          t.enabled ? "bg-[#10B981] justify-end" : "bg-slate-300 justify-start"
                        }`}
                        title={t.enabled ? "Nonaktifkan template" : "Aktifkan template"}
                      >
                        <motion.div layout className="w-4 h-4 bg-white rounded-full shadow-xs" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Info Callout Banner */}
            <div
              className="mt-5 p-3.5 bg-[#E7F6EF] rounded-xl border-l-4 border-[#10B981] flex flex-col justify-center"
              data-purpose="info-callout"
            >
              <h3 className="text-[11px] font-bold text-emerald-950">Paket Ini Selalu Diperbarui Tim Sigap</h3>
              <p className="text-[10px] text-emerald-800 mt-0.5 leading-relaxed">
                Saat template barbershop versi baru dirilis, Anda akan mendapatkan saran perbaikan secara berkala —
                suntingan kustom Anda sendiri tetap aman dan tidak akan tertimpa.
              </p>
            </div>
          </motion.section>
          {/* END: RightColumn */}
        </div>
        {/* END: TwoColumnLayout */}
      </main>
      {/* END: MainContent */}

      {/* MODAL: Tambah Template Baru */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-base font-bold text-slate-900">Tambah Template Jawaban Baru</h3>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-slate-600 text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveNew} className="mt-4 space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Pertanyaan Pelanggan (atau Variasi Tanya)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Bisa bayar pakai kartu debit?"
                    value={formQuestion}
                    onChange={(e) => setFormQuestion(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Harga">Harga &amp; Tarif</option>
                    <option value="Operasional">Operasional &amp; Jam Buka</option>
                    <option value="Layanan">Layanan &amp; Treatment</option>
                    <option value="Lokasi">Lokasi &amp; Parkir</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Jawaban Sigap yang Ingin Dikirimkan
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Contoh: Bisa kak! Kami menerima kartu debit BCA dan Mandiri tanpa biaya tambahan."
                    value={formAnswer}
                    onChange={(e) => setFormAnswer(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 font-semibold hover:bg-slate-50 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#10B981] text-white rounded-xl font-bold hover:bg-[#059669] shadow-xs transition"
                  >
                    Simpan Template
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: Sunting Template */}
      <AnimatePresence>
        {editingTemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="text-base font-bold text-slate-900">Sunting Template Jawaban</h3>
                <button
                  type="button"
                  onClick={() => setEditingTemplate(null)}
                  className="text-slate-400 hover:text-slate-600 text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="mt-4 space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Pertanyaan Pelanggan</label>
                  <input
                    type="text"
                    required
                    value={formQuestion}
                    onChange={(e) => setFormQuestion(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Harga">Harga &amp; Tarif</option>
                    <option value="Operasional">Operasional &amp; Jam Buka</option>
                    <option value="Layanan">Layanan &amp; Treatment</option>
                    <option value="Lokasi">Lokasi &amp; Parkir</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Jawaban Sigap</label>
                  <textarea
                    rows={4}
                    required
                    value={formAnswer}
                    onChange={(e) => setFormAnswer(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setEditingTemplate(null)}
                    className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 font-semibold hover:bg-slate-50 transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#10B981] text-white rounded-xl font-bold hover:bg-[#059669] shadow-xs transition"
                  >
                    Simpan Perubahan
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
