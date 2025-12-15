import { Product, TryOnStatus } from '../types/product';

// ==============================
// GARMENT CLASSIFICATION DATABASE
// ==============================

const UPPER_GARMENTS = new Set([
  // Men
  'T-Shirt', 'Polo Shirt', 'Casual Shirt', 'Formal Shirt', 'Hoodie', 
  'Sweatshirt', 'Jacket', 'Blazer', 'Coat', 'Kurta', 'Panjabi', 'Waistcoat',
  // Women
  'Top', 'Blouse', 'Shirt', 'Tunic', 'Kurti', 'Sweater', 'Cardigan', 'Shrug', 'Crop Top'
]);

const LOWER_GARMENTS = new Set([
  // Men
  'Jeans', 'Chinos', 'Trousers', 'Formal Pants', 'Shorts', 'Joggers', 'Pajama',
  // Women
  'Pants', 'Leggings', 'Palazzos', 'Skirt', 'Sharara Bottom', 'Gharara Bottom'
]);

const FULL_BODY_GARMENTS = new Set([
  // Women
  'Saree', 'Lehenga', 'Gown', 'Maxi Dress', 'Anarkali', 'Abaya', 'Burqa', 'Salwar Kameez',
  // Men
  'Sherwani', 'Thobe', 'Jubba', 'Suit', 'Panjabi + Pajama'
]);

const ACCESSORIES = new Set([
  'Glasses', 'Sunglasses', 'Mask', 'Earrings', 'Watch', 'Bracelet', 'Ring', 'Bangle'
]);

const INNERWEAR = new Set([
  // Men
  'Vest', 'Briefs', 'Boxers',
  // Women
  'Bra', 'Panty', 'Lingerie'
]);

// ==============================
// LOGIC ENGINE
// ==============================

export function getTryOnStatus(product: Product): TryOnStatus {
  const { garment_category, garment_type } = product;

  // 1. INNERWEAR (STRICTLY DISABLED)
  // Rule: Backend enforcement - Reject any try-on request
  if (garment_category === 'Innerwear' || INNERWEAR.has(garment_type)) {
    return {
      supported: false,
      mode: 'none',
      message: "Virtual Try-On is strictly disabled for this category.",
      reason: "Restricted category"
    };
  }

  // 2. LOWER GARMENTS (PARTIAL SUPPORT / DISABLED)
  // Rule: AI Try-On is available for upper garments only
  if (garment_category === 'Lower' || LOWER_GARMENTS.has(garment_type)) {
    return {
      supported: false,
      mode: 'none',
      message: "AI Try-On is available for upper garments only.",
      reason: "Partial support"
    };
  }

  // 3. UPPER GARMENTS (AI SUPPORTED - IDM-VTON)
  if (garment_category === 'Upper' || UPPER_GARMENTS.has(garment_type)) {
    return {
      supported: true,
      mode: 'diffusion',
      buttonText: "AI Try-On Preview",
      message: "Upload a front-facing photo for best results."
    };
  }

  // 4. ACCESSORIES (AR / LANDMARK BASED)
  if (garment_category === 'Accessory' || ACCESSORIES.has(garment_type)) {
    return {
      supported: true,
      mode: 'ar',
      buttonText: "Live AR Preview",
      message: "Use your camera to see how this looks on you."
    };
  }

  // 5. FULL BODY (NOT SUPPORTED)
  if (garment_category === 'FullBody' || FULL_BODY_GARMENTS.has(garment_type)) {
    return {
      supported: false,
      mode: 'none',
      message: "AI Try-On not supported for this item.",
      reason: "Complexity"
    };
  }

  // Default Fallback
  return {
    supported: false,
    mode: 'none',
    message: "Virtual Try-On is not available for this item."
  };
}
