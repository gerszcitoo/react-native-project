import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
//clase 21/10 00:07:45
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import TabNavigator from "./src/navigation/TabNavigator";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    "Bungee Shade": require("./assets/fonts/BungeeShade-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <TabNavigator />
      <StatusBar style="light" />
    </>
  );
}
