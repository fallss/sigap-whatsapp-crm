"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<"pemilik_usaha" | "admin_sigap">("pemilik_usaha");
  const [businessName, setBusinessName] = useState("Barbershop Rapi Bro");
  const [email, setEmail] = useState("andi@rapibro.id");
  const [password, setPassword] = useState("supersecretpassword");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/onboarding/whatsapp");
    }, 500);
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row w-full font-sans">
      {/* BEGIN: LeftBrandingSidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-[34%] lg:w-[31%] min-h-auto md:min-h-screen bg-[#104b39] text-white flex flex-col justify-between p-6 sm:p-8 lg:p-12 shrink-0"
        data-purpose="brand-sidebar"
      >
        {/* Top Brand Logo */}
        <div>
          <Link href="/login" className="inline-flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-[7px] bg-[#22c55e] flex items-center justify-center font-bold text-white text-sm shadow-sm">
              S
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Sigap</span>
          </Link>
        </div>

        {/* Main Sidebar Copy */}
        <div className="my-4 md:my-auto py-3 md:py-12">
          <h1 className="text-xl sm:text-[26px] lg:text-[30px] font-bold tracking-tight leading-tight text-white mb-2 sm:mb-4">
            Tiga langkah, lalu Sigap mulai bekerja.
          </h1>
          <p className="text-xs sm:text-[13px] leading-relaxed text-[#9abeb2] max-w-sm font-normal">
            Hubungkan nomor WhatsApp usaha Anda, pilih bidang usaha, dan paket jawabannya sudah menunggu. Tidak perlu menulis satu template pun dari nol.
          </p>
        </div>

        {/* Bottom Badges / Metrics */}
        <div className="flex items-start gap-6 sm:gap-8 pt-2 md:pt-4">
          <div>
            <div className="text-sm sm:text-lg font-bold text-[#2ed26f] leading-snug">
              ± 12 menit
            </div>
            <div className="text-[10px] sm:text-xs text-[#8caea2] leading-snug mt-0.5">
              dari daftar sampai siap
            </div>
          </div>
          <div>
            <div className="text-sm sm:text-lg font-bold text-[#2ed26f] leading-snug">
              14 hari
            </div>
            <div className="text-[10px] sm:text-xs text-[#8caea2] leading-snug mt-0.5">
              uji coba tanpa kartu
            </div>
          </div>
        </div>
      </motion.aside>
      {/* END: LeftBrandingSidebar */}

      {/* BEGIN: RightFormContainer */}
      <section
        className="flex-1 flex items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16 bg-white overflow-y-auto"
        data-purpose="registration-section"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-[430px] py-4"
        >
          {/* Header */}
          <header className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl sm:text-[26px] font-bold text-[#142d27] tracking-tight">
              Buat akun Sigap
            </h2>
            <Link href="/login" className="text-xs text-emerald-600 font-semibold hover:underline">
              Sudah punya akun?
            </Link>
          </header>

          {/* Form Elements */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection Group */}
            <div className="space-y-1.5" data-purpose="role-selector">
              <label className="block text-xs font-semibold text-slate-700">
                Saya mendaftar sebagai
              </label>
              <div className="grid grid-cols-2 gap-3 pt-0.5">
                {/* Role Option: Pemilik Usaha */}
                <label
                  onClick={() => setRole("pemilik_usaha")}
                  className={`relative flex flex-col justify-start p-3 rounded-lg cursor-pointer transition ${
                    role === "pemilik_usaha"
                      ? "border-2 border-[#3bb17b] bg-[#eef7f3]"
                      : "border border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <input
                    checked={role === "pemilik_usaha"}
                    onChange={() => setRole("pemilik_usaha")}
                    className="sr-only"
                    name="role"
                    type="radio"
                    value="pemilik_usaha"
                  />
                  <span
                    className={`text-xs font-bold mb-1 ${
                      role === "pemilik_usaha" ? "text-[#113a2e]" : "text-slate-800"
                    }`}
                  >
                    Pemilik Usaha
                  </span>
                  <span
                    className={`text-[11px] leading-tight ${
                      role === "pemilik_usaha" ? "text-[#4b7a6b]" : "text-slate-500"
                    }`}
                  >
                    Saya punya bengkel, laundry, barbershop atau toko
                  </span>
                </label>

                {/* Role Option: Admin Sigap */}
                <label
                  onClick={() => setRole("admin_sigap")}
                  className={`relative flex flex-col justify-start p-3 rounded-lg cursor-pointer transition ${
                    role === "admin_sigap"
                      ? "border-2 border-[#3bb17b] bg-[#eef7f3]"
                      : "border border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <input
                    checked={role === "admin_sigap"}
                    onChange={() => setRole("admin_sigap")}
                    className="sr-only"
                    name="role"
                    type="radio"
                    value="admin_sigap"
                  />
                  <span
                    className={`text-xs font-bold mb-1 ${
                      role === "admin_sigap" ? "text-[#113a2e]" : "text-slate-800"
                    }`}
                  >
                    Admin Sigap
                  </span>
                  <span
                    className={`text-[11px] leading-tight ${
                      role === "admin_sigap" ? "text-[#4b7a6b]" : "text-slate-500"
                    }`}
                  >
                    Tim internal pengelola template &amp; pelanggan
                  </span>
                </label>
              </div>
            </div>

            {/* Input: Business Name */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700" htmlFor="business_name">
                Nama usaha
              </label>
              <input
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors shadow-none"
                id="business_name"
                name="business_name"
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
              />
            </div>

            {/* Input: Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors shadow-none"
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Input: Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-700" htmlFor="password">
                Kata sandi
              </label>
              <input
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors shadow-none font-sans"
                id="password"
                name="password"
                placeholder="••••••••••"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-2.5 px-4 bg-[#23a868] hover:bg-[#1d925a] active:bg-[#167b4b] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors text-center flex items-center justify-center gap-2"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Menghubungkan...</span>
                  </>
                ) : (
                  "Lanjut hubungkan WhatsApp"
                )}
              </motion.button>
            </div>

            {/* Disclaimer / Legal Footer */}
            <p className="text-[10px] text-center text-slate-500 pt-2 leading-relaxed">
              Dengan mendaftar Anda setuju pada{" "}
              <a className="underline hover:text-slate-700" href="#">
                Syarat Layanan
              </a>{" "}
              dan{" "}
              <a className="underline hover:text-slate-700" href="#">
                Kebijakan Privasi
              </a>{" "}
              Sigap.
            </p>
          </form>
        </motion.div>
      </section>
      {/* END: RightFormContainer */}
    </main>
  );
}
