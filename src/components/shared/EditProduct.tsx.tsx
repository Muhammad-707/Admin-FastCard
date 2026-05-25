import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import ColorModal from '@/components/shared/ColorModal';
import SuccessModal from '@/components/shared/SuccessModal';
import type { Color } from '@/reducer/types';

export default function EditProduct() {
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
        console.error("Failed to update product");
      }
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const res = await fetch(`https://fastcard-1-o23z.onrender.com/api/Product/delete-product?id=${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        navigate('/products');
      }
    } catch (err) { console.error("Error deleting", err); }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/products')} className="text-gray-500 hover:text-black">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold">Products / Edit product</h1>
          </div>
          <div className="flex gap-3">
             <button onClick={handleDelete} className="px-6 py-2 bg-red-50 text-red-600 border border-red-100 font-medium rounded-md hover:bg-red-100">
              Delete
            </button>
            <button onClick={() => navigate('/products')} className="px-6 py-2 bg-white border border-gray-200 text-blue-600 font-medium rounded-md hover:bg-gray-50">
              Cancel
            </button>
            <button onClick={handleUpdate} disabled={isLoading} className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50">
              {isLoading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">Information</h2>
              <div className="flex gap-4 mb-4">
                <input name="ProductName" value={formData.ProductName} onChange={handleChange} placeholder="Product name" className="flex-1 border border-gray-200 rounded-md p-2.5 outline-none focus:border-blue-500" />
                <input name="Code" value={formData.Code} onChange={handleChange} placeholder="Code" className="w-1/3 border border-gray-200 rounded-md p-2.5 outline-none focus:border-blue-500" />
              </div>
              <textarea name="Description" value={formData.Description} onChange={handleChange} placeholder="Description" rows={5} className="w-full border border-gray-200 rounded-md p-2.5 mb-4 outline-none focus:border-blue-500" />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">Price & Options</h2>
              <div className="flex gap-4 mb-6">
                <input type="number" name="Price" value={formData.Price} onChange={handleChange} placeholder="Price" className="flex-1 border border-gray-200 rounded-md p-2.5 outline-none focus:border-blue-500" />
                <input type="number" name="DiscountPrice" value={formData.DiscountPrice} onChange={handleChange} placeholder="Discount" className="flex-1 border border-gray-200 rounded-md p-2.5 outline-none focus:border-blue-500" />
                <input type="number" name="Quantity" value={formData.Quantity} onChange={handleChange} placeholder="Quantity" className="flex-1 border border-gray-200 rounded-md p-2.5 outline-none focus:border-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input name="Size" value={formData.Size} onChange={handleChange} placeholder="Size" className="border border-gray-200 rounded-md p-2.5 outline-none focus:border-blue-500" />
                <input name="Weight" value={formData.Weight} onChange={handleChange} placeholder="Weight" className="border border-gray-200 rounded-md p-2.5 outline-none focus:border-blue-500" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Colour:</h2>
                <button onClick={() => setIsColorModalOpen(true)} className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:underline">
                  <Check size={16}/> Create new
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {colors.map(color => (
                  <button 
                    key={color.id}
                    onClick={() => setFormData({...formData, ColorId: color.id})}
                    title={color.colorName}
                    className={`w-8 h-8 rounded-full border-2 ${formData.ColorId === color.id ? 'border-blue-500 scale-110' : 'border-transparent'} shadow-sm`}
                    style={{ backgroundColor: color.colorName.toLowerCase() === 'white' ? '#f3f4f6' : color.colorName }}
                  />
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