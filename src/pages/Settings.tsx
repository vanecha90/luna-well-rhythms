import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon, Bell, User, Shield, HelpCircle, LogOut, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

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
  const { signOut } = useAuth();
  const [showHoroscope, setShowHoroscope] = useState(() => {
    const saved = localStorage.getItem('showHoroscope');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('showHoroscope', JSON.stringify(showHoroscope));
  }, [showHoroscope]);

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
              <h2 className="text-xl font-bold text-foreground">Sarah Johnson</h2>
              <p className="text-sm text-muted-foreground">sarah.j@email.com</p>
            </div>
            <Button variant="outline" size="sm">Edit</Button>
          </div>
        </Card>

        {/* Cycle Info */}
        <Card className="p-5 bg-gradient-moonlight shadow-glow border-0">
          <div className="text-white space-y-2">
            <h3 className="font-semibold mb-3">Cycle Information</h3>
            <div className="flex justify-between text-sm">
              <span className="text-white/80">Average Cycle Length:</span>
              <span className="font-medium">28 days</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/80">Period Duration:</span>
              <span className="font-medium">5 days</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/80">Last Period Started:</span>
              <span className="font-medium">Dec 15, 2024</span>
            </div>
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
