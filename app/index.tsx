import { MenuBar } from '@/components/MenuBar';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Stack } from 'expo-router';
import { MoonStarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { View } from 'react-native';

const SCREEN_OPTIONS = {
  title: 'Availio',
  headerRight: () => <ThemeToggle />,
};

export default function HomeScreen() {
  const [activeMenuItem, setActiveMenuItem] = React.useState('gym');

  const handleMenuItemPress = (itemId: string) => {
    setActiveMenuItem(itemId);
    // Navigation logic will be added later
  };

  return (
    <>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <View className="flex-1 bg-background">
        {/* Main content area */}
        <View className="flex-1 items-center justify-center gap-6 p-6">
          <View className="rounded-2xl bg-card p-8 shadow-lg">
            <Text variant="h1" className="mb-2 text-foreground">
              Welcome to Availio
            </Text>
            <Text className="text-center text-muted-foreground">
              Your fitness journey starts here
            </Text>
          </View>

          <View className="w-full max-w-md gap-3">
            <View className="rounded-xl bg-card p-4 shadow-md">
              <Text className="text-sm font-semibold text-foreground">Active Section:</Text>
              <Text className="mt-1 text-lg font-bold capitalize text-foreground">
                {activeMenuItem === 'gym'
                  ? 'Gym Utilization'
                  : activeMenuItem === 'profile'
                    ? 'Profile'
                    : 'Workout Tracking'}
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom Menu Bar */}
        <MenuBar activeItem={activeMenuItem} onItemPress={handleMenuItemPress} />
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
