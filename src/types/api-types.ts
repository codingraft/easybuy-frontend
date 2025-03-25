import { Bar, CartItem, Line, Order, Pie, Product, ShippingInfo, Stats, User } from "./types";

export type MessageResponse = {
  success: boolean;
  message: string;
};
export type AllUsersResponse = {
  success: boolean;
  users: User[];
};
export type PaymentResponse = {
  id: string;
  success: boolean;
  amount: number;
};

export type UserResponse = {
  success: boolean;
  user: User;
};
export type ProductResponse = {
  success: boolean;
  product: Product;
};
export type AllProductsResponse = {
  success: boolean;
  products: Product[];
};
export type CategoriesResponse = {
  success: boolean;
  categories: string[];
};
export type StatsResponse = {
  success: boolean;
  stats: Stats;
};
export type PieResponse = {
  success: boolean;
  charts: Pie;
};
export type BarResponse = {
  success: boolean;
  barCharts: Bar;
};
export type LineResponse = {
  success: boolean;
  lineCharts: Line;
};
export type RazorpayResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export type SearchProductsResponse = AllProductsResponse & {
  totalPages: number;
};
export type SearchProductsRequest = {
  price: number;
  page: number;
  category: string;
  search: string;
  sort: string;
};

export type CustomError = {
  status: number;
  data: {
    success: boolean;
    message: string;
  };
};

export type NewProductMessageRequest = {
  id: string;
  formData: FormData;
};

export type UpdateProductMessageRequest = {
  userId: string;
  productId: string;
  formData: FormData;
};

export type DeleteProductMessageRequest = {
  userId: string;
  productId: string;
};

export type NewOrderRequest = {
  shippingInfo: ShippingInfo;
  orderItems: CartItem[];
  subtotal: number;
  shippingCharges: number;
  discount: number;
  total: number;
  tax: number;
  user: string;
};

export type UpdateOrderRequest = {
  userId: string;
  orderId: string;
};

export type DeleteOrderRequest = {
  userId: string;
  adminUserId: string;
};

export type AllOrdersResponse = {
  success: boolean;
  orders: Order[];
};

export type OrderDetailsResponse = {
  success: boolean;
  order: Order;
};

