import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReceiptScreen from "../screens/ReceiptScreen";
import Header from "../components/Header";

const ReceiptStack = createNativeStackNavigator();

const ReceiptsNavigator = () => {
  return (
    <ReceiptStack.Navigator
      screenOptions={{
        header: ({ route }) => <Header pageName={route.name} />,
      }}
    >
      <ReceiptStack.Screen component={ReceiptScreen} name="Recibos" />
    </ReceiptStack.Navigator>
  );
};

export default ReceiptsNavigator;
