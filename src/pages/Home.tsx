import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productApi";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader";
import { CartItem, User } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";
import scrol1 from "../assets/images/scrol1.avif";
import scrol2 from "../assets/images/scrol2.webp";
import scrol3 from "../assets/images/scrol3.webp";
import scrol4 from "../assets/images/scrol4.avif";
import scrol5 from "../assets/images/scrol5.avif";
import scrol6 from "../assets/images/scrol6.avif";
import { FaCreditCard, FaHeadset, FaShieldAlt } from "react-icons/fa";
import { Button } from "../components/ui/Button";
import { Hero } from "../components/ui/Hero";

const Home = ({ user }: { user: User | null }) => {
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
    <div className="home bg-background text-foreground animate-in fade-in duration-700">
      {/* Premium Hero Section */}
      <Hero />

      {/* Brands Section - Minimalist */}
      <section className="py-12 border-b border-border/40">
        <div className="container mx-auto px-6">
          <p className="text-center text-muted-foreground text-[10px] font-bold tracking-[0.3em] uppercase mb-10">
            Trusted by world-class brands
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            {[scrol1, scrol2, scrol3, scrol4, scrol5, scrol6].map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Brand ${index + 1}`}
                className="h-6 md:h-8 w-auto object-contain hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Products - Editorial Grid */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div className="space-y-2">
              <h2 className="font-heading text-4xl font-bold text-foreground tracking-tight">New Arrivals</h2>
              <p className="text-muted-foreground font-light text-lg">Curated styles for the modern aesthetic.</p>
            </div>
            <Link to="/search">
              <Button variant="link" className="text-foreground font-medium hover:text-primary p-0 h-auto text-lg decoration-1 underline-offset-8">
                View All Products &rarr;
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
            {isLoading ? (
              <Skeleton count={4} />
            ) : (
              data?.products.map((product) => (
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
              ))
            )}
          </div>
        </div>
      </section>

      {/* Features Section - Clean & Solid */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { icon: FaShieldAlt, title: "Secure Payments", desc: "Top-tier encryption for every transaction." },
              { icon: FaCreditCard, title: "Flexible Payment", desc: "All major credit cards and digital wallets accepted." },
              { icon: FaHeadset, title: "24/7 Support", desc: "Dedicated support team available around the clock." }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center space-y-4 p-8">
                <div className="w-12 h-12 flex items-center justify-center text-foreground text-2xl mb-2">
                  <feature.icon />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground tracking-tight">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-light max-w-xs mx-auto">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
