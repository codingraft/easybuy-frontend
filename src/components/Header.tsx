import { signOut } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  CiLogout,
  CiSearch,
  CiShoppingCart,
  CiUser,
} from "react-icons/ci";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import logo from "../assets/images/logo.png";
import { auth } from "../firebase";
import { CartReducerInitialState } from "../types/reducer-types";
import { User } from "../types/types";



interface PropsType {
  user: User | null;
}

const Header = ({ user }: PropsType) => {
  const { cartItems } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  );
  const [open, setOpen] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error logging out");
      console.log(error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-xl font-bold text-xl group-hover:rotate-12 transition-transform duration-300">E</div>
          <span className="font-bold text-xl tracking-tight text-gray-900">EasyBuy</span>
        </Link>

        <div
          className={`absolute top-full left-0 w-full bg-white md:bg-transparent border-b md:border-none border-gray-100 flex flex-col items-center md:static md:flex md:flex-row md:items-center md:w-auto md:space-x-8 transition-all duration-300 ${
            menuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4 md:opacity-100 md:visible md:translate-y-0"
          }`}
        >
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="py-4 md:py-0 text-gray-600 hover:text-black font-medium transition-colors relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/search"
            onClick={() => setMenuOpen(false)}
            className="py-4 md:py-0 text-gray-600 hover:text-black font-medium transition-colors relative group"
          >
            Shop
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="py-4 md:py-0 text-gray-600 hover:text-black font-medium transition-colors relative group"
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="py-4 md:py-0 text-gray-600 hover:text-black font-medium transition-colors relative group"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <Link
            to="/search"
            onClick={() => setMenuOpen(false)}
            className="text-gray-600 hover:text-black transition-colors"
          >
            <CiSearch className="text-2xl" />
          </Link>
          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="text-gray-600 hover:text-black transition-colors relative"
          >
            <CiShoppingCart className="text-2xl" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartItems.length}
              </span>
            )}
          </Link>
          {user?._id ? (
            <div className="relative">
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
              >
                <CiUser className="text-2xl" />
              </button>
              {open && (
                <div className="absolute right-0 mt-4 w-48 bg-white shadow-xl rounded-xl border border-gray-100 py-2 animate-fade-in-down">
                  {user.role === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => {
                        setOpen(false);
                        setMenuOpen(false);
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    to="/orders"
                    onClick={() => {
                      setOpen(false);
                      setMenuOpen(false);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black"
                  >
                    My Orders
                  </Link>
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    onClick={logout}
                  >
                    <CiLogout className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="hidden md:flex items-center px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Login
            </Link>
          )}
          <button
            className="text-2xl md:hidden text-gray-600"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
