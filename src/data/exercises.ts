
import { Exercise } from '@/types';

export const exercises: Exercise[] = [
  {
    id: "pull-up",
    name: "Pull Up",
    category: "Strength",
    primaryMuscles: ["Lats", "Biceps"],
    secondaryMuscles: ["Forearms", "Shoulders", "Traps"],
    equipment: ["Pull-up Bar"],
    instructions: "Hang from a pull-up bar with palms facing away from you, hands shoulder-width apart. Pull your body up until your chin clears the bar, then lower back down with control.",
    image: "/lovable-uploads/907f51fa-b2a0-4b38-978b-eea1b0ecfeca.png"
  },
  {
    id: "lat-pulldown",
    name: "Lat Pulldown (Machine)",
    category: "Strength",
    primaryMuscles: ["Lats"],
    secondaryMuscles: ["Biceps", "Rhomboids", "Traps"],
    equipment: ["Lat Pulldown Machine"],
    instructions: "Sit at a lat pulldown machine with your thighs secured under the pads. Grab the bar with a wide grip and pull it down to your chest, then slowly release back up.",
    image: "/lovable-uploads/8af2c7ca-906e-4db1-ac0f-a88f4511b394.png"
  },
  {
    id: "ez-curl",
    name: "EZ Bar Biceps Curl",
    category: "Strength",
    primaryMuscles: ["Biceps"],
    secondaryMuscles: ["Forearms"],
    equipment: ["EZ Bar"],
    instructions: "Stand with feet shoulder-width apart, holding an EZ bar with palms facing upward. Curl the bar toward your shoulders, keeping elbows close to your body.",
    image: "/lovable-uploads/8288a5dd-b9d6-4e98-b7a8-58f46f97a4a3.png"
  },
  {
    id: "bent-over-row",
    name: "Bent Over Row (Barbell)",
    category: "Strength",
    primaryMuscles: ["Lats", "Rhomboids"],
    secondaryMuscles: ["Biceps", "Traps", "Rear Delts"],
    equipment: ["Barbell"],
    instructions: "Bend at the hips with a slight knee bend, holding a barbell with hands shoulder-width apart. Pull the barbell to your lower chest, then lower it with control.",
    image: "/lovable-uploads/346fc1a8-f50b-471f-a720-702365e78b5e.png"
  },
  {
    id: "rear-delt-fly",
    name: "Rear Delt Reverse Fly (Machine)",
    category: "Strength", 
    primaryMuscles: ["Rear Delts"],
    secondaryMuscles: ["Traps", "Rhomboids"],
    equipment: ["Reverse Fly Machine"],
    instructions: "Sit facing a reverse fly machine, grasp the handles with your arms extended and pull them back and out to your sides, squeezing your shoulder blades together.",
    image: "/lovable-uploads/aae512d4-4cf9-4386-b68a-18b5c9465bee.png"
  },
  {
    id: "deadlift",
    name: "Straight Leg Deadlift",
    category: "Strength", 
    primaryMuscles: ["Hamstrings"],
    secondaryMuscles: ["Lower Back", "Glutes"],
    equipment: ["Barbell"],
    instructions: "Stand with feet hip-width apart, holding a barbell in front of your thighs. With slightly bent knees, hinge at your hips to lower the barbell while keeping your back straight.",
    image: "/lovable-uploads/6eceadea-3758-43e3-be10-c02646e9b7b3.png"
  }
];

export const getExerciseById = (id: string): Exercise | undefined => {
  return exercises.find(exercise => exercise.id === id);
};

export const getExercisesByMuscle = (muscle: string): Exercise[] => {
  return exercises.filter(exercise => 
    exercise.primaryMuscles.includes(muscle) || 
    exercise.secondaryMuscles.includes(muscle)
  );
};

export const getExercisesByEquipment = (equipment: string): Exercise[] => {
  return exercises.filter(exercise => 
    exercise.equipment.includes(equipment)
  );
};

export const getAllMuscles = (): string[] => {
  const muscles = new Set<string>();
  
  exercises.forEach(exercise => {
    exercise.primaryMuscles.forEach(muscle => muscles.add(muscle));
    exercise.secondaryMuscles.forEach(muscle => muscles.add(muscle));
  });
  
  return Array.from(muscles).sort();
};

export const getAllEquipment = (): string[] => {
  const equipment = new Set<string>();
  
  exercises.forEach(exercise => {
    exercise.equipment.forEach(item => equipment.add(item));
  });
  
  return Array.from(equipment).sort();
};
