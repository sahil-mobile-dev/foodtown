import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    title: "Food Town",
    highlight: "Late Night Service",
    description: "Serving Ahmedabad's favorite street food from 11:00 AM to 03:00 AM. Freshly made with love, delivered fast!",
    badge: "Open Till 3 AM",
    cta: { primary: "Order Now", secondary: "View Combos" },
  },
  {
    title: "Fresh Burgers",
    highlight: "Aloo Tikki Special",
    description: "Juicy patties, fresh veggies, and our secret Food Town sauces — our burgers are crafted to perfection.",
    badge: "Bestseller",
    cta: { primary: "Try Our Burgers", secondary: "See Menu" },
  },
  {
    title: "Party Orders",
    highlight: "We've Got You Covered",
    description: "Planning a party or corporate event? We handle bulk orders with the same love and quality you expect.",
    badge: "Corporate & Events",
    cta: { primary: "Enquire Now", secondary: "View Gallery" },
  },
  {
    title: "Ahmedabadi Pizza",
    highlight: "Cheesy Goodness",
    description: "Try our signature Ahmedabadi Touch Pizza or the double-cheese Margherita. Freshly baked every time.",
    badge: "Must Try",
    cta: { primary: "Order Now", secondary: "See Menu" },
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const slide = slides[currentSlide];

  const getLink = (text: string) => {
    const links: Record<string, string> = {
      "Order Now": "#menu",
      "View Combos": "#combos",
      "Try Our Burgers": "#menu",
      "See Menu": "#menu",
      "Enquire Now": "#enquiry",
      "View Gallery": "#gallery",
      "Check Timings": "#stores",
    };
    return links[text] || "#menu";
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-32"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-charcoal-light to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-amber-glow/5 rounded-full blur-2xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div 
            key={`badge-${currentSlide}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-primary text-sm font-medium">{slide.badge}</span>
          </div>

          {/* Main heading */}
          <h1 
            key={`title-${currentSlide}`}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in"
          >
            {slide.title}
            <br />
            <span className="gradient-text">{slide.highlight}</span>
          </h1>

          {/* Subheading */}
          <p 
            key={`desc-${currentSlide}`}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in"
          >
            {slide.description}
          </p>

          {/* CTA Buttons */}
          <div 
            key={`cta-${currentSlide}`}
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-amber-glow glow-amber text-lg px-8 py-6 font-semibold"
              asChild
            >
              <a href={getLink(slide.cta.primary)}>{slide.cta.primary}</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/30 hover:border-primary hover:bg-primary/10 text-lg px-8 py-6"
              asChild
            >
              <a href={getLink(slide.cta.secondary)}>{slide.cta.secondary}</a>
            </Button>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all bg-card/50 backdrop-blur-sm"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide 
                      ? "bg-primary w-8" 
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all bg-card/50 backdrop-blur-sm"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-12 max-w-lg mx-auto">
            <div className="group cursor-default">
              <p className="text-2xl md:text-3xl font-bold text-primary group-hover:scale-110 transition-transform">50+</p>
              <p className="text-sm text-muted-foreground">Menu Items</p>
            </div>
            <div className="group cursor-default">
              <p className="text-2xl md:text-3xl font-bold text-primary group-hover:scale-110 transition-transform">30min</p>
              <p className="text-sm text-muted-foreground">Fast Delivery</p>
            </div>
            <div className="group cursor-default">
              <p className="text-2xl md:text-3xl font-bold text-primary group-hover:scale-110 transition-transform">1000+</p>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
            <ChevronDown className="w-8 h-8" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
