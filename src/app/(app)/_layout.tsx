import { useAuth } from "@/components/AuthProvider";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View } from "tamagui";
import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";

export default function PublicLayout() {
  const { user } = useAuth();

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
            <View padding="$3"></View>
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
      {/* <Drawer.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      /> */}
    </Drawer>
  );
}
