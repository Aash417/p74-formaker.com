import Footer from '@/components/footer';
import Hero from '@/components/hero';
import HowItWorks from '@/components/steps';

export default async function Page() {
   return (
      <main>
         <Hero />
         <HowItWorks />
         <Footer />
      </main>
   );
}
