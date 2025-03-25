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
    <div className="container cart flex justify-between items-start lg:flex-row sm:flex-col gap-10 lg:h-screen sm:h-full p-20 mt-12 lg:mt-16 mx-auto">
      <main className="cart_main lg:w-3/5 sm:w-full">
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
          <h1>Cart is empty</h1>
        )}
      </main>
      <aside className="cart_sidebar bg-white flex-1 sm:w-full border border-slate-200 p-10 rounded">
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping: ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>
          Discount: <em>- ₹{discount}</em>{" "}
        </p>
        <p>
          {" "}
          <b>Total: ₹{total}</b>{" "}
        </p>
        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Coupon code"
          className="border border-gray-300 px-2 py-2 rounded text-sm w-full mb-5 "
        />
        {coupon &&
          (validCoupon ? (
            <p className="text-green-600 flex gap-2 items-center">
              Discount ₹{discount} Applied using <code>{coupon}</code>
            </p>
          ) : (
            <p className="text-red-600 flex gap-2 items-center">
              <VscError /> Invalid Coupon{" "}
            </p>
          ))}
        {cartItems.length > 0 && (
          <Link to="/shipping">
            <button className="button bg-black text-white w-full p-2 rounded">
              CHECKOUT
            </button>
          </Link>
        )}
      </aside>
    </div>
  );
};
export default Cart;
