import {
  StyleSheet,
  Text,
  Image,
  View,
  Pressable,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { colors } from "../global/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useEffect, useState } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import Toast from "react-native-toast-message";
import { useGetProductQuery } from "../services/shopService";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";

const ProductScreen = ({ navigation, route }) => {
  const [productFound, setProductFound] = useState({});

  const { width, height } = useWindowDimensions();

  const dispatch = useDispatch();

  const showToast = (type, message) => {
    Toast.show({
      type: type,
      text1: message,
      visibilityTime: 2000,
    });
  };

  const productId = useSelector(
    (state) => state.shopReducer.value.productIdSelected
  );
  const product = useSelector((state) =>
    state.shopReducer.value.products.find((prod) => prod.id === productId)
  );
  showToast("success", "¡Producto agregado al carrito!");

  useEffect(() => {
    setProductFound(product);
  }, [productId]);

  return (
    <>
      <Pressable onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" style={styles.goBack} size={30} />
      </Pressable>
      <ScrollView style={styles.productContainer}>
        <Text style={styles.productTitle}>{productFound.title}</Text>
        <View style={styles.gameExtraInfo}>
          <Text style={styles.players}>{productFound.players} jugadores</Text>
          <Text style={styles.estimatedTime}>{productFound.estimatedTime}</Text>
          <Text style={styles.ages}>{productFound.ages}</Text>
        </View>
        <Image
          source={{ uri: productFound.image }}
          alt={productFound.title}
          width={width}
          height={width * 0.8}
          resizeMode="contain"
          style={styles.productImage}
        />
        {productFound.discount > 0 && (
          <Text style={styles.discount}>
            DESCUENTO: {productFound.discount}%
          </Text>
        )}
        {productFound.stock <= 0 && (
          <Text style={styles.noStock}>SIN STOCK</Text>
        )}
        {productFound.stock <= 10 && productFound.stock > 0 && (
          <Text style={styles.lastUnits}>ULTIMAS UNIDADES</Text>
        )}
        <Text style={styles.shortDescription}>
          {productFound.shortDescription}
        </Text>
        <Text style={styles.longDescription}>
          {productFound.longDescription}
        </Text>
        {productFound.tags && (
          <Text style={styles.tags}>Tags: {productFound.tags.join(", ")}</Text>
        )}
        <Text style={styles.tutorialText}>Tutorial: </Text>
        <View style={styles.videoContainer}>
          <YoutubePlayer
            height={200}
            videoId={productFound.tutorial}
            play={false}
          />
        </View>
      </ScrollView>
      {productFound.stock > 0 ? (
        <View style={styles.priceContainer}>
          <Text style={styles.price}>U$D {productFound.price}</Text>
          <Pressable
            onPress={() => {
              dispatch(addItem({ ...productFound, quantity: 1 }));
            }}
            style={({ pressed }) => [
              { opacity: pressed ? 0.8 : 1 },
              styles.addToCartButton,
            ]}
          >
            <Text style={styles.addToCartText}>Agregar al carrito</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.priceContainer}>
          <Text style={styles.price}>Sin stock</Text>
          <Pressable
            onPress={() => navigation.goBack()}
            style={({ pressed }) => [
              { opacity: pressed ? 0.8 : 1 },
              styles.backToStore,
            ]}
          >
            <Text style={styles.viewMore}>¡Busca otro!</Text>
          </Pressable>
        </View>
      )}
    </>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  goBack: {
    padding: 10,
    color: colors.grisMedio,
  },
  productContainer: {
    paddingHorizontal: 16,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  gameExtraInfo: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 6,
  },
  estimatedTime: {
    color: colors.grisMedio,
    maxWidth: 100,
  },
  players: {
    color: colors.grisMedio,
    maxWidth: 100,
  },
  ages: {
    color: colors.grisMedio,
    maxWidth: 100,
  },

  discount: {
    marginBottom: 8,
    fontSize: 15,
    color: colors.blanco,
    fontWeight: "bold",
    padding: 8,
    backgroundColor: colors.verdeJade,
    alignSelf: "flex-start",
    borderRadius: 20,
  },
  noStock: {
    marginBottom: 8,
    fontSize: 15,
    color: colors.blanco,
    fontWeight: "bold",
    padding: 8,
    backgroundColor: colors.rojoPersa,
    alignSelf: "flex-start",
    borderRadius: 20,
  },
  lastUnits: {
    marginBottom: 8,
    fontSize: 15,
    color: colors.negro,
    fontWeight: "bold",
    padding: 8,
    backgroundColor: colors.amarilloAzafran,
    alignSelf: "flex-start",
    borderRadius: 20,
  },

  shortDescription: {
    fontWeight: "bold",
    fontSize: 18,
  },
  longDescription: {
    fontSize: 16,
    paddingVertical: 8,
  },
  tutorialText: {
    marginTop: 20,
    fontFamily: "Slackey",
    fontSize: 30,
    textAlign: "center",
  },
  videoContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  priceContainer: {
    backgroundColor: colors.blanco,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingBottom: 10,
    shadowColor: colors.negro,
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: { width: 3, height: 5 },
    elevation: 20,
  },
  price: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  addToCartButton: {
    padding: 8,
    marginVertical: 10,
    marginHorizontal: 34,
    backgroundColor: colors.verdeJade,
    borderRadius: 16,
  },
  addToCartText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.blanco,
  },
  backToStore: {
    padding: 8,
    marginVertical: 10,
    marginHorizontal: 34,
    backgroundColor: colors.rojoPersa,
    borderRadius: 16,
  },
  viewMore: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.blanco,
  },
});
