import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProperties from '@/components/home/FeaturedProperties';
import ServicesSection from '@/components/home/ServicesSection';
import CTASection from '@/components/home/CTASection';
import ChatBot from '@/components/chatbot/ChatBot';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedProperties />
        <ServicesSection />
        <CTASection />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
