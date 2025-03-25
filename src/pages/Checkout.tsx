

// import { FormEvent, useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { useCreatePaymentIntentMutation, useGetKeyQuery } from "../redux/api/paymentApi";
// import { useSelector } from "react-redux";
// import { UserReducerInitialState } from "../types/reducer-types";


// const CheckOutForm = () => {
//   const { user } = useSelector(
//     (state: { userReducer: UserReducerInitialState }) => state.userReducer
//   );


//   const navigate = useNavigate();
//   const [isProcessing, setProcessing] = useState<boolean>(false);
//   const [createPaymentIntent] = useCreatePaymentIntentMutation();
//   const { data } = useGetKeyQuery();
//   const key = data?.key;

//   const submitHandler = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     setProcessing(true);



//     const order = {};



//     const options = {
//       key, // Replace with your Razorpay key_id
//       amount: '50000', 
//       currency: 'INR',
//       name: 'Vaibhav',
//       description: 'Test Transaction',
//       order_id: 'order_IluGWxBm9U8zJ8', // This is the order_id created in the backend
//       callback_url: `${import.meta.env.VITE_SERVER}/api/v1/payment/verify`, // Your success URL
//       prefill: {
//         name: user?.name,
//         email: user?.email,
//       },
//       theme: {
//         color: '#F37254'
//       },
//     };

//   };

//   return (
//     <div className="w-1/2 mx-auto">
//       <form onSubmit={submitHandler}>
//         <button
//           type="submit"
//           className="w-full bg-black text-white p-3 rounded-md"
//           disabled={isProcessing}
//         >
//           {isProcessing ? "Processing..." : "Pay"}
//         </button>
//       </form>
//     </div>
//   );
// };



// export default CheckOutForm;
