import { Text, View } from "tamagui";

export default function Index() {
  return (
    <View>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
        }}
      >
        Sign Out
      </Text>
    </View>
  );
}
