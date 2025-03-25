export type User = {
  name: string;
  email: string;
  image: string;
  gender: string;
  role: string;
  dob: string;
  _id: string;
};

export type Product = {
  _id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  stock: number;
  category: string;
};

export type ShippingInfo = {
  address: string;
  city: string;
  pinCode: string;
  country: string;
  state: string;
};

export type CartItem = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
};

export type OrderItem = Omit<CartItem, "stock"> & {
  _id: string;
};

export type Order = {
  orderItems: OrderItem[];
  shippingInfo: ShippingInfo;
  subtotal: number;
  shippingCharges: number;
  discount: number;
  total: number;
  tax: number;
  status: string;
  user: {
    name: string;
    _id: string;
  };
  _id: string;
};

type CountAndChange = {
  revenue: number;
  product: number;
  user: number;
  order: number;
};
type LatestTransaction = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: string;
};
export type Stats = {
  categoryCount: Record<string, number>[];
  changePercent: CountAndChange;
  count: CountAndChange;
  chart: {
    order: number[];
    revenue: number[];
  };
  userGenderRatio: {
    male: number;
    female: number;
  };
  latestTransactions: LatestTransaction[];
};

export type Pie = {
  orderFullfillment: {
    processing: number;
    shipped: number;
    delivered: number;
  };
  productCategories: Record<string, number>[];
  stockAvailability: {
    inStock: number;
    outOfStock: number;
  };
  revenueDistribution: {
    netMargin: number;
    discount: number;
    productionCost: number;
    burnt: number;
    marketingCost: number;
  };
  usersAgeGroup: {
    teen: number;
    adult: number;
    senior: number;
  };
  adminCustomer: {
    admin: number;
    customer: number;
  };
};

export type Bar = {
  users: number[];
  orders: number[];
  products: number[];
};

export type Line = {
  users: number[];
  products: number[];
  discount: number[];
  revenue: number[];
};
