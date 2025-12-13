export interface Recipe {
  id: string;
  name: string;
  description: string;
  calories: string;
  prepTime: string;
  servings: string;
  phase: "menstrual" | "follicular" | "ovulatory" | "luteal";
  image?: string;
  ingredients: string[];
  instructions: string[];
}

export const phaseRecipes: Recipe[] = [
  // Menstrual Phase Recipes
  {
    id: "menstrual-1",
    name: "Iron-Rich Beef Stew",
    description: "Warm, comforting stew packed with iron to replenish nutrients",
    calories: "380 cal",
    prepTime: "45 mins",
    servings: "4",
    phase: "menstrual",
    ingredients: [
      "1 lb beef stew meat",
      "4 cups beef broth",
      "3 carrots, chopped",
      "2 potatoes, cubed",
      "1 onion, diced",
      "2 cloves garlic",
      "Fresh rosemary and thyme",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Brown beef in a large pot over medium-high heat",
      "Add onions and garlic, sauté until fragrant",
      "Pour in beef broth and bring to a boil",
      "Add carrots, potatoes, and herbs",
      "Reduce heat and simmer for 30-40 minutes",
      "Season to taste and serve warm"
    ]
  },
  {
    id: "menstrual-2",
    name: "Dark Chocolate Oatmeal",
    description: "Magnesium-rich breakfast to ease cramps and boost mood",
    calories: "320 cal",
    prepTime: "10 mins",
    servings: "1",
    phase: "menstrual",
    ingredients: [
      "1/2 cup rolled oats",
      "1 cup milk of choice",
      "1 tbsp dark cocoa powder",
      "1 tbsp maple syrup",
      "1/4 cup dark chocolate chips",
      "Banana slices for topping"
    ],
    instructions: [
      "Combine oats and milk in a saucepan",
      "Cook over medium heat, stirring occasionally",
      "Stir in cocoa powder and maple syrup",
      "Top with dark chocolate chips and banana",
      "Serve warm and enjoy"
    ]
  },
  {
    id: "menstrual-3",
    name: "Ginger Turmeric Soup",
    description: "Anti-inflammatory soup to soothe and comfort",
    calories: "180 cal",
    prepTime: "25 mins",
    servings: "2",
    phase: "menstrual",
    ingredients: [
      "2 cups vegetable broth",
      "1 inch fresh ginger, grated",
      "1 tsp turmeric powder",
      "1 cup coconut milk",
      "1 carrot, sliced",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Sauté ginger in a pot for 1 minute",
      "Add vegetable broth and turmeric",
      "Add carrots and simmer for 15 minutes",
      "Stir in coconut milk",
      "Season and serve warm"
    ]
  },

  // Follicular Phase Recipes
  {
    id: "follicular-1",
    name: "Green Power Smoothie Bowl",
    description: "Fresh, energizing bowl with leafy greens and berries",
    calories: "350 cal",
    prepTime: "10 mins",
    servings: "1",
    phase: "follicular",
    ingredients: [
      "1 cup spinach",
      "1/2 cup frozen berries",
      "1 banana",
      "2 tbsp chia seeds",
      "1 cup almond milk",
      "Toppings: granola, fresh berries, coconut"
    ],
    instructions: [
      "Blend spinach, berries, banana, and almond milk",
      "Pour into a bowl",
      "Top with chia seeds, granola, and fresh berries",
      "Add coconut flakes if desired",
      "Serve immediately"
    ]
  },
  {
    id: "follicular-2",
    name: "Grilled Salmon Salad",
    description: "Light, protein-rich salad with omega-3 fatty acids",
    calories: "420 cal",
    prepTime: "20 mins",
    servings: "2",
    phase: "follicular",
    ingredients: [
      "2 salmon fillets",
      "4 cups mixed greens",
      "1 avocado, sliced",
      "1/2 cup cherry tomatoes",
      "1/4 cup quinoa, cooked",
      "Lemon vinaigrette dressing"
    ],
    instructions: [
      "Season salmon with salt, pepper, and lemon",
      "Grill salmon for 4-5 minutes per side",
      "Arrange greens on plates",
      "Top with quinoa, avocado, and tomatoes",
      "Add grilled salmon and drizzle with dressing"
    ]
  },
  {
    id: "follicular-3",
    name: "Citrus Quinoa Bowl",
    description: "Bright, refreshing bowl with vitamin C boost",
    calories: "380 cal",
    prepTime: "15 mins",
    servings: "1",
    phase: "follicular",
    ingredients: [
      "1 cup cooked quinoa",
      "1 orange, segmented",
      "1/2 grapefruit, segmented",
      "1/4 cup pomegranate seeds",
      "Mint leaves",
      "Honey lime dressing"
    ],
    instructions: [
      "Place quinoa in a bowl",
      "Arrange citrus segments on top",
      "Sprinkle with pomegranate seeds",
      "Garnish with fresh mint",
      "Drizzle with honey lime dressing"
    ]
  },

  // Ovulatory Phase Recipes
  {
    id: "ovulatory-1",
    name: "Mediterranean Veggie Wrap",
    description: "Fiber-rich wrap with fresh vegetables and hummus",
    calories: "340 cal",
    prepTime: "10 mins",
    servings: "1",
    phase: "ovulatory",
    ingredients: [
      "1 whole wheat wrap",
      "3 tbsp hummus",
      "1/2 cup mixed greens",
      "1/4 cup cucumber, sliced",
      "1/4 cup tomatoes, diced",
      "2 tbsp feta cheese",
      "Olives (optional)"
    ],
    instructions: [
      "Spread hummus on the wrap",
      "Layer greens, cucumber, and tomatoes",
      "Sprinkle feta cheese and olives",
      "Roll tightly and slice in half",
      "Serve immediately"
    ]
  },
  {
    id: "ovulatory-2",
    name: "Cruciferous Stir-Fry",
    description: "Supports estrogen metabolism with broccoli and Brussels sprouts",
    calories: "290 cal",
    prepTime: "20 mins",
    servings: "2",
    phase: "ovulatory",
    ingredients: [
      "2 cups broccoli florets",
      "1 cup Brussels sprouts, halved",
      "1 cup bok choy",
      "2 cloves garlic",
      "2 tbsp soy sauce",
      "1 tbsp sesame oil"
    ],
    instructions: [
      "Heat sesame oil in a wok",
      "Add garlic and sauté for 30 seconds",
      "Add Brussels sprouts and cook 5 minutes",
      "Add broccoli and bok choy",
      "Stir-fry for 5-7 minutes",
      "Add soy sauce and serve"
    ]
  },
  {
    id: "ovulatory-3",
    name: "Berry Protein Smoothie",
    description: "High-energy smoothie for peak performance",
    calories: "310 cal",
    prepTime: "5 mins",
    servings: "1",
    phase: "ovulatory",
    ingredients: [
      "1 cup mixed berries",
      "1 scoop protein powder",
      "1 cup almond milk",
      "1 tbsp almond butter",
      "1/2 banana",
      "Ice cubes"
    ],
    instructions: [
      "Add all ingredients to a blender",
      "Blend until smooth",
      "Add more milk if needed for consistency",
      "Pour into a glass",
      "Enjoy immediately"
    ]
  },

  // Luteal Phase Recipes
  {
    id: "luteal-1",
    name: "Sweet Potato Buddha Bowl",
    description: "Complex carbs to stabilize mood and reduce cravings",
    calories: "420 cal",
    prepTime: "35 mins",
    servings: "2",
    phase: "luteal",
    ingredients: [
      "2 sweet potatoes, cubed",
      "1 can chickpeas, drained",
      "2 cups kale",
      "1/4 cup tahini",
      "1 lemon, juiced",
      "Olive oil, salt, pepper"
    ],
    instructions: [
      "Roast sweet potatoes at 400°F for 25 minutes",
      "Roast chickpeas with cumin for 15 minutes",
      "Massage kale with olive oil",
      "Assemble bowls with sweet potato, chickpeas, kale",
      "Drizzle with tahini lemon dressing"
    ]
  },
  {
    id: "luteal-2",
    name: "Magnesium Dark Chocolate Bites",
    description: "Healthy treats to satisfy cravings naturally",
    calories: "150 cal",
    prepTime: "15 mins",
    servings: "12",
    phase: "luteal",
    ingredients: [
      "1 cup dates, pitted",
      "1/2 cup almonds",
      "2 tbsp dark cocoa powder",
      "1 tbsp coconut oil",
      "Pinch of sea salt",
      "Dark chocolate for drizzling"
    ],
    instructions: [
      "Blend dates and almonds in food processor",
      "Add cocoa powder, coconut oil, and salt",
      "Roll into small balls",
      "Drizzle with melted dark chocolate",
      "Refrigerate for 30 minutes"
    ]
  },
  {
    id: "luteal-3",
    name: "Banana Oat Pancakes",
    description: "Serotonin-boosting breakfast with complex carbs",
    calories: "360 cal",
    prepTime: "15 mins",
    servings: "2",
    phase: "luteal",
    ingredients: [
      "2 ripe bananas",
      "1 cup rolled oats",
      "2 eggs",
      "1/2 tsp cinnamon",
      "1 tsp vanilla extract",
      "Maple syrup for topping"
    ],
    instructions: [
      "Blend oats into flour",
      "Mash bananas and mix with eggs",
      "Combine wet and dry ingredients",
      "Cook pancakes on medium heat",
      "Serve with maple syrup and fresh fruit"
    ]
  }
];

export const getRecipesByPhase = (phase: Recipe["phase"]) => {
  return phaseRecipes.filter(recipe => recipe.phase === phase);
};