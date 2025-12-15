import { ReactNode } from 'react';
import { Header } from './Header';
import { AlertBanner } from '@/components/alerts/AlertBanner';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background grid-bg">
      <div className="fixed inset-0 scanline pointer-events-none opacity-50" />
      <Header />
      <AlertBanner />
      <main className="pt-20 md:pt-24 pb-8 px-4 container mx-auto relative z-10">
        {children}
      </main>
    </div>
  );
};
