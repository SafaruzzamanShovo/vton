import React from 'react';
import VirtualTryOn from '../components/VirtualTryOn';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TryOnPage() {
  // Default demo image if none provided
  const demoProductImage = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 flex items-center gap-4">
          <Link to="/" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors text-gray-600">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Virtual Try-On Studio</h1>
            <p className="text-gray-500 text-sm">Upload your photo and see how it fits.</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
           <VirtualTryOn productImage={demoProductImage} forceOpen={true} />
        </div>
      </div>
    </div>
  );
}
