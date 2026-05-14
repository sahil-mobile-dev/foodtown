import { Phone, Clock, MapPin, Instagram, Facebook } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer id="contact" className="bg-charcoal-light border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <img src={logo} alt="Food Town" className="h-16 w-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              Serving delicious food since 2020. Quality ingredients, amazing taste,
              and quick delivery!
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/food_town_10/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-foreground">Contact Us</h3>
            <div className="space-y-3">
              <a
                href="tel:+918488921001"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-5 h-5 text-primary" />
                +91 84889 21001
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Clock className="w-5 h-5 text-primary" />
                11:00 AM - 03:00 AM (Late Night Service)
              </div>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Shop No 10 Kamlesh Park 1, Jivraj Park, Ahmedabad</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-foreground">Quick Links</h3>
            <div className="space-y-2">
              <a href="#home" className="block text-muted-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a href="#menu" className="block text-muted-foreground hover:text-primary transition-colors">
                Menu
              </a>
              <a href="#combos" className="block text-muted-foreground hover:text-primary transition-colors">
                Combo Offers
              </a>
              <a href="#contact" className="block text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p>© 2024 Food Town. All rights reserved.</p>
          <p className="mt-1 text-xs opacity-70">Developed by Sahil Chudasama</p>
          <p className="mt-2 text-primary font-medium">
            🛵 Free Delivery on orders above ₹200 within 1 km
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
