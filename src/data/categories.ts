import { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'cat-sneakers',
    name: 'Sneakers',
    slug: 'sneakers',
    description: 'Streetwear grails, low-tops & high-tops from Nike, Jordan, Adidas & New Balance.',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
    itemCount: 48,
    tagline: 'Authentic Streetwear & Hype'
  },
  {
    id: 'cat-running',
    name: 'Running Shoes',
    slug: 'running-shoes',
    description: 'Marathon-grade cushioning & stability trainers from Ultraboost, Asics & Pegasus.',
    image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=800&q=80',
    itemCount: 36,
    tagline: 'Engineered For Distance'
  },
  {
    id: 'cat-casual',
    name: 'Casual Shoes',
    slug: 'casual-shoes',
    description: 'Timeless minimal silhouettes like Sambas, Club Cs, and low-profile leather classics.',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
    itemCount: 29,
    tagline: 'Effortless Daily Wear'
  },
  {
    id: 'cat-sports',
    name: 'Sports Shoes',
    slug: 'sports-shoes',
    description: 'Specialized court, turf, and gym trainers with reinforced support.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    itemCount: 22,
    tagline: 'High Performance Court'
  },
  {
    id: 'cat-boots',
    name: 'Boots',
    slug: 'boots',
    description: 'Rugged waterproof leather boots, outdoor trail stompers & winter stompers.',
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=80',
    itemCount: 16,
    tagline: 'Rugged & Weather-Proof'
  },
  {
    id: 'cat-branded',
    name: 'Branded Collection',
    slug: 'branded-collection',
    description: 'Rare archive vintage grails, Made in USA/UK editions, and limited drops.',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
    itemCount: 19,
    tagline: '1-of-1 Vault Archive'
  }
];

export const brands = [
  { id: 'nike', name: 'Nike', count: 52, tag: 'Just Do It' },
  { id: 'adidas', name: 'Adidas', count: 44, tag: 'Originals & Performance' },
  { id: 'new-balance', name: 'New Balance', count: 38, tag: 'Boston Heritage' },
  { id: 'puma', name: 'Puma', count: 26, tag: 'Forever Faster' },
  { id: 'asics', name: 'Asics', count: 21, tag: 'Sound Mind Sound Body' },
  { id: 'salomon', name: 'Salomon', count: 15, tag: 'Alpine Trail' },
  { id: 'reebok', name: 'Reebok', count: 18, tag: 'Classic Heritage' },
  { id: 'skechers', name: 'Skechers', count: 14, tag: 'Comfort Technology' },
  { id: 'timberland', name: 'Timberland', count: 12, tag: 'Crafted For Outdoors' }
];
