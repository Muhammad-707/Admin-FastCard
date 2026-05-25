import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { fetchProducts } from "@/reducer/ProductSlice";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

import i1 from "@/assets/iconly-glass-chart.svg.png";
import i2 from "@/assets/iconly-glass-discount.svg.png";
import i3 from "@/assets/iconly-glass-tick.svg.png";
import { useNavigate } from "react-router-dom";

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
      <div className="bg-slate-800 dark:bg-slate-700 text-white p-3 rounded-lg shadow-xl border border-slate-700 dark:border-slate-600 text-center select-none z-50 relative">
        <p className="text-xs font-bold tracking-wide">{payload[0].value * 22} Orders</p>
        <p className="text-[11px] text-gray-400 mt-0.5">{payload[0].payload.name}</p>
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const topProducts = products.slice(0, 5);
  const topUnitsSold = [...products].sort((a, b) => b.quantity - a.quantity).slice(0, 5);

  return (
    <div className="flex flex-col gap-6 w-full text-slate-800 dark:text-slate-100 font-sans p-6">
      <div className="flex justify-between items-center select-none">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors">
          Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-[#FEF3F2] dark:bg-slate-800 border-l-4 border-l-rose-500 rounded-xl p-5 flex items-center gap-4 shadow-sm transition-colors">
          <img src={i1} alt="" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Sales</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">$152k</p>
          </div>
        </div>

        <div className="bg-[#FFFAEB] dark:bg-slate-800 border-l-4 border-l-amber-500 rounded-xl p-5 flex items-center gap-4 shadow-sm transition-colors">
          <img src={i2} alt="" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Cost</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">$99.7k</p>
          </div>
        </div>

        <div className="bg-[#F0FDF9] dark:bg-slate-800 border-l-4 border-l-emerald-500 rounded-xl p-5 flex items-center gap-4 shadow-sm transition-colors">
          <img src={i3} alt="" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Profit</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">$32.1k</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-5 shadow-sm flex flex-col justify-between transition-colors">
          <div className="mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Sales Revenue</h3>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.2)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[0, 50]} ticks={[0, 10, 20, 30, 40, 50]} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  activeDot={{ r: 6, fill: "#3b82f6", stroke: "#ffffff", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-5 shadow-sm transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Top selling products</h3>
            <button onClick={() => navigate('/products')} className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">See All →</button>
          </div>

          {loading ? (
            <div className="flex h-48 items-center justify-center text-sm text-gray-400">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {topProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 p-2 -mx-2 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image?.startsWith("http") ? product.image : `https://fastcard-1-o23z.onrender.com/images/${product.image}`}
                      alt={product.productName}
                      className="w-11 h-11 object-cover rounded-lg bg-gray-100 dark:bg-slate-700 border border-gray-100 dark:border-slate-600"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=100&q=80";
                      }}
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 max-w-[130px] truncate">{product.productName}</h4>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">{product.categoryName || "Accessories"}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">${product.price}</p>
                    <p className="text-[10px] text-gray-400">{product.quantity} sold</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 pb-10">
        <div className="lg:col-span-3 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-5 shadow-sm overflow-x-auto transition-colors">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Recent Transactions</h3>
          <table className="w-full text-left border-collapse min-w-[400px]">
            <thead>
              <tr className="text-[11px] text-gray-400 font-semibold border-b border-gray-100 dark:border-slate-700 pb-2">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-xs font-medium text-slate-700 dark:text-slate-200 divide-y divide-gray-50 dark:divide-slate-700/50">
              {[
                { name: "Jagarnath S.", date: "24.05.2023", amount: "$124.97", status: "Paid", statColor: "emerald" },
                { name: "Anand G.", date: "23.05.2023", amount: "$55.42", status: "Pending", statColor: "amber" },
                { name: "Kartik S.", date: "23.05.2023", amount: "$89.90", status: "Paid", statColor: "emerald" },
                { name: "Rakesh S.", date: "22.05.2023", amount: "$144.94", status: "Pending", statColor: "amber" },
                { name: "Anup S.", date: "22.05.2023", amount: "$70.52", status: "Paid", statColor: "emerald" },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="py-3.5 text-slate-900 dark:text-slate-100">{row.name}</td>
                  <td className="py-3.5 text-gray-500 dark:text-gray-400">{row.date}</td>
                  <td className="py-3.5 font-bold">${row.amount.replace('$', '')}</td>
                  <td className="py-3.5">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-wide uppercase ${row.statColor === 'emerald'
                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
                        : 'bg-amber-50 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400'
                      }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl p-5 shadow-sm flex flex-col transition-colors">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-5">Top Products by Units Sold</h3>

          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 text-xs font-medium">
              <div className="flex items-center justify-between text-[11px] text-gray-400 font-semibold border-b border-gray-100 dark:border-slate-700 pb-2">
                <span className="w-1/2">Name</span>
                <span className="w-1/4 text-center">Price</span>
                <span className="w-1/4 text-right">Units</span>
              </div>
              {topUnitsSold.map((product) => (
                <div key={product.id} className="flex items-center justify-between text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/50 p-1.5 -mx-1.5 rounded transition-colors">
                  <span className="w-1/2 font-normal text-slate-900 dark:text-slate-100 truncate pr-2">
                    {product.productName}
                  </span>
                  <span className="w-1/4 text-center text-gray-500 dark:text-gray-400">
                    ${product.price}
                  </span>
                  <span className="w-1/4 text-right font-bold text-slate-900 dark:text-white">
                    {product.quantity}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}