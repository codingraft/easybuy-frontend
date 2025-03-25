import { configureStore } from "@reduxjs/toolkit";
import { productAPI } from "./api/productApi";
import { userAPI } from "./api/userApi";
import { userReducer } from "./reducer/userReducer";
import { cartReducer } from "./reducer/cartReducer";
import { orderAPI } from "./api/orderApi";
import { paymentAPI } from "./api/paymentApi";
import { dashboardAPI } from "./api/dashboardApi";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userAPI.reducerPath]: userAPI.reducer,
    [userReducer.name]: userReducer.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [cartReducer.name]: cartReducer.reducer,
    [orderAPI.reducerPath]: orderAPI.reducer,
    [paymentAPI.reducerPath]: paymentAPI.reducer,
    [dashboardAPI.reducerPath]: dashboardAPI.reducer,
  },
  middleware: (mid) =>
    mid().concat(
      userAPI.middleware,
      productAPI.middleware,
      orderAPI.middleware,
      paymentAPI.middleware,
      dashboardAPI.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
