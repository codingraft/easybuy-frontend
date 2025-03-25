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
    <div className="container mx-auto lg:px-20 mt-10 mb-20">
      {isLoading ? <Skeleton /> : data?.orders.length === 0 ? "No orders" : Table}
    </div>
  );
};
export default Order;
