import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

interface FavoritesContextValue {
  favoriteIds: Set<string>;
  isFavorite: (jobId: string) => boolean;
  toggleFavorite: (jobId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

const STORAGE_KEY = 'hirely-favorites';

function loadFavorites(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(loadFavorites);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(favoriteIds)));
  }, [favoriteIds]);

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favoriteIds,
      isFavorite: (jobId) => favoriteIds.has(jobId),
      toggleFavorite: (jobId) =>
        setFavoriteIds((prev) => {
          const next = new Set(prev);
          if (next.has(jobId)) {
            next.delete(jobId);
          } else {
            next.add(jobId);
          }
          return next;
        }),
    }),
    [favoriteIds],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within a FavoritesProvider');
  return ctx;
}
