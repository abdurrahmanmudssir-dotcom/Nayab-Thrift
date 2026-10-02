import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { QuickViewProvider } from '@/context/QuickViewContext';
import { ToastProvider } from '@/context/ToastContext';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { NavbarWrapper } from '@/components/layout/NavbarWrapper';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { WishlistDrawer } from '@/components/wishlist/WishlistDrawer';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import { ToastContainer } from '@/components/toast/ToastContainer';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nayab Thrift | 100% Original Pakistani Thrift Shoes Brand',
  description: 'Shop curated 1-of-1 authentic thrifted sneakers, running shoes, and boots in Pakistan. Air Jordans, Ultraboost, New Balance 550, Nike Dunks at up to 80% off retail. Cash on Delivery across Pakistan.',
  keywords: ['thrift shoes pakistan', 'nayab thrift', 'nayab thrift shoes', 'branded shoes thrift lahore', 'original sneakers karachi', 'jordan 1 thrift', 'new balance 550 pakistan', 'thrifted kicks pk'],
  openGraph: {
    title: 'Nayab Thrift - Pakistan’s Premier 1-of-1 Thrift Shoes Store',
    description: 'Original branded thrift shoes at affordable prices. Cleaned, restored, and delivered with Cash on Delivery across Pakistan.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased font-sans`}>
      <body className={`${manrope.className} min-h-full flex flex-col bg-[#F1EDE5] text-[#010101] selection:bg-[#FF4C00] selection:text-white`}>
        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
              <QuickViewProvider>
                <AnnouncementBar />
                <NavbarWrapper />
                <main className="flex-1">{children}</main>
                <Footer />
                <MobileNav />
                <CartDrawer />
                <WishlistDrawer />
                <QuickViewModal />
                <ToastContainer />
              </QuickViewProvider>
            </WishlistProvider>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
