
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Routine } from '@/types';
import { exercises } from '@/data/exercises';
import { Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WorkoutCardProps {
  routine: Routine;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ routine }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleStartRoutine = () => {
    // Route to active workout with the routine data
    navigate('/active-workout', { 
      state: { routineId: routine.id, routineName: routine.name } 
    });
    
    toast({
      title: "Starting workout",
      description: `Starting ${routine.name} routine`,
    });
  };

  return (
    <div className="exercise-card animate-fade-in hover-scale">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground">{routine.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{routine.description}</p>
          
          <div className="text-sm text-muted-foreground space-y-1 mt-2 line-clamp-2">
            {routine.exercises.map((ex) => {
              const exercise = exercises.find(e => e.id === ex.exerciseId);
              return (
                <span key={ex.exerciseId}>
                  {exercise?.name}
                  {routine.exercises.indexOf(ex) < routine.exercises.length - 1 ? ', ' : ''}
                </span>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <button 
            className="text-xl text-muted-foreground hover:text-foreground"
            aria-label="More options"
          >
            •••
          </button>
        </div>
      </div>
      
      <button 
        onClick={handleStartRoutine}
        className="w-full btn-primary mt-4 flex items-center justify-center space-x-2"
      >
        <Play size={16} />
        <span>Start Routine</span>
      </button>
    </div>
  );
};

export default WorkoutCard;
