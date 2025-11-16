import { MenuBar } from '@/components/MenuBar';
import { Text } from '@/components/ui/text';
import { Stack, useRouter } from 'expo-router';
import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { User, Mail, Calendar, Activity } from 'lucide-react-native';
import { Icon } from '@/components/ui/icon';

const SCREEN_OPTIONS = {
  title: 'Profile',
};

const PROFILE_STATS = [
  { label: 'Workouts', value: '24', icon: Activity },
  { label: 'Member Since', value: 'Jan 2024', icon: Calendar },
];

export default function ProfileScreen() {
  const router = useRouter();

  const handleMenuItemPress = (itemId: string) => {
    if (itemId === 'gym') {
      router.push('/');
    } else if (itemId === 'workout') {
      router.push('/workout');
    }
  };

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <View className="flex-1 bg-background">
        <ScrollView className="flex-1" contentContainerClassName="pb-24">
          {/* Profile Header */}
          <View className="items-center gap-4 border-b border-border bg-card px-6 py-8">
            <View className="h-24 w-24 items-center justify-center rounded-full bg-accent">
              <Icon as={User} size={48} className="text-accent-foreground" />
            </View>
            <View className="items-center gap-1">
              <Text variant="h2" className="border-none pb-0 text-foreground">
                John Doe
              </Text>
              <View className="flex-row items-center gap-2">
                <Icon as={Mail} size={14} className="text-muted-foreground" />
                <Text className="text-sm text-muted-foreground">john.doe@example.com</Text>
              </View>
            </View>
          </View>

          {/* Stats Section */}
          <View className="gap-4 p-6">
            <Text variant="h3" className="text-foreground">
              Your Stats
            </Text>
            <View className="flex-row gap-3">
              {PROFILE_STATS.map((stat) => (
                <View
                  key={stat.label}
                  className="flex-1 gap-2 rounded-xl bg-card p-4 shadow-md">
                  <Icon as={stat.icon} size={20} className="text-accent" />
                  <Text className="text-2xl font-bold text-foreground">{stat.value}</Text>
                  <Text className="text-sm text-muted-foreground">{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Personal Info Section */}
          <View className="gap-4 px-6">
            <Text variant="h3" className="text-foreground">
              Personal Information
            </Text>
            <View className="gap-3 rounded-xl bg-card p-4 shadow-md">
              <View className="flex-row justify-between border-b border-border pb-3">
                <Text className="text-sm text-muted-foreground">Full Name</Text>
                <Text className="font-medium text-foreground">John Doe</Text>
              </View>
              <View className="flex-row justify-between border-b border-border pb-3">
                <Text className="text-sm text-muted-foreground">Email</Text>
                <Text className="font-medium text-foreground">john.doe@example.com</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-sm text-muted-foreground">Member ID</Text>
                <Text className="font-medium text-foreground">#12345</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Menu Bar */}
        <MenuBar activeItem="profile" onItemPress={handleMenuItemPress} />
      </View>
    </>
  );
}
