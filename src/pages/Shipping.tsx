/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useNewOrderMutation } from "../redux/api/orderApi";
import { resetCart, saveShippingInfo } from "../redux/reducer/cartReducer";
import { RootState } from "../redux/store";
import { NewOrderRequest, RazorpayResponse } from "../types/api-types";
import { responseToast } from "../utils/features";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardContent, CardTitle } from "../components/ui/Card";

const Shipping = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { cartItems, total, discount, subtotal, tax, shippingCharges } =
    useSelector((state: RootState) => state.cartReducer);

  const [newOrder] = useNewOrderMutation();

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const [isProcessing, setProcessing] = useState<boolean>(false);
  // const [data] = useCreatePaymentIntentMutation();
  // const { data: key } = useGetKeyQuery();
  // const key = data?.key;
  // const { data } = useOrderDetailsQuery(user?._id as string);
  // const [order] = useCreatePaymentIntentMutation();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.state ||
      !shippingInfo.country ||
      !shippingInfo.pinCode
    ) {
      toast.error("Please fill in all the fields");
      return;
    }

    dispatch(saveShippingInfo(shippingInfo));

    try {
      setProcessing(true);

      const {
        data: { key },
      } = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/payment/key`);

      const amount = total;

      console.log("Creating order with amount:", amount);

      const { data: order } = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/payment/create`,
        {
          amount,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Order created:", order);

      const orderData: NewOrderRequest = {
        shippingInfo,
        orderItems: cartItems,
        subtotal,
        shippingCharges,
        discount,
        total,
        tax,
        user: user?._id as string,
      };

      const options = {
        key, // Replace with your Razorpay key_id
        amount: order.order.amount,
        currency: "INR",
        name: "Vaibhav",
        description: "Test Transaction",
        order_id: order.order.id, // This is the order_id created in the backend
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: {
          color: "#121212",
        },
        handler: async function (response: RazorpayResponse) {
          try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
              response;

            const verifyRes = await axios.post(
              `${import.meta.env.VITE_SERVER}/api/v1/payment/verify`,
              { razorpay_order_id, razorpay_payment_id, razorpay_signature },
              { headers: { "Content-Type": "application/json" } }
            );

            if (verifyRes.data.success) {
              toast.success("Payment Successful! Creating your order...");
              const res = await newOrder(orderData);
              dispatch(resetCart());
              toast.success("Order placed successfully!");
              responseToast(res, navigate, "/orders");
            } else {
              toast.error("Payment Verification Failed");
            }
          } catch (error) {
            console.error(error);
            toast.error("Payment Verification Failed");
          } finally {
            setProcessing(false);
          }
        },
      };

      const razor = new (window as any).Razorpay(options);
      razor.open();
    } catch (error: any) {
      setProcessing(false);
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  return (
    <div className="container mx-auto min-h-[90vh] flex justify-center items-center pt-32 pb-10 relative bg-background animate-in fade-in zoom-in-95 duration-500">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-28 left-4 md:left-8 rounded-full shadow-md z-10 bg-background hover:bg-secondary border border-border"
        onClick={() => navigate("/cart")}
      >
        <BiArrowBack size={20} />
      </Button>

      <Card className="w-full max-w-md shadow-xl border-border">
        <form onSubmit={submitHandler}>
          <div className="p-6 md:p-8 border-b border-border">
            <CardTitle className="text-3xl text-center font-bold text-foreground font-heading">Shipping Address</CardTitle>
          </div>
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="space-y-4">
              <Input
                type="text"
                name="address"
                placeholder="Address"
                value={shippingInfo.address}
                onChange={changeHandler}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={shippingInfo.city}
                  onChange={changeHandler}
                />
                <Input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={shippingInfo.state}
                  onChange={changeHandler}
                />
              </div>
              <div className="relative">
                <select
                  name="country"
                  id=""
                  onChange={changeHandler}
                  className="w-full flex h-12 rounded-lg border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[length:1em] bg-[right:1rem_center]"
                >
                  <option value="">Select Country</option>
                  <option value="india">India</option>
                </select>
              </div>
              <Input
                type="number"
                name="pinCode"
                placeholder="Pin Code"
                value={shippingInfo.pinCode}
                onChange={changeHandler}
              />
            </div>

            <Button
              type="submit"
              className="w-full py-6 text-lg font-bold shadow-lg"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Place Order"}
            </Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};
export default Shipping;
