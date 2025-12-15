export type Gender = 'Men' | 'Women' | 'Unisex';

export type GarmentCategory = 
  | 'Upper' 
  | 'Lower' 
  | 'FullBody' 
  | 'Accessory' 
  | 'Innerwear' 
  | 'Footwear';

export type FitType = 'Slim' | 'Regular' | 'Loose' | 'Oversized';

export interface Product {
  id: number;
  title: string;
  vendor: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  category: string; // Display category (e.g., "Summer Collection")
  description: string;
  
  // Logic Fields
  gender: Gender;
  garment_category: GarmentCategory;
  garment_type: string; // Specific type (e.g., "T-Shirt", "Saree")
  
  // Specific for Lower Garments
  fit?: FitType;
}

export interface TryOnStatus {
  supported: boolean;
  mode: 'diffusion' | 'ar' | 'none';
  message?: string;
  buttonText?: string;
  reason?: string; // For backend/logging
}
