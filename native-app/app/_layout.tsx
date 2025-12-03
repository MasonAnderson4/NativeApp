import { Stack } from "expo-router";
import { BookmarksProvider } from "../context/BookmarksContext";

export default function RootLayout() {
  return (
    <BookmarksProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="article"
          options={{
            headerShown: true,
            title: "Article",
            presentation: "card",
            headerBackTitle: "Back",
          }}
        />
      </Stack>
    </BookmarksProvider>
  );
}
