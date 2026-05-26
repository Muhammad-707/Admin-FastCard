import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from "react-i18next";


interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ColorModal({ isOpen, onClose, onSuccess }: Props) {
  const { t } = useTranslation();
  const [colorName, setColorName] = useState('');
  const [hexCode, setHexCode] = useState('#000000'); 
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleCreate = async () => {
    if (!colorName.trim()) return;
    setIsLoading(true);
    try {
      const response = await fetch('https://fastcard-1-o23z.onrender.com/api/Color/add-color', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ colorName })
      });
      if (response.ok) {
        onSuccess();
        onClose();
        setColorName('');
      }
    } catch (error) {
      console.error("Error adding color:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
        <h2 className="text-xl font-semibold mb-6 text-gray-800">{t("text175")}</h2>
        
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">{t("text176")}</label>
            <input 
              type="text" 
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
              placeholder="e.g. Dark blue"
              className="w-full border border-gray-300 rounded-md p-2 outline-none focus:border-blue-500"
            />
          </div>
          <div className="w-32">
            <label className="block text-xs text-white mb-1">{t("text179")}</label>
            <div className="flex items-center border border-gray-300 rounded-md p-2 gap-2">
              <input 
                type="color" 
                value={hexCode}
                onChange={(e) => setHexCode(e.target.value)}
                className="w-6 h-6 rounded cursor-pointer border-0 p-0"
              />
              <span className="text-sm uppercase">{hexCode}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 text-blue-600 rounded-md hover:bg-gray-50">
            {t("text177")}
          </button>
          <button 
            onClick={handleCreate} 
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {t("text178")}
          </button>
        </div>
      </div>
    </div>
  );
}