import type { RootStackParamList } from "@/app/navigation/types";
import { MainTabNavigator } from "@/app/navigation/MainTabNavigator";
import { MovieDetailsScreen } from "@/features/movies/screens/MovieDetailsScreen";
import { colors } from "@/shared/theme/colors";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainTabs"
        screenOptions={{
          contentStyle: { backgroundColor: colors.background },
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.textPrimary,
          headerTitleStyle: { color: colors.textPrimary },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={MainTabNavigator}
          options={{
            headerShown: false,
            title: "",
          }}
        />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetailsScreen}
          options={{
            headerShown: false,
            title: "",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
