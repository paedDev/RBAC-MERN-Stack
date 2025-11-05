import React from "react";
import Navbar from "./Navbar";
import { ArrowRight, Flower2, Sparkles } from 'lucide-react';
const Home = () => {
  return (
    <section className="min-h-[200vh] w-full relative overflow-hidden bg-transparent  lg:p-6 z-10 ">
      <Navbar />

      <div className="lg:mt-20 mt-24 h-full w-full p-6 flex items-center justify-between">
        {/* Left Container */}
        <div className="space-y-6">
          <div className="inline-flex items-center space-x-2 bg-blue-400 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-300">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-medium text-white">New Collection 2025</span>
          </div>

          <div className="text-5xl lg:text-7xl font-bold space-y-2 leading-tight">
            <h2 className="">Discover Your</h2>
            <span className=" block bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-200 bg-clip-text text-transparent">Perfect Style</span>
          </div>

          <p className="text-sm lg:text-lg text-blue-300 leading-relaxed max-w-xl">
            Experience the future of online shopping with our curated collection
            of premium products. From electronics to fashion, we bring quality
            right to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 flex items-center justify-center space-x-2">
              <span>Shop Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="bg-red-100 backdrop-blur-sm hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 border-2 border-white/30 hover:border-white/50 hover:scale-105">
              Explore Collections
            </button>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-8">
            <div>
              <h3 className="text-3xl font-bold text-yellow-300">500+</h3>
              <p className="text-blue-200 text-sm">Products</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-yellow-300">50K+</h3>
              <p className="text-blue-200 text-sm">Happy Customers</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-yellow-300">4.9★</h3>
              <p className="text-blue-200 text-sm">Rating</p>
            </div>
          </div>
        </div>
        {/* 3d Container */}
        <div>

        </div>
      </div>
    </section>
  );
};

export default Home;
