export interface ColorOption {
  name: string;
  hexCode: string;
  imageUrl: string;
}

export interface StorageOption {
  capacity: string;
  price: number;
}

export interface Specs {
  screen: string;
  resolution: string;
  processor: string;
  mainCamera: string;
  selfieCamera: string;
  battery: string;
  os: string;
  screenRefreshRate: string;
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  description: string;
  basePrice: number;
  specs: Specs;
  colorOptions: ColorOption[];
  storageOptions: StorageOption[];
  similarProducts: SimilarProduct[];
}

export interface SimilarProduct {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

export interface ListProduct {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imgUrl: string;
}

export interface CartItem {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  colorName: string;
  capacity: string;
  price: number;
  quantity: number;
}
