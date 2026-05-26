import i1 from "@/assets/receipt.png"
import { useTranslation } from "react-i18next";

export default function Orders() {
  const { t } = useTranslation();
  const handleAddOrder = () => {
    console.log("Клик по кнопке: Добавить заказ");
  };

  return (
    <div className="flex flex-col w-full text-slate-800 font-sans p-6 min-h-[80vh] justify-center items-center select-none">
      <div className="flex flex-col items-center max-w-md text-center">
        <div className="pb-5">
          <img className="w-fit " src={i1} alt="" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">
          {t("text33")}
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed mb-6 px-4">
          {t("text34")}
        </p>
        <button
          onClick={handleAddOrder}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium text-sm rounded-lg transition-all shadow-sm shadow-blue-500/20">
          <span className="text-lg font-light leading-none">+</span>
          {t("text35")}
        </button>
      </div>
    </div>
  );
}