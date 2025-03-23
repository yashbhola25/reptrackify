
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import WorkoutCard from '@/components/WorkoutCard';
import { mockRoutines } from '@/utils/workoutUtils';

const Routines = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-background min-h-screen pb-20 animate-fade-in">
      <header className="py-6 px-6 mb-2">
        <h1 className="text-3xl font-bold text-foreground">Routines</h1>
        <p className="text-muted-foreground">Create and manage your workouts</p>
      </header>
      
      <div className="px-6 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => navigate('/routines/create')}
            className="exercise-card flex flex-col items-center justify-center py-6 hover:scale-102 hover:shadow-md hover:shadow-primary/10 transition-all duration-300"
          >
            <div className="bg-primary/10 p-3 rounded-full mb-3">
              <Plus size={24} className="text-primary" />
            </div>
            <span className="text-foreground font-medium">New Routine</span>
          </button>
          
          <button className="exercise-card flex flex-col items-center justify-center py-6 hover:scale-102 hover:shadow-md hover:shadow-primary/10 transition-all duration-300">
            <div className="bg-primary/10 p-3 rounded-full mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-foreground font-medium">Explore</span>
          </button>
        </div>
      </div>
      
      <div className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">My Routines</h2>
          <span className="text-muted-foreground">({mockRoutines.length})</span>
        </div>
        
        <div className="space-y-4">
          {mockRoutines.map(routine => (
            <WorkoutCard key={routine.id} routine={routine} />
          ))}
        </div>
      </div>
      
      <Navbar />
    </div>
  );
};

export default Routines;
