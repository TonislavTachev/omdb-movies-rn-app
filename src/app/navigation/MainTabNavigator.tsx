import type { MainTabParamList } from '@/app/navigation/types';
import { useFavorites } from '@/features/favorites/context/FavoritesProvider';
import { FavoritesScreen } from '@/features/favorites/screens/FavoritesScreen';
import { HomeScreen } from '@/features/movies/screens/HomeScreen';
import { SearchScreen } from '@/features/search/screens/SearchScreen';
import { colors } from '@/shared/theme/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { ComponentProps } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type IoniconName = ComponentProps<typeof Ionicons>['name'];

const tabIcons: Record<
  keyof MainTabParamList,
  { focused: IoniconName; unfocused: IoniconName }
> = {
  Home: { focused: 'home', unfocused: 'home-outline' },
  Search: { focused: 'search', unfocused: 'search-outline' },
  Favorites: { focused: 'heart', unfocused: 'heart-outline' },
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabNavigator() {
  const insets = useSafeAreaInsets();
  const { favoriteCount } = useFavorites();

  const favoritesBadge =
    favoriteCount > 99 ? '99+' : favoriteCount > 0 ? favoriteCount : undefined;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: Math.max(insets.bottom, 8),
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        sceneStyle: {
          backgroundColor: colors.background,
        },
        tabBarIcon: ({ focused, color, size }) => {
          const icons = tabIcons[route.name];
          return (
            <Ionicons
              name={focused ? icons.focused : icons.unfocused}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarBadge: favoritesBadge,
          tabBarBadgeStyle: {
            backgroundColor: colors.accent,
            color: colors.textPrimary,
          },
        }}
      />
    </Tab.Navigator>
  );
}
