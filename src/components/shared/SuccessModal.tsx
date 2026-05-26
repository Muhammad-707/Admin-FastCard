import React from 'react';
import { X, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";


interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  isEdit?: boolean;
}

export default function SuccessModal({ isOpen, onClose, title = "Successfully add", isEdit = false }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-8 relative text-center">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
        
        <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
          <Check size={32} className="text-blue-600" />
        </div>
        
        <h2 className="text-xl font-bold mb-2 text-gray-800">{title}</h2>
        <p className="text-gray-500 mb-8 text-sm">
          {isEdit ? "Your product has been updated." : "Do you want to add new product to your store?"}
        </p>

        <div className="flex justify-center gap-3">
          <button 
            onClick={() => navigate('/products')} 
            className="px-4 py-2 border border-gray-300 text-blue-600 rounded-md text-sm font-medium hover:bg-gray-50"
          >
            {t("text180")}
          </button>
          {!isEdit && (
            <button 
              onClick={() => { onClose(); window.location.reload(); }} 
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex items-center gap-1"
            >
              <span>+ {t("text181")}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}