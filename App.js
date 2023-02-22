import { StatusBar } from "expo-status-bar";
import Home from "./src/screens/Home";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Home />
    </SafeAreaProvider>
  );
}
