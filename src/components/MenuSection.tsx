import { useState } from "react";
import { menuData } from "@/lib/menuData";
import MenuItem from "./MenuItem";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState(menuData[0].id);

  return (
    <section id="menu" className="py-20 bg-charcoal-light">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="gradient-text">Menu</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore our wide variety of delicious items — all made fresh with love!
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-8">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-3 pb-4">
              {menuData.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all shrink-0 ${
                    activeCategory === category.id
                      ? "bg-primary text-primary-foreground glow-amber"
                      : "bg-card border border-border text-foreground hover:border-primary/50"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>

        {/* Menu Items Grid */}
        {menuData.map((category) => (
          <div
            key={category.id}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${
              activeCategory === category.id ? "block animate-fade-in" : "hidden"
            }`}
          >
            {category.items.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
