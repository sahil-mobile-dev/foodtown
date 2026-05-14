import { useState } from "react";
import { Instagram, Facebook, Play, ExternalLink, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Sample gallery items (can be replaced with real Instagram/Facebook embeds or images)
const galleryItems = [
  {
    id: 1,
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
    likes: 234,
    comments: 18,
    platform: "instagram",
    caption: "Our signature Chicken Burger 🍔🔥",
  },
  {
    id: 2,
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop",
    likes: 567,
    comments: 42,
    platform: "instagram",
    caption: "Pizza making in action! 🍕",
  },
  {
    id: 3,
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&h=400&fit=crop",
    likes: 189,
    comments: 12,
    platform: "facebook",
    caption: "Cheesy goodness overloaded ❤️",
  },
  {
    id: 4,
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop",
    likes: 432,
    comments: 28,
    platform: "instagram",
    caption: "Weekend vibes at Food Town 🎉",
  },
  {
    id: 5,
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=400&h=400&fit=crop",
    likes: 321,
    comments: 35,
    platform: "facebook",
    caption: "Making mojitos like a pro 🍹",
  },
  {
    id: 6,
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=400&fit=crop",
    likes: 276,
    comments: 21,
    platform: "instagram",
    caption: "Refreshing beverages on a hot day ☀️",
  },
  {
    id: 7,
    type: "image",
    thumbnail: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=400&fit=crop",
    likes: 543,
    comments: 67,
    platform: "instagram",
    caption: "Stack 'em high! 🍔🍔🍔",
  },
  {
    id: 8,
    type: "video",
    thumbnail: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=400&fit=crop",
    likes: 398,
    comments: 45,
    platform: "facebook",
    caption: "Party order prep - 100+ burgers! 🎉",
  },
];

const SocialGallery = () => {
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);

  return (
    <section id="gallery" className="py-20 bg-charcoal-light relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            #FoodTown
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Gallery</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">
            Follow us on social media for daily updates, behind-the-scenes, and mouth-watering content!
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              className="border-pink-500/50 text-pink-500 hover:bg-pink-500/10 hover:border-pink-500"
              asChild
            >
              <a href="https://www.instagram.com/food_town_10/" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-5 h-5 mr-2" />
                Follow on Instagram
              </a>
            </Button>
            <Button
              variant="outline"
              className="border-blue-500/50 text-blue-500 hover:bg-blue-500/10 hover:border-blue-500"
              asChild
            >
              <a href="https://facebook.com/foodtown" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-5 h-5 mr-2" />
                Like on Facebook
              </a>
            </Button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative aspect-square rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all"
            >
              <img
                src={item.thumbnail}
                alt={item.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-4 text-white text-sm">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {item.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {item.comments}
                    </span>
                  </div>
                </div>
              </div>

              {/* Video indicator */}
              {item.type === "video" && (
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Play className="w-4 h-4 text-white fill-white" />
                </div>
              )}

              {/* Platform indicator */}
              <div className="absolute top-3 left-3">
                {item.platform === "instagram" ? (
                  <Instagram className="w-5 h-5 text-white drop-shadow-lg" />
                ) : (
                  <Facebook className="w-5 h-5 text-white drop-shadow-lg" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-primary/30 hover:border-primary hover:bg-primary/10"
            asChild
          >
            <a href="https://www.instagram.com/food_town_10/" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              View More on Instagram
            </a>
          </Button>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden">
          {selectedItem && (
            <div>
              <img
                src={selectedItem.thumbnail}
                alt={selectedItem.caption}
                className="w-full aspect-square object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Heart className="w-5 h-5 text-red-500" />
                    {selectedItem.likes}
                  </span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <MessageCircle className="w-5 h-5" />
                    {selectedItem.comments}
                  </span>
                  <span className="ml-auto">
                    {selectedItem.platform === "instagram" ? (
                      <Instagram className="w-5 h-5 text-pink-500" />
                    ) : (
                      <Facebook className="w-5 h-5 text-blue-500" />
                    )}
                  </span>
                </div>
                <p className="text-foreground">{selectedItem.caption}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default SocialGallery;
