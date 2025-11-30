import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import type { CartItem } from "../types/types";
import { server } from "../redux/store";

type CartItemProps = {
  cartItem: CartItem;
  increamentHandler: (cartItem: CartItem) => void;
  decreamentHandler: (cartItem: CartItem) => void;
  removeHandler: (id: string) => void;
};
const CartItem = ({
  cartItem,
  increamentHandler,
  decreamentHandler,
  removeHandler,
}: CartItemProps) => {
  const { productId, name, photo, price, quantity } = cartItem;
  return (
    <div className="cart-item flex items-center justify-between border border-gray-100 p-6 mb-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex w-full gap-6 items-center">
        <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
          <img
            src={`${server}/${photo}`}
            alt={name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex flex-col justify-between w-full gap-2">
          <div className="flex justify-between items-start w-full">
            <Link to={`/product/${productId}`} className="hover:text-blue-600 transition-colors">
              <span className="font-bold text-lg text-gray-800">{name}</span>
            </Link>
            <span className="font-bold text-lg text-gray-900">₹{price}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => decreamentHandler(cartItem)}
                className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-gray-600 hover:bg-black hover:text-white transition-colors shadow-sm"
              >
                <FaMinus size={10} />
              </button>
              <span className="mx-4 font-medium w-4 text-center">{quantity}</span>
              <button
                onClick={() => increamentHandler(cartItem)}
                className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-gray-600 hover:bg-black hover:text-white transition-colors shadow-sm"
              >
                <FaPlus size={10} />
              </button>
            </div>
            <button
              onClick={() => removeHandler(productId)}
              className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartItem;
