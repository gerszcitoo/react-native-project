import {
  StyleSheet,
  Text,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import FlatCard from "../components/FlatCard";
import { useSelector, useDispatch } from "react-redux";
import { setCategory } from "../features/shop/shopSlice";
import { useGetCategoriesQuery } from "../services/shopService";
import { colors } from "../global/colors";
import CategoryCard from "../components/CategoryCard";

const CategoriesScreen = ({ navigation }) => {
  const { data: categories, error, isLoading } = useGetCategoriesQuery();

  const dispatch = useDispatch();

  const renderCategoryItem = ({ item, index }) => {
    return (
      <Pressable
        onPress={() => {
          dispatch(setCategory(item.title));
          navigation.navigate("Productos");
        }}
      >
        <CategoryCard
          source={item.image}
          style={
            index % 2 == 0
              ? { ...styles.categoryItemContainer, ...styles.rowReverse }
              : { ...styles.categoryItemContainer, ...styles.row }
          }
        >
          <Text style={styles.categoryTitle}>{item.title}</Text>
        </CategoryCard>
      </Pressable>
    );
  };

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.azulCielo} />
      ) : error ? (
        <Text style={styles.loadError}>
          {" "}
          Error al cargar las categorías, inténtelo nuevamente
        </Text>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={renderCategoryItem}
        />
      )}
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
    padding: 15,
  },
  categoryTitle: {
    fontSize: 23,
    fontWeight: "bold",
  },

  image: {
    width: 150,
    height: 160,
  },
  row: {
    flexDirection: "row",
  },
  rowReverse: {
    flexDirection: "row-reverse",
  },
  loadError: {
    textAlign: "center",
    fontSize: 24,
    color: colors.rojoPersa,
  },
});
