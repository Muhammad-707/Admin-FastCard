import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { fetchProducts } from "@/reducer/ProductSlice";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { useTranslation } from "react-i18next";
import i1 from "@/assets/iconly-glass-chart.svg.png";
import i2 from "@/assets/iconly-glass-discount.svg.png";
import i3 from "@/assets/iconly-glass-tick.svg.png";
import { useNavigate } from "react-router-dom";
import { Loader } from "@/components/shared/loader";

const revenueData = [
  { name: "Jan", revenue: 10 }, { name: "Feb", revenue: 17 },
  { name: "Mar", revenue: 11 }, { name: "Apr", revenue: 25 },
  { name: "May", revenue: 38 }, { name: "Jun", revenue: 33 },
  { name: "Jul", revenue: 38 }, { name: "Aug", revenue: 49 },
  { name: "Sep", revenue: 42 }, { name: "Oct", revenue: 26 },
  { name: "Nov", revenue: 26 }, { name: "Dec", revenue: 37 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800/95 backdrop-blur-sm dark:bg-slate-700/95 text-white p-3 rounded-xl shadow-xl border border-white/10 text-center select-none z-50 relative">
        <p className="text-xs font-bold tracking-wide">{payload[0].value * 22} Orders</p>
        <p className="text-[10px] text-gray-300 mt-1 uppercase tracking-wider">{payload[0].payload.name}</p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Выводим по 6 элементов в списках
  const topProducts = products.slice(0, 6);
  const topUnitsSold = [...products].sort((a, b) => b.quantity - a.quantity).slice(0, 6);

  return (
    <div className="flex flex-col gap-4 sm:gap-6 w-full bg-slate-50/50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-100 font-sans p-3 sm:p-6 min-h-screen">
      <div className="flex justify-between items-center select-none pt-2 sm:pt-0 pb-1 sm:pb-0 px-1 sm:px-0">
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white transition-colors">
          {t("text9")}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
            <div className="relative overflow-hidden bg-gradient-to-br from-[#FEF3F2] to-white dark:from-slate-800 dark:to-slate-800/90 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-sm border border-rose-100/50 dark:border-slate-700/50 transition-all hover:shadow-md">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-rose-500 rounded-l-2xl opacity-80"></div>
              <img src={i1} alt="" className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-sm" />
              <div className="flex flex-col justify-center">
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-0.5">{t("text14")}</p>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">$152k</p>
              </div>
            </div>

            <div className="relative overflow-hidden bg-gradient-to-br from-[#FFFAEB] to-white dark:from-slate-800 dark:to-slate-800/90 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-sm border border-amber-100/50 dark:border-slate-700/50 transition-all hover:shadow-md">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500 rounded-l-2xl opacity-80"></div>
              <img src={i2} alt="" className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-sm" />
              <div className="flex flex-col justify-center">
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-0.5">{t("text15")}</p>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">$99.7k</p>
              </div>
            </div>

            <div className="relative overflow-hidden bg-gradient-to-br from-[#F0FDF9] to-white dark:from-slate-800 dark:to-slate-800/90 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-sm border border-emerald-100/50 dark:border-slate-700/50 transition-all hover:shadow-md">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500 rounded-l-2xl opacity-80"></div>
              <img src={i3} alt="" className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-sm" />
              <div className="flex flex-col justify-center">
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-0.5">{t("text16")}</p>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">$32.1k</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100 dark:border-slate-700/60 flex flex-col justify-between flex-1">
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">{t("text17")}</h3>
            </div>
            <div className="h-52 sm:h-100 w-full -ml-3 sm:ml-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="rgba(148, 163, 184, 0.15)" />
                  {/* Ошибки исправлены ниже (fontWeight: 500) */}
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} domain={[0, 50]} ticks={[0, 10, 20, 30, 40, 50]} dx={-10} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3b82f6', strokeWidth: 1.5, strokeDasharray: '4 4' }} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    activeDot={{ r: 6, fill: "#ffffff", stroke: "#3b82f6", strokeWidth: 3 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100 dark:border-slate-700/60 flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">{t("text18")}</h3>
              <button onClick={() => navigate('/products')} className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 active:scale-95 transition-all bg-blue-50 dark:bg-blue-500/10 px-3 py-1.5 rounded-lg">{t("text19")}</button>
            </div>

            {loading ? (
              <Loader fullScreen={false} />
            ) : (
              <div className="flex flex-col gap-2.5">
                {topProducts.map((product) => (
                  <div key={product.id} onClick={() => navigate(`/products/${product.id}`)} className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/40 p-2 sm:p-2.5 -mx-2 rounded-xl transition-all active:scale-[0.98] min-w-0">
                    <div className="flex items-center gap-3.5 min-w-0 flex-1 pr-3">
                      <img
                        src={product.image?.startsWith("http") ? product.image : `https://fastcard-1-o23z.onrender.com/images/${product.image}`}
                        alt={product.productName}
                        className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-xl bg-slate-100 dark:bg-slate-700 shadow-sm flex-shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=100&q=80";
                        }}
                      />
                      <div className="min-w-0 flex-1 flex flex-col justify-center">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 truncate mb-0.5">{product.productName}</h4>
                        <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate font-medium">{product.categoryName || "Accessories"}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 flex flex-col justify-center">
                      <p className="text-xs sm:text-sm font-black text-emerald-600 dark:text-emerald-400 mb-0.5">${product.price}</p>
                      <p className="text-[9px] sm:text-[10px] text-slate-400 font-semibold">{product.quantity} sold</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 pb-6">
        <div className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-2xl p-0 sm:p-6 shadow-sm border border-slate-100 dark:border-slate-700/60 overflow-hidden flex flex-col">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white p-4 sm:p-0 sm:mb-5 border-b border-slate-100 dark:border-slate-700/50 sm:border-0">{t("text20")}</h3>
          <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
            <table className="w-full text-left border-collapse min-w-[450px]">
              <thead>
                <tr className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-700/60">
                  <th className="pb-3 px-4 sm:px-2 font-semibold">{t("text22")}</th>
                  <th className="pb-3 px-4 sm:px-2 font-semibold">{t("text23")}</th>
                  <th className="pb-3 px-4 sm:px-2 font-semibold">{t("text24")}</th>
                  <th className="pb-3 px-4 sm:px-2 font-semibold">{t("text25")}</th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 divide-y divide-slate-50 dark:divide-slate-700/40">
                {[
                  { name: `${t("text26")}`, date: "24.05.2023", amount: "$124.97", status: `${t("text31")}`, statColor: "emerald" },
                  { name: `${t("text27")}`, date: "23.05.2023", amount: "$55.42", status: `${t("text32")}`, statColor: "amber" },
                  { name: `${t("text28")}`, date: "23.05.2023", amount: "$89.90", status: `${t("text31")}`, statColor: "emerald" },
                  { name: `${t("text29")}`, date: "22.05.2023", amount: "$144.94", status: `${t("text32")}`, statColor: "amber" },
                  { name: `${t("text30")}`, date: "22.05.2023", amount: "$70.52", status: `${t("text31")}`, statColor: "emerald" },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors group">
                    <td className="py-3.5 sm:py-4 px-4 sm:px-2 text-slate-900 dark:text-slate-100 font-bold max-w-[160px] sm:max-w-none truncate">{row.name}</td>
                    <td className="py-3.5 sm:py-4 px-4 sm:px-2 text-slate-500 dark:text-slate-400 font-medium">{row.date}</td>
                    <td className="py-3.5 sm:py-4 px-4 sm:px-2 font-extrabold">${row.amount.replace('$', '')}</td>
                    <td className="py-3.5 sm:py-4 px-4 sm:px-2">
                      <span className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold tracking-wide uppercase shadow-sm ${row.statColor === 'emerald'
                          ? 'bg-emerald-100/50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-500/20'
                          : 'bg-amber-100/50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border border-amber-200/50 dark:border-amber-500/20'
                        }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100 dark:border-slate-700/60 flex flex-col">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-5">{t("text21")}</h3>

          {loading ? (
            <Loader fullScreen={false} />
          ) : (
            <div className="flex flex-col gap-2.5 text-xs sm:text-sm font-medium">
              <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-700/60 pb-3 mb-1">
                <span className="w-7/12 pr-2">{t("text22")}</span>
                <span className="w-2/12 text-center">{t("text25a")}</span>
                <span className="w-3/12 text-right">{t("text25b")}</span>
              </div>
              {topUnitsSold.map((product) => (
                <div key={product.id} onClick={() => navigate(`/products/${product.id}`)} className="flex items-center justify-between text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/40 p-2.5 sm:p-3 -mx-2 rounded-xl transition-all active:scale-[0.98] cursor-pointer min-w-0">
                  <span className="w-7/12 font-bold text-slate-900 dark:text-slate-100 truncate pr-3">
                    {product.productName}
                  </span>
                  <span className="w-2/12 text-center text-slate-500 dark:text-slate-400 font-semibold flex-shrink-0">
                    ${product.price}
                  </span>
                  <span className="w-3/12 text-right font-black text-blue-600 dark:text-blue-400 flex-shrink-0">
                    {product.quantity} <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 ml-0.5">pcs</span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}