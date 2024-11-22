import { createSlice } from "@reduxjs/toolkit";
import { calculate_total_price } from "../../utils/functions";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: {
      cartItems: [],
      user: "demo",
      total: null,
      updatedAt: Date.now().toLocaleString(),
    },
  },
  reducers: {
    addItem: (state, action) => {
      const productInCart = state.value.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (!productInCart) {
        state.value.cartItems.push(action.payload);
      } else {
        //evaluar sumar mas de un elemento al carrito. Ej +5 Catan
        state.value.cartItems.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity += 1; //reemplazaria 1 por variable con cantidad
            return item;
          }
          return item;
        });
      }
      const total = calculate_total_price(state.value.cartItems);

      state.value = {
        ...state.value,
        total,
        updatedAt: new Date().toLocaleString(),
      };
    },
    removeItem: (state, action) => {},
    clearCart: (state, action) => {
      (state.value.cartItems = []), (state.value.total = 0);
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
