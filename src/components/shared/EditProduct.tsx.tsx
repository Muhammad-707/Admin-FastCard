import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Loader2, Trash2 } from 'lucide-react';
import ColorModal from '@/components/shared/ColorModal';
import SuccessModal from '@/components/shared/SuccessModal';
import type { Color } from '@/reducer/types';
import { useTranslation } from "react-i18next";

export default function EditProduct() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [colors, setColors] = useState<Color[]>([]);

  const [formData, setFormData] = useState({
    Id: Number(id),
    ProductName: '',
    Code: '',
    Description: '',
    CategoryId: 1,
    BrandId: 1,
    Price: 0,
    DiscountPrice: 0,
    Quantity: 0,
    HasDiscount: false,
    Size: '',
    Weight: '',
    ColorId: null as number | null,
    SubCategoryId: 1
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchColors();
    if (id) fetchProductInfo(id);
  }, [id]);

  const fetchColors = async () => {
    try {
      const res = await fetch('https://fastcard-1-o23z.onrender.com/api/Color/get-colors');
      const json = await res.json();
      if (json.data) setColors(json.data);
    } catch (err) { console.error(err); }
  };

  const fetchProductInfo = async (productId: string) => {
    try {
      const res = await fetch(`https://fastcard-1-o23z.onrender.com/api/Product/get-product-by-id?id=${productId}`);
      const json = await res.json();
      if (json.data) {
        setFormData({
          Id: Number(productId),
          ProductName: json.data.productName || '',
          Code: json.data.code || '',
          Description: json.data.description || '',
          CategoryId: json.data.categoryId || 1,
          BrandId: json.data.brandId || 1,
          Price: json.data.price || 0,
          DiscountPrice: json.data.discountPrice || 0,
          Quantity: json.data.quantity || 0,
          HasDiscount: json.data.hasDiscount || false,
          Size: json.data.size || '',
          Weight: json.data.weight || '',
          ColorId: json.data.colorId || null,
          SubCategoryId: json.data.subCategoryId || 1
        });
      }
    } catch (err) { console.error(err); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : type === 'number' ? Number(value) : value
    }));
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://fastcard-1-o23z.onrender.com/api/Product/update-product', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*'
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccessModalOpen(true);
      } else {
        console.error(`${t("text88")}`);
      }
    } catch (error) {
      console.error(`${t("text89")}`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`${t("text106")}`)) return;

    try {
      const res = await fetch(`https://fastcard-1-o23z.onrender.com/api/Product/delete-product?id=${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        navigate('/products');
      }
    } catch (err) { console.error(`${t("text107")}`, err); }
  };

  const inputClasses = "w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl text-sm font-medium text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200";

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/20 p-4 sm:p-6 lg:p-8 font-sans transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto">

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/products')}
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all active:scale-95"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {t("text100")} <span className="text-slate-300 dark:text-slate-700 mx-1">/</span> <span className="text-blue-600 dark:text-blue-400">{t("text101")}</span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleDelete}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-500/20 font-bold text-sm rounded-xl hover:bg-red-100 dark:hover:bg-red-500/20 transition-all active:scale-95"
            >
              <Trash2 size={16} />
              {t("text102")}
            </button>
            <button
              onClick={() => navigate('/products')}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all active:scale-95"
            >
              {t("text103")}
            </button>
            <button
              onClick={handleUpdate}
              disabled={isLoading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-sm rounded-xl transition-all active:scale-95 shadow-sm shadow-blue-500/10 disabled:opacity-50"
            >
              {isLoading && <Loader2 size={16} className="animate-spin" />}
              {isLoading ? `${t("text104a")}` : `${t("text104")}`}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">{t("text105")}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <input
                    name="ProductName"
                    value={formData.ProductName}
                    onChange={handleChange}
                    placeholder={t("text110")}
                    className={inputClasses}
                  />
                </div>
                <div className="sm:col-span-1">
                  <input
                    name="Code"
                    value={formData.Code}
                    onChange={handleChange}
                    placeholder={t("text111")}
                    className={inputClasses}
                  />
                </div>
              </div>

              <div>
                <textarea
                  name="Description"
                  value={formData.Description}
                  onChange={handleChange}
                  placeholder={t("text112")}
                  rows={5}
                  className={`${inputClasses} resize-none`}
                />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-5">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">{t("text105a")}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="number"
                  name="Price"
                  value={formData.Price}
                  onChange={handleChange}
                  placeholder="Price"
                  className={inputClasses}
                />
                <input
                  type="number"
                  name="DiscountPrice"
                  value={formData.DiscountPrice}
                  onChange={handleChange}
                  placeholder="Discount"
                  className={inputClasses}
                />
                <input
                  type="number"
                  name="Quantity"
                  value={formData.Quantity}
                  onChange={handleChange}
                  placeholder="Quantity"
                  className={inputClasses}
                />
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    name="Size"
                    value={formData.Size}
                    onChange={handleChange}
                    placeholder="Size"
                    className={inputClasses}
                  />
                  <input
                    name="Weight"
                    value={formData.Weight}
                    onChange={handleChange}
                    placeholder="Weight"
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">{t("text108")}</h2>
                <button
                  onClick={() => setIsColorModalOpen(true)}
                  className="text-blue-600 dark:text-blue-400 text-xs font-bold flex items-center gap-1 hover:bg-blue-50 dark:hover:bg-blue-500/10 px-2.5 py-1.5 rounded-lg transition-all"
                >
                  <Check size={14} /> {t("text109")}
                </button>
              </div>

              <div className="flex flex-wrap gap-3 max-h-[200px] overflow-y-auto pr-1">
                {colors.map(color => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, ColorId: color.id })}
                    title={color.colorName}
                    className={`w-9 h-9 rounded-full border-2 relative transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm ${formData.ColorId === color.id
                        ? 'border-blue-600 dark:border-blue-400 scale-110 ring-4 ring-blue-500/10'
                        : 'border-slate-200 dark:border-slate-700'
                      }`}
                    style={{ backgroundColor: color.colorName.toLowerCase() === 'white' ? '#f8fafc' : color.colorName }}
                  >
                    {formData.ColorId === color.id && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-2 h-2 rounded-full ${color.colorName.toLowerCase() === 'white' ? 'bg-slate-900' : 'bg-white mix-blend-difference'}`} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <ColorModal isOpen={isColorModalOpen} onClose={() => setIsColorModalOpen(false)} onSuccess={fetchColors} />
      <SuccessModal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} title="Successfully updated" isEdit={true} />
    </div>
  );
}