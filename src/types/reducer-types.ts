import { CartItem, ShippingInfo, User } from "./types";

export interface UserReducerInitialState {
    user: User | null;
    loading: boolean;
}

export interface CartReducerInitialState {
    loading: boolean;
    cartItems: CartItem[];
    subtotal: number;
    shippingCharges: number;
    discount: number;
    total: number;
    tax: number;
    shippingInfo: ShippingInfo;
}