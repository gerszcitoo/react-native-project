import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import FlatCard from "../components/FlatCard";
import { colors } from "../global/colors";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import Search from "../components/Search";
import { useSelector, useDispatch } from "react-redux";
import {
  setProductIdSelected,
  setProducts,
  setCategory,
} from "../features/shop/shopSlice";
import { useGetProductsQuery } from "../services/shopService";

const ProductsScreen = ({ navigation }) => {
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const { data: products, error, isLoading } = useGetProductsQuery();
  const productsFilteredByCategory = useSelector(
    (state) => state.shopReducer.value.productsFilteredByCategory
  );
  const categorySelected = useSelector(
    (state) => state.shopReducer.value.categorySelected
  );

  useEffect(() => {
    if (products && products.length > 0) {
      dispatch(setProducts(products));
      dispatch(setCategory(categorySelected || "todos"));
    }
  }, [products]);

  function filterProducts(products) {
    setProductsFiltered(products);
    if (search) {
      const productsTempSearched = products.filter(
        (product) =>
          product.title.toLowerCase().includes(search.toLowerCase()) ||
          product.shortDescription
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          product.longDescription
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          product.tags.some((tag) =>
            tag.toLowerCase().includes(search.toLowerCase())
          )
      );
      setProductsFiltered(productsTempSearched);
    }
  }

  useEffect(() => {
    filterProducts(productsFilteredByCategory);
  }, [productsFilteredByCategory, search]);

  const renderProductItem = ({ item }) => {
    return (
      <Pressable
        onPress={() => {
          dispatch(setProductIdSelected(item.id));
          navigation.navigate("Producto");
        }}
      >
        <View style={styles.productCardContainer}>
          <FlatCard style={styles.productContainer}>
            <View>
              <Image
                source={{ uri: item.image }}
                style={styles.productImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.productDescription}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.shortDescription}>
                {item.shortDescription}
              </Text>
              <View style={styles.tagsContainer}>
                <Text style={styles.tags}>Tags: {item.tags.join(", ")}</Text>
              </View>
              {item.discount > 0 && (
                <Text style={styles.discount}>DESCUENTO: {item.discount}%</Text>
              )}
              {item.stock <= 0 && <Text style={styles.noStock}>SIN STOCK</Text>}
              {item.stock <= 10 && item.stock > 0 && (
                <Text style={styles.lastUnits}>ULTIMAS UNIDADES</Text>
              )}
              <Text style={styles.price}>U$D {item.price}</Text>
            </View>
          </FlatCard>
        </View>
      </Pressable>
    );
  };

  return (
    <>
      <Pressable onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" style={styles.goBack} size={30} />
      </Pressable>
      <Search setSearch={setSearch} />
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.azulCielo} />
      ) : error ? (
        <Text style={styles.loadError}>
          Error al cargar los productos, inténtelo nuevamente
        </Text>
      ) : productsFilteredByCategory.length === 0 ? (
        <Text style={styles.notFound}>No encontramos nada :(</Text>
      ) : (
        <FlatList
          data={productsFiltered}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProductItem}
        />
      )}
    </>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  productCardContainer: {
    paddingBottom: 15,
  },
  productContainer: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "flex-start",
    gap: 15,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productDescription: {
    width: "72%",
  },
  productTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  shortDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: "row",
  },
  tags: {
    fontSize: 12,
  },
  discount: {
    marginTop: 8,
    fontSize: 14,
    color: colors.blanco,
    fontWeight: "bold",
    padding: 8,
    backgroundColor: colors.verdeJade,
    alignSelf: "flex-start",
    borderRadius: 20,
  },
  noStock: {
    marginTop: 8,
    fontSize: 14,
    color: colors.blanco,
    fontWeight: "bold",
    padding: 8,
    backgroundColor: colors.rojoPersa,
    alignSelf: "flex-start",
    borderRadius: 20,
  },
  lastUnits: {
    marginTop: 8,
    fontSize: 14,
    color: colors.negro,
    fontWeight: "bold",
    padding: 8,
    backgroundColor: colors.amarilloAzafran,
    alignSelf: "flex-start",
    borderRadius: 20,
  },
  price: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "bold",
  },
  goBack: {
    padding: 10,
    color: colors.grisMedio,
  },
  notFound: {
    fontSize: 40,
    color: colors.rojoPersa,
    textAlign: "center",
  },
  loadError: {
    textAlign: "center",
    fontSize: 24,
    color: colors.rojoPersa,
  },
});
