import { ReactElement, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useAllProductsQuery } from "../../redux/api/productApi";
import { getImageUrl } from "../../utils/features";
import toast from "react-hot-toast";
import { CustomError } from "../../types/api-types";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../types/reducer-types";
import { Skeleton } from "../../components/Loader";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Products = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const { data, isLoading, isError, error } = useAllProductsQuery(
    user?._id || ""
  );

  console.log(data);

  const [rows, setRows] = useState<DataType[]>([]);

  if (isError) toast.error((error as CustomError).data.message);

  useEffect(() => {
    if (data) {
      setRows(
        data.products.map((product) => ({
          photo: <img src={getImageUrl(product.image)} alt="product" className="w-12 h-12 rounded-lg object-cover" />,
          name: product.name,
          price: product.price,
          stock: product.stock,
          action: <Link to={`/admin/product/${product._id}`}>Manage</Link>,
        }))
      );
    }
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "w-full overflow-hidden",
    "Products",
    rows.length > 6
  )();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="admin-container">
        <AdminSidebar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {isLoading ? (
            <Skeleton count={20} />
          ) : (
            <div className="relative">
              {Table}
              <Link
                to="/admin/product/new"
                className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 z-50 text-2xl"
              >
                <FaPlus />
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
