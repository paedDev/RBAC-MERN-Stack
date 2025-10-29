import React, { useEffect, useState } from 'react';
import { Package, Search, Filter, Plus, Edit, Trash2, AlertCircle, Eye, ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axiosConfig';
import { BASE_URL } from '../config/config';
import toast from 'react-hot-toast';
import { useMediaQuery } from 'react-responsive';
const Products = () => {
  const { loading, setLoading, user } = useAuth();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();
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
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 768 });

  const isAdmin = user?.role === "admin";
  const fetchProducts = async (e) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`${BASE_URL}/api/product/`);
      const productsData = response.data.products || response.data.data || response.data;

      // Ensure it's an array
      if (Array.isArray(productsData)) {
        setProducts(productsData);


      } else {
        console.error('Products data is not an array:', productsData);
        setProducts([]);
        toast.error('Invalid data format received');
      }
      console.log(productsData);
      setError(null);

    } catch (error) {
      setError(error.message);
      console.log(error.response.data);
      toast.error(error.response.data.message || 'Failed to fetch all data');

    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await axiosInstance.delete(`${BASE_URL}/api/product/${id}`);
      setProducts(products.filter(p => p._id !== id));
      toast.success("Product deleted Successfully");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to delete a product");

    }
  };
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product) => {
    toast.success(`${product.name} added to cart`);
  };
  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };
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
                <p className='lg:text-3xl text-lg'>   {isAdmin ? 'Manage Products' : 'Browse Products'}</p>
              </h1>
              <p className='text-gray-500 text-xs'> {isAdmin ? 'Manage your product inventory' : 'Discover amazing products'}</p>
            </div>
            {
              isAdmin && <Link to={'/create-products'}>
                <button className='flex bg-blue-700 rounded-lg px-4 py-2 text-white items-center'>
                  <Plus className="w-5 h-5" />
                  <p className='lg:block hidden'>Add Product</p>
                </button>
              </Link>
            }

          </div>
        </div>

        {/* Filter */}
        <div className='bg-white rounded-lg shadow-sm p-4 mb-6'>
          <div className='flex justify-between items-center space-x-2'>
            {/* Search */}
            <div className='flex-1 relative'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400 w-5 h-5' />
              <input type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Search products...'
                className='w-full pl-10 pr-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
            </div>
            <div className='flex items-center gap-2'>
              <Filter className='w-5 h-5 text-gray-400' />
              <select name="" id="" className=" px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}>
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
      {searchTerm || selectedCategory !== 'all' ? (
        <div className='mb-4 text-sm text-gray-600'>
          Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
        </div>
      ) : null}

      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{products.length === 0 ? "No product available" : "No product found"}</h3>
          <p className="text-gray-600 mb-4">{products.length === 0
            ? (isAdmin ? 'Start by adding your first product' : 'Check back later for new products')
            : 'Try adjusting your search or filters'
          }</p>
          {isAdmin && products.length === 0 && (
            <Link to={'/create-products'}>
              <button className='bg-blue-700 hover:bg-blue-800 rounded-lg px-6 py-3 text-white transition-colors'>
                Add Your First Product
              </button>
            </Link>
          )}
        </div>
      ) :
        (<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto'>
          {
            filteredProducts.map((product) => (
              <div key={product._id} className='bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition'>
                <div className='relative h-48 bg-gray-100'>
                  <img src={product.image} alt={product.name}
                    className='size-full object-cover' />
                  {
                    product.stock === 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        Out of Stock
                      </div>
                    )
                  }
                  {
                    product.stock > 0 && product.stock < 10 && (
                      <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
                        Low Stock
                      </div>
                    )
                  }
                </div>
                <div className='p-4'>
                  <div className='mb-2'>
                    <span className='inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded'>{product.category}</span>
                  </div>
                  <div>
                    <h3 className='font-semibold text-lg text-gray-900 mb-1 truncate'>{product.name}</h3>
                  </div>
                  <div className='flex items-center justify-between mb-3'>
                    <span className='text-md font-bold text-gray-900'>
                      ₱{Number(product.price).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className='text-sm text-gray-500'>
                      Stock: {product.stock}
                    </span>
                  </div>
                </div>
                {/* Actions */}
                <div className=''>
                  {
                    isAdmin ? (
                      <div className='flex gap-2 p-2'>
                        <Link to={`/update-product/${product._id}`} className='flex-1'>
                          <button className='w-full bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors'>
                            {
                              isMobile && <Edit className='w-4 h-4' />

                            }
                            {
                              isDesktop && <div className='flex items-center space-x-2'>
                                <Edit className='w-4 h-4' />
                                <span className='text-xs'>Edit</span>
                              </div>
                            }


                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className='flex-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors'
                        >
                          {
                            isMobile && <Trash2 className='w-4 h-4' />

                          }
                          {
                            isDesktop && <div className='flex items-center space-x-2'>
                              <Trash2 className='w-4 h-4' />
                              <span className='text-xs'>Delete</span>
                            </div>
                          }


                        </button>
                      </div>
                    ) : (
                      <div className='flex gap-2 p-2'>

                        <button onClick={() => handleAddToCart(product)}
                          className='w-full bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors flex-1'>
                          <ShoppingCart className='w-4 h-4' />

                        </button>

                        <button
                          onClick={() => handleViewDetails(product._id)}
                          className='flex-1 bg-green-50 hover:bg-green-100 text-green-600 px-3  rounded-lg flex items-center justify-center gap-2 transition-colors'
                        >

                          {
                            isMobile && <Eye className='size-4'></Eye>

                          }
                          {
                            isDesktop && <div className='flex items-center space-x-2'>

                              <Eye className='size-4'></Eye>
                              <span className='text-xs'>View</span>
                            </div>
                          }
                        </button>
                      </div>
                    )
                  }

                </div>

              </div>
            ))
          }
        </div>)}
    </section>
  );
};

export default Products;