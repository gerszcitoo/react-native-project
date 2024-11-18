import { createSlice } from "@reduxjs/toolkit";
import categories from "../../data/categories.json";
import products from "../../data/products.json";

export const shopSlice = createSlice({
  name: "shop",
  initialState: {
    value: {
      categories: categories,
      products: products,
      categorySelected: "",
      productsFilteredByCategory: [],
      productIdSelected: null,
    },
  },
  reducers: {
    setCategory: (state, action) => {
      if (action.payload.toLowerCase() === "todos") {
        state.value.productsFilteredByCategory = state.value.products;
      } else {
        state.value.productsFilteredByCategory = state.value.products.filter(
          (product) =>
            product.category
              .toLowerCase()
              .includes(action.payload.toLowerCase())
        );
      }
      state.value.categorySelected = action.payload;
    },
    setProductIdSelected: (state, action) => {
      state.value.productIdSelected = action.payload; // Actualiza el ID del producto seleccionado
    },
    /* setProductId: (state, action) => {
      //item.id es el action.payload
      state.value.productIdSelected = state.value.productIdSelected.filter(
        (product) => product.id === action.payload
      );
      state.value.productIdSelected = action.payload;
    }, */
  },
});

export const { setCategory, setProductIdSelected } = shopSlice.actions;

export default shopSlice.reducer;
