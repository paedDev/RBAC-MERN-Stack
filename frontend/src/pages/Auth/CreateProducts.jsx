import React from 'react';
import { Package, FileText, DollarSign, Tag, Image, PackageCheck } from "lucide-react";
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axiosConfig';
import toast from 'react-hot-toast';
import { BASE_URL } from '../../config/config';
const CreateProducts = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });
  const { loading, setLoading, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { name, description, stock, image, price, category } = formData;
      const response = await axiosInstance.post(`${BASE_URL}/api/product`, {
        name, description, stock, image, price, category
      });
      navigate("/admin/dashboard");
      console.log(response);
      toast.success("Product created Successfully");


    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create product");
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
              <DollarSign />
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
            <select type="text" className='border rounded p-2 w-full' name='category' id='category' required
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
          <button type='submit' className='px-4 py-2 bg-green-400 text-white text-md rounded-lg'>
            Submit
          </button>
          <Link to={'/products'}>
            <button type='button' className='px-4 py-2 bg-gray-400 text-white text-md rounded-lg'>Cancel</button>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default CreateProducts;
