import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon, Bell, User, Shield, HelpCircle, LogOut, Eye, Edit2, Save, X, Heart } from "lucide-react";
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
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);

  // Cycle editing
  const [cycleLength, setCycleLength] = useState(28);
  const [periodDuration, setPeriodDuration] = useState(5);
  const [lastPeriodDate, setLastPeriodDate] = useState("");

  // Health Profile
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bloodType, setBloodType] = useState("");

  // Notifications
  const [periodReminders, setPeriodReminders] = useState(true);
  const [wellnessTips, setWellnessTips] = useState(true);
  const [dailyQuotes, setDailyQuotes] = useState(true);
  const [reminderDaysBefore, setReminderDaysBefore] = useState(2);

  useEffect(() => {
    localStorage.setItem('showHoroscope', JSON.stringify(showHoroscope));
  }, [showHoroscope]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchCycleSettings();
      fetchNotificationSettings();
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

  const fetchNotificationSettings = async () => {
    const { data, error } = await supabase
      .from('notification_settings')
      .select('*')
      .eq('user_id', user?.id)
      .maybeSingle();

    if (data) {
      setPeriodReminders(data.period_reminders);
      setWellnessTips(data.wellness_tips);
      setDailyQuotes(data.daily_quotes);
      setReminderDaysBefore(data.reminder_days_before || 2);
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
    }
    setLoading(false);
  };

  const handleSaveNotifications = async () => {
    setLoading(true);
    const { error } = await supabase
      .from('notification_settings')
      .upsert({
        user_id: user?.id,
        period_reminders: periodReminders,
        wellness_tips: wellnessTips,
        daily_quotes: dailyQuotes,
        reminder_days_before: reminderDaysBefore,
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update notification settings",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Notification settings updated successfully",
      });
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
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-sunset flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">{displayName || "Set your name"}</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </Card>

        {/* Account Settings Tabs */}
        <div>
          <div className="flex items-center gap-2 mb-3 px-1">
            <User className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Account</h2>
          </div>
          <Card className="bg-card shadow-soft border-border p-4">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="cycle">Cycle Settings</TabsTrigger>
                <TabsTrigger value="health">Health Profile</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="displayName">Display Name</Label>
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <Button onClick={handleSaveProfile} disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </TabsContent>

              <TabsContent value="cycle" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="cycleLength">Average Cycle Length (days)</Label>
                  <Input
                    id="cycleLength"
                    type="number"
                    value={cycleLength}
                    onChange={(e) => setCycleLength(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="periodDuration">Period Duration (days)</Label>
                  <Input
                    id="periodDuration"
                    type="number"
                    value={periodDuration}
                    onChange={(e) => setPeriodDuration(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastPeriod">Last Period Started</Label>
                  <Input
                    id="lastPeriod"
                    type="date"
                    value={lastPeriodDate}
                    onChange={(e) => setLastPeriodDate(e.target.value)}
                  />
                </div>
                <Button onClick={handleSaveCycle} disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </TabsContent>

              <TabsContent value="health" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Enter your height"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Enter your weight"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Blood Type</Label>
                  <Input
                    id="bloodType"
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                    placeholder="e.g., A+, O-, B+"
                  />
                </div>
                <Button disabled>
                  <Heart className="h-4 w-4 mr-2" />
                  Coming Soon
                </Button>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Notifications & Reminders */}
        <div>
          <div className="flex items-center gap-2 mb-3 px-1">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Notifications & Reminders</h2>
          </div>
          <Card className="bg-card shadow-soft border-border divide-y divide-border">
            <div className="px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Period Reminders</p>
                <p className="text-sm text-muted-foreground">Get notified before your period starts</p>
              </div>
              <Switch
                checked={periodReminders}
                onCheckedChange={setPeriodReminders}
              />
            </div>
            <div className="px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Wellness Tips</p>
                <p className="text-sm text-muted-foreground">Daily wellness and health tips</p>
              </div>
              <Switch
                checked={wellnessTips}
                onCheckedChange={setWellnessTips}
              />
            </div>
            <div className="px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Daily Quotes</p>
                <p className="text-sm text-muted-foreground">Inspirational quotes each day</p>
              </div>
              <Switch
                checked={dailyQuotes}
                onCheckedChange={setDailyQuotes}
              />
            </div>
            <div className="px-5 py-4 space-y-3">
              <div>
                <Label htmlFor="reminderDays">Remind me (days before period)</Label>
                <Input
                  id="reminderDays"
                  type="number"
                  min="1"
                  max="7"
                  value={reminderDaysBefore}
                  onChange={(e) => setReminderDaysBefore(Number(e.target.value))}
                  className="mt-2"
                />
              </div>
              <Button onClick={handleSaveNotifications} disabled={loading} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Notification Settings
              </Button>
            </div>
          </Card>
        </div>

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

        {/* Privacy & Security */}
        <div>
          <div className="flex items-center gap-2 mb-3 px-1">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Privacy & Security</h2>
          </div>
          <Card className="divide-y divide-border bg-card shadow-soft border-border">
            <button className="w-full px-5 py-4 text-left hover:bg-muted/50 transition-colors first:rounded-t-lg">
              <span className="text-foreground">Data Privacy</span>
            </button>
            <button className="w-full px-5 py-4 text-left hover:bg-muted/50 transition-colors">
              <span className="text-foreground">Export Data</span>
            </button>
            <button className="w-full px-5 py-4 text-left hover:bg-muted/50 transition-colors last:rounded-b-lg">
              <span className="text-foreground">Delete Account</span>
            </button>
          </Card>
        </div>

        {/* Support */}
        <div>
          <div className="flex items-center gap-2 mb-3 px-1">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Support</h2>
          </div>
          <Card className="divide-y divide-border bg-card shadow-soft border-border">
            <button className="w-full px-5 py-4 text-left hover:bg-muted/50 transition-colors first:rounded-t-lg">
              <span className="text-foreground">Help Center</span>
            </button>
            <button className="w-full px-5 py-4 text-left hover:bg-muted/50 transition-colors">
              <span className="text-foreground">Contact Us</span>
            </button>
            <button className="w-full px-5 py-4 text-left hover:bg-muted/50 transition-colors last:rounded-b-lg">
              <span className="text-foreground">About LunaWell</span>
            </button>
          </Card>
        </div>

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
