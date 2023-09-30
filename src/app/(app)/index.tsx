import { useAuth } from "@/components/AuthProvider";
import { Paragraph, View } from "tamagui";

export default function Index() {
  return (
    <View alignItems="center" justifyContent="center" flex={1}>
      <Paragraph>SIgned In </Paragraph>
    </View>
  );
}
