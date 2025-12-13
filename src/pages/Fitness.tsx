import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Activity, TrendingUp, Zap, Heart, Clock, Flame, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export interface Workout {
  name: string;
  duration: number;
  intensity: "High" | "Low" | "Medium";
  calories: number;
  recommended: boolean;
  description: string;
  exercises: string[];
}

export const workouts: Workout[] = [
  {
    name: "HIIT training",
    duration: 30,
    intensity: "High",
    calories: 350,
    recommended: true,
    description: "Perfect for your current phase",
    exercises: [
      "Jumping jacks - 1 min",
      "Burpees - 45 sec",
      "High knees - 1 min",
      "Mountain climbers - 45 sec",
      "Rest - 30 sec",
      "Repeat 4 times"
    ]
  },
  {
    name: "Gentle yoga",
    duration: 45,
    intensity: "Low",
    calories: 180,
    recommended: false,
    description: "Gentle stretching and mindfulness",
    exercises: [
      "Sun Salutation A - 5 rounds",
      "Warrior sequence - 10 min",
      "Hip openers - 10 min",
      "Seated forward folds - 5 min",
      "Savasana - 10 min"
    ]
  },
  {
    name: "Strength training",
    duration: 40,
    intensity: "High",
    calories: 300,
    recommended: true,
    description: "Build muscle during peak energy",
    exercises: [
      "Squats - 3 sets of 12",
      "Push-ups - 3 sets of 10",
      "Lunges - 3 sets of 12 each leg",
      "Plank - 3 sets of 45 sec",
      "Dumbbell rows - 3 sets of 12"
    ]
  },
  {
    name: "Running",
    duration: 30,
    intensity: "High",
    calories: 320,
    recommended: true,
    description: "Cardio for endurance and energy",
    exercises: [
      "Warm-up walk - 5 min",
      "Easy jog - 5 min",
      "Moderate pace run - 15 min",
      "Cool-down jog - 3 min",
      "Stretching - 2 min"
    ]
  },
  {
    name: "Dance cardio",
    duration: 35,
    intensity: "High",
    calories: 280,
    recommended: true,
    description: "Fun, energetic dance workout",
    exercises: [
      "Warm-up moves - 5 min",
      "High-energy dance sequence - 10 min",
      "Latin-inspired moves - 10 min",
      "Cool-down groove - 5 min",
      "Stretching - 5 min"
    ]
  },
  {
    name: "Light stretching",
    duration: 20,
    intensity: "Low",
    calories: 80,
    recommended: false,
    description: "Gentle stretches for recovery",
    exercises: [
      "Neck rolls - 2 min",
      "Shoulder stretches - 3 min",
      "Hip flexor stretch - 4 min",
      "Hamstring stretch - 4 min",
      "Full body stretch - 7 min"
    ]
  },
  {
    name: "Slow walks",
    duration: 30,
    intensity: "Low",
    calories: 100,
    recommended: false,
    description: "Easy walking for gentle movement",
    exercises: [
      "Leisurely walk at comfortable pace",
      "Focus on deep breathing",
      "Enjoy nature or listen to calming music",
      "Optional light arm movements"
    ]
  },
  {
    name: "Restorative pilates",
    duration: 40,
    intensity: "Low",
    calories: 150,
    recommended: false,
    description: "Gentle core and flexibility work",
    exercises: [
      "Breathing exercises - 5 min",
      "Pelvic tilts - 5 min",
      "Gentle leg circles - 10 min",
      "Spine stretches - 10 min",
      "Relaxation - 10 min"
    ]
  },
  {
    name: "High-intensity cardio",
    duration: 25,
    intensity: "High",
    calories: 380,
    recommended: true,
    description: "Maximum effort cardio session",
    exercises: [
      "Jump rope - 3 min",
      "Box jumps - 2 min",
      "Sprint intervals - 10 min",
      "Burpee variations - 5 min",
      "Cool-down - 5 min"
    ]
  },
  {
    name: "Power yoga",
    duration: 50,
    intensity: "Medium",
    calories: 250,
    recommended: true,
    description: "Challenging yoga for strength",
    exercises: [
      "Dynamic sun salutations - 10 min",
      "Warrior flow - 15 min",
      "Arm balances - 10 min",
      "Core work - 10 min",
      "Savasana - 5 min"
    ]
  },
  {
    name: "Swimming",
    duration: 45,
    intensity: "Medium",
    calories: 350,
    recommended: true,
    description: "Full-body low-impact workout",
    exercises: [
      "Warm-up laps - 5 min",
      "Freestyle - 15 min",
      "Backstroke - 10 min",
      "Breaststroke - 10 min",
      "Cool-down - 5 min"
    ]
  },
  {
    name: "Cycling",
    duration: 40,
    intensity: "Medium",
    calories: 320,
    recommended: true,
    description: "Great cardio for leg strength",
    exercises: [
      "Easy warm-up ride - 5 min",
      "Moderate pace - 15 min",
      "Hill intervals - 10 min",
      "Recovery ride - 5 min",
      "Cool-down - 5 min"
    ]
  },
  {
    name: "Barre",
    duration: 50,
    intensity: "Medium",
    calories: 280,
    recommended: true,
    description: "Ballet-inspired toning workout",
    exercises: [
      "Warm-up - 5 min",
      "Arm series - 10 min",
      "Thigh work at barre - 15 min",
      "Core exercises - 10 min",
      "Stretching - 10 min"
    ]
  },
  {
    name: "Boxing",
    duration: 35,
    intensity: "High",
    calories: 400,
    recommended: true,
    description: "High-energy punching workout",
    exercises: [
      "Jump rope warm-up - 5 min",
      "Jab-cross combinations - 10 min",
      "Hook and uppercut drills - 10 min",
      "Bag work intervals - 5 min",
      "Core and cool-down - 5 min"
    ]
  },
  {
    name: "Moderate strength training",
    duration: 35,
    intensity: "Medium",
    calories: 250,
    recommended: true,
    description: "Balanced strength work",
    exercises: [
      "Goblet squats - 3 sets of 10",
      "Dumbbell press - 3 sets of 10",
      "Bent-over rows - 3 sets of 10",
      "Deadlifts - 3 sets of 8",
      "Plank holds - 3 sets of 30 sec"
    ]
  },
  {
    name: "Group fitness classes",
    duration: 45,
    intensity: "High",
    calories: 350,
    recommended: true,
    description: "Energetic group workout",
    exercises: [
      "Warm-up - 5 min",
      "Cardio intervals - 15 min",
      "Strength circuits - 15 min",
      "Core work - 5 min",
      "Stretch and cool-down - 5 min"
    ]
  }
];

export default function Fitness() {
  const location = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [steps, setSteps] = useState(0);
  const [calories, setCalories] = useState(0);
  const [avgHeartRate, setAvgHeartRate] = useState(0);
  const [isTrackingDialogOpen, setIsTrackingDialogOpen] = useState(false);
  const [isWorkoutDialogOpen, setIsWorkoutDialogOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [trackingType, setTrackingType] = useState<'steps' | 'calories'>('steps');
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (location.state?.selectedWorkout) {
      const workout = workouts.find(w => 
        w.name.toLowerCase() === location.state.selectedWorkout.toLowerCase()
      );
      if (workout) {
        setSelectedWorkout(workout);
        setIsWorkoutDialogOpen(true);
      }
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    if (user) {
      fetchTodayTracking();
    }
  }, [user]);

  const fetchTodayTracking = async () => {
    if (!user) return;

    const today = format(new Date(), 'yyyy-MM-dd');
    const { data, error } = await supabase
      .from('fitness_tracking')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', today)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching tracking:', error);
      return;
    }

    if (data) {
      setSteps(data.steps || 0);
      setCalories(data.calories_burned || 0);
      setAvgHeartRate(data.avg_heart_rate || 0);
    }
  };

  const handleUpdateTracking = async () => {
    if (!user || !inputValue) return;

    const today = format(new Date(), 'yyyy-MM-dd');
    const value = parseInt(inputValue);

    if (isNaN(value)) {
      toast({
        title: "Invalid input",
        description: "Please enter a valid number",
        variant: "destructive",
      });
      return;
    }

    const updateData = trackingType === 'steps' 
      ? { steps: value }
      : { calories_burned: value };

    const { error } = await supabase
      .from('fitness_tracking')
      .upsert({
        user_id: user.id,
        date: today,
        ...updateData,
      }, {
        onConflict: 'user_id,date'
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update tracking",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: `${trackingType === 'steps' ? 'Steps' : 'Calories'} updated!`,
    });

    setIsTrackingDialogOpen(false);
    setInputValue("");
    fetchTodayTracking();
  };

  const handleStartWorkout = async (workout: typeof workouts[0]) => {
    setSelectedWorkout(workout);
    setIsWorkoutDialogOpen(true);
  };

  const handleCompleteWorkout = async () => {
    if (!user || !selectedWorkout) return;

    const { error } = await supabase
      .from('workout_logs')
      .insert({
        user_id: user.id,
        workout_name: selectedWorkout.name,
        duration_minutes: selectedWorkout.duration,
        intensity: selectedWorkout.intensity,
        calories_burned: selectedWorkout.calories,
        description: selectedWorkout.description,
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to log workout",
        variant: "destructive",
      });
      return;
    }

    // Update calories in tracking
    const today = format(new Date(), 'yyyy-MM-dd');
    await supabase
      .from('fitness_tracking')
      .upsert({
        user_id: user.id,
        date: today,
        calories_burned: calories + selectedWorkout.calories,
      }, {
        onConflict: 'user_id,date'
      });

    toast({
      title: "Workout Complete!",
      description: `Great job completing ${selectedWorkout.name}`,
    });

    setIsWorkoutDialogOpen(false);
    setSelectedWorkout(null);
    fetchTodayTracking();
  };

  const openTrackingDialog = (type: 'steps' | 'calories') => {
    setTrackingType(type);
    setInputValue("");
    setIsTrackingDialogOpen(true);
  };

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
          <Card 
            className="p-4 bg-card shadow-soft border-border text-center cursor-pointer hover:shadow-glow transition-shadow"
            onClick={() => openTrackingDialog('steps')}
          >
            <TrendingUp className="h-5 w-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{steps.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Steps</p>
            <Plus className="h-4 w-4 text-primary mx-auto mt-1" />
          </Card>
          <Card 
            className="p-4 bg-card shadow-soft border-border text-center cursor-pointer hover:shadow-glow transition-shadow"
            onClick={() => openTrackingDialog('calories')}
          >
            <Zap className="h-5 w-5 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{calories}</p>
            <p className="text-xs text-muted-foreground">Calories</p>
            <Plus className="h-4 w-4 text-accent mx-auto mt-1" />
          </Card>
          <Card className="p-4 bg-card shadow-soft border-border text-center">
            <Heart className="h-5 w-5 text-destructive mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{avgHeartRate || '--'}</p>
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
                    <span>{workout.duration} min</span>
                    <span>•</span>
                    <span>{workout.calories} cal</span>
                  </div>
                  <Button 
                    variant={workout.recommended ? "gradient" : "outline"} 
                    size="sm"
                    onClick={() => handleStartWorkout(workout)}
                  >
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

      {/* Tracking Dialog */}
      <Dialog open={isTrackingDialogOpen} onOpenChange={setIsTrackingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Update {trackingType === 'steps' ? 'Steps' : 'Calories'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="value">
                {trackingType === 'steps' ? 'Number of Steps' : 'Calories Burned'}
              </Label>
              <Input
                id="value"
                type="number"
                placeholder={trackingType === 'steps' ? 'e.g. 10000' : 'e.g. 500'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="mt-2"
              />
            </div>
            <Button className="w-full" onClick={handleUpdateTracking}>
              Update {trackingType === 'steps' ? 'Steps' : 'Calories'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Workout Details Dialog */}
      <Dialog open={isWorkoutDialogOpen} onOpenChange={setIsWorkoutDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">
              {selectedWorkout?.name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedWorkout && (
            <div className="space-y-6 py-4">
              {/* Workout Meta Info */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{selectedWorkout.duration} minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4" />
                  <span>{selectedWorkout.calories} calories</span>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  selectedWorkout.intensity === 'High' 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-secondary/10 text-secondary'
                }`}>
                  {selectedWorkout.intensity}
                </span>
              </div>

              {/* Description */}
              <div>
                <p className="text-muted-foreground">{selectedWorkout.description}</p>
              </div>

              {/* Exercises */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Exercises
                </h3>
                <ol className="space-y-3">
                  {selectedWorkout.exercises.map((exercise, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold">
                        {index + 1}
                      </span>
                      <span className="pt-0.5">{exercise}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={() => setIsWorkoutDialogOpen(false)}>
                  Close
                </Button>
                <Button onClick={handleCompleteWorkout}>
                  Complete Workout
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
