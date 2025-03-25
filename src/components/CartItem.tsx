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
    <div className="cart-item flex items-center justify-between border border-slate-200 p-5 mb-1 rounded bg-white">
      <div className="flex w-full gap-10">
        <img
          src={`${server}/${photo}`}
          alt={name}
          className="w-40 h-20 object-cover"
        />
        <div className="flex flex-col justify-between w-full">
          <div className="flex justify-between w-full">
            <Link to={`/product/${productId}`}>
              <span className="font-bold">{name}</span>
            </Link>
            <span>
              {" "}
              <b>₹{price}</b>{" "}
            </span>
          </div>
          <div className="flex justify-between">
            <div className="flex">
              <button
                onClick={() => decreamentHandler(cartItem)}
                className="border border-gray-400 rounded px-2 hover:bg-black hover:text-white text-[10px]"
              >
                <FaMinus />
              </button>
              <span className="mx-2">{quantity}</span>
              <button
                onClick={() => increamentHandler(cartItem)}
                className="border border-gray-400 px-2 rounded hover:bg-black hover:text-white text-[12px]"
              >
                <FaPlus />
              </button>
            </div>
            <button
              onClick={() => removeHandler(productId)}
              className="text-red-600"
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
