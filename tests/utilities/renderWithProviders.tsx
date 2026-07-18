import { FavoritesProvider } from '@/features/favorites/context/FavoritesProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderOptions } from '@testing-library/react-native';
import type { ReactElement, ReactNode } from 'react';

function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        networkMode: 'always',
      },
    },
  });
}

export async function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  const queryClient = createTestQueryClient();

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <FavoritesProvider>{children}</FavoritesProvider>
      </QueryClientProvider>
    );
  }

  const result = await render(ui, { wrapper: Wrapper, ...options });

  return {
    queryClient,
    ...result,
  };
}
