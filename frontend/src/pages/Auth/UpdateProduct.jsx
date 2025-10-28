import React, { useEffect } from 'react';
import { Package, FileText, DollarSign, Tag, Image, PackageCheck, PhilippinePeso, Loader2 } from "lucide-react";
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../config/axiosConfig';
import toast from 'react-hot-toast';
import { BASE_URL } from '../../config/config';
const UpdateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });
  const [initialLoading, setInitialLoading] = useState(true);
  const { loading, setLoading, user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setInitialLoading(true);
        const response = await axiosInstance.get(`${BASE_URL}/api/product/${id}`);
        const product = response.data.data || response.data.product;
        setFormData({
          name: product.name || "",
          description: product.description || "",
          price: product.price || "",
          category: product.category || "",
          image: product.image || "",
          stock: product.stock || "",
        });
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to fetch product");
        navigate("/products");
      } finally {
        setInitialLoading(false);

      }
    };
    if (id) {
      fetchProduct();
    }
  }, [id, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { name, description, stock, image, price, category } = formData;
      const response = await axiosInstance.put(`${BASE_URL}/api/product/${id}`, {
        name, description, stock: Number(stock), image, price: Number(price), category
      });
      toast.success("Product updated successfully");
      navigate("/products");
      console.log(response);



    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };


  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  console.log(formData);

  if (user?.role !== 'admin') {
    return <Navigate to="/*" replace />;
  }

  const options = [
    { name: 'electronics' },
    { name: 'clothing' },
    { name: 'food' },
    { name: 'books' },
    { name: 'toys' },
    { name: 'sports' },
    { name: 'other' }
  ];

  if (initialLoading) {
    return (
      <section className='min-h-screen flex items-center justify-center'>
        <div className='flex flex-col items-center space-y-4'>
          <Loader2 className='animate-spin' size={40} />
          <p className='text-gray-600'>Loading product details...</p>
        </div>
      </section>
    );
  }
  return (
    <section className='min-h-screen items-center py-4'>
      <div className='space-y-4 flex flex-col items-center'>
        <div className='flex items-center space-x-2'>
          <Package size={40} />
          <h2 className='lg:text-3xl text-2xl font-bold'>Create Product</h2>
        </div>
        <p className='text-gray-600 text-xs'>Add a new product to your inventory</p>
      </div>

      <form action="" onSubmit={handleSubmit} className='h-full border max-w-3xl w-full mx-auto mt-4 rounded-xl shadow-xl border-gray-200 p-10 space-y-4'>
        {/* Name of Product */}
        <div className='flex flex-col space-y-2'>
          <div className='flex space-x-2'>
            <Package />
            <label htmlFor="name">Product Name</label>
          </div>
          <input type="text" className='border rounded p-2' name='name' id='name' required
            onChange={handleChangeValue}
            value={formData.name} />
        </div>

        {/* Description of product */}
        <div className='flex flex-col space-y-2'>
          <div className='flex space-x-2'>
            <FileText />
            <label htmlFor="description">Description</label>
          </div>
          <textarea type="text" className='border rounded p-2 min-h-30 max-h-40' name='description' id='description' required
            onChange={handleChangeValue}
            value={formData.description}
          />
        </div>

        {/* Price and Category */}
        <div className='lg:flex lg:flex-row flex-col lg:space-y-0 space-y-2 justify-around lg:space-x-4'>
          <div className='lg:w-full space-y-2'>
            <div className='flex space-x-2'>
              <PhilippinePeso />
              <label htmlFor="price">Price</label>
            </div>
            <input type="number" className='border rounded p-2 w-full' name='price' id='price' required
              onChange={handleChangeValue}
              value={formData.price} />
          </div>
          <div className='lg:w-full space-y-2'>
            <div className='flex space-x-2'>
              <Tag />
              <label htmlFor="category">Category</label>
            </div>
            <select className='border rounded p-2 w-full' name='category' id='category' required
              onChange={handleChangeValue}
              value={formData.category}>
              <option value="" disabled>
                Select a category
              </option>
              {
                options.map((opt) => (
                  <option key={opt.name} value={opt.name}>
                    {opt.name.charAt(0).toUpperCase() + opt.name.slice(1)}
                  </option>
                ))
              }
            </select>
          </div>
        </div>

        {/* Image */}
        <div className='flex flex-col space-y-2'>
          <div className='flex space-x-2'>
            <Image />
            <label htmlFor="image">Image URL</label>
          </div>
          <input type="text" className='border rounded p-2' name='image' id='image' required
            onChange={handleChangeValue}
            value={formData.image} />
        </div>

        {/* Stock */}
        <div className='flex flex-col space-y-2'>
          <div className='flex space-x-2'>
            <PackageCheck />
            <label htmlFor="stock">Stock</label>
          </div>
          <input type="number" className='border rounded p-2 w-full' name='stock' id='stock' required
            onChange={handleChangeValue}
            value={formData.stock} />
        </div>

        <div className='flex justify-end space-x-2 items-center'>
          <button type='submit' className='px-4 py-2 bg-green-400 text-white text-md rounded-lg' disabled={loading}>
            {loading ? 'Updating...' : 'Update Product'}
          </button>
          <Link to={'/products'}>
            <button disabled={loading}
              type='button' className='px-4 py-2 bg-gray-400 text-white text-md rounded-lg'>Cancel</button>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default UpdateProduct;
