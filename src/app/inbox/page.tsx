"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";

interface ChatMessage {
  id: string;
  sender: "customer" | "user" | "sigap";
  text: string;
  time: string;
}

interface Conversation {
  id: string;
  name: string;
  phone?: string;
  avatar: string;
  avatarBg: string;
  avatarText: string;
  time: string;
  lastMessage: string;
  fullMessage?: string;
  badge: "Perlu Anda" | "Draf siap" | "Dijawab Sigap" | "Selesai";
  badgeBg: string;
  badgeColor: string;
  since: string;
  visits: string;
  lastVisit: string;
  cycle: string;
  favService: string;
  ltv: string;
  optIn: string;
  aiDraft: string;
  isEscalated?: boolean;
  history: ChatMessage[];
  simulatedReply: string;
}

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: "maya",
    name: "Bu Maya",
    phone: "+62 813-4567-8901",
    avatar: "M",
    avatarBg: "#dcfce7",
    avatarText: "#166534",
    time: "12 mnt lalu",
    lastMessage: "Rambut anak saya kemarin dipotong terla...",
    fullMessage:
      "Rambut anak saya kemarin dipotong terlalu pendek, saya agak kecewa. Padahal sudah saya bilang jangan terlalu cepak.",
    badge: "Perlu Anda",
    badgeBg: "#fef3c7",
    badgeColor: "#92400e",
    since: "Pelanggan sejak Juni 2025",
    visits: "4 kali",
    lastVisit: "8 hari lalu",
    cycle: "31 hari",
    favService: "Potong anak",
    ltv: "Rp 100.000",
    optIn: "Sudah setuju",
    isEscalated: true,
    aiDraft:
      "Mohon maaf sekali Bu Maya atas ketidaknyamanannya. Kami siap perbaiki gratis begitu rambutnya sudah tumbuh sedikit atau Ibu bisa mampir besok untuk kami rapikan tanpa biaya.",
    simulatedReply:
      "Baik mas Andi, terima kasih atas pengertiannya. Besok sore jam 4 saya ajak anak saya mampir ya untuk dirapikan.",
    history: [
      {
        id: "m-1",
        sender: "customer",
        text: "Rambut anak saya kemarin dipotong terlalu pendek, saya agak kecewa. Padahal sudah saya bilang jangan terlalu cepak.",
        time: "10:42",
      },
    ],
  },
  {
    id: "yudi",
    name: "Pak Yudi",
    phone: "+62 812-7788-9900",
    avatar: "Y",
    avatarBg: "#f1f5f9",
    avatarText: "#334155",
    time: "34 mnt lalu",
    lastMessage: "Bisa potong di rumah? Ibu saya susah jalan",
    fullMessage: "Halo mas, bisa panggil kapster potong di rumah gak ya? Ibu saya lagi sakit dan susah jalan.",
    badge: "Perlu Anda",
    badgeBg: "#fef3c7",
    badgeColor: "#92400e",
    since: "Pelanggan sejak Januari 2025",
    visits: "6 kali",
    lastVisit: "22 hari lalu",
    cycle: "28 hari",
    favService: "Potong dewasa",
    ltv: "Rp 210.000",
    optIn: "Sudah setuju",
    isEscalated: true,
    aiDraft:
      "Halo Pak Yudi, untuk layanan potong di rumah kami sediakan khusus janji temu dengan tambahan transport Rp 20.000. Boleh tahu lokasi rumah di area mana Pak?",
    simulatedReply: "Lokasi di Perum Griya Asri Blok C4 mas. Kalau besok jam 10 pagi kapsternya bisa merapat?",
    history: [
      {
        id: "y-1",
        sender: "customer",
        text: "Halo mas, bisa panggil kapster potong di rumah gak ya? Ibu saya lagi sakit dan susah jalan.",
        time: "10:20",
      },
    ],
  },
  {
    id: "new_number",
    name: "+62 812-9900-4471",
    phone: "+62 812-9900-4471",
    avatar: "?",
    avatarBg: "#f1f5f9",
    avatarText: "#334155",
    time: "1 jam lalu",
    lastMessage: "Halo, hari Minggu buka sampai jam berap...",
    fullMessage: "Halo, hari Minggu buka sampai jam berapa ya mas? Apa perlu antre panjang?",
    badge: "Draf siap",
    badgeBg: "#e0e7ff",
    badgeColor: "#3730a3",
    since: "Kontak baru",
    visits: "0 kali",
    lastVisit: "–",
    cycle: "–",
    favService: "–",
    ltv: "Rp 0",
    optIn: "Belum terdata",
    isEscalated: false,
    aiDraft:
      "Halo! Hari Minggu kami buka pukul 09.00 - 21.00 WIB. Biasanya jam 10 pagi masih santai dan tidak antre panjang. Mau kami reservasikan kursi jam berapa?",
    simulatedReply: "Oh sip mas! Tolong bookingkan jam 11 siang untuk 1 orang ya atas nama Fajar.",
    history: [
      {
        id: "nn-1",
        sender: "customer",
        text: "Halo, hari Minggu buka sampai jam berapa ya mas? Apa perlu antre panjang?",
        time: "09:45",
      },
    ],
  },
  {
    id: "rizal",
    name: "Pak Rizal",
    phone: "+62 812-3456-7890",
    avatar: "R",
    avatarBg: "#f1f5f9",
    avatarText: "#334155",
    time: "22:14",
    lastMessage: "Oke besok jam 4 sore ya, makasih",
    fullMessage: "Oke besok jam 4 sore ya, makasih mas Andi",
    badge: "Dijawab Sigap",
    badgeBg: "#dcfce7",
    badgeColor: "#166534",
    since: "Pelanggan sejak Maret 2024",
    visits: "7 kali",
    lastVisit: "34 hari lalu",
    cycle: "26 hari",
    favService: "Potong + keramas",
    ltv: "Rp 245.000",
    optIn: "Sudah setuju",
    isEscalated: false,
    aiDraft: "Sama-sama Pak Rizal! Sudah kami catat di jadwal ya. Sampai jumpa besok jam 16.00 WIB.",
    simulatedReply: "Mantap mas Andi, nanti saya kabari kalau sudah di jalan.",
    history: [
      {
        id: "r-1",
        sender: "customer",
        text: "Halo mas, mau potong besok sore jam 4 bisa?",
        time: "22:12",
      },
      {
        id: "r-2",
        sender: "sigap",
        text: "Bisa Pak Rizal! Jam 16.00 slot kapster Mas Deni masih kosong. Kami bookingkan ya?",
        time: "22:13",
      },
      {
        id: "r-3",
        sender: "customer",
        text: "Oke besok jam 4 sore ya, makasih",
        time: "22:14",
      },
    ],
  },
  {
    id: "lina",
    name: "Bu Lina",
    phone: "+62 818-0912-3456",
    avatar: "L",
    avatarBg: "#f1f5f9",
    avatarText: "#334155",
    time: "23:02",
    lastMessage: "Potong rambut anak berapa ya?",
    fullMessage: "Malam min, mau tanya potong rambut anak berapa ya? Bawa anak umur 4 tahun.",
    badge: "Dijawab Sigap",
    badgeBg: "#dcfce7",
    badgeColor: "#166534",
    since: "Pelanggan sejak Agustus 2025",
    visits: "2 kali",
    lastVisit: "18 hari lalu",
    cycle: "30 hari",
    favService: "Potong anak",
    ltv: "Rp 50.000",
    optIn: "Sudah setuju",
    isEscalated: false,
    aiDraft:
      "Potong rambut anak usia di bawah 10 tahun Rp 25.000 ya Bu Lina, sudah termasuk keramas ringan dan kapster kami sabar.",
    simulatedReply: "Wah pas banget, makasih infonya ya min. Besok siang saya ajak si kecil mampir.",
    history: [
      {
        id: "l-1",
        sender: "customer",
        text: "Malam min, mau tanya potong rambut anak berapa ya? Bawa anak umur 4 tahun.",
        time: "23:02",
      },
    ],
  },
  {
    id: "doni",
    name: "Pak Doni",
    phone: "+62 811-2233-4455",
    avatar: "D",
    avatarBg: "#f1f5f9",
    avatarText: "#334155",
    time: "23:41",
    lastMessage: "Alamatnya di mana? Ada parkir motor?",
    fullMessage: "Alamatnya di mana ya? Ada parkir motor yang aman?",
    badge: "Dijawab Sigap",
    badgeBg: "#dcfce7",
    badgeColor: "#166534",
    since: "Pelanggan sejak Juli 2025",
    visits: "3 kali",
    lastVisit: "12 hari lalu",
    cycle: "25 hari",
    favService: "Potong + cukur",
    ltv: "Rp 105.000",
    optIn: "Sudah setuju",
    isEscalated: false,
    aiDraft:
      "Lokasi kami di Jl. Pahlawan No. 42 (sebelah Indomaret). Ada area parkir motor luas dan dijaga juru parkir.",
    simulatedReply: "Siap, langsung meluncur sekarang mas.",
    history: [
      {
        id: "d-1",
        sender: "customer",
        text: "Alamatnya di mana ya? Ada parkir motor yang aman?",
        time: "23:41",
      },
    ],
  },
];

const CANNED_RESPONSES = [
  { label: "Harga Dewasa & Anak", text: "Potong rambut dewasa Rp 35.000, anak-anak Rp 25.000 sudah termasuk keramas." },
  { label: "Jam Operasional", text: "Buka setiap Selasa–Minggu pukul 09.00–21.00 WIB. Senin tutup." },
  { label: "Lokasi & Parkir", text: "Alamat di Jl. Pahlawan No. 42 (sebelah Indomaret). Tersedia parkir motor & mobil." },
  { label: "Maaf & Garansi Rapikan", text: "Mohon maaf atas ketidaknyamanannya kak. Kami siap berikan servis rapikan gratis kapan saja." },
];

export default function InboxPage() {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [selectedId, setSelectedId] = useState("maya");
  const [filter, setFilter] = useState<"Semua" | "Perlu Anda" | "Dijawab Sigap" | "Selesai">("Semua");
  const [search, setSearch] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [isTypingManual, setIsTypingManual] = useState(false);
  const [mobileTab, setMobileTab] = useState<"list" | "chat" | "details">("list");
  const [typingCustomer, setTypingCustomer] = useState<string | null>(null);
  const [showCannedModal, setShowCannedModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const activeConv = conversations.find((c) => c.id === selectedId) || conversations[0];

  // Send reply handler (Draft or Manual)
  const handleSendReply = () => {
    const textToSend = isTypingManual && customInput.trim() ? customInput.trim() : activeConv.aiDraft;
    if (!textToSend) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const newMsg: ChatMessage = {
      id: `out-${Date.now()}`,
      sender: isTypingManual ? "user" : "sigap",
      text: textToSend,
      time: timeStr,
    };

    // Update active conversation history and lastMessage
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConv.id) {
          return {
            ...c,
            lastMessage: textToSend.slice(0, 40) + "...",
            time: "Baru saja",
            history: [...c.history, newMsg],
            badge: c.badge === "Perlu Anda" ? "Dijawab Sigap" : c.badge,
            badgeBg: c.badge === "Perlu Anda" ? "#dcfce7" : c.badgeBg,
            badgeColor: c.badge === "Perlu Anda" ? "#166534" : c.badgeColor,
            isEscalated: false,
          };
        }
        return c;
      })
    );

    setCustomInput("");
    setIsTypingManual(false);
    showToast("Pesan berhasil dikirim ke WhatsApp pelanggan!");

    // Simulate customer reaction / reply
    setTypingCustomer(activeConv.name);
    setTimeout(() => {
      setTypingCustomer(null);
      const replyTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      const customerMsg: ChatMessage = {
        id: `in-${Date.now()}`,
        sender: "customer",
        text: activeConv.simulatedReply || "Baik mas, terima kasih banyak!",
        time: replyTime,
      };

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === activeConv.id) {
            return {
              ...c,
              lastMessage: customerMsg.text.slice(0, 40) + "...",
              time: "Baru saja",
              history: [...c.history, customerMsg],
            };
          }
          return c;
        })
      );
    }, 2000);
  };

  // Toggle "Tandai Selesai" / "Buka Kembali"
  const toggleResolved = () => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConv.id) {
          const isNowResolved = c.badge !== "Selesai";
          const newBadge = isNowResolved ? "Selesai" : "Perlu Anda";
          const newBg = isNowResolved ? "#f1f5f9" : "#fef3c7";
          const newColor = isNowResolved ? "#475569" : "#92400e";

          showToast(
            isNowResolved
              ? `Percakapan dengan ${c.name} ditandai selesai`
              : `Percakapan dengan ${c.name} dibuka kembali`
          );

          return {
            ...c,
            badge: newBadge,
            badgeBg: newBg,
            badgeColor: newColor,
            isEscalated: !isNowResolved,
          };
        }
        return c;
      })
    );
  };

  const filteredList = conversations.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(search.toLowerCase()) ||
      (c.phone && c.phone.includes(search));
    if (!matchSearch) return false;
    if (filter === "Perlu Anda") return c.badge === "Perlu Anda";
    if (filter === "Dijawab Sigap") return c.badge === "Dijawab Sigap" || c.badge === "Draf siap";
    if (filter === "Selesai") return c.badge === "Selesai";
    return true;
  });

  const needAttentionCount = conversations.filter((c) => c.badge === "Perlu Anda").length;

  return (
    <div className="flex h-screen bg-white font-sans overflow-hidden pt-14 pb-16 lg:pt-0 lg:pb-0">
      {/* Sidebar Navigation */}
      <Sidebar current="Inbox" />

      {/* Main Workspace Container */}
      <main className="flex-1 flex flex-col bg-white overflow-hidden min-w-0">
        {/* Toast Alert */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-5 right-5 z-50 bg-[#0c5243] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg border border-emerald-400/30 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Global Header (Desktop) */}
        <header className="hidden lg:flex px-6 py-4 border-b border-slate-200 items-center justify-between bg-white shrink-0">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Inbox Chat WhatsApp</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {needAttentionCount} percakapan memerlukan tanggapan Anda langsung
            </p>
          </div>
          {/* Connection Status Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ecfdf5] border border-[#a7f3d0] text-emerald-700 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
            <span className="font-semibold">WhatsApp Cloud API Terhubung</span>
          </div>
        </header>

        {/* Main Workspace: Three column layout (Desktop) / Tab-based view (Mobile) */}
        <div className="flex-1 flex overflow-hidden">
          {/* BEGIN: Column1_ConversationList */}
          <section
            className={`${
              mobileTab === "list" ? "flex" : "hidden"
            } lg:flex w-full lg:w-[320px] border-r border-slate-200 flex-col shrink-0 bg-white`}
            data-purpose="conversation-list"
          >
            {/* Mobile Header Bar */}
            <div className="lg:hidden px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h2 className="text-sm font-bold text-slate-900">Inbox ({filteredList.length})</h2>
              {needAttentionCount > 0 && (
                <span className="text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                  {needAttentionCount} butuh Anda
                </span>
              )}
            </div>

            {/* Search bar */}
            <div className="p-3 border-b border-slate-100">
              <div className="relative">
                <input
                  className="w-full text-xs px-3 py-2 pl-8 rounded-lg border border-slate-200 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600 focus:bg-white"
                  placeholder="Cari kontak, nomor, atau isi chat..."
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <svg
                  className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="px-3 py-2 flex items-center gap-1.5 border-b border-slate-100 overflow-x-auto text-xs">
              {(["Semua", "Perlu Anda", "Dijawab Sigap", "Selesai"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all whitespace-nowrap ${
                    filter === tab
                      ? "bg-[#0c5243] text-white shadow-2xs"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {tab} {tab === "Perlu Anda" && needAttentionCount > 0 ? `(${needAttentionCount})` : ""}
                </button>
              ))}
            </div>

            {/* Scrollable Conversation items */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
              {filteredList.length === 0 ? (
                <div className="p-6 text-center text-slate-400 text-xs">
                  Tidak ada percakapan dengan filter ini.
                </div>
              ) : (
                filteredList.map((conv) => {
                  const isSelected = selectedId === conv.id;
                  return (
                    <div
                      key={conv.id}
                      onClick={() => {
                        setSelectedId(conv.id);
                        setIsTypingManual(false);
                        setMobileTab("chat");
                      }}
                      className={`p-3 cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-[#eefbf6] border-l-4 border-[#0c5243]"
                          : "hover:bg-slate-50 border-l-4 border-transparent"
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div
                          style={{ backgroundColor: conv.avatarBg, color: conv.avatarText }}
                          className="w-8 h-8 rounded-full font-semibold flex items-center justify-center text-xs shrink-0"
                        >
                          {conv.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xs font-bold text-slate-900 truncate">{conv.name}</h3>
                            <span className="text-[10px] text-slate-400">{conv.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-600 truncate mt-0.5">{conv.lastMessage}</p>
                          <div className="mt-1.5 flex items-center justify-between">
                            <span
                              style={{ backgroundColor: conv.badgeBg, color: conv.badgeColor }}
                              className="inline-block px-2 py-0.5 text-[10px] font-medium rounded"
                            >
                              {conv.badge}
                            </span>
                            <span className="lg:hidden text-[10px] text-emerald-600 font-semibold">
                              Buka Chat →
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>
          {/* END: Column1_ConversationList */}

          {/* BEGIN: Column2_ChatThread */}
          <section
            className={`${
              mobileTab === "chat" ? "flex" : "hidden"
            } lg:flex flex-1 flex-col bg-[#fafaf9] border-r border-slate-200 overflow-hidden`}
            data-purpose="chat-thread"
          >
            {/* Chat Thread Header */}
            <div className="px-3.5 sm:px-5 py-3 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Back button on mobile */}
                <button
                  onClick={() => setMobileTab("list")}
                  className="lg:hidden p-1.5 -ml-1 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 flex items-center justify-center"
                  aria-label="Kembali ke daftar percakapan"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                </button>

                <div
                  style={{ backgroundColor: activeConv.avatarBg, color: activeConv.avatarText }}
                  className="w-8 sm:w-9 h-8 sm:h-9 rounded-full font-bold flex items-center justify-center text-xs sm:text-sm shrink-0"
                >
                  {activeConv.avatar}
                </div>
                <div>
                  <h2 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight truncate max-w-[140px] sm:max-w-none">
                    {activeConv.name}
                  </h2>
                  <p className="text-[10px] sm:text-[11px] text-slate-400">
                    {activeConv.phone || "Lewat WhatsApp"} · {activeConv.visits}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Tandai Selesai / Buka Kembali Action Button */}
                <button
                  onClick={toggleResolved}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition ${
                    activeConv.badge === "Selesai"
                      ? "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200"
                      : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                  }`}
                >
                  {activeConv.badge === "Selesai" ? "↺ Buka Kembali" : "✓ Tandai Selesai"}
                </button>

                <span
                  style={{ backgroundColor: activeConv.badgeBg, color: activeConv.badgeColor }}
                  className="hidden sm:inline-block px-2.5 py-1 text-[10px] font-semibold rounded"
                >
                  {activeConv.badge}
                </span>

                {/* Mobile button to open customer details panel */}
                <button
                  onClick={() => setMobileTab("details")}
                  className="lg:hidden px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-semibold hover:bg-slate-200"
                >
                  Info
                </button>
              </div>
            </div>

            {/* Chat Conversation Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {/* Escalation Notice / AI Alert Box if escalated */}
              {activeConv.isEscalated && (
                <div className="p-3.5 bg-[#fef9ee] border-l-4 border-[#d97706] rounded-r-lg text-slate-800 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-[#b45309]">
                      Sigap menahan balasan dan menyerahkan ke Anda
                    </p>
                    <span className="text-[10px] bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded">
                      Batas Aman Aktif
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Pesan pelanggan terdeteksi sensitif. Sesuai batas aman, Sigap tidak membalas langsung. Draf balasan
                    di bawah telah disiapkan untuk Anda setujui atau edit.
                  </p>
                </div>
              )}

              {/* Date Divider */}
              <div className="flex items-center justify-center my-3">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider bg-slate-100 px-2.5 py-0.5 rounded-full">
                  PERCAKAPAN HARI INI
                </span>
              </div>

              {/* Chat Thread Messages */}
              {activeConv.history.map((msg) => {
                const isCustomer = msg.sender === "customer";
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isCustomer ? "items-start max-w-lg" : "items-end max-w-lg ml-auto"}`}
                  >
                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                        isCustomer
                          ? "bg-white text-slate-800 rounded-tl-xs border border-slate-100"
                          : "bg-[#dcfce7] text-slate-900 rounded-tr-xs border border-emerald-200/60 font-medium"
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                    <div className="flex items-center gap-1 mt-1 px-1">
                      <span className="text-[10px] text-slate-400 font-medium">{msg.time}</span>
                      {!isCustomer && (
                        <span className="text-[10px] text-emerald-600 font-bold">✓✓ Terkirim</span>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {typingCustomer && (
                <div className="flex items-center gap-2 p-2.5 bg-white border border-slate-200 rounded-2xl rounded-tl-xs w-max text-xs text-slate-600 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-[11px] font-medium ml-1">{typingCustomer} sedang mengetik balasan...</span>
                </div>
              )}
            </div>

            {/* AI Draft & Reply Action Container */}
            <div className="p-3.5 sm:p-4 bg-white border-t border-slate-200 shrink-0">
              {/* Draft label indicator & Quick Canned Inserter */}
              <div className="mb-2 flex items-center justify-between">
                <span className="inline-block px-2 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-600 rounded">
                  {isTypingManual ? "Mode mengetik manual" : "Draf rekomendasi Sigap AI — siap kirim"}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setShowCannedModal(!showCannedModal)}
                    className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/70"
                  >
                    + Sisipkan Template
                  </button>
                </div>
              </div>

              {/* Quick Canned Dropdown if open */}
              <AnimatePresence>
                {showCannedModal && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-2.5 mb-2.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs overflow-hidden"
                  >
                    <div className="text-[11px] font-bold text-slate-700 mb-1">
                      Pilih template untuk disisipkan ke kotak pesan:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {CANNED_RESPONSES.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setCustomInput(item.text);
                            setIsTypingManual(true);
                            setShowCannedModal(false);
                            showToast(`Template "${item.label}" disisipkan.`);
                          }}
                          className="text-left p-2 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition text-slate-800 text-[11px]"
                        >
                          <span className="font-bold text-emerald-800 block">{item.label}</span>
                          <span className="truncate block text-slate-500 text-[10px]">{item.text}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Draft message box preview / Custom input */}
              {isTypingManual ? (
                <textarea
                  rows={2}
                  className="w-full p-2.5 sm:p-3 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-2.5 leading-relaxed"
                  placeholder="Ketik balasan pesan WhatsApp Anda di sini..."
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                />
              ) : (
                <div className="p-2.5 sm:p-3 rounded-xl border border-emerald-100 bg-[#f7fcf9] text-xs text-slate-800 leading-relaxed mb-2.5">
                  <span className="text-[10px] font-bold text-emerald-800 block mb-0.5 uppercase tracking-wide">
                    Draf Sigap:
                  </span>
                  {activeConv.aiDraft}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleSendReply}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[#0c5243] hover:bg-[#093e33] text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  type="button"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                  <span>{isTypingManual ? "Kirim Pesan Manual" : "Kirim Draf ke WhatsApp"}</span>
                </motion.button>

                <button
                  onClick={() => {
                    if (!isTypingManual) {
                      setCustomInput(activeConv.aiDraft);
                    }
                    setIsTypingManual(!isTypingManual);
                  }}
                  className="px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                  type="button"
                >
                  {isTypingManual ? "Batal Sunting" : "Sunting / Tulis Sendiri"}
                </button>

                <button
                  onClick={() => router.push("/customers/pak-rizal")}
                  className="px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                  type="button"
                >
                  Lihat CRM
                </button>
              </div>
            </div>
          </section>
          {/* END: Column2_ChatThread */}

          {/* BEGIN: Column3_CustomerDetails */}
          <aside
            className={`${
              mobileTab === "details" ? "flex" : "hidden"
            } lg:flex w-full lg:w-[280px] bg-white flex-col justify-between p-4 sm:p-5 shrink-0 overflow-y-auto`}
            data-purpose="customer-info"
          >
            <div>
              {/* Mobile back button to chat */}
              <div className="lg:hidden pb-3 mb-3 border-b border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setMobileTab("chat")}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                  </svg>
                  <span>Kembali ke Chat</span>
                </button>
                <span className="text-xs font-bold text-slate-700">Profil Pelanggan</span>
              </div>

              {/* Customer Profile Avatar & Subtitle */}
              <div className="flex flex-col items-center text-center pb-4 border-b border-slate-100">
                <div
                  style={{ backgroundColor: activeConv.avatarBg, color: activeConv.avatarText }}
                  className="w-12 sm:w-14 h-12 sm:h-14 rounded-full text-lg sm:text-xl font-bold flex items-center justify-center mb-2.5 shadow-2xs"
                >
                  {activeConv.avatar}
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">{activeConv.name}</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">{activeConv.phone}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{activeConv.since}</p>
                <div className="mt-2.5">
                  <span
                    style={{ backgroundColor: activeConv.badgeBg, color: activeConv.badgeColor }}
                    className="inline-block px-2.5 py-0.5 text-[10px] font-semibold rounded"
                  >
                    {activeConv.badge}
                  </span>
                </div>
              </div>

              {/* Key Metrics / Attribute List */}
              <div className="py-4 space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Total kunjungan</span>
                  <span className="font-bold text-slate-900">{activeConv.visits}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Terakhir datang</span>
                  <span className="font-bold text-slate-900">{activeConv.lastVisit}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Siklus rata-rata</span>
                  <span className="font-bold text-slate-900">{activeConv.cycle}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Layanan favorit</span>
                  <span className="font-bold text-slate-900">{activeConv.favService}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Nilai seumur hidup</span>
                  <span className="font-bold text-slate-900">{activeConv.ltv}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Izin pesan WA</span>
                  <span className="font-bold text-emerald-700">{activeConv.optIn}</span>
                </div>
              </div>
            </div>

            {/* Full Profile Button */}
            <div className="pt-4 border-t border-slate-100">
              <Link
                href="/customers/pak-rizal"
                className="block w-full py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 rounded-xl text-xs font-bold text-emerald-800 text-center transition-colors"
              >
                Lihat Detail Lengkap di CRM →
              </Link>
            </div>
          </aside>
          {/* END: Column3_CustomerDetails */}
        </div>
      </main>
    </div>
  );
}
