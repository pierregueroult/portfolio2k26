import { useTheme as useThemeRaw } from 'next-themes';
import { Theme } from '../types/theme';

function isTheme(value: unknown): value is Theme {
  return value === 'system' || value === 'light' || value === 'dark';
}

type UseThemeReturn = {
  theme: Theme | undefined;
  setTheme: (theme: Theme) => void;
};

export const useTheme = (): UseThemeReturn => {
  const { theme: rawTheme, setTheme: setRawTheme } = useThemeRaw();

  const theme = isTheme(rawTheme) ? rawTheme : undefined;
  const setTheme = (value: Theme) => {
    document.cookie = `theme=${value}; path=/; max-age=31536000`;
    setRawTheme(value);
  };

  return {
    theme,
    setTheme,
  };
};
