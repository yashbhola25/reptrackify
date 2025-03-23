
import React, { useState } from 'react';
import { Exercise, Set as SetType } from '@/types';
import SetInput from './SetInput';
import { Timer, Plus, MoreVertical } from 'lucide-react';
import { generateSetId } from '@/utils/workoutUtils';

interface ExerciseItemProps {
  exercise: Exercise;
  sets: SetType[];
  onSetsChange: (sets: SetType[]) => void;
  onAddSet: () => void;
  onNotesChange?: (notes: string) => void;
  notes?: string;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({ 
  exercise, 
  sets, 
  onSetsChange, 
  onAddSet, 
  onNotesChange,
  notes = ''
}) => {
  const [isTimerActive, setIsTimerActive] = useState(false);
  
  const handleSetChange = (index: number, set: SetType) => {
    const newSets = [...sets];
    newSets[index] = set;
    onSetsChange(newSets);
  };
  
  const handleSetCompletion = (index: number, completed: boolean) => {
    const newSets = [...sets];
    newSets[index] = { ...newSets[index], completed };
    onSetsChange(newSets);
  };

  return (
    <div className="exercise-card">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-muted">
          {exercise.image ? (
            <img 
              src={exercise.image} 
              alt={exercise.name} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <Dumbbell size={20} />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="text-lg font-medium text-primary">{exercise.name}</h3>
            <button className="text-muted-foreground hover:text-foreground">
              <MoreVertical size={18} />
            </button>
          </div>
          
          <p className="text-sm text-muted-foreground">{exercise.primaryMuscles.join(', ')}</p>
          
          <div className="mt-2">
            <textarea 
              placeholder="Add notes here..."
              className="w-full bg-secondary text-sm p-2 rounded-md h-10 placeholder:text-muted-foreground resize-none"
              value={notes}
              onChange={(e) => onNotesChange && onNotesChange(e.target.value)}
            />
          </div>
          
          <div className="flex items-center mt-2 mb-3">
            <button 
              className={`flex items-center space-x-1 text-sm ${isTimerActive ? 'text-primary' : 'text-muted-foreground'}`}
              onClick={() => setIsTimerActive(!isTimerActive)}
            >
              <Timer size={16} />
              <span>Rest Timer: {isTimerActive ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-2">
        <div className="grid grid-cols-12 gap-2 py-2 px-1 text-sm font-medium text-muted-foreground">
          <div className="col-span-1">SET</div>
          <div className="col-span-3">PREVIOUS</div>
          {exercise.id !== 'pull-up' ? (
            <>
              <div className="col-span-3">KG</div>
              <div className="col-span-3">REPS</div>
            </>
          ) : (
            <div className="col-span-6">REPS</div>
          )}
          <div className="col-span-2"></div>
        </div>
        
        {sets.map((set, index) => (
          <SetInput 
            key={set.id}
            set={set}
            index={index}
            onChange={(updatedSet) => handleSetChange(index, updatedSet)}
            onComplete={(completed) => handleSetCompletion(index, completed)}
            showWeight={exercise.id !== 'pull-up'}
          />
        ))}
        
        <button 
          className="w-full py-3 mt-2 rounded-md bg-secondary text-foreground hover:bg-secondary/70 flex items-center justify-center space-x-2"
          onClick={onAddSet}
        >
          <Plus size={18} />
          <span>Add Set</span>
        </button>
      </div>
    </div>
  );
};

export default ExerciseItem;

// For TypeScript's sake, let's define a default import for icons that might be used
const Dumbbell = ({ size }: { size: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M6.5 6.5h11"></path>
    <path d="M6.5 17.5h11"></path>
    <path d="M6 10v4"></path>
    <path d="M18 10v4"></path>
    <path d="M4 18V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"></path>
  </svg>
);
