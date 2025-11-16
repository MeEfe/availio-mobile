import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronRight, Dumbbell } from 'lucide-react-native';
import * as React from 'react';
import { View, ScrollView, Pressable } from 'react-native';

// Mock data - will be replaced with real data later
const MOCK_SPLIT_DATA: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Upper/Lower Split',
    days: [
      { id: 'day1', name: 'Upper Body', exerciseCount: 6 },
      { id: 'day2', name: 'Lower Body', exerciseCount: 5 },
    ],
  },
  '2': {
    id: '2',
    name: 'Push Pull Legs',
    days: [
      { id: 'day1', name: 'Push', exerciseCount: 5 },
      { id: 'day2', name: 'Pull', exerciseCount: 5 },
      { id: 'day3', name: 'Legs', exerciseCount: 6 },
    ],
  },
};

export default function SplitDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const split = MOCK_SPLIT_DATA[id || '1'];

  const handleDayPress = (dayId: string, dayName: string) => {
    router.push(`/workout/split/${id}/day/${dayId}?name=${encodeURIComponent(dayName)}`);
  };

  if (!split) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-muted-foreground">Split not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: split.name }} />
      <View className="flex-1 bg-background">
        <ScrollView className="flex-1 p-6">
          {/* Header */}
          <View className="mb-6 gap-2">
            <Text variant="h2" className="border-none pb-0 text-foreground">
              {split.name}
            </Text>
            <Text className="text-sm text-muted-foreground">
              {split.days.length} training {split.days.length === 1 ? 'day' : 'days'}
            </Text>
          </View>

          {/* Days List */}
          <View className="gap-3">
            {split.days.map((day: any, index: number) => (
              <Pressable
                key={day.id}
                onPress={() => handleDayPress(day.id, day.name)}
                className="rounded-xl bg-card p-5 shadow-md active:opacity-70">
                <View className="flex-row items-center justify-between">
                  <View className="flex-1 gap-2">
                    <View className="flex-row items-center gap-2">
                      <View className="h-8 w-8 items-center justify-center rounded-full bg-accent">
                        <Text className="font-bold text-accent-foreground">
                          {index + 1}
                        </Text>
                      </View>
                      <Text className="text-lg font-bold text-foreground">{day.name}</Text>
                    </View>
                    <View className="ml-10 flex-row items-center gap-1.5">
                      <Icon as={Dumbbell} size={14} className="text-muted-foreground" />
                      <Text className="text-sm text-muted-foreground">
                        {day.exerciseCount} exercises
                      </Text>
                    </View>
                  </View>
                  <Icon as={ChevronRight} size={24} className="text-muted-foreground" />
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
}
