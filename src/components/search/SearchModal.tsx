'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, ArrowRight, TrendingUp } from 'lucide-react';
import { products } from '@/data/products';
import { Product } from '@/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.sizeEU.toString().includes(q)
    );
    setResults(filtered);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const popularTags = ['Air Jordan 1', 'Ultraboost', 'New Balance 550', 'Salomon XT-6', 'Samba', 'Size 42', 'Nike Dunk', 'Boots'];
  const formatPKR = (amount: number) => 'Rs. ' + amount.toLocaleString('en-PK');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex justify-center">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-[#F1EDE5] rounded-3xl shadow-2xl border border-[#DCD4C5] overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        
        <div className="p-4 sm:p-5 border-b border-[#DCD4C5] flex items-center gap-3 bg-[#FAF8F5]">
          <Search className="w-5 h-5 text-[#FF4C00] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search thrift shoes, brands (Nike, NB), size (42, 43)..."
            className="w-full bg-transparent text-[#010101] text-base font-medium placeholder:text-neutral-500 focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-neutral-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 rounded-lg bg-[#EBE6DC] text-neutral-600 text-xs font-bold hover:bg-[#DCD4C5]"
          >
            ESC
          </button>
        </div>

        {!query && (
          <div className="p-6">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-700 uppercase tracking-wider mb-3">
              <TrendingUp className="w-3.5 h-3.5 text-[#FF4C00]" />
              <span>Trending Thrift Searches in Pakistan</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1.5 rounded-xl bg-[#EBE6DC] hover:bg-[#010101] hover:text-white text-xs font-semibold text-neutral-800 transition"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {query && (
          <div className="max-h-96 overflow-y-auto p-4 space-y-2">
            <div className="text-xs font-bold text-neutral-500 uppercase tracking-wider px-2 mb-2">
              {results.length} {results.length === 1 ? 'Pair Found' : 'Pairs Found'}
            </div>

            {results.length === 0 ? (
              <div className="p-8 text-center text-neutral-600">
                <p className="font-bold text-base text-[#010101]">No thrift pairs found for "{query}"</p>
                <p className="text-xs mt-1">Try searching by brand like "Nike" or size "42".</p>
              </div>
            ) : (
              results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#EBE6DC] transition group border border-transparent hover:border-[#DCD4C5]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#E2DDD0] shrink-0">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold text-[#FF4C00] uppercase">
                          {product.brand}
                        </span>
                        <span className="text-[10px] bg-[#FAF8F5] px-1.5 py-0.5 rounded text-neutral-700 font-bold">
                          EU {product.sizeEU}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#010101] group-hover:text-[#FF4C00] transition">
                        {product.name}
                      </h4>
                      <span className="text-[11px] text-neutral-500 font-medium">
                        Condition: {product.condition.score}/10 ({product.condition.label})
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-xs text-neutral-400 line-through block">
                        {formatPKR(product.originalPrice)}
                      </span>
                      <span className="text-sm font-extrabold text-[#010101]">
                        {formatPKR(product.thriftPrice)}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#FF4C00] group-hover:translate-x-1 transition" />
                  </div>
                </Link>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};
