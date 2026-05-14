import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const Cart = ({ isOpen, onClose, onCheckout }: CartProps) => {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems, clearCart } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md bg-card border-border flex flex-col">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="flex items-center gap-2 text-foreground">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Your Cart ({totalItems} items)
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-6">
              Add some delicious items from our menu!
            </p>
            <Button onClick={onClose} className="bg-primary hover:bg-amber-glow text-primary-foreground">
              Browse Menu
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.variant}`}
                  className="bg-charcoal-lighter rounded-lg p-4 flex gap-4"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{item.name}</h4>
                    {item.variant && (
                      <span className="text-sm text-primary">{item.variant}</span>
                    )}
                    <p className="text-muted-foreground text-sm mt-1">
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.id, item.variant)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2 bg-card rounded-lg p-1">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1, item.variant)
                        }
                        className="p-1 hover:bg-primary/20 rounded transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-6 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1, item.variant)
                        }
                        className="p-1 hover:bg-primary/20 rounded transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex justify-between items-center text-lg">
                <span className="text-muted-foreground">Total:</span>
                <span className="font-bold text-primary text-2xl">₹{totalPrice}</span>
              </div>

              {totalPrice < 200 && (
                <p className="text-sm text-muted-foreground text-center">
                  Add ₹{200 - totalPrice} more for free delivery!
                </p>
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="flex-1 border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
                >
                  Clear Cart
                </Button>
                <Button
                  onClick={onCheckout}
                  className="flex-1 bg-primary hover:bg-amber-glow text-primary-foreground glow-amber"
                >
                  Checkout
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
