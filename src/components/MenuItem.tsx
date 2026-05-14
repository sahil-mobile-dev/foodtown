import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import type { MenuItem as MenuItemType } from "@/lib/menuData";

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem = ({ item }: MenuItemProps) => {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(
    item.variants?.[0]?.name || ""
  );
  const [showAdded, setShowAdded] = useState(false);

  const currentPrice = item.variants
    ? item.variants.find((v) => v.name === selectedVariant)?.price || item.variants[0].price
    : item.price || 0;

  const handleAdd = () => {
    addToCart({
      id: item.id,
      name: item.name,
      variant: item.variants ? selectedVariant : undefined,
      price: currentPrice,
    });
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 1000);
  };

  return (
    <div className="group bg-card rounded-lg p-4 border border-border hover:border-primary/30 transition-all duration-300 card-hover">
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1">
          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {item.name}
          </h4>
          {item.description && (
            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
          )}

          {/* Variants */}
          {item.variants && item.variants.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {item.variants.map((variant) => (
                <button
                  key={variant.name}
                  onClick={() => setSelectedVariant(variant.name)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    selectedVariant === variant.name
                      ? "bg-primary text-primary-foreground"
                      : "bg-charcoal-lighter text-muted-foreground hover:bg-primary/20"
                  }`}
                >
                  {variant.name} - ₹{variant.price}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price and Add button */}
        <div className="flex flex-col items-end gap-2">
          <span className="text-lg font-bold text-primary">₹{currentPrice}</span>
          <Button
            size="sm"
            onClick={handleAdd}
            className={`transition-all ${
              showAdded
                ? "bg-green-600 hover:bg-green-600"
                : "bg-primary hover:bg-amber-glow"
            } text-primary-foreground`}
          >
            {showAdded ? (
              "Added!"
            ) : (
              <>
                <Plus className="w-4 h-4 mr-1" />
                Add
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
