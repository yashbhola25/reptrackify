
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, History, LineChart, Dumbbell } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { mockWorkoutHistory } from '@/utils/workoutUtils';
import { formatTime } from '@/utils/workoutUtils';

const Index = () => {
  const navigate = useNavigate();
  const recentWorkouts = mockWorkoutHistory.slice(0, 3);

  return (
    <div className="bg-background min-h-screen pb-20">
      <header className="py-6 px-6">
        <h1 className="text-3xl font-bold text-foreground">Elevate</h1>
        <p className="text-muted-foreground">Track your fitness journey</p>
      </header>

      <section className="px-6 py-2 animate-fade-in">
        <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Start</h2>
          <button 
            onClick={() => navigate('/active-workout')}
            className="w-full btn-primary py-4 flex items-center justify-center space-x-2"
          >
            <PlusCircle size={20} />
            <span>Start Empty Workout</span>
          </button>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Routines</h2>
            <button 
              onClick={() => navigate('/routines')}
              className="text-primary hover:underline flex items-center"
            >
              <span>View All</span>
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => navigate('/routines/create')}
              className="bg-card rounded-xl p-4 flex flex-col items-center justify-center h-28 border border-border hover:border-primary/50 transition-all"
            >
              <Dumbbell size={24} className="text-primary mb-2" />
              <span className="text-foreground">New Routine</span>
            </button>
            
            <button 
              onClick={() => navigate('/routines')}
              className="bg-card rounded-xl p-4 flex flex-col items-center justify-center h-28 border border-border hover:border-primary/50 transition-all"
            >
              <History size={24} className="text-primary mb-2" />
              <span className="text-foreground">Browse</span>
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Recent Workouts</h2>
            <button 
              onClick={() => navigate('/progress')}
              className="text-primary hover:underline flex items-center"
            >
              <span>View All</span>
            </button>
          </div>
          
          {recentWorkouts.length > 0 ? (
            <div className="space-y-4">
              {recentWorkouts.map((workout) => (
                <div 
                  key={workout.id}
                  className="bg-card rounded-xl p-4 border border-border animate-fade-in"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{workout.name}</h3>
                    <span className="text-sm text-muted-foreground">
                      {new Date(workout.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex space-x-4 text-sm text-muted-foreground">
                    <div>
                      <LineChart size={16} className="inline mr-1" />
                      <span>{formatTime(workout.duration)}</span>
                    </div>
                    <div>
                      <Dumbbell size={16} className="inline mr-1" />
                      <span>{workout.exerciseSets.length} exercises</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-xl p-6 text-center border border-border">
              <Dumbbell size={32} className="mx-auto mb-3 text-muted-foreground" />
              <p className="text-muted-foreground">No workout history yet</p>
              <button 
                onClick={() => navigate('/active-workout')}
                className="mt-4 text-primary hover:underline"
              >
                Start your first workout
              </button>
            </div>
          )}
        </div>
      </section>
      
      <Navbar />
    </div>
  );
};

export default Index;
