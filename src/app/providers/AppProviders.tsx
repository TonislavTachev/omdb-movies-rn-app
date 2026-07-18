import { QueryProvider } from "@/app/providers/QueryProvider";
import { FavoritesProvider } from "@/features/favorites/context/FavoritesProvider";
import type { PropsWithChildren } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <SafeAreaProvider>
      <QueryProvider>
        <FavoritesProvider>{children}</FavoritesProvider>
      </QueryProvider>
    </SafeAreaProvider>
  );
}
