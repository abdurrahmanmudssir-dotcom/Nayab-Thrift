import { Suspense } from 'react';
import ShopClient from './ShopClient';

export const metadata = {
  title: 'Shop All 1-of-1 Thrift Shoes | Nayab Thrift Pakistan',
  description: 'Filter through our curated collection of verified thrifted sneakers, running shoes, and boots. Sorted by brand, size, condition, and price.',
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm font-bold text-[#010101]">Loading Nayab Thrift Drops...</div>}>
      <ShopClient />
    </Suspense>
  );
}
