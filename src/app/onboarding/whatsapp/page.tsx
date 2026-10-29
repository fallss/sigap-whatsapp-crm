"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function OnboardingWhatsAppPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("+62 812-1100-4455");
  const [isConnecting, setIsConnecting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConnecting(true);
    setTimeout(() => {
      router.push("/onboarding/business");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      {/* BEGIN: StepperHeader */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        aria-label="Progress Tahapan Onboarding"
        className="w-full max-w-2xl mb-6 sm:mb-8 flex items-center justify-start sm:justify-center overflow-x-auto py-1 px-1 select-none"
      >
        <ol className="flex items-center space-x-1.5 sm:space-x-3 text-xs sm:text-sm font-medium flex-nowrap shrink-0">
          {/* Step 1: Active */}
          <li className="flex items-center">
            <div className="flex items-center bg-[#0c3d2e] text-white px-3 sm:px-3.5 py-1.5 rounded-full shadow-sm">
              <span className="mr-1.5 font-bold">1</span>
              <span>Hubungkan</span>
            </div>
          </li>
          {/* Divider line */}
          <li aria-hidden="true" className="w-3 sm:w-6 h-[1.5px] bg-gray-200"></li>
          {/* Step 2: Inactive */}
          <li className="flex items-center">
            <Link
              href="/onboarding/business"
              className="flex items-center bg-transparent border border-gray-200 text-gray-500 hover:text-gray-700 px-3 sm:px-3.5 py-1.5 rounded-full"
            >
              <span className="mr-1.5 text-gray-400">2</span>
              <span>Jenis usaha</span>
            </Link>
          </li>
          {/* Divider line */}
          <li aria-hidden="true" className="w-3 sm:w-6 h-[1.5px] bg-gray-200"></li>
          {/* Step 3: Inactive */}
          <li className="flex items-center">
            <Link
              href="/onboarding/template"
              className="flex items-center bg-transparent border border-gray-200 text-gray-500 hover:text-gray-700 px-3 sm:px-3.5 py-1.5 rounded-full"
            >
              <span className="mr-1.5 text-gray-400">3</span>
              <span>Template</span>
            </Link>
          </li>
          {/* Divider line */}
          <li aria-hidden="true" className="w-3 sm:w-6 h-[1.5px] bg-gray-200"></li>
          {/* Step 4: Inactive */}
          <li className="flex items-center">
            <Link
              href="/onboarding/ai-mode"
              className="flex items-center bg-transparent border border-gray-200 text-gray-500 hover:text-gray-700 px-3 sm:px-3.5 py-1.5 rounded-full"
            >
              <span className="mr-1.5 text-gray-400">4</span>
              <span>Mode AI</span>
            </Link>
          </li>
        </ol>
      </motion.nav>
      {/* END: StepperHeader */}

      {/* BEGIN: MainContentCard */}
      <motion.main
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[620px] bg-white rounded-2xl border border-gray-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-5 sm:p-8 lg:p-10"
        data-purpose="onboarding-step-card"
      >
        {/* Title and Subtitle */}
        <header className="mb-8">
          <h1 className="text-2xl sm:text-[26px] font-bold text-[#0c3d2e] tracking-tight mb-2.5">
            Hubungkan nomor WhatsApp usaha Anda
          </h1>
          <p className="text-[13px] sm:text-[14px] leading-relaxed text-gray-500">
            Sigap memakai WhatsApp Business Platform resmi dari Meta. Nomor tetap milik Anda, dan percakapan lama tidak hilang.
          </p>
        </header>

        {/* Phone Number Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-gray-800 mb-2" htmlFor="whatsapp-number">
              Nomor WhatsApp usaha
            </label>
            <div className="relative">
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#159e66]/20 focus:border-[#159e66] transition-colors"
                id="whatsapp-number"
                name="whatsapp-number"
                placeholder="+62 8xx-xxxx-xxxx"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Informational Callout Box */}
          <aside
            className="bg-[#daf0e3]/60 border-l-[3.5px] border-[#159e66] rounded-r-xl rounded-l-none p-4"
            data-purpose="meta-safety-info"
          >
            <h2 className="text-xs font-bold text-[#0c3d2e] mb-1">
              Kenapa harus lewat Meta?
            </h2>
            <p className="text-[11.5px] sm:text-xs text-gray-600 leading-normal">
              Gateway tidak resmi melanggar ketentuan Meta dan berisiko memblokir nomor usaha Anda permanen. Sigap hanya memakai jalur resmi Cloud API, jadi nomor Anda aman.
            </p>
          </aside>

          {/* Action Buttons */}
          <footer className="pt-2 flex items-center space-x-3">
            {/* Secondary Button: Kembali */}
            <Link
              href="/register"
              className="px-5 py-2.5 bg-white border border-gray-200 text-xs sm:text-sm font-semibold text-gray-700 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-sm text-center"
            >
              Kembali
            </Link>
            {/* Primary Button: Hubungkan lewat Meta Business */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="px-6 py-2.5 bg-[#159e66] hover:bg-[#118a58] active:bg-[#0e744a] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
              type="submit"
              disabled={isConnecting}
            >
              {isConnecting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Menghubungkan ke Meta...</span>
                </>
              ) : (
                "Hubungkan lewat Meta Business"
              )}
            </motion.button>
          </footer>
        </form>
      </motion.main>
      {/* END: MainContentCard */}
    </div>
  );
}
