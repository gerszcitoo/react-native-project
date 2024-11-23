import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
  name: "shop",
  initialState: {
    value: {
      products: [],
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

    setProducts: (state, action) => {
      state.value.products = action.payload;
      if (
        !state.value.categorySelected ||
        state.value.categorySelected === ""
      ) {
        state.value.productsFilteredByCategory = action.payload;
      }
    },
    setProductIdSelected: (state, action) => {
      state.value.productIdSelected = action.payload;
    },
  },
});

export const { setCategory, setProducts, setProductIdSelected } =
  shopSlice.actions;

export default shopSlice.reducer;
