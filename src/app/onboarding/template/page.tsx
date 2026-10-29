"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface TemplateItem {
  id: number;
  question: string;
  answer: string;
  enabled: boolean;
}

const INITIAL_TEMPLATES: TemplateItem[] = [
  {
    id: 1,
    question: "Berapa harga potong rambut?",
    answer: "Potong rambut dewasa Rp 35.000, anak-anak Rp 25.000. Sudah termasuk keramas.",
    enabled: true,
  },
  {
    id: 2,
    question: "Jam buka berapa?",
    answer: "Buka setiap hari 09.00–21.00. Senin tutup.",
    enabled: true,
  },
  {
    id: 3,
    question: "Antre berapa lama?",
    answer: "Biasanya 15–30 menit. Mau saya cekkan antrean sekarang?",
    enabled: true,
  },
  {
    id: 4,
    question: "Bisa booking dulu?",
    answer: "Bisa. Sebutkan jam yang Anda mau, nanti saya catatkan.",
    enabled: true,
  },
  {
    id: 5,
    question: "Lokasinya di mana?",
    answer: "Jl. Pahlawan No. 42, sebelah Indomaret. Ada parkir motor.",
    enabled: true,
  },
  {
    id: 6,
    question: "Terima pembayaran apa saja?",
    answer: "Tunai, QRIS, dan transfer bank.",
    enabled: true,
  },
  {
    id: 7,
    question: "Ada potong untuk anak?",
    answer: "Ada. Anak di bawah 10 tahun Rp 25.000.",
    enabled: true,
  },
  {
    id: 8,
    question: "Bisa cukur jenggot saja?",
    answer: "Bisa, Rp 20.000. Sekalian potong jadi Rp 50.000.",
    enabled: true,
  },
  {
    id: 9,
    question: "Hari libur buka tidak?",
    answer: "Libur nasional tetap buka 10.00–18.00.",
    enabled: false,
  },
  {
    id: 10,
    question: "Ada parkir mobil?",
    answer: "Ada slot parkir untuk 2 mobil di depan ruko, selebihnya di seberang jalan.",
    enabled: true,
  },
  {
    id: 11,
    question: "Bisa bayar pakai kartu debit/kredit?",
    answer: "Untuk saat ini kami mengutamakan QRIS dan Tunai.",
    enabled: true,
  },
  {
    id: 12,
    question: "Siapa saja kapster yang bertugas hari ini?",
    answer: "Hari ini ada Mas Eko dan Mas Deni yang standby.",
    enabled: true,
  },
  {
    id: 13,
    question: "Melayani pewarnaan rambut (hair color)?",
    answer: "Ada cat hitam penutup uban dan bleaching basic, mulai Rp 60.000.",
    enabled: true,
  },
  {
    id: 14,
    question: "Berapa lama proses potong rambut?",
    answer: "Rata-rata 25 sampai 35 menit per orang tergantung model rambut.",
    enabled: true,
  },
];

export default function OnboardingTemplateBarberPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleTemplate = (id: number) => {
    setTemplates((prev) =>
      prev.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t))
    );
  };

  const visibleTemplates = isExpanded ? templates : templates.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <main className="w-full max-w-[690px] flex flex-col items-center">
        {/* BEGIN: StepperHeader */}
        <nav
          aria-label="Progress"
          className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 mb-6 w-full overflow-x-auto py-1 px-1 select-none"
          data-purpose="step-indicator"
        >
          {/* Step 1: Completed */}
          <Link
            href="/onboarding/whatsapp"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#dcfce7] text-[#065f46] text-xs font-semibold shadow-xs shrink-0"
          >
            <svg className="w-3.5 h-3.5 text-[#059669] stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Hubungkan</span>
          </Link>
          <div className="w-3 sm:w-5 h-[1.5px] bg-[#d1d5db] shrink-0"></div>

          {/* Step 2: Completed */}
          <Link
            href="/onboarding/business"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#dcfce7] text-[#065f46] text-xs font-semibold shadow-xs shrink-0"
          >
            <svg className="w-3.5 h-3.5 text-[#059669] stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Jenis usaha</span>
          </Link>
          <div className="w-3 sm:w-5 h-[1.5px] bg-[#d1d5db] shrink-0"></div>

          {/* Step 3: Active */}
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0a5c44] text-white text-xs font-semibold shadow-sm shrink-0">
            <span className="w-4 h-4 rounded-full bg-[#074734] text-[10px] flex items-center justify-center font-bold">
              3
            </span>
            <span>Template</span>
          </div>
          <div className="w-3 sm:w-5 h-[1.5px] bg-[#d1d5db] shrink-0"></div>

          {/* Step 4: Inactive */}
          <Link
            href="/onboarding/ai-mode"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-transparent border border-gray-200 text-gray-500 hover:text-gray-700 text-xs font-medium shrink-0"
          >
            <span className="text-gray-400 font-medium">4</span>
            <span>Mode AI</span>
          </Link>
        </nav>
        {/* END: StepperHeader */}

        {/* BEGIN: TemplateSelectionCard */}
        <motion.section
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full bg-white rounded-2xl shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.01)] border border-gray-100 p-5 sm:p-7 md:p-9"
          data-purpose="content-card"
        >
          {/* Card Header */}
          <div className="mb-6">
            <h1 className="text-[22px] sm:text-[24px] font-bold tracking-tight text-gray-900 leading-snug">
              14 template barbershop siap pakai
            </h1>
            <p className="text-[13.5px] sm:text-[14px] text-gray-500 mt-1 leading-relaxed">
              Semua sudah terisi jawaban yang umum dipakai barbershop. Sunting yang perlu, matikan yang tidak relevan.
            </p>
          </div>

          {/* BEGIN: TemplateList */}
          <div
            className="rounded-xl border border-gray-200/90 divide-y divide-gray-100 overflow-hidden bg-white mb-6"
            data-purpose="templates-list"
          >
            {visibleTemplates.map((t) => (
              <article
                key={t.id}
                className="p-4 sm:p-4.5 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
              >
                <div className="pr-2">
                  <h2 className="text-[13.5px] font-bold text-gray-900">{t.question}</h2>
                  <p className="text-[12.5px] text-gray-500 mt-0.5 leading-normal">{t.answer}</p>
                </div>
                {/* Toggle Switch */}
                <div className="shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleTemplate(t.id)}
                    aria-label={`Toggle ${t.question}`}
                    className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                      t.enabled ? "bg-[#10b981]" : "bg-gray-200"
                    }`}
                  >
                    <motion.div
                      layout
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className={`w-5 h-5 bg-white rounded-full shadow-md ${
                        t.enabled ? "ml-auto" : "mr-auto"
                      }`}
                    />
                  </button>
                </div>
              </article>
            ))}

            {/* Expand / More templates trigger */}
            {!isExpanded && (
              <div
                onClick={() => setIsExpanded(true)}
                className="p-4 bg-white hover:bg-gray-50/80 transition-colors cursor-pointer"
                data-purpose="expand-templates"
              >
                <button
                  className="text-[13.5px] font-bold text-[#059669] hover:text-[#047857] flex items-center gap-1 focus:outline-none"
                  type="button"
                >
                  + 8 template lainnya
                </button>
              </div>
            )}
          </div>
          {/* END: TemplateList */}

          {/* BEGIN: ActionButtons */}
          <footer className="flex items-center gap-3 pt-1" data-purpose="actions-footer">
            <Link
              href="/onboarding/business"
              className="px-5 py-2.5 rounded-lg border border-gray-300 bg-white text-[13.5px] font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 transition shadow-xs focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300 text-center"
            >
              Kembali
            </Link>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => router.push("/onboarding/ai-mode")}
              className="px-5 py-2.5 rounded-lg bg-[#059669] hover:bg-[#047857] active:bg-[#065f46] text-white text-[13.5px] font-semibold transition shadow-xs focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#059669]"
              type="button"
            >
              Simpan &amp; atur mode AI
            </motion.button>
          </footer>
          {/* END: ActionButtons */}
        </motion.section>
      </main>
    </div>
  );
}
