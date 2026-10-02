'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import { categories, brands } from '@/data/categories';
import { ProductCard } from '@/components/product/ProductCard';
import { Filter, SlidersHorizontal, ArrowUpDown, X, RotateCcw, Sparkles } from 'lucide-react';

export default function ShopClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialBrand = searchParams.get('brand') || '';
  const initialGender = searchParams.get('gender') || '';
  const initialFilter = searchParams.get('filter') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(initialBrand ? [initialBrand] : []);
  const [selectedGender, setSelectedGender] = useState<string>(initialGender);
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(25000);
  const [minCondition, setMinCondition] = useState<number>(8.5);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
    if (initialBrand) setSelectedBrands([initialBrand]);
    if (initialGender) setSelectedGender(initialGender);
  }, [initialCategory, initialBrand, initialGender]);

  const toggleBrand = (b: string) => {
    setSelectedBrands((prev) =>
      prev.includes(b) ? prev.filter((item) => item !== b) : [...prev, b]
    );
  };

  const toggleSize = (s: number) => {
    setSelectedSizes((prev) =>
      prev.includes(s) ? prev.filter((item) => item !== s) : [...prev, s]
    );
  };

  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedBrands([]);
    setSelectedGender('');
    setSelectedSizes([]);
    setMaxPrice(25000);
    setMinCondition(8.5);
    setSortBy('newest');
  };

  const availableSizes = [38.5, 39, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.5, 45];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory) {
        const catObj = categories.find((c) => c.slug === selectedCategory);
        if (catObj && p.category !== catObj.name) return false;
      }
      if (selectedBrands.length > 0) {
        if (!selectedBrands.some((b) => b.toLowerCase() === p.brand.toLowerCase())) return false;
      }
      if (selectedGender && selectedGender !== 'All') {
        if (p.gender !== selectedGender && p.gender !== 'Unisex') return false;
      }
      if (selectedSizes.length > 0) {
        if (!selectedSizes.includes(p.sizeEU)) return false;
      }
      if (p.thriftPrice > maxPrice) return false;
      if (p.condition.score < minCondition) return false;

      if (initialFilter === 'new' && !p.isNewArrival) return false;
      if (initialFilter === 'featured' && !p.isFeatured) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.thriftPrice - b.thriftPrice;
      if (sortBy === 'price-high') return b.thriftPrice - a.thriftPrice;
      if (sortBy === 'condition') return b.condition.score - a.condition.score;
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
      return 0;
    });
  }, [selectedCategory, selectedBrands, selectedGender, selectedSizes, maxPrice, minCondition, sortBy, initialFilter]);

  const activeFiltersCount =
    (selectedCategory ? 1 : 0) +
    selectedBrands.length +
    (selectedGender ? 1 : 0) +
    selectedSizes.length +
    (maxPrice < 25000 ? 1 : 0) +
    (minCondition > 8.5 ? 1 : 0);

  return (
    <div className="bg-[#F1EDE5] min-h-screen py-8 sm:py-12 border-b border-[#DCD4C5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-[#666666] font-medium mb-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-[#010101] font-bold">Catalog</span>
            {selectedCategory && (
              <>
                <span>/</span>
                <span className="text-[#FF4C00] font-bold capitalize">{selectedCategory.replace('-', ' ')}</span>
              </>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#010101] uppercase tracking-tight">
                All 1-of-1 Thrift Drops
              </h1>
              <p className="text-xs sm:text-sm text-[#666666] font-medium mt-1">
                Showing {filteredProducts.length} authenticated vintage & modern pairs available right now in Pakistan.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden px-4 py-2.5 rounded-xl bg-[#010101] text-white text-xs font-bold flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
              </button>

              <div className="flex items-center gap-2 bg-[#FAF8F5] px-3 py-2 rounded-xl border border-[#DCD4C5]">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#666666]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-bold text-[#010101] focus:outline-none cursor-pointer"
                >
                  <option value="newest">Sort: Newest Drops</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="condition">Best Condition Score</option>
                  <option value="discount">Biggest Savings %</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <aside className="hidden lg:block space-y-6">
            <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#DCD4C5] luxury-shadow space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D6]">
                <span className="font-extrabold text-sm uppercase tracking-wider text-[#010101] flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#FF4C00]" /> Filter Pairs
                </span>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-xs text-[#FF4C00] font-bold hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                )}
              </div>

              <div>
                <label className="text-xs font-extrabold uppercase tracking-wide text-neutral-800 block mb-3">
                  Category
                </label>
                <div className="space-y-1.5 text-xs font-medium">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`w-full text-left px-3 py-2 rounded-xl transition ${
                      selectedCategory === ''
                        ? 'bg-[#010101] text-white font-bold'
                        : 'text-neutral-700 hover:bg-[#EBE6DC]'
                    }`}
                  >
                    All Categories ({products.length})
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(selectedCategory === cat.slug ? '' : cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition ${
                        selectedCategory === cat.slug
                          ? 'bg-[#010101] text-white font-bold'
                          : 'text-neutral-700 hover:bg-[#EBE6DC]'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] opacity-70">{cat.itemCount}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E2D6]">
                <label className="text-xs font-extrabold uppercase tracking-wide text-neutral-800 block mb-3">
                  Brand
                </label>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {brands.map((b) => (
                    <label
                      key={b.id}
                      className="flex items-center gap-2.5 text-xs text-neutral-700 font-medium cursor-pointer hover:text-[#010101]"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(b.name)}
                        onChange={() => toggleBrand(b.name)}
                        className="rounded border-[#DCD4C5] text-[#FF4C00] focus:ring-[#FF4C00]"
                      />
                      <span>{b.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E2D6]">
                <label className="text-xs font-extrabold uppercase tracking-wide text-neutral-800 block mb-3">
                  Gender
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  {['All', 'Men', 'Women'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGender(g === 'All' ? '' : g)}
                      className={`py-2 rounded-xl text-center transition ${
                        (selectedGender === g || (g === 'All' && !selectedGender))
                          ? 'bg-[#010101] text-white'
                          : 'bg-[#EBE6DC] text-neutral-700 hover:bg-[#E2DDD0]'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E2D6]">
                <label className="text-xs font-extrabold uppercase tracking-wide text-neutral-800 block mb-3">
                  Size (EU)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {availableSizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSize(s)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition ${
                        selectedSizes.includes(s)
                          ? 'bg-[#FF4C00] text-white'
                          : 'bg-[#EBE6DC] text-neutral-800 hover:bg-[#E2DDD0]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E2D6]">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-extrabold uppercase tracking-wide text-neutral-800">
                    Max Price
                  </span>
                  <span className="font-black text-[#FF4C00]">
                    Rs. {maxPrice.toLocaleString('en-PK')}
                  </span>
                </div>
                <input
                  type="range"
                  min={4000}
                  max={25000}
                  step={500}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#FF4C00]"
                />
              </div>

            </div>
          </aside>

          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center bg-[#FAF8F5] rounded-3xl border border-[#DCD4C5] space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#EBE6DC] flex items-center justify-center text-neutral-400 mx-auto">
                  <Sparkles className="w-8 h-8 text-[#FF4C00]" />
                </div>
                <h3 className="text-xl font-black text-[#010101]">No matching thrift pairs found</h3>
                <p className="text-xs text-neutral-600 max-w-sm mx-auto">
                  Try adjusting your size or price filters to see more thrifted heat from Japan & Europe.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 rounded-xl bg-[#010101] text-white font-bold text-xs uppercase"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#F1EDE5] shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#DCD4C5]">
                <h3 className="font-black text-base text-[#010101] uppercase">Filter Pairs</h3>
                <button onClick={() => setMobileFiltersOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="text-xs font-bold uppercase block mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-[#FAF8F5] border border-[#DCD4C5] text-xs font-bold"
                >
                  <option value="">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase block mb-2">Max Price (Rs. {maxPrice})</label>
                <input
                  type="range"
                  min={4000}
                  max={25000}
                  step={500}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#FF4C00]"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase block mb-2">Sizes</label>
                <div className="flex flex-wrap gap-1.5">
                  {availableSizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSize(s)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        selectedSizes.includes(s) ? 'bg-[#FF4C00] text-white' : 'bg-[#EBE6DC]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#DCD4C5] space-y-2">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full py-3 rounded-xl bg-[#010101] text-white font-bold text-xs uppercase"
              >
                Apply Filters ({filteredProducts.length} Pairs)
              </button>
              <button
                onClick={resetFilters}
                className="w-full py-2.5 rounded-xl text-neutral-600 font-bold text-xs"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
