import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Filter } from 'lucide-react';
import { products } from '../data/products';
import { GarmentCategory } from '../types/product';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<GarmentCategory | 'All'>('All');

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.garment_category === activeCategory);

  const categories: (GarmentCategory | 'All')[] = ['All', 'Upper', 'Lower', 'FullBody', 'Accessory', 'Innerwear'];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 mb-12 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Virtual Try-On Marketplace</h1>
          <p className="text-lg opacity-90 mb-6">Experience the new way to shop. Try on clothes from top vendors instantly using our AI technology.</p>
          <button className="bg-white text-orange-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-md">
            Explore Collection
          </button>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 transform translate-x-12"></div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat 
                ? 'bg-orange-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat === 'All' ? 'All Products' : cat + ' Garments'}
          </button>
        ))}
      </div>

      {/* Filters / Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {activeCategory === 'All' ? 'Featured Products' : `${activeCategory} Collection`}
        </h2>
        <div className="flex gap-2 text-sm text-gray-500">
          <span className="flex items-center gap-1"><Filter size={14}/> {filteredProducts.length} Items</span>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
            
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">
                {product.vendor}
              </div>
              <div className="absolute top-2 right-2 bg-white/90 text-gray-800 text-[10px] font-bold px-2 py-1 rounded border border-gray-200">
                {product.garment_type}
              </div>
              
              {/* Hover Action */}
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center bg-gradient-to-t from-black/50 to-transparent">
                <button className="bg-white text-gray-900 text-sm font-medium px-6 py-2 rounded-full shadow-lg hover:bg-orange-500 hover:text-white transition-colors w-full">
                  View Details
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
              <div className="text-xs text-gray-500 mb-1 flex justify-between">
                 <span>{product.category}</span>
                 <span className={`font-bold ${
                    product.garment_category === 'Upper' ? 'text-green-600' : 
                    product.garment_category === 'Accessory' ? 'text-blue-600' :
                    product.garment_category === 'Innerwear' ? 'text-red-500' : 'text-gray-400'
                 }`}>
                    {product.garment_category === 'Upper' ? 'AI Ready' : 
                     product.garment_category === 'Accessory' ? 'AR Ready' : 
                     product.garment_category === 'Innerwear' ? 'No Try-On' : 'Limited'}
                 </span>
              </div>
              <h3 className="font-medium text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                {product.title}
              </h3>
              
              <div className="mt-auto">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-orange-600">${product.price}</span>
                  <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-yellow-400 fill-current" />
                    <span>{product.rating} ({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-600">
                    <ShoppingCart size={12} />
                    <span>Free Shipping</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
