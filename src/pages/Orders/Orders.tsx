import i1 from "@/assets/receipt.png"

export default function Orders() {
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
          No Orders Yet
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed mb-6 px-4">
          All the upcoming orders from your store will be visible in this page.
          You can add orders by yourself if you sell offline.
        </p>
        <button
          onClick={handleAddOrder}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-medium text-sm rounded-lg transition-all shadow-sm shadow-blue-500/20">
          <span className="text-lg font-light leading-none">+</span>
          Add order
        </button>
      </div>
    </div>
  );
}