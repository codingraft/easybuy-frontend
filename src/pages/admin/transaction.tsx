import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useAllOrdersQuery } from "../../redux/api/orderApi";
import { CustomError } from "../../types/api-types";

import { Skeleton } from "../../components/Loader";
import { RootState } from "../../redux/store";

interface DataType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}



const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "user",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
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

const Transaction = () => {
  const { user } = useSelector(
    (state: RootState) => state.userReducer
  );

  const { isLoading, isError, error, data } = useAllOrdersQuery(
    user?._id || ""
  );

  const [rows, setRows] = useState<DataType[]>([]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data) {
      setRows(
        data.orders.map((order, index) => ({
          user: order.user?.name,
          amount: order.total,
          discount: order.discount,
          quantity: order.orderItems.length,
          status: (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === "Shipped"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : order.status === "Delivered"
                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                }`}
            >
              {order.status}
            </span>
          ),
          action: <Link key={index} to={`/admin/transaction/${order._id}`} className="text-blue-500 hover:underline">Manage</Link>,
        }))
      );
    }
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "w-full overflow-hidden",
    "Transactions",
    rows.length > 6
  )();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="admin-container">
        <AdminSidebar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {isLoading ? <Skeleton count={20} /> : Table}
        </main>
      </div>
    </div>
  );
};

export default Transaction;
