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
  singleProduct: product;
  progressState: boolean;
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
  singleProduct: {
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
  progressState: false,
};
export const productsFetch = createAsyncThunk(
  "productsFetch",
  async (): Promise<AllProducts> => {
    const controller = new AbortController();
    const productsData = await axios("https://fakestoreapi.com/products", {
      signal: controller.signal,
    });
    return productsData.data;
  }
);
export const singleProductFetch = createAsyncThunk(
  "singleProductFetch",
  async (id: number): Promise<product> => {
    const controller = new AbortController();
    const productData = await axios(`https://fakestoreapi.com/products/${id}`, {
      signal: controller.signal,
    });
    return productData.data;
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
      console.log(action.payload.product.id);
      console.log(action.payload.quantity);
      const exist = state.cartProducts.find(
        (product) => product.id === action.payload.product.id
      );
      if (exist) {
        const updatedCart: cartProducts = state.cartProducts.map((product) => {
          return action.payload.product.id === product.id
            ? {
                ...product,
                quantity: product.quantity + action.payload.quantity,
              }
            : product;
        });
        state.cartProducts = updatedCart;
      } else {
        state.cartProducts = [
          ...state.cartProducts,
          { ...action.payload.product, quantity: action.payload.quantity },
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
        state.progressState = false;
      })
      .addCase(productsFetch.pending, (state) => {
        state.progressState = true;
      })
      .addCase(categoryFetch.fulfilled, (state, action) => {
        state.category = action.payload;
      })
      .addCase(filteredProductsFetch.fulfilled, (state, action) => {
        state.AllProducts = action.payload;
        state.progressState = false;
      })
      .addCase(filteredProductsFetch.pending, (state) => {
        state.progressState = true;
      })
      .addCase(singleProductFetch.fulfilled, (state, action) => {
        state.singleProduct = action.payload;
        state.progressState = false;
      })
      .addCase(singleProductFetch.pending, (state) => {
        state.progressState = true;
      });
  },
});
export default ProductsSlice.reducer;
export const { addProduct, getCartProducts, removeProduct, deleteProduct } =
  ProductsSlice.actions;
