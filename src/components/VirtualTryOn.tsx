import React, { useState, useRef } from 'react';
import { Upload, Sparkles, X, RefreshCw, Camera, Shirt, User } from 'lucide-react';
import { getApiUrl } from '../config'; // Import the config helper

interface VirtualTryOnProps {
  productImage: string;
  forceOpen?: boolean;
}

export default function VirtualTryOn({ productImage, forceOpen = false }: VirtualTryOnProps) {
  const [isOpen, setIsOpen] = useState(forceOpen);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [userImageFile, setUserImageFile] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAI, setShowAI] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUserImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result as string);
        setResultImage(null);
        setShowAI(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTryOn = async () => {
    if (!userImageFile) return;

    setIsLoading(true);
    setShowAI(true);

    try {
      const formData = new FormData();
      formData.append('person_image', userImageFile);
      
      const response = await fetch(productImage);
      const blob = await response.blob();
      formData.append('cloth_image', blob, 'product.jpg');

      // USE THE CONFIG HELPER HERE
      const apiUrl = getApiUrl('/api/try-on');
      
      const apiResponse = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (!apiResponse.ok) throw new Error('API Failed');

      const data = await apiResponse.json();
      
      // If the backend returns a relative path (e.g., /static/...), prepend the base URL
      let finalImageUrl = data.output_image_url;
      if (finalImageUrl.startsWith('/')) {
         finalImageUrl = getApiUrl(finalImageUrl);
      }

      setResultImage(finalImageUrl);
      setIsLoading(false);
      
    } catch (error) {
      console.warn("Backend unavailable, using demo fallback.");
      setTimeout(() => {
        setResultImage("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop");
        setIsLoading(false);
      }, 1500);
    }
  };

  const reset = () => {
    setUserImage(null);
    setUserImageFile(null);
    setResultImage(null);
    setShowAI(true);
  };

  return (
    <div className={forceOpen ? "" : "mt-6"}>
      {!forceOpen && (
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
        >
          <Sparkles size={20} />
          {isOpen ? 'Close Virtual Try-On' : 'Try It On Virtually'}
        </button>
      )}

      {isOpen && (
        <div className={`
          ${forceOpen ? '' : 'mt-4 border-2 border-indigo-100 rounded-xl p-4 bg-indigo-50/50'} 
          animate-in fade-in slide-in-from-top-4 duration-300
        `}>
          {!forceOpen && (
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Camera size={20} className="text-indigo-600"/>
                AI Fitting Room
              </h3>
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">BETA</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center">
              <span className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">1. Selected Item</span>
              <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-md overflow-hidden group">
                <img src={productImage} alt="Product" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute bottom-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm">
                  <Shirt size={16} className="text-gray-700" />
                </div>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center">
              <span className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">2. Your Photo</span>
              <div 
                className={`relative w-full aspect-[3/4] bg-gray-100 rounded-md overflow-hidden flex flex-col items-center justify-center border-2 border-dashed transition-colors ${userImage ? 'border-transparent' : 'border-gray-300 hover:border-indigo-400 cursor-pointer'}`}
                onClick={() => !userImage && fileInputRef.current?.click()}
              >
                {userImage ? (
                  <>
                    <img src={userImage} alt="User" className="w-full h-full object-cover" />
                    <button 
                      onClick={(e) => { e.stopPropagation(); reset(); }}
                      className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full backdrop-blur-sm transition-colors z-10"
                    >
                      <X size={16} />
                    </button>
                    <div className="absolute bottom-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm">
                      <User size={16} className="text-gray-700" />
                    </div>
                  </>
                ) : (
                  <div className="text-center p-4">
                    <div className="bg-indigo-100 p-3 rounded-full inline-flex mb-3 text-indigo-600">
                      <Upload size={24} />
                    </div>
                    <p className="text-sm font-medium text-gray-700">Upload Photo</p>
                    <p className="text-xs text-gray-400 mt-1">Front facing</p>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                />
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center relative overflow-hidden">
              
              <div className="w-full flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">3. Result</span>
                
                <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1 px-2">
                  <span className={`text-[10px] font-bold transition-colors ${!showAI ? 'text-indigo-600' : 'text-gray-400'}`}>MODEL</span>
                  <button 
                    onClick={() => setShowAI(!showAI)}
                    className={`relative w-8 h-4 rounded-full transition-colors duration-200 focus:outline-none ${showAI ? 'bg-indigo-600' : 'bg-gray-300'}`}
                    title={showAI ? "Showing AI Preview" : "Showing Original Model"}
                  >
                    <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-transform duration-200 ${showAI ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                  <span className={`text-[10px] font-bold transition-colors ${showAI ? 'text-indigo-600' : 'text-gray-400'}`}>AI ME</span>
                </div>
              </div>
              
              <div className="relative w-full aspect-[3/4] bg-gray-900 rounded-md overflow-hidden flex items-center justify-center">
                
                {!showAI ? (
                  <>
                    <img src={productImage} alt="Original Model" className="w-full h-full object-cover animate-in fade-in duration-300" />
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">
                      Original Model
                    </div>
                  </>
                ) : (
                  <>
                    {isLoading ? (
                      <div className="text-center text-white z-10">
                        <RefreshCw size={32} className="animate-spin mx-auto mb-2 text-indigo-400" />
                        <p className="text-sm font-medium">Generating...</p>
                      </div>
                    ) : resultImage ? (
                      <>
                        <img src={resultImage} alt="Result" className="w-full h-full object-cover animate-in fade-in duration-700" />
                        <div className="absolute bottom-2 left-2 bg-indigo-600/90 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm flex items-center gap-1">
                          <Sparkles size={10} /> AI Preview
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-4 text-gray-500">
                        <Sparkles size={32} className="mx-auto mb-2 opacity-20" />
                        <p className="text-sm">Ready to Try</p>
                      </div>
                    )}

                    {isLoading && (
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent" />
                    )}
                  </>
                )}
              </div>

              <button
                onClick={handleTryOn}
                disabled={!userImage || isLoading}
                className={`mt-3 w-full py-2 px-4 rounded-md font-medium text-sm transition-all ${
                  !userImage || isLoading 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg'
                }`}
              >
                {isLoading ? 'Processing...' : resultImage ? 'Regenerate' : 'Generate Preview'}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
