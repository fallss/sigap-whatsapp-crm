"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function OnboardingAiModePage() {
  const router = useRouter();
  const [aiMode, setAiMode] = useState<"draft" | "automatic">("draft");
  const [safety1, setSafety1] = useState(true);
  const [safety2, setSafety2] = useState(true);
  const [safety3, setSafety3] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFinish = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      {/* BEGIN: StepperHeader */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[680px] mb-6 overflow-x-auto py-1 px-1 select-none"
        data-purpose="stepper-navigation"
      >
        <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2.5 text-xs font-medium flex-nowrap shrink-0">
          {/* Step 1: Completed */}
          <Link
            href="/onboarding/whatsapp"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#dcfce7] text-[#15803d] shrink-0"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                clipRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                fillRule="evenodd"
              />
            </svg>
            <span>Hubungkan</span>
          </Link>
          <div className="stepper-connector shrink-0"></div>

          {/* Step 2: Completed */}
          <Link
            href="/onboarding/business"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#dcfce7] text-[#15803d] shrink-0"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                clipRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                fillRule="evenodd"
              />
            </svg>
            <span>Jenis usaha</span>
          </Link>
          <div className="stepper-connector shrink-0"></div>

          {/* Step 3: Completed */}
          <Link
            href="/onboarding/template"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#dcfce7] text-[#15803d] shrink-0"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path
                clipRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                fillRule="evenodd"
              />
            </svg>
            <span>Template</span>
          </Link>
          <div className="stepper-connector shrink-0"></div>

          {/* Step 4: Active Current Step */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0d5c3a] text-white font-medium shadow-sm shrink-0">
            <span className="text-xs">4</span>
            <span>Mode AI</span>
          </div>
        </div>
      </motion.nav>
      {/* END: StepperHeader */}

      {/* BEGIN: MainCard */}
      <motion.main
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[680px] bg-white rounded-3xl p-5 sm:p-8 lg:p-10 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] border border-gray-100"
      >
        {/* Title and Subheading */}
        <section className="mb-6">
          <h1 className="text-[23px] sm:text-[25px] font-bold tracking-tight text-gray-900 leading-snug">
            Seberapa jauh Sigap boleh bertindak sendiri?
          </h1>
          <p className="mt-1.5 text-sm text-gray-500 leading-relaxed">
            Bisa diubah kapan saja. Banyak pemilik mulai dari mode draf sampai percaya, lalu menaikkannya.
          </p>
        </section>

        {/* BEGIN: ModeSelectionOptions */}
        <section aria-label="Pilihan mode AI" className="space-y-3.5 mb-7">
          {/* Option 1: Mode draf */}
          <label
            onClick={() => setAiMode("draft")}
            className={`relative flex items-start gap-3.5 p-4 rounded-xl cursor-pointer transition-colors block ${
              aiMode === "draft"
                ? "border-2 border-[#10b981] bg-[#eefbf4]"
                : "border border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="mt-0.5 shrink-0">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  aiMode === "draft"
                    ? "border-[6px] border-[#059669] bg-white"
                    : "border-2 border-gray-300 bg-white"
                }`}
              />
            </div>
            <input
              checked={aiMode === "draft"}
              onChange={() => setAiMode("draft")}
              className="sr-only"
              name="ai_mode"
              type="radio"
              value="draft"
            />
            <div>
              <div className="text-[15px] font-bold text-gray-900 leading-snug">Mode draf</div>
              <p className="mt-0.5 text-[13px] text-gray-600 leading-normal">
                Sigap menyiapkan balasan, Anda yang menekan kirim. Tidak ada pesan keluar tanpa persetujuan Anda.
              </p>
            </div>
          </label>

          {/* Option 2: Mode otomatis */}
          <label
            onClick={() => setAiMode("automatic")}
            className={`relative flex items-start gap-3.5 p-4 rounded-xl cursor-pointer transition-colors block ${
              aiMode === "automatic"
                ? "border-2 border-[#10b981] bg-[#eefbf4]"
                : "border border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <div className="mt-0.5 shrink-0">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  aiMode === "automatic"
                    ? "border-[6px] border-[#059669] bg-white"
                    : "border-2 border-gray-300 bg-white"
                }`}
              />
            </div>
            <input
              checked={aiMode === "automatic"}
              onChange={() => setAiMode("automatic")}
              className="sr-only"
              name="ai_mode"
              type="radio"
              value="automatic"
            />
            <div>
              <div className="text-[15px] font-bold text-gray-900 leading-snug">Mode otomatis</div>
              <p className="mt-0.5 text-[13px] text-gray-500 leading-normal">
                Sigap langsung membalas pertanyaan yang sudah ada templatenya, dan meneruskan sisanya ke Anda.
              </p>
            </div>
          </label>
        </section>
        {/* END: ModeSelectionOptions */}

        {/* BEGIN: SafetyBoundaries */}
        <section aria-label="Batas aman pengaturan" className="mb-8">
          <h2 className="text-sm font-bold text-gray-900 mb-2.5">Batas aman</h2>
          <div className="border border-gray-200 rounded-xl divide-y divide-gray-100 overflow-hidden bg-white">
            {/* Boundary Item 1 */}
            <div className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50/50 transition">
              <span className="text-[13.5px] font-medium text-gray-800 pr-4">
                Selalu teruskan kalau pelanggan menyebut keluhan
              </span>
              <button
                type="button"
                onClick={() => setSafety1(!safety1)}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 ${
                  safety1 ? "bg-[#10b981]" : "bg-gray-300"
                }`}
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`w-5 h-5 bg-white rounded-full shadow-md ${
                    safety1 ? "ml-auto" : "mr-auto"
                  }`}
                />
              </button>
            </div>

            {/* Boundary Item 2 */}
            <div className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50/50 transition">
              <span className="text-[13.5px] font-medium text-gray-800 pr-4">
                Jangan sebut harga di luar daftar template
              </span>
              <button
                type="button"
                onClick={() => setSafety2(!safety2)}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 ${
                  safety2 ? "bg-[#10b981]" : "bg-gray-300"
                }`}
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`w-5 h-5 bg-white rounded-full shadow-md ${
                    safety2 ? "ml-auto" : "mr-auto"
                  }`}
                />
              </button>
            </div>

            {/* Boundary Item 3 */}
            <div className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50/50 transition">
              <span className="text-[13.5px] font-medium text-gray-800 pr-4">
                Jangan membalas di luar jam 06.00–23.00
              </span>
              <button
                type="button"
                onClick={() => setSafety3(!safety3)}
                className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 ${
                  safety3 ? "bg-[#10b981]" : "bg-gray-300"
                }`}
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`w-5 h-5 bg-white rounded-full shadow-md ${
                    safety3 ? "ml-auto" : "mr-auto"
                  }`}
                />
              </button>
            </div>
          </div>
        </section>
        {/* END: SafetyBoundaries */}

        {/* BEGIN: NavigationActions */}
        <div className="flex items-center gap-3">
          <Link
            href="/onboarding/template"
            className="px-5 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 active:bg-gray-100 transition shadow-sm text-center"
          >
            Kembali
          </Link>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleFinish}
            disabled={loading}
            className="px-6 py-2.5 rounded-lg bg-[#0ea569] hover:bg-[#059669] text-white text-sm font-semibold shadow-sm transition active:scale-[0.99] flex items-center justify-center gap-2"
            type="button"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Membuka Dasbor...</span>
              </>
            ) : (
              "Selesai — buka Sigap"
            )}
          </motion.button>
        </div>
        {/* END: NavigationActions */}
      </motion.main>
      {/* END: MainCard */}
    </div>
  );
}
