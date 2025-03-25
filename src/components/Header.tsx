import { signOut } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  CiLogin,
  CiLogout,
  CiSearch,
  CiShoppingCart,
  CiUser,
} from "react-icons/ci";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
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
    <nav className="top-0 fixed w-full z-50 bg-white shadow-md">
      <div className="header container mx-auto flex items-center justify-between px-4 py-3 md:py-2">
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <img src={logo} alt="Easybuy" className="w-24" />
        </Link>

        <div
          className={`absolute top-full left-0 w-full bg-white flex flex-col items-center md:static md:flex md:flex-row md:items-center md:w-auto md:space-x-6 ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="py-2 md:py-0"
          >
            About Us
          </Link>
          <Link
            to="/search"
            onClick={() => setMenuOpen(false)}
            className="py-2 md:py-0 mx-0 md:mx-3"
          >
            All Products
          </Link>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="py-2 md:py-0"
          >
            Contact Us
          </Link>
        </div>
        <div className="right flex items-center space-x-4">
          <Link
            to="/search"
            onClick={() => setMenuOpen(false)}
            className="flex items-center"
          >
            <CiSearch className="text-2xl" />
          </Link>
          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="flex items-center mr-4"
          >
            <div className="relative">
              <CiShoppingCart className="text-2xl" />
              {cartItems.length > 0 && (
                <span className="badge bg-red-700 text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px] absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
                  {cartItems.length}
                </span>
              )}
            </div>
          </Link>
          {user?._id ? (
            <div className="relative">
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center"
              >
                <CiUser className="text-2xl" />
              </button>
              {open && (
                <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md p-2">
                  {user.role === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => {
                        setOpen(false);
                        setMenuOpen(false);
                      }}
                      className="block px-3 py-2"
                    >
                      Admin
                    </Link>
                  )}
                  <Link
                    to="/orders"
                    onClick={() => {
                      setOpen(false);
                      setMenuOpen(false);
                    }}
                    className="block px-3 py-2"
                  >
                    Orders
                  </Link>
                  <button
                    className="flex items-center px-4 py-2 w-full text-left"
                    onClick={logout}
                  >
                    <CiLogout className="text-2xl mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center px-3 py-2 bg-[#111827] text-white rounded-md hover:bg-[#233253] transition text-sm md:text-base"
            >
              <CiLogin className="text-lg md:text-xl mr-2" />
              Login
            </Link>
          )}
          <button
            className="text-2xl md:hidden"
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
