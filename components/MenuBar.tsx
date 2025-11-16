import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { User, Dumbbell, Activity } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

type MenuItem = {
  id: string;
  label: string;
  icon: typeof User;
  position: 'left' | 'center' | 'right';
};

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'workout',
    label: 'Workout Tracking',
    icon: Activity,
    position: 'left',
  },
  {
    id: 'gym',
    label: 'Gym Utilization',
    icon: Dumbbell,
    position: 'center',
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: User,
    position: 'right',
  },
];

interface MenuBarProps {
  activeItem?: string;
  onItemPress?: (itemId: string) => void;
}

export function MenuBar({ activeItem = 'gym', onItemPress }: MenuBarProps) {
  return (
    <View className="absolute bottom-0 left-0 right-0 border-t border-border bg-card shadow-2xl">
      <View className="safe-bottom flex-row items-center justify-between px-4 py-3">
        {MENU_ITEMS.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <Pressable
              key={item.id}
              onPress={() => onItemPress?.(item.id)}
              className={cn(
                'flex-1 items-center justify-center rounded-xl px-3 py-2.5 transition-all active:scale-95',
                isActive && 'bg-accent/20'
              )}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
              })}>
              <View className={cn('mb-1.5 rounded-full p-2 transition-all')}>
                <Icon as={item.icon} size={20} />
              </View>
              <Text
                className={cn(
                  'text-center text-xs font-medium transition-colors',
                  isActive ? 'text-foreground' : 'text-muted-foreground'
                )}
                numberOfLines={1}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
