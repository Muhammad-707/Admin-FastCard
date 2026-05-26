import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Search, Edit, Trash2, Plus, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { fetchProducts, setFilter, deleteProduct, setPage } from "@/reducer/ProductSlice";
import { useTranslation } from "react-i18next";

export default function ProductsList() {
    const { t } = useTranslation();
    const dispatch = useDispatch<any>();
    const { products, filters, totalRecords, totalPages, currentPage, loading } = useSelector((state: any) => state.products);

    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; type: 'single' | 'multiple'; id?: number }>({ isOpen: false, type: 'single' });
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        dispatch(fetchProducts({ ...filters, PageSize: 6, PageNumber: currentPage || 1 }));
    }, [dispatch, filters, currentPage]);

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) setSelectedIds(products.map((p: any) => p.id));
        else setSelectedIds([]);
    };

    const handleSelectOne = (id: number) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const confirmDelete = () => {
        if (deleteModal.type === 'single' && deleteModal.id) {
            dispatch(deleteProduct(deleteModal.id));
        } else if (deleteModal.type === 'multiple') {
            selectedIds.forEach(id => dispatch(deleteProduct(id)));
            setSelectedIds([]);
            setIsEditMode(false);
        }
        setDeleteModal({ isOpen: false, type: 'single' });
    };

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            dispatch(setPage(newPage));
        }
    };

    return (
        <div className="p-3 sm:p-6 max-w-[1600px] mx-auto bg-slate-50/30 dark:bg-slate-950/10 min-h-screen font-sans">
            {!loading && (!products || products.length === 0) ? (
                <div className="flex flex-col h-[80vh] justify-between p-2">
                    <div className="text-left w-full">
                        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">{t("text11")}</h1>
                    </div>

                    <div className="flex flex-col items-center justify-center flex-1 px-4">
                        <div className="relative mb-5 transform scale-90 sm:scale-100">
                            <svg width="100" height="100" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M31 24C31 17 34 14 40 14C46 14 49 17 49 24" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
                                <path d="M22 24H58V60C58 62.2091 56.2091 64 54 64H26C23.7909 64 22 62.2091 22 60V24Z" fill="#E2E5F3" className="dark:fill-slate-800" />
                                <path d="M22 24H58V30H24V24Z" fill="#1E293B" className="dark:fill-slate-600" />
                                <circle cx="56" cy="56" r="11" fill="#2563EB" stroke="white" strokeWidth="2" />
                                <path d="M52 56L55 59L61 52" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1.5 text-center">{t("text36")}</h2>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm mb-6 leading-relaxed">
                            {t("text37")}<br />
                            {t("text37a")}
                        </p>

                        <Link to="/addProduct" className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700 font-bold text-sm transition-all shadow-sm shadow-blue-500/20 active:scale-95">
                            <Plus size={18} /> {t("text38")}
                        </Link>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5 sm:mb-6 px-1">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">{t("text39")}</h1>
                            <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mt-0.5 font-medium">{t("text40")} &gt; {t("text39")}</p>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <button
                                onClick={() => setIsEditMode(!isEditMode)}
                                className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 border font-bold text-xs sm:text-sm transition-all active:scale-95 ${isEditMode ? 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/30' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 dark:bg-slate-900 dark:text-gray-200 dark:border-slate-800'}`}
                            >
                                <Edit size={16} /> {isEditMode ? `${t("text42")}` : `${t("text43")}`}
                            </button>
                            <Link to="/addProduct" className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 font-bold text-xs sm:text-sm transition-all active:scale-95 shadow-sm shadow-blue-500/10">
                                <Plus size={16} /> {t("text38")}
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800/80 mb-4 sm:mb-6 overflow-hidden">
                        <div className="p-4 border-b border-gray-50 dark:border-slate-800/60 flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
                            <div className="grid grid-cols-1 sm:flex sm:items-center gap-2.5 flex-1">
                                <div className="relative w-full sm:max-w-xs">
                                    <Search className="absolute left-3.5 top-3 text-gray-400" size={16} />
                                    <input
                                        type="text"
                                        placeholder={t("text45")}
                                        className="pl-10 pr-4 py-2.5 w-full border border-gray-200 rounded-xl dark:bg-slate-800 dark:border-slate-700 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                        value={filters.search || ''}
                                        onChange={(e) => dispatch(setFilter({ search: e.target.value }))}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <select
                                        className="flex-1 sm:flex-none border border-gray-200 rounded-xl px-3 py-2.5 bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                        value={filters.categoryId || ''}
                                        onChange={(e) => dispatch(setFilter({ categoryId: e.target.value }))}
                                    >
                                        <option value="">{t("text46")}</option>
                                        <option value="1">{t("text47")}</option>
                                        <option value="2">{t("text48")}</option>
                                    </select>
                                    <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800 text-sm font-semibold active:scale-95 transition-all">
                                        <Filter size={16} /> <span className="hidden sm:inline">{t("text49")}</span>
                                    </button>
                                </div>
                            </div>

                            {isEditMode && selectedIds.length > 0 && (
                                <button
                                    onClick={() => setDeleteModal({ isOpen: true, type: 'multiple' })}
                                    className="bg-red-50 text-red-600 border border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20 px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-red-100 font-bold text-sm transition-all active:scale-95"
                                >
                                    <Trash2 size={16} /> {t("text50")} ({selectedIds.length})
                                </button>
                            )}
                        </div>

                        <div className="hidden sm:block overflow-x-auto">
                            <table className="w-full text-left border-collapse whitespace-nowrap">
                                <thead>
                                    <tr className="bg-slate-50/70 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-gray-100 dark:border-slate-800">
                                        {isEditMode && (
                                            <th className="py-4 px-6 w-12 text-center">
                                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4" onChange={handleSelectAll} checked={selectedIds.length === products?.length && products?.length > 0} />
                                            </th>
                                        )}
                                        <th className="py-4 px-6">{t("text51")}</th>
                                        <th className="py-4 px-6">{t("text52")}</th>
                                        <th className="py-4 px-6">{t("text53")}</th>
                                        <th className="py-4 px-6">{t("text54")}</th>
                                        <th className="py-4 px-6">{t("text55")}</th>
                                        <th className="py-4 px-6">{t("text56")}</th>
                                        <th className="py-4 px-6 text-right">{t("text57")}</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm font-medium text-slate-700 dark:text-slate-200 divide-y divide-slate-50 dark:divide-slate-800/40">
                                    {products?.map((product: any) => (
                                        <tr key={product.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                                            {isEditMode && (
                                                <td className="py-4 px-6 text-center">
                                                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4" checked={selectedIds.includes(product.id)} onChange={() => handleSelectOne(product.id)} />
                                                </td>
                                            )}
                                            <td className="py-4 px-6 flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-slate-800 overflow-hidden flex-shrink-0 shadow-sm border border-gray-100 dark:border-slate-700">
                                                    {product.image ? (
                                                        <img src={product.image.startsWith('http') ? product.image : `https://fastcard-1-o23z.onrender.com/images/${product.image}`} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 font-bold bg-slate-100 dark:bg-slate-800">{t("text59")}</div>
                                                    )}
                                                </div>
                                                <span className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{product.productName}</span>
                                            </td>
                                            <td className="py-4 px-6 text-slate-500 dark:text-slate-400 font-semibold">{product.code || 'N/A'}</td>
                                            <td className="py-4 px-6 text-slate-500 dark:text-slate-400 font-semibold">{product.categoryName || 'Uncategorized'}</td>
                                            <td className="py-4 px-6 text-slate-600 dark:text-slate-300 font-bold">{product.quantity}</td>
                                            <td className="py-4 px-6 font-black text-slate-900 dark:text-white">${product.price}</td>
                                            <td className="py-4 px-6">
                                                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide uppercase ${product.quantity > 0 ? 'bg-green-100/60 text-green-700 dark:bg-green-500/10 dark:text-green-400' : 'bg-red-100/60 text-red-700 dark:bg-red-500/10 dark:text-red-400'}`}>
                                                    {product.quantity > 0 ? `${t("text60")}` : `${t("text61")}`}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Link to={`/editProduct/${product.id}`} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-xl transition-all active:scale-90"><Edit size={16} /></Link>
                                                    <button onClick={() => setDeleteModal({ isOpen: true, type: 'single', id: product.id })} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all active:scale-90"><Trash2 size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="sm:hidden divide-y divide-slate-100 dark:divide-slate-800/60">
                            {products?.map((product: any) => (
                                <div key={product.id} className="p-4 flex flex-col gap-3.5 relative bg-white dark:bg-slate-900">
                                    <div className="flex items-start gap-3">
                                        {isEditMode && (
                                            <div className="pt-4 pr-1">
                                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 h-4 w-4 accent-blue-600" checked={selectedIds.includes(product.id)} onChange={() => handleSelectOne(product.id)} />
                                            </div>
                                        )}
                                        
                                        <div className="w-16 h-16 rounded-xl bg-slate-50 dark:bg-slate-800 overflow-hidden flex-shrink-0 border border-slate-100 dark:border-slate-800 shadow-sm">
                                            {product.image ? (
                                                <img src={product.image.startsWith('http') ? product.image : `https://fastcard-1-o23z.onrender.com/images/${product.image}`} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[10px] font-extrabold text-slate-400 bg-slate-100 dark:bg-slate-800">{t("text59")}</div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0 flex flex-col justify-between min-h-[64px]">
                                            <div className="flex items-start justify-between gap-2">
                                                <h4 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2 leading-tight flex-1">{product.productName}</h4>
                                                <span className="font-black text-sm text-slate-900 dark:text-white shrink-0">${product.price}</span>
                                            </div>
                                            
                                            <div className="flex items-center gap-2 flex-wrap mt-1">
                                                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Code: {product.code || 'N/A'}</span>
                                                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                                                    {product.categoryName || 'Uncategorized'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-2.5 border-t border-slate-50 dark:border-slate-800/40">
                                        <div className="flex items-center gap-3">
                                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide uppercase ${product.quantity > 0 ? 'bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400 border border-green-200/20' : 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400 border border-red-200/20'}`}>
                                                {product.quantity > 0 ? `${t("text60")}` : `${t("text61")}`}
                                            </span>
                                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                                {t("text54")}: <strong className="text-slate-800 dark:text-slate-200 font-bold">{product.quantity}</strong>
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <Link to={`/editProduct/${product.id}`} className="p-2 text-slate-400 active:text-emerald-600 active:bg-emerald-50 dark:active:bg-emerald-500/10 rounded-xl transition-all"><Edit size={16} /></Link>
                                            <button onClick={() => setDeleteModal({ isOpen: true, type: 'single', id: product.id })} className="p-2 text-slate-400 active:text-red-600 active:bg-red-50 dark:active:bg-red-500/10 rounded-xl transition-all"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-slate-50 dark:border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 font-medium text-center sm:text-left">
                                {t("text62")} <span className="font-bold text-slate-900 dark:text-white">{products?.length || 0}</span> {t("text63")} <span className="font-bold text-slate-900 dark:text-white">{totalRecords || 0}</span> {t("text64")}
                            </p>
                            
                            <div className="flex items-center gap-1.5 touch-none">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800 transition-all active:scale-90"
                                >
                                    <ChevronLeft size={16} />
                                </button>

                                {[...Array(totalPages || 1)].map((_, idx) => {
                                    const page = idx + 1;
                                    const isMobileHidden = Math.abs(currentPage - page) > 1 && page !== 1 && page !== totalPages;
                                    
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`w-9 h-9 rounded-xl text-xs sm:text-sm font-bold transition-all active:scale-90 ${isMobileHidden ? 'hidden sm:block' : ''} ${currentPage === page ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20' : 'border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'}`}
                                        >
                                            {page}
                                        </button>
                                    )
                                })}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="p-2 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800 transition-all active:scale-90"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {deleteModal.isOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl w-full max-w-[360px] sm:max-w-md shadow-xl border border-slate-100 dark:border-slate-800 animate-in zoom-in-95 duration-150">
                        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">{t("text65")}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                            {t("text66")} {deleteModal.type === 'multiple' ? `these ${selectedIds.length} products` : 'this product'}? {t("text67")}.
                        </p>
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setDeleteModal({ isOpen: false, type: 'single' })} className="px-4 py-2.5 font-bold text-xs sm:text-sm text-slate-500 hover:bg-slate-100 rounded-xl dark:text-slate-300 dark:hover:bg-slate-800 transition-all active:scale-95">{t("text68")}</button>
                            <button onClick={confirmDelete} className="px-4 py-2.5 font-bold text-xs sm:text-sm bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all active:scale-95 shadow-sm shadow-red-500/10">{t("text69")}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}