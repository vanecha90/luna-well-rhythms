import { Card } from "@/components/ui/card";
import moonPhasesImg from "@/assets/moon-phases.jpg";
import { Moon as MoonIcon, Sparkles, Heart } from "lucide-react";

const moonPhases = [
  { name: "New Moon", meaning: "New beginnings, setting intentions", energy: "Introspective" },
  { name: "Waxing Crescent", meaning: "Growth, expansion, taking action", energy: "Building" },
  { name: "First Quarter", meaning: "Challenges, decisions, perseverance", energy: "Active" },
  { name: "Waxing Gibbous", meaning: "Refinement, adjustment, preparation", energy: "Focused" },
  { name: "Full Moon", meaning: "Completion, celebration, release", energy: "Peak" },
  { name: "Waning Gibbous", meaning: "Gratitude, sharing, teaching", energy: "Reflective" },
  { name: "Last Quarter", meaning: "Release, forgiveness, letting go", energy: "Releasing" },
  { name: "Waning Crescent", meaning: "Rest, healing, surrender", energy: "Restorative" },
];

export default function Moon() {
  return (
    <div className="min-h-screen pb-20 bg-gradient-dawn">
      {/* Header */}
      <div className="bg-gradient-sunset px-6 py-8 rounded-b-[2rem] shadow-glow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Moon Phases</h1>
            <p className="text-white/90 text-sm">Align with lunar wisdom</p>
          </div>
          <MoonIcon className="h-8 w-8 text-white" />
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Current Moon Phase */}
        <Card className="p-6 bg-card shadow-glow border-border overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-moonlight rounded-full blur-3xl opacity-30" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-secondary/10 p-3 rounded-full">
                <MoonIcon className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Waxing Crescent</h2>
                <p className="text-sm text-muted-foreground">26% Illuminated</p>
              </div>
            </div>
            <img 
              src={moonPhasesImg} 
              alt="Moon phases" 
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Sparkles className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Meaning</p>
                  <p className="text-sm text-muted-foreground">Growth, expansion, taking action on your intentions</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Heart className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Energy</p>
                  <p className="text-sm text-muted-foreground">Building momentum, perfect for starting new projects</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Daily Affirmation */}
        <Card className="p-6 bg-gradient-moonlight shadow-glow border-0">
          <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Today's Moon Wisdom
          </h3>
          <p className="text-white/90 italic leading-relaxed">
            "As the moon grows fuller, so does my courage to pursue my dreams. I embrace this energy of expansion and take confident steps forward."
          </p>
        </Card>

        {/* All Moon Phases */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 px-1">Understanding Moon Phases</h2>
          <div className="space-y-3">
            {moonPhases.map((phase, index) => (
              <Card 
                key={phase.name} 
                className={`p-5 bg-card shadow-soft border-border ${index === 1 ? 'ring-2 ring-secondary' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-2 h-16 rounded-full ${
                    index === 1 ? 'bg-secondary' : 'bg-muted'
                  }`} />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{phase.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{phase.meaning}</p>
                    <span className="text-xs px-3 py-1 rounded-full bg-secondary/10 text-secondary font-medium">
                      {phase.energy} Energy
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Moon & Cycle Connection */}
        <Card className="p-6 bg-card shadow-soft border-border">
          <h3 className="font-semibold text-foreground mb-3">Moon & Cycle Connection</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            Many women find their menstrual cycle naturally aligns with the moon's phases. The average cycle length (28 days) mirrors the lunar cycle.
          </p>
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-foreground">
              <span className="font-semibold">Your sync:</span> You're in your Follicular Phase during the Waxing Crescent Moon - both phases of growth and building energy!
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
