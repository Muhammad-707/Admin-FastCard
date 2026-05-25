import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Search, Edit, Trash2, Plus, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { fetchProducts, setFilter, deleteProduct, setPage } from "@/reducer/ProductSlice";

export default function ProductsList() {
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
        <div className="p-6 max-w-[1600px] mx-auto">
            {!loading && (!products || products.length === 0) ? (
                <div className="flex flex-col h-[75vh] justify-between">
                    <div className="text-left w-full">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h1>
                    </div>

                    <div className="flex flex-col items-center justify-center flex-1">
                        <div className="relative mb-4">
                            <svg width="100" height="100" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M31 24C31 17 34 14 40 14C46 14 49 17 49 24" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
                                <path d="M22 24H58V60C58 62.2091 56.2091 64 54 64H26C23.7909 64 22 62.2091 22 60V24Z" fill="#E2E5F3" className="dark:fill-slate-800" />
                                <path d="M22 24H58V30H24V24Z" fill="#1E293B" className="dark:fill-slate-600" />
                                <circle cx="56" cy="56" r="11" fill="#2563EB" stroke="white" strokeWidth="2" />
                                <path d="M52 56L55 59L61 52" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Add new products</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm mb-6 leading-relaxed">
                            Start making sales by adding your products.<br />
                            You can import and manage your products at any time.
                        </p>

                        <Link to="/addProduct" className="bg-blue-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-blue-700 font-medium text-sm transition-colors shadow-sm">
                            <Plus size={18} /> Add product
                        </Link>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Product List</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Dashboard &gt; Product List</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsEditMode(!isEditMode)}
                                className={`px-4 py-2 rounded-lg flex items-center gap-2 border font-medium transition-colors ${isEditMode ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 dark:bg-slate-800 dark:text-gray-200 dark:border-slate-700'}`}
                            >
                                <Edit size={18} /> {isEditMode ? 'Cancel Edit' : 'Edit List'}
                            </button>
                            <Link to="/addProduct" className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 font-medium">
                                <Plus size={18} /> Add Product
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
                        <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex flex-wrap gap-4 items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                                <div className="relative w-full max-w-xs">
                                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search product..."
                                        className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={filters.search || ''}
                                        onChange={(e) => dispatch(setFilter({ search: e.target.value }))}
                                    />
                                </div>
                                <select
                                    className="border border-gray-200 rounded-lg px-4 py-2 bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none"
                                    value={filters.categoryId || ''}
                                    onChange={(e) => dispatch(setFilter({ categoryId: e.target.value }))}
                                >
                                    <option value="">Category</option>
                                    <option value="1">Electronics</option>
                                    <option value="2">Fashion</option>
                                </select>
                                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800">
                                    <Filter size={18} /> More Filters
                                </button>
                            </div>

                            {isEditMode && selectedIds.length > 0 && (
                                <button
                                    onClick={() => setDeleteModal({ isOpen: true, type: 'multiple' })}
                                    className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-100 font-medium"
                                >
                                    <Trash2 size={18} /> Delete Selected ({selectedIds.length})
                                </button>
                            )}
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 dark:bg-slate-800/50 text-gray-500 dark:text-gray-400 text-sm font-medium">
                                        {isEditMode && (
                                            <th className="py-4 px-6 w-12">
                                                <input type="checkbox" className="rounded border-gray-300" onChange={handleSelectAll} checked={selectedIds.length === products?.length && products?.length > 0} />
                                            </th>
                                        )}
                                        <th className="py-4 px-6">Product</th>
                                        <th className="py-4 px-6">SKU</th>
                                        <th className="py-4 px-6">Category</th>
                                        <th className="py-4 px-6">Stock</th>
                                        <th className="py-4 px-6">Price</th>
                                        <th className="py-4 px-6">Status</th>
                                        <th className="py-4 px-6 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td colSpan={8} className="text-center py-10">Loading...</td></tr>
                                    ) : products?.map((product: any) => (
                                        <tr key={product.id} className="border-b border-gray-50 dark:border-slate-800 hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                            {isEditMode && (
                                                <td className="py-4 px-6">
                                                    <input type="checkbox" className="rounded border-gray-300" checked={selectedIds.includes(product.id)} onChange={() => handleSelectOne(product.id)} />
                                                </td>
                                            )}
                                            <td className="py-4 px-6 flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-slate-700 overflow-hidden flex-shrink-0">
                                                    {product.image ? (
                                                        <img src={product.image.startsWith('http') ? product.image : `https://fastcard-1-o23z.onrender.com/images/${product.image}`} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Img</div>
                                                    )}
                                                </div>
                                                <span className="font-semibold text-gray-800 dark:text-gray-200">{product.productName}</span>
                                            </td>
                                            <td className="py-4 px-6 text-gray-500 dark:text-gray-400">{product.code || 'N/A'}</td>
                                            <td className="py-4 px-6 text-gray-500 dark:text-gray-400">{product.categoryName || 'Uncategorized'}</td>
                                            <td className="py-4 px-6 text-gray-500 dark:text-gray-400">{product.quantity}</td>
                                            <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">${product.price}</td>
                                            <td className="py-4 px-6">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${product.quantity > 0 ? 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
                                                    {product.quantity > 0 ? 'Published' : 'Out of Stock'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link to={`/editProduct/${product.id}`} className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"><Edit size={18} /></Link>
                                                    <button onClick={() => setDeleteModal({ isOpen: true, type: 'single', id: product.id })} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-4 border-t border-gray-100 dark:border-slate-800 flex justify-between items-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Showing <span className="font-medium text-gray-900 dark:text-white">{products?.length || 0}</span> from <span className="font-medium text-gray-900 dark:text-white">{totalRecords || 0}</span> products
                            </p>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50 dark:border-slate-700 dark:hover:bg-slate-800"
                                >
                                    <ChevronLeft size={18} />
                                </button>

                                {[...Array(totalPages || 1)].map((_, idx) => {
                                    const page = idx + 1;
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${currentPage === page ? 'bg-blue-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800'}`}
                                        >
                                            {page}
                                        </button>
                                    )
                                })}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50 dark:border-slate-700 dark:hover:bg-slate-800"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {deleteModal.isOpen && (
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl w-[400px] shadow-xl border border-gray-100 dark:border-slate-800">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Confirm Deletion</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                            Are you sure you want to delete {deleteModal.type === 'multiple' ? `these ${selectedIds.length} products` : 'this product'}? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setDeleteModal({ isOpen: false, type: 'single' })} className="px-4 py-2 font-medium text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-300 dark:hover:bg-slate-800">Cancel</button>
                            <button onClick={confirmDelete} className="px-4 py-2 font-medium bg-red-600 text-white rounded-lg hover:bg-red-700">Yes, Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}