import { ThemeSelector } from '@/components/ThemeSelector';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { DriftSection } from '@/components/DriftSection';
import { FeatureBlocks } from '@/components/FeatureBlocks';
import { CommunitySection } from '@/components/CommunitySection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <ThemeSelector />

      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow flex flex-col items-center w-full">
          <Hero />
          <DriftSection />
          <FeatureBlocks />
          <CommunitySection />
        </main>

        <Footer />
      </div>
    </>
  );
}
