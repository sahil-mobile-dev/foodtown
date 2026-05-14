import { Instagram } from "lucide-react";

const InstagramGallery = () => {
  // Using high-quality placeholder food images that match the cafe vibe
  const posts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=500",
      likes: "1.2k",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=500",
      likes: "850",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&q=80&w=500",
      likes: "2.1k",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=500",
      likes: "940",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=500",
      likes: "1.5k",
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1541592106381-b31e9221c0ae?auto=format&fit=crop&q=80&w=500",
      likes: "3.2k",
    },
  ];

  return (
    <section className="py-20 bg-charcoal">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Instagram className="w-4 h-4 text-primary" />
            <span className="text-primary text-xs font-medium uppercase tracking-wider">Follow Us @food_town_10</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">On Our Instagram</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our community on Instagram for the latest updates, special offers, and mouth-watering food shots!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href="https://www.instagram.com/food_town_10/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl bg-card border border-border"
            >
              <img
                src={post.image}
                alt="Instagram post"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="text-white flex items-center gap-2">
                  <Instagram className="w-5 h-5" />
                  <span className="font-semibold">{post.likes}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://www.instagram.com/food_town_10/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-tr from-amber-500 to-primary text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
          >
            <Instagram className="w-5 h-5" />
            Visit Instagram Profile
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramGallery;
