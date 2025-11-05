import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, AlertCircle, TrendingUp } from "lucide-react";

const phases = [
  { name: "Menstrual", days: "1-5", color: "bg-destructive", description: "Rest and renewal" },
  { name: "Follicular", days: "6-13", color: "bg-primary", description: "Rising energy" },
  { name: "Ovulatory", days: "14-16", color: "bg-accent", description: "Peak vitality" },
  { name: "Luteal", days: "17-28", color: "bg-secondary", description: "Gradual wind down" },
];

const symptoms = [
  { name: "Cramps", recorded: true },
  { name: "Mood Swings", recorded: false },
  { name: "Bloating", recorded: true },
  { name: "Fatigue", recorded: false },
];

export default function Cycle() {
  return (
    <div className="min-h-screen pb-20 bg-gradient-dawn">
      {/* Header */}
      <div className="bg-gradient-sunset px-6 py-8 rounded-b-[2rem] shadow-glow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Cycle Tracker</h1>
            <p className="text-white/90 text-sm">Day 14 of 28</p>
          </div>
          <Calendar className="h-8 w-8 text-white" />
        </div>
        
        {/* Progress Bar */}
        <div className="bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur">
          <div className="bg-white h-full rounded-full transition-all" style={{ width: '50%' }} />
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Current Phase */}
        <Card className="p-6 bg-card shadow-soft border-border">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground mb-1">Follicular Phase</h2>
              <p className="text-sm text-muted-foreground mb-3">Days 6-13 of your cycle</p>
              <p className="text-sm text-foreground leading-relaxed">
                Your estrogen levels are rising, bringing increased energy, creativity, and confidence. 
                This is an ideal time for challenging workouts and social activities.
              </p>
            </div>
          </div>
        </Card>

        {/* Cycle Phases Overview */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 px-1">Cycle Phases</h2>
          <div className="space-y-3">
            {phases.map((phase, index) => (
              <Card 
                key={phase.name} 
                className={`p-4 border-border ${index === 1 ? 'ring-2 ring-primary shadow-glow' : 'shadow-soft'}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`${phase.color} w-2 h-12 rounded-full`} />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{phase.name}</h3>
                    <p className="text-sm text-muted-foreground">{phase.days}</p>
                  </div>
                  <p className="text-sm text-muted-foreground italic">{phase.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Symptoms Tracker */}
        <Card className="p-6 bg-card shadow-soft border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Today's Symptoms</h2>
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {symptoms.map((symptom) => (
              <Button
                key={symptom.name}
                variant={symptom.recorded ? "default" : "outline"}
                className="h-auto py-3"
              >
                {symptom.name}
              </Button>
            ))}
          </div>
          <Button variant="ghost" className="w-full mt-4">
            + Add Custom Symptom
          </Button>
        </Card>

        {/* Fertility Window */}
        <Card className="p-6 bg-gradient-moonlight shadow-glow border-0">
          <div className="flex items-start gap-3 text-white">
            <TrendingUp className="h-6 w-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold mb-2">Fertility Window</h3>
              <p className="text-sm text-white/90 leading-relaxed">
                You're approaching your most fertile days (Days 12-16). Your body is preparing for ovulation.
              </p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" size="lg">View Calendar</Button>
          <Button variant="gradient" size="lg">Log Period</Button>
        </div>
      </div>
    </div>
  );
}
