import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Stack } from 'expo-router';
import { Users, TrendingUp } from 'lucide-react-native';
import * as React from 'react';
import { View, ScrollView, Pressable } from 'react-native';

const SCREEN_OPTIONS = {
  title: 'Gym Capacity',
};

// Mock data for gym capacity
const CURRENT_CAPACITY = 42;
const MAX_CAPACITY = 80;
const CAPACITY_PERCENTAGE = Math.round((CURRENT_CAPACITY / MAX_CAPACITY) * 100);

// Mock data for weekly utilization with hourly breakdown
const WEEK_DATA = [
  { day: 'Mon', times: ['6am', '9am', '12pm', '3pm', '6pm', '9pm'], values: [25, 45, 60, 55, 85, 40], isPast: true },
  { day: 'Tue', times: ['6am', '9am', '12pm', '3pm', '6pm', '9pm'], values: [30, 50, 65, 58, 90, 45], isPast: true },
  { day: 'Wed', times: ['6am', '9am', '12pm', '3pm', '6pm', '9pm'], values: [20, 40, 55, 50, 75, 35], isPast: true },
  { day: 'Thu', times: ['6am', '9am', '12pm', '3pm', '6pm', '9pm'], values: [28, 48, 62, 60, 88, 42], isPast: true },
  { day: 'Fri', times: ['6am', '9am', '12pm', '3pm', '6pm', '9pm'], values: [35, 55, 70, 65, 95, 50], isPast: true },
  { day: 'Sat', times: ['6am', '9am', '12pm', '3pm', '6pm', '9pm'], values: [15, 35, 50, 45, 60, 30], isPast: false, isToday: true },
  { day: 'Sun', times: ['6am', '9am', '12pm', '3pm', '6pm', '9pm'], values: [12, 30, 45, 40, 55, 25], isPast: false },
];

const getCapacityColor = (percentage: number) => {
  if (percentage < 50) return 'text-accent';
  if (percentage < 75) return 'text-yellow-500';
  return 'text-destructive';
};

const getCapacityBgColor = (percentage: number) => {
  if (percentage < 50) return 'bg-accent';
  if (percentage < 75) return 'bg-yellow-500';
  return 'bg-destructive';
};

export default function GymCapacityScreen() {
  const [selectedDay, setSelectedDay] = React.useState(5); // Saturday (today)
  const currentDayData = WEEK_DATA[selectedDay];
  const maxValue = Math.max(...currentDayData.values);

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <View className="flex-1 bg-background">
        <ScrollView className="flex-1 p-6">
          {/* Current Capacity Card */}
          <View className="mb-6 rounded-3xl bg-card p-8 shadow-xl">
            <View className="mb-6 flex-row items-center justify-between">
              <Text variant="h3" className="text-foreground">
                Current Capacity
              </Text>
              <Icon as={Users} size={32} className="text-accent" />
            </View>

            <View className="items-center gap-3">
              <View className="flex-row items-baseline gap-2">
                <Text className={`text-6xl font-bold ${getCapacityColor(CAPACITY_PERCENTAGE)}`}>
                  {CURRENT_CAPACITY}
                </Text>
                <Text className="text-3xl text-muted-foreground">/ {MAX_CAPACITY}</Text>
              </View>
              <Text className="text-base text-muted-foreground">people currently at gym</Text>

              {/* Capacity Bar */}
              <View className="mt-4 h-3 w-full overflow-hidden rounded-full bg-muted">
                <View
                  className={`h-full ${getCapacityBgColor(CAPACITY_PERCENTAGE)}`}
                  style={{ width: `${CAPACITY_PERCENTAGE}%` }}
                />
              </View>
              <Text className={`text-lg font-bold ${getCapacityColor(CAPACITY_PERCENTAGE)}`}>
                {CAPACITY_PERCENTAGE}% Full
              </Text>

              {/* Status Message */}
              <View className="mt-4 w-full rounded-xl bg-muted/30 p-4">
                <Text className="text-center text-sm text-muted-foreground">
                  {CAPACITY_PERCENTAGE < 50
                    ? 'Great time to visit! The gym is quiet.'
                    : CAPACITY_PERCENTAGE < 75
                      ? 'Moderate activity. Some equipment may be in use.'
                      : 'Busy period. Consider visiting at a different time.'}
                </Text>
              </View>
            </View>
          </View>

          {/* Weekly Trend Card */}
          <View className="rounded-3xl bg-card p-6 shadow-xl">
            <View className="mb-4 flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Icon as={TrendingUp} size={24} className="text-accent" />
                <Text variant="h3" className="text-foreground">
                  {currentDayData.day} Hourly Data
                </Text>
              </View>
            </View>

            <View className="mb-4 flex-row items-center justify-between rounded-xl bg-muted/20 p-3">
              <View className="flex-row items-center gap-2">
                <View className="h-3 w-3 rounded-full bg-accent" />
                <Text className="text-xs text-muted-foreground">Past</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <View className="h-3 w-3 rounded-full bg-accent/70" />
                <Text className="text-xs text-muted-foreground">Today</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <View className="h-3 w-3 rounded-full bg-muted-foreground/30" />
                <Text className="text-xs text-muted-foreground">Prediction</Text>
              </View>
            </View>

            {/* Day Selector */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4 -mx-2">
              <View className="flex-row gap-2 px-2">
                {WEEK_DATA.map((day, index) => (
                  <Pressable
                    key={day.day}
                    onPress={() => setSelectedDay(index)}
                    className={`rounded-xl px-4 py-2 ${
                      selectedDay === index ? 'bg-accent' : 'bg-muted/30'
                    }`}>
                    <Text
                      className={`font-semibold ${
                        selectedDay === index ? 'text-accent-foreground' : 'text-muted-foreground'
                      }`}>
                      {day.day}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>

            {/* Hourly Graph */}
            <View className="h-80 rounded-xl bg-muted/10 p-4">
              <View className="flex-1 flex-row items-end justify-between gap-1.5">
                {currentDayData.values.map((value, index) => {
                  const height = (value / maxValue) * 100;
                  return (
                    <View key={index} className="flex-1 items-center gap-1.5">
                      <View className="w-full flex-1 justify-end">
                        <View
                          className={`w-full rounded-t-lg ${
                            currentDayData.isPast
                              ? 'bg-accent'
                              : currentDayData.isToday
                                ? 'bg-accent/70'
                                : 'bg-muted-foreground/30'
                          }`}
                          style={{ height: `${height}%` }}
                        />
                      </View>
                      <Text className="text-xs font-medium text-foreground">
                        {currentDayData.times[index]}
                      </Text>
                      <Text className="text-xs text-muted-foreground">{value}%</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
