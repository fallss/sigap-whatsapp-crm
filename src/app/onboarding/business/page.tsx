"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface BusinessOption {
  id: string;
  name: string;
  count: number;
  templateLabel: string;
  bannerTitle: string;
  bannerDesc: string;
}

const BUSINESS_OPTIONS: BusinessOption[] = [
  {
    id: "barbershop",
    name: "Barbershop",
    count: 14,
    templateLabel: "14 template siap",
    bannerTitle: "14 pertanyaan umum barbershop sudah kami siapkan",
    bannerDesc:
      "Harga potong, jam buka, antre berapa lama, bisa booking atau tidak — semua sudah terjawab sebelum pelanggan pertama Anda bertanya.",
  },
  {
    id: "laundry",
    name: "Laundry",
    count: 16,
    templateLabel: "16 template siap",
    bannerTitle: "16 pertanyaan umum laundry kiloan & satuan sudah kami siapkan",
    bannerDesc:
      "Tarif perkilo, status cucian, estimasi selesai, layanan antar jemput — siap pakai tanpa repot ketik manual.",
  },
  {
    id: "bengkel",
    name: "Bengkel motor",
    count: 18,
    templateLabel: "18 template siap",
    bannerTitle: "18 pertanyaan servis dan sparepart sudah kami siapkan",
    bannerDesc:
      "Biaya ganti oli, estimasi servis berkala, ketersediaan ban & aki, jam buka toko.",
  },
  {
    id: "roti",
    name: "Toko roti & kue",
    count: 12,
    templateLabel: "12 template siap",
    bannerTitle: "12 pertanyaan pre-order & varian kue sudah kami siapkan",
    bannerDesc:
      "Daftar menu kue ulang tahun, batas jam order hari yang sama, ongkir, dan panduan penyimpanan.",
  },
  {
    id: "notaris",
    name: "Notaris / jasa profesional",
    count: 11,
    templateLabel: "11 template siap",
    bannerTitle: "11 pertanyaan alur dokumen & legalitas sudah kami siapkan",
    bannerDesc:
      "Syarat pengurusan akta, jadwal konsultasi, estimasi pengerjaan, dan rekening kantor resmi.",
  },
  {
    id: "lainnya",
    name: "Lainnya",
    count: 0,
    templateLabel: "Mulai dari kosong",
    bannerTitle: "Mulai dengan template standar umum UMKM",
    bannerDesc:
      "Jam buka, alamat toko, cara pembayaran, dan alur pemesanan umum siap Anda sesuaikan sendiri.",
  },
];

export default function OnboardingBusinessPage() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState("barbershop");

  const selected = BUSINESS_OPTIONS.find((b) => b.id === selectedId) || BUSINESS_OPTIONS[0];

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      {/* BEGIN: StepperHeader */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        aria-label="Progress Stepper"
        className="w-full max-w-[620px] mb-6 sm:mb-8 overflow-x-auto py-1 px-1 select-none"
      >
        <ol className="flex items-center justify-start sm:justify-between text-xs font-medium flex-nowrap shrink-0 gap-1.5 sm:gap-2">
          {/* Step 1: Completed */}
          <li className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#d7ede2] text-[#138053] font-semibold shrink-0">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                clipRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                fillRule="evenodd"
              />
            </svg>
            <Link href="/onboarding/whatsapp">Hubungkan</Link>
          </li>
          {/* Stepper Line */}
          <div aria-hidden="true" className="h-[1px] w-3 sm:w-5 bg-gray-300 shrink-0"></div>
          {/* Step 2: Active */}
          <li className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sigap-active-step text-white font-semibold shadow-sm shrink-0">
            <span className="w-4 h-4 rounded-full bg-sigap-active-step flex items-center justify-center text-[11px] leading-none">
              2
            </span>
            <span>Jenis usaha</span>
          </li>
          {/* Stepper Line */}
          <div aria-hidden="true" className="h-[1px] w-3 sm:w-5 bg-gray-300 shrink-0"></div>
          {/* Step 3: Inactive */}
          <li className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#e8ecea] text-gray-500 font-medium shrink-0">
            <span className="text-[11px]">3</span>
            <Link href="/onboarding/template">Template</Link>
          </li>
          {/* Stepper Line */}
          <div aria-hidden="true" className="h-[1px] w-3 sm:w-5 bg-gray-300 shrink-0"></div>
          {/* Step 4: Inactive */}
          <li className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#e8ecea] text-gray-500 font-medium shrink-0">
            <span className="text-[11px]">4</span>
            <Link href="/onboarding/ai-mode">Mode AI</Link>
          </li>
        </ol>
      </motion.nav>
      {/* END: StepperHeader */}

      {/* BEGIN: MainContentCard */}
      <motion.main
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[620px] bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-8"
      >
        {/* Header Titles */}
        <header className="mb-7">
          <h1 className="text-2xl font-bold tracking-tight text-[#11241d] mb-2">
            Usaha Anda bergerak di bidang apa?
          </h1>
          <p className="text-[13px] leading-relaxed text-[#5e7169]">
            Dari sini Sigap menyiapkan paket jawaban yang sudah terpakai di ratusan usaha sejenis. Anda tinggal menyunting, bukan menulis dari nol.
          </p>
        </header>

        {/* Business Category Options Grid */}
        <section aria-label="Pilihan Jenis Usaha" className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
          {BUSINESS_OPTIONS.map((opt) => {
            const isSelected = selectedId === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelectedId(opt.id)}
                className={`flex flex-col text-left p-3.5 rounded-xl transition-all focus:outline-none ${
                  isSelected
                    ? "border-2 border-sigap-selected bg-sigap-selected-tint ring-2 ring-emerald-500/10"
                    : "border border-gray-200 hover:border-gray-300 bg-white"
                }`}
                type="button"
              >
                <span
                  className={`font-bold text-[13.5px] ${
                    isSelected ? "text-[#136343]" : "text-[#1a2e26]"
                  }`}
                >
                  {opt.name}
                </span>
                <span
                  className={`text-xs mt-0.5 font-normal ${
                    isSelected ? "text-[#2b795a]" : "text-[#72857e]"
                  }`}
                >
                  {opt.templateLabel}
                </span>
              </button>
            );
          })}
        </section>

        {/* BEGIN: InfoBanner */}
        <aside
          aria-label="Keterangan Template Terpilih"
          className="bg-sigap-banner rounded-xl p-4 flex items-start gap-3.5 mb-7 text-white"
        >
          {/* Badge icon circle with template count */}
          <div className="shrink-0 w-8 h-8 rounded-full bg-sigap-badge flex items-center justify-center font-bold text-xs text-white">
            {selected.count > 0 ? selected.count : "✦"}
          </div>
          <div>
            <h2 className="text-[13px] font-bold text-white mb-0.5 leading-snug">
              {selected.bannerTitle}
            </h2>
            <p className="text-[11.5px] text-gray-200 leading-relaxed font-normal">
              {selected.bannerDesc}
            </p>
          </div>
        </aside>
        {/* END: InfoBanner */}

        {/* BEGIN: FormActions */}
        <footer className="flex items-center gap-3">
          <Link
            href="/onboarding/whatsapp"
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-xs font-semibold text-[#1a2e26] hover:bg-gray-50 focus:outline-none transition-colors text-center"
          >
            Kembali
          </Link>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => router.push("/onboarding/template")}
            className="px-5 py-2.5 rounded-lg bg-sigap-primary hover:bg-sigap-primary-hover text-white text-xs font-semibold focus:outline-none transition-colors shadow-sm"
            type="button"
          >
            Lihat {selected.count > 0 ? `${selected.count} ` : ""}template
          </motion.button>
        </footer>
        {/* END: FormActions */}
      </motion.main>
    </div>
  );
}
