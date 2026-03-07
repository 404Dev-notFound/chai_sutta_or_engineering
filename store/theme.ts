import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeType = 'hacker' | 'genz' | 'saas' | 'night' | 'premium';

interface ThemeState {
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
    hasSelectedTheme: boolean;
    setHasSelectedTheme: (selected: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            theme: 'hacker', // Default fallback
            setTheme: (theme) => set({ theme }),
            hasSelectedTheme: false,
            setHasSelectedTheme: (selected) => set({ hasSelectedTheme: selected }),
        }),
        {
            name: 'cse-theme-storage',
        }
    )
);
