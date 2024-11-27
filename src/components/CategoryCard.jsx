import { StyleSheet, ImageBackground } from "react-native";
import { colors } from "../global/colors";

const CategoryCard = ({ source, children, style }) => {
  const image = { uri: source };
  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={{ ...styles.cardContainer, ...style }}
      blurRadius={3}
    >
      {children}
    </ImageBackground>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.grisClaro,
    shadowColor: colors.negro,
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: { width: 3, height: 5 },
    elevation: 10,
    height: 110,
  },
});
