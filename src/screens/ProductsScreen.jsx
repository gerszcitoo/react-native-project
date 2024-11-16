import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import products from "../data/products.json";
import FlatCard from "../components/FlatCard";
import { colors } from "../global/colors";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import Search from "../components/Search";

const ProductsScreen = ({ navigation, route }) => {
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const category = route.params;

  function filterProducts(products, category, search) {
    let filteredProducts = products;

    if (category !== "Todos") {
      filteredProducts = products.filter((product) =>
        product.category.includes(category)
      );
    }

    if (search) {
      filteredProducts = filteredProducts.filter(
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
    }

    return filteredProducts;
  }

  useEffect(() => {
    const filteredProducts = filterProducts(products, category, search);
    setProductsFiltered(filteredProducts);
  }, [category, search, products]);

  const renderProductItem = ({ item }) => {
    return (
      <Pressable onPress={() => navigation.navigate("Producto", item.id)}>
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
                <Text style={styles.discount}>Descuento: {item.discount}%</Text>
              )}
              {item.stock <= 0 && <Text style={styles.noStock}>Sin stock</Text>}
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
      {productsFiltered == "" ? (
        <Text style={styles.notFound}>No encontramos nada :(</Text>
      ) : (
        <FlatList
          data={productsFiltered}
          keyExtractor={(item) => item.id}
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
    fontSize: 18,
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
    fontSize: 15,
    color: colors.verdeJade,
  },
  noStock: {
    marginTop: 8,
    fontSize: 15,
    color: colors.rojoPersa,
  },
  lastUnits: {
    marginTop: 8,
    fontSize: 15,
    color: colors.negro,
    fontWeight: "bold",
    padding: 8,
    backgroundColor: colors.amarilloAzafran,
    alignSelf: "flex-start",
  },
  price: {
    marginTop: 8,
    fontSize: 16,
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
});
