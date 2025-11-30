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
    <div className="shipping container mx-auto min-h-screen flex justify-center items-center py-10 relative">
      <button
        className="absolute top-4 left-4 md:top-8 md:left-8 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-800 hover:bg-black hover:text-white transition-colors shadow-md z-10"
        onClick={() => navigate("/cart")}
      >
        <BiArrowBack size={20} />
      </button>

      <div className="w-full max-w-md">
        <form
          onSubmit={submitHandler}
          className="shipping-form bg-white shadow-xl rounded-2xl p-8 md:p-10 flex flex-col gap-6 border border-gray-100"
        >
          <h1 className="text-3xl text-center font-bold text-gray-800 mb-2">Shipping Address</h1>
          
          <div className="space-y-4">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={shippingInfo.address}
              onChange={changeHandler}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={shippingInfo.city}
                onChange={changeHandler}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={shippingInfo.state}
                onChange={changeHandler}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <select 
              name="country" 
              id="" 
              onChange={changeHandler}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none"
            >
              <option value="country">Select Country</option>
              <option value="india">India</option>
            </select>
            <input
              type="number"
              name="pinCode"
              placeholder="Pin Code"
              value={shippingInfo.pinCode}
              onChange={changeHandler}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <button 
            type="submit" 
            className="bg-black text-white p-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors shadow-lg mt-4"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Shipping;
