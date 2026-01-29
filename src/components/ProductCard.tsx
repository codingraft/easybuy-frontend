import { FaPlus } from "react-icons/fa";
import { getImageUrl } from "../utils/features";
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
    <div className="group relative w-full">
      {/* Image Container with sophisticated hover effect */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-secondary/20 mb-4">
        <img
          src={getImageUrl(photo)}
          alt={name}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Overlay / Quick Add */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <button
            onClick={() =>
              handler({ productId, name, photo, price, quantity: 1, stock })
            }
            className="w-full bg-white/90 backdrop-blur-sm text-foreground py-3 rounded-lg font-medium shadow-lg hover:bg-white transition-all duration-200 flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed"
            disabled={stock < 1}
          >
            {stock < 1 ? (
              <span className="text-xs font-bold uppercase tracking-wider">Out of Stock</span>
            ) : (
              <>
                <FaPlus className="text-xs" />
                <span className="text-sm tracking-wide">Add to Cart</span>
              </>
            )}
          </button>
        </div>

        {/* Badges */}
        {stock < 5 && stock > 0 && (
          <div className="absolute top-3 left-3 bg-red-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm backdrop-blur-md">
            Low Stock
          </div>
        )}
      </div>

      {/* Product Details - Minimalist */}
      <div className="space-y-1">
        <h3 className="font-medium text-foreground text-lg leading-tight truncate group-hover:text-primary transition-colors duration-200">
          {name}
        </h3>
        <p className="text-muted-foreground text-sm font-light">
          {/* Placeholder category since API might not send it, or use price as main focus */}
          <span className="font-semibold text-foreground">₹{price}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
