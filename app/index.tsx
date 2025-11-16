import { MenuBar } from '@/components/MenuBar';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Stack, useRouter } from 'expo-router';
import { MoonStarIcon, SunIcon, Users, Dumbbell, ChevronRight } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { View, ScrollView, Pressable } from 'react-native';

const SCREEN_OPTIONS = {
  title: 'Gym Utilization',
  headerRight: () => <ThemeToggle />,
};

export default function HomeScreen() {
  const router = useRouter();

  const handleMenuItemPress = (itemId: string) => {
    if (itemId === 'profile') {
      router.push('/profile');
    } else if (itemId === 'workout') {
      router.push('/workout');
    }
  };

  const handleGymCapacityPress = () => {
    router.push('/gym/capacity');
  };

  const handleDeviceUtilizationPress = () => {
    router.push('/gym/devices');
  };

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <View className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center gap-6 p-6 pb-24">
          {/* Gym Capacity Card */}
          <Pressable
            onPress={handleGymCapacityPress}
            className="h-[30vh] w-[90%] min-h-[280px] rounded-3xl bg-gradient-to-br from-card to-card/80 p-8 shadow-2xl active:opacity-90">
            <View className="flex-1 items-center justify-center gap-4">
              <Icon as={Users} size={72} className="text-accent" />
              <Text variant="h2" className="border-none pb-0 text-center text-foreground">
                Gym Utilization
              </Text>
              <Text className="text-center text-muted-foreground">
                View current gym capacity and weekly trends
              </Text>
              <View className="mt-2 flex-row items-center gap-2">
                <Text className="font-semibold text-accent">View Details</Text>
                <Icon as={ChevronRight} size={20} className="text-accent" />
              </View>
            </View>
          </Pressable>

          {/* Device Utilization Card */}
          <Pressable
            onPress={handleDeviceUtilizationPress}
            className="h-[30vh] w-[90%] min-h-[280px] rounded-3xl bg-gradient-to-br from-card to-card/80 p-8 shadow-2xl active:opacity-90">
            <View className="flex-1 items-center justify-center gap-4">
              <Icon as={Dumbbell} size={72} className="text-accent" />
              <Text variant="h2" className="border-none pb-0 text-center text-foreground">
                Device Utilization
              </Text>
              <Text className="text-center text-muted-foreground">
                Check which gym equipment is available or in use
              </Text>
              <View className="mt-2 flex-row items-center gap-2">
                <Text className="font-semibold text-accent">View Details</Text>
                <Icon as={ChevronRight} size={20} className="text-accent" />
              </View>
            </View>
          </Pressable>
        </View>

        {/* Bottom Menu Bar */}
        <MenuBar activeItem="gym" onItemPress={handleMenuItemPress} />
      </View>
    </>
  );
}

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Button
      onPressIn={toggleColorScheme}
      size="icon"
      variant="ghost"
      className="ios:size-9 rounded-full web:mx-4">
      <Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-5" />
    </Button>
  );
}
