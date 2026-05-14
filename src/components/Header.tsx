import { useState } from "react";
import { Menu, X, ShoppingCart, Phone, Clock, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

interface HeaderProps {
  onCartClick?: () => void;
}

const Header = ({ onCartClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, profile } = useAuth();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Menu", href: "/#menu" },
    { name: "Stores", href: "/#stores" },
    { name: "Gallery", href: "/#gallery" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      {/* Top bar */}
      <div className="hidden md:block bg-charcoal-light py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              +91 84889 21001
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              11:00 AM - 03:00 AM
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-primary font-medium">Free Delivery on orders above ₹200</span>
            {user && !user.isAnonymous && (
              <span className="text-foreground font-medium">Hello, {profile?.displayName || user.email}</span>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Food Town" className="h-12 md:h-14 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Auth, Cart & Mobile Menu */}
        <div className="flex items-center gap-3">
          {user && !user.isAnonymous ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => auth.signOut()}
              className="hidden md:flex text-muted-foreground hover:text-destructive"
            >
              Logout
            </Button>
          ) : null}
          
          <Link to="/auth">
            <Button
              variant="outline"
              size="icon"
              className="border-primary/30 hover:border-primary hover:bg-primary/10"
            >
              <UserIcon className="h-5 w-5 text-primary" />
            </Button>
          </Link>

          {onCartClick && (
            <Button
              onClick={onCartClick}
              variant="outline"
              size="icon"
              className="relative border-primary/30 hover:border-primary hover:bg-primary/10"
            >
              <ShoppingCart className="h-5 w-5 text-primary" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-bounce-in">
                  {totalItems}
                </span>
              )}
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-charcoal-light border-t border-border animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground/80 hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="border-t border-border pt-4 mt-2">
              <p className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Phone className="w-4 h-4 text-primary" />
                +91 84889 21001
              </p>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary" />
                11:00 AM - 03:00 AM
              </p>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
