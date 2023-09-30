import { useAuth } from "@/components/AuthProvider";
import { Text, View } from "tamagui";
import { router } from "expo-router";

export default function Login() {
  const { signIn } = useAuth();
  return (
    <View>
      <Text
        onPress={async () => {
          await signIn("uncletickles@gmail.com", "Tickle123!");
          router.replace("/");
        }}
      >
        Woodman
      </Text>
    </View>
  );
}
