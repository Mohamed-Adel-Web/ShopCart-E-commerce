/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}
export interface cartProduct extends product {
  quantity: number;
}
export type category = string[];
type AllProducts = product[];
type cartProducts = cartProduct[];

export interface initialState {
  AllProducts: AllProducts;
  category: category;
  cartProducts: cartProducts;
  allQuantity: number;
  totalPrice: number;
}
const initialState: initialState = {
  AllProducts: [
    {
      id: 0,
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
      rating: {
        rate: 0,
        count: 0,
      },
    },
  ],
  category: [""],
  cartProducts: [],
  allQuantity: 0,
  totalPrice: 0,
};
export const productsFetch = createAsyncThunk(
  "productsFetch",
  async (): Promise<AllProducts> => {
    const productsData = await axios("https://fakestoreapi.com/products");
    return productsData.data;
  }
);
export const categoryFetch = createAsyncThunk(
  "categoryFetch",
  async (): Promise<category> => {
    const categoryData = await axios(
      "https://fakestoreapi.com/products/categories"
    );
    return categoryData.data;
  }
);
export const filteredProductsFetch = createAsyncThunk(
  "filteredProductsFetch",
  async (cat: string): Promise<AllProducts> => {
    const filteredProductsData = await axios(
      `https://fakestoreapi.com/products/category/${cat}`
    );
    return filteredProductsData.data;
  }
);
export const ProductsSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.allQuantity = 0;
      state.totalPrice = 0;
      const exist = state.cartProducts.find(
        (product) => product.id === action.payload.id
      );
      if (exist) {
        const updatedCart: cartProducts = state.cartProducts.map((product) => {
          return action.payload.id == product.id
            ? { ...product, quantity: product.quantity + 1 }
            : product;
        });
        state.cartProducts = updatedCart;
      } else {
        state.cartProducts = [
          ...state.cartProducts,
          { ...action.payload, quantity: 1 },
        ];
      }
      state.cartProducts.map((product) => {
        state.allQuantity += product.quantity;
        state.totalPrice += product.quantity * product.price;
      });
      window.localStorage.setItem("cart", JSON.stringify(state.cartProducts));
    },
    removeProduct: (state, action) => {
      state.allQuantity = 0;
      state.totalPrice = 0;
      const updatedCart: cartProducts = state.cartProducts.map((product) => {
        return action.payload.id == product.id
          ? { ...product, quantity: product.quantity - 1 }
          : product;
      });
      state.cartProducts = updatedCart;

      state.cartProducts.map((product) => {
        state.allQuantity += product.quantity;
        state.totalPrice += product.quantity * product.price;
      });
      window.localStorage.setItem("cart", JSON.stringify(state.cartProducts));
    },
    deleteProduct: (state, action) => {
      state.allQuantity = 0;
      state.totalPrice = 0;
      const updatedCart: cartProducts = state.cartProducts.filter((product) => {
        return product.id !== action.payload.id;
      });
      state.cartProducts = updatedCart;

      state.cartProducts.map((product) => {
        state.allQuantity += product.quantity;
        state.totalPrice += product.quantity * product.price;
      });
      window.localStorage.setItem("cart", JSON.stringify(state.cartProducts));
    },
    getCartProducts: (state) => {
      state.allQuantity = 0;
      state.totalPrice = 0;
      const cart = (): cartProducts | null => {
        const cartData = localStorage.getItem("cart");
        return cartData ? JSON.parse(cartData) : null;
      };
      state.cartProducts = cart() ?? [];
      state.cartProducts.map((product) => {
        state.allQuantity += product.quantity;
        state.totalPrice += product.quantity * product.price;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productsFetch.fulfilled, (state, action) => {
        state.AllProducts = action.payload;
      })
      .addCase(categoryFetch.fulfilled, (state, action) => {
        state.category = action.payload;
      })
      .addCase(filteredProductsFetch.fulfilled, (state, action) => {
        state.AllProducts = action.payload;
      });
  },
});
export default ProductsSlice.reducer;
export const { addProduct, getCartProducts, removeProduct, deleteProduct } =
  ProductsSlice.actions;
