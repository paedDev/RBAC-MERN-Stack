import React from 'react';
import { Package } from "lucide-react";
const CreateProducts = () => {
  return (
    <section className=' min-h-screen flex items-center flex-col py-4  '>
      <div className='space-y-4 flex items-center flex-col'>
        <Package size={50} />
        <h2 className='lg:text-3xl text-2xl font-bold'>Create Product</h2>
        <p className='text-gray-600'>Add a new product to your inventory </p>
      </div>
      <form action="" className='h-full border w-5xl mx-auto mt-4 rounded-xl shadow-xl border-gray-200 p-10  space-y-4'>

        <div className='flex flex-col space-y-2'>
          <div className='flex space-x-2'>
            <Package />
            <label htmlFor="name">Product Name</label>
          </div>
          <input type="text" className='border rounded p-2' name='name'
            id='name' />
        </div>


        <div className='flex flex-col space-y-2'>
          <div className='flex space-x-2'>
            <Package />
            <label htmlFor="description">Description</label>
          </div>
          <textarea type="text" className='border rounded p-2 min-h-30' name='description'
            id='description' />
        </div>

      </form>


    </section>
  );
};

export default CreateProducts;