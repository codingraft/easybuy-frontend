import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productApi";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader";
import { CartItem, User } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import Banner2 from "../assets/images/banner2.webp";
import scrol1 from "../assets/images/scrol1.avif";
import scrol2 from "../assets/images/scrol2.webp";
import scrol3 from "../assets/images/scrol3.webp";
import scrol4 from "../assets/images/scrol4.avif";
import scrol5 from "../assets/images/scrol5.avif";
import scrol6 from "../assets/images/scrol6.avif";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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
      <section className="banner relative w-full h-auto lg:h-screen mt-28 lg:mt-4 overflow-hidden">
        <Swiper
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide className="relative">
            <img
              className="w-full h-64 md:h-full object-cover"
              src={Banner2}
              alt="banner"
            />
            <div className="container relative mx-auto">
              <div className="banner_content absolute lg:bottom-10 bottom-5 left-0 text-left text-white md:w-1/3 sm:w-3/4 w-full px-4">
                <h1 className="text-2xl lg:text-5xl  lg:mb-4 mb-3">
                  Lifestyle Inspiration
                </h1>
                <p className="text-sm mb-6 lg:mb-10 ">
                  Crafted for the modern trendsetter, these jackets seamlessly
                  blend warmth with sophistication, offering a perfect balance
                  of comfort and style.
                </p>
                <Link
                  to="/search"
                  className="text-white p-3 mx-auto mt-5 rounded-full border border-gray-200 hover:bg-white hover:text-black transition duration-300 px-7 md:px-10 lg:px-16 text-center py-2 md:py-5"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      <section className="sec2 container mx-auto py-10">
        <Swiper
          slidesPerView={6}
          spaceBetween={50}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 50,
            },
          }}
          className="mySwiper"
        >
          {[scrol1, scrol2, scrol3, scrol4, scrol5, scrol6].map(
            (src, index) => (
              <SwiperSlide key={index}>
                <img className="w-full" src={src} alt={`scroll-${index}`} />
              </SwiperSlide>
            )
          )}
        </Swiper>
      </section>

      <section className="py-24 latest_prod bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl flex justify-between items-center">
            Latest Product{" "}
            <Link to="/search" className="text-sm">
              More
            </Link>
          </h1>
          <div className="product_card grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-5">
            {isLoading ? (
              <Skeleton />
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

      <section className="free container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="card p-6 rounded-lg text-center border border-gray-200">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              It is Secure
            </h2>
            <p className="text-gray-600">
              Your data and transactions are protected with top-notch security
              measures.
            </p>
          </div>
          <div className="card p-6 rounded-lg text-center border border-gray-200">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Payment Secure
            </h2>
            <p className="text-gray-600">
              We ensure secure payment gateways for a seamless shopping
              experience.
            </p>
          </div>
          <div className="card p-6 rounded-lg text-center border border-gray-200">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Support 24/7
            </h2>
            <p className="text-gray-600">
              Our team is available around the clock to assist you with any
              queries.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
