import { ThemeProvider } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";
import { Appearance } from "react-native";
import { navThemeDark, navThemeLight } from "@/components/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TamaguiProvider, Theme, ThemeName } from "tamagui";
import tamaguiConfig from "tamagui.config";

interface ColorSchemeProviderProps {
  children: ReactNode;
}

interface ColorSchemeContextType {
  colorScheme: ThemeName;
  setColorScheme: Dispatch<SetStateAction<ThemeName>>;
}

const ColorSchemeContext = createContext<ColorSchemeContextType | any>(
  undefined
);

export const useColorScheme = () => {
  return useContext(ColorSchemeContext);
};

export const ColorSchemeProvider = ({ children }: ColorSchemeProviderProps) => {
  const [colorScheme, setColorScheme] = useState<ThemeName>(
    Appearance.getColorScheme() ?? "light"
  );

  const toggleColorScheme = () => {
    setColorScheme((s) => {
      return s === "dark" ? "light" : "dark";
    });
  };

  return (
    <ColorSchemeContext.Provider
      value={{ colorScheme, setColorScheme, toggleColorScheme }}
    >
      <TamaguiProvider config={tamaguiConfig}>
        <Theme name={colorScheme}>
          <ThemeProvider
            value={colorScheme === "dark" ? navThemeDark : navThemeLight}
          >
            <GestureHandlerRootView style={{ flex: 1 }}>
              <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
              {children}
            </GestureHandlerRootView>
          </ThemeProvider>
        </Theme>
      </TamaguiProvider>
    </ColorSchemeContext.Provider>
  );
};
