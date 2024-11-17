import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import cart from "../data/cart.json";
import FlatCard from "../components/FlatCard";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../global/colors";
import { useState, useEffect } from "react";

const CartScreen = () => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      cart.reduce((acum, item) => (acum += item.price * item.quantity), 0)
    );
  }, [cart]);

  const FooterComponent = () => (
    <View style={styles.footerContainer}>
      <Text style={styles.footerTotal}>Total: U$D {total} </Text>
      <Pressable style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Confirmar</Text>
      </Pressable>
    </View>
  );

  const renderCartItem = ({ item }) => (
    <FlatCard style={styles.cartContainer}>
      <View>
        <Image
          source={{ uri: item.image }}
          style={styles.cartImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.cartDescription}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.shortDescription}</Text>
        <Text style={styles.price}>Precio unitario: U$D {item.price}</Text>
        <Text stlyle={styles.quantity}>Cantidad: {item.quantity}</Text>
        <Text style={styles.total}>
          Subtotal: U$D {item.quantity * item.price}
        </Text>
        <Icon
          name="delete"
          size={24}
          color={colors.rojoPersa}
          style={styles.trashIcon}
        />
      </View>
    </FlatCard>
  );
  return (
    <FlatList
      data={cart}
      keyExtractor={(item) => item.id}
      renderItem={renderCartItem}
      ListHeaderComponent={
        <Text style={styles.cartScreenTitle}>Tu carrito:</Text>
      }
      ListFooterComponent={<FooterComponent />}
    />
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  cartScreenTitle: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    paddingVertical: 8,
  },
  cartContainer: {
    flexDirection: "row",
    padding: 8,
    justifyContent: "flex-start",
    margin: 16,
    alignItems: "center",
    gap: 10,
  },
  cartImage: {
    width: 140,
    height: 140,
  },
  cartDescription: {
    width: "65%",
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  description: {
    marginBottom: 16,
  },
  total: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "700",
  },
  trashIcon: {
    alignSelf: "flex-end",
    marginRight: 16,
  },
  footerContainer: {
    padding: 32,
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  footerTotal: {
    fontSize: 16,
    fontWeight: "700",
  },
  confirmButton: {
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.verdeJade,
    borderRadius: 16,
    marginBottom: 24,
  },
  confirmButtonText: {
    color: colors.blanco,
    fontSize: 16,
    fontWeight: "700",
  },
});