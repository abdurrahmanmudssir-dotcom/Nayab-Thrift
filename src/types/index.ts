export interface ProductCondition {
  score: number;
  label: string;
  details: string;
  upperCondition: string;
  soleWear: string;
  insoleStatus: string;
  boxIncluded: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: 'Sneakers' | 'Running Shoes' | 'Casual Shoes' | 'Sports Shoes' | 'Boots' | 'Branded Collection';
  gender: 'Men' | 'Women' | 'Unisex';
  condition: ProductCondition;
  sizeEU: number;
  sizeUK: number;
  sizeUS: number;
  sizeCM: number;
  originalPrice: number;
  thriftPrice: number;
  discountPercent: number;
  images: string[];
  description: string;
  origin: string;
  sku: string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  inStock: boolean;
  stockCount: number;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
  tagline: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  shoeName: string;
  comment: string;
  avatar: string;
  verifiedPurchase: boolean;
}

export interface InstagramPost {
  id: string;
  username: string;
  image: string;
  likes: number;
  shoeId: string;
  shoeName: string;
  shoePrice: number;
  caption: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: number;
}
