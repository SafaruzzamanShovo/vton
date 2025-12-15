import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Truck, ShieldCheck, RefreshCcw, MapPin, Minus, Plus, Heart, Share2, ArrowLeft, Info, Video, Ruler, UserCheck } from 'lucide-react';
import VirtualTryOn from './VirtualTryOn';
import { products } from '../data/products';
import { getTryOnStatus } from '../utils/garmentRules';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <Link to="/" className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700">
          Back to Home
        </Link>
      </div>
    );
  }

  // Get Logic Status
  const tryOnStatus = getTryOnStatus(product);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-orange-600 flex items-center gap-1"><ArrowLeft size={14} /> Back</Link> 
        <span>/</span> 
        <span>{product.gender}</span>
        <span>/</span> 
        <span>{product.category}</span> 
        <span>/</span> 
        <span className="text-gray-800 font-medium truncate">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Images */}
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

        {/* Middle Column: Details */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2 mb-1">
             <span className="text-xs font-bold text-orange-600 uppercase tracking-wide">{product.vendor}</span>
             <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{product.garment_type}</span>
          </div>
          
          <h1 className="text-2xl font-medium text-gray-800 leading-tight mb-2">{product.title}</h1>
          
          <div className="flex items-center gap-4 mb-4 text-sm">
            <div className="flex items-center text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "" : "text-gray-300"} />
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
              <span className="text-gray-800 font-medium">-{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%</span>
            </div>
          </div>

          {/* LOWER GARMENT SPECIFIC: Fit & Size Info */}
          {product.garment_category === 'Lower' && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Ruler size={16} className="text-gray-500" />
                Fit & Sizing
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 block text-xs uppercase">Fit Type</span>
                  <span className="font-medium text-gray-900">{product.fit || 'Regular Fit'}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-xs uppercase">Size Guide</span>
                  <button className="text-blue-600 hover:underline font-medium">View Chart</button>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500 flex items-center gap-1">
                <UserCheck size={14} />
                Model is 6'1" wearing size M
              </div>
            </div>
          )}

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

          {/* ======================================================= */}
          {/* DYNAMIC VIRTUAL TRY-ON SECTION */}
          {/* ======================================================= */}
          <div className="border-t border-gray-200 pt-6">
            
            {/* Case 1: AI Supported (Upper Body) */}
            {tryOnStatus.supported && tryOnStatus.mode === 'diffusion' && (
              <VirtualTryOn productImage={product.image} />
            )}

            {/* Case 2: AR Supported (Accessories) */}
            {tryOnStatus.supported && tryOnStatus.mode === 'ar' && (
              <div className="mt-6 p-6 bg-gray-900 rounded-xl text-center text-white relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-20 group-hover:opacity-30 transition-opacity"></div>
                 <Video size={32} className="mx-auto mb-3 text-purple-400" />
                 <h3 className="text-lg font-bold mb-1">Live AR Preview</h3>
                 <p className="text-sm text-gray-300 mb-4">{tryOnStatus.message}</p>
                 <button className="relative z-10 bg-white text-gray-900 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition-colors">
                   {tryOnStatus.buttonText}
                 </button>
                 <p className="text-[10px] text-gray-500 mt-2">*Requires camera access</p>
              </div>
            )}

            {/* Case 3: Not Supported / Restricted */}
            {!tryOnStatus.supported && (
              <div className={`mt-6 p-4 border rounded-lg flex items-start gap-3 ${
                product.garment_category === 'Innerwear' 
                  ? 'bg-red-50 border-red-100' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <Info size={20} className={`mt-0.5 shrink-0 ${
                  product.garment_category === 'Innerwear' ? 'text-red-400' : 'text-gray-400'
                }`} />
                <div>
                  <h4 className={`text-sm font-semibold ${
                    product.garment_category === 'Innerwear' ? 'text-red-800' : 'text-gray-700'
                  }`}>
                    Virtual Try-On Unavailable
                  </h4>
                  <p className={`text-xs mt-1 ${
                    product.garment_category === 'Innerwear' ? 'text-red-600' : 'text-gray-500'
                  }`}>
                    {tryOnStatus.message}
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Delivery & Service */}
        <div className="lg:col-span-3">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm">
            <div className="mb-4">
              <span className="text-gray-500 text-xs uppercase font-semibold tracking-wide block mb-2">Delivery</span>
              <div className="flex items-start gap-3 mb-3">
                <MapPin size={18} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-800 font-medium">New York, NY 10012</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck size={18} className="text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-800 font-medium">Standard Delivery</p>
                  <p className="text-gray-500 text-xs">3 - 5 Days</p>
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
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
