import { Rocket, Store, Award, TrendingUp, Star, PartyPopper } from "lucide-react";

const milestones = [
  {
    year: "2020",
    title: "The Beginning",
    description: "Started with a small kitchen and a big dream to serve authentic, delicious food.",
    icon: Rocket,
  },
  {
    year: "2021",
    title: "First Store",
    description: "Opened our first physical outlet after receiving overwhelming love from customers.",
    icon: Store,
  },
  {
    year: "2022",
    title: "5000 Orders",
    description: "Crossed 5000+ happy customers and expanded our menu with new favorites.",
    icon: TrendingUp,
  },
  {
    year: "2023",
    title: "Best in Town",
    description: "Recognized as one of the top-rated food joints in the neighborhood.",
    icon: Award,
  },
  {
    year: "2024",
    title: "Going Strong",
    description: "Launched party orders, corporate catering, and late-night delivery till 3 AM.",
    icon: PartyPopper,
  },
  {
    year: "2025",
    title: "New Horizons",
    description: "Expanding to new locations and introducing innovative menu items.",
    icon: Star,
  },
];

const JourneyTimeline = () => {
  return (
    <section id="journey" className="py-20 bg-background relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Journey
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            From Kitchen to <span className="gradient-text">Your Heart</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Every milestone marks a step closer to our dream of serving happiness on every plate.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />

          {milestones.map((milestone, index) => (
            <div
              key={milestone.year}
              className={`relative flex items-start gap-4 md:gap-8 mb-12 last:mb-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10 md:-translate-x-1/2 border-4 border-background">
                <milestone.icon className="w-4 h-4 text-primary-foreground" />
              </div>

              {/* Content */}
              <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-3">
                    {milestone.year}
                  </span>
                  <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground text-sm">{milestone.description}</p>
                </div>
              </div>

              {/* Spacer for opposite side */}
              <div className="hidden md:block md:w-[calc(50%-2rem)]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
