import React from 'react';
import { Package, Search, Filter, Plus, Edit, Trash2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
const Products = () => {
  const categories = [
    'all',
    'electronics',
    'clothing',
    'food',
    'books',
    'toys',
    'sports',
    'other',
  ];
  const { loading, setLoading } = useAuth();
  if (loading) {
    return (
      <section className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className='min-screen bg-gray-50 p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex justify-between items-center'>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Package className="w-8 h-8" />
                My Products
              </h1>
              <p className='text-gray-500 text-xs'>Manage your product inventory(items)</p>
            </div>
            <Link to={'/create-products'}>
              <button className='flex bg-blue-700 rounded-lg px-4 py-2 text-white items-center'>
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            </Link>

          </div>
        </div>

        {/* Filter */}
        <div className='bg-white rounded-lg shadow-sm p-4 mb-6'>
          <div className='flex justify-between items-center space-x-2'>
            {/* Search */}
            <div className='flex-1 relative'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400 w-5 h-5' />
              <input type="text"
                placeholder='Search products...'
                className='w-full pl-10 pr-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
            </div>
            <div className='flex items-center gap-2'>
              <Filter className='w-5 h-5 text-gray-400' />
              <select name="" id="" className=" px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                {
                  categories.map((cat) => (
                    <option value={cat} key={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))
                }
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;