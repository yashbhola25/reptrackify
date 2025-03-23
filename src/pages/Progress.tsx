
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, Calendar, Trophy, Dumbbell } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { mockWorkoutHistory, calculateTotalVolume, findMaxWeight } from '@/utils/workoutUtils';
import { formatTime } from '@/utils/workoutUtils';
import { getExerciseById } from '@/data/exercises';

const Progress = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'year'>('month');
  
  // Calculate stats
  const totalWorkouts = mockWorkoutHistory.length;
  const totalWorkoutTime = mockWorkoutHistory.reduce((acc, workout) => acc + workout.duration, 0);
  const totalVolume = mockWorkoutHistory.reduce((acc, workout) => acc + calculateTotalVolume(workout), 0);
  
  // Generate chart data
  const generateChartData = () => {
    // Map data for volume over time
    return mockWorkoutHistory.map(workout => ({
      date: new Date(workout.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      volume: calculateTotalVolume(workout),
      workoutTime: workout.duration / 60, // in minutes
    })).reverse();
  };
  
  const chartData = generateChartData();
  
  // Exercise progress data
  const exerciseProgress = mockWorkoutHistory.reduce((acc, workout) => {
    workout.exerciseSets.forEach(exerciseSet => {
      const exercise = getExerciseById(exerciseSet.exerciseId);
      if (!exercise) return;
      
      const maxWeight = findMaxWeight(exerciseSet.sets);
      
      if (!acc[exerciseSet.exerciseId]) {
        acc[exerciseSet.exerciseId] = {
          exercise,
          data: []
        };
      }
      
      // Add data point
      acc[exerciseSet.exerciseId].data.push({
        date: workout.date,
        maxWeight,
        sets: exerciseSet.sets.length
      });
    });
    
    return acc;
  }, {} as Record<string, { exercise: any, data: any[] }>);

  return (
    <div className="bg-background min-h-screen pb-20 animate-fade-in">
      <header className="py-6 px-6 mb-2">
        <h1 className="text-3xl font-bold text-foreground">Progress</h1>
        <p className="text-muted-foreground">Track your fitness journey</p>
      </header>
      
      <div className="px-6 mb-8">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="flex items-center mb-2">
              <Calendar size={16} className="text-primary mr-1" />
              <span className="text-muted-foreground text-sm">Workouts</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">{totalWorkouts}</span>
              <span className="text-muted-foreground text-sm ml-1">sessions</span>
            </div>
          </div>
          
          <div className="bg-card rounded-lg p-4 border border-border">
            <div className="flex items-center mb-2">
              <Trophy size={16} className="text-primary mr-1" />
              <span className="text-muted-foreground text-sm">Total Time</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">{formatTime(totalWorkoutTime)}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-lg p-4 border border-border mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Volume Progress</h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => setSelectedTimeframe('week')}
                className={`px-2 py-1 text-xs rounded-md ${selectedTimeframe === 'week' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}
              >
                Week
              </button>
              <button 
                onClick={() => setSelectedTimeframe('month')}
                className={`px-2 py-1 text-xs rounded-md ${selectedTimeframe === 'month' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}
              >
                Month
              </button>
              <button 
                onClick={() => setSelectedTimeframe('year')}
                className={`px-2 py-1 text-xs rounded-md ${selectedTimeframe === 'year' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}
              >
                Year
              </button>
            </div>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 5, left: 0, bottom: 15 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  axisLine={{ stroke: '#374151' }}
                  tickLine={{ stroke: '#374151' }}
                />
                <YAxis 
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  axisLine={{ stroke: '#374151' }}
                  tickLine={{ stroke: '#374151' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    borderColor: '#374151',
                    borderRadius: '0.375rem',
                    color: '#F9FAFB'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="volume" 
                  name="Volume (kg)"
                  stroke="#3B82F6" 
                  strokeWidth={2} 
                  activeDot={{ r: 6, fill: '#3B82F6' }}
                  dot={{ r: 4, fill: '#1F2937', strokeWidth: 2, stroke: '#3B82F6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-medium mb-4">Exercise Progress</h2>
          
          {Object.values(exerciseProgress).length > 0 ? (
            <div className="space-y-4">
              {Object.values(exerciseProgress).map(({ exercise, data }) => (
                <div key={exercise.id} className="bg-card rounded-lg p-4 border border-border">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                      {exercise.image ? (
                        <img 
                          src={exercise.image} 
                          alt={exercise.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Dumbbell size={16} className="text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-medium">{exercise.name}</h3>
                      <div className="text-sm text-muted-foreground">
                        {exercise.primaryMuscles.join(', ')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm text-muted-foreground">Max Weight</span>
                      <div className="flex items-center">
                        <span className="text-xl font-medium">
                          {findMaxWeight(data.flatMap(d => ({ weight: d.maxWeight, reps: 0, id: '', completed: true, date: new Date() })))} kg
                        </span>
                        <ArrowUpRight size={16} className="text-primary ml-1" />
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className="text-sm text-muted-foreground">Last Workout</span>
                      <div className="text-muted-foreground">
                        {new Date(data[data.length - 1]?.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-lg p-6 text-center border border-border">
              <Dumbbell size={32} className="mx-auto mb-3 text-muted-foreground" />
              <p className="text-muted-foreground">No exercise data yet</p>
              <p className="text-sm text-muted-foreground mt-1 mb-4">Complete workouts to see your progress</p>
              <button 
                onClick={() => {}}
                className="text-primary hover:underline"
              >
                Start a workout
              </button>
            </div>
          )}
        </div>
      </div>
      
      <Navbar />
    </div>
  );
};

export default Progress;
