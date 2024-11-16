import { StyleSheet, Text, FlatList, Image, Pressable } from "react-native";
import FlatCard from "../components/FlatCard";
import categories from "../data/categories.json";

const CategoriesScreen = ({ navigation }) => {
  const renderCategoryItem = ({ item, index }) => {
    return (
      <Pressable onPress={() => navigation.navigate("Productos", item.title)}>
        <FlatCard
          style={
            index % 2 == 0
              ? { ...styles.categoryItemContainer, ...styles.rowReverse }
              : { ...styles.categoryItemContainer, ...styles.row }
          }
        >
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.categoryTitle}>{item.title}</Text>
        </FlatCard>
      </Pressable>
    );
  };

  return (
    <>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
      />
    </>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  categoryItemContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 20,
  },
  categoryTitle: {
    fontSize: 23,
    fontWeight: "bold",
  },

  image: {
    width: 150,
    height: 80,
  },
  row: {
    flexDirection: "row",
  },
  rowReverse: {
    flexDirection: "row-reverse",
  },
});
