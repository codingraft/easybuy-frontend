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
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

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
    <div className="container flex items-start justify-between mx-auto gap-10 pt-32 pb-10 relative min-h-screen mb-10 flex-col lg:flex-row px-4 animate-in fade-in duration-500">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-1/4 space-y-8 sticky top-24 h-fit">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h1 className="text-xl font-heading font-bold text-foreground">Filters</h1>
          <button className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider font-bold">Reset</button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Sort By</h2>
          <div className="relative">
            <select
              value={sort}
              name="sort"
              className="w-full h-12 rounded-lg border border-input bg-card px-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none appearance-none cursor-pointer transition-shadow shadow-sm hover:shadow-md"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="price">Featured</option>
              <option value="dsc">Price: High to Low</option>
              <option value="asc">Price: Low to High</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Max Price</h2>
            <span className="text-sm font-medium bg-secondary px-2 py-1 rounded">₹{range}</span>
          </div>
          <input
            type="range"
            min={100}
            max={1000000}
            value={range}
            onChange={(e) => setRange(Number(e.target.value))}
            className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Category</h2>
          <div className="relative">
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-12 rounded-lg border border-input bg-card px-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none appearance-none cursor-pointer transition-shadow shadow-sm hover:shadow-md"
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
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full lg:w-3/4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-4xl font-heading font-bold text-foreground tracking-tight">Shop Collection</h1>
          <p className="text-muted-foreground text-sm">Showing {searchedData?.products.length || 0} results</p>
        </div>

        <div className="mb-10">
          <div className="relative max-w-xl">
            <Input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-6 h-14 text-base rounded-full shadow-sm"
            />
          </div>

          {productLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
              <Skeleton count={9} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 mt-10">
              {searchedData?.products.map((product) => (
                <div key={product._id} className="group cursor-pointer">
                  <ProductCard
                    productId={product._id}
                    photo={product.image}
                    name={product.name}
                    price={product.price}
                    stock={product.stock}
                    handler={addToCartHandler}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {searchedData && searchedData.totalPages > 1 && (
          <article className="flex items-center justify-center mt-16 gap-6">
            <Button
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
              variant="outline"
              size="sm"
            >
              Previous
            </Button>
            <span className="text-sm font-medium text-foreground bg-secondary px-4 py-2 rounded-md">
              Page {page} of {searchedData.totalPages}
            </span>
            <Button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === searchedData.totalPages}
              variant="outline"
              size="sm"
            >
              Next
            </Button>
          </article>
        )}
      </main>
    </div>
  );
};
export default Search;
