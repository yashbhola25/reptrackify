
import React from 'react';
import { Set } from '@/types';
import { Check } from 'lucide-react';

interface SetInputProps {
  set: Set;
  index: number;
  onChange: (set: Set) => void;
  onComplete: (completed: boolean) => void;
  showWeight?: boolean;
}

const SetInput: React.FC<SetInputProps> = ({ 
  set, 
  index, 
  onChange, 
  onComplete,
  showWeight = true
}) => {
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onChange({ ...set, weight: value });
  };
  
  const handleRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    onChange({ ...set, reps: value });
  };
  
  const toggleComplete = () => {
    onComplete(!set.completed);
  };

  return (
    <div className="grid grid-cols-12 gap-2 py-2 border-b border-border text-sm">
      <div className="col-span-1 flex items-center justify-start">
        <span className="font-medium">{index + 1}</span>
      </div>
      
      <div className="col-span-3 flex items-center justify-start text-muted-foreground">
        {index > 0 ? (
          <span>
            {showWeight ? `${set.weight}kg x ${set.reps}` : `x ${set.reps}`}
          </span>
        ) : (
          <span>-</span>
        )}
      </div>
      
      {showWeight && (
        <div className="col-span-3">
          <input
            type="number"
            value={set.weight || ''}
            onChange={handleWeightChange}
            className="w-full bg-secondary p-2 rounded-md text-center"
            placeholder="0"
          />
        </div>
      )}
      
      <div className={`${showWeight ? 'col-span-3' : 'col-span-6'}`}>
        <input
          type="number"
          value={set.reps || ''}
          onChange={handleRepsChange}
          className="w-full bg-secondary p-2 rounded-md text-center"
          placeholder="0"
        />
      </div>
      
      <div className="col-span-2 flex items-center justify-center">
        <button 
          onClick={toggleComplete}
          className={`w-8 h-8 rounded-md flex items-center justify-center transition-all ${
            set.completed 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-secondary text-muted-foreground'
          }`}
        >
          <Check size={16} />
        </button>
      </div>
    </div>
  );
};

export default SetInput;
