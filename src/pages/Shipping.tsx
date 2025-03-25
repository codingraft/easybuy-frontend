import { ChangeEvent, FormEvent, useEffect, useState } from "react";
// import Razorpay from "razorpay";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import {
//   useCreatePaymentIntentMutation,
//   useGetKeyQuery,
// } from "../redux/api/paymentApi";
import axios from "axios";
import toast from "react-hot-toast";
import { useNewOrderMutation } from "../redux/api/orderApi";
import { resetCart, saveShippingInfo } from "../redux/reducer/cartReducer";
import { RootState } from "../redux/store";
import { NewOrderRequest, RazorpayResponse } from "../types/api-types";
import { responseToast } from "../utils/features";

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

    const {
      data: { key },
    } = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/payment/key`);

    const amount = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const { data: order } = await axios.post(
      `${import.meta.env.VITE_SERVER}/api/v1/payment/create`,
      {
        amount,
      }
    );

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

    setProcessing(true);
    // console.log("cartitems", cartItems);
    // console.log(order.order.amount);
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
        console.log("Payment Response:", response);

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;

        const verifyRes = await axios.post(
          `${import.meta.env.VITE_SERVER}/api/v1/payment/verify`,
          { razorpay_order_id, razorpay_payment_id, razorpay_signature },
          { headers: { "Content-Type": "application/json" } }
        );

        if (verifyRes.data.success) {
          setProcessing(false);
          const res = await newOrder(orderData);
          dispatch(resetCart());
          // navigate("/orders");
          responseToast(res, navigate, "/orders");
        } else {
          setProcessing(false);
          toast.error("Payment Verification Failed");
        }
      },
    };

    const razor = new Razorpay(options);
    razor.open();
  };
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  return (
    <div className="shipping">
      <button
        className="absolute top-20 left-10 border border-back size-10 flex items-center justify-center rounded-full bg-black text-white mb-8"
        onClick={() => navigate("/cart")}
      >
        <BiArrowBack />
      </button>

      <form
        onSubmit={submitHandler}
        className="shipping-form lg:w-2/5 sm:w-full flex flex-col gap-4 mt-10 m-auto p-10"
      >
        <h1 className="text-2xl text-center font-bold">Shipping Address</h1>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={shippingInfo.address}
          onChange={changeHandler}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={shippingInfo.city}
          onChange={changeHandler}
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={shippingInfo.state}
          onChange={changeHandler}
        />
        <select name="country" id="" onChange={changeHandler}>
          <option value="country">Country</option>
          <option value="india">India</option>
        </select>
        <input
          type="number"
          name="pinCode"
          placeholder="Pin Code"
          value={shippingInfo.pinCode}
          onChange={changeHandler}
        />

        <button type="submit" className="bg-black text-white p-3 rounded">
          {isProcessing ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};
export default Shipping;
