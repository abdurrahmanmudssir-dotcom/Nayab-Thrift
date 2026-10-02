'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { ProductCard } from '@/components/product/ProductCard';
import {
  Heart,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  MessageCircle,
  Ruler,
  Clock,
  ArrowRight,
  Check
} from 'lucide-react';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Lahore');
  const [isAdded, setIsAdded] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  if (!product) {
    return notFound();
  }

  const isLiked = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    showToast(`Added "${product.name}" to cart!`, 'success');
    setTimeout(() => setIsAdded(false), 2000);
  };

  const formatPKR = (amount: number) => 'Rs. ' + amount.toLocaleString('en-PK');

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.brand === product.brand || p.category === product.category))
    .slice(0, 4);

  const whatsappMessage = encodeURIComponent(
    `Assalam o Alaikum Nayab Thrift! I want to order this 1-of-1 thrifted pair:\n\n*Product:* ${product.name}\n*SKU:* ${product.sku}\n*Size:* EU ${product.sizeEU} / UK ${product.sizeUK}\n*Condition:* ${product.condition.score}/10 (${product.condition.label})\n*Thrift Price:* ${formatPKR(product.thriftPrice)}\n*City:* ${selectedCity}\n\nPlease confirm availability for Cash on Delivery.`
  );

  return (
    <div className="bg-[#F1EDE5] min-h-screen py-8 sm:py-12 border-b border-[#DCD4C5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center gap-2 text-xs text-[#666666] font-medium mb-8">
          <Link href="/" className="hover:text-[#010101]">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#010101]">Shop</Link>
          <span>/</span>
          <span className="text-[#010101] font-bold truncate">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-white border border-neutral-200 flex items-center justify-center p-4">
              <Image
                src={product.images[activeImgIdx] || product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-contain p-2"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="px-3 py-1 rounded-full bg-[#010101] text-white text-xs font-black uppercase">
                  {product.discountPercent}% OFF RETAIL
                </span>
                <span className="px-3 py-1 rounded-full bg-[#FF4C00] text-white text-xs font-black uppercase">
                  1 of 1 Thrift Piece
                </span>
              </div>
            </div>

            {product.images.length > 1 && (
              <div className="flex items-center gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIdx(idx)}
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 bg-white transition flex items-center justify-center p-1 ${
                      activeImgIdx === idx
                        ? 'border-[#FF4C00] scale-105 shadow-md'
                        : 'border-neutral-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="Thumbnail" fill className="object-contain p-1" />
                  </button>
                ))}
              </div>
            )}

            <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#DCD4C5] luxury-shadow space-y-3 mt-6">
              <h4 className="font-black text-sm text-[#010101] uppercase tracking-wide flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF4C00]" /> 5-Step Vault Authentication & Restoration
              </h4>
              <p className="text-xs text-[#666666] leading-relaxed">
                This exact pair was sourced in <strong>{product.origin}</strong>. Upon landing at our Lahore warehouse, it passed our 5-step restoration process: UV sanitation, German deep shoe foam cleaning, leather balm treatment, insole antimicrobial sterilisation, and sole tread traction testing.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-extrabold text-[#FF4C00] uppercase tracking-wider">
                  {product.brand} • {product.gender}
                </span>
                <span className="text-neutral-500 font-mono text-[11px]">
                  SKU: {product.sku}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-[#010101] uppercase leading-tight">
                {product.name}
              </h1>

              <div className="mt-4 flex items-baseline gap-4 p-4 rounded-2xl bg-[#EBE6DC] border border-[#DCD4C5]">
                <div className="flex flex-col">
                  <span className="text-xs text-neutral-500 font-medium">Thrift Drop Price</span>
                  <span className="text-3xl font-black text-[#010101]">
                    {formatPKR(product.thriftPrice)}
                  </span>
                </div>
                <div className="flex flex-col border-l border-[#DCD4C5] pl-4">
                  <span className="text-xs text-neutral-500 font-medium">Estimated Retail Mall Price</span>
                  <span className="text-base text-neutral-400 line-through font-bold">
                    {formatPKR(product.originalPrice)}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-5 rounded-3xl bg-[#FAF8F5] border-2 border-[#DCD4C5] luxury-shadow space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#010101] uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#FF4C00]" />
                    Condition Inspection Score
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#010101] text-white text-xs font-black">
                    {product.condition.score} / 10 ({product.condition.label})
                  </span>
                </div>
                
                <p className="text-xs text-neutral-700 font-medium">
                  {product.condition.details}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-2">
                  <div className="p-2.5 rounded-xl bg-[#EBE6DC] text-neutral-800">
                    <span className="block font-bold text-[#010101]">Upper Condition:</span>
                    <span>{product.condition.upperCondition}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#EBE6DC] text-neutral-800">
                    <span className="block font-bold text-[#010101]">Sole Wear:</span>
                    <span>{product.condition.soleWear}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#EBE6DC] text-neutral-800">
                    <span className="block font-bold text-[#010101]">Insole:</span>
                    <span>{product.condition.insoleStatus}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#EBE6DC] text-neutral-800">
                    <span className="block font-bold text-[#010101]">Original Box:</span>
                    <span>{product.condition.boxIncluded ? 'Included in Package' : 'Dispatched in Eco Box'}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-extrabold text-neutral-800 uppercase tracking-wide">
                    Fixed Thrift Size (Only 1 Available)
                  </label>
                  <button
                    onClick={() => setSizeChartOpen(true)}
                    className="text-xs text-[#FF4C00] font-bold flex items-center gap-1 hover:underline"
                  >
                    <Ruler className="w-3.5 h-3.5" /> Size Chart
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#DCD4C5] flex items-center justify-between">
                  <div className="flex items-center gap-3 font-black text-sm sm:text-base text-[#010101]">
                    <span className="bg-[#010101] text-white px-3 py-1 rounded-xl">EU {product.sizeEU}</span>
                    <span>UK {product.sizeUK}</span>
                    <span>US {product.sizeUS}</span>
                    <span>{product.sizeCM} cm</span>
                  </div>
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <Clock className="w-3 h-3" /> 1 in Stock
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-[#EBE6DC] border border-[#DCD4C5] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold uppercase text-[#010101] flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#FF4C00]" /> Check TCS Delivery to:
                  </span>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="bg-[#FAF8F5] px-2.5 py-1 rounded-lg font-bold text-xs border border-[#DCD4C5]"
                  >
                    <option value="Lahore">Lahore (1-2 Days)</option>
                    <option value="Karachi">Karachi (2-3 Days)</option>
                    <option value="Islamabad">Islamabad (2-3 Days)</option>
                    <option value="Rawalpindi">Rawalpindi (2-3 Days)</option>
                    <option value="Faisalabad">Faisalabad (2-3 Days)</option>
                    <option value="Multan">Multan (2-3 Days)</option>
                    <option value="Peshawar">Peshawar (2-4 Days)</option>
                    <option value="Other">Other PK Cities (3-4 Days)</option>
                  </select>
                </div>
                <p className="text-[11px] text-neutral-600 font-medium">
                  Cash on Delivery available for <strong>{selectedCity}</strong> with tracking number sent via SMS/WhatsApp.
                </p>
              </div>

            </div>

            <div className="space-y-3 pt-6 border-t border-[#DCD4C5]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition transform active:scale-95 ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#010101] hover:bg-[#1A1A1A] text-white'
                  }`}
                >
                  {isAdded ? <Check className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
                  <span>{isAdded ? 'Added to Cart' : 'Add to Cart'}</span>
                </button>

                <a
                  href={`https://wa.me/923197197454?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BE5A] text-white shadow-xl transition transform active:scale-95"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Order on WhatsApp</span>
                </a>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => toggleWishlist(product)}
                  className="text-xs font-bold text-neutral-700 hover:text-[#FF4C00] flex items-center gap-1.5"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#FF4C00] text-[#FF4C00]' : ''}`} />
                  <span>{isLiked ? 'Saved to Wishlist' : 'Save to Wishlist'}</span>
                </button>

                <span className="text-xs text-neutral-500 font-medium flex items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5" /> 3-Day Size Exchange
                </span>
              </div>
            </div>

          </div>

        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#DCD4C5]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-[#FF4C00]">
                  More Authentic Heat
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#010101] uppercase tracking-tight">
                  Similar Thrift Pairs
                </h2>
              </div>
              <Link href="/shop" className="text-xs font-extrabold text-[#010101] hover:text-[#FF4C00] flex items-center gap-1">
                <span>View All</span> <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>

      {sizeChartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSizeChartOpen(false)} />
          <div className="relative w-full max-w-lg bg-[#FAF8F5] rounded-3xl p-6 shadow-2xl border border-[#DCD4C5] z-10">
            <h3 className="font-black text-lg text-[#010101] uppercase mb-3">
              Nayab Thrift Shoe Sizing Chart
            </h3>
            <p className="text-xs text-neutral-600 mb-4">
              All thrift shoes are measured in European (EU) sizing. Compare your foot measurement below:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#EBE6DC] text-neutral-800 font-extrabold uppercase">
                  <tr>
                    <th className="p-2.5">EU Size</th>
                    <th className="p-2.5">UK Size</th>
                    <th className="p-2.5">US Men</th>
                    <th className="p-2.5">US Women</th>
                    <th className="p-2.5">Length (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E2D6] font-medium text-neutral-700">
                  <tr><td className="p-2 font-bold">39</td><td>5.5</td><td>6.5</td><td>7.5</td><td>24.5 cm</td></tr>
                  <tr><td className="p-2 font-bold">40</td><td>6.0</td><td>7.0</td><td>8.0</td><td>25.0 cm</td></tr>
                  <tr><td className="p-2 font-bold">41</td><td>7.0</td><td>8.0</td><td>9.0</td><td>26.0 cm</td></tr>
                  <tr><td className="p-2 font-bold">42</td><td>8.0</td><td>9.0</td><td>10.0</td><td>27.0 cm</td></tr>
                  <tr><td className="p-2 font-bold">43</td><td>9.0</td><td>10.0</td><td>11.0</td><td>28.0 cm</td></tr>
                  <tr><td className="p-2 font-bold">44</td><td>9.5</td><td>10.5</td><td>11.5</td><td>28.5 cm</td></tr>
                  <tr><td className="p-2 font-bold">45</td><td>10.5</td><td>11.5</td><td>12.5</td><td>29.5 cm</td></tr>
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setSizeChartOpen(false)}
              className="mt-6 w-full py-2.5 rounded-xl bg-[#010101] text-white text-xs font-bold uppercase"
            >
              Got It
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
