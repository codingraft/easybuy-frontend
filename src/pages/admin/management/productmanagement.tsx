import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { UserReducerInitialState } from "../../../types/reducer-types";
import { useSelector } from "react-redux";
import {
  useDeleteProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
} from "../../../redux/api/productApi";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getImageUrl, responseToast } from "../../../utils/features";
import { Skeleton } from "../../../components/Loader";

const Productmanagement = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const params = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useProductDetailsQuery(params.id!);

  const { image, name, price, stock, category } = data?.product || {
    name: "",
    price: 0,
    stock: 0,
    image: "",
    category: "",
  };

  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [photoUpdate, setPhotoUpdate] = useState<string>("");
  const [photoFile, setPhotoFile] = useState<File>();

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    if (nameUpdate) formData.set("name", nameUpdate);
    if (priceUpdate) formData.set("price", String(priceUpdate));
    if (stockUpdate !== undefined) formData.set("stock", String(stockUpdate));
    if (categoryUpdate) formData.set("category", categoryUpdate);
    if (photoFile) formData.set("image", photoFile);

    const res = await updateProduct({
      formData,
      userId: user?._id as string,
      productId: data?.product._id as string,
    });

    responseToast(res, navigate, "/admin/product");
  };

  const deleteHandler = async () => {

    const res = await deleteProduct({
      userId: user?._id as string,
      productId: data?.product._id as string,
    });

    responseToast(res, navigate, "/admin/product");
  };

  useEffect(() => {
    if (data) {
      setNameUpdate(data.product.name);
      setPriceUpdate(data.product.price);
      setStockUpdate(data.product.stock);
      setCategoryUpdate(data.product.category);
    }
  }, [data]);

  if (isError) return <Navigate to="/404" />

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="admin-container">
        <AdminSidebar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {isLoading ? (
            <Skeleton count={20} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Product Preview Card */}
              <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/20 h-fit sticky top-8 space-y-6">
                <div className="flex justify-between items-center mb-4">
                  <div className={`px-4 py-1.5 rounded-full text-sm font-semibold ${stock > 0
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    }`}>
                    {stock > 0 ? `${stock} Available` : "Out of Stock"}
                  </div>
                  <strong className="text-slate-500 dark:text-slate-400 text-sm">ID: {data?.product._id}</strong>
                </div>

                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700/50 mb-6">
                  <img
                    src={getImageUrl(image)}
                    alt="Product"
                    className="w-full h-full object-contain p-4"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-medium text-slate-600 dark:text-slate-300">₹{price}</span>
                    <span className="text-sm px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 font-medium uppercase tracking-wider">
                      {category}
                    </span>
                  </div>
                </div>

                <button
                  onClick={deleteHandler}
                  className="w-full py-3 mt-4 flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400 rounded-xl font-medium transition-colors"
                >
                  <FaTrash /> Delete Product
                </button>
              </section>

              {/* Update Form Card */}
              <article className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/20 h-fit">
                <form onSubmit={submitHandler} className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-8 uppercase tracking-wide">
                    Manage Product
                  </h2>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
                    <input
                      type="text"
                      placeholder="Name"
                      value={nameUpdate}
                      onChange={(e) => setNameUpdate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Price</label>
                    <input
                      type="number"
                      placeholder="Price"
                      value={priceUpdate}
                      onChange={(e) => setPriceUpdate(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Stock</label>
                    <input
                      type="number"
                      placeholder="Stock"
                      value={stockUpdate}
                      onChange={(e) => setStockUpdate(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
                    <input
                      type="text"
                      placeholder="eg. laptop, camera etc"
                      value={categoryUpdate}
                      onChange={(e) => setCategoryUpdate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700/50 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Photo</label>
                    <input
                      type="file"
                      onChange={changeImageHandler}
                      className="w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-slate-700 dark:file:text-slate-200 transition-all"
                    />
                  </div>

                  {photoUpdate && (
                    <div className="flex justify-center mt-4">
                      <img src={photoUpdate} alt="New Image" className="w-32 h-32 object-cover rounded-xl shadow-md border border-slate-200 dark:border-slate-600" />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold uppercase tracking-wider shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1"
                  >
                    Update
                  </button>
                </form>
              </article>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Productmanagement;
