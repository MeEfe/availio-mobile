import { MenuBar } from '@/components/MenuBar';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Stack, useRouter } from 'expo-router';
import { Plus, ChevronRight, Calendar } from 'lucide-react-native';
import * as React from 'react';
import { View, ScrollView, Pressable } from 'react-native';

const SCREEN_OPTIONS = {
  title: 'Workout Tracking',
};

// Mock data - will be replaced with real data later
const MOCK_SPLITS = [
  {
    id: '1',
    name: 'Upper/Lower Split',
    days: ['Upper Body', 'Lower Body'],
    description: '2-day split',
  },
  {
    id: '2',
    name: 'Push Pull Legs',
    days: ['Push', 'Pull', 'Legs'],
    description: '3-day split',
  },
];

export default function WorkoutTrackingScreen() {
  const router = useRouter();

  const handleMenuItemPress = (itemId: string) => {
    if (itemId === 'gym') {
      router.push('/');
    } else if (itemId === 'profile') {
      router.push('/profile');
    }
  };

  const handleCreateSplit = () => {
    router.push('/workout/create-split');
  };

  const handleSplitPress = (splitId: string) => {
    router.push(`/workout/split/${splitId}`);
  };

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <View className="flex-1 bg-background">
        <ScrollView className="flex-1" contentContainerClassName="pb-24">
          {/* Header Section */}
          <View className="gap-4 p-6">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text variant="h2" className="border-none pb-0 text-foreground">
                  Your Splits
                </Text>
                <Text className="mt-1 text-sm text-muted-foreground">
                  Organize your workouts into training splits
                </Text>
              </View>
            </View>

            {/* Create Split Button */}
            <Button onPress={handleCreateSplit} className="flex-row gap-2">
              <Icon as={Plus} size={20} className="text-primary-foreground" />
              <Text className="text-primary-foreground">Create New Split</Text>
            </Button>
          </View>

          {/* Splits List */}
          <View className="gap-3 px-6">
            {MOCK_SPLITS.length === 0 ? (
              <View className="items-center gap-3 rounded-xl bg-card p-8">
                <Icon as={Calendar} size={48} className="text-muted-foreground" />
                <Text className="text-center text-muted-foreground">
                  No workout splits yet. Create your first split to get started!
                </Text>
              </View>
            ) : (
              MOCK_SPLITS.map((split) => (
                <Pressable
                  key={split.id}
                  onPress={() => handleSplitPress(split.id)}
                  className="rounded-xl bg-card p-4 shadow-md active:opacity-70">
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1 gap-2">
                      <Text className="text-lg font-bold text-foreground">{split.name}</Text>
                      <Text className="text-sm text-muted-foreground">{split.description}</Text>
                      <View className="mt-1 flex-row flex-wrap gap-2">
                        {split.days.map((day, index) => (
                          <View
                            key={index}
                            className="rounded-full bg-accent/20 px-3 py-1">
                            <Text className="text-xs font-medium text-accent-foreground">
                              {day}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                    <Icon as={ChevronRight} size={24} className="text-muted-foreground" />
                  </View>
                </Pressable>
              ))
            )}
          </View>
        </ScrollView>

        {/* Bottom Menu Bar */}
        <MenuBar activeItem="workout" onItemPress={handleMenuItemPress} />
      </View>
    </>
  );
}
