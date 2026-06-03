import { Header } from '@/widgets/Header/ui/Header';
import { Hero } from '@/widgets/Hero/ui/Hero';
import { Features } from '@/widgets/Features/ui/Features';
import { Stats } from '@/widgets/Stats/ui/Stats';
import { CTA } from '@/widgets/CTA/ui/CTA';
import { Footer } from '@/widgets/Footer/ui/Footer';
import { AlertFeed } from '@/widgets/AlertFeed/ui/AlertFeed';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      <main>
        <Hero />
        {/* <Features /> */}
        <AlertFeed />
        {/* <Stats /> */}
        {/* <CTA /> */}
      </main>
      <Footer />
    </div>
  );
}
