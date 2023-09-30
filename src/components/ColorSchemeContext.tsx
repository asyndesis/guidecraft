import { ThemeProvider } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";
import { Appearance } from "react-native";
import { navThemeDark, navThemeLight } from "@/components/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TamaguiProvider, Theme } from "tamagui";
import tamaguiConfig from "tamagui.config";

interface ColorSchemeProviderProps {
  children: ReactNode;
}

interface ColorSchemeContextType {
  colorScheme: string;
  setColorScheme: Dispatch<SetStateAction<string>>;
}

const ColorSchemeContext = createContext<ColorSchemeContextType | any>(
  undefined
);

export const useColorScheme = () => {
  return useContext(ColorSchemeContext);
};

export const ColorSchemeProvider = ({ children }: ColorSchemeProviderProps) => {
  const [colorScheme, setColorScheme] = useState<string>(
    Appearance.getColorScheme() ?? "light"
  );

  const toggleColorScheme = () => {
    setColorScheme((s) => {
      return s === "dark" ? "light" : "dark";
    });
  };

  return (
    <ThemeProvider
      value={colorScheme === "dark" ? navThemeDark : navThemeLight}
    >
      <TamaguiProvider config={tamaguiConfig}>
        <Theme name="light">
          <ColorSchemeContext.Provider
            value={{ colorScheme, setColorScheme, toggleColorScheme }}
          >
            <GestureHandlerRootView style={{ flex: 1 }}>
              <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
              {children}
            </GestureHandlerRootView>
          </ColorSchemeContext.Provider>
        </Theme>
      </TamaguiProvider>
    </ThemeProvider>
  );
};
