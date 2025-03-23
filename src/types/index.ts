
export interface Exercise {
  id: string;
  name: string;
  category: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  equipment: string[];
  instructions: string;
  image: string;
}

export interface Set {
  id: string;
  weight: number;
  reps: number;
  completed: boolean;
  date: Date;
}

export interface ExerciseSet {
  id: string;
  exerciseId: string;
  sets: Set[];
  notes?: string;
}

export interface Workout {
  id: string;
  name: string;
  date: Date;
  duration: number; // in seconds
  exerciseSets: ExerciseSet[];
  notes?: string;
  completed: boolean;
}

export interface Routine {
  id: string;
  name: string;
  description: string;
  exercises: {
    exerciseId: string;
    suggestedSets: number;
    suggestedReps: number;
  }[];
}

export interface WorkoutHistory {
  date: Date;
  workouts: Workout[];
}

export interface ProgressData {
  exercise: Exercise;
  data: {
    date: Date;
    maxWeight: number;
    totalVolume: number; // weight * reps * sets
    sets: number;
  }[];
}
