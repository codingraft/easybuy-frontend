import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productApi";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader";
import { CartItem, User } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";
import Banner2 from "../assets/images/banner2.webp";
import scrol1 from "../assets/images/scrol1.avif";
import scrol2 from "../assets/images/scrol2.webp";
import scrol3 from "../assets/images/scrol3.webp";
import scrol4 from "../assets/images/scrol4.avif";
import scrol5 from "../assets/images/scrol5.avif";
import scrol6 from "../assets/images/scrol6.avif";
import { FaCreditCard, FaHeadset, FaShieldAlt } from "react-icons/fa";

const Home = ({ user } : { user: User | null }) => {
  const { data, isLoading, isError } = useLatestProductsQuery("");

  const dispatch = useDispatch();
  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of stock");
    if (user === null) return toast.error("Please login to add to cart");

    dispatch(addToCart(cartItem));
    return toast.success("Added to cart");
  };

  if (isError) toast.error("Error fetching latest products");

  return (
    <div className="home bg-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center bg-[#f8f9fa] overflow-hidden mt-16">
        <div className="absolute inset-0 z-0">
          <img
            src={Banner2}
            alt="Fashion Collection"
            className="w-full h-full object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10" />
        </div>
        
        <div className="container mx-auto px-6 relative z-20">
          <div className="max-w-2xl animate-fade-in-up">
            <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold tracking-widest uppercase mb-6">
              New Collection 2025
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight">
              Elevate <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                Your Style
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-lg font-light leading-relaxed">
              Discover the latest trends in fashion. Premium quality, sustainable materials, and designs that speak to your individuality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/search"
                className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 shadow-lg text-center"
              >
                Shop Now
              </Link>
              <Link
                to="/about"
                className="px-10 py-4 bg-transparent border border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-400 text-xs font-bold tracking-[0.2em] uppercase mb-12">
            Trusted by world-class brands
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {[scrol1, scrol2, scrol3, scrol4, scrol5, scrol6].map((src, index) => (
              <img 
                key={index} 
                src={src} 
                alt={`Brand ${index + 1}`} 
                className="h-8 md:h-10 w-auto object-contain hover:scale-110 transition-transform duration-300" 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Products */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">New Arrivals</h2>
              <p className="text-gray-500">Fresh styles just for you</p>
            </div>
            <Link to="/search" className="text-black font-medium hover:underline underline-offset-4 decoration-2">
              View All Products
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {isLoading ? (
              <Skeleton count={4} />
            ) : (
              data?.products.map((product) => (
                <ProductCard
                  key={product._id}
                  productId={product._id}
                  photo={product.image}
                  name={product.name}
                  price={product.price}
                  stock={product.stock}
                  handler={addToCartHandler}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
              <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform">
                <FaShieldAlt />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Payments</h3>
              <p className="text-gray-500 leading-relaxed">
                Your security is our priority. We use top-tier encryption for all transactions.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
              <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform">
                <FaCreditCard />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Flexible Payment</h3>
              <p className="text-gray-500 leading-relaxed">
                Pay your way. We accept all major credit cards and digital wallets.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
              <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform">
                <FaHeadset />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-500 leading-relaxed">
                We're here to help. Our dedicated support team is available around the clock.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
