import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Plus, Edit2, Smartphone, Monitor, Watch, Headphones, Camera, Gamepad2, Package, Zap, Shirt, Home, Trophy } from 'lucide-react';
import type { AppDispatch, RootState } from '@/store/store';

import { fetchCategories, addCategory, updateCategory, deleteCategory, type Category as CategoryType } from '@/reducer/CategorySlice';
import { CategoryModal } from '@/components/shared/CategoryModal';

import Brands from '@/pages/Other/Brands'; 
import Banners from '@/pages/Other/Banner'; 

const API_URL: string = import.meta.env.VITE_API_BASE_URL || 'https://fastcard-1-o23z.onrender.com/api';

export default function Category() {
  const [activeTab, setActiveTab] = useState<'categories' | 'brands' | 'banners'>('categories');

  return (
    <div className="min-h-screen bg-[#F4F7FE] dark:bg-gray-900 p-8 transition-colors duration-300">
      <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm mb-6">
        <div className="flex gap-6 border-b border-transparent">
          {(['categories', 'brands', 'banners'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium capitalize rounded-t-lg border-b-2 transition-colors ${
                activeTab === tab
                  ? 'text-blue-600 dark:text-blue-400 border-blue-600 bg-blue-50/50 dark:bg-gray-700'
                  : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-800 dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'categories' && <CategoriesContent />}
      {activeTab === 'brands' && <Brands />}
      {activeTab === 'banners' && <Banners />}
    </div>
  );
}

function CategoriesContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading } = useSelector((state: RootState) => state.category);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 10;

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
    
    if (lowerName.includes('electronic')) return <Zap size={32} className="text-gray-700 dark:text-gray-200" />;
    if (lowerName.includes('fashion') || lowerName.includes('cloth')) return <Shirt size={32} className="text-gray-700 dark:text-gray-200" />;
    if (lowerName.includes('home') || lowerName.includes('garden')) return <Home size={32} className="text-gray-700 dark:text-gray-200" />;
    if (lowerName.includes('sport')) return <Trophy size={32} className="text-gray-700 dark:text-gray-200" />;
    if (lowerName.includes('toy') || lowerName.includes('gam')) return <Gamepad2 size={32} className="text-gray-700 dark:text-gray-200" />;
    
    if (lowerName.includes('headphone')) return <Headphones size={32} className="text-gray-700 dark:text-gray-200" />;
    if (lowerName.includes('phone')) return <Smartphone size={32} className="text-gray-700 dark:text-gray-200" />;
    if (lowerName.includes('computer') || lowerName.includes('laptop')) return <Monitor size={32} className="text-gray-700 dark:text-gray-200" />;
    if (lowerName.includes('watch')) return <Watch size={32} className="text-gray-700 dark:text-gray-200" />;
    if (lowerName.includes('camera')) return <Camera size={32} className="text-gray-700 dark:text-gray-200" />;
    
    return <Package size={32} className="text-gray-700 dark:text-gray-200" />;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm min-h-[600px] flex flex-col transition-colors">
      <div className="flex justify-between items-center mb-6">
        <div className="w-72 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-transparent dark:text-white" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} />
        </div>
        <button onClick={handleOpenAddModal} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition">
          <Plus size={18} /> Add new
        </button>
      </div>

      {loading ? <div className="flex-1 flex justify-center items-center dark:text-gray-300">Загрузка...</div> : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 flex-1 content-start">
          {paginatedCategories.map((cat: CategoryType) => {
            const hasValidImageString = cat.categoryImage && cat.categoryImage !== 'null' && cat.categoryImage !== 'undefined';
            
            return (
              <div key={cat.id} className="relative flex flex-col items-center justify-center p-6 border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-md transition bg-white dark:bg-gray-700 group cursor-pointer">
                <button onClick={() => handleOpenEditModal(cat)} className="absolute top-3 right-3 text-blue-500 opacity-0 group-hover:opacity-100 transition p-1 hover:bg-blue-50 dark:hover:bg-gray-600 rounded">
                  <Edit2 size={16} />
                </button>
                
                <div className="mb-4">
                  {hasValidImageString && !imageErrors[cat.id] ? (
                    <img 
                      src={`${API_URL}/images/${cat.categoryImage}`} 
                      alt={cat.categoryName} 
                      className="w-12 h-12 object-contain" 
                      onError={() => handleImageError(cat.id)}
                    />
                  ) : (
                    getIconForCategory(cat.categoryName)
                  )}
                </div>
                
                <h3 className="text-sm font-medium text-gray-800 dark:text-gray-100 text-center">{cat.categoryName}</h3>
              </div>
            );
          })}
        </div>
      )}

      <CategoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} mode={modalMode} initialData={selectedCategory} onSubmit={handleModalSubmit} onDelete={async (id) => { await dispatch(deleteCategory(id)); dispatch(fetchCategories()); }} />
    </div>
  );
}