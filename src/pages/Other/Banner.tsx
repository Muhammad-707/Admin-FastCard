import { ChevronDown, Clock, Trash2, Upload } from 'lucide-react';
import i1 from "@/assets/Frame 560.png"
import i2 from "@/assets/Frame 600.png"
import { useTranslation } from "react-i18next";


export default function Banners() {
  const { t } = useTranslation();
  return (
    <div className="bg-white dark:bg-gray-800 min-h-screen rounded-xl p-4 md:p-8 transition-colors">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t("text151")}</h2>
          <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors mb-6">
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
              <Upload size={20} className="text-gray-600 dark:text-gray-300" />
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-200 underline decoration-gray-300 dark:decoration-gray-600 underline-offset-2">
              {t("text153")} <span className="no-underline text-gray-600 dark:text-gray-400">{t("text153a")}</span>
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">(SVG, JPG, PNG, or gif maximum 900x400)</p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
            <div className="grid grid-cols-[80px_1fr_60px] gap-4 py-3 px-4 bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 font-medium">
              <div>{t("text154")}</div>
              <div>{t("text155")}</div>
              <div className="text-right">{t("text156")}</div>
            </div>
            <div className="grid grid-cols-[80px_1fr_60px] gap-4 items-center py-4 px-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center overflow-hidden p-2">
                <img src={i1} alt="preview" className="w-full h-full object-contain" />
              </div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">{t("text157")}</div>
              <div className="flex justify-end">
                <button className="text-gray-400 hover:text-red-500 transition-colors p-2">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-[80px_1fr_60px] gap-4 items-center py-4 px-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center overflow-hidden p-2">
                <img src={i1} alt="preview" className="w-full h-full object-contain" />
              </div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">{t("text157")}</div>
              <div className="flex justify-end">
                <button className="text-gray-400 hover:text-red-500 transition-colors p-2">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-[80px_1fr_60px] gap-4 items-center py-4 px-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center overflow-hidden p-2">
                <img src={i1} alt="preview" className="w-full h-full object-contain" />
              </div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">{t("text157")}</div>
              <div className="flex justify-end">
                <button className="text-gray-400 hover:text-red-500 transition-colors p-2">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 flex flex-col gap-6">
            <div className="relative">
              <label className="absolute -top-2 left-3 bg-white dark:bg-gray-900 px-1 text-xs font-medium text-gray-400 dark:text-gray-500">{t("text158")}</label>
              <input
                type="text"
                defaultValue={t("text159")}
                className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-700 dark:text-white bg-transparent focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow"
              />
            </div>

            <div className="relative">
              <label className="absolute -top-2 left-3 bg-white dark:bg-gray-900 px-1 text-xs font-medium text-gray-400 dark:text-gray-500">{t("text160")}</label>
              <input
                type="text"
                defaultValue={t("text159")}
                className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-700 dark:text-white bg-transparent focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-shadow"
              />
            </div>

            <div className="flex justify-end mt-2">
              <button className="bg-[#2C62EE] hover:bg-blue-700 text-white font-medium px-8 py-2.5 rounded-lg transition-colors">
                {t("text166")}
              </button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t("text152")}</h2>
          <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors mb-6">
            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
              <Upload size={20} className="text-gray-600 dark:text-gray-300" />
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-200 underline decoration-gray-300 dark:decoration-gray-600 underline-offset-2">
              {t("text153")} <span className="no-underline text-gray-600 dark:text-gray-400">{t("text153a")}</span>
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">(SVG, JPG, PNG, or gif maximum 900x400)</p>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-6">
            <div className="grid grid-cols-[80px_1fr_60px] gap-4 py-3 px-4 bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 font-medium">
              <div>{t("text154")}</div>
              <div>{t("text155")}</div>
              <div className="text-right">{t("text156")}</div>
            </div>
            <div className="grid grid-cols-[80px_1fr_60px] gap-4 items-center py-4 px-4">
              <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center overflow-hidden p-2">
                <img src={i2} alt="preview" className="w-full h-full object-contain" />
              </div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">{t("text157")}</div>
              <div className="flex justify-end">
                <button className="text-gray-400 hover:text-red-500 transition-colors p-2">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 flex flex-col gap-6">
            <div className="relative">
              <select className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-500 dark:text-gray-300 appearance-none bg-white dark:bg-gray-800 focus:outline-none focus:border-blue-500 transition-colors cursor-pointer">
                <option value="">{t("text162")}</option>
                <option value="1">{t("text163")}</option>
                <option value="2">{t("text164")}</option>
              </select>
              <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
            </div>
            <div className="relative">
              <input
                type="text"
                defaultValue="05d/23h/59m/35s"
                className="w-full border border-gray-200 dark:border-gray-700 rounded-lg pl-4 pr-10 py-3 text-sm text-gray-700 dark:text-white bg-transparent focus:outline-none focus:border-blue-500 transition-colors"
              />
              <Clock size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            </div>
            <div className="relative">
              <label className="absolute -top-2 left-3 bg-white dark:bg-gray-900 px-1 text-xs font-medium text-gray-400 dark:text-gray-500">Title</label>
              <input
                type="text"
                defaultValue={t("text165")}
                className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-700 dark:text-white bg-transparent focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="flex justify-end mt-2">
              <button className="bg-[#2C62EE] hover:bg-blue-700 text-white font-medium px-8 py-2.5 rounded-lg transition-colors">
                {t("text166")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}