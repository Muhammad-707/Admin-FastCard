import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Trash2, Check } from 'lucide-react';
import ColorModal from '@/components/shared/ColorModal';
import SuccessModal from '@/components/shared/SuccessModal';
import type { Color } from '@/reducer/types';

export default function AddProduct() {
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
      data.append('ProductName', formData.ProductName);
      data.append('Code', formData.Code);
      data.append('Description', formData.Description);
      data.append('Price', formData.Price);
      data.append('DiscountPrice', formData.DiscountPrice || '0');
      data.append('Quantity', formData.Quantity);
      data.append('HasDiscount', String(formData.HasDiscount));
      data.append('Size', formData.Size);
      data.append('Weight', formData.Weight);
      data.append('CategoryId', formData.CategoryId);
      data.append('SubCategoryId', '1');
      data.append('BrandId', formData.BrandId);
      if (formData.ColorId) data.append('ColorId', String(formData.ColorId));

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
        console.error("Failed to save product");
      }
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/products')} className="text-gray-500 hover:text-black">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold">Products / Add new</h1>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/products')} className="px-6 py-2 bg-white border border-gray-200 text-blue-600 font-medium rounded-md hover:bg-gray-50">
              Cancel
            </button>
            <button onClick={handleSubmit} disabled={isLoading} className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50">
              {isLoading ? 'Saving...' : 'Save'}
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
              <div className="flex gap-4">
                <select name="CategoryId" value={formData.CategoryId} onChange={handleChange} className="flex-1 border border-gray-200 rounded-md p-2.5 outline-none text-gray-600 bg-white">
                  <option value="1">Electronics</option>
                  <option value="2">Fashion</option>
                </select>
                <select name="BrandId" value={formData.BrandId} onChange={handleChange} className="flex-1 border border-gray-200 rounded-md p-2.5 outline-none text-gray-600 bg-white">
                  <option value="1">Brand A</option>
                  <option value="2">Brand B</option>
                </select>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">Price & Options</h2>
              <div className="flex gap-4 mb-6">
                <input type="number" name="Price" value={formData.Price} onChange={handleChange} placeholder="Product price" className="flex-1 border border-gray-200 rounded-md p-2.5 outline-none focus:border-blue-500" />
                <input type="number" name="DiscountPrice" value={formData.DiscountPrice} onChange={handleChange} placeholder="Discount" className="flex-1 border border-gray-200 rounded-md p-2.5 outline-none focus:border-blue-500" />
                <input type="number" name="Quantity" value={formData.Quantity} onChange={handleChange} placeholder="Count (Quantity)" className="flex-1 border border-gray-200 rounded-md p-2.5 outline-none focus:border-blue-500" />
              </div>

              <label className="flex items-center gap-3 mb-6 cursor-pointer">
                <input type="checkbox" name="HasDiscount" checked={formData.HasDiscount} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                <span className="text-sm font-medium">Has Discount</span>
              </label>

              <h3 className="font-semibold mb-3">Options</h3>
              <div className="grid grid-cols-2 gap-4">
                <input name="Size" value={formData.Size} onChange={handleChange} placeholder="Size (e.g. S, M, L)" className="border border-gray-200 rounded-md p-2.5 outline-none focus:border-blue-500" />
                <input name="Weight" value={formData.Weight} onChange={handleChange} placeholder="Weight (e.g. 0.5)" className="border border-gray-200 rounded-md p-2.5 outline-none focus:border-blue-500" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Colour:</h2>
                <button onClick={() => setIsColorModalOpen(true)} className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:underline">
                  <Check size={16} /> Create new
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {colors.map(color => (
                  <button
                    key={color.id}
                    onClick={() => setFormData({ ...formData, ColorId: color.id })}
                    title={color.colorName}
                    className={`w-8 h-8 rounded-full border-2 ${formData.ColorId === color.id ? 'border-blue-500 scale-110' : 'border-transparent'} shadow-sm`}
                    style={{ backgroundColor: color.colorName.toLowerCase() === 'white' ? '#f3f4f6' : color.colorName }}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold mb-4">Images</h2>
              <div className="border-2 border-dashed border-blue-200 bg-blue-50/50 rounded-lg p-8 text-center mb-4 relative hover:bg-blue-50 transition-colors">
                <input
                  type="file"
                  multiple
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*"
                />
                <Upload className="mx-auto text-blue-500 mb-2" size={24} />
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-black underline">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-400 mt-1">(SVG, JPG, PNG, or gif maximum 900x400)</p>
              </div>

              <div className="space-y-3">
                {imagePreviewUrls.map((url, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 border border-gray-100 rounded-md">
                    <div className="flex items-center gap-3">
                      <img src={url} alt="preview" className="w-10 h-10 rounded object-cover bg-gray-100" />
                      <span className="text-sm text-gray-600 max-w-[150px] truncate">{images[idx]?.name}</span>
                    </div>
                    <button onClick={() => removeImage(idx)} className="text-gray-400 hover:text-red-500">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ColorModal isOpen={isColorModalOpen} onClose={() => setIsColorModalOpen(false)} onSuccess={fetchColors} />
      <SuccessModal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} title="Successfully add" />
    </div>
  );
}