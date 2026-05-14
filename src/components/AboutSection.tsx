import { Heart, Award, Users, Clock } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every dish is crafted with passion and care, using the freshest ingredients.",
  },
  {
    icon: Award,
    title: "Quality First",
    description: "We never compromise on quality — from sourcing to serving.",
  },
  {
    icon: Users,
    title: "Community Focused",
    description: "We're proud to serve our neighborhood and build lasting relationships.",
  },
  {
    icon: Clock,
    title: "Always Fresh",
    description: "Made to order, delivered hot, and always on time.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-charcoal-light relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            About Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            More Than Just <span className="gradient-text">Food</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Food Town isn't just a restaurant — it's a passion project born out of love for great food 
            and even greater hospitality. We believe that every meal tells a story.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Our Story
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                What started as a small kitchen experiment in 2020 has grown into a beloved neighborhood 
                destination. Our founder's dream was simple: serve food that makes people smile.
              </p>
              <p>
                Today, we're proud to have served over 10,000+ happy customers. From late-night cravings 
                to family celebrations, we've been there for every moment that matters.
              </p>
              <p>
                Our team works tirelessly from 11 AM to 3 AM, ensuring that you never have to compromise 
                on taste, no matter what time your hunger strikes!
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-amber-glow/10 flex items-center justify-center border border-primary/20">
              <div className="text-center p-8">
                <p className="text-6xl md:text-7xl font-bold gradient-text mb-2">5+</p>
                <p className="text-xl text-foreground font-medium">Years of Excellence</p>
                <p className="text-muted-foreground mt-2">Serving happiness since 2020</p>
              </div>
            </div>
            {/* Decorative badges */}
            <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-lg">
              ⭐ 4.8 Rating
            </div>
            <div className="absolute -bottom-4 -left-4 px-4 py-2 rounded-full bg-card border border-border text-sm font-medium shadow-lg">
              🎉 10,000+ Orders
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
