import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, TrendingUp, Zap, Heart } from "lucide-react";

const workouts = [
  {
    name: "HIIT Cardio",
    duration: "30 min",
    intensity: "High",
    calories: "350 cal",
    recommended: true,
    description: "Perfect for your current phase"
  },
  {
    name: "Yoga Flow",
    duration: "45 min",
    intensity: "Low",
    calories: "180 cal",
    recommended: false,
    description: "Gentle stretching and mindfulness"
  },
  {
    name: "Strength Training",
    duration: "40 min",
    intensity: "High",
    calories: "300 cal",
    recommended: true,
    description: "Build muscle during peak energy"
  },
];

export default function Fitness() {
  return (
    <div className="min-h-screen pb-20 bg-gradient-dawn">
      {/* Header */}
      <div className="bg-gradient-sunset px-6 py-8 rounded-b-[2rem] shadow-glow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Fitness</h1>
            <p className="text-white/90 text-sm">Personalized for your cycle</p>
          </div>
          <Activity className="h-8 w-8 text-white" />
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Today's Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4 bg-card shadow-soft border-border text-center">
            <TrendingUp className="h-5 w-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">8,432</p>
            <p className="text-xs text-muted-foreground">Steps</p>
          </Card>
          <Card className="p-4 bg-card shadow-soft border-border text-center">
            <Zap className="h-5 w-5 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">420</p>
            <p className="text-xs text-muted-foreground">Calories</p>
          </Card>
          <Card className="p-4 bg-card shadow-soft border-border text-center">
            <Heart className="h-5 w-5 text-destructive mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">68</p>
            <p className="text-xs text-muted-foreground">Avg BPM</p>
          </Card>
        </div>

        {/* Phase Recommendation */}
        <Card className="p-6 bg-gradient-moonlight shadow-glow border-0">
          <h2 className="font-semibold text-white mb-3 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Follicular Phase: High Energy Time
          </h2>
          <p className="text-sm text-white/90 leading-relaxed">
            Your rising estrogen levels mean you have more energy and strength. This is the perfect time for:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-white/90">
            <li className="flex items-center gap-2">
              <span className="text-accent">•</span>
              High-intensity interval training (HIIT)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent">•</span>
              Strength and resistance training
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent">•</span>
              Trying new challenging workouts
            </li>
          </ul>
        </Card>

        {/* Recommended Workouts */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 px-1">Recommended Workouts</h2>
          <div className="space-y-4">
            {workouts.map((workout) => (
              <Card 
                key={workout.name} 
                className={`p-5 border-border ${workout.recommended ? 'ring-2 ring-primary shadow-glow' : 'shadow-soft'}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">{workout.name}</h3>
                    {workout.recommended && (
                      <p className="text-xs text-primary font-medium mt-1">⭐ Recommended for you</p>
                    )}
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    workout.intensity === 'High' 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-secondary/10 text-secondary'
                  }`}>
                    {workout.intensity}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{workout.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>{workout.duration}</span>
                    <span>•</span>
                    <span>{workout.calories}</span>
                  </div>
                  <Button variant={workout.recommended ? "gradient" : "outline"} size="sm">
                    Start
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" size="lg">View History</Button>
          <Button variant="default" size="lg">Log Workout</Button>
        </div>
      </div>
    </div>
  );
}
