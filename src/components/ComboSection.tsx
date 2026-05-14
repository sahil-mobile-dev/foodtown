import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { comboOffers } from "@/lib/menuData";
import { useCart } from "@/context/CartContext";

const ComboSection = () => {
  const { addToCart } = useCart();

  const handleAddCombo = (combo: typeof comboOffers[0]) => {
    addToCart({
      id: combo.id,
      name: combo.name,
      price: combo.price,
    });
  };

  return (
    <section id="combos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span className="text-primary text-sm font-medium">🔥 Special Deals</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Combo <span className="gradient-text">Offers</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Get more for less with our amazing combo deals!
          </p>
        </div>

        {/* Combo Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {comboOffers.map((combo) => (
            <div
              key={combo.id}
              className="group bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all card-hover relative overflow-hidden"
            >
              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />

              <div className="relative z-10">
                <div className="bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">
                  COMBO
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {combo.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{combo.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">₹{combo.price}/-</span>
                  <Button
                    size="sm"
                    onClick={() => handleAddCombo(combo)}
                    className="bg-primary hover:bg-amber-glow text-primary-foreground"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComboSection;
