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
}: ProductsProp) => {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100 hover:border-gray-200">
      <div className="relative w-full aspect-[4/5] bg-gray-50 overflow-hidden">
        <img
          src={`${server}/${photo}`}
          alt={name}
          className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-110 mix-blend-multiply"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-white/90 to-transparent pt-10">
          <button
            onClick={() =>
              handler({ productId, name, photo, price, quantity: 1, stock })
            }
            className="w-full bg-black text-white py-3 rounded-xl font-medium shadow-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 transform active:scale-95"
          >
            <FaPlus className="text-sm" /> Add to Cart
          </button>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-gray-500 text-sm font-medium tracking-wide uppercase mb-1 truncate">
          {name.split(' ')[0]} {/* Brand or Category placeholder */}
        </h3>
        <h2 className="text-gray-900 font-semibold text-lg mb-2 truncate" title={name}>
          {name}
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">₹{price}</span>
          {stock < 1 && (
            <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full">
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
