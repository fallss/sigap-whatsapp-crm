"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";

interface WeeklyBar {
  week: string;
  total: number;
  aiHeight: number;
  userHeight: number;
}

const WEEKS_DATA: WeeklyBar[] = [
  { week: "M1", total: 42, aiHeight: 64, userHeight: 48 },
  { week: "M2", total: 49, aiHeight: 72, userHeight: 52 },
  { week: "M3", total: 54, aiHeight: 80, userHeight: 48 },
  { week: "M4", total: 58, aiHeight: 96, userHeight: 56 },
  { week: "M5", total: 61, aiHeight: 112, userHeight: 50 },
  { week: "M6", total: 67, aiHeight: 128, userHeight: 52 },
  { week: "M7", total: 63, aiHeight: 116, userHeight: 54 },
  { week: "M8", total: 71, aiHeight: 136, userHeight: 48 },
];

export default function AnalyticsPage() {
  const [hoveredWeek, setHoveredWeek] = useState<WeeklyBar | null>(null);

  return (
    <div className="flex min-h-screen bg-[#EEF3F0] font-sans">
      {/* Sidebar Navigation */}
      <Sidebar current="Laporan" />

      {/* BEGIN: MainContent */}
      <main className="flex-1 flex flex-col min-w-0 pt-16 pb-24 lg:pt-8 lg:pb-8 px-4 sm:px-6 lg:px-8 overflow-y-auto space-y-6">
        {/* Top Header Area */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#0C3A2F]">Laporan</h2>
            <p className="text-xs sm:text-sm text-[#5C7A70] font-medium mt-0.5">
              Oktober 2025 · dibanding September
            </p>
          </div>
          {/* Online Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5EFE9] border border-[#D0E2D7] text-xs font-semibold text-[#0E513F] shadow-xs self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#20B27A]"></span>
            <span>WhatsApp terhubung</span>
          </div>
        </header>

        {/* BEGIN: MetricCards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4" data-purpose="summary-metrics">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-[0_2px_4px_rgba(0,0,0,0.02)]"
          >
            <div className="text-xs font-medium text-[#657F76]">Chat terjawab otomatis</div>
            <div className="text-3xl font-extrabold text-[#0D3F33] tracking-tight mt-1.5">71%</div>
            <div className="text-xs font-semibold text-[#20B27A] mt-1">+9 poin</div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-[0_2px_4px_rgba(0,0,0,0.02)]"
          >
            <div className="text-xs font-medium text-[#657F76]">Waktu balas rata-rata</div>
            <div className="text-3xl font-extrabold text-[#0D3F33] tracking-tight mt-1.5">24 dtk</div>
            <div className="text-xs font-semibold text-[#20B27A] mt-1">dari 45 menit</div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-[0_2px_4px_rgba(0,0,0,0.02)]"
          >
            <div className="text-xs font-medium text-[#657F76]">Kembali setelah diingatkan</div>
            <div className="text-3xl font-extrabold text-[#0D3F33] tracking-tight mt-1.5">29%</div>
            <div className="text-xs font-semibold text-[#20B27A] mt-1">+4 poin</div>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-2xl p-5 border border-slate-200/70 shadow-[0_2px_4px_rgba(0,0,0,0.02)]"
          >
            <div className="text-xs font-medium text-[#657F76]">Pelanggan aktif terdata</div>
            <div className="text-3xl font-extrabold text-[#0D3F33] tracking-tight mt-1.5">184</div>
            <div className="text-xs font-semibold text-[#20B27A] mt-1">+23 orang</div>
          </motion.div>
        </section>
        {/* END: MetricCards */}

        {/* BEGIN: StackedBarChartSection */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-[0_2px_4px_rgba(0,0,0,0.02)]"
          data-purpose="chart-container"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm sm:text-base font-bold text-[#0D3E32]">
              Chat masuk dan porsi yang dijawab Sigap
            </h3>
            {hoveredWeek && (
              <span className="text-xs text-slate-500 font-semibold bg-slate-100 px-2.5 py-1 rounded-md">
                Minggu {hoveredWeek.week}: Total {hoveredWeek.total} chat
              </span>
            )}
          </div>

          {/* Chart Body with Grid Lines & Columns */}
          <div className="relative w-full h-64 sm:h-72 mt-2">
            {/* Horizontal Grid Lines and Y-Axis Labels */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-slate-400 text-xs font-medium">
              <div className="flex items-center w-full">
                <span className="w-8 text-right pr-3">80</span>
                <div className="flex-1 border-b border-slate-100"></div>
              </div>
              <div className="flex items-center w-full">
                <span className="w-8 text-right pr-3">60</span>
                <div className="flex-1 border-b border-slate-100"></div>
              </div>
              <div className="flex items-center w-full">
                <span className="w-8 text-right pr-3">40</span>
                <div className="flex-1 border-b border-slate-100"></div>
              </div>
              <div className="flex items-center w-full">
                <span className="w-8 text-right pr-3">20</span>
                <div className="flex-1 border-b border-slate-100"></div>
              </div>
              <div className="flex items-center w-full">
                <span className="w-8 text-right pr-3">0</span>
                <div className="flex-1 border-b border-slate-200"></div>
              </div>
            </div>

            {/* Bars Column Container */}
            <div className="absolute inset-0 pl-11 pr-4 flex items-end justify-between">
              {WEEKS_DATA.map((w) => (
                <div
                  key={w.week}
                  onMouseEnter={() => setHoveredWeek(w)}
                  onMouseLeave={() => setHoveredWeek(null)}
                  className="flex flex-col items-center w-8 sm:w-11 group cursor-pointer"
                >
                  <span className="text-[11px] font-bold text-[#144236] mb-1.5 group-hover:scale-110 transition-transform">
                    {w.total}
                  </span>
                  <div className="w-full flex flex-col rounded-t-[4px] overflow-hidden shadow-xs">
                    {/* User portion (top) */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: w.userHeight }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="w-full bg-[#BDD2C9] hover:bg-[#a6c1b7] transition-colors"
                      title="Dijawab Anda"
                    />
                    {/* Sigap portion (bottom) */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: w.aiHeight }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="w-full bg-[#0D4E3E] hover:bg-[#093d30] transition-colors"
                      title="Dijawab Sigap"
                    />
                  </div>
                  <span className="text-[11px] font-medium text-slate-400 mt-2">{w.week}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chart Legend */}
          <div className="flex items-center gap-6 mt-8 pl-8 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0D4E3E]"></span>
              <span>Dijawab Sigap</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#BDD2C9]"></span>
              <span>Dijawab Anda</span>
            </div>
          </div>
        </motion.section>
        {/* END: StackedBarChartSection */}

        {/* BEGIN: DetailColumns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Column 1: Pertanyaan paling sering */}
          <section
            className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-[0_2px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between"
            data-purpose="faq-breakdown"
          >
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0D3E32] mb-5">Pertanyaan paling sering</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-medium text-[#2E493F]">Berapa harga potong?</span>
                    <span className="font-bold text-[#0F3B2F]">94×</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#1DAA70] h-full rounded-full" style={{ width: "95%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-medium text-[#2E493F]">Antre berapa lama?</span>
                    <span className="font-bold text-[#0F3B2F]">71×</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#1DAA70] h-full rounded-full" style={{ width: "72%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-medium text-[#2E493F]">Jam buka hari ini?</span>
                    <span className="font-bold text-[#0F3B2F]">63×</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#1DAA70] h-full rounded-full" style={{ width: "64%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-medium text-[#2E493F]">Lokasinya di mana?</span>
                    <span className="font-bold text-[#0F3B2F]">48×</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#1DAA70] h-full rounded-full" style={{ width: "49%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-medium text-[#2E493F]">Bisa booking?</span>
                    <span className="font-bold text-[#0F3B2F]">39×</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#1DAA70] h-full rounded-full" style={{ width: "40%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Column 2: Jam tersibuk */}
          <section
            className="bg-white rounded-2xl p-6 border border-slate-200/70 shadow-[0_2px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between"
            data-purpose="busy-hours"
          >
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0D3E32] mb-5">Jam tersibuk</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-medium text-[#2E493F]">09.00–12.00 <span className="text-slate-400 font-normal">ringan</span></span>
                    <span className="font-bold text-[#0F3B2F]">22</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#0E493A] h-full rounded-full" style={{ width: "25%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-medium text-[#2E493F]">12.00–15.00 <span className="text-slate-400 font-normal">sedang</span></span>
                    <span className="font-bold text-[#0F3B2F]">41</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#0E493A] h-full rounded-full" style={{ width: "48%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-medium text-[#2E493F]">15.00–18.00 <span className="text-slate-400 font-normal">sibuk</span></span>
                    <span className="font-bold text-[#0F3B2F]">58</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#0E493A] h-full rounded-full" style={{ width: "68%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-medium text-[#2E493F]">18.00–21.00 <span className="text-slate-400 font-normal">paling sibuk</span></span>
                    <span className="font-bold text-[#0F3B2F]">74</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#0E493A] h-full rounded-full" style={{ width: "88%" }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="font-medium text-[#2E493F]">21.00–06.00 <span className="text-slate-400 font-normal">di luar jam buka</span></span>
                    <span className="font-bold text-[#0F3B2F]">31</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-[#B57C32] h-full rounded-full" style={{ width: "38%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Highlight Note Banner */}
            <div className="mt-6 p-3.5 bg-[#FAF2E8] border-l-4 border-[#C88432] rounded-r-xl text-xs">
              <div className="font-bold text-[#895318]">31 chat masuk saat toko tutup</div>
              <div className="text-[#96662E] mt-0.5 leading-relaxed font-normal">
                Sebelum pakai Sigap, semuanya baru dibalas besok paginya.
              </div>
            </div>
          </section>
        </div>
        {/* END: DetailColumns */}
      </main>
    </div>
  );
}
