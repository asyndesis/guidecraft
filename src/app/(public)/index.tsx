import { useAuth } from "@/components/AuthProvider";
import { Paragraph, View } from "tamagui";
import { router } from "expo-router";

export default function Login() {
  const { signIn } = useAuth();
  return (
    <View>
      <Paragraph
        onPress={async () => {
          await signIn("uncletickles@gmail.com", "Tickle123!");
          router.replace("/");
        }}
      >
        Woodmanzzzz
      </Paragraph>
    </View>
  );
}
