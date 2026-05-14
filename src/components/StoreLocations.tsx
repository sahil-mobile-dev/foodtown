import { MapPin, Clock, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const stores = [
  {
    name: "Food Town - Main Branch",
    address: "123, Food Street, Near Central Park, City Center",
    phone: "+91 84889 21001",
    hours: "11:00 AM - 3:00 AM",
    isOpen: true,
    mapLink: "https://maps.google.com",
    features: ["Dine-in", "Takeaway", "Delivery"],
  },
  {
    name: "Food Town - Express",
    address: "456, Quick Bites Lane, Mall Road, Downtown",
    phone: "+91 84889 21002",
    hours: "10:00 AM - 12:00 AM",
    isOpen: true,
    mapLink: "https://maps.google.com",
    features: ["Takeaway", "Delivery"],
  },
  {
    name: "Food Town - Campus",
    address: "789, University Road, Near Tech Park",
    phone: "+91 84889 21003",
    hours: "11:00 AM - 11:00 PM",
    isOpen: false,
    mapLink: "https://maps.google.com",
    features: ["Dine-in", "Takeaway"],
  },
];

const StoreLocations = () => {
  // Simple time check (you can make this more sophisticated)
  const getCurrentStatus = (hours: string, isOpen: boolean) => {
    if (!isOpen) return { status: "Closed", color: "text-destructive" };
    // For demo, we'll just use the isOpen flag
    return { status: "Open Now", color: "text-green-500" };
  };

  return (
    <section id="stores" className="py-20 bg-charcoal-light relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Stores
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Find Us <span className="gradient-text">Near You</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Multiple locations to serve you better. Visit us or order online for a delicious experience!
          </p>
        </div>

        {/* Store Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store, index) => {
            const { status, color } = getCurrentStatus(store.hours, store.isOpen);
            
            return (
              <div
                key={store.name}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`flex items-center gap-2 text-sm font-medium ${color}`}>
                    <span className={`w-2 h-2 rounded-full ${store.isOpen ? "bg-green-500 animate-pulse" : "bg-destructive"}`} />
                    {status}
                  </span>
                </div>

                {/* Store Name */}
                <h3 className="text-xl font-bold mb-4">{store.name}</h3>

                {/* Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{store.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm">{store.hours}</span>
                  </div>
                  <a 
                    href={`tel:${store.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Phone className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm">{store.phone}</span>
                  </a>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {store.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-primary/30 hover:border-primary hover:bg-primary/10"
                    asChild
                  >
                    <a href={store.mapLink} target="_blank" rel="noopener noreferrer">
                      <MapPin className="w-4 h-4 mr-1" />
                      Directions
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    <a href={`tel:${store.phone.replace(/\s/g, "")}`}>
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </a>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StoreLocations;
