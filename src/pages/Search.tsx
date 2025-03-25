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
    <div className="container flex items-start justify-between mx-auto gap-10 py-10 relative my-24 flex-wrap">
      <aside className="search-sidebar border border-slate-200 lg:flex-1 flex-auto p-8 rounded-lg bg-white shadow-md">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Filters</h1>
        <div className="filter mb-6">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Sort</h2>
          <select
            value={sort}
            name="sort"
            className="p-3 border border-gray-300 rounded-md w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="price">Sort by</option>
            <option value="dsc">Price (High to Low)</option>
            <option value="asc">Price (Low to High)</option>
          </select>
        </div>
        <div className="filter mb-6">
          <h2 className="text-lg font-medium text-gray-700 mb-2">
            Max Price:{" "}
            <span className="font-semibold text-blue-600">{range || ""}</span>
          </h2>
          <input
            type="range"
            min={100}
            max={1000000}
            value={range}
            onChange={(e) => setRange(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>
        <div className="filter">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Category</h2>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 border border-gray-300 rounded-md w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            <option value="">All</option>
            {!loadingCategiories &&
              categoriesResponse?.categories.map((category) => (
                <option key={category} value={category}>
                  {category.toUpperCase()}
                </option>
              ))}
          </select>
        </div>
      </aside>
      <main className="search-main lg:w-3/4 w-full p-5">
        <h1 className="text-2xl ">Products</h1>
        <div className="search mb-5">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mt-1 p-3 block w-full bg-gray-50 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-300 ease-in-out"
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
