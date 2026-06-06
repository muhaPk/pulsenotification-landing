import { Header } from '@/widgets/Header/ui/Header';
import { Hero } from '@/widgets/Hero/ui/Hero';
import { Footer } from '@/widgets/Footer/ui/Footer';
import { AlertFeed } from '@/widgets/AlertFeed/ui/AlertFeed';
import { Info } from '@/widgets/Info/ui/Info';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header />
      <main>
        <Hero />
        {/* <Features /> */}
        <AlertFeed />
        {/* <Info /> */}
      </main>
      <Footer />
    </div>
  );
}
