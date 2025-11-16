import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Stack, useRouter } from 'expo-router';
import { Plus, X, Save } from 'lucide-react-native';
import * as React from 'react';
import { View, ScrollView, TextInput, Pressable } from 'react-native';

const SCREEN_OPTIONS = {
  title: 'Create Split',
};

export default function CreateSplitScreen() {
  const router = useRouter();
  const [splitName, setSplitName] = React.useState('');
  const [days, setDays] = React.useState<string[]>(['']);

  const handleAddDay = () => {
    setDays([...days, '']);
  };

  const handleRemoveDay = (index: number) => {
    if (days.length > 1) {
      setDays(days.filter((_, i) => i !== index));
    }
  };

  const handleDayChange = (index: number, value: string) => {
    const newDays = [...days];
    newDays[index] = value;
    setDays(newDays);
  };

  const handleSave = () => {
    // TODO: Save split data
    router.back();
  };

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <View className="flex-1 bg-background">
        <ScrollView className="flex-1 p-6">
          {/* Split Name Input */}
          <View className="gap-2">
            <Text className="font-semibold text-foreground">Split Name</Text>
            <TextInput
              value={splitName}
              onChangeText={setSplitName}
              placeholder="e.g., Upper/Lower Split"
              placeholderTextColor="#9ca3af"
              className="rounded-xl border border-border bg-card px-4 py-3 text-base text-foreground"
            />
          </View>

          {/* Days Section */}
          <View className="mt-6 gap-3">
            <View className="flex-row items-center justify-between">
              <Text className="font-semibold text-foreground">Training Days</Text>
              <Button onPress={handleAddDay} size="sm" variant="outline">
                <Icon as={Plus} size={16} />
                <Text>Add Day</Text>
              </Button>
            </View>

            {days.map((day, index) => (
              <View key={index} className="flex-row gap-2">
                <View className="flex-1">
                  <TextInput
                    value={day}
                    onChangeText={(value) => handleDayChange(index, value)}
                    placeholder={`Day ${index + 1} (e.g., Upper Body)`}
                    placeholderTextColor="#9ca3af"
                    className="rounded-xl border border-border bg-card px-4 py-3 text-base text-foreground"
                  />
                </View>
                {days.length > 1 && (
                  <Pressable
                    onPress={() => handleRemoveDay(index)}
                    className="h-12 w-12 items-center justify-center rounded-xl bg-destructive/10 active:opacity-70">
                    <Icon as={X} size={20} className="text-destructive" />
                  </Pressable>
                )}
              </View>
            ))}
          </View>

          {/* Save Button */}
          <View className="mt-8">
            <Button
              onPress={handleSave}
              disabled={!splitName.trim() || days.every((d) => !d.trim())}
              className="flex-row gap-2">
              <Icon as={Save} size={20} className="text-primary-foreground" />
              <Text className="text-primary-foreground">Save Split</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
