import { StyleSheet, Text, View } from "react-native";
import { colors } from "../global/colors";

const Header = ({ pageName }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>LUDOMANIA</Text>
      <Text style={styles.headerSubTitle}>{pageName}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    height: 130,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.rojoPersa,
  },
  headerTitle: {
    fontSize: 26,
    color: colors.blanco,
    fontFamily: "Bungee Shade",
    marginBottom: -20,
  },
  headerSubTitle: {
    fontSize: 18,
    color: colors.blanco,
    fontFamily: "Bungee Shade",
  },
});