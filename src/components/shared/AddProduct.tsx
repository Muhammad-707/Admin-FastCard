import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Trash2, Check, Loader2 } from 'lucide-react';
import ColorModal from '@/components/shared/ColorModal';
import SuccessModal from '@/components/shared/SuccessModal';
import type { Color } from '@/reducer/types';
import { useTranslation } from "react-i18next";

export default function AddProduct() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [colors, setColors] = useState<Color[]>([]);

  const [formData, setFormData] = useState({
    ProductName: '',
    Code: '',
    Description: '',
    CategoryId: '1',
    BrandId: '1',
    Price: '',
    DiscountPrice: '',
    Quantity: '',
    HasDiscount: false,
    Size: '',
    Weight: '',
    ColorId: null as number | null,
  });

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchColors = async () => {
    try {
      const res = await fetch('https://fastcard-1-o23z.onrender.com/api/Color/get-colors');
      const json = await res.json();
      if (json.data) setColors(json.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchColors();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages(prev => [...prev, ...newFiles]);

      const newUrls = newFiles.map(file => URL.createObjectURL(file));
      setImagePreviewUrls(prev => [...prev, ...newUrls]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const data = new FormData();
      data.append(`${t("text75")}`, formData.ProductName);
      data.append(`${t("text76")}`, formData.Code);
      data.append(`${t("text77")}`, formData.Description);
      data.append(`${t("text78")}`, formData.Price);
      data.append(`${t("text79")}`, formData.DiscountPrice || '0');
      data.append(`${t("text80")}`, formData.Quantity);
      data.append(`${t("text81")}`, String(formData.HasDiscount));
      data.append(`${t("text82")}`, formData.Size);
      data.append(`${t("text83")}`, formData.Weight);
      data.append(`${t("text84")}`, formData.CategoryId);
      data.append(`${t("text85")}`, '1');
      data.append(`${t("text86")}`, formData.BrandId);
      if (formData.ColorId) data.append(`${t("text87")}`, String(formData.ColorId));

      images.forEach(image => {
        data.append('Images', image);
      });

      const response = await fetch('https://fastcard-1-o23z.onrender.com/api/Product/add-product', {
        method: 'POST',
        body: data,
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
              {t("text70")} <span className="text-slate-300 dark:text-slate-700 mx-1">/</span> <span className="text-blue-600 dark:text-blue-400">{t("text71")}</span>
            </h1>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigate('/products')}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all active:scale-95"
            >
              {t("text72")}
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-sm rounded-xl transition-all active:scale-95 shadow-sm shadow-blue-500/10 disabled:opacity-50"
            >
              {isLoading && <Loader2 size={16} className="animate-spin" />}
              {isLoading ? `${t("text73a")}` : `${t("text73")}`}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">{t("text74")}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <input
                    name="ProductName"
                    value={formData.ProductName}
                    onChange={handleChange}
                    placeholder={t("text75")}
                    className={inputClasses}
                  />
                </div>
                <div className="sm:col-span-1">
                  <input
                    name="Code"
                    value={formData.Code}
                    onChange={handleChange}
                    placeholder={t("text76")}
                    className={inputClasses}
                  />
                </div>
              </div>

              <div>
                <textarea
                  name="Description"
                  value={formData.Description}
                  onChange={handleChange}
                  placeholder={t("text77")}
                  rows={5}
                  className={`${inputClasses} resize-none`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                  name="CategoryId"
                  value={formData.CategoryId}
                  onChange={handleChange}
                  className={`${inputClasses} appearance-none cursor-pointer`}
                >
                  <option value="1">{t("text90")}</option>
                  <option value="2">{t("text91")}</option>
                </select>
                <select
                  name="BrandId"
                  value={formData.BrandId}
                  onChange={handleChange}
                  className={`${inputClasses} appearance-none cursor-pointer`}
                >
                  <option value="1">{t("text92")}</option>
                  <option value="2">{t("text93")}</option>
                </select>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-5">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">{t("text94")}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="number"
                  name="Price"
                  value={formData.Price}
                  onChange={handleChange}
                  placeholder={t("text171")}
                  className={inputClasses}
                />
                <input
                  type="number"
                  name="DiscountPrice"
                  value={formData.DiscountPrice}
                  onChange={handleChange}
                  placeholder={t("text172")}
                  className={inputClasses}
                />
                <input
                  type="number"
                  name="Quantity"
                  value={formData.Quantity}
                  onChange={handleChange}
                  placeholder={t("text173")}
                  className={inputClasses}
                />
              </div>

              <div>
                <label className="inline-flex items-center gap-3 cursor-pointer group select-none">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      name="HasDiscount"
                      checked={formData.HasDiscount}
                      onChange={handleChange}
                      className="w-5 h-5 text-blue-600 rounded-lg border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-blue-500/20 cursor-pointer transition-colors"
                    />
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                    {t("text95")}
                  </span>
                </label>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-3">{t("text96")}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    name="Size"
                    value={formData.Size}
                    onChange={handleChange}
                    placeholder={t("text82")}
                    className={inputClasses}
                  />
                  <input
                    name="Weight"
                    value={formData.Weight}
                    onChange={handleChange}
                    placeholder={t("text83")}
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
                  <Check size={14} /> {t("text97")}
                </button>
              </div>

              <div className="flex flex-wrap gap-3 max-h-[160px] overflow-y-auto pr-1">
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

            <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">{t("text154")}</h2>

              <div className="group border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-blue-50/20 dark:hover:bg-blue-500/5 rounded-2xl p-6 text-center mb-4 relative transition-all duration-200 cursor-pointer">
                <input
                  type="file"
                  multiple
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  accept="image/*"
                />
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center mx-auto shadow-sm border border-slate-100 dark:border-slate-700 mb-3 group-hover:scale-110 group-hover:text-blue-500 transition-all duration-200">
                  <Upload className="text-slate-400 dark:text-slate-500 group-hover:text-blue-500 transition-colors" size={20} />
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  <span className="font-bold text-slate-900 dark:text-white underline decoration-blue-500/40">{t("text98")}</span> {t("text99")}
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1.5">
                  SVG, JPG, PNG, GIF (max 900x400)
                </p>
              </div>

              <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
                {imagePreviewUrls.map((url, idx) => (
                  <div key={url} className="group/item flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-xl transition-all">
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={url} alt="Preview" className="w-11 h-11 rounded-lg object-cover bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700" />
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate max-w-[140px]">
                        {images[idx]?.name || `Image-${idx + 1}`}
                      </span>
                    </div>
                    <button
                      onClick={() => removeImage(idx)}
                      className="p-2 text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                      aria-label="Remove image"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <ColorModal isOpen={isColorModalOpen} onClose={() => setIsColorModalOpen(false)} onSuccess={fetchColors} />
      <SuccessModal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} title="Successfully added" />
    </div>
  );
}