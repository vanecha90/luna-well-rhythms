import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Calendar, Heart, AlertCircle, TrendingUp, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { format, addDays, differenceInDays, isSameDay, startOfDay } from "date-fns";
import { cn } from "@/lib/utils";

const moodOptions = ["Happy", "Sad", "Anxious", "Calm", "Irritable", "Energetic"];

export default function Cycle() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSymptomDialogOpen, setIsSymptomDialogOpen] = useState(false);
  const [cycleLength, setCycleLength] = useState(28);
  const [periodDuration, setPeriodDuration] = useState(5);
  const [lastPeriodDate, setLastPeriodDate] = useState<Date | null>(null);
  const [currentDay, setCurrentDay] = useState(1);
  const [currentPhase, setCurrentPhase] = useState("Follicular");
  
  // Symptom states
  const [mood, setMood] = useState("");
  const [energyLevel, setEnergyLevel] = useState([3]);
  const [cramps, setCramps] = useState(false);
  const [bloating, setBloating] = useState(false);
  const [headache, setHeadache] = useState(false);
  const [breastTenderness, setBreastTenderness] = useState(false);
  const [acne, setAcne] = useState(false);
  const [spotting, setSpotting] = useState(false);
  const [heavyFlow, setHeavyFlow] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (user) {
      fetchCycleSettings();
      fetchTodaySymptoms();
    }
  }, [user]);

  useEffect(() => {
    if (lastPeriodDate) {
      calculateCurrentDay();
    }
  }, [lastPeriodDate]);

  const fetchCycleSettings = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('cycle_settings')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching cycle settings:', error);
      return;
    }

    if (data) {
      setCycleLength(data.cycle_length || 28);
      setPeriodDuration(data.period_duration || 5);
      if (data.last_period_date) {
        setLastPeriodDate(new Date(data.last_period_date));
      }
    }
  };

  const fetchTodaySymptoms = async () => {
    if (!user) return;

    const today = format(new Date(), 'yyyy-MM-dd');
    const { data, error } = await supabase
      .from('symptom_logs')
      .select('*')
      .eq('user_id', user.id)
      .eq('date', today)
      .maybeSingle();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching symptoms:', error);
      return;
    }

    if (data) {
      setMood(data.mood || "");
      setEnergyLevel([data.energy_level || 3]);
      setCramps(data.cramps || false);
      setBloating(data.bloating || false);
      setHeadache(data.headache || false);
      setBreastTenderness(data.breast_tenderness || false);
      setAcne(data.acne || false);
      setSpotting(data.spotting || false);
      setHeavyFlow(data.heavy_flow || false);
      setNotes(data.notes || "");
    }
  };

  const calculateCurrentDay = () => {
    if (!lastPeriodDate) return;
    
    const today = startOfDay(new Date());
    const daysSinceLastPeriod = differenceInDays(today, startOfDay(lastPeriodDate));
    const day = (daysSinceLastPeriod % cycleLength) + 1;
    setCurrentDay(day);
    
    // Calculate phase
    if (day <= periodDuration) {
      setCurrentPhase("Menstrual");
    } else if (day <= cycleLength / 2 - 2) {
      setCurrentPhase("Follicular");
    } else if (day <= cycleLength / 2 + 2) {
      setCurrentPhase("Ovulatory");
    } else {
      setCurrentPhase("Luteal");
    }
  };

  const getDayType = (date: Date) => {
    if (!lastPeriodDate) return null;
    
    const daysSinceLastPeriod = differenceInDays(startOfDay(date), startOfDay(lastPeriodDate));
    const cycleDay = (daysSinceLastPeriod % cycleLength) + 1;
    
    if (cycleDay <= periodDuration) return "period";
    if (cycleDay >= cycleLength / 2 - 2 && cycleDay <= cycleLength / 2 + 2) return "ovulation";
    return "cycle";
  };

  const handleSaveSymptoms = async () => {
    if (!user) return;

    const today = format(new Date(), 'yyyy-MM-dd');
    const { error } = await supabase
      .from('symptom_logs')
      .upsert({
        user_id: user.id,
        date: today,
        mood,
        energy_level: energyLevel[0],
        cramps,
        bloating,
        headache,
        breast_tenderness: breastTenderness,
        acne,
        spotting,
        heavy_flow: heavyFlow,
        notes,
      }, {
        onConflict: 'user_id,date'
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save symptoms",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Symptoms saved successfully!",
    });

    setIsSymptomDialogOpen(false);
  };

  const phases = [
    { name: "Menstrual", days: `1-${periodDuration}`, color: "bg-destructive", description: "Rest and renewal" },
    { name: "Follicular", days: `${periodDuration + 1}-${Math.floor(cycleLength / 2) - 2}`, color: "bg-primary", description: "Rising energy" },
    { name: "Ovulatory", days: `${Math.floor(cycleLength / 2) - 2}-${Math.floor(cycleLength / 2) + 2}`, color: "bg-accent", description: "Peak vitality" },
    { name: "Luteal", days: `${Math.floor(cycleLength / 2) + 3}-${cycleLength}`, color: "bg-secondary", description: "Gradual wind down" },
  ];

  return (
    <div className="min-h-screen pb-20 bg-gradient-dawn">
      {/* Header */}
      <div className="bg-gradient-sunset px-6 py-8 rounded-b-[2rem] shadow-glow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Cycle Tracker</h1>
            <p className="text-white/90 text-sm">Day {currentDay} of {cycleLength}</p>
          </div>
          <Calendar className="h-8 w-8 text-white" />
        </div>
        
        {/* Progress Bar */}
        <div className="bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur">
          <div className="bg-white h-full rounded-full transition-all" style={{ width: `${(currentDay / cycleLength) * 100}%` }} />
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
              <h2 className="text-xl font-bold text-foreground mb-1">{currentPhase} Phase</h2>
              <p className="text-sm text-muted-foreground mb-3">Day {currentDay} of your cycle</p>
              <p className="text-sm text-foreground leading-relaxed">
                {currentPhase === "Menstrual" && "Rest and renewal time. Your body is shedding the uterine lining. Focus on gentle activities and self-care."}
                {currentPhase === "Follicular" && "Your estrogen levels are rising, bringing increased energy, creativity, and confidence. This is an ideal time for challenging workouts and social activities."}
                {currentPhase === "Ovulatory" && "Peak vitality and fertility. Your body is releasing an egg. You may feel more social and confident during this time."}
                {currentPhase === "Luteal" && "Gradual wind down. Progesterone rises after ovulation. Focus on nourishing activities and prepare for your next cycle."}
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
                className={`p-4 border-border ${phase.name === currentPhase ? 'ring-2 ring-primary shadow-glow' : 'shadow-soft'}`}
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
            <Button 
              size="sm" 
              onClick={() => setIsSymptomDialogOpen(true)}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Log Symptoms
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant={cramps ? "default" : "outline"}
              className="h-auto py-3"
              disabled
            >
              Cramps
            </Button>
            <Button
              variant={bloating ? "default" : "outline"}
              className="h-auto py-3"
              disabled
            >
              Bloating
            </Button>
            <Button
              variant={headache ? "default" : "outline"}
              className="h-auto py-3"
              disabled
            >
              Headache
            </Button>
            <Button
              variant={acne ? "default" : "outline"}
              className="h-auto py-3"
              disabled
            >
              Acne
            </Button>
          </div>
          {mood && (
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Mood: <span className="text-foreground font-medium">{mood}</span></p>
              <p className="text-sm text-muted-foreground">Energy: <span className="text-foreground font-medium">{energyLevel[0]}/5</span></p>
            </div>
          )}
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
          <Button variant="outline" size="lg" onClick={() => setIsCalendarOpen(true)}>
            View Calendar
          </Button>
          <Button variant="gradient" size="lg" onClick={() => setIsSymptomDialogOpen(true)}>
            Log Symptoms
          </Button>
        </div>
      </div>

      {/* Calendar Dialog */}
      <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <DialogContent className="max-w-fit">
          <DialogHeader>
            <DialogTitle>Cycle Calendar</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <CalendarComponent
              mode="single"
              className={cn("p-3 pointer-events-auto")}
              modifiers={{
                period: (date) => getDayType(date) === "period",
                ovulation: (date) => getDayType(date) === "ovulation",
              }}
              modifiersStyles={{
                period: {
                  backgroundColor: "hsl(var(--destructive))",
                  color: "white",
                  fontWeight: "bold",
                },
                ovulation: {
                  backgroundColor: "hsl(var(--accent))",
                  color: "white",
                  fontWeight: "bold",
                },
              }}
            />
            <div className="mt-4 space-y-2 px-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded-full bg-destructive"></div>
                <span className="text-muted-foreground">Period Days</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded-full bg-accent"></div>
                <span className="text-muted-foreground">Ovulation Window</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Symptom Log Dialog */}
      <Dialog open={isSymptomDialogOpen} onOpenChange={setIsSymptomDialogOpen}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Log Today's Symptoms</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Mood */}
            <div>
              <Label className="mb-2 block">Mood</Label>
              <div className="grid grid-cols-3 gap-2">
                {moodOptions.map((option) => (
                  <Button
                    key={option}
                    variant={mood === option ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMood(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>

            {/* Energy Level */}
            <div>
              <Label className="mb-2 block">Energy Level: {energyLevel[0]}/5</Label>
              <Slider
                value={energyLevel}
                onValueChange={setEnergyLevel}
                min={1}
                max={5}
                step={1}
                className="w-full"
              />
            </div>

            {/* Symptoms */}
            <div>
              <Label className="mb-3 block">Symptoms</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={cramps ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCramps(!cramps)}
                >
                  Cramps
                </Button>
                <Button
                  variant={bloating ? "default" : "outline"}
                  size="sm"
                  onClick={() => setBloating(!bloating)}
                >
                  Bloating
                </Button>
                <Button
                  variant={headache ? "default" : "outline"}
                  size="sm"
                  onClick={() => setHeadache(!headache)}
                >
                  Headache
                </Button>
                <Button
                  variant={breastTenderness ? "default" : "outline"}
                  size="sm"
                  onClick={() => setBreastTenderness(!breastTenderness)}
                >
                  Breast Tenderness
                </Button>
                <Button
                  variant={acne ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAcne(!acne)}
                >
                  Acne
                </Button>
                <Button
                  variant={spotting ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSpotting(!spotting)}
                >
                  Spotting
                </Button>
                <Button
                  variant={heavyFlow ? "default" : "outline"}
                  size="sm"
                  onClick={() => setHeavyFlow(!heavyFlow)}
                >
                  Heavy Flow
                </Button>
              </div>
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes" className="mb-2 block">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional notes about how you're feeling..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            {/* Save Button */}
            <Button className="w-full" onClick={handleSaveSymptoms}>
              Save Symptoms
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
