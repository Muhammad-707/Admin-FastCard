import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Search, Plus, Edit2, Smartphone, Monitor, Watch,
  Headphones, Camera, Gamepad2, Package, Zap, Shirt,
  Home, Trophy, ChevronLeft, ChevronRight, Loader2
} from 'lucide-react';
import type { AppDispatch, RootState } from '@/store/store';
import { useTranslation } from "react-i18next";

import { fetchCategories, addCategory, updateCategory, deleteCategory, type Category as CategoryType } from '@/reducer/CategorySlice';
import { CategoryModal } from '@/components/shared/CategoryModal';

import Brands from '@/pages/Other/Brands';
import Banners from '@/pages/Other/Banner';

const API_URL: string = import.meta.env.VITE_API_BASE_URL || 'https://fastcard-1-o23z.onrender.com/api';

export default function Category() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'categories' | 'brands' | 'banners'>('categories');

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/20 p-4 sm:p-6 lg:p-8 font-sans transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex justify-start mb-6 sm:mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex gap-1.5 p-1.5 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 w-max">
            {(['categories', 'brands', 'banners'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 font-bold text-sm capitalize rounded-xl transition-all duration-200 active:scale-95 whitespace-nowrap ${activeTab === tab
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="transition-all duration-300">
          {activeTab === 'categories' && <CategoriesContent />}
          {activeTab === 'brands' && <Brands />}
          {activeTab === 'banners' && <Banners />}
        </div>

      </div>
    </div>
  );
}

function CategoriesContent() {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading } = useSelector((state: RootState) => state.category);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 12;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);

  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  useEffect(() => { dispatch(fetchCategories()); }, [dispatch]);

  const filteredCategories = categories.filter((c: CategoryType) =>
    c.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages: number = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const paginatedCategories = filteredCategories.slice(startIndex, startIndex + itemsPerPage);

  const handleOpenAddModal = () => { setModalMode('add'); setSelectedCategory(null); setIsModalOpen(true); };
  const handleOpenEditModal = (cat: CategoryType) => { setModalMode('edit'); setSelectedCategory(cat); setIsModalOpen(true); };

  const handleModalSubmit = async (formData: FormData) => {
    modalMode === 'add' ? await dispatch(addCategory(formData)) : await dispatch(updateCategory(formData));
    dispatch(fetchCategories());
  };

  const handleImageError = (id: number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const getIconForCategory = (name: string) => {
    const lowerName = name.toLowerCase();
    const iconClass = "text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300";

    if (lowerName.includes('electronic')) return <Zap size={32} className={iconClass} />;
    if (lowerName.includes('fashion') || lowerName.includes('cloth')) return <Shirt size={32} className={iconClass} />;
    if (lowerName.includes('home') || lowerName.includes('garden')) return <Home size={32} className={iconClass} />;
    if (lowerName.includes('sport')) return <Trophy size={32} className={iconClass} />;
    if (lowerName.includes('toy') || lowerName.includes('gam')) return <Gamepad2 size={32} className={iconClass} />;
    if (lowerName.includes('headphone')) return <Headphones size={32} className={iconClass} />;
    if (lowerName.includes('phone')) return <Smartphone size={32} className={iconClass} />;
    if (lowerName.includes('computer') || lowerName.includes('laptop')) return <Monitor size={32} className={iconClass} />;
    if (lowerName.includes('watch')) return <Watch size={32} className={iconClass} />;
    if (lowerName.includes('camera')) return <Camera size={32} className={iconClass} />;

    return <Package size={32} className={iconClass} />;
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 min-h-[600px] flex flex-col">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="relative w-full sm:max-w-md">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={t("text121")}
            className="w-full pl-11 pr-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium bg-slate-50 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          />
        </div>
        <button
          onClick={handleOpenAddModal}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-sm shadow-blue-500/20"
        >
          <Plus size={18} /> {t("text122")}
        </button>
      </div>

      {loading ? (
        <div className="flex-1 flex flex-col justify-center items-center text-slate-400 space-y-4">
          <Loader2 size={40} className="animate-spin text-blue-500" />
          <p className="font-medium text-sm">Загрузка категорий...</p>
        </div>
      ) : paginatedCategories.length === 0 ? (
        <div className="flex-1 flex flex-col justify-center items-center text-center p-8">
          <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <Package size={40} className="text-slate-300 dark:text-slate-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Ничего не найдено</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm">
            По вашему запросу "{searchQuery}" не найдено ни одной категории.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 flex-1 content-start">
            {paginatedCategories.map((cat: CategoryType) => {
              const hasValidImageString = cat.categoryImage && cat.categoryImage !== 'null' && cat.categoryImage !== 'undefined';

              return (
                <div
                  key={cat.id}
                  onClick={() => handleOpenEditModal(cat)}
                  className="group relative flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/60 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-200 dark:hover:border-blue-500/30"
                >
                  <button
                    className="absolute top-3 right-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-all duration-200 p-2 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 dark:hover:text-blue-400 rounded-lg"
                    aria-label="Edit category"
                  >
                    <Edit2 size={16} />
                  </button>

                  <div className="w-16 h-16 mb-4 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 transition-colors">
                    {hasValidImageString && !imageErrors[cat.id] ? (
                      <img
                        src={`${API_URL}/images/${cat.categoryImage}`}
                        alt={cat.categoryName}
                        className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                        onError={() => handleImageError(cat.id)}
                      />
                    ) : (
                      getIconForCategory(cat.categoryName)
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 text-center line-clamp-2">
                    {cat.categoryName}
                  </h3>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition-all active:scale-95"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex items-center gap-1 px-2">
                {[...Array(totalPages)].map((_, idx) => {
                  const page = idx + 1;
                  if (totalPages > 5 && Math.abs(currentPage - page) > 1 && page !== 1 && page !== totalPages) {
                    if (page === 2 || page === totalPages - 1) return <span key={page} className="text-slate-400 px-1">...</span>;
                    return null;
                  }

                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-xl text-sm font-bold transition-all active:scale-90 ${currentPage === page
                          ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                    >
                      {page}
                    </button>
                  )
                })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition-all active:scale-95"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </>
      )}

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        initialData={selectedCategory}
        onSubmit={handleModalSubmit}
        onDelete={async (id) => {
          await dispatch(deleteCategory(id));
          dispatch(fetchCategories());
        }}
      />
    </div>
  );
}