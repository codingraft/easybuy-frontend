import { FaPlus } from "react-icons/fa";
import { server } from "../redux/store";
import { CartItem } from "../types/types";

type ProductsProp = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  width?: string;
  handler: (cartItem: CartItem) => string | void;
};

const ProductCard = ({
  productId,
  photo,
  name,
  price,
  stock,
  handler,
}: // width = "1/5",
ProductsProp) => {
  return (
    <div
      className={`product-card bg-white shadow-md flex flex-col justify-between items-center  relative mt-4 group pb-5 gap-4 border border-gray-200 rounded-lg overflow-hidden`}
    >
      <div className="w-full h-72 bg-gray-100 flex justify-center items-center">
        <img
          src={`${server}/${photo}`}
          alt={name}
          className="product-card-img object-contain h-full max-h-96 w-full"
        />
      </div>
      <div className="px-4 text-center">
        <p className="text-lg font-medium text-gray-800 truncate">{name}</p>
        <span className="font-bold text-xl text-gray-900">₹{price}</span>
      </div>
      <div className="addtocart absolute bottom-0 right-0 flex justify-center items-center h-full w-full bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() =>
            handler({ productId, name, photo, price, quantity: 1, stock })
          }
          className="text-xl border-none text-white p-3 rounded-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition-transform transform hover:scale-110"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
