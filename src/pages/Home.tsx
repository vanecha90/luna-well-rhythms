import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import moonPhasesImg from "@/assets/moon-phases.jpg";
import { Sparkles, Droplets, Sun, Heart, Stars } from "lucide-react";
import { useState, useEffect } from "react";

const zodiacSigns = [
  { name: "Aries", dates: "Mar 21 - Apr 19", message: "Your energy is magnetic today. Channel it into creative projects and bold decisions." },
  { name: "Taurus", dates: "Apr 20 - May 20", message: "Ground yourself in nature. Your patience will be rewarded with unexpected abundance." },
  { name: "Gemini", dates: "May 21 - Jun 20", message: "Communication flows effortlessly. Share your ideas and connect with kindred spirits." },
  { name: "Cancer", dates: "Jun 21 - Jul 22", message: "Trust your intuition deeply today. Your emotional wisdom is your superpower." },
  { name: "Leo", dates: "Jul 23 - Aug 22", message: "Shine bright and take center stage. Your confidence inspires those around you." },
  { name: "Virgo", dates: "Aug 23 - Sep 22", message: "Details matter today. Your meticulous approach leads to meaningful breakthroughs." },
  { name: "Libra", dates: "Sep 23 - Oct 22", message: "Balance is your strength. Harmonize work and rest for optimal wellbeing." },
  { name: "Scorpio", dates: "Oct 23 - Nov 21", message: "Transform challenges into opportunities. Your resilience knows no bounds." },
  { name: "Sagittarius", dates: "Nov 22 - Dec 21", message: "Adventure calls. Embrace new experiences and expand your horizons." },
  { name: "Capricorn", dates: "Dec 22 - Jan 19", message: "Your discipline pays off. Trust the process and celebrate small victories." },
  { name: "Aquarius", dates: "Jan 20 - Feb 18", message: "Innovation is in your nature. Think outside the box and inspire change." },
  { name: "Pisces", dates: "Feb 19 - Mar 20", message: "Dreams hold wisdom. Listen to your inner voice and creative impulses." },
];

export default function Home() {
  const [showHoroscope, setShowHoroscope] = useState(() => {
    const saved = localStorage.getItem('showHoroscope');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('showHoroscope');
      setShowHoroscope(saved !== null ? JSON.parse(saved) : true);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Simple example: show a random horoscope (in real app, would be user's sign)
  const todayHoroscope = zodiacSigns[Math.floor(Math.random() * zodiacSigns.length)];
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

        {/* Horoscope */}
        {showHoroscope && (
          <Card className="p-6 bg-gradient-moonlight shadow-glow border-0">
            <div className="flex items-start gap-3 mb-3">
              <Stars className="h-6 w-6 text-white flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-white">{todayHoroscope.name}</h3>
                <p className="text-sm text-white/70">{todayHoroscope.dates}</p>
              </div>
            </div>
            <p className="text-white/90 leading-relaxed">
              {todayHoroscope.message}
            </p>
          </Card>
        )}

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
                <img src={moonPhasesImg} alt="Moon" className="h-8 w-8 rounded-full object-cover" />
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
