
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Timer, X, Plus } from 'lucide-react';
import { 
  createEmptyWorkout, 
  createNewExerciseSet, 
  generateSetId
} from '@/utils/workoutUtils';
import { Workout, Exercise, ExerciseSet, Set } from '@/types';
import { exercises } from '@/data/exercises';
import ExerciseItem from '@/components/ExerciseItem';
import { toast } from '@/hooks/use-toast';

const ActiveWorkout = () => {
  const navigate = useNavigate();
  const [workout, setWorkout] = useState<Workout>(createEmptyWorkout());
  const [duration, setDuration] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showExerciseSearch, setShowExerciseSearch] = useState<boolean>(false);
  
  // Timer for workout duration
  useEffect(() => {
    const timer = setInterval(() => {
      setDuration(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}${remainingSeconds < 10 ? 's' : `m ${remainingSeconds}s`}`;
  };
  
  const handleAddExercise = (exercise: Exercise) => {
    setWorkout(prev => {
      const newExerciseSet = createNewExerciseSet(exercise.id);
      return {
        ...prev,
        exerciseSets: [...prev.exerciseSets, newExerciseSet]
      };
    });
    setShowExerciseSearch(false);
    toast({
      title: "Exercise added",
      description: `${exercise.name} has been added to your workout`,
    });
  };
  
  const handleSetsChange = (exerciseSetId: string, sets: Set[]) => {
    setWorkout(prev => {
      const updatedExerciseSets = prev.exerciseSets.map(es => 
        es.id === exerciseSetId ? { ...es, sets } : es
      );
      return {
        ...prev,
        exerciseSets: updatedExerciseSets
      };
    });
  };
  
  const handleAddSet = (exerciseSetId: string) => {
    setWorkout(prev => {
      const updatedExerciseSets = prev.exerciseSets.map(es => {
        if (es.id === exerciseSetId) {
          // Copy the previous set if it exists
          const lastSet = es.sets[es.sets.length - 1];
          const newSet: Set = {
            id: generateSetId(),
            weight: lastSet?.weight || 0,
            reps: lastSet?.reps || 0,
            completed: false,
            date: new Date()
          };
          return {
            ...es,
            sets: [...es.sets, newSet]
          };
        }
        return es;
      });
      return {
        ...prev,
        exerciseSets: updatedExerciseSets
      };
    });
  };
  
  const handleNotesChange = (exerciseSetId: string, notes: string) => {
    setWorkout(prev => {
      const updatedExerciseSets = prev.exerciseSets.map(es => 
        es.id === exerciseSetId ? { ...es, notes } : es
      );
      return {
        ...prev,
        exerciseSets: updatedExerciseSets
      };
    });
  };

  const handleFinishWorkout = () => {
    if (workout.exerciseSets.length === 0) {
      toast({
        title: "Cannot finish empty workout",
        description: "Add at least one exercise before finishing",
        variant: "destructive"
      });
      return;
    }
    
    setWorkout(prev => ({
      ...prev,
      completed: true,
      duration
    }));
    
    toast({
      title: "Workout completed",
      description: "Your workout has been saved successfully",
    });
    
    navigate('/');
  };
  
  const handleDiscardWorkout = () => {
    if (workout.exerciseSets.length > 0) {
      if (confirm("Are you sure you want to discard this workout?")) {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  const filteredExercises = exercises.filter(exercise => 
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.primaryMuscles.some(muscle => 
      muscle.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  
  if (showExerciseSearch) {
    return (
      <div className="bg-background min-h-screen animate-fade-in">
        <header className="flex items-center justify-between p-4 border-b border-border">
          <button 
            onClick={() => setShowExerciseSearch(false)}
            className="text-foreground"
          >
            Cancel
          </button>
          <h1 className="text-lg font-medium">Add Exercise</h1>
          <button 
            onClick={() => setShowExerciseSearch(false)}
            className="text-primary"
          >
            Done
          </button>
        </header>
        
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search exercise"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-card p-3 pl-10 rounded-lg mb-4"
            />
            <svg className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <div className="flex space-x-2 mb-4">
            <button className="bg-card px-4 py-2 rounded-lg text-foreground">
              All Equipment
            </button>
            <button className="bg-card px-4 py-2 rounded-lg text-foreground">
              All Muscles
            </button>
          </div>
          
          <h2 className="text-lg font-medium mb-3">Recent Exercises</h2>
          
          <div className="space-y-3">
            {filteredExercises.map(exercise => (
              <div 
                key={exercise.id}
                className="flex items-center p-3 bg-card rounded-lg border border-border hover:border-primary/50"
                onClick={() => handleAddExercise(exercise)}
              >
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted mr-3">
                  {exercise.image ? (
                    <img 
                      src={exercise.image} 
                      alt={exercise.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.5 6.5h11M6.5 17.5h11M6 10v4M18 10v4M4 18V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="font-medium">{exercise.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {exercise.primaryMuscles.join(', ')}
                  </p>
                </div>
                
                <div className="ml-auto">
                  <LineChart size={20} className="text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-background min-h-screen pb-20 animate-fade-in">
      <header className="flex items-center justify-between p-4 border-b border-border relative">
        <button 
          onClick={() => navigate('/')}
          className="text-foreground p-1"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
          <span className="text-lg">Log Workout</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Timer size={20} className="text-primary" />
            <span className="text-foreground text-lg">{formatDuration(duration)}</span>
          </div>
          <button 
            onClick={handleFinishWorkout}
            className="bg-primary text-white px-4 py-1.5 rounded-lg"
          >
            Finish
          </button>
        </div>
      </header>
      
      <div className="p-4 border-b border-border flex justify-between text-sm">
        <div>
          <span className="text-muted-foreground">Duration</span>
          <p className="text-primary">{formatDuration(duration)}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Volume</span>
          <p className="text-foreground">0 kg</p>
        </div>
        <div>
          <span className="text-muted-foreground">Sets</span>
          <p className="text-foreground">{workout.exerciseSets.reduce((acc, es) => acc + es.sets.length, 0)}</p>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        {workout.exerciseSets.length > 0 ? (
          workout.exerciseSets.map(exerciseSet => {
            const exercise = exercises.find(e => e.id === exerciseSet.exerciseId);
            if (!exercise) return null;
            
            return (
              <ExerciseItem
                key={exerciseSet.id}
                exercise={exercise}
                sets={exerciseSet.sets}
                onSetsChange={(sets) => handleSetsChange(exerciseSet.id, sets)}
                onAddSet={() => handleAddSet(exerciseSet.id)}
                onNotesChange={(notes) => handleNotesChange(exerciseSet.id, notes)}
                notes={exerciseSet.notes}
              />
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 mb-4 text-muted-foreground">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5 6.5h11M6.5 17.5h11M6 10v4M18 10v4M4 18V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Get started</h2>
            <p className="text-muted-foreground mb-8">Add an exercise to start your workout</p>
            
            <button 
              onClick={() => setShowExerciseSearch(true)}
              className="btn-primary py-4 px-10 flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Add Exercise</span>
            </button>
          </div>
        )}
        
        {workout.exerciseSets.length > 0 && (
          <button 
            onClick={() => setShowExerciseSearch(true)}
            className="w-full btn-primary py-4 flex items-center justify-center space-x-2 animate-fade-in"
          >
            <Plus size={20} />
            <span>Add Exercise</span>
          </button>
        )}
        
        {workout.exerciseSets.length > 0 && (
          <div className="flex space-x-4 mt-4 animate-fade-in">
            <button className="flex-1 btn-secondary">
              Settings
            </button>
            <button 
              className="flex-1 text-destructive bg-secondary/80 rounded-lg py-3"
              onClick={handleDiscardWorkout}
            >
              Discard Workout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Mock component for TypeScript's sake
const LineChart = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M3 3v18h18"></path>
    <path d="m19 9-5 5-4-4-3 3"></path>
  </svg>
);

export default ActiveWorkout;
