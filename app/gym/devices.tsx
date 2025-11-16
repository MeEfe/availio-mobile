import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Stack } from 'expo-router';
import { Circle, Filter } from 'lucide-react-native';
import * as React from 'react';
import { View, ScrollView, Pressable } from 'react-native';

const SCREEN_OPTIONS = {
  title: 'Equipment Status',
};

// Mock device data with more details
const DEVICES = [
  { id: '1', name: 'Treadmill 1', inUse: true, category: 'Cardio', floor: '1st Floor' },
  { id: '2', name: 'Treadmill 2', inUse: false, category: 'Cardio', floor: '1st Floor' },
  { id: '3', name: 'Treadmill 3', inUse: true, category: 'Cardio', floor: '1st Floor' },
  { id: '4', name: 'Elliptical 1', inUse: false, category: 'Cardio', floor: '1st Floor' },
  { id: '5', name: 'Elliptical 2', inUse: false, category: 'Cardio', floor: '1st Floor' },
  { id: '6', name: 'Rowing Machine', inUse: true, category: 'Cardio', floor: '1st Floor' },
  { id: '7', name: 'Bench Press', inUse: true, category: 'Strength', floor: '2nd Floor' },
  { id: '8', name: 'Squat Rack 1', inUse: false, category: 'Strength', floor: '2nd Floor' },
  { id: '9', name: 'Squat Rack 2', inUse: true, category: 'Strength', floor: '2nd Floor' },
  { id: '10', name: 'Lat Pulldown', inUse: false, category: 'Strength', floor: '2nd Floor' },
  { id: '11', name: 'Leg Press', inUse: true, category: 'Strength', floor: '2nd Floor' },
  { id: '12', name: 'Cable Machine 1', inUse: false, category: 'Strength', floor: '2nd Floor' },
  { id: '13', name: 'Cable Machine 2', inUse: false, category: 'Strength', floor: '2nd Floor' },
  { id: '14', name: 'Smith Machine', inUse: true, category: 'Strength', floor: '2nd Floor' },
  { id: '15', name: 'Leg Extension', inUse: false, category: 'Strength', floor: '2nd Floor' },
];

export default function DeviceUtilizationScreen() {
  const [selectedFilter, setSelectedFilter] = React.useState<'all' | 'available' | 'in-use'>(
    'all'
  );

  const filteredDevices = DEVICES.filter((device) => {
    if (selectedFilter === 'available') return !device.inUse;
    if (selectedFilter === 'in-use') return device.inUse;
    return true;
  });

  const availableCount = DEVICES.filter((d) => !d.inUse).length;
  const inUseCount = DEVICES.filter((d) => d.inUse).length;

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <View className="flex-1 bg-background">
        {/* Header Stats */}
        <View className="border-b border-border bg-card p-6">
          <View className="mb-4 flex-row items-center gap-8">
            <View className="flex-1">
              <Text className="text-sm text-muted-foreground">Available</Text>
              <Text className="text-4xl font-bold text-accent">{availableCount}</Text>
            </View>
            <View className="h-16 w-px bg-border" />
            <View className="flex-1">
              <Text className="text-sm text-muted-foreground">In Use</Text>
              <Text className="text-4xl font-bold text-destructive">{inUseCount}</Text>
            </View>
          </View>

          {/* Filter Tabs */}
          <View className="flex-row gap-2">
            <Pressable
              onPress={() => setSelectedFilter('all')}
              className={`flex-1 rounded-xl py-3 ${
                selectedFilter === 'all' ? 'bg-accent' : 'bg-muted/30'
              }`}>
              <Text
                className={`text-center text-sm font-semibold ${
                  selectedFilter === 'all' ? 'text-accent-foreground' : 'text-muted-foreground'
                }`}>
                All ({DEVICES.length})
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setSelectedFilter('available')}
              className={`flex-1 rounded-xl py-3 ${
                selectedFilter === 'available' ? 'bg-accent' : 'bg-muted/30'
              }`}>
              <Text
                className={`text-center text-sm font-semibold ${
                  selectedFilter === 'available'
                    ? 'text-accent-foreground'
                    : 'text-muted-foreground'
                }`}>
                Available ({availableCount})
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setSelectedFilter('in-use')}
              className={`flex-1 rounded-xl py-3 ${
                selectedFilter === 'in-use' ? 'bg-accent' : 'bg-muted/30'
              }`}>
              <Text
                className={`text-center text-sm font-semibold ${
                  selectedFilter === 'in-use' ? 'text-accent-foreground' : 'text-muted-foreground'
                }`}>
                In Use ({inUseCount})
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Device Grid */}
        <ScrollView className="flex-1 p-4">
          <View className="flex-row flex-wrap gap-3">
            {filteredDevices.map((device) => (
              <View
                key={device.id}
                className={`w-[31%] rounded-2xl border-2 p-4 ${
                  device.inUse
                    ? 'border-destructive/20 bg-destructive/5'
                    : 'border-accent/20 bg-accent/5'
                }`}>
                <View className="gap-3">
                  <View className="items-center gap-2">
                    <Circle
                      size={16}
                      fill={device.inUse ? '#dc2626' : '#4ade80'}
                      color={device.inUse ? '#dc2626' : '#4ade80'}
                    />
                    <Text className="text-center text-base font-bold text-foreground" numberOfLines={2}>
                      {device.name}
                    </Text>
                  </View>
                  <View className="items-center gap-1">
                    <Text className="text-xs text-muted-foreground">{device.category}</Text>
                    <Text className="text-xs text-muted-foreground">{device.floor}</Text>
                  </View>
                  <View
                    className={`items-center rounded-lg py-2 ${
                      device.inUse ? 'bg-destructive/20' : 'bg-accent/20'
                    }`}>
                    <Text
                      className={`text-xs font-bold ${
                        device.inUse ? 'text-destructive' : 'text-accent'
                      }`}>
                      {device.inUse ? 'BUSY' : 'FREE'}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </>
  );
}
