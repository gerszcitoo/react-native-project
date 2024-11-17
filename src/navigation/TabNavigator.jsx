import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import ShopNavigator from "./ShopNavigator";
import CartNavigator from "./CartNavigator";
import ReceiptsNavigator from "./ReceiptsNavigator";
import { StyleSheet } from "react-native";
import { colors } from "../global/colors";
import Icon from "react-native-vector-icons/MaterialIcons";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Shop"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tab.Screen
          name="Shop"
          component={ShopNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon
                name="store"
                size={32}
                color={focused ? colors.grisMedio : colors.grisClaro}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon
                name="shopping-cart"
                size={32}
                color={focused ? colors.grisMedio : colors.grisClaro}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Receipts"
          component={ReceiptsNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <Icon
                name="receipt-long"
                size={32}
                color={focused ? colors.grisMedio : colors.grisClaro}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    height: 48,
    backgroundColor: colors.blanco,
  },
});