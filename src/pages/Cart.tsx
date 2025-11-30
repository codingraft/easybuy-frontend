import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import {
  addToCart,
  applyDiscount,
  calculatePrice,
  removeFromCart,
} from "../redux/reducer/cartReducer";
import { CartReducerInitialState } from "../types/reducer-types";
import axios from "axios";
import { server } from "../redux/store";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, subtotal, shippingCharges, tax, discount, total } =
    useSelector(
      (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
    );
  const dispatch = useDispatch();

  const [coupon, setCoupon] = useState<string>("");
  const [validCoupon, setvalidCoupon] = useState<boolean>(false);

  const increamentCartHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const decreamentCartHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return;

    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };

  const removeCartHandler = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source(); // {token, cancel}

    const id = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/discount?coupon=${coupon}`, {
          cancelToken,
        })
        .then((res) => {
          dispatch(applyDiscount(res.data.discount));
          // console.log(res.data);
          setvalidCoupon(true);
          dispatch(calculatePrice());
        })
        .catch((err) => {
          console.log(err.response.data.message);
          dispatch(applyDiscount(0));
          setvalidCoupon(false);
          dispatch(calculatePrice());
        });
    }, 1000);
    if (Math.random() > 0.5) setvalidCoupon(true);
    else setvalidCoupon(false);

    return () => {
      clearTimeout(id);
      cancel();
      setvalidCoupon(false);
    };
  }, [coupon, dispatch]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems, dispatch]);

  return (
    <div className="container cart flex justify-between items-start lg:flex-row flex-col gap-10 lg:min-h-screen p-4 lg:p-20 mt-12 lg:mt-16 mx-auto">
      <main className="cart_main lg:w-3/5 w-full space-y-6">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <CartItem
              key={index}
              cartItem={item}
              increamentHandler={increamentCartHandler}
              decreamentHandler={decreamentCartHandler}
              removeHandler={removeCartHandler}
            />
          ))
        ) : (
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-gray-300">Cart is empty</h1>
            <Link to="/search" className="text-blue-600 mt-4 inline-block hover:underline">Start Shopping</Link>
          </div>
        )}
      </main>
      <aside className="cart_sidebar bg-white lg:w-2/5 w-full border border-gray-100 p-8 rounded-xl shadow-lg sticky top-24">
        <h2 className="text-xl font-bold mb-6 border-b pb-4">Order Summary</h2>
        <div className="space-y-4 text-gray-700">
          <p className="flex justify-between"><span>Subtotal:</span> <span className="font-medium">₹{subtotal}</span></p>
          <p className="flex justify-between"><span>Shipping:</span> <span className="font-medium">₹{shippingCharges}</span></p>
          <p className="flex justify-between"><span>Tax:</span> <span className="font-medium">₹{tax}</span></p>
          <p className="flex justify-between text-green-600">
            <span>Discount:</span> <em>- ₹{discount}</em>
          </p>
          <div className="border-t pt-4 mt-4">
            <p className="flex justify-between text-xl font-bold text-gray-900">
              <span>Total:</span> <span>₹{total}</span>
            </p>
          </div>
        </div>
        
        <div className="mt-8">
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Coupon code"
            className="border border-gray-300 px-4 py-3 rounded-lg text-sm w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {coupon &&
            (validCoupon ? (
              <p className="text-green-600 flex gap-2 items-center text-sm bg-green-50 p-2 rounded">
                Discount ₹{discount} Applied using <code className="font-bold">{coupon}</code>
              </p>
            ) : (
              <p className="text-red-600 flex gap-2 items-center text-sm bg-red-50 p-2 rounded">
                <VscError /> Invalid Coupon
              </p>
            ))}
        </div>

        {cartItems.length > 0 && (
          <Link to="/shipping">
            <button className="w-full bg-black text-white py-4 rounded-lg mt-6 font-bold hover:bg-gray-800 transition-colors shadow-md">
              CHECKOUT
            </button>
          </Link>
        )}
      </aside>
    </div>
  );
};
export default Cart;
