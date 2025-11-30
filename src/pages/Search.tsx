import { useState } from "react";
import ProductCard from "../components/ProductCard";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productApi";
import toast from "react-hot-toast";
import { CustomError } from "../types/api-types";
import { Skeleton } from "../components/Loader";
import { addToCart } from "../redux/reducer/cartReducer";
import { useDispatch } from "react-redux";
import { CartItem, User } from "../types/types";

const Search = ({ user }: { user: User | null }) => {
  const {
    data: categoriesResponse,
    isLoading: loadingCategiories,
    isError,
    error,
  } = useCategoriesQuery("");

  const dispatch = useDispatch();

  const [range, setRange] = useState<number>(1000000);
  const [category, setCategory] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const {
    isLoading: productLoading,
    data: searchedData,
    isError: productIsError,
    error: productError,
  } = useSearchProductsQuery({
    search,
    sort,
    category,
    page,
    price: range,
  });

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of stock");
    if (user === null) return toast.error("Please login to add to cart");

    dispatch(addToCart(cartItem));
    return toast.success("Added to cart");
  };

  if (productIsError) toast.error((productError as CustomError).data.message);
  if (isError) toast.error((error as CustomError).data.message);

  return (
    <div className="container flex items-start justify-between mx-auto gap-10 py-10 relative my-24 flex-wrap px-4">
      <aside className="search-sidebar border border-gray-100 lg:flex-1 flex-auto p-6 rounded-xl bg-white shadow-lg sticky top-24">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Filters</h1>
        <div className="filter mb-8">
          <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-3">Sort By</h2>
          <select
            value={sort}
            name="sort"
            className="p-3 border border-gray-200 rounded-lg w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-700"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="price">None</option>
            <option value="dsc">Price (High to Low)</option>
            <option value="asc">Price (Low to High)</option>
          </select>
        </div>
        <div className="filter mb-8">
          <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-3">
            Max Price:{" "}
            <span className="font-semibold text-blue-600">₹{range || ""}</span>
          </h2>
          <input
            type="range"
            min={100}
            max={1000000}
            value={range}
            onChange={(e) => setRange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
        <div className="filter">
          <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wider mb-3">Category</h2>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 border border-gray-200 rounded-lg w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-700"
          >
            <option value="">All Categories</option>
            {!loadingCategiories &&
              categoriesResponse?.categories.map((category) => (
                <option key={category} value={category}>
                  {category.toUpperCase()}
                </option>
              ))}
          </select>
        </div>
      </aside>
      <main className="search-main lg:w-3/4 w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Products</h1>
        <div className="search mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-4 pl-6 bg-white border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
            />
          </div>
          {productLoading ? (
            <Skeleton count={10} />
          ) : (
            <div className="product_card grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 mt-5">
              {searchedData?.products.map((product, index) => (
                <ProductCard
                  key={index}
                  productId={product._id}
                  photo={product.image}
                  name={product.name}
                  price={product.price}
                  stock={product.stock}
                  handler={addToCartHandler}
                />
              ))}
            </div>
          )}
        </div>

        {searchedData && searchedData.totalPages > 1 && (
          <article className="pagination flex items-center justify-center mt-5 gap-4">
            <button
              onClick={() => setPage((prev) => prev - 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="text-lg">
              {page} / {searchedData.totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              disabled={page === searchedData.totalPages}
            >
              Next
            </button>
          </article>
        )}
      </main>
    </div>
  );
};
export default Search;
