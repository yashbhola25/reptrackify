
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dumbbell, BarChart2, History, Settings } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border h-16 flex items-center justify-around px-4 z-50">
      <Link 
        to="/" 
        className={`flex flex-col items-center justify-center w-16 h-16 transition-all ${
          isActive('/') ? 'text-primary' : 'text-muted-foreground'
        }`}
      >
        <Dumbbell size={24} />
        <span className="text-xs mt-1">Workout</span>
      </Link>
      
      <Link 
        to="/routines" 
        className={`flex flex-col items-center justify-center w-16 h-16 transition-all ${
          isActive('/routines') ? 'text-primary' : 'text-muted-foreground'
        }`}
      >
        <History size={24} />
        <span className="text-xs mt-1">Routines</span>
      </Link>
      
      <Link 
        to="/progress" 
        className={`flex flex-col items-center justify-center w-16 h-16 transition-all ${
          isActive('/progress') ? 'text-primary' : 'text-muted-foreground'
        }`}
      >
        <BarChart2 size={24} />
        <span className="text-xs mt-1">Progress</span>
      </Link>
      
      <Link 
        to="/settings" 
        className={`flex flex-col items-center justify-center w-16 h-16 transition-all ${
          isActive('/settings') ? 'text-primary' : 'text-muted-foreground'
        }`}
      >
        <Settings size={24} />
        <span className="text-xs mt-1">Settings</span>
      </Link>
    </div>
  );
};

export default Navbar;
