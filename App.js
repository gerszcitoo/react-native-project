import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
//clase 23/10 00:00:00
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import TabNavigator from "./src/navigation/TabNavigator";
import { store } from "./src/app/store";
import { Provider } from "react-redux";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    Slackey: require("./assets/fonts/Slackey-Regular.ttf"),
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
    <Provider store={store}>
      <TabNavigator />
      <StatusBar style="light" />
    </Provider>
  );
}
