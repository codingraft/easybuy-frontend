import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api-types"
import { SerializedError } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";
import { server } from "../redux/store";

/**
 * Returns the correct image URL - uses the URL directly if it's already absolute (e.g., Cloudinary),
 * otherwise prepends the server URL.
 */
export const getImageUrl = (imagePath: string): string => {
    if (!imagePath) return "";
    // If it's already an absolute URL (http:// or https://), use it directly
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
        return imagePath;
    }
    // Otherwise, prepend the server URL
    return `${server}/${imagePath}`;
};

type ResType = {
    data?: MessageResponse;
    error?: FetchBaseQueryError | SerializedError;
}

export const responseToast = (
    res: ResType,
    navigate: NavigateFunction | null,
    url: string
) => {
    if ("data" in res) {
        toast.success(res.data!.message);
        if (navigate) navigate(url);
    } else {
        const error = res.error as FetchBaseQueryError;
        const message = (error.data as MessageResponse).message;
        toast.error(message);
    }
}

export const getlastMonths = () => {
    const currentDate = moment();

    currentDate.date(1);

    const last6Months: string[] = [];
    const last12Months: string[] = [];

    for (let i = 0; i < 6; i++) {
        const monthDate = currentDate.clone().subtract(i, "month");
        const monthName = monthDate.format("MMMM");
        last6Months.unshift(monthName);
    }

    for (let i = 0; i < 12; i++) {
        const monthDate = currentDate.clone().subtract(i, "month");
        const monthName = monthDate.format("MMMM");
        last12Months.unshift(monthName);
    }

    return { last6Months, last12Months };
}