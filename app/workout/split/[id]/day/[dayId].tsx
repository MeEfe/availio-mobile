import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react-native';
import * as React from 'react';
import { View, ScrollView, TextInput, Pressable } from 'react-native';

interface Exercise {
  id: string;
  name: string;
  sets: Set[];
}

interface Set {
  id: string;
  reps: string;
  weight: string;
}

// Mock data
const MOCK_EXERCISES: Exercise[] = [
  {
    id: '1',
    name: 'Bench Press',
    sets: [
      { id: '1', reps: '10', weight: '60' },
      { id: '2', reps: '8', weight: '70' },
      { id: '3', reps: '6', weight: '80' },
    ],
  },
  {
    id: '2',
    name: 'Bicep Curls',
    sets: [
      { id: '1', reps: '12', weight: '15' },
      { id: '2', reps: '10', weight: '17.5' },
    ],
  },
];

export default function WorkoutDayScreen() {
  const router = useRouter();
  const { id, dayId, name } = useLocalSearchParams<{
    id: string;
    dayId: string;
    name: string;
  }>();
  const [exercises, setExercises] = React.useState<Exercise[]>(MOCK_EXERCISES);
  const [expandedExercise, setExpandedExercise] = React.useState<string | null>(null);
  const [newExerciseName, setNewExerciseName] = React.useState('');
  const [showAddExercise, setShowAddExercise] = React.useState(false);

  const handleAddExercise = () => {
    if (newExerciseName.trim()) {
      const newExercise: Exercise = {
        id: Date.now().toString(),
        name: newExerciseName,
        sets: [{ id: '1', reps: '', weight: '' }],
      };
      setExercises([...exercises, newExercise]);
      setNewExerciseName('');
      setShowAddExercise(false);
      setExpandedExercise(newExercise.id);
    }
  };

  const handleRemoveExercise = (exerciseId: string) => {
    setExercises(exercises.filter((e) => e.id !== exerciseId));
    if (expandedExercise === exerciseId) {
      setExpandedExercise(null);
    }
  };

  const handleAddSet = (exerciseId: string) => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          return {
            ...exercise,
            sets: [
              ...exercise.sets,
              { id: Date.now().toString(), reps: '', weight: '' },
            ],
          };
        }
        return exercise;
      })
    );
  };

  const handleRemoveSet = (exerciseId: string, setId: string) => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === exerciseId && exercise.sets.length > 1) {
          return {
            ...exercise,
            sets: exercise.sets.filter((s) => s.id !== setId),
          };
        }
        return exercise;
      })
    );
  };

  const handleSetChange = (
    exerciseId: string,
    setId: string,
    field: 'reps' | 'weight',
    value: string
  ) => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          return {
            ...exercise,
            sets: exercise.sets.map((set) =>
              set.id === setId ? { ...set, [field]: value } : set
            ),
          };
        }
        return exercise;
      })
    );
  };

  const toggleExercise = (exerciseId: string) => {
    setExpandedExercise(expandedExercise === exerciseId ? null : exerciseId);
  };

  return (
    <>
      <Stack.Screen options={{ title: name || 'Workout Day' }} />
      <View className="flex-1 bg-background">
        <ScrollView className="flex-1 p-6">
          {/* Header */}
          <View className="mb-6 gap-2">
            <Text variant="h2" className="border-none pb-0 text-foreground">
              {name}
            </Text>
            <Text className="text-sm text-muted-foreground">
              {exercises.length} {exercises.length === 1 ? 'exercise' : 'exercises'}
            </Text>
          </View>

          {/* Exercises List */}
          <View className="gap-3">
            {exercises.map((exercise) => {
              const isExpanded = expandedExercise === exercise.id;
              return (
                <View key={exercise.id} className="rounded-xl bg-card shadow-md">
                  {/* Exercise Header */}
                  <Pressable
                    onPress={() => toggleExercise(exercise.id)}
                    className="flex-row items-center justify-between p-4 active:opacity-70">
                    <View className="flex-1 gap-1">
                      <Text className="text-lg font-bold text-foreground">
                        {exercise.name}
                      </Text>
                      <Text className="text-sm text-muted-foreground">
                        {exercise.sets.length} {exercise.sets.length === 1 ? 'set' : 'sets'}
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                      <Pressable
                        onPress={() => handleRemoveExercise(exercise.id)}
                        className="rounded-lg bg-destructive/10 p-2 active:opacity-70">
                        <Icon as={Trash2} size={16} className="text-destructive" />
                      </Pressable>
                      <Icon
                        as={isExpanded ? ChevronUp : ChevronDown}
                        size={24}
                        className="text-muted-foreground"
                      />
                    </View>
                  </Pressable>

                  {/* Exercise Sets (Expanded) */}
                  {isExpanded && (
                    <View className="border-t border-border p-4">
                      {exercise.sets.map((set, setIndex) => (
                        <View
                          key={set.id}
                          className="mb-3 flex-row items-center gap-2">
                          <Text className="w-8 text-sm font-medium text-muted-foreground">
                            {setIndex + 1}
                          </Text>
                          <View className="flex-1 flex-row gap-2">
                            <View className="flex-1">
                              <Text className="mb-1 text-xs text-muted-foreground">
                                Reps
                              </Text>
                              <TextInput
                                value={set.reps}
                                onChangeText={(value) =>
                                  handleSetChange(exercise.id, set.id, 'reps', value)
                                }
                                placeholder="0"
                                keyboardType="numeric"
                                placeholderTextColor="#9ca3af"
                                className="rounded-lg border border-border bg-background px-3 py-2 text-center text-foreground"
                              />
                            </View>
                            <View className="flex-1">
                              <Text className="mb-1 text-xs text-muted-foreground">
                                Weight (kg)
                              </Text>
                              <TextInput
                                value={set.weight}
                                onChangeText={(value) =>
                                  handleSetChange(exercise.id, set.id, 'weight', value)
                                }
                                placeholder="0"
                                keyboardType="decimal-pad"
                                placeholderTextColor="#9ca3af"
                                className="rounded-lg border border-border bg-background px-3 py-2 text-center text-foreground"
                              />
                            </View>
                          </View>
                          {exercise.sets.length > 1 && (
                            <Pressable
                              onPress={() => handleRemoveSet(exercise.id, set.id)}
                              className="rounded-lg bg-destructive/10 p-2 active:opacity-70">
                              <Icon as={Trash2} size={16} className="text-destructive" />
                            </Pressable>
                          )}
                        </View>
                      ))}
                      <Button
                        onPress={() => handleAddSet(exercise.id)}
                        variant="outline"
                        size="sm"
                        className="mt-2">
                        <Icon as={Plus} size={16} />
                        <Text>Add Set</Text>
                      </Button>
                    </View>
                  )}
                </View>
              );
            })}
          </View>

          {/* Add Exercise Section */}
          {showAddExercise ? (
            <View className="mt-4 gap-2 rounded-xl bg-card p-4 shadow-md">
              <Text className="font-semibold text-foreground">New Exercise</Text>
              <TextInput
                value={newExerciseName}
                onChangeText={setNewExerciseName}
                placeholder="Exercise name (e.g., Chest Press)"
                placeholderTextColor="#9ca3af"
                className="rounded-lg border border-border bg-background px-4 py-3 text-foreground"
                autoFocus
              />
              <View className="flex-row gap-2">
                <Button
                  onPress={handleAddExercise}
                  disabled={!newExerciseName.trim()}
                  className="flex-1">
                  <Text className="text-primary-foreground">Add</Text>
                </Button>
                <Button
                  onPress={() => {
                    setShowAddExercise(false);
                    setNewExerciseName('');
                  }}
                  variant="outline"
                  className="flex-1">
                  <Text>Cancel</Text>
                </Button>
              </View>
            </View>
          ) : (
            <Button onPress={() => setShowAddExercise(true)} className="mt-4">
              <Icon as={Plus} size={20} className="text-primary-foreground" />
              <Text className="text-primary-foreground">Add Exercise</Text>
            </Button>
          )}
        </ScrollView>
      </View>
    </>
  );
}
