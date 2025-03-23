
import { ExerciseSet, Set, Workout } from "@/types";

export const calculateVolume = (sets: Set[]): number => {
  return sets.reduce((total, set) => {
    return total + (set.weight * set.reps);
  }, 0);
};

export const calculateTotalVolume = (workout: Workout): number => {
  return workout.exerciseSets.reduce((total, exerciseSet) => {
    return total + calculateVolume(exerciseSet.sets);
  }, 0);
};

export const findMaxWeight = (sets: Set[]): number => {
  if (sets.length === 0) return 0;
  return Math.max(...sets.map(set => set.weight));
};

export const formatTime = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`;
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes < 60) {
    return remainingSeconds > 0 
      ? `${minutes}m ${remainingSeconds}s` 
      : `${minutes}m`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  return `${hours}h ${remainingMinutes}m`;
};

export const generateWorkoutId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

export const generateSetId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

export const createEmptySet = (): Set => {
  return {
    id: generateSetId(),
    weight: 0,
    reps: 0,
    completed: false,
    date: new Date()
  };
};

export const createNewExerciseSet = (exerciseId: string): ExerciseSet => {
  return {
    id: generateSetId(),
    exerciseId,
    sets: [createEmptySet()],
    notes: ""
  };
};

export const createEmptyWorkout = (): Workout => {
  return {
    id: generateWorkoutId(),
    name: "New Workout",
    date: new Date(),
    duration: 0,
    exerciseSets: [],
    completed: false
  };
};

export const mockWorkoutHistory: Workout[] = [
  {
    id: "workout1",
    name: "Pull Day",
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    duration: 3600, // 1 hour
    exerciseSets: [
      {
        id: "es1",
        exerciseId: "pull-up",
        sets: [
          { id: "s1", weight: 0, reps: 10, completed: true, date: new Date() },
          { id: "s2", weight: 0, reps: 8, completed: true, date: new Date() },
          { id: "s3", weight: 0, reps: 7, completed: true, date: new Date() }
        ]
      },
      {
        id: "es2",
        exerciseId: "lat-pulldown",
        sets: [
          { id: "s4", weight: 65, reps: 12, completed: true, date: new Date() },
          { id: "s5", weight: 70, reps: 10, completed: true, date: new Date() },
          { id: "s6", weight: 70, reps: 8, completed: true, date: new Date() }
        ]
      }
    ],
    completed: true
  },
  {
    id: "workout2",
    name: "Pull Day",
    date: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000), // 13 days ago
    duration: 3540, // 59 minutes
    exerciseSets: [
      {
        id: "es3",
        exerciseId: "pull-up",
        sets: [
          { id: "s7", weight: 0, reps: 9, completed: true, date: new Date() },
          { id: "s8", weight: 0, reps: 7, completed: true, date: new Date() },
          { id: "s9", weight: 0, reps: 6, completed: true, date: new Date() }
        ]
      },
      {
        id: "es4",
        exerciseId: "lat-pulldown",
        sets: [
          { id: "s10", weight: 60, reps: 12, completed: true, date: new Date() },
          { id: "s11", weight: 65, reps: 10, completed: true, date: new Date() },
          { id: "s12", weight: 65, reps: 8, completed: true, date: new Date() }
        ]
      }
    ],
    completed: true
  }
];

export const mockRoutines = [
  {
    id: "routine1",
    name: "Pull Day",
    description: "Focus on back and biceps",
    exercises: [
      { exerciseId: "pull-up", suggestedSets: 3, suggestedReps: 8 },
      { exerciseId: "lat-pulldown", suggestedSets: 3, suggestedReps: 10 },
      { exerciseId: "ez-curl", suggestedSets: 3, suggestedReps: 12 },
      { exerciseId: "bent-over-row", suggestedSets: 3, suggestedReps: 8 },
      { exerciseId: "rear-delt-fly", suggestedSets: 3, suggestedReps: 15 }
    ]
  },
  {
    id: "routine2",
    name: "Leg Day",
    description: "Focus on lower body strength",
    exercises: [
      { exerciseId: "deadlift", suggestedSets: 3, suggestedReps: 10 }
    ]
  }
];
