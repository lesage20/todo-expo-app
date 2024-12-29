import { useColorScheme } from 'react-native';
import { create } from 'zustand';

interface ThemeStore {
  isDark: boolean;
  toggle: () => void;
  setTheme: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  isDark: false,
  toggle: () => set((state) => ({ isDark: !state.isDark })),
  setTheme: (isDark: boolean) => set({ isDark }),
}));

export const useThemeToggle = () => {
  const systemColorScheme = useColorScheme();
  const { isDark, toggle, setTheme } = useThemeStore();

  const toggleTheme = () => {
    toggle();
  };

  return {
    isDark,
    toggleTheme,
  };
};
