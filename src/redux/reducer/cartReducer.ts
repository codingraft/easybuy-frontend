import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../../types/reducer-types";
import { CartItem, ShippingInfo } from "../../types/types";

// Load cart from localStorage
const loadCart = (): CartReducerInitialState => {
  const storedCart = sessionStorage.getItem("cart");
  return storedCart
    ? JSON.parse(storedCart)
    : {
        cartItems: [],
        loading: false,
        subtotal: 0,
        shippingCharges: 0,
        total: 0,
        tax: 0,
        discount: 0,
        shippingInfo: {
          address: "",
          city: "",
          pinCode: "",
          country: "",
          state: "",
        },
      };
};

const initialState: CartReducerInitialState = loadCart();

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.loading = true;
      const index = state.cartItems.findIndex(
        (item) => item.productId === action.payload.productId
      );

      if (index !== -1) {
        state.cartItems[index] = action.payload;
      } else state.cartItems.push(action.payload);
      state.loading = false;

      sessionStorage.setItem("cart", JSON.stringify(state)); // Save to localStorage
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
      state.loading = false;

      sessionStorage.setItem("cart", JSON.stringify(state)); // Save to localStorage
    },
    calculatePrice: (state) => {
      state.subtotal = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      state.tax = Math.round(state.subtotal * 0.18);
      state.shippingCharges = state.subtotal > 1000 ? 0 : 100;
      state.total =
        state.subtotal + state.tax + state.shippingCharges - state.discount;

      sessionStorage.setItem("cart", JSON.stringify(state)); // Save to localStorage
    },
    applyDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
      sessionStorage.setItem("cart", JSON.stringify(state)); // Save to localStorage
    },
    saveShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
      state.shippingInfo = action.payload;
      sessionStorage.setItem("cart", JSON.stringify(state)); // Save to localStorage
    },
    resetCart: () => {
      sessionStorage.removeItem("cart"); // Clear localStorage on reset
      return loadCart(); // Reset state
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  calculatePrice,
  applyDiscount,
  resetCart,
  saveShippingInfo,
} = cartReducer.actions;
