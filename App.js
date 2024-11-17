import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
//clase 14/10 01:14:30
import { StatusBar } from "expo-status-bar";
import Navigator from "./src/navigation/Navigator";
import { useEffect, useState } from "react";

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
      <Navigator />
      <StatusBar style="light" />
    </>
  );
}
