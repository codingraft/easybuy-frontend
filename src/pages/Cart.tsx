import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { CiShoppingCart } from "react-icons/ci";
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
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent, CardTitle } from "../components/ui/Card";

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
    const { token: cancelToken, cancel } = axios.CancelToken.source();

    const id = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/discount?coupon=${coupon}`, {
          cancelToken,
        })
        .then((res) => {
          dispatch(applyDiscount(res.data.discount));
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
    // if (Math.random() > 0.5) setvalidCoupon(true); // Removing random logic
    // else setvalidCoupon(false);

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
    <div className="container flex justify-between items-start lg:flex-row flex-col gap-10 min-h-[80vh] pt-32 pb-16 px-4 mx-auto animate-in fade-in duration-500">
      <main className="lg:w-3/5 w-full space-y-6">
        <h1 className="text-3xl font-heading font-bold text-foreground mb-6">Shopping Cart</h1>
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
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-2xl border border-dashed border-border/60 bg-secondary/10">
            <div className="w-16 h-16 mb-6 rounded-full bg-background flex items-center justify-center shadow-sm text-muted-foreground">
              <CiShoppingCart className="text-3xl" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/search">
              <Button size="lg" className="shadow-lg hover:shadow-primary/20">
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </main>

      <aside className="lg:w-2/5 w-full sticky top-24">
        <Card className="shadow-lg border-border">
          <div className="p-6 border-b border-border">
            <CardTitle className="text-xl">Order Summary</CardTitle>
          </div>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground"><span>Subtotal</span> <span className="font-medium text-foreground">₹{subtotal}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Shipping</span> <span className="font-medium text-foreground">₹{shippingCharges}</span></div>
              <div className="flex justify-between text-muted-foreground"><span>Tax</span> <span className="font-medium text-foreground">₹{tax}</span></div>
              <div className="flex justify-between text-green-600 font-medium"><span>Discount</span> <span>- ₹{discount}</span></div>
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex justify-between text-xl font-bold text-foreground">
                <span>Total</span> <span>₹{total}</span>
              </div>
            </div>

            <div className="space-y-3">
              <Input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Coupon code"
                className="uppercase placeholder:normal-case"
              />
              {coupon &&
                (validCoupon ? (
                  <p className="text-green-600 flex gap-2 items-center text-xs bg-green-50/50 p-2 rounded border border-green-100 dark:bg-green-900/20 dark:border-green-900">
                    Discount ₹{discount} Applied using <code className="font-bold">{coupon}</code>
                  </p>
                ) : (
                  <p className="text-destructive flex gap-2 items-center text-xs bg-destructive/10 p-2 rounded border border-destructive/20">
                    <VscError /> Invalid Coupon
                  </p>
                ))}
            </div>

            {cartItems.length > 0 && (
              <Link to="/shipping" className="block">
                <Button className="w-full text-lg py-6 font-bold shadow-md hover:shadow-lg">
                  CHECKOUT
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      </aside>
    </div>
  );
};
export default Cart;
