import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Apple, Leaf, Flame, Droplets, Clock, Users } from "lucide-react";
import { useState } from "react";

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
    prepTime: "10 mins",
    servings: "1",
    ingredients: [
      "1 cup spinach",
      "1/2 cup frozen berries",
      "1 banana",
      "2 tbsp chia seeds",
      "1 cup almond milk",
      "1 tbsp honey",
      "Toppings: granola, fresh berries, coconut flakes"
    ],
    instructions: [
      "Add spinach, frozen berries, banana, and almond milk to a blender",
      "Blend until smooth and creamy",
      "Pour into a bowl",
      "Top with chia seeds, granola, fresh berries, and coconut flakes",
      "Serve immediately and enjoy!"
    ]
  },
  {
    meal: "Lunch",
    suggestion: "Grilled salmon salad with quinoa and avocado",
    calories: "480 cal",
    prepTime: "25 mins",
    servings: "2",
    ingredients: [
      "2 salmon fillets (6 oz each)",
      "1 cup cooked quinoa",
      "2 cups mixed greens",
      "1 avocado, sliced",
      "1/2 cup cherry tomatoes",
      "2 tbsp olive oil",
      "1 lemon",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Season salmon fillets with salt, pepper, and lemon juice",
      "Grill salmon for 4-5 minutes per side until cooked through",
      "Prepare quinoa according to package instructions",
      "Arrange mixed greens on plates",
      "Top with quinoa, grilled salmon, avocado slices, and cherry tomatoes",
      "Drizzle with olive oil and lemon juice",
      "Serve fresh and enjoy!"
    ]
  },
  {
    meal: "Dinner",
    suggestion: "Stir-fried vegetables with tofu and brown rice",
    calories: "420 cal",
    prepTime: "30 mins",
    servings: "2",
    ingredients: [
      "1 block firm tofu, cubed",
      "2 cups mixed vegetables (broccoli, bell peppers, carrots)",
      "1 cup cooked brown rice",
      "2 tbsp soy sauce",
      "1 tbsp sesame oil",
      "2 cloves garlic, minced",
      "1 tsp ginger, grated",
      "1 tbsp sesame seeds"
    ],
    instructions: [
      "Press tofu to remove excess water, then cube",
      "Cook brown rice according to package instructions",
      "Heat sesame oil in a wok or large pan",
      "Add garlic and ginger, sauté for 30 seconds",
      "Add tofu cubes and cook until golden on all sides",
      "Add vegetables and stir-fry for 5-7 minutes",
      "Add soy sauce and toss to combine",
      "Serve over brown rice, garnished with sesame seeds"
    ]
  },
  {
    meal: "Snack",
    suggestion: "Greek yogurt with almonds and honey",
    calories: "200 cal",
    prepTime: "5 mins",
    servings: "1",
    ingredients: [
      "1 cup Greek yogurt",
      "2 tbsp almonds, chopped",
      "1 tbsp honey",
      "Optional: cinnamon, fresh berries"
    ],
    instructions: [
      "Scoop Greek yogurt into a bowl",
      "Drizzle honey on top",
      "Sprinkle with chopped almonds",
      "Add a pinch of cinnamon if desired",
      "Top with fresh berries for extra flavor",
      "Enjoy as a healthy snack!"
    ]
  },
];

export default function Nutrition() {
  const [selectedRecipe, setSelectedRecipe] = useState<typeof mealSuggestions[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewRecipe = (recipe: typeof mealSuggestions[0]) => {
    setSelectedRecipe(recipe);
    setIsDialogOpen(true);
  };

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
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleViewRecipe(item)}
                >
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

      {/* Recipe Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">
              {selectedRecipe?.meal}: {selectedRecipe?.suggestion}
            </DialogTitle>
          </DialogHeader>
          
          {selectedRecipe && (
            <div className="space-y-6 py-4">
              {/* Recipe Meta Info */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{selectedRecipe.prepTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{selectedRecipe.servings} servings</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4" />
                  <span>{selectedRecipe.calories}</span>
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  Ingredients
                </h3>
                <ul className="space-y-2">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-accent mt-1">•</span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Instructions</h3>
                <ol className="space-y-3">
                  {selectedRecipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                        {index + 1}
                      </span>
                      <span className="pt-0.5">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Action Button */}
              <Button className="w-full" size="lg">
                Add to Meal Plan
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
