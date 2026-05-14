import { useState } from "react";
import { PartyPopper, Building2, CalendarDays, Users, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const eventTypes = [
  { id: "birthday", label: "Birthday Party", icon: "🎂" },
  { id: "corporate", label: "Corporate Event", icon: "💼" },
  { id: "wedding", label: "Wedding/Engagement", icon: "💍" },
  { id: "college", label: "College Event", icon: "🎓" },
  { id: "other", label: "Other", icon: "🎉" },
];

const CorporateEnquiry = () => {
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    guests: "",
    date: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventLabel = eventTypes.find(t => t.id === selectedType)?.label || "Event";
    
    const message = `🎉 *Party/Corporate Enquiry*

*Event Type:* ${eventLabel}
*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*Number of Guests:* ${formData.guests}
*Preferred Date:* ${formData.date}

*Message:*
${formData.message || "No additional message"}

---
Sent from Food Town Website`;

    const whatsappUrl = `https://wa.me/918488921001?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    toast({
      title: "Redirecting to WhatsApp!",
      description: "We'll get back to you within 24 hours.",
    });
  };

  return (
    <section id="enquiry" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-glow/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Bulk Orders
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Planning an <span className="gradient-text">Event?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            From birthday parties to corporate events — we cater to all occasions with the same love and quality!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Benefits */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Why Choose Us for Events?</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <PartyPopper className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Customized Menus</h4>
                  <p className="text-muted-foreground text-sm">Tailored packages based on your preferences and guest count.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Corporate Friendly</h4>
                  <p className="text-muted-foreground text-sm">GST invoices, timely delivery, and professional service.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Any Guest Count</h4>
                  <p className="text-muted-foreground text-sm">From 10 to 1000+ guests, we've got you covered.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <CalendarDays className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Advance Booking</h4>
                  <p className="text-muted-foreground text-sm">Book 3-7 days in advance for the best experience.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 md:p-8 rounded-2xl bg-card border border-border">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Send Enquiry
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Event Type */}
              <div>
                <label className="block text-sm font-medium mb-3">Event Type</label>
                <div className="flex flex-wrap gap-2">
                  {eventTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedType === type.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      {type.icon} {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Phone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Name</label>
                  <Input
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <Input
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">Email (Optional)</label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              {/* Guests & Date */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Number of Guests</label>
                  <Input
                    required
                    type="number"
                    placeholder="50"
                    min="10"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Date</label>
                  <Input
                    required
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-2">Additional Details</label>
                <Textarea
                  placeholder="Tell us about your event, any special requirements, preferred menu items..."
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-amber-glow glow-amber"
                disabled={!selectedType}
              >
                <Send className="w-4 h-4 mr-2" />
                Send Enquiry via WhatsApp
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateEnquiry;
