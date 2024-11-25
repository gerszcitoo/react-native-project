import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
//clase 06/11 00.40.47
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import MainNavigator from "./src/navigation/MainNavigator";
import { store } from "./src/app/store";
import { Provider } from "react-redux";
import { createSessionsTable } from "./src/db";

createSessionsTable();

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
      <MainNavigator />
      <StatusBar style="light" />
    </Provider>
  );
}
