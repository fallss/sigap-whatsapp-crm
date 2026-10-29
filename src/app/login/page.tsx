"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("andi@rapibro.id");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  };

  return (
    <main className="min-h-screen flex flex-col lg:flex-row w-full font-sans" data-purpose="auth-split-layout">
      {/* BEGIN: LeftBrandingSidebar */}
      <motion.section
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:w-[35%] xl:w-[32%] bg-[#0e4c3a] text-white flex flex-col justify-between p-6 sm:p-10 lg:p-14 min-h-auto lg:min-h-screen shrink-0"
        data-purpose="branding-sidebar"
      >
        {/* Top Branding: Logo & Brand Name */}
        <div data-purpose="brand-header">
          <div className="inline-flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#22c55e] flex items-center justify-center font-bold text-white text-base shadow-sm">
              S
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Sigap</span>
          </div>
        </div>

        {/* Center Content: Value Proposition Headline & Copy */}
        <div className="my-6 lg:my-0 max-w-md" data-purpose="brand-pitch">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-snug mb-3 sm:mb-5">
            Pelanggan bertanya jam 10 malam. Sigap yang jawab.
          </h1>
          <p className="text-emerald-100/80 text-xs sm:text-sm leading-relaxed font-normal">
            Asisten CS WhatsApp untuk UMKM jasa. Menjawab pertanyaan berulang, mengingat tiap pelanggan, dan memanggil mereka kembali tepat waktu.
          </p>
        </div>

        {/* Bottom Stats Metrics */}
        <div className="pt-2 sm:pt-4" data-purpose="key-metrics">
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div>
              <div className="text-lg sm:text-2xl font-bold tracking-tight text-white leading-none">
                71%
              </div>
              <p className="text-[10px] sm:text-xs text-emerald-200/70 mt-1 leading-tight">
                otomatis
              </p>
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-bold tracking-tight text-white leading-none">
                24 dtk
              </div>
              <p className="text-[10px] sm:text-xs text-emerald-200/70 mt-1 leading-tight">
                waktu balas
              </p>
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-bold tracking-tight text-white leading-none flex items-baseline">
                3<span className="text-sm sm:text-lg font-semibold ml-0.5">×</span>
              </div>
              <p className="text-[10px] sm:text-xs text-emerald-200/70 mt-1 leading-tight">
                kunjungan balik
              </p>
            </div>
          </div>
        </div>
      </motion.section>
      {/* END: LeftBrandingSidebar */}

      {/* BEGIN: RightAuthFormSection */}
      <section
        className="lg:w-[65%] xl:w-[68%] bg-white flex items-center justify-center px-4 py-8 sm:px-12 lg:px-20"
        data-purpose="login-form-container"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-[420px]"
          data-purpose="login-box"
        >
          {/* Form Title Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-[28px] font-bold text-gray-900 tracking-tight mb-2">
              Masuk ke Sigap
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-normal">
              Belum punya akun? <span className="text-gray-400">Daftar gratis, 14 hari uji coba.</span>
            </p>
          </div>

          {/* Login Form Element */}
          <form onSubmit={handleSubmit} className="space-y-4" data-purpose="auth-credentials-form">
            {/* Email Input Group */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition duration-150"
                id="email"
                name="email"
                placeholder="andi@rapibro.id"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input Group */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5" htmlFor="password">
                Kata sandi
              </label>
              <input
                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition duration-150 font-mono"
                id="password"
                name="password"
                placeholder="••••••••••"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-[#16a365] hover:bg-[#138b56] active:bg-[#0f7247] text-white font-medium text-sm py-2.5 px-4 rounded-lg shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 flex items-center justify-center gap-2"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Memproses...</span>
                  </>
                ) : (
                  "Masuk"
                )}
              </motion.button>
            </div>
          </form>

          {/* Alternative Navigation / Signup Link */}
          <div className="mt-6 text-center text-xs text-gray-400">
            Belum punya akun?{" "}
            <Link
              className="text-[#16a365] hover:text-[#138b56] font-semibold hover:underline ml-0.5 transition duration-150"
              href="/register"
            >
              Daftar sekarang
            </Link>
          </div>
        </motion.div>
      </section>
      {/* END: RightAuthFormSection */}
    </main>
  );
}
