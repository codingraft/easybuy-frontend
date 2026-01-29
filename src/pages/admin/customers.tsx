import { ReactElement, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { Skeleton } from "../../components/Loader";
import {
  useAllUsersQuery,
  useDeleteUserMutation,
} from "../../redux/api/userApi";
import { RootState } from "../../redux/store";
import { CustomError } from "../../types/api-types";
import { responseToast } from "../../utils/features";


interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Customers = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { isLoading, isError, error, data } = useAllUsersQuery(user?._id || "");
  const [rows, setRows] = useState<DataType[]>([]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "w-full overflow-hidden",
    "Customers",
    rows.length > 6
  )();

  const [deleteUser] = useDeleteUserMutation();
  const deleteHandler = useCallback(
    async (userId: string) => {
      const res = await deleteUser({ userId, adminUserId: user?._id || "" });

      responseToast(res, null, "");
    },
    [deleteUser, user?._id]
  );

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data) {
      console.log("data", data);
      setRows(
        data.users.map((user, index) => ({
          avatar: <img src={user.image} alt={user.name} key={index} className="w-10 h-10 rounded-full object-cover" />,
          name: user.name,
          email: user.email,
          gender: user.gender,
          role: user.role,
          action: (
            <button onClick={() => deleteHandler(user._id)} className="text-red-500 hover:text-red-700 transition-colors">
              <FaTrash />
            </button>
          ),
        }))
      );
    }
  }, [data, deleteHandler]);

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

export default Customers;
