import React, { useState, useEffect, useRef } from 'react';
import { X, UploadCloud, Trash } from 'lucide-react';
import type { Category } from '@/reducer/CategorySlice';
import { useTranslation } from "react-i18next";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  initialData?: Category | null;
  onSubmit: (formData: FormData) => void;
  onDelete?: (id: number) => void;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose, mode, initialData, onSubmit, onDelete }) => {
  const { t } = useTranslation();
  const [categoryName, setCategoryName] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setCategoryName(initialData?.categoryName || '');
      setImageFile(null);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!categoryName.trim()) return;

    const formData = new FormData();
    formData.append('CategoryName', categoryName);
    
    if (mode === 'edit' && initialData) {
        formData.append('Id', initialData.id.toString());
    }

    if (imageFile) {
      formData.append('CategoryImage', imageFile);
    }

    onSubmit(formData);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-[500px] bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="flex justify-between items-center p-6 pb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {mode === 'add' ? `${t("text133")}` : `${t("text133")}`}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <input
            type="text"
            placeholder={t("text135")}
            className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />

          <div 
            className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <UploadCloud size={20} className="text-gray-600" />
            </div>
            <p className="text-sm font-medium text-gray-800">
              <span className="underline">{t("text136")}</span> {t("text137")}
            </p>
            <p className="text-xs text-gray-400 mt-1">(SVG, JPG, PNG, or gif maximum 900x400)</p>
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleFileChange} 
                accept="image/*"
            />
            {imageFile && <p className="text-sm text-blue-600 mt-2 font-medium">{imageFile.name}</p>}
          </div>
        </div>

        <div className="p-6 pt-2 flex justify-end gap-3 items-center">
            {mode === 'edit' && onDelete && initialData && (
                <button 
                  onClick={() => { onDelete(initialData.id); onClose(); }} 
                  className="mr-auto text-red-500 hover:text-red-600 flex items-center gap-1 text-sm font-medium"
                >
                  <Trash size={16} /> {t("text138")}
                </button>
            )}
          <button 
            onClick={onClose} 
            className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {t("text139")}
          </button>
          <button 
            onClick={handleSubmit} 
            className="px-5 py-2.5 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            disabled={!categoryName.trim()}
          >
            {mode === 'add' ? `${t("text140")}` : `${t("text141")}`}
          </button>
        </div>
      </div>
    </div>
  );
};