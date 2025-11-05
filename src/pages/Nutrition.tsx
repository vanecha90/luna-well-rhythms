import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Apple, Leaf, Flame, Droplets } from "lucide-react";

const nutrients = [
  { name: "Iron", description: "Leafy greens, red meat", phase: "Great for follicular phase" },
  { name: "Vitamin E", description: "Nuts, seeds, avocado", phase: "Supports hormone balance" },
  { name: "Omega-3", description: "Fish, flaxseeds, walnuts", phase: "Reduces inflammation" },
];

const mealSuggestions = [
  {
    meal: "Breakfast",
    suggestion: "Green smoothie bowl with berries and chia seeds",
    calories: "350 cal",
  },
  {
    meal: "Lunch",
    suggestion: "Grilled salmon salad with quinoa and avocado",
    calories: "480 cal",
  },
  {
    meal: "Dinner",
    suggestion: "Stir-fried vegetables with tofu and brown rice",
    calories: "420 cal",
  },
  {
    meal: "Snack",
    suggestion: "Greek yogurt with almonds and honey",
    calories: "200 cal",
  },
];

export default function Nutrition() {
  return (
    <div className="min-h-screen pb-20 bg-gradient-dawn">
      {/* Header */}
      <div className="bg-gradient-sunset px-6 py-8 rounded-b-[2rem] shadow-glow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Nutrition</h1>
            <p className="text-white/90 text-sm">Nourish your cycle</p>
          </div>
          <Apple className="h-8 w-8 text-white" />
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Daily Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 bg-card shadow-soft border-border">
            <div className="flex items-center gap-3 mb-2">
              <Flame className="h-5 w-5 text-accent" />
              <h3 className="font-semibold text-foreground">Calories</h3>
            </div>
            <p className="text-2xl font-bold text-foreground">1,450</p>
            <p className="text-xs text-muted-foreground mt-1">of 2,000 goal</p>
          </Card>

          <Card className="p-4 bg-card shadow-soft border-border">
            <div className="flex items-center gap-3 mb-2">
              <Droplets className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Water</h3>
            </div>
            <p className="text-2xl font-bold text-foreground">6</p>
            <p className="text-xs text-muted-foreground mt-1">of 8 glasses</p>
          </Card>
        </div>

        {/* Phase Nutrition Insight */}
        <Card className="p-6 bg-gradient-moonlight shadow-glow border-0">
          <h2 className="font-semibold text-white mb-3 flex items-center gap-2">
            <Leaf className="h-5 w-5" />
            Follicular Phase Nutrition
          </h2>
          <p className="text-sm text-white/90 leading-relaxed mb-3">
            Your body needs lighter, fresh foods during this energizing phase:
          </p>
          <ul className="space-y-2 text-sm text-white/90">
            <li className="flex items-center gap-2">
              <span className="text-accent">•</span>
              Fresh vegetables and fermented foods
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent">•</span>
              Lean proteins like chicken and fish
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent">•</span>
              Complex carbs for sustained energy
            </li>
          </ul>
        </Card>

        {/* Key Nutrients */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 px-1">Focus Nutrients</h2>
          <div className="space-y-3">
            {nutrients.map((nutrient) => (
              <Card key={nutrient.name} className="p-5 bg-card shadow-soft border-border">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Leaf className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{nutrient.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{nutrient.description}</p>
                    <p className="text-xs text-primary mt-2 italic">{nutrient.phase}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Meal Suggestions */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 px-1">Today's Meal Ideas</h2>
          <div className="space-y-3">
            {mealSuggestions.map((item) => (
              <Card key={item.meal} className="p-5 bg-card shadow-soft border-border">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{item.meal}</h3>
                  <span className="text-xs text-muted-foreground">{item.calories}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{item.suggestion}</p>
                <Button variant="outline" size="sm" className="w-full">
                  View Recipe
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" size="lg">Log Meal</Button>
          <Button variant="gradient" size="lg">Add Water</Button>
        </div>
      </div>
    </div>
  );
}
