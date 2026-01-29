import { FaTrash } from "react-icons/fa";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";

import { useSelector } from "react-redux";
import {
  useDeleteOrderMutation,
  useOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../../redux/api/orderApi";
import { useProductDetailsQuery } from "../../../redux/api/productApi";
import { getImageUrl, responseToast } from "../../../utils/features";
import { UserReducerInitialState } from "../../../types/reducer-types";
import { Order, OrderItem } from "../../../types/types";
import { Skeleton } from "../../../components/Loader";


const defaultData: Order = {
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
  status: "",
  subtotal: 0,
  discount: 0,
  shippingCharges: 0,
  tax: 0,
  total: 0,
  orderItems: [],
  user: { name: "", _id: "" },
  _id: "",
};

const TransactionManagement = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const params = useParams();
  const navigate = useNavigate();
  const { isLoading, isError, data } = useOrderDetailsQuery(params.id!);

  console.log(data);

  const {
    shippingInfo: { address, city, state, country, pinCode },
    orderItems,
    user: { name },
    status,
    tax,
    subtotal,
    total,
    discount,
    shippingCharges,
  } = data?.order ?? defaultData;

  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const updateHandler = async () => {
    console.log("user", user);
    const res = await updateOrder({
      userId: user?._id as string,
      orderId: data?.order._id as string,
    });
    responseToast(res, navigate, "/admin/transaction");
  };

  const deleteHandler = async () => {
    const res = await deleteOrder({
      userId: user?._id as string,
      orderId: data?.order._id as string,
    });
    responseToast(res, navigate, "/admin/transaction");
  };

  if (isError) return <Navigate to="/404" />;
  if (!data?.order) return <p>No order found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="admin-container">
        <AdminSidebar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {isLoading ? (
            <Skeleton count={10} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Order Items Section */}
              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide">
                  Order Items
                </h2>

                <div className="space-y-4">
                  {orderItems.map((i) => (
                    <ProductCard
                      key={i._id}
                      name={i?.name}
                      photo={getImageUrl(i.photo)}
                      productId={i.productId}
                      _id={i._id}
                      quantity={i.quantity}
                      price={i.price}
                    />
                  ))}
                </div>
              </section>

              {/* Order Info Card */}
              <article className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/20 h-fit sticky top-8 space-y-8">
                <div className="flex justify-between items-start">
                  <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide">
                    Order Info
                  </h1>
                  <button
                    className="p-3 bg-red-100 hover:bg-red-200 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400 rounded-xl transition-colors"
                    onClick={deleteHandler}
                    title="Delete Order"
                  >
                    <FaTrash />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      User Info
                    </h5>
                    <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl space-y-1">
                      <p className="font-medium text-slate-800 dark:text-slate-200">Name: {name}</p>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        Address: {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Amount Info
                    </h5>
                    <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl space-y-2">
                      <div className="flex justify-between text-slate-600 dark:text-slate-400">
                        <span>Subtotal:</span>
                        <span>₹{subtotal}</span>
                      </div>
                      <div className="flex justify-between text-slate-600 dark:text-slate-400">
                        <span>Shipping Charges:</span>
                        <span>₹{shippingCharges}</span>
                      </div>
                      <div className="flex justify-between text-slate-600 dark:text-slate-400">
                        <span>Tax:</span>
                        <span>₹{tax}</span>
                      </div>
                      <div className="flex justify-between text-slate-600 dark:text-slate-400">
                        <span>Discount:</span>
                        <span>-₹{discount}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold text-slate-800 dark:text-slate-100 pt-2 border-t border-slate-200 dark:border-slate-600">
                        <span>Total:</span>
                        <span>₹{total}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                      Status Info
                    </h5>
                    <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">Status:</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${status === "Delivered"
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                          : status === "Shipped"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                      >
                        {status}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold uppercase tracking-wider shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1 block text-center"
                  onClick={updateHandler}
                >
                  Process Status
                </button>
              </article>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const ProductCard = ({
  name,
  price,
  quantity,
  productId,
}: OrderItem) => {
  // Fetch current product to get updated Cloudinary image
  const { data: productData } = useProductDetailsQuery(productId);

  // Only use current product image, ignore stale order snapshot
  const productImage = productData?.product?.image;
  const imageUrl = productImage ? getImageUrl(productImage) : null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4 transition-transform hover:scale-[1.02]">
      <div className="w-20 h-20 shrink-0 rounded-lg bg-slate-100 dark:bg-slate-700 overflow-hidden relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.parentElement!.classList.add("flex", "items-center", "justify-center");
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            <span className="text-xs">No Image</span>
          </div>
        )}
      </div>

      <div className="flex-1">
        <Link
          to={`/product/${productId}`}
          className="text-lg font-semibold text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-1"
        >
          {name}
        </Link>
        <div className="text-slate-500 dark:text-slate-400 mt-1 font-medium">
          <span>₹{price}</span>
          <span className="mx-2">x</span>
          <span>{quantity}</span>
          <span className="mx-2">=</span>
          <span className="text-slate-800 dark:text-slate-200 font-bold">₹{price * quantity}</span>
        </div>
      </div>
    </div>
  );
};

export default TransactionManagement;
