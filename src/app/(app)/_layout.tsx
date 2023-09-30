import { useAuth } from "@/components/AuthProvider";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Button, View } from "tamagui";
import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { Sun, Moon } from "@tamagui/lucide-icons";
import { useColorScheme } from "@/components/ColorSchemeContext";

export default function AppLayout() {
  const { user, signOut } = useAuth();

  const { toggleColorScheme, colorScheme } = useColorScheme();

  // // You can keep the splash screen open, or render a loading screen like we do here.
  // if (isLoading) {
  //   return <Text>Loading...</Text>;
  // }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!user) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/(public)" />;
  }

  return (
    <Drawer
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView
            contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}
            {...props}
          >
            <DrawerItemList {...props} />
            <View flex={1} />
            <DrawerItem label="Log out" onPress={() => signOut()} />
            <View padding="$3">
              <Button
                width={"$3"}
                icon={colorScheme === "dark" ? Sun : Moon}
                size="$3"
                p="0"
                onPress={() => toggleColorScheme()}
              />
            </View>
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "Index",
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Drawer>
  );
}
