import React from 'react';
import { Hero } from '@/components/home/Hero';
import { DropTicker } from '@/components/home/DropTicker';
import { CategorySection } from '@/components/home/CategorySection';
import { EditorialSplitSection } from '@/components/home/EditorialSplitSection';
import { FeaturedSection } from '@/components/home/FeaturedSection';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { BrandSection } from '@/components/home/BrandSection';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <DropTicker />
      <CategorySection />
      <EditorialSplitSection />
      <FeaturedSection />
      <ReviewsSection />
      <BrandSection />
      <WhyChooseUs />
    </div>
  );
}
