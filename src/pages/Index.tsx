import { useState } from "react";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import AboutSection from "@/components/AboutSection";
import JourneyTimeline from "@/components/JourneyTimeline";
import MenuSection from "@/components/MenuSection";
import ComboSection from "@/components/ComboSection";
import StoreLocations from "@/components/StoreLocations";
import CorporateEnquiry from "@/components/CorporateEnquiry";
import SocialGallery from "@/components/SocialGallery";
import Cart from "@/components/Cart";
import OrderForm from "@/components/OrderForm";
import Footer from "@/components/Footer";
import { CartProvider, useCart } from "@/context/CartContext";

const IndexContent = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const { totalItems } = useCart();

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsOrderFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <HeroCarousel />
      <AboutSection />
      <JourneyTimeline />
      <MenuSection />
      <ComboSection />
      <StoreLocations />
      <CorporateEnquiry />
      <SocialGallery />
      <Footer />

      {/* Cart Sheet */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      {/* Order Form Modal */}
      <OrderForm
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
      />

      {/* Floating Cart Button (Mobile) */}
      {totalItems > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="md:hidden fixed bottom-6 right-6 bg-primary text-primary-foreground p-4 rounded-full shadow-lg glow-amber animate-pulse-glow z-40"
        >
          <span className="absolute -top-2 -right-2 bg-foreground text-background text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {totalItems}
          </span>
          🛒
        </button>
      )}
    </div>
  );
};

const Index = () => {
  return (
    <CartProvider>
      <IndexContent />
    </CartProvider>
  );
};

export default Index;
