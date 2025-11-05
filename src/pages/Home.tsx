import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import moonPhasesImg from "@/assets/moon-phases.jpg";
import { Sparkles, Droplets, Sun, Heart } from "lucide-react";

export default function Home() {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen pb-20 bg-gradient-dawn">
      {/* Header */}
      <div className="bg-gradient-sunset px-6 py-8 rounded-b-[2rem] shadow-glow">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-white/90 text-sm">{currentDate}</p>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Daily Quote */}
        <Card className="p-6 bg-card/80 backdrop-blur border-border shadow-soft">
          <div className="flex items-start gap-3">
            <Sparkles className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="text-foreground/90 italic leading-relaxed">
                "Your body is wise. Trust its rhythm and honor its needs today."
              </p>
              <p className="text-sm text-muted-foreground mt-2">— Daily Wisdom</p>
            </div>
          </div>
        </Card>

        {/* Cycle & Moon Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-5 bg-card shadow-soft border-border">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Cycle Day</h3>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-primary">14</p>
                <p className="text-sm text-muted-foreground">Follicular Phase</p>
              </div>
            </div>
          </Card>

          <Card className="p-5 bg-card shadow-soft border-border">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <img src={moonPhasesImg} alt="Moon" className="h-5 w-5 rounded-full" />
                <h3 className="font-semibold text-foreground">Moon Phase</h3>
              </div>
              <div className="space-y-1">
                <p className="text-lg font-bold text-secondary">Waxing</p>
                <p className="text-sm text-muted-foreground">Crescent Moon</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Weather & Wellness */}
        <Card className="p-5 bg-card shadow-soft border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Today's Wellness</h3>
            <Sun className="h-5 w-5 text-accent" />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Temperature</p>
              <p className="font-semibold text-foreground">72°F</p>
            </div>
            <div>
              <p className="text-muted-foreground">Humidity</p>
              <p className="font-semibold text-foreground">65%</p>
            </div>
          </div>
        </Card>

        {/* Phase Insights */}
        <Card className="p-6 bg-gradient-moonlight shadow-glow border-0">
          <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Follicular Phase Insights
          </h3>
          <div className="space-y-3 text-white/90 text-sm">
            <p className="leading-relaxed">
              ✨ Your energy is rising! This is a great time for high-intensity workouts and trying new activities.
            </p>
            <p className="leading-relaxed">
              🥗 Focus on fresh, energizing foods: leafy greens, lean proteins, and vibrant fruits.
            </p>
            <p className="leading-relaxed">
              💪 Your strength and endurance are peaking. Push yourself in your fitness routine!
            </p>
          </div>
        </Card>

        {/* Hydration Reminder */}
        <Card className="p-5 bg-card shadow-soft border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Droplets className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Hydration</h3>
                <p className="text-sm text-muted-foreground">6 of 8 glasses today</p>
              </div>
            </div>
            <Button variant="gradient" size="sm">Log Water</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
