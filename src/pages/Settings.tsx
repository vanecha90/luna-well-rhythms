import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings as SettingsIcon, Bell, User, Shield, HelpCircle, LogOut, Eye, Edit2, Save, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const settingsSections = [
  {
    title: "Account",
    icon: User,
    items: ["Personal Information", "Cycle Settings", "Health Profile"],
  },
  {
    title: "Notifications",
    icon: Bell,
    items: ["Period Reminders", "Wellness Tips", "Daily Quotes"],
  },
  {
    title: "Privacy & Security",
    icon: Shield,
    items: ["Data Privacy", "Export Data", "Delete Account"],
  },
  {
    title: "Support",
    icon: HelpCircle,
    items: ["Help Center", "Contact Us", "About LunaWell"],
  },
];

export default function Settings() {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [showHoroscope, setShowHoroscope] = useState(() => {
    const saved = localStorage.getItem('showHoroscope');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Profile editing
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);

  // Cycle editing
  const [isEditingCycle, setIsEditingCycle] = useState(false);
  const [cycleLength, setCycleLength] = useState(28);
  const [periodDuration, setPeriodDuration] = useState(5);
  const [lastPeriodDate, setLastPeriodDate] = useState("");

  useEffect(() => {
    localStorage.setItem('showHoroscope', JSON.stringify(showHoroscope));
  }, [showHoroscope]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchCycleSettings();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user?.id)
      .maybeSingle();

    if (data) {
      setDisplayName(data.display_name || "");
    }
  };

  const fetchCycleSettings = async () => {
    const { data, error } = await supabase
      .from('cycle_settings')
      .select('*')
      .eq('user_id', user?.id)
      .maybeSingle();

    if (data) {
      setCycleLength(data.cycle_length || 28);
      setPeriodDuration(data.period_duration || 5);
      setLastPeriodDate(data.last_period_date || "");
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    const { error } = await supabase
      .from('profiles')
      .upsert({
        user_id: user?.id,
        display_name: displayName,
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      setIsEditingProfile(false);
    }
    setLoading(false);
  };

  const handleSaveCycle = async () => {
    setLoading(true);
    const { error } = await supabase
      .from('cycle_settings')
      .upsert({
        user_id: user?.id,
        cycle_length: cycleLength,
        period_duration: periodDuration,
        last_period_date: lastPeriodDate || null,
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update cycle settings",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Cycle settings updated successfully",
      });
      setIsEditingCycle(false);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pb-20 bg-gradient-dawn">
      {/* Header */}
      <div className="bg-gradient-sunset px-6 py-8 rounded-b-[2rem] shadow-glow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Settings</h1>
            <p className="text-white/90 text-sm">Manage your preferences</p>
          </div>
          <SettingsIcon className="h-8 w-8 text-white" />
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Profile Card */}
        <Card className="p-6 bg-card shadow-glow border-border">
          {isEditingProfile ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveProfile} disabled={loading} size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsEditingProfile(false);
                    fetchProfile();
                  }} 
                  size="sm"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-sunset flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground">{displayName || "Set your name"}</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsEditingProfile(true)}>
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          )}
        </Card>

        {/* Cycle Info */}
        <Card className="p-5 bg-gradient-moonlight shadow-glow border-0">
          <div className="text-white space-y-3">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Cycle Information</h3>
              {!isEditingCycle && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsEditingCycle(true)}
                  className="text-white hover:bg-white/20"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            {isEditingCycle ? (
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="cycleLength" className="text-white/80 text-sm">Average Cycle Length (days)</Label>
                  <Input
                    id="cycleLength"
                    type="number"
                    value={cycleLength}
                    onChange={(e) => setCycleLength(Number(e.target.value))}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="periodDuration" className="text-white/80 text-sm">Period Duration (days)</Label>
                  <Input
                    id="periodDuration"
                    type="number"
                    value={periodDuration}
                    onChange={(e) => setPeriodDuration(Number(e.target.value))}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lastPeriod" className="text-white/80 text-sm">Last Period Started</Label>
                  <Input
                    id="lastPeriod"
                    type="date"
                    value={lastPeriodDate}
                    onChange={(e) => setLastPeriodDate(e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button 
                    onClick={handleSaveCycle} 
                    disabled={loading}
                    size="sm"
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsEditingCycle(false);
                      fetchCycleSettings();
                    }}
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/20"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-white/80">Average Cycle Length:</span>
                  <span className="font-medium">{cycleLength} days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/80">Period Duration:</span>
                  <span className="font-medium">{periodDuration} days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/80">Last Period Started:</span>
                  <span className="font-medium">
                    {lastPeriodDate ? format(new Date(lastPeriodDate), "MMM dd, yyyy") : "Not set"}
                  </span>
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Display Preferences */}
        <div>
          <div className="flex items-center gap-2 mb-3 px-1">
            <Eye className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Display Preferences</h2>
          </div>
          <Card className="bg-card shadow-soft border-border">
            <div className="px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Show Horoscope</p>
                <p className="text-sm text-muted-foreground">Display daily horoscope on dashboard</p>
              </div>
              <Switch
                checked={showHoroscope}
                onCheckedChange={setShowHoroscope}
              />
            </div>
          </Card>
        </div>

        {/* Settings Sections */}
        {settingsSections.map((section) => (
          <div key={section.title}>
            <div className="flex items-center gap-2 mb-3 px-1">
              <section.icon className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
            </div>
            <Card className="divide-y divide-border bg-card shadow-soft border-border">
              {section.items.map((item, index) => (
                <button
                  key={item}
                  className="w-full px-5 py-4 text-left hover:bg-muted/50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  <span className="text-foreground">{item}</span>
                </button>
              ))}
            </Card>
          </div>
        ))}

        {/* Logout Button */}
        <Button variant="outline" size="lg" className="w-full" onClick={signOut}>
          <LogOut className="h-4 w-4 mr-2" />
          Log Out
        </Button>

        {/* App Version */}
        <p className="text-center text-sm text-muted-foreground py-4">
          LunaWell v1.0.0
        </p>
      </div>
    </div>
  );
}
