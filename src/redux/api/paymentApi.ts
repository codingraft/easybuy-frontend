import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MessageResponse, PaymentResponse } from "../../types/api-types";

export const paymentAPI = createApi({
    reducerPath: "paymentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/payment/`,
    }),
    tagTypes: ["payment"],
    endpoints: (builder) => ({
       
        createPaymentIntent: builder.mutation<PaymentResponse, {amount: number}  >({
            query: ({amount}) => ({
                url: "create",
                method: "POST",
                amount,
            }),
        }),
        getKey: builder.query<{ key: string }, MessageResponse>({
            query: () => "key",

        })
    }),
});

export const { useCreatePaymentIntentMutation, useGetKeyQuery } = paymentAPI;