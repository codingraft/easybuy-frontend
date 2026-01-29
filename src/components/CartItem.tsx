import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import type { CartItem } from "../types/types";
import { server } from "../redux/store";
import { Button } from "./ui/Button";

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
    <div className="flex items-center justify-between border border-border p-4 mb-4 rounded-xl bg-card shadow-sm hover:shadow-md transition-all">
      <div className="flex w-full gap-6 items-center">
        <div className="w-20 h-20 flex-shrink-0 bg-secondary/30 rounded-lg overflow-hidden border border-border">
          <img
            src={`${server}/${photo}`}
            alt={name}
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </div>
        <div className="flex flex-col justify-between w-full gap-2">
          <div className="flex justify-between items-start w-full">
            <Link to={`/product/${productId}`} className="hover:text-primary transition-colors">
              <span className="font-medium text-lg text-foreground line-clamp-1">{name}</span>
            </Link>
            <span className="font-bold text-lg text-foreground">₹{price}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center border border-input rounded-md">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => decreamentHandler(cartItem)}
                className="h-8 w-8 p-0 rounded-none rounded-l-md hover:bg-secondary"
              >
                <FaMinus size={10} />
              </Button>
              <div className="h-8 w-10 flex items-center justify-center bg-background text-sm font-medium border-x border-input">
                {quantity}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => increamentHandler(cartItem)}
                className="h-8 w-8 p-0 rounded-none rounded-r-md hover:bg-secondary"
              >
                <FaPlus size={10} />
              </Button>
            </div>
            <Button
              variant="link"
              onClick={() => removeHandler(productId)}
              className="text-destructive hover:text-destructive/80 font-medium text-sm p-0 h-auto"
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartItem;
