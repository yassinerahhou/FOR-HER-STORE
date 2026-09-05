import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CartDrawer } from '@/components/cart-drawer';
import { QuickViewModal } from '@/components/quick-view-modal';
import { SearchOverlay } from '@/components/search-overlay';
import { ToastNotification } from '@/components/toast-notification';

export const metadata: Metadata = {
  title: 'GAOUAHER — High-Performance Moroccan Luxury Botanicals',
  description: 'High-performance botanical care infused with Moroccan heritage. Formulated with cold-pressed wild Argan, Damask Rose, and Atlas minerals.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#fffdf9] text-[#252525] min-h-screen flex flex-col font-sans antialiased">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />

          {/* Persistent Global Overlays */}
          <CartDrawer />
          <QuickViewModal />
          <SearchOverlay />
          <ToastNotification />
        </CartProvider>
      </body>
    </html>
  );
}
