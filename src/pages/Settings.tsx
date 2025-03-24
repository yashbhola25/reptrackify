
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Bell, Shield, HelpCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';

const Settings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast("Signed out successfully");
    } catch (error: any) {
      toast("Error signing out: " + error.message);
      console.error("Sign out error:", error);
    }
  };

  const settingsOptions = [
    { 
      icon: <User size={20} />, 
      title: 'Account Settings', 
      description: 'Manage your profile and preferences',
      onClick: () => {} 
    },
    { 
      icon: <Bell size={20} />, 
      title: 'Notifications', 
      description: 'Customize your notification preferences',
      onClick: () => {} 
    },
    { 
      icon: <Shield size={20} />, 
      title: 'Privacy & Security', 
      description: 'Manage your privacy and security settings',
      onClick: () => {} 
    },
    { 
      icon: <HelpCircle size={20} />, 
      title: 'Help & Support', 
      description: 'Get help and contact support',
      onClick: () => {} 
    },
  ];

  return (
    <div className="bg-background min-h-screen pb-20 animate-fade-in">
      <header className="py-6 px-6 mb-2">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
        {user && (
          <p className="mt-2 text-sm text-muted-foreground">
            Logged in as: {user.email}
          </p>
        )}
      </header>
      
      <div className="px-6 space-y-4">
        {settingsOptions.map((option, index) => (
          <button 
            key={index}
            onClick={option.onClick}
            className="w-full bg-card hover:bg-card/80 rounded-xl p-4 flex items-center text-left border border-border transition-colors"
          >
            <div className="bg-primary/10 p-2 rounded-full mr-4 text-primary">
              {option.icon}
            </div>
            <div>
              <h3 className="font-medium">{option.title}</h3>
              <p className="text-sm text-muted-foreground">{option.description}</p>
            </div>
          </button>
        ))}
        
        <Button 
          variant="destructive" 
          className="w-full mt-8" 
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
      
      <Navbar />
    </div>
  );
};

export default Settings;
