import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../components/admin/TableHOC";
import { Skeleton } from "../components/Loader";
import { useMyOrdersQuery } from "../redux/api/orderApi";
import { RootState } from "../redux/store";
import { CustomError } from "../types/api-types";

type OrderType = {
  _id: string;
  quantity: number;
  discount: number;
  amount: number;
  status: ReactElement;
  action: ReactElement;
};

const columns: Column<OrderType>[] = [
  {
    Header: "Id",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Order = () => {
  const { user } = useSelector(
  (state: RootState) => state.userReducer
  );

  const { isLoading, isError, error, data } = useMyOrdersQuery(user?._id || "");

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  const [rows, setRows] = useState<OrderType[]>([]);

  useEffect(() => {
    if (data) {
      setRows(
        data.orders.map((order, index) => ({
          _id: order._id,
          amount: order.total,
          discount: order.discount,
          quantity: order.orderItems.length,
          status: (
            <span
              key={index}
              className={
                order.status === "Shipped"
                  ? "green"
                  : order.status === "Delivered"
                  ? "purple"
                  : "red"
              }
            >
              {order.status}
            </span>
          ),
          action: (
            <Link key={index} to={`/admin/transaction/${order._id}`}>
              Manage
            </Link>
          ),
        }))
      );
    }
  }, [data]);

  const Table = TableHOC<OrderType>(
    columns,
    rows,
    "dashboard-product-box",
    "Orders",
    rows.length > 6 ? true : false
  )();
  return (
    <div className="container mx-auto lg:px-20 px-4 mt-10 mb-20 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Orders</h1>
      {isLoading ? (
        <Skeleton />
      ) : data?.orders.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-400">No orders found</h2>
          <Link to="/search" className="text-blue-600 mt-4 inline-block hover:underline">Start Shopping</Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          {Table}
        </div>
      )}
    </div>
  );
};
export default Order;
