import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2, Edit2 } from 'lucide-react';
import type { AppDispatch, RootState } from '@/store/store';
import { fetchBrands, addBrand, updateBrand, deleteBrand, type Brand } from '@/reducer/BrandSlice';

export default function Brands() {
  const dispatch = useDispatch<AppDispatch>();
  const { brands, loading } = useSelector((state: RootState) => state.brand);

  const [brandName, setBrandName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim()) return;

    if (editingId) {
      await dispatch(updateBrand({ id: editingId, brandName }));
      setEditingId(null);
    } else {
      await dispatch(addBrand(brandName));
    }
    setBrandName('');
    dispatch(fetchBrands());
  };

  const handleEdit = (brand: Brand) => {
    setEditingId(brand.id);
    setBrandName(brand.brandName);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Вы уверены, что хотите удалить бренд?')) {
      await dispatch(deleteBrand(id));
      dispatch(fetchBrands());
    }
  };

  const filteredBrands = brands.filter((b) => 
    b.brandName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
      <div className="flex-1 w-full bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm overflow-x-auto transition-colors">
        <input 
          type="text" 
          placeholder="Search brands..." 
          className="w-full mb-6 p-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-transparent dark:text-white transition"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <table className="w-full text-left border-collapse table-fixed">
          <thead>
            <tr className="border-b dark:border-gray-700 text-gray-400 text-sm uppercase tracking-wider">
              <th className="pb-3 font-medium w-3/4">Brands</th>
              <th className="pb-3 font-medium text-center w-1/4">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={2} className="py-8 text-center text-gray-500 dark:text-gray-400">
                  Загрузка...
                </td>
              </tr>
            ) : filteredBrands.length > 0 ? (
              filteredBrands.map((brand) => (
                <tr key={brand.id} className="border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-750 transition">
                  <td className="py-4 font-medium text-gray-700 dark:text-gray-200 truncate pr-4">
                    {brand.brandName}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center justify-center gap-4">
                      <button 
                        onClick={() => handleEdit(brand)} 
                        className="p-1.5 text-blue-500 bg-blue-50 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md hover:bg-blue-100 hover:text-blue-700 transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(brand.id)} 
                        className="p-1.5 text-red-500 bg-red-50 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md hover:bg-red-100 hover:text-red-700 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="py-8 text-center text-gray-500 dark:text-gray-400">
                  Бренды не найдены
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="w-full lg:w-80 shrink-0 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm transition-colors">
        <h2 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">
          {editingId ? 'Edit brand' : 'Add new brand'}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Brand Name</label>
            <input 
              type="text" 
              placeholder="Enter brand name" 
              className="w-full p-2.5 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-transparent dark:text-white transition"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-colors mt-2"
          >
            {editingId ? 'Update Brand' : 'Create Brand'}
          </button>
          
          {editingId && (
            <button 
              type="button" 
              onClick={() => {
                setEditingId(null); 
                setBrandName('');
              }} 
              className="w-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium py-2.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel Edit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}