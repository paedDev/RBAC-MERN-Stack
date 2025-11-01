import React, { useEffect, useState } from 'react';
import axiosInstance from '../config/axiosConfig.js';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { BASE_URL } from '../config/config';
import Skeleton from 'react-loading-skeleton';
import { ArrowLeft, MoveLeft, Package, ShoppingCart, Tag } from 'lucide-react';
const ViewProduct = () => {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const { user, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const { id } = useParams();
  const fetchProductById = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(`${BASE_URL}/api/product/${id}`);
      setProduct(response.data.data);
    } catch (error) {
      if (error.response.data.message)
        return toast.error(error?.response?.data?.message || 'Failed to get product');
      console.log(error, `Failed to fetch the product by id`);

    } finally {
      setLoading(false);
    }

  };
  useEffect(() => {
    fetchProductById();
  }, [id]);

  if (loading) {

  }
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock < 10;
  return (
    <section className='min-h-screen p-6 '>
      <button
        onClick={() => navigate('/products')}
        className='flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors'
      >
        <ArrowLeft className='w-5 h-5' />
        <span>Back to Products</span>
      </button>
      <div className='max-w-6xl mx-auto bg-gray-100 shadow-xl p-6 rounded-xl '>
        {/* Left Side Image */}
        <div className='lg:grid-cols-2 grid gap-8'>
          <div className='relative'>
            <img src={product.image} alt={product.name}
              className='rounded-xl shadow-xl object-cover w-full h-auto' />

            {
              isOutOfStock && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  Out of Stock
                </div>)
            }
            {
              isLowStock && (
                <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  Low Stock
                </div>
              )
            }
          </div>

          {/* Product Details */}
          <div className=' flex flex-col justify-around '>
            <div className='space-y-10'>
              <button className='bg-blue-200 rounded-lg px-2 py1 text-blue-700 flex items-center gap-1.5'>
                <Tag size={18} />
                {product.category?.charAt(0).toUpperCase() + product.category?.slice(1)}

              </button>
              <h1 className='mb-4 text-3xl font-bold'>{product.name}</h1>
              <p className='text-2xl font-semibold text-blue-600 mb-4'>
                ₱{Number(product.price).toLocaleString('en-PH', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </p>
              <p className='text-gray-600 mb-4'>{product.description}</p>
              <p className='text-sm text-gray-500 flex items-center '>
                <Package className='mr-1' />
                Stock: {product.stock}</p>
              <p className='text-sm text-gray-500'>Category: {product.category}</p>
            </div>

            <div className='flex items-center w-full  '>
              <input type="number"
                placeholder='Quantity' />

              <div className='flex-1 bg-red-200 px-2 py-2 rounded'>
                <button className='flex space-x-2 items-center justify-center'>
                  <ShoppingCart />
                  <span> Add to Cart</span>
                </button>
              </div>

            </div>
            {isLowStock && !isOutOfStock && (
              <p className='text-sm text-orange-600 text-center'>
                Hurry! Only {product.stock} left in stock
              </p>
            )}
          </div>



        </div>
      </div>
    </section>
  );
};

export default ViewProduct;