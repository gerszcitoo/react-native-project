import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
//clase 14/10 00:45:00
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
      {/* {productId ? (
        <ProductScreen productId={productId} setProductId={setProductId} />
      ) : category ? (
        <ProductsScreen
          category={category}
          setCategory={setCategory}
          setProductId={setProductId}
        />
      ) : (
        <>
          <Header />
          <CategoriesScreen setCategory={setCategory} />
        </>
      )} */}
      <Navigator />
      <StatusBar style="light" />
    </>
  );
}
