import React from 'react';
import { Star, Truck, ShieldCheck, RefreshCcw, MapPin, Minus, Plus, Heart, Share2 } from 'lucide-react';
import VirtualTryOn from './VirtualTryOn';

export default function ProductDetail() {
  // Mock Product Data
  const product = {
    id: 1,
    title: "Premium Cotton Oversized T-Shirt - Urban Streetwear Collection",
    price: 24.99,
    originalPrice: 45.00,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
    colors: ["Black", "White", "Navy"],
    sizes: ["S", "M", "L", "XL"],
    description: "Elevate your casual wardrobe with our Premium Cotton Oversized T-Shirt. Crafted from 100% organic cotton, this tee offers breathable comfort and a relaxed fit perfect for everyday wear."
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6 flex gap-2">
        <span>Home</span> / <span>Men's Fashion</span> / <span>T-Shirts</span> / <span className="text-gray-800 font-medium truncate">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Images (4 cols) */}
        <div className="lg:col-span-4">
          <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 mb-4">
            <img src={product.image} alt={product.title} className="w-full h-auto object-cover aspect-[3/4]" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`rounded-md overflow-hidden border cursor-pointer ${i === 0 ? 'border-[#f85606]' : 'border-gray-200 hover:border-gray-400'}`}>
                <img src={product.image} alt="Thumbnail" className="w-full h-full object-cover aspect-square opacity-90 hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Middle Column: Details (5 cols) */}
        <div className="lg:col-span-5">
          <h1 className="text-2xl font-medium text-gray-800 leading-tight mb-2">{product.title}</h1>
          
          <div className="flex items-center gap-4 mb-4 text-sm">
            <div className="flex items-center text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < 4 ? "currentColor" : "none"} className={i < 4 ? "" : "text-gray-300"} />
              ))}
              <span className="text-blue-600 ml-2 hover:underline cursor-pointer">{product.reviews} Ratings</span>
            </div>
            <span className="text-gray-300">|</span>
            <span className="text-blue-600 hover:underline cursor-pointer">1.2k Sold</span>
          </div>

          <div className="border-t border-b border-gray-100 py-4 mb-6">
            <div className="text-[#f85606] text-3xl font-medium mb-1">${product.price}</div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
              <span className="text-gray-800 font-medium">-44%</span>
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <span className="text-gray-500 text-sm mb-2 block">Color Family</span>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button key={color} className="px-3 py-1 border border-gray-200 rounded hover:border-[#f85606] text-sm focus:border-[#f85606] focus:ring-1 focus:ring-[#f85606]">
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <span className="text-gray-500 text-sm mb-2 block">Size</span>
            <div className="flex gap-3">
              {product.sizes.map((size) => (
                <button key={size} className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded hover:border-[#f85606] text-sm focus:border-[#f85606] focus:bg-orange-50">
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Actions */}
          <div className="flex items-center gap-4 mb-8">
             <div className="flex items-center border border-gray-300 rounded">
                <button className="p-2 hover:bg-gray-100 text-gray-500"><Minus size={16} /></button>
                <span className="px-4 font-medium text-gray-700">1</span>
                <button className="p-2 hover:bg-gray-100 text-gray-500"><Plus size={16} /></button>
             </div>
             <button className="flex-1 bg-[#2db2ff] hover:bg-blue-500 text-white font-medium py-2.5 rounded shadow-sm transition-colors">
               Buy Now
             </button>
             <button className="flex-1 bg-[#f85606] hover:bg-orange-600 text-white font-medium py-2.5 rounded shadow-sm transition-colors">
               Add to Cart
             </button>
          </div>

          {/* Virtual Try-On Integration */}
          <div className="border-t border-gray-200 pt-6">
            <VirtualTryOn productImage={product.image} />
          </div>

        </div>

        {/* Right Column: Delivery & Service (3 cols) */}
        <div className="lg:col-span-3">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm">
            <div className="mb-4">
              <span className="text-gray-500 text-xs uppercase font-semibold tracking-wide block mb-2">Delivery</span>
              <div className="flex items-start gap-3 mb-3">
                <MapPin size={18} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-800 font-medium">New York, NY 10012</p>
                  <p className="text-blue-600 text-xs cursor-pointer">CHANGE</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck size={18} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-800 font-medium">Standard Delivery</p>
                  <p className="text-gray-500 text-xs">3 - 5 Days</p>
                  <p className="text-gray-800 font-medium mt-1">$2.00</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            <div className="mb-4">
              <span className="text-gray-500 text-xs uppercase font-semibold tracking-wide block mb-2">Service</span>
              <div className="flex items-start gap-3 mb-3">
                <ShieldCheck size={18} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-800 font-medium">100% Authentic</p>
                </div>
              </div>
              <div className="flex items-start gap-3 mb-3">
                <RefreshCcw size={18} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-800 font-medium">14 Days Returns</p>
                  <p className="text-gray-500 text-xs">Change of mind is not applicable</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
               <button className="flex-1 flex items-center justify-center gap-2 text-gray-600 bg-white border border-gray-300 py-1.5 rounded hover:bg-gray-50 text-xs">
                 <Heart size={14} /> Wishlist
               </button>
               <button className="flex-1 flex items-center justify-center gap-2 text-gray-600 bg-white border border-gray-300 py-1.5 rounded hover:bg-gray-50 text-xs">
                 <Share2 size={14} /> Share
               </button>
            </div>
          </div>
        </div>

      </div>
      
      {/* Product Description Section */}
      <div className="mt-12 bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Product Details</h2>
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
        <ul className="list-disc list-inside mt-4 text-gray-600 space-y-1">
           <li>Material: 100% Organic Cotton</li>
           <li>Fit: Oversized / Relaxed</li>
           <li>Care: Machine wash cold, tumble dry low</li>
           <li>Origin: Made in Portugal</li>
        </ul>
      </div>
    </div>
  );
}
