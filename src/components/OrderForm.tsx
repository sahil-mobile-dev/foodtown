import { useState } from "react";
import { X, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderForm = ({ isOpen, onClose }: OrderFormProps) => {
  const { items, totalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length > 100) {
      newErrors.name = "Name must be less than 100 characters";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.length > 500) {
      newErrors.address = "Address must be less than 500 characters";
    }

    if (formData.notes.length > 500) {
      newErrors.notes = "Notes must be less than 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const generateWhatsAppMessage = () => {
    const orderItems = items
      .map(
        (item) =>
          `• ${item.name}${item.variant ? ` (${item.variant})` : ""} × ${item.quantity} = ₹${
            item.price * item.quantity
          }`
      )
      .join("\n");

    const message = `🍔 *New Order from Food Town Website*

*Customer Details:*
Name: ${formData.name}
Phone: ${formData.phone}
Address: ${formData.address}
${formData.notes ? `Notes: ${formData.notes}` : ""}

*Order Items:*
${orderItems}

*Total: ₹${totalPrice}*

Thank you for ordering!`;

    return encodeURIComponent(message);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // 1. Save to Firestore
      const { addDoc, collection, serverTimestamp } = await import("firebase/firestore");
      const { db } = await import("@/lib/firebase");

      await addDoc(collection(db, "orders"), {
        ...formData,
        items,
        totalPrice,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      // 2. Redirect to WhatsApp
      const phoneNumber = "918488921001";
      const message = generateWhatsAppMessage();
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

      window.open(whatsappUrl, "_blank");
      clearCart();
      onClose();
      toast.success("Order saved and sent to WhatsApp!");
    } catch (error) {
      console.error("Error saving order:", error);
      toast.error("Failed to save order. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Send className="w-5 h-5 text-primary" />
            Complete Your Order
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Order Summary */}
          <div className="bg-charcoal-lighter rounded-lg p-4 max-h-40 overflow-y-auto">
            <h4 className="font-medium mb-2 text-sm text-muted-foreground">Order Summary</h4>
            {items.map((item) => (
              <div key={`${item.id}-${item.variant}`} className="flex justify-between text-sm py-1">
                <span>
                  {item.name} {item.variant && `(${item.variant})`} × {item.quantity}
                </span>
                <span className="text-primary">₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="border-t border-border mt-2 pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span className="text-primary">₹{totalPrice}</span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <Input
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleChange}
                className={`bg-charcoal-lighter border-border focus:border-primary ${
                  errors.name ? "border-destructive" : ""
                }`}
              />
              {errors.name && (
                <p className="text-destructive text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <Input
                name="phone"
                placeholder="Phone Number (10 digits) *"
                value={formData.phone}
                onChange={handleChange}
                className={`bg-charcoal-lighter border-border focus:border-primary ${
                  errors.phone ? "border-destructive" : ""
                }`}
              />
              {errors.phone && (
                <p className="text-destructive text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <Textarea
                name="address"
                placeholder="Delivery Address *"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className={`bg-charcoal-lighter border-border focus:border-primary resize-none ${
                  errors.address ? "border-destructive" : ""
                }`}
              />
              {errors.address && (
                <p className="text-destructive text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <div>
              <Textarea
                name="notes"
                placeholder="Special instructions (optional)"
                value={formData.notes}
                onChange={handleChange}
                rows={2}
                className={`bg-charcoal-lighter border-border focus:border-primary resize-none ${
                  errors.notes ? "border-destructive" : ""
                }`}
              />
              {errors.notes && (
                <p className="text-destructive text-sm mt-1">{errors.notes}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-amber-glow text-primary-foreground py-6"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Order via WhatsApp
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            You'll be redirected to WhatsApp to confirm your order
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderForm;
